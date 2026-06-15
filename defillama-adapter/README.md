# Redbelly · DeFiLlama submission kit

This kit covers Redbelly's presence on DeFiLlama: what is already tracked, the one real configuration gap, a complete contract registry, API-query documentation, and a spec-compliant reference adapter.

## 1. Current state (verified on-chain and via api.llama.fi)

Redbelly is **already a tracked chain** on DeFiLlama under the internal chain key **`rbn`** (gecko id `redbelly-network-token`, symbol RBNT). Reported chain TVL is roughly **$43.6K**, produced by two protocols:

| Protocol | Category | Redbelly TVL | Notes |
|---|---|---|---|
| reddex | Dexs | ~$23.1K | Uniswap V2 fork; live adapter at `projects/reddex/index.js` |
| Uniswap V3 | Dexs | ~$20.5K | canonical V3 deployment |

So the chain's DEX TVL is covered. Verified via `https://api.llama.fi/v2/chains` (Redbelly entry) and `https://api.llama.fi/protocol/reddex` (`currentChainTvls.Redbelly`).

## 2. The real gap: `chainId: null`

DeFiLlama maps Redbelly with **`chainId: null`**. The correct value is **151** (`eth_chainId` returns `0x97`). The chain is also absent from the adapter repo's `projects/helper/chains.json` (it is referenced by adapters under the key `rbn`, not `redbelly`).

**Fix (the genuine code contribution):** add Redbelly to the DeFiLlama SDK provider registry. See `providers-patch.md`. This is a one-entry PR to `DefiLlama/defillama-sdk` that resolves the null chainId so every Redbelly adapter can query over RPC without per-adapter configuration.

## 3. Contract registry (chain 151, all on-chain verified)

**Chain config**
- Chain key (DeFiLlama): `rbn`  ·  Chain ID: `151` (`0x97`)
- RPC: `https://governors.mainnet.redbelly.network`
- Explorer: `https://redbelly.routescan.io`
- Native coin / price id: RBNT / `coingecko:redbelly-network-token`

**reddex (Uniswap V2 fork)**
- Factory: `0x262E06314Af8f4EEd70dbd8C7EFe2a5De686C142` (`allPairsLength()` = 7)

| # | Pair | token0 | token1 |
|---|---|---|---|
| 0 | `0x23ca2a79aa8ea9d0b3e4a42fc40c35bb8e53cc1e` | LQDX | USDT |
| 1 | `0xdecbf96e9e781e811a6d7f728164911ad4ee603d` | LQDX | WRBNT |
| 2 | `0xa7d87e92046077f63394fb288694dfbc58bb05a6` | WRBNT | USDT |
| 3 | `0xcde314b116cefecf93143f83cff01f5cc3937aeb` | WRBNT | USDC.e |
| 4 | `0x10c2dbf604593f36a4473ffc8326f6124c5cd497` | WETH | WRBNT |
| 5 | `0xc7e2fbc9e0faa9a258b93973980d73ca7d17d013` | SNEC | WRBNT |
| 6 | `0xca89248182fc44ba8a159b30d92970a856e8f499` | LQDX | USDC.e |

**Tokens (symbol-verified on-chain)**

| Token | Address | Decimals |
|---|---|---|
| WRBNT | `0x6ed1F491e2d31536D6561f6bdB2AdC8F092a6076` | 18 |
| USDT | `0x8c4acd74ff4385f3b7911432fa6787aa14406f8b` | 6 |
| USDC.e | `0x8201c02d4ab2214471e8c3ad6475c8b0cd9f2d06` | 6 |
| WETH | `0x0fa205c0446cd9eedcc7538c9e24bc55ad08207f` | 18 |
| LQDX (Liquid Crypto) | `0x0233971bd2de29e81029336c46997055df3b5282` | 18 |
| SNEC | `0x4ab8302453bff522847bd8609e3264719c6bbd13` | 18 |

