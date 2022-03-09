type T_jwk = string;
type T_txid = string;
type T_walletName = "arconnect" | "webwallet" | "bundlr";

type T_profile = {
  jwk: T_jwk,
  handle?: string,
  name?: string,
  bio?: string,
  links: {
    twitter?: string,
    discord?: string,
    github?: string,
    instagram?: string,
    facebook?: string
  },
  avatar?: T_txid
}

export type {T_jwk, T_txid, T_walletName, T_profile}