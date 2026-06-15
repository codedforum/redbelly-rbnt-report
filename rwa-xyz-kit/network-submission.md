# RWA.xyz · Network submission (Redbelly Network)

The Network entity, filled for Redbelly. System-assigned fields (`id`, computed counts and metrics) are left for RWA.xyz. Values are on-chain (read live from chain 151) or from official sources, each cited.

| Field | Value | Source |
|---|---|---|
| name | Redbelly Network | official |
| slug | redbelly | proposed |
| chain id | 151 | on-chain `eth_chainId` = 0x97 |
| native coin | RBNT | official |
| RPC | https://governors.mainnet.redbelly.network | vine/environments |
| explorer | https://redbelly.routescan.io | vine/environments |
| website | https://redbelly.network | official |
| icon_url | https://redbelly.network (brand kit at /brand) | official |
| token standards | ERC-20 (EVM, SEVM) | on-chain |
| description | Public, EVM-compatible Layer 1 for compliant tokenization of real-world assets, with protocol-level identity (Receptor) and DBFT consensus. Co-developed at the University of Sydney with CSIRO. | official |
| parent_network_id | none (Layer 1) | n/a |
| mainnet launch | November 2024 | official Year-in-Review |
| token_count (RWA / stablecoin) | seed with the assets in `assets.md` (AUDD, sHUT, AUDM, AUDX, AUDF) | on-chain |
| bridged token (Ethereum) | Wrapped RBNT (WRBNT) `0xb45fFB51984d626Ee758b336C61Cf20990c6bF13`, 18 dec | etherscan, official channel |

Computed by RWA.xyz once the data feed is connected: `asset_count`, `holding_addresses_count`, `trailing_30_day_transfer_volume`, `trailing_30_day_active_addresses_count`, `daily_mints_dollar/token`, `bridged_token_market_cap_dollar`.

**Data feed for full support:** provide RWA-token supply, holder, and transfer data as Databricks Delta-Share or Parquet in cloud storage (RWA.xyz does not index chains directly). Recommended owner: the Redbelly foundation indexer exposes the chain-level feed, with each issuer (Novatti for AUDD, Hutly for sHUT) supplying its asset-level qualitative data per the templates in assets.md.

**Submission actions**
1. partners.rwa.xyz → Add New Company → enter the values above.
2. Email team@rwa.xyz referencing the submission and offering the data feed.
