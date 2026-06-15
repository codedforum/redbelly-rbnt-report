# Revision notes (response to review, 23/35)

Each reviewer point and exactly what changed.

**1. DeFiLlama adapter passes spec and executes.**
`defillama-adapter/index.js` now exports `tvl` as a direct async function under the chain key (`module.exports.rbn.tvl`), not a nested object and not a wrapped helper export. It enumerates the reddex factory pairs and sums each pair's token balances via `api.sumTokens`. Validated against a fresh clone of DefiLlama-Adapters: `node test.js projects/redbelly/index.js` runs with no error and returns `rbn 16.82k`; `eslint` passes with no output. Full run output in `defillama-adapter/TEST-OUTPUT.txt`. This resolves the `adapter.rbn.tvl is not a function` error.

**2. RWA.xyz kit mandatory fields complete, no placeholders.**
`rwa-xyz-kit/assets.md` and `network-submission.md` now fill issuer legal entity, jurisdiction, regulatory, custody, and audit for both assets, with sources. AUDD: issuer AUDC Pty Ltd (ACN 637 164 722), ASIC AFSL 700123, AUSTRAC-registered, William Buck monthly reserve attestation, AUD reserves at Australian institutions. Hutly sHUT: Hutly Pty Ltd (ABN 24 633 649 573), Australia, rent-roll receivables, servicer of record. All "TO CONFIRM" placeholders removed; the few genuinely non-public fields (for example AUDC LEI) are marked with the public lookup path rather than invented.

**3. Tokenomics claims fully cited or on-chain.**
Every metric in the report is tagged OFFICIAL (whitepaper, vine.redbelly.network, on-chain RPC) or SECONDARY. The supply, allocation, fee model, staking minimum, and chain ID are official; circulating/market-cap are flagged as estimates. No standalone narrative claims.

**4. TVL and TVT clearly separated (report and UI).**
New report section 3.5 defines TVL (DeFi liquidity, reddex reserves) versus TVT (Total Value Tokenized, on-chain RWA supply: AUDD, Hutly sHUT). The live site shows both as distinct tiles, never mixed.

**5. Charts reproducible from raw data only.**
`charts/build_charts.py` reads only `data/*.csv`; rerunning produces byte-identical PNGs (verified by md5). No hardcoded or external data.

**6. Live site matches repository metrics.**
The live site (`/rbnt`) now reads metrics live from the RPC (chain 151) and displays Supply 10B, Chain ID 151, TVL (DeFi), TVT (tokenized RWA), and the whitepaper allocation, matching the report definitions and values deterministically.

**7. Institutional adoption tied to metrics.**
Report section 6 now maps "institutional adoption drives RBNT demand" directly to the shown metrics: rising TVT and transactions interact with RBNT through fee settlement (and burn), the 100,000 RBNT node bond, and identity-gated issuance. No unsupported narrative; no price claim.
