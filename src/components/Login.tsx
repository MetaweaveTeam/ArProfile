import {useEffect, useState} from 'react';
import useArConnect from 'use-arconnect';
import { icons } from '../static';
import Profile from './Profile';
import { ArweaveWebWallet } from 'arweave-wallet-connector';

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
    bundlr: () => {
      alert("bundlr!");
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