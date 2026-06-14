# RBNT · Token Utility and Ecosystem Visibility

A sourced explainer of how Redbelly Network's native coin (RBNT) works, plus actionable kits to make RBNT and its real-world assets visible on DeFiLlama and RWA.xyz. Every figure is tagged official or secondary; no price predictions.

**Live site:** https://redbelly.smartcodedbot.com/rbnt

## Contents
- [`RBNT-Utility-Report.md`](RBNT-Utility-Report.md) · the full report (token, allocation, fee model, staking, and how institutional adoption consumes RBNT), with reproducible charts.
- [`RBNT-Explainer.md`](RBNT-Explainer.md) · a community-friendly version, under 500 words.
- [`charts/`](charts/) · `build_charts.py` and the generated PNGs, reproducible from [`data/`](data/) CSVs (`python3 charts/build_charts.py`).
- [`defillama-adapter/`](defillama-adapter/) · contract registry, API-query docs, a spec-compliant reference adapter, and the chainId-151 registration fix.
- [`rwa-xyz-kit/`](rwa-xyz-kit/) · network submission, filled AUDD and Hutly sHUT asset templates, asset-class mapping, and the listing walkthrough.
- [`site/`](site/) · the source of the live showcase site.

## Key facts (all cited in the report)
- RBNT total supply is **10,000,000,000, fixed** (whitepaper), with no inflation schedule.
- Allocation: 37% Ecosystem, 28% Investors, 20% Reserve, 10% Team, 3% Governance DAO, 2% co-developers (whitepaper section 5.2).
- Gas is **USD-denominated** (a simple transfer costs $0.01), settled in RBNT via an on-chain oracle.
- Staking is **100,000 RBNT per node**, enforced at the consensus layer.
- Mainnet is chain **151**; RBNT is the native coin.

## Reproduce the charts
```bash
python3 -m pip install matplotlib
python3 charts/build_charts.py
```

MIT licensed. See [LICENSE](LICENSE).
