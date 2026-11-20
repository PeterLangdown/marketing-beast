#!/usr/bin/env node
// Writes projects/<slug>/requirements.md from ledger.json, the project's project.json and its scorecard.json
// (layout: specs/02-projects.md). Statuses live in scorecard.json, so regenerating never loses a tick.
//
//   node tools/generate-requirements.mjs hooga-retreats          (from Conversion Blueprint/)
//   node tools/generate-requirements.mjs hooga-retreats --check  (exit 1 if requirements.md is out of date)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
const checkOnly = process.argv.includes('--check');
if (!slug) { console.error('usage: node tools/generate-requirements.mjs <slug> [--check]'); process.exit(1); }

const dir = resolve(root, 'projects', slug);
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const ledger = read(resolve(root, 'ledger.json'));
const project = read(resolve(dir, 'project.json'));
const scorePath = resolve(dir, 'scorecard.json');
if (!existsSync(scorePath)) { console.error(`No scorecard at ${scorePath}. Create it from templates/scorecard.json first.`); process.exit(1); }
const score = read(scorePath);

const STREAMS = Object.keys(ledger.streams);
const BOX = { pass: '[x]', 'not-checked': '[ ]', fail: '[!]', gap: '[~]', 'n/a': '[-]' };
const inScope = (r) => r.scope.includes('core') || r.scope.some((m) => project.modules.includes(m));
const live = ledger.rules.filter((r) => ['active', 'proposed'].includes(r.status) && inScope(r));
const notApplied = live.filter((r) => score.notApplied?.[r.id]);
const applied = live.filter((r) => !score.notApplied?.[r.id]);
const item = (r) => score.items?.[r.id] ?? { status: 'not-checked', here: '' };

const standards = applied.filter((r) => r.kind === 'standard' && r.verdict !== 'Avoid');
const donts = applied.filter((r) => r.verdict === 'Avoid');
const bets = applied.filter((r) => r.kind === 'bet' && r.verdict !== 'Avoid');
const gated = applied.filter((r) => r.kind === 'standard' || r.verdict === 'Avoid');

const missing = applied.filter((r) => !score.items?.[r.id]).map((r) => r.id);
const unknown = Object.keys(score.items ?? {}).filter((id) => !live.some((r) => r.id === id));

const tally = (list) => list.reduce((a, r) => ((a[item(r).status] = (a[item(r).status] ?? 0) + 1), a), {});
const t = tally(gated);
const blockers = gated.filter((r) => {
  const it = item(r);
  return it.status === 'fail' || it.status === 'not-checked' || (it.status === 'gap' && !it.gapAcceptedByPete);
});

const fmtRule = (r, opts = {}) => {
  const it = item(r);
  const proposed = r.status === 'proposed' ? ' (proposed)' : '';
  const lines = [`- ${BOX[it.status] ?? '[ ]'} **${r.id}** · ${r.kind} · ${r.evidence.rating}${proposed}`, `  ${r.rule}`];
  lines.push(`  *Check:* ${r.check}`);
  if (opts.bet) {
    const b = score.bets?.[r.id] ?? {};
    const latest = (b.readings ?? []).filter((x) => x.date).at(-1);
    lines.push(`  *Metric:* ${r.metric.measure} (${r.metric.direction}); guardrail: ${r.metric.guardrail || 'none set'}.`);
    lines.push(`  *Reading:* baseline ${b.baseline ?? 'not set'}; ${latest ? `latest ${latest.value} (n=${latest.n}, ${latest.date})` : 'no readings yet'}; read: ${b.read ?? 'too early'}.`);
  }
  const accepted = it.status === 'gap' ? ` Gap accepted by Pete: ${it.gapAcceptedByPete ? 'yes' : 'no'}.` : '';
  const when = it.checked ? ` (checked ${it.checked}${it.by ? `, ${it.by}` : ''})` : '';
  lines.push(`  *Here:* ${it.here || 'Not looked at yet.'}${accepted}${when}`);
  return lines.join('\n');
};

const byStream = (list, fmt) => STREAMS.flatMap((s) => {
  const rs = list.filter((r) => r.stream === s);
  return rs.length ? [`### ${s}: ${ledger.streams[s]}`, '', ...rs.map(fmt).flatMap((x) => [x, '']), ''] : [];
});

