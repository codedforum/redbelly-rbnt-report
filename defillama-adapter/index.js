// Redbelly (RBNT) DeFi TVL · reference adapter
//
// DeFiLlama chain key: 'rbn' (gecko id redbelly-network-token), chain id 151,
// RPC https://governors.mainnet.redbelly.network.
//
// Redbelly's DEX TVL is produced by reddex, a Uniswap V2 fork. The production
// coverage is the existing projects/reddex adapter. This file reproduces that
// TVL from the reddex V2 factory as a verification reference and as a template
// for extending coverage to a new Redbelly DEX or lending market.
//
// Methodology: read allPairsLength() and allPairs(i) on the factory, then each
// pair's token0/token1/getReserves, and sum the priceable legs (USDT, USDC.e,
// WETH, and WRBNT valued via the RBNT gecko price). Validator staking is
// off-EVM and is correctly excluded.

const { uniTvlExport } = require('../helper/unknownTokens')

const REDDEX_FACTORY = '0x262E06314Af8f4EEd70dbd8C7EFe2a5De686C142'

module.exports = {
  methodology:
    'Counts liquidity in the reddex Uniswap V2 fork on Redbelly by enumerating the factory pairs and summing reserves, valuing WRBNT via the RBNT price. Off-EVM validator staking is excluded.',
  rbn: {
    tvl: uniTvlExport('rbn', REDDEX_FACTORY),
  },
}
