# Tools

Browser scripts the AUDITOR uses (spec 04). They need Node 18+ and a local Chrome. Set `CHROME_PATH` if Chrome isn't in its default place on Windows or macOS.

```
cd "Conversion Blueprint/tools"
npm install
node shoot.mjs http://localhost:5175/anniversary out/anniversary
node hooga-attribution-flow.mjs http://localhost:5175
```

| Script | What it does |
|---|---|
| `shoot.mjs` | Takes a first-screen and a full-page screenshot, and lists console errors. Works with any project. |
| `hooga-attribution-flow.mjs` | Clicks through Hooga V3 from a landing page to the booking and gift hand-offs, and checks that `gclid` and the UTM tags survive (rule TRK-02). Hooga-specific. |
| `validate-ledger.mjs` | Checks `ledger.json` against spec 01. Not written yet (task T1). |

Screenshots go in `out/`, which git ignores.
