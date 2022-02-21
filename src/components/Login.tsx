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

  const connectWallet = async () => {
    if (!arConnect) return window.open("https://arconnect.io");
    try {
      await arConnect.connect(arConnectPermissions);
      setJwk(await arConnect.getActiveAddress());
    } catch {
      alert("Error: Could not connect to ArConnect");
    }
  };

  const disconnectWallet = async () => {
    await arConnect.disconnect();
    setJwk(undefined);
  };

  const loginArweaveWebWallet = async () => {
    await webWallet.connect();
    const wallet = await webWallet.namespaces.arweaveWallet;
    setJwk(await wallet.getActiveAddress());
  };

  return(jwk
    ? <Profile jwk={jwk} disconnectWallet={disconnectWallet}/>
    : <div className="connection">
        <div className="wallet" onClick={connectWallet}>
          <img src={icons.arconnect} alt="ArConnect" />
          ArConnect
        </div>
        <div className="wallet" onClick={loginArweaveWebWallet}>
          <img src={icons.arweaveWebWallet} alt="ArConnect" />
          Arweave Wallet
        </div>
      </div>
  );
}

export default Login;