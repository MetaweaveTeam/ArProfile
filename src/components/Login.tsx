import {useContext, useEffect, useState} from 'react';
import { icons } from '../static';
import Profile from './Profile';
import { T_walletName } from '../utils/types';
import {Grid, Loading} from '@nextui-org/react';
import ctx from '../utils/ctx';
import { webWallet } from '../utils/api'

async function connectWallet(walletName:T_walletName) {
  switch(walletName) {
    case 'arconnect':
      //@ts-ignore arweave-js does not have the latest arconnect type defitions that include 'DISPATCH'
      await window.arweaveWallet.connect(['ACCESS_ADDRESS','ACCESS_ALL_ADDRESSES','SIGN_TRANSACTION','DISPATCH']);
      break;
    case 'webwallet':
      await webWallet.connect();
      webWallet.on('change', () => {})
      break;
    default:
      throw new Error(`Attempted to connect unknown wallet ${walletName}`);
  }
  return await window.arweaveWallet.getActiveAddress();
}

function Login({onClick}: {onClick?: () => void}) {
  const {theme} = useContext(ctx);
  const [addr, setaddr] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<T_walletName>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!window.arweaveWallet?.getPermissions) return;
    (async () => {
      try {
        if ((await window.arweaveWallet.getPermissions()).includes("ACCESS_ADDRESS")) {
          setaddr(await window.arweaveWallet.getActiveAddress());
        }
      } catch {
        alert("Error: Could not get ACCESS_ADDRESS permission");
      }
    })();
  }, [addr, setaddr]);

  const disconnectWallet = async () => {
    await window.arweaveWallet?.disconnect();
    setaddr(null);
  };

  const login = {
    arconnect: async () => {
      setaddr(await connectWallet("arconnect"));
      setWalletName("arconnect");
    },
    arweaveWebWallet: async () => {
      setaddr(await connectWallet("webwallet"));
      setWalletName("webwallet");
    }
  }

  return(isLoading 
    ? <Grid.Container gap={1} justify="center">
        <Loading size="xl" css={{padding: '$24'}} />
      </Grid.Container>
    : addr && walletName
    ? <Profile addr={addr} walletName={walletName} disconnectWallet={disconnectWallet}/>
    : <div className="connection">
        <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.arconnect();
          setIsLoading(false);
        }}>
          <img src={icons.arconnect} alt="ArConnect" />
          <h4>ArConnect</h4>
        </div>
        {/* <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.bundlr();
          setIsLoading(false);
        }}>
          <img src={icons.bundlr} alt="Bundlr network" />
          <h4>Bundlr ($MATIC)</h4>
        </div> */}
        <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.arweaveWebWallet();
          setIsLoading(false);
        }}>
          <img src={theme ? icons.arweaveWebWallet.dark : icons.arweaveWebWallet.light} alt="arweave.app" />
          <h4>arweave.app</h4>
        </div>
      </div>);
}

export default Login;