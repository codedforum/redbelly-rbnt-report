# RBNT Token Utility and Ecosystem Visibility Report

**Network:** Redbelly Network (RWA-focused public Layer 1)
**Token:** RBNT (native coin)
**Scope:** token utility, network economics, and how institutional adoption translates into RBNT demand. This report contains no price targets, return projections, or extrapolated future values. Every quantitative claim is tagged **[OFFICIAL]** (redbelly.network, the whitepaper, vine.redbelly.network, or on-chain data) or **[SECONDARY]** (aggregators or media), and all chart data is reproducible from the cited sources (see `charts/` and `data/`).

---

## 1. Executive summary

Redbelly Network is a public, EVM-compatible Layer 1 purpose-built for compliant tokenization of real-world assets (RWA), co-developed at the University of Sydney with CSIRO. Its native coin, **RBNT**, has a **fixed supply of 10,000,000,000** and is used for transaction fees, staking, sharding, governance, and ecosystem rewards. [OFFICIAL: whitepaper §5]

The token's demand thesis is structural rather than speculative: Redbelly prices gas in **US dollars** (a simple transfer costs exactly **$0.01**), settles those fees in RBNT via an on-chain oracle, and requires every validating node to bond **100,000 RBNT**. As compliant RWA volume moves on-chain, fee throughput and the staked-bond base are the two channels through which adoption consumes and locks RBNT. [OFFICIAL: vine.redbelly.network/network-fees, /nodes/staking]

Redbelly's adoption signals are real and, in several cases, government-corroborated (Project Acacia with the Reserve Bank of Australia and ASIC; ASX-listed Wisr), but they are **Australia-concentrated and largely pilot-stage**. The widely cited "$73.8B pipeline" is a self-reported forward pipeline, not assets currently on-chain; realized tokenized value is on the order of ~$1B. This report separates the two carefully.

On ecosystem visibility, Redbelly's DEX TVL is **already tracked on DeFiLlama** (under chain key `rbn`, via the reddex and Uniswap V3 adapters) but the chain is mapped with a **null chainId**, and Redbelly is **absent from RWA.xyz**. Sections 8-9 and the accompanying submission kits provide actionable, specification-compliant paths to close both gaps.

---

## 2. Network overview

| Property | Value | Source |
|---|---|---|
| Type | Public Layer 1, EVM-compatible (SEVM) | [OFFICIAL] redbelly.network |
| Consensus | DBFT (Democratic Byzantine Fault Tolerant), leaderless, deterministic finality | [OFFICIAL] whitepaper |
| Origin | University of Sydney and CSIRO (Australia) | [OFFICIAL] redbelly.network |
| Focus | Compliant RWA tokenization; identity/accountability at the transaction layer (Receptor) | [OFFICIAL] redbelly.network, vine |
| Mainnet | Chain ID **151**, RPC `https://governors.mainnet.redbelly.network`, explorer `https://redbelly.routescan.io` | [OFFICIAL] vine/environments, on-chain `eth_chainId` = 0x97 |
| Testnet | Chain ID **153**, RPC `https://governors.testnet.redbelly.network` | [OFFICIAL] vine/environments |
| Native coin | RBNT (gas, staking, governance) | [OFFICIAL] vine/native-currency |

Redbelly's distinguishing design choice is **protocol-level identity**: participants are verified entities (via the Receptor credential system, with zero-knowledge selective disclosure), which is what makes the chain suitable for regulated asset issuance. This is also why staking and validation are enforced at the consensus layer rather than through a public staking contract (see §5 and §8).

---

## 3. RBNT token overview

- **Type:** RBNT is the **native coin** of chain 151 (the gas asset), not an ERC-20 on its own L1. Bridged ERC-20 representations exist on other chains (see §8.3). [OFFICIAL]
- **Total supply:** **10,000,000,000 RBNT, fixed.** Direct from the whitepaper: *"the native Redbelly Network Coin (RBNT) ... has a fixed supply of 10,000,000,000."* There is **no inflation schedule**; rewards are paid from a pre-allocated pool, not by minting new supply. [OFFICIAL: whitepaper §5.1]
- **Circulating supply:** approximately **2.65B RBNT** as displayed on the official explorer (Routescan), with a displayed market capitalization near **$9.8M**. Redbelly does not publish an official circulating-supply figure; treat circulating/market-cap as on-chain-derived estimates. [OFFICIAL-derived: redbelly.routescan.io]

