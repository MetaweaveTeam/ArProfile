import {useContext, useEffect, useState} from 'react';
import useArConnect from 'use-arconnect';
import { icons } from '../static';
import Profile from './Profile';
import { T_walletName } from '../types';
import {Grid, Loading} from '@nextui-org/react';
import ctx from '../utils/ctx';
import { AMW } from '../api';
import { providers } from 'ethers';
import { WebBundlr } from '@bundlr-network/client';

function Login({onClick}: {onClick?: () => void}) {
  const {theme} = useContext(ctx);
  const arConnect = useArConnect();
  const [jwk, setJwk] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<T_walletName>();
  const [isLoading, setIsLoading] = useState(false);

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
    await AMW.disconnect();
    setJwk(null);
  };

  const login = {
    arconnect: async () => {
      setJwk(await AMW.connect("arconnect", arConnect));
      setWalletName("arconnect");
    },
    arweaveWebWallet: async () => {
      setJwk(await AMW.connect("webwallet"));
      setWalletName("webwallet");
    },
    bundlr: async () => {
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
      setJwk(bundlr.address);
      const tags = [
        {name: "Protocol-Name", value: "Account-0.1"},
        {name: "handle", value: "cromatikap"}
      ];
      const tx = bundlr.createTransaction("this is some text data", {tags});
      await tx.sign();
      const result = await tx.upload();
      console.log(result, result.data.id);
    }
  }

  return(isLoading 
    ? <Grid.Container gap={1} justify="center">
        <Loading size="xl" css={{padding: '$24'}} />
      </Grid.Container>
    : jwk && walletName
    ? <Profile jwk={jwk} walletName={walletName} disconnectWallet={disconnectWallet}/>
    : <div className="connection">
        <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.arconnect();
          setIsLoading(false);
        }}>
          <img src={icons.arconnect} alt="ArConnect" />
          <h4>ArConnect</h4>
        </div>
        <div className="wallet" onClick={async () => {
          setIsLoading(true);
          await login.bundlr();
          setIsLoading(false);
        }}>
          <img src={icons.bundlr} alt="Bundlr network" />
          <h4>Bundlr ($MATIC)</h4>
        </div>
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