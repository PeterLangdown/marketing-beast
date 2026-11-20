// Screenshot a page: the first screen and the whole page, plus any console errors.
// Usage: node shoot.mjs <url> <outPrefix> [width=390] [height=844]
// Saves <outPrefix>-hero.png and <outPrefix>-full.png.
// Chrome: set CHROME_PATH, or the default for Windows / macOS is used.
import puppeteer from 'puppeteer-core';

const CHROME =
    process.env.CHROME_PATH ||
    (process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : 'C:/Program Files/Google/Chrome/Application/chrome.exe');

const [url, out, w = '390', h = '844'] = process.argv.slice(2);
if (!url || !out) {
    console.error('Usage: node shoot.mjs <url> <outPrefix> [width] [height]');
    process.exit(1);
}

const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'],
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1, isMobile: +w < 700, hasTouch: +w < 700 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => errors.push(`goto: ${e.message}`));
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: `${out}-hero.png` });

// Scroll through so lazy images load, then capture the full page.
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 120));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: `${out}-full.png`, fullPage: true, captureBeyondViewport: true });
console.log(JSON.stringify({ url, height: total, errors: [...new Set(errors)].slice(0, 15) }, null, 1));
await browser.close();