> Aggregator note: CoinMarketCap/CoinGecko/MEXC report the same 10B total supply (consistent with the whitepaper) and ~2.5B circulating. The 10B figure is officially confirmed; circulating/FDV are estimates. [SECONDARY]

---

## 4. Token allocation and distribution

The authoritative allocation is the whitepaper's (§5.2). Note that the table is published as an image in the PDF; the figures below were read from the current (2025) and v1.4 (Dec 2024) revisions, which are identical.

| Category | Allocation | Tokens | Notes |
|---|---|---|---|
| Ecosystem Development | **37%** | 3.70B | Incentives & rewards, ecosystem grants, network-effect/product adoption |
| Investors | **28%** | 2.80B | Seed 13% · Private A 7.5% · Private B 6.9% · Private C 0.7% |
| Reserve | **20%** | 2.00B | Governance-controlled, no fixed release schedule |
| Team | **10%** | 1.00B | |
| Governance DAO | **3%** | 0.30B | DAO-controlled treasury/operations |
| USYD & CSIRO | **2%** | 0.20B | Co-developers |
| **Total** | **100%** | **10.00B** | Fixed supply |

[OFFICIAL: redbelly.network/redbelly-network-whitepaper.pdf §5.2] · Chart: `charts/allocation.png` (data: `data/allocation.csv`)

> Correction of a common secondary figure: some aggregators (originating from a Jan-2024 Medium write-up that predates whitepaper v1.4) cite "30% rewards / 29% investors / 6% ecosystem / ...". That is **superseded**. The "30% rewards and 6% ecosystem" buckets were consolidated and renamed "Ecosystem Development" (37%); investors normalized from 29% to 28%. Use the official table above. [OFFICIAL supersedes SECONDARY]

**Vesting:** Redbelly does not publish a category-level cliff/linear-vesting schedule (a genuine data gap). The only firm, official vesting datum is that **node-operator signup bonuses vest over 4 years**, and the 20% Reserve has **no defined release schedule** (governance-controlled). The Gate.io public IEO (Dec 27-29, 2024) distributed 500,000 RBNT at 100% unlock. [OFFICIAL: vine/nodes/signup-bonuses; SECONDARY: coincarp for IEO]

---

## 5. Token utility

RBNT has five officially documented uses: **transaction fees, staking, sharding, governance, and rewards/incentives.** [OFFICIAL: whitepaper §5.1]

### 5.1 Transaction fees (USD-denominated gas)
Redbelly prices gas in **US dollars**, not in a floating amount of the native coin. A simple transfer costs exactly **$0.01** (a fixed unit gas price multiplied by 21,000 gas). An on-chain price oracle converts the USD cost into the RBNT amount owed at execution time. The practical effect: fee cost is predictable for builders and institutions regardless of RBNT's market price, while the **RBNT quantity consumed per unit of USD fee rises as the token price falls and vice versa.** [OFFICIAL: vine/network-fees]

### 5.2 Fee distribution
Network fees are split on a volume-tiered basis: **Node Operators 40% to 60%**, **Redbelly foundation 30% down to 5%**, **Accredited Issuers (identity partners) a flat 30%**, plus a **5% burn** that activates once daily transactions exceed 1,000,000 and while supply remains above 5B. The Redbelly DAO is also a fee recipient. [OFFICIAL: vine/network-fees/distribution] · Chart: `charts/fee-distribution.png`

### 5.3 Staking
Every node (Governor or Candidate) must bond a minimum of **100,000 RBNT** as a slashable anti-malice deposit; the network targets **600 nodes (500 Candidates and 100 Governors)**, implying a design-cap staked base of **60,000,000 RBNT**. Staking also underpins oracle operation and shard initiation. No fixed APY is published; node returns are fee-driven, and Governors earn roughly 2x a Candidate's per-node share. [OFFICIAL: vine/nodes/staking, /network-fees/distribution]

### 5.4 Sharding and consensus
DBFT produces deterministic-finality "superblocks"; consensus (Governors) and execution (SEVM validators) are decoupled, and shards are processed in parallel with validators selected by RBNT holdings. RBNT is used for shard initiation and management. [OFFICIAL: whitepaper, vine/consensus]

