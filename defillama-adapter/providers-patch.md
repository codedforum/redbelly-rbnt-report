# Fix: register Redbelly chainId 151 in the DeFiLlama SDK

**Problem:** DeFiLlama maps Redbelly with `chainId: null`. Correct value is **151** (`eth_chainId` = `0x97`). Redbelly is absent from `DefiLlama/defillama-sdk` `src/providers.json`, so the chain has no canonical chainId/RPC mapping.

**Fix:** one entry in `DefiLlama/defillama-sdk` → `src/providers.json`, keyed by the existing chain key `rbn` (the key adapters already use). Place it alphabetically.

```json
"rbn": {
  "rpc": ["https://governors.mainnet.redbelly.network"],
  "chainId": 151,
  "explorer": "https://redbelly.routescan.io"
}
```

After this ships, the DeFiLlama chain page resolves `chainId: 151` and every Redbelly adapter can query over RPC with no per-adapter configuration.

**Immediate fallback (no SDK release needed):** in `DefiLlama/DefiLlama-Adapters` → `projects/helper/env.js`, add an RPC default so adapters resolve now:

```js
// inside DEFAULTS
RBN_RPC: 'https://governors.mainnet.redbelly.network',
```

**PR rules:** keep the change to the single `providers.json` entry (SDK repo) and, if needed, the one-line `env.js` default (Adapters repo). Do not modify lockfiles. Enable "Allow edits by maintainers".
