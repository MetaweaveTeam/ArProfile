import Arweave from 'arweave';
import ArweaveMultiWallet from '../lib/ArweaveMultiWallet';

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

const AMW = new ArweaveMultiWallet(arweave);

export {
  arweave,
  AMW
};