// Tap-target check for rule UI-06 (WCAG 2.2 SC 2.5.8, Target Size (Minimum), 24 by 24 CSS px).
// Works with any project.
//
//   node tap-targets.mjs <url> [<url> ...] [--width=390] [--height=844] [--verbose]
//   (--verbose also lists the small targets the exceptions let through, so a person can confirm them)
//
// For each page at phone width it lists every visible, enabled control (links, buttons, inputs,
// [role=button], [tabindex]) smaller than 24 px in either direction, after applying two of the
// SC's exceptions automatically:
//   - spacing: a 24 px circle centred on the target overlaps no other target and no other
//     undersized target's circle;
//   - inline: a link that sits inside a run of text (its parent has more text than the link).
// What's left is printed for a person to judge. The "equivalent", "user agent control" and
// "essential" exceptions can't be decided by a script.
import puppeteer from 'puppeteer-core';

const CHROME =
    process.env.CHROME_PATH ||
    (process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : 'C:/Program Files/Google/Chrome/Application/chrome.exe');

const args = process.argv.slice(2);
const opt = (k, d) => +(args.find((a) => a.startsWith(`--${k}=`))?.split('=')[1] ?? d);
const urls = args.filter((a) => !a.startsWith('--'));
if (!urls.length) {
    console.error('Usage: node tap-targets.mjs <url> [<url> ...] [--width=390] [--height=844]');
    process.exit(1);
}
const W = opt('width', 390);
const H = opt('height', 844);
const verbose = args.includes('--verbose');

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--mute-audio'] });
const report = [];
for (const url of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: H, isMobile: true, hasTouch: true });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    // Scroll through so anything revealed on scroll is laid out.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 500) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await new Promise((r) => setTimeout(r, 100));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));

    const found = await page.evaluate(() => {
        const SEL = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [tabindex]:not([tabindex="-1"])';
        const visible = (el) => {
            const s = getComputedStyle(el);
            if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0 || el.disabled) return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
        };
        // Skip controls nested inside another control: the outer one is the target.
        const els = [...document.querySelectorAll(SEL)].filter((el) => visible(el) && !el.parentElement?.closest(SEL));
        const sx = window.scrollX, sy = window.scrollY;
        const items = els.map((el) => {
            const r = el.getBoundingClientRect();
            const box = { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height };
            const label = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || el.getAttribute('name') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 50);
            const parentText = (el.parentElement?.textContent || '').replace(/\s+/g, ' ').trim();
            const ownText = (el.textContent || '').replace(/\s+/g, ' ').trim();
            const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && parentText.length > ownText.length + 15;
            return { tag: el.tagName.toLowerCase(), label, box, inline, fixed: !!el.closest('[style*="position: fixed"], .fixed, .sticky') };
        });
        return items;
    });

    const small = found.filter((t) => t.box.w < 24 || t.box.h < 24);
    const centre = (b) => ({ cx: b.x + b.w / 2, cy: b.y + b.h / 2 });
    const circleHitsRect = (c, b) => {
        const nx = Math.max(b.x, Math.min(c.cx, b.x + b.w));
        const ny = Math.max(b.y, Math.min(c.cy, b.y + b.h));
        return (c.cx - nx) ** 2 + (c.cy - ny) ** 2 < 12 ** 2;
    };
    const failing = small.filter((t) => {
        if (t.inline) return false;
        const c = centre(t.box);
        const hitsTarget = found.some((o) => o !== t && circleHitsRect(c, o.box));
        const hitsCircle = small.some((o) => {
            if (o === t) return false;
            const d = centre(o.box);
            return (c.cx - d.cx) ** 2 + (c.cy - d.cy) ** 2 < 24 ** 2;
        });
        return hitsTarget || hitsCircle;
    });
    const fmt = (t) => `${t.tag} "${t.label}" ${Math.round(t.box.w)}x${Math.round(t.box.h)} at y=${Math.round(t.box.y)}`;
    report.push({
        url,
        targets: found.length,
        under24: small.length,
        passedBySpacingOrInline: small.length - failing.length,
        failing: failing.map(fmt),
        ...(verbose ? { exempted: small.filter((t) => !failing.includes(t)).map((t) => `${fmt(t)} (${t.inline ? 'inline' : 'spacing'})`) } : {}),
    });
    await page.close();
}
console.log(JSON.stringify({ viewport: `${W}x${H}`, pages: report }, null, 1));
await browser.close();