### 5.5 Governance
The Governance DAO (3% allocation) lets RBNT holders propose and vote, with weight proportional to holdings, over upgrades, partnerships, resource allocation, and working groups. Contributor rewards are paid in RBNT and USDT. [OFFICIAL: vine network-governance; dao.redbelly.network]

---

## 6. Network economics: how the model consumes RBNT

Two mechanisms tie usage to RBNT demand, both documented and non-speculative:

1. **Fee settlement in RBNT.** Because every transaction's USD-denominated fee is paid in RBNT, transaction throughput creates a continuous bid for the coin, a portion of which is **burned** once the 1M-daily-tx threshold is met (while supply > 5B). Higher compliant-RWA activity means more fee-settlement volume in RBNT. [OFFICIAL]
2. **Staked bond.** Each validating node locks 100,000 RBNT. Network growth (more nodes) increases the locked, non-circulating bond base, up to the 60M-RBNT design cap. [OFFICIAL]

This report makes no claim about price. It documents the **mechanical channels** (fee settlement, burn, staked lock-up) through which adoption interacts with the fixed 10B supply.

---

## 7. How institutional adoption drives RBNT (evidence, with realized vs pipeline separated)

Redbelly's thesis is that regulated institutions issuing RWA on-chain generate fee throughput (settled in RBNT) and require identity-gated infrastructure. The evidence:

| Initiative | What | Status | Source |
|---|---|---|---|
| Mainnet | Live since Nov 2024; zero downtime reported through 2025 | **Live** | [OFFICIAL] Year-in-Review 2025 |
| Liquidise / Tokeniser | Private-equity tokenization | **Live** (mainnet Jan 2025; ~$736M claimed) | [OFFICIAL] liquidise.com |
| Hutly (sHUT) | Rent-roll tokenization | **Partial / on-chain** (sHUT token live, 11,569 holders; ~$210M of a $1.8B headline) | [OFFICIAL] redbelly.network/blog; on-chain |
| AUDD (Novatti) | AUD stablecoin | **Live** on chain 151 (also on Hedera) | [OFFICIAL] audd.digital; on-chain |
| Project Acacia | RBA / ASIC CBDC and tokenized-asset pilot (Wisr A$250M Smart ABS, Imperium bond) | **Live pilot** (regulatory relief; findings due ~Q1 2026) | [OFFICIAL] treasury.gov.au, redbelly.network/blog |
| Averer, IQ-EQ/AMAL, LayerZero, Celer, CSIRO | Identity, trustee, infra | Mixed (Averer/LayerZero/Celer live; IQ-EQ upcoming) | [OFFICIAL] redbelly.network/ecosystem |

**The "$73.8B pipeline"** originates from Redbelly's own June 4, 2024 testnet-launch blog and is a **self-reported forward pipeline mixing announced and unannounced customers**, not on-chain TVL. Realized on-chain value is on the order of ~$1B. We cite the headline only as a pipeline figure, clearly labeled. [OFFICIAL source, framed as pipeline]

Chart: `charts/adoption.png` (realized vs pipeline) · data: `data/adoption.csv`

---

## 8. On-chain state and ecosystem visibility

### 8.1 Live tokenized assets on chain 151
The explorer indexes 18 or more ERC-20s, including real RWA/stablecoins with on-chain activity:

| Token | Address | Notes | Source |
|---|---|---|---|
| AUDD (Novatti) | `0x54a210e824B0F89dA988E4B5586440aB354f0e46` | AUD stablecoin, active | on-chain |
| Hutly sHUT | `0x93239eBEe8c0a43F77453B1bBD9803a9F947Ea84` | ~343M supply, 11,569 holders | on-chain |
| WRBNT (mainnet) | `0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076` | wrapped native | on-chain |
| AUDM / AUDX / AUDF | `0x081599…` / `0xD68775…` / `0xd2a530…` | AUD stablecoin variants | on-chain |

The flagship Liquidise PE tokens and the Wisr Smart ABS / Imperium bond are reported by official blogs but are **permissioned and not publicly indexed** (no public contract addresses), so the "over $1B tokenized" headline is issuer-claimed rather than explorer-verifiable.

