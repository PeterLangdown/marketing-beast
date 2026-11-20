#!/usr/bin/env node
// Checks ledger.json against specs/01-ledger.md.
//
//   node tools/validate-ledger.mjs              (checks ../ledger.json next to this script)
//   node tools/validate-ledger.mjs path/to/ledger.json
//
// Exits 1 if there are errors. Warnings are printed but don't fail the run.
// Run it before every commit that touches the ledger.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const ledgerPath = resolve(process.argv[2] ?? resolve(here, '..', 'ledger.json'));
const blueprintDir = dirname(ledgerPath);
const changelogPath = resolve(blueprintDir, 'CHANGELOG.md');

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const STREAMS = ['LAW', 'TRK', 'FUN', 'UI', 'SAL', 'CUS', 'ADS', 'SEO'];
const KINDS = ['standard', 'bet'];
const STATUSES = ['proposed', 'active', 'rejected', 'retired'];
const RATINGS = ['Strong', 'Moderate', 'Weak', 'Excluded', 'Unrated'];
const SOURCE_TYPES = ['legislation', 'regulator', 'meta-analysis', 'experiment', 'observational', 'platform-docs', 'practitioner', 'vendor', 'guru', 'ai-spec', 'own-data'];
const READS = ['full', 'abstract', 'secondary'];
const VERDICTS = ['Adopt', 'Adapt', 'Test', 'Avoid'];
const BET_STATES = ['untested', 'testing', 'supported', 'not-supported', 'inconclusive'];
const DIRECTIONS = ['up', 'down'];
const WHO = ['ai', 'pete'];
const DECISIONS = ['pending', 'accepted', 'rejected'];
const RULE_FIELDS = ['id', 'stream', 'kind', 'scope', 'status', 'rule', 'why', 'check', 'metric', 'evidence', 'verdict', 'betState', 'origin', 'conflicts', 'proposals', 'added'];
const PROPOSAL_FIELDS = ['id', 'date', 'by', 'change', 'reason', 'evidence', 'decision', 'decided', 'note'];

// Rating caps (spec 01; STAGE-2-VALIDATION-METHODOLOGY-NOTES.md §1).
// A rule can't be rated higher than the best source it actually holds.
const RANK = { Weak: 1, Moderate: 2, Strong: 3 };
const READ_CAP = { full: 3, abstract: 2, secondary: 1 };
const TYPE_CAP = { guru: 1, 'ai-spec': 1, vendor: 1, practitioner: 1 };

const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const isText = (s) => typeof s === 'string' && s.trim().length > 0;
const isObj = (o) => o !== null && typeof o === 'object' && !Array.isArray(o);

// ---------- load ----------
if (!existsSync(ledgerPath)) {
  console.error(`No ledger at ${ledgerPath}`);
  process.exit(1);
}
let ledger;
try {
  ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
} catch (e) {
  console.error(`ledger.json is not valid JSON: ${e.message}`);
  process.exit(1);
}

const changelogLines = existsSync(changelogPath)
  ? readFileSync(changelogPath, 'utf8').split(/\r?\n/).filter((l) => /^\d{4}-\d{2}-\d{2} · /.test(l))
  : (err('CHANGELOG.md', `missing (expected at ${changelogPath})`), []);

for (const line of changelogLines) {
  const parts = line.split(' · ');
  if (parts.length < 5) warn('CHANGELOG.md', `line doesn't have 5 parts (date · id · what · why · who): "${line}"`);
  else if (!WHO.includes(parts[parts.length - 1].trim())) warn('CHANGELOG.md', `line doesn't end with "ai" or "pete": "${line}"`);
}
const changelogFor = (id) => changelogLines.filter((l) => l.split(' · ')[1]?.trim() === id);

// ---------- top level ----------
if (ledger.schemaVersion !== 1) err('ledger', `schemaVersion must be 1 (got ${JSON.stringify(ledger.schemaVersion)})`);
if (!isDate(ledger.updated)) err('ledger', `updated must be a YYYY-MM-DD date (got ${JSON.stringify(ledger.updated)})`);
if (!isObj(ledger.streams)) err('ledger', 'streams must be an object');
else {
  const keys = Object.keys(ledger.streams);
  if (keys.join() !== STREAMS.join()) err('ledger', `streams must be exactly ${STREAMS.join(', ')} in that order (got ${keys.join(', ')})`);
}
if (!isObj(ledger.modules) || !('core' in ledger.modules)) err('ledger', 'modules must be an object that includes "core"');
const MODULES = isObj(ledger.modules) ? Object.keys(ledger.modules) : ['core'];
if (!Array.isArray(ledger.rules)) {
  err('ledger', 'rules must be an array');
  ledger.rules = [];
}

