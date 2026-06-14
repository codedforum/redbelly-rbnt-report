# RWA.xyz · Asset and issuer templates (filled)

Two live Redbelly assets filled against the RWA.xyz Asset, Issuer, and Token schemas. On-chain values are verified; fields the issuer must confirm are marked TO CONFIRM (never guess regulatory or NAV data). The same template applies to AUDM, AUDX, AUDF, and future assets.

---

## Asset 1 · AUDD (Australian Digital Dollar)

**Token**
| Field | Value |
|---|---|
| name | AUDD |
| address | `0x54a210e824B0F89dA988E4B5586440aB354f0e46` |
| network | Redbelly Network (chain 151) |
| decimals | TO CONFIRM on-chain (`decimals()`) |
| standards | ERC-20 |
| issuance_type | native to Redbelly (also issued on Hedera) |
| transferability_type | Distributed with eligibility controls |

**Asset / classification**
| Field | Value |
|---|---|
| name | AUDD |
| ticker | AUDD |
| asset_class | Stablecoins |
| tokenization_type | Distributed |
| description | AUD-pegged fiat stablecoin, redeemable 1:1 for Australian dollars |
| region | Australia |
| inception_date | TO CONFIRM (issuer) |

**Issuer**
| Field | Value |
|---|---|
| name | Novatti (AUDD) |
| legal_name | TO CONFIRM (Novatti Group entity) |
| legal_structure_type | TO CONFIRM |
| jurisdiction | Australia |
| website | https://audd.digital |
| LEI | TO CONFIRM |

**Transparency and structure (issuer to provide)**
- transparency_type and transparency_url (proof-of-reserve or attestation): TO CONFIRM
- traditional_custodian / banking partner for AUD reserves: TO CONFIRM
- auditor: TO CONFIRM
- holder_has_right_to_redeem: yes (1:1 fiat redemption), terms TO CONFIRM
- primary_market KYC: required (issuer onboarding), provider TO CONFIRM

**Metrics (RWA.xyz computes from feed; on-chain seed)**
- total_supply, circulating_supply, holders, transfers: read from the token on chain 151 (the explorer shows active supply and holder count).

---

## Asset 2 · Hutly sHUT (tokenized rent rolls)

**Token**
| Field | Value |
|---|---|
| name | Hutly sHUT |
| address | `0x93239eBEe8c0a43F77453B1bBD9803a9F947Ea84` |
| network | Redbelly Network (chain 151) |
| decimals | TO CONFIRM on-chain |
| standards | ERC-20 |
| transferability_type | Distributed with whitelist controls |
| on-chain footprint | ~343M supply, ~11,569 holders, ~24,678 transfers (per explorer) |

**Asset / classification**
| Field | Value |
|---|---|
| name | Hutly sHUT |
| asset_class | Real Estate |
| underlying | rent-roll cash flows (property management) |
| tokenization_type | Distributed (whitelisted) |
| region | Australia |
| description | Tokenized rent-roll exposure issued by Hutly on Redbelly |

**Issuer**
| Field | Value |
|---|---|
| name | Hutly |
| legal_name | TO CONFIRM |
| jurisdiction | Australia |
| website | TO CONFIRM (Hutly) |

**Structure and transparency (issuer to provide)**
- regulatory_framework, governing_body, registration: TO CONFIRM
- fund structure (open-ended, distributions, lockup): TO CONFIRM
- service providers (manager, auditor, custodian, transfer agent): TO CONFIRM
- transparency_url: TO CONFIRM

---

## Note on the flagship deals

Liquidise / Tokeniser private-equity tokens, the Wisr A$250M Smart ABS, and the Imperium bond are reported by official Redbelly and partner channels but are **permissioned and not publicly indexed** (no public contract addresses). They can be listed once the issuer shares the deployed addresses and the qualitative template; until then they are noted as pipeline, not explorer-verifiable, consistent with the report's realized-vs-pipeline framing.