### 8.2 DeFiLlama
Redbelly **is tracked on DeFiLlama** under the internal chain key `rbn` (gecko id `redbelly-network-token`), reporting roughly **$43.6K** of TVL across two protocols: **reddex** (a Uniswap V2 fork, ~$23K across 7 live liquidity pairs) and **Uniswap V3** (~$20.5K). The chain's DEX TVL is therefore already covered by community adapters. Two real gaps remain: the chain is mapped with **`chainId: null`** (it should be **151**) in DeFiLlama's configuration, and there is no consolidated public contract registry or query guide for Redbelly's on-chain value. The DeFiLlama submission kit accordingly (1) supplies the chainId-151 registration fix, (2) documents the existing adapter coverage and a full contract registry (the reddex factory and its pairs, the tracked tokens, Uniswap V3), and (3) provides API-query documentation. **Note on staking:** Redbelly's validator staking (100,000 RBNT per node) is enforced at the consensus layer, off-EVM, so it is not trustlessly readable as a contract balance and is correctly excluded from chain TVL.

### 8.3 Cross-chain RBNT
Only the **Ethereum** representation is verified-official: **Wrapped RBNT (WRBNT)** at `0xb45fFB51984d626Ee758b336C61Cf20990c6bF13` (18 decimals, ~43.4M supply, deployed via Router Protocol as a pegged lock-mint asset, confirmed by Redbelly's official channel). **Celer cBridge** is an official bridge partner (Redbelly to Ethereum and Redbelly to BNB). Addresses circulating for Base/BSC/Arbitrum show clone/honeypot characteristics (mismatched decimals/supply) and are **not treated as canonical** in this report pending direct Redbelly confirmation. [OFFICIAL: etherscan and Redbelly channel; flagged]

### 8.4 RWA.xyz
Redbelly is **absent** from RWA.xyz's 22 supported networks. Because Redbelly hosts live, identity-gated RWA/stablecoin tokens, it is a legitimate listing candidate. The RWA.xyz submission kit provides the network registration, the per-asset data template, and the asset-class mapping.

---

## 9. Ecosystem visibility plan (summary)

| Platform | Current state | Action | Timeline |
|---|---|---|---|
| DeFiLlama | DEX TVL tracked (reddex, Uniswap V3) under key `rbn`; `chainId: null` | Fix chainId to 151; document existing coverage, contract registry, and API queries | Days (PR) |
| RWA.xyz | Absent | Register network via partners.rwa.xyz and team@rwa.xyz; onboard issuers (AUDD, Hutly) with the filled asset template; deliver data feed | 4 to 8 weeks |

Both kits are actionable within 30 days for the submission steps that are in Redbelly's control (the RWA.xyz full-data integration depends on issuer cooperation).

---

## 10. Methodology, reproducibility, and data gaps

- **Sources:** every claim is tagged OFFICIAL or SECONDARY with a URL. The load-bearing figures (10B fixed supply, allocation, fee model, staking minimum, chain ID) are OFFICIAL.
- **Charts:** all charts are generated by `charts/build_charts.py` from CSVs in `data/`, which contain only cited values. Re-run `python3 charts/build_charts.py` to reproduce.
- **No projections:** this report contains no price targets or future-value extrapolations, per scope.
- **Known data gaps (disclosed):** (1) no public per-round vesting schedule; (2) no official canonical cross-chain address list beyond Ethereum WRBNT; (3) validator staking is off-EVM and not readable as a contract balance; (4) the $73.8B figure is pipeline, not TVL.

---

## 11. Sources

**Official:** redbelly.network/redbelly-network-whitepaper.pdf · redbelly.network/asset-tokenisation · redbelly.network/ecosystem · redbelly.network/blog · vine.redbelly.network/native-currency · /network-fees · /network-fees/distribution · /nodes/staking · /environments · /consensus · dao.redbelly.network · redbelly.routescan.io · on-chain RPC governors.mainnet.redbelly.network (chain 151) · treasury.gov.au (Project Acacia) · liquidise.com · audd.digital · etherscan.io (WRBNT 0xb45f…bF13).
**Secondary (flagged in-text):** coinmarketcap.com, coingecko.com, mexc.com, coincarp.com, icoanalytics.org, medium.com/lithium-digital.
**Platform specs:** github.com/DefiLlama/DefiLlama-Adapters, docs.llama.fi/submit-a-project, api.llama.fi · docs.rwa.xyz (coverage, schemas, frameworks), partners.rwa.xyz.