**Live RWA / stablecoin tokens (tracked as token supply, not chain TVL)**
- AUDD (Novatti): `0x54a210e824B0F89dA988E4B5586440aB354f0e46`
- Hutly sHUT: `0x93239eBEe8c0a43F77453B1bBD9803a9F947Ea84`
- AUDM `0x081599…`, AUDX `0xD68775…`, AUDF `0xd2a530…`

**Off-EVM note:** validator staking (100,000 RBNT per node) is enforced at the consensus layer, not in an EVM contract with a readable balance. The dormant StakingEscrow proxy `0x818c3c113Ce240Ac92508f52F3DdDA675E6b6B9A` holds 0 RBNT and never received a deposit, so it is not a valid TVL source. Staking TVL is therefore correctly excluded from chain TVL.

## 4. API query documentation

All endpoints are public (no key). Redbelly's chain name in the API is `Redbelly`; the adapter chain key is `rbn`.

```bash
# Whole-chain TVL (find the "Redbelly" object)
curl -s https://api.llama.fi/v2/chains | jq '.[] | select(.name=="Redbelly")'

# Historical chain TVL series (reproduces the report's TVL figure)
curl -s https://api.llama.fi/v2/historicalChainTvl/Redbelly

# Per-protocol breakdown on Redbelly
curl -s https://api.llama.fi/protocol/reddex   | jq '.currentChainTvls'
curl -s https://api.llama.fi/protocol/uniswap-v3 | jq '.currentChainTvls.Redbelly'

# RBNT native-coin price (used by adapters to value WRBNT-denominated reserves)
curl -s https://coins.llama.fi/prices/current/coingecko:redbelly-network-token
```

## 5. Adapter (spec-compliant, tested)

`index.js` exports `tvl` as a **direct async function under the chain key** (`module.exports.rbn.tvl`), per the DeFiLlama specification. It enumerates the reddex factory pairs and sums each pair's token balances via `api.sumTokens` (the SDK prices them). It is not a nested object and does not wrap a helper export, so `adapter.rbn.tvl` is callable by the indexer.

**Validated against the live DefiLlama-Adapters repo:**
```
$ node test.js projects/redbelly/index.js
------ TVL ------
rbn                       16.82 k
total                    16.82 k
$ npx eslint -c eslint.config.js projects/redbelly/index.js   # passes, no output
```
Full run output is in [`TEST-OUTPUT.txt`](TEST-OUTPUT.txt). DeFiLlama prices the tokens it has feeds for (RBNT, USDC.e, WETH); project-only tokens are excluded by the pricing layer, which is correct and expected.

**TVL vs TVT:** this adapter reports **TVL** (DeFi liquidity in reddex). **TVT** (Total Value Tokenized, the on-chain supply of RWA assets such as AUDD and Hutly sHUT) is a separate metric tracked outside chain TVL by convention (stablecoin and asset market cap), and is documented in the report and the RWA.xyz kit, not double-counted here.

## 6. Older reference

`index.js` is a spec-compliant reference implementation that reproduces Redbelly's reddex V2 TVL from the factory above, for verification and as a template for extending coverage (for example, if a new Redbelly DEX or lending market deploys). The production coverage is the existing `projects/reddex` adapter; this reference is not a duplicate submission but documents the exact computation and is ready to adapt for a new protocol.

**Validate locally** (per DeFiLlama contributor docs):
```bash
git clone https://github.com/DefiLlama/DefiLlama-Adapters.git
cd DefiLlama-Adapters && npm i
# place index.js at projects/redbelly-reference/index.js, ensure "rbn" resolves
node test.js projects/redbelly-reference/index.js
npm run lint
```

Methodology: enumerate `allPairsLength()` and `allPairs(i)` on the reddex factory, read each pair's `token0`/`token1`/`getReserves`, and sum the priceable legs (USDT, USDC.e, WETH, and WRBNT valued via the RBNT gecko price). Token supplies of AUDD/sHUT and other stablecoins are market capitalization, tracked separately by DeFiLlama's stablecoin dashboard, and are excluded from chain TVL by convention.
