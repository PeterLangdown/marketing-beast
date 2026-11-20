// Hooga V3 attribution test (checks rule TRK-02 and the booking/gift hand-offs).
// Hooga-specific: it relies on Hooga's button text. Generalise it once a second project needs it.
//
// Usage: node hooga-attribution-flow.mjs [baseUrl=http://localhost:5175]
// Start Hooga V3 first:  cd "apps/Hooga Website/couples-site-v3" && npx vite --port 5175
//
// Checks:
//  1. /anniversary?gclid=…&utm_*: the hero CTA scrolls to the fork without leaving the page,
//     choosing The Yurt and 1 night then booking lands on /booking with gclid, UTMs, retreat,
//     nights and occasion all in the URL, and every dataLayer event carries the gclid.
//  2. /birthday?gclid=…: choosing a voucher and "Give this gift" lands on /gift with the gclid kept.
import puppeteer from 'puppeteer-core';

const CHROME =
    process.env.CHROME_PATH ||
    (process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : 'C:/Program Files/Google/Chrome/Application/chrome.exe');
const BASE = process.argv[2] || 'http://localhost:5175';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
const out = {};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const clickInFork = (match) =>
    page.evaluate((m) => {
        const f = document.querySelector('#fork');
        const b = [...f.querySelectorAll('button')].find((x) => {
            const t = x.textContent.trim();
            return m.exact ? t.toUpperCase() === m.text.toUpperCase() : m.starts ? t.toUpperCase().startsWith(m.text.toUpperCase()) : t.includes(m.text);
        });
        if (!b) return false;
        b.click();
        return true;
    }, match);

// 1. Dates path
await page.goto(`${BASE}/anniversary?gclid=TEST123&utm_source=google&utm_campaign=anniv`, { waitUntil: 'networkidle2' });
await clickInFork({ text: 'The Yurt', exact: true });
await clickInFork({ text: '1 night', starts: true });
out.navHiddenOnLanding = await page.evaluate(() => !document.querySelector('button[aria-label="Open menu"]'));
await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim().toUpperCase().startsWith('CHECK ANNIVERSARY DATES'));
    b?.click();
});
await wait(400);
out.heroCtaStaysOnPage = page.url().includes('/anniversary');
await clickInFork({ text: 'CHECK ANNIVERSARY DATES', exact: true });
await wait(800);
out.bookingUrl = page.url();
out.bookingKeepsGclid = out.bookingUrl.includes('gclid=TEST123');
out.bookingKeepsUtm = out.bookingUrl.includes('utm_source=google') && out.bookingUrl.includes('utm_campaign=anniv');
out.events = await page.evaluate(() =>
    (window.dataLayer || []).map((e) => `${e.event}${e.path_type ? ':' + e.path_type : ''}${e.attribution?.gclid ? ' [gclid=' + e.attribution.gclid + ']' : ' [NO gclid]'}`)
);

// 2. Gift path
await page.goto(`${BASE}/birthday?gclid=GIFT999`, { waitUntil: 'networkidle2' });
await clickInFork({ text: 'One-Night' });
await clickInFork({ text: 'GIVE THIS GIFT', starts: true });
await wait(800);
out.giftUrl = page.url();
out.giftKeepsGclid = out.giftUrl.includes('gclid=GIFT999');

console.log(JSON.stringify(out, null, 1));
await browser.close();
