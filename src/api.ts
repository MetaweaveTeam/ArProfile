import Arweave from 'arweave';
import ArDB from 'ardb';
import transaction from 'ardb/lib/models/transaction';
import block from 'ardb/lib/models/block';
import { T_jwk } from './types';

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

const ardb = new ArDB(arweave);

const getProfile = async (jwk: T_jwk): Promise<any | null> => {
  const tx: transaction[] | block[] = await ardb.search('transactions')
    .tag('Protocol-Name', 'profile-0.1')
    .from(jwk)
    .limit(1).find();
  
  const data = tx[0]?.id 
    ? await arweave.transactions.getData(tx[0].id, { decode: true, string: true })
    : null;
  return typeof data === "string" ? JSON.parse(data) : null;
};

export {
  arweave,
  getProfile
};