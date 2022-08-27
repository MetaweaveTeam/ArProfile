import Arweave from 'arweave';
import { ArweaveWebWallet } from "arweave-wallet-connector";
import { icons } from "../static";

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

const webWallet = new ArweaveWebWallet({
	name: 'Account',
	logo: icons.metaweave
});
webWallet.setUrl('arweave.app');

export {
  arweave,
  webWallet
};