const target = resolve(dir, 'requirements.md');
const current = existsSync(target) ? readFileSync(target, 'utf8').replace(/\r\n/g, '\n') : '';
// In --check mode, reuse the date the current file was generated on, so only real changes count.
const today = (checkOnly && current.match(/Generated from ledger\.json on (\d{4}-\d{2}-\d{2})/)?.[1]) || new Date().toISOString().slice(0, 10);
const out = [];
out.push(`# Conversion requirements: ${project.name}`);
out.push('');
out.push(`*Generated from \`Conversion Blueprint/ledger.json\` (ledger updated ${ledger.updated}) on ${today}. Project: \`${project.slug}\` · modules: ${project.modules.join(', ')} · stage: ${project.stage}.*`);
out.push('');
out.push(`**Don't hand-edit this file.** Statuses live in \`scorecard.json\`; rules live in the ledger. Ask a Marketing Beast session to regenerate. Rules marked **(proposed)** haven't been confirmed by Pete yet.`);
out.push('');
out.push('## Where things stand');
out.push('');
out.push(`- **Launch gate** (standards and don'ts, ${gated.length} rules): ${t.pass ?? 0} pass · ${t.fail ?? 0} fail · ${t.gap ?? 0} gap · ${t['not-checked'] ?? 0} not checked · ${t['n/a'] ?? 0} n/a.`);
out.push(`- **Bets** (${bets.length}): ${bets.filter((r) => item(r).status === 'pass').length} in place, ${bets.filter((r) => item(r).status !== 'pass').length} not yet built or not checked.`);
const ids = (list) => (list.length ? list.map((r) => r.id).join(', ') : 'none');
out.push(`- **Blocking launch** (launch needs every standard and don't to be pass, n/a, or a gap Pete has accepted):`);
out.push(`  - failing or an open gap: ${ids(blockers.filter((r) => item(r).status !== 'not-checked'))};`);
out.push(`  - not checked yet: ${ids(blockers.filter((r) => item(r).status === 'not-checked'))}.`);
out.push(`- **Open questions for Pete:** see \`brief.md\` §10.`);
out.push('');
out.push('Boxes: `[x]` pass · `[ ]` not checked yet · `[!]` fail · `[~]` gap · `[-]` n/a. For a bet, `[x]` means it is in place on the site, ready to be measured.');
out.push('');
out.push('## 1. Standards: must pass before launch');
out.push('');
out.push(...byStream(standards, (r) => fmtRule(r)));
out.push('## 2. Bets in play');
out.push('');
out.push(...byStream(bets, (r) => fmtRule(r, { bet: true })));
out.push("## 3. Don'ts");
out.push('');
out.push(...donts.flatMap((r) => [fmtRule(r), '']));
out.push('## 4. Targets');
out.push('');
out.push('From the project\'s own economics, never from industry benchmarks (PLAN.md §9). A blank value names the number it\'s waiting for.');
out.push('');
out.push('| Target | Value | Basis | Actual |');
out.push('|---|---|---|---|');
for (const tg of score.targets ?? []) out.push(`| ${tg.name} | ${tg.value ?? '—'} | ${tg.basis} | ${tg.actual ?? '—'} |`);
out.push('');
out.push('## 5. Not applied here');
out.push('');
out.push(...(notApplied.length ? notApplied.map((r) => `- **${r.id}** · ${r.rule} *Why not:* ${score.notApplied[r.id]}`) : ['None.']));
out.push('');
out.push('## 6. Gaps Pete has accepted');
out.push('');
const accepted = gated.filter((r) => item(r).status === 'gap' && item(r).gapAcceptedByPete);
out.push(...(accepted.length ? accepted.map((r) => `- **${r.id}** · ${item(r).here}`) : ['None yet.']));
out.push('');
out.push('---');
out.push(`Generated from ledger.json on ${today}. Don't hand-edit. Ask a Marketing Beast session to regenerate.`);
const text = out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';

if (missing.length) console.warn(`warning: no scorecard item for ${missing.join(', ')} (shown as not checked)`);
if (unknown.length) console.warn(`warning: scorecard has items for rules not in this project's list: ${unknown.join(', ')}`);

if (checkOnly) {
  if (current !== text) { console.error('requirements.md is out of date: regenerate it'); process.exit(1); }
  console.log('requirements.md is up to date');
} else {
  writeFileSync(target, text);
  console.log(`wrote ${target}: ${gated.length} gated, ${bets.length} bets, ${notApplied.length} not applied, ${blockers.length} blocking`);
}
