import CancelIcon from '@mui/icons-material/Cancel';
import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

const vertoID = {
  "username":"bidetaggle",
  "name":"Axel",
  "addresses":["aIUmY9Iy4qoW3HOikTy6aJww-mM4Y-CUJ7mXoPdzdog"],
  "bio":"Software Engineer.\nFullstack developer.\nTraveler.\nFounder of Argora.",
  "links": {
    "twitter":"bidetaggle",
    "instagram":"bidetaggle",
    "github":"bidetaggle",
    "facebook":"justfortest"
  }
};

function Profile({disconnectWallet}: {disconnectWallet: () => void}) {

  const sendTx = async () => {
    const tx = await arweave.createTransaction({
      data: 'hello world'
    });
    await arweave.transactions.sign(tx);
  };

  return(<>
    <div onClick={disconnectWallet}>
      <CancelIcon /><span className="text">Logout</span>
    </div>
    You are connected!
    <button onClick={sendTx}>send tx</button>
  </>);
}

export default Profile;