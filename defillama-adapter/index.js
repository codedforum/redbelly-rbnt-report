// Redbelly (RBNT) DeFi TVL adapter · DeFiLlama spec-compliant.
//
// DeFiLlama chain key: 'rbn' (gecko id redbelly-network-token), chain id 151,
// RPC https://governors.mainnet.redbelly.network.
//
// TVL is the liquidity in reddex, a Uniswap V2 fork. `tvl` is exported as a
// DIRECT async function under the chain key (module.exports.rbn.tvl), per the
// DeFiLlama adapter specification: it enumerates the factory's pairs, then sums
// the tokens held by each pair via api.sumTokens (the SDK prices them).
//
// This is DeFi liquidity (TVL). Tokenized real-world-asset supply (TVT, e.g.
// AUDD, Hutly sHUT) is a separate metric and is intentionally NOT counted here,
// per DeFiLlama convention (stablecoin/asset market cap is tracked separately).

const FACTORY = "0x262E06314Af8f4EEd70dbd8C7EFe2a5De686C142";

async function tvl(api) {
  // 1) enumerate every reddex pair from the factory
  const pairs = await api.fetchList({
    lengthAbi: "uint256:allPairsLength",
    itemAbi: "function allPairs(uint256) view returns (address)",
    target: FACTORY,
  });
  // 2) read each pair's two tokens
  const [token0s, token1s] = await Promise.all([
    api.multiCall({ abi: "address:token0", calls: pairs }),
    api.multiCall({ abi: "address:token1", calls: pairs }),
  ]);
  // 3) sum the balances of both tokens held by each pair (priced by the SDK)
  const tokensAndOwners = [];
  pairs.forEach((pair, i) => {
    tokensAndOwners.push([token0s[i], pair]);
    tokensAndOwners.push([token1s[i], pair]);
  });
  return api.sumTokens({ tokensAndOwners });
}

module.exports = {
  methodology:
    "TVL is liquidity in the reddex Uniswap V2 fork on Redbelly, computed by enumerating the factory pairs and summing the token reserves held by each pair, valued by DeFiLlama pricing. Tokenized RWA supply (TVT) is excluded by convention.",
  rbn: {
    tvl,
  },
};
