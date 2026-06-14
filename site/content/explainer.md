# RBNT, explained: how a compliant-RWA chain uses its token

Redbelly Network is a public, EVM-compatible Layer 1 built for one job: putting **regulated real-world assets on-chain** with identity and accountability baked into the protocol. RBNT is its native coin, and its design is refreshingly simple to understand.

**Fixed supply, no inflation.** There are **10 billion RBNT, period.** The supply is fixed in the whitepaper, and rewards come from a pre-allocated pool rather than from minting new coins. Allocation: 37% ecosystem development, 28% investors, 20% reserve, 10% team, 3% governance DAO, 2% to the co-developers (University of Sydney and CSIRO).

**Five jobs.** RBNT is used for transaction fees, staking, sharding, governance, and rewards. The two that matter most for everyday users are fees and staking.

**Gas is priced in dollars.** This is the standout feature. A simple transfer costs exactly **$0.01**, fixed in USD. An on-chain oracle converts that to the right amount of RBNT at the moment you transact, so builders and institutions can budget costs in dollars without worrying about token price swings. Fees are split between node operators, the foundation, and the accredited issuers who run identity checks, and a portion is **burned** once the network is busy enough (more than a million transactions a day).

**Staking secures the network.** Every validating node bonds **100,000 RBNT** as a slashable deposit. The network targets 600 nodes, so a meaningful chunk of supply is locked to keep validators honest. There is no advertised yield; node rewards come from network fees.

**Why institutions matter for RBNT.** Redbelly's pitch is not hype, it is throughput. Every transaction's fee is settled in RBNT, and every node locks RBNT. So as compliant asset issuers move real volume on-chain, two things happen mechanically: more RBNT is used to pay (and partly burn) fees, and more RBNT stays locked as validator bonds. Redbelly already has live activity here, the AUDD Australian-dollar stablecoin, Hutly's tokenized rent rolls, Liquidise's private-equity tokens, and a government pilot (Project Acacia, with the Reserve Bank of Australia). A word of honesty: the often-quoted "$73.8 billion" is a forward **pipeline** figure the team has announced, not assets sitting on-chain today, which is closer to the ~$1 billion range. The direction is real; the headline is aspirational.

**Where to verify everything.** RBNT is the native coin of Redbelly mainnet (chain ID 151). You can see it live on the explorer at redbelly.routescan.io, read the tokenomics in the official whitepaper at redbelly.network, and find the fee and staking rules in the developer docs at vine.redbelly.network.

That is the whole story: a fixed-supply coin, dollar-priced fees settled in that coin, staked bonds that lock it, and a chain aimed squarely at regulated real-world assets. No price predictions here, just how the machine works.

*(Word count: ~430. Sources: Redbelly whitepaper, vine.redbelly.network/network-fees and /nodes/staking, redbelly.routescan.io. All figures official except the pipeline/realized framing, which is noted as such.)*
