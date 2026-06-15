# RWA.xyz · Asset and issuer submission (filled, sourced)

Two live Redbelly assets filled against the RWA.xyz Asset, Issuer, and Token schemas with cited public values. All mandatory fields (issuer legal entity, jurisdiction, custody, audit, regulatory) are populated. On-chain values are read live from chain 151. Where a single public source does not disclose a value, the honest status and the lookup path are given rather than a placeholder.

---

## Asset 1 · AUDD (Australian Digital Dollar)

**Token (on-chain, chain 151, verified)**
| Field | Value |
|---|---|
| token name | AUDD |
| address | `0x54a210e824B0F89dA988E4B5586440aB354f0e46` |
| decimals | 6 |
| total supply | 50,251 AUDD (live, `totalSupply` at latest block) |
| standards | ERC-20 |
| network | Redbelly Mainnet (151) |
| issuance type | native (also issued on Stellar, Ethereum, XRPL, Solana) |
| transferability | Distributed (fiat-backed bearer stablecoin) |

**Asset / classification**
| Field | Value |
|---|---|
| asset name | Australian Digital Dollar (AUDD) |
| ticker | AUDD |
| asset class | Stablecoins (AUD-pegged, fiat-backed 1:1) |
| tokenization type | Distributed |
| region / jurisdiction | Australia |
| peg | 1 AUDD = 1 AUD |

**Issuer**
| Field | Value | Source |
|---|---|---|
| issuer legal entity | AUDC Pty Ltd | audd.digital |
| legal structure | Proprietary limited company (Pty Ltd) | ACN registration |
| parent | Novatti Group Ltd (ASX: NOV) | audd.digital, ASX |
| jurisdiction | Australia (ASIC national registration) | ASIC |
| ACN | 637 164 722 | audd.digital |
| LEI | not publicly disclosed (lookup AUDC Pty Ltd / ACN 637164722 on ABR) | honest note |

**Regulatory**
| Field | Value | Source |
|---|---|---|
| regulator | ASIC | audd.digital |
| licence | Australian Financial Services Licence (AFSL) No. 700123, authorising non-cash payment facilities to retail and wholesale clients | audd.digital AFSL announcement |
| AML/CTF | registered with AUSTRAC; AFCA member (external dispute resolution) | audd.digital |

**Custody, reserves and audit**
| Field | Value | Source |
|---|---|---|
| reserve backing | 1:1 AUD held in segregated accounts at Australian financial institutions, separate from operating funds | audd.digital FAQ |
| custodian bank | held at Australian financial institutions; AUDD does not name the primary bank publicly (transparency page references in1Bank, treat as indicative) | audd.digital transparency |
| auditor / attestation | William Buck (William Buck Audit (Vic) Pty Ltd); monthly independent reserve assurance published at audd.digital/transparency | audd.digital, William Buck |
| redemption | redeemable 1:1 for AUD by holders | audd.digital FAQ |
| transparency URL | https://www.audd.digital/transparency/ | audd.digital |
| website | https://www.audd.digital/ | audd.digital |

> RWA.xyz already lists AUDD as an asset (app.rwa.xyz/assets/AUDD); this kit adds its Redbelly deployment.

---

## Asset 2 · Hutly sHUT (Hutly Shadow)

**Token (on-chain, chain 151, verified)**
| Field | Value |
|---|---|
| token name | Hutly Shadow |
| symbol | sHUT |
| address | `0x93239eBEe8c0a43F77453B1bBD9803a9F947Ea84` |
| decimals | 2 |
| total supply | 343,156,797.51 sHUT (live, `totalSupply` at latest block) |
| standards | ERC-20 |
| network | Redbelly Mainnet (151) |
| transferability | Represented (claim referencing off-chain rent-roll contracts) |

**Asset / classification**
| Field | Value | Source |
|---|---|---|
| asset name | Hutly sHUT (tokenized rent rolls) | Redbelly/Hutly announcement |
| asset class | Real Estate (rental income / rent-roll receivables); secondary: Credit (receivables-backed) | classification |
| underlying | rental authority/management contracts ("Living Contract"), rent-roll cash-flow streams | Redbelly/Hutly Medium |
| region / jurisdiction | Australia (Brisbane, QLD; QLD and VIC, national rollout) | The Urban Developer |

**Issuer**
| Field | Value | Source |
|---|---|---|
| issuer legal entity | Hutly Pty Ltd | buy.nsw supplier registry |
| ABN | 24 633 649 573 | Australian business registry |
| jurisdiction | Australia (ASIC national registration; HQ Brisbane, QLD) | registry |
| founded | 2017 to 2018 (founder Jeremy Hastings) | The Urban Developer |
| website | https://hutly.com | Hutly |

**Custody, regulatory and audit (honest status)**
| Field | Value | Source |
|---|---|---|
| servicer / custody of underlying | Hutly Pty Ltd is the platform and servicer of record for the underlying contracts; no separate third-party custodian is named publicly | Redbelly/Hutly announcement |
| regulator | none named publicly for sHUT; compliance asserted via Redbelly's protocol-level KYC/verified-participant (Receptor) layer | Redbelly/Hutly announcement |
| audit / attestation | none published publicly for sHUT | honest note |
| partnership | announced 22 Feb 2024: Hutly partners with Redbelly to tokenize US$1.8B in rent rolls; assets scheduled on-chain Q3 to Q4 2025 | redbelly.network/blog |

> Honest note: the Hutly partnership materials describe the commercial structure but name no financial regulator, third-party custodian, or auditor for sHUT. We do not assert an AFSL or named auditor where none is public; the verifiable facts are the issuer entity (Hutly Pty Ltd, ABN 24 633 649 573) and the on-chain token.

---

## Other live AUD stablecoin tokens on chain 151 (same template applies)
AUDM `0x081599…`, AUDX `0xD68775…`, AUDF `0xd2a530…` are additional AUD-denominated tokens indexed on the explorer; each can be onboarded with the AUDD-style stablecoin template once its issuer confirms entity details.

## Flagship deals (pipeline, not yet explorer-indexable)
Liquidise / Tokeniser private-equity tokens, the Wisr Smart ABS, and the Imperium bond are reported by official channels but are permissioned with no public contract addresses; they are listed once the issuer shares deployed addresses, consistent with the report's realized-vs-pipeline framing.
