import { ArweaveWebWallet } from "arweave-wallet-connector";
import { providers } from "ethers";
import { WebBundlr } from "@bundlr-network/client";

import { icons } from "../static";
import { T_jwk, T_walletName } from "../types";

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION"
];

const webWallet = new ArweaveWebWallet({
	name: 'Account',
	logo: icons.metaweave
});
webWallet.setUrl('arweave.app');

export default class ArweaveMultiWallet {
  public walletName: T_walletName | null = null;
  private walletEngine: any | null = null;

  public async connect(walletName: T_walletName, walletEngine?: any): Promise<T_jwk | null> {
    this.walletName = walletName;
    this.walletEngine = walletEngine;

    if(walletName === "arconnect"){
      if (!walletEngine) {
        window.open("https://arconnect.io");
        return null;
      }
      try {
        await walletEngine.connect(arConnectPermissions);
        return await walletEngine.getActiveAddress();
      } catch {
        alert("Error: Could not connect to ArConnect");
        this.walletName = null;
        this.walletEngine = null;
        return null;
      }
    }
    else if(walletName === "webwallet") {
      await webWallet.connect();
      this.walletEngine = await webWallet.namespaces.arweaveWallet;
      const jwk = await this.walletEngine.getActiveAddress();
      return jwk ? jwk : null;
    }
    else if(walletName === "bundlr") {
      const connectWeb3 = async (connector: any) => {
        const p = new providers.Web3Provider(connector);
        await p._ready();
        return p
      }

      const providerMap = {
        "MetaMask": async (c: any) => {
          if (!(window as any)?.ethereum?.isMetaMask) return;
          await (window as any).ethereum.enable();
          const provider = await connectWeb3((window as any).ethereum);
          const chainId = `0x${c.chainId.toString(16)}`
          try { // additional logic for requesting a chain switch and conditional chain add.
            await (window as any).ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId }],
            })
          } catch (e: any) {
            if (e.code === 4902) {
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId, rpcUrls: c.rpcUrls, chainName: c.chainName
                }],
              });
            }
          }
          return provider;
        }
      }
      
      const currencyMap = {
        "matic": {
          providers: ["MetaMask"],
          opts: {
            chainId: 137,
            chainName: 'Polygon Mainnet',
            rpcUrls: ["https://polygon-rpc.com"],
          },
        },
      }

      const providerFunc = providerMap["MetaMask"];
      const currency = currencyMap["matic"];
      const provider = await providerFunc(currency.opts);
      const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
      console.log("bundlr", bundlr);
      await bundlr.ready();
      return bundlr.address;
    }
    else{
      this.walletName = null;
      this.walletEngine = null;
      return null;
    }
  }

  public async disconnect(): Promise<void> {
    if(this.walletName === "arconnect")
      this.walletEngine.disconnect();
    else if(this.walletName === "webwallet")
      this.walletEngine.disconnect(); //doesn't work
  }
}