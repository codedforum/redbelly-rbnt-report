# RBNT Token Utility and Ecosystem Visibility

### A sourced look at how Redbelly Network's native coin works, and how its on-chain activity can be made visible on DeFiLlama and RWA.xyz. No price targets. Every figure tagged official or secondary.

*By Smartcoded · Interactive version and data: https://redbelly.smartcodedbot.com/rbnt*

---

> Publishing notes (delete this block before posting):
> - Paste this whole file into Mirror.xyz or Substack (both accept Markdown / rich paste).
> - Upload these three images at the marked spots from `charts/` in the repo:
>   `charts/allocation.png`, `charts/fee-distribution.png`, `charts/adoption.png`.
> - After publishing, send the public URL so it can be added to the task submission.

---

## 1. Executive summary

Redbelly Network is a public, EVM-compatible Layer 1 purpose-built for compliant tokenization of real-world assets (RWA), co-developed at the University of Sydney with CSIRO. Its native coin, RBNT, has a fixed supply of 10,000,000,000 and is used for transaction fees, staking, sharding, governance, and ecosystem rewards.

The demand thesis is structural rather than speculative: Redbelly prices gas in US dollars (a simple transfer costs exactly $0.01), settles those fees in RBNT through an on-chain oracle, and requires every validating node to bond 100,000 RBNT. As compliant RWA volume moves on-chain, fee throughput and the staked-bond base are the two channels through which adoption consumes and locks RBNT.

Redbelly's adoption signals are real and, in several cases, government-corroborated (Project Acacia with the Reserve Bank of Australia and ASIC; ASX-listed Wisr), but they are Australia-concentrated and largely pilot-stage. The widely cited "$73.8B pipeline" is a self-reported forward pipeline, not assets on-chain today; realized tokenized value is on the order of roughly $1B. This article keeps the two separate.

On visibility, Redbelly's DEX TVL is already tracked on DeFiLlama (under the chain key `rbn`) but the chain carries a null chainId, and Redbelly is absent from RWA.xyz. Both gaps have concrete, specification-compliant fixes.

## 2. Token at a glance

- Type: RBNT is the native coin of chain 151 (the gas asset), not an ERC-20 on its own L1. Bridged ERC-20 representations exist on other chains.
- Total supply: 10,000,000,000 RBNT, fixed. From the whitepaper: "the native Redbelly Network Coin (RBNT) ... has a fixed supply of 10,000,000,000." There is no inflation schedule; rewards are paid from a pre-allocated pool, not by minting.
- Circulating supply: roughly 2.65B RBNT per the official explorer (Routescan), with a displayed market capitalization near $9.8M. Treat circulating and market-cap as on-chain-derived estimates.

## 3. Allocation

The authoritative allocation is the whitepaper's (section 5.2).

**[ Insert image: charts/allocation.png ]**

| Category | Allocation | Tokens |
|---|---|---|
| Ecosystem Development | 37% | 3.70B |
| Investors | 28% | 2.80B |
| Reserve | 20% | 2.00B |
| Team | 10% | 1.00B |
| Governance DAO | 3% | 0.30B |
| USYD and CSIRO | 2% | 0.20B |

A common secondary figure (30% rewards / 29% investors / 6% ecosystem) originates from a January 2024 write-up that predates whitepaper v1.4 and is superseded. The "30% rewards and 6% ecosystem" buckets were consolidated and renamed "Ecosystem Development" (37%); investors normalized from 29% to 28%.

Vesting: Redbelly does not publish a category-level cliff or linear-vesting schedule (a genuine data gap). The only firm, official datum is that node-operator signup bonuses vest over four years, and the 20% Reserve has no defined release schedule.

## 4. Utility

RBNT has five officially documented uses: transaction fees, staking, sharding, governance, and rewards.

**Fees are priced in US dollars.** A simple transfer costs exactly $0.01 (a fixed unit gas price times 21,000 gas). An on-chain oracle converts the USD cost into the RBNT owed at execution time. The cost is predictable for builders regardless of token price, while the RBNT quantity consumed per unit of USD fee rises as the token price falls and vice versa.

**[ Insert image: charts/fee-distribution.png ]**

Network fees are split on a volume-tiered basis: Node Operators 40% to 60%, the Redbelly foundation 30% down to 5%, Accredited Issuers a flat 30%, plus a 5% burn that activates once daily transactions exceed one million while supply remains above 5B.

**Staking** requires every node to bond a minimum of 100,000 RBNT as a slashable deposit; the network targets 600 nodes, implying a design-cap staked base of 60,000,000 RBNT. No fixed APY is published; node returns are fee-driven.

## 5. How adoption consumes RBNT

Two documented mechanisms tie usage to RBNT demand, with no speculation required: fee settlement in RBNT (a portion burned past the one-million-daily-transaction threshold), and the staked bond that locks 100,000 RBNT per node. Higher compliant-RWA activity means more fee-settlement volume and, as the validator set grows, a larger locked bond base, both against the fixed 10B supply.

## 6. Adoption: realized versus pipeline

**[ Insert image: charts/adoption.png ]**

The often-quoted "$73.8B" comes from Redbelly's own June 2024 testnet-launch blog and is a self-reported forward pipeline mixing announced and unannounced customers, not on-chain TVL. Realized on-chain value is on the order of roughly $1B. Credible, in several cases government-corroborated signals: Liquidise / Tokeniser private-equity tokenization (live, around $736M claimed), Hutly rent-roll tokens (sHUT live on-chain, over 11,000 holders), the AUDD Australian-dollar stablecoin (Novatti, live), and Project Acacia (the RBA and ASIC pilot, with an ASX-listed Wisr Smart ABS and a corporate bond). The signals are real but Australia-concentrated and pilot-stage.

## 7. On-chain visibility

**DeFiLlama:** Redbelly's DEX TVL is already tracked (chain key `rbn`) via reddex (a Uniswap V2 fork) and Uniswap V3, totalling roughly $43.6K. The real gaps are the null chainId (should be 151) and the lack of a consolidated public contract registry. A specification-compliant submission kit (chainId registration, contract registry, API-query docs, and a reference adapter) is published alongside this article.

**RWA.xyz:** Redbelly is absent from RWA.xyz's supported networks despite hosting live, identity-gated RWA and stablecoin tokens (AUDD, Hutly sHUT, and AUD stablecoin variants). A submission kit with the network registration, filled per-asset templates, and the asset-class mapping is provided.

## 8. Sources and method

Every load-bearing figure (10B fixed supply, allocation, fee model, staking minimum, chain ID) is from official Redbelly sources: the whitepaper, vine.redbelly.network, redbelly.network, and on-chain data via the mainnet RPC (chain 151) and the Routescan explorer. Aggregator figures (circulating supply, market cap) are flagged as estimates. Charts are reproducible from the cited data. This article contains no price targets or future-value extrapolations.

Full interactive version, the reproducible charts, and the DeFiLlama and RWA.xyz submission kits: https://redbelly.smartcodedbot.com/rbnt
