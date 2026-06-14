# Redbelly · RWA.xyz submission kit

Redbelly Network is absent from RWA.xyz (which currently supports 22 networks). Redbelly hosts live, identity-gated RWA and stablecoin tokens, so it is a legitimate listing candidate. This kit contains everything a submitter needs: the process, the filled network submission, filled asset templates, the asset-class mapping, and the verification checklist.

Files in this kit:
- `network-submission.md` · the Network entity, filled for Redbelly
- `assets.md` · per-asset qualitative templates, filled for AUDD and Hutly sHUT
- this README · process, asset-class mapping, and the end-to-end checklist

## How listing works (two parallel tracks)

**Track A · list the network (Redbelly itself)**
1. Go to `https://partners.rwa.xyz/`, click **Claim Company**, search "Redbelly". Not present, so click **Add New Company** and create the profile with the exact public name and slug.
2. Email **team@rwa.xyz** to flag a new-network integration and reference the partner submission.
3. For **full** support (vs limited), provide a data feed: RWA.xyz does not run its own indexer and prefers data as **Databricks Delta-Share or Parquet** files in cloud storage. Limited support tracks supply and basic metadata only.

**Track B · onboard each issuer or asset (AUDD, Hutly, then others)**
1. Register the issuer or platform on `partners.rwa.xyz` (reviewed within a few days).
2. RWA.xyz emails a qualitative template spreadsheet; fill it per asset (the fields are in `assets.md`).
3. Connect the on-chain data feed (Parquet or Delta-Share, or the verified contract addresses they ingest) for the quantitative metrics.

**Timeline:** directory review in days; full integration typically 4 to 8 weeks.

## Full vs limited support

- **Full support:** all on-chain metrics (supply, holders, transfers, transactions) computed and refreshed daily. Requires RWA.xyz to resolve holder-level and transaction-level data, which for a smaller chain means a supplied data feed.
- **Limited support:** token supply and basic metadata only; holder and transaction metrics may be incomplete.

A freshly integrated network like Redbelly typically launches with a BETA tag, similar to how Plume appears today.

## Asset-class mapping (RWA.xyz taxonomy → Redbelly use cases)

RWA.xyz uses nine asset classes plus an orthogonal tokenization-type label (Distributed vs Represented). Redbelly maps as:

| Redbelly asset | RWA.xyz asset class | Tokenization type |
|---|---|---|
| AUDD, AUDM, AUDX, AUDF | Stablecoins | Distributed (with eligibility controls) |
| Hutly sHUT (rent rolls) | Real Estate | Distributed (whitelisted) |
| Liquidise / Tokeniser (private equity) | Private Equity and Venture Capital | Distributed (permissioned) |
| Wisr Smart ABS (Project Acacia) | Credit · Asset-Backed Credit | Represented or Distributed (pilot, permissioned) |
| Imperium corporate bond (pilot) | Credit · Corporate Credit | Represented (pilot) |

Because Redbelly enforces identity at the protocol level, most assets are **Distributed with whitelist or eligibility controls** (tokens still move between wallets), not Represented, unless an issuer restricts transfer to its own platform.

## Mandatory fields (minimum required)

RWA.xyz requires very little to create a record; depth is optional but drives a credible page.
- **Network:** `name`, `slug` (system assigns `id`, `token_count`).
- **Issuer:** `id`, `name`.
- **Asset:** `id`, `asset_id`, `name`.
- **Token:** `id`, `token_id`, `name`, `address`, `decimals`, `protocol_id/name`, `platform_id/name`, `network_id/name`.

Everything else (NAV, yield, jurisdiction, service providers, transparency URL, holders, transfers) is optional but expected for full support. `assets.md` fills these for AUDD and sHUT.

## End-to-end checklist

Phase A · network
- [ ] Confirm mainnet is public: chain 151, RPC `https://governors.mainnet.redbelly.network`, explorer `https://redbelly.routescan.io`.
- [ ] partners.rwa.xyz → Add New Company → enter Redbelly name, slug, logo, website, description, explorer, chain id, token standards.
- [ ] Email team@rwa.xyz referencing the submission.
- [ ] Decide the data path: offer Delta-Share or Parquet exports of RWA-token supply, holder, and transfer data for full support.

Phase B · assets and issuers
- [ ] Register each issuer or platform (Novatti for AUDD, Hutly for sHUT).
- [ ] Complete the qualitative template per asset (see `assets.md`).
- [ ] Provide verified token contract addresses, decimals, standard, and network for each.
- [ ] Classify each asset into one of the nine classes and the tokenization type.
- [ ] Connect the on-chain data feed for quantitative metrics.

Supporting and verification documents RWA.xyz expects: proof of on-chain deployment (verified contract addresses), issuer legal entity and jurisdiction (LEI, CIK where applicable), regulatory framework and registration, transparency or proof-of-reserve URL, auditor and custodian, fee schedule and redemption terms, and primary-market terms (KYC provider, minimum subscription, eligible investor types). Ratings (S&P, Bluechip) optional.

## Sources
docs.rwa.xyz/methodology/coverage · docs.rwa.xyz/onboarding · docs.rwa.xyz/get-listed-on-rwa.xyz · docs.rwa.xyz/api/endpoints (networks, issuers, tokens) · docs.rwa.xyz/schemas (data-model, tokens, assets) · docs.rwa.xyz/frameworks (asset-classes, tokenization-type) · partners.rwa.xyz · app.rwa.xyz/networks/plume · app.rwa.xyz/platforms/ondo
