import CancelIcon from '@mui/icons-material/Cancel';
import Arweave from 'arweave';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

import {
  AvatarS,
  Bio,
  BoxVertoID,
  DetailsS,
  Name,
  UserAddr,
  UserSocial,
  VertoIDinfo,
} from '../static/styles/Profile';
import { T_jwk } from '../types';

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
  "bio":"Software Engineer.\nFullstack developer.\nTraveler.\nFounder of Argora.",
  "links": {
    "twitter":"bidetaggle",
    "instagram":"bidetaggle",
    "github":"bidetaggle",
    "facebook":"justfortest"
  },
  "image": "Ukdq-mGUm9Gm0A4_K0MLepP6cbPNWmRRkBs7aNzAJz8"
};

function Profile({jwk, disconnectWallet}: {jwk: T_jwk, disconnectWallet: () => void}) {

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

    <hr />

    <BoxVertoID>
      {vertoID && vertoID.image 
      ? <AvatarS src={`https://arweave.net/${vertoID.image}`} sx={{ width: 200, height: 200 }} />
      : <AvatarS sx={{ width: 200, height: 200 }}>{
        vertoID ? vertoID.username.slice(0,2) : jwk.slice(0,2)
      }</AvatarS>}
      <VertoIDinfo>
        {vertoID && <Name>{vertoID.name}</Name>}
        <UserAddr href={`https://viewblock.io/arweave/address/${jwk}`} target="_blank" rel="noreferrer">
          {vertoID ? '@' + vertoID.username : `${jwk.slice(0,5)}...${jwk.slice(jwk.length-5, jwk.length)}`}
        </UserAddr>
        {vertoID && <DetailsS>
          <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
            <UserAddr href={`https://viewblock.io/arweave/address/${jwk}`} target="_blank" rel="noreferrer">
              <li>{jwk.slice(0,5)}...{jwk.slice(jwk.length-5, jwk.length)}</li>
            </UserAddr>
          </ul>
          <Bio>{vertoID.bio}</Bio>
          {vertoID.links.twitter && 
          <UserSocial href={`https://twitter.com/${vertoID.links.twitter}`} target="_blank" rel="noreferrer">
            <TwitterIcon fontSize="medium" />
          </UserSocial>}
          {vertoID.links.instagram && <UserSocial href={`https://instagram.com/${vertoID.links.instagram}`} target="_blank" rel="noreferrer">
            <InstagramIcon fontSize="medium" />
          </UserSocial>}
          {vertoID.links.github && <UserSocial href={`https://github.com/${vertoID.links.github}`} target="_blank" rel="noreferrer">
            <GitHubIcon fontSize="medium" />
          </UserSocial>}
          {vertoID.links.facebook && <UserSocial href={`https://facebook.com/${vertoID.links.facebook}`} target="_blank" rel="noreferrer">
            <FacebookIcon fontSize="medium" />
          </UserSocial>}
        </DetailsS>}
      </VertoIDinfo>
    </BoxVertoID>
  </>);
}

export default Profile;