// ---------- rules ----------
const seen = new Map();
for (const [i, r] of ledger.rules.entries()) {
  const where = isObj(r) && isText(r.id) ? r.id : `rules[${i}]`;
  if (!isObj(r)) { err(where, 'not an object'); continue; }

  for (const f of RULE_FIELDS) if (!(f in r)) err(where, `missing field "${f}"`);
  for (const f of Object.keys(r)) if (!RULE_FIELDS.includes(f)) warn(where, `unknown field "${f}"`);

  // id and stream
  const m = typeof r.id === 'string' ? r.id.match(/^([A-Z]{2,3})-(\d{2,3})$/) : null;
  if (!m) err(where, `id must look like TRK-02 (got ${JSON.stringify(r.id)})`);
  else {
    if (!STREAMS.includes(m[1])) err(where, `id prefix ${m[1]} is not a stream`);
    if (m[1] !== r.stream) err(where, `id prefix ${m[1]} doesn't match stream ${JSON.stringify(r.stream)}`);
    if (m[2].length === 3 && Number(m[2]) < 100) err(where, 'use two digits until a stream passes 99');
  }
  if (seen.has(r.id)) err(where, `duplicate id (also rules[${seen.get(r.id)}])`);
  else seen.set(r.id, i);
  if (!STREAMS.includes(r.stream)) err(where, `stream must be one of ${STREAMS.join(', ')}`);

  if (!KINDS.includes(r.kind)) err(where, `kind must be one of ${KINDS.join(', ')}`);
  if (!STATUSES.includes(r.status)) err(where, `status must be one of ${STATUSES.join(', ')}`);
  if (!VERDICTS.includes(r.verdict)) err(where, `verdict must be one of ${VERDICTS.join(', ')}`);

  // scope
  if (!Array.isArray(r.scope) || r.scope.length === 0) err(where, 'scope must be a non-empty array, e.g. ["core"]');
  else {
    for (const s of r.scope) if (!MODULES.includes(s)) err(where, `scope "${s}" is not a module in ledger.modules`);
    if (r.scope.includes('core') && r.scope.length > 1) err(where, 'scope is either ["core"] or one or more modules, not both');
    if (new Set(r.scope).size !== r.scope.length) err(where, 'scope has duplicates');
  }

  // text fields
  for (const f of ['rule', 'why', 'check', 'origin']) if (!isText(r[f])) err(where, `"${f}" must be non-empty text`);
  if (r.verdict === 'Avoid' && isText(r.rule) && !/^(Don't|Do not|Never)\b/.test(r.rule.trim())) {
    warn(where, 'verdict is Avoid, so the rule should be phrased as a "Don\'t…"');
  }

  // bets vs standards
  if (r.kind === 'bet') {
    if (!isObj(r.metric)) err(where, 'bets need a metric { measure, direction, guardrail }');
    else {
      if (!isText(r.metric.measure)) err(where, 'metric.measure must be non-empty text');
      if (!DIRECTIONS.includes(r.metric.direction)) err(where, `metric.direction must be ${DIRECTIONS.join(' or ')}`);
      if (typeof r.metric.guardrail !== 'string') err(where, 'metric.guardrail must be text (say what mustn\'t get worse)');
      else if (!r.metric.guardrail.trim()) warn(where, 'metric.guardrail is empty');
    }
    if (!BET_STATES.includes(r.betState)) err(where, `bets need a betState: ${BET_STATES.join(', ')}`);
  } else if (r.kind === 'standard') {
    if (r.metric !== null) err(where, 'standards must have metric: null');
    if (r.betState !== null) err(where, 'standards must have betState: null');
  }

  // evidence
  const ev = r.evidence;
  if (!isObj(ev)) err(where, 'evidence must be an object { rating, reason, sources }');
  else {
    if (!RATINGS.includes(ev.rating)) err(where, `evidence.rating must be one of ${RATINGS.join(', ')}`);
    if (!isText(ev.reason)) err(where, 'evidence.reason must be non-empty text');
    if (!Array.isArray(ev.sources)) err(where, 'evidence.sources must be an array');
    else {
      for (const [j, s] of ev.sources.entries()) {
        const sw = `${where} sources[${j}]`;
        if (!isObj(s)) { err(sw, 'not an object'); continue; }
        if (!isText(s.ref)) err(sw, 'ref must be non-empty text');
        if (!SOURCE_TYPES.includes(s.type)) err(sw, `type must be one of ${SOURCE_TYPES.join(', ')}`);
        if (!READS.includes(s.read)) err(sw, `read must be one of ${READS.join(', ')}`);
        if (typeof s.where !== 'string') err(sw, 'where must be text (may be empty)');
      }
      if (RANK[ev.rating]) {
        if (ev.sources.length === 0) err(where, `rated ${ev.rating} but lists no sources; use Unrated or add the source`);
        else {
          const best = Math.max(...ev.sources.map((s) => Math.min(READ_CAP[s.read] ?? 0, TYPE_CAP[s.type] ?? 3)));
          if (RANK[ev.rating] > best) {
            const name = Object.keys(RANK).find((k) => RANK[k] === best) ?? 'nothing';
            err(where, `rated ${ev.rating}, but the best source it holds supports only ${name} (abstract reads cap at Moderate; secondary reads and guru, ai-spec, vendor or practitioner sources cap at Weak)`);
          }
        }
      }
      if (ev.rating === 'Excluded' && ev.sources.length === 0) err(where, 'Excluded needs the law or principle it conflicts with as a source');
    }
    if (ev.rating === 'Excluded' && r.verdict !== 'Avoid') warn(where, 'rated Excluded but the verdict isn\'t Avoid');
  }

  // conflicts
  if (!Array.isArray(r.conflicts) || r.conflicts.some((c) => !isText(c))) err(where, 'conflicts must be an array of text');

  // added
  if (!isObj(r.added) || !isDate(r.added.date) || !WHO.includes(r.added.by)) err(where, 'added must be { date: YYYY-MM-DD, by: "ai" | "pete" }');

  // proposals
  if (!Array.isArray(r.proposals)) err(where, 'proposals must be an array');
  else {
    const pids = new Set();
    for (const [j, p] of r.proposals.entries()) {
      const pw = `${where} proposals[${j}]`;
      if (!isObj(p)) { err(pw, 'not an object'); continue; }
      for (const f of PROPOSAL_FIELDS) if (!(f in p)) err(pw, `missing field "${f}"`);
      if (typeof p.id !== 'string' || !p.id.startsWith(`${r.id}/p`)) err(pw, `id must look like ${r.id}/p1`);
      if (pids.has(p.id)) err(pw, 'duplicate proposal id');
      pids.add(p.id);
      if (!isDate(p.date)) err(pw, 'date must be YYYY-MM-DD');
      if (!WHO.includes(p.by)) err(pw, 'by must be "ai" or "pete"');
      for (const f of ['change', 'reason']) if (!isText(p[f])) err(pw, `"${f}" must be non-empty text`);
      if (!DECISIONS.includes(p.decision)) err(pw, `decision must be one of ${DECISIONS.join(', ')}`);
      if (p.decision === 'pending' && p.decided !== null) err(pw, 'a pending proposal has decided: null');
      if (p.decision !== 'pending') {
        if (!isDate(p.decided)) err(pw, 'a decided proposal needs decided: YYYY-MM-DD');
        if (!changelogFor(r.id).some((l) => l.includes(p.id))) err(pw, `decided, but no CHANGELOG line for ${r.id} mentions ${p.id}`);
      }
    }
  }

  // changelog
  const lines = isText(r.id) ? changelogFor(r.id) : [];
  if (lines.length === 0) err(where, 'no CHANGELOG line for this rule');
  if (['active', 'rejected', 'retired'].includes(r.status) && !lines.some((l) => l.includes(r.status))) {
    err(where, `status is ${r.status}, but no CHANGELOG line for ${r.id} records it`);
  }
}

// ---------- nothing removed since the last commit ----------
let gitNote = '';
try {
  const repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: blueprintDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  const rel = relative(repoRoot, ledgerPath).split('\\').join('/');
  let committed = null;
  try {
    committed = execFileSync('git', ['show', `HEAD:${rel}`], { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
  } catch {
    gitNote = 'no committed ledger.json yet, so the "nothing removed" check was skipped';
  }
  if (committed !== null) {
    const before = JSON.parse(committed);
    const nowById = new Map(ledger.rules.map((r) => [r.id, r]));
    for (const old of before.rules ?? []) {
      const now = nowById.get(old.id);
      if (!now) { err(old.id, 'removed since the last commit. Rules are never deleted: set status "rejected" or "retired" instead'); continue; }
      const nowP = new Set((now.proposals ?? []).map((p) => p.id));
      for (const p of old.proposals ?? []) if (!nowP.has(p.id)) err(old.id, `proposal ${p.id} removed since the last commit. Proposals are kept`);
      if (old.status !== 'proposed' && now.status === 'proposed') err(old.id, `status went from ${old.status} back to proposed`);
    }
    gitNote = `compared with HEAD: ${before.rules?.length ?? 0} committed rules, none may be removed`;
  }
} catch {
  gitNote = 'not inside a git repo, so the "nothing removed" check was skipped';
}

// ---------- report ----------
const count = (key) => ledger.rules.reduce((acc, r) => ((acc[r[key]] = (acc[r[key]] ?? 0) + 1), acc), {});
const fmt = (o) => Object.entries(o).map(([k, v]) => `${k} ${v}`).join(', ') || 'none';
console.log(`ledger: ${relative(process.cwd(), ledgerPath) || ledgerPath}`);
console.log(`rules: ${ledger.rules.length}`);
if (ledger.rules.length) {
  const byStream = Object.fromEntries(STREAMS.map((s) => [s, ledger.rules.filter((r) => r.stream === s).length]));
  console.log(`  by stream: ${fmt(byStream)}`);
  console.log(`  by kind:   ${fmt(count('kind'))}`);
  console.log(`  by status: ${fmt(count('status'))}`);
  console.log(`  by rating: ${fmt(ledger.rules.reduce((a, r) => ((a[r.evidence?.rating] = (a[r.evidence?.rating] ?? 0) + 1), a), {}))}`);
}
if (gitNote) console.log(`git: ${gitNote}`);
for (const w of warnings) console.log(`warning  ${w}`);
for (const e of errors) console.log(`ERROR    ${e}`);
console.log(errors.length ? `\nFAILED: ${errors.length} error(s), ${warnings.length} warning(s)` : `\nOK: ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
