import {useEffect, useState} from 'react';
import useArConnect from 'use-arconnect';
import { icons } from '../static';
import Profile from './Profile';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { WebBundlr } from "@bundlr-network/client";
import { providers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION"
]

const webWallet = new ArweaveWebWallet({
	name: 'Account',
	logo: icons.metaweave
});
webWallet.setUrl('arweave.app');

function Login({onClick}: {onClick?: () => void}) {
  const arConnect = useArConnect();
  const [jwk, setJwk] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!arConnect) return;
    (async () => {
      try {
        if ((await arConnect.getPermissions()).includes("ACCESS_ADDRESS")) {
          setJwk(await arConnect.getActiveAddress());
        }
      } catch {
        alert("Error: Could not get ACCESS_ADDRESS permission");
      }
    })();
  }, [arConnect, jwk, setJwk]);

  const disconnectWallet = async () => {
    await arConnect.disconnect();
    setJwk(undefined);
  };


  const login = {
    arconnect: async () => {
      if (!arConnect) return window.open("https://arconnect.io");
      try {
        await arConnect.connect(arConnectPermissions);
        setJwk(await arConnect.getActiveAddress());
      } catch {
        alert("Error: Could not connect to ArConnect");
      }
    },
    arweaveWebWallet: async () => {
      await webWallet.connect();
      const wallet = await webWallet.namespaces.arweaveWallet;
      setJwk(await wallet.getActiveAddress());
    },
    bundlr: async () => {
      const connectWeb3 = async (connector: any) => {
        const p = new providers.Web3Provider(connector);
        await p._ready();
        return p;
      }

      const providerMap = {
        "MetaMask": async (c: any) => {
          if (!(window as any)?.ethereum?.isMetaMask) return;
          return await connectWeb3((window as any).ethereum);
        }
      }
      
      const currencyMap = {
        "matic": {
          providers: ["MetaMask"],
        },
      }

      const providerFunc = providerMap["MetaMask"];
      const currency = currencyMap["matic"];
      const provider = await providerFunc(currency);
      const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
    }
  }

  return(jwk
    ? <Profile jwk={jwk} disconnectWallet={disconnectWallet}/>
    : <div className="connection">
        <div className="wallet" onClick={login.arconnect}>
          <img src={icons.arconnect} alt="ArConnect" />
          ArConnect
        </div>
        <div className="wallet" onClick={login.arweaveWebWallet}>
          <img src={icons.arweaveWebWallet} alt="arweave.app" />
          Arweave Wallet
        </div>
        <div className="wallet" onClick={login.bundlr}>
          <img src={icons.bundlr} alt="Bundlr network" />
          Bundlr
        </div>
      </div>
  );
}

export default Login;