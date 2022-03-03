type T_jwk = string;
type T_txid = string;
type T_walletName = "arconnect" | "webwallet" | "bundlr";

type T_profile = {
  username: string,
  name: string,
  bio: string,
  links: {
    twitter?: string,
    instagram?: string,
    github?: string,
    facebook?: string
  },
  image: T_txid
}

export type {T_jwk, T_txid, T_walletName, T_profile}