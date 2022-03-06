import Arweave from 'arweave';
import { T_walletName } from './types';

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

class Transaction {
  private walletName: T_walletName;
  
  constructor(walletName: T_walletName){
    this.walletName = walletName;
    console.log("walletName", walletName);
  }

  public async broadcast(data: string, tags: {name: string, value: string}[]){
    let response;

    if(this.walletName === "arconnect" || this.walletName === "webwallet"){
      try{
        const tx = await arweave.createTransaction({data});
        tags.map(tag => tx.addTag(tag.name, tag.value));
        await arweave.transactions.sign(tx);
        console.log("tx", tx);
        response = {...await arweave.transactions.post(tx), txid: tx.id};
      }
      catch{
        response = null;
      }
    }
    else { // this.walletName === "bundlr"
      response = "yoooo";
    }

    return response;
  }
}

export {
  arweave,
  Transaction
};