import { MdOutlineCancel } from 'react-icons/md';
import { FaTwitter, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';

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
import { T_jwk, T_profile, T_walletName } from '../types';
import { useEffect, useState } from 'react';
import { getProfile } from '../api';
import Account from 'arweave-account';
import EditProfileModale from './EditProfileModal';

function Profile({jwk, walletName, disconnectWallet}: {jwk: T_jwk, walletName: T_walletName, disconnectWallet: () => void}) {

  const [profileData, setProfileData] = useState<T_profile>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("walletName", walletName);

    const account = new Account();
    console.log(account.getSomething());

    (async () => {
      const profile = await getProfile(jwk);
      console.log(profile);
      setProfileData(profile);
    })()
  }, [jwk, walletName]);

  return(<>
    <EditProfileModale walletName={walletName} />

    <div onClick={disconnectWallet}>
      <MdOutlineCancel /><span className="text">Logout</span>
    </div>

    <hr />

    <BoxVertoID>
      {profileData && profileData.image 
        ? <AvatarS src={`https://arweave.net/${profileData.image}`} sx={{ width: 200, height: 200 }} />
        : <AvatarS sx={{ width: 200, height: 200 }}>{profileData ? profileData.username.slice(0,2) : jwk.slice(0,2)}</AvatarS>
      }
      <VertoIDinfo>
        {profileData && <Name>{profileData.name}</Name>}
        <UserAddr href={`https://viewblock.io/arweave/address/${jwk}`} target="_blank" rel="noreferrer">
          {profileData ? '@' + profileData.username : `${jwk.slice(0,5)}...${jwk.slice(jwk.length-5, jwk.length)}`}
        </UserAddr>
        {profileData && <DetailsS>
          <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
            <UserAddr href={`https://viewblock.io/arweave/address/${jwk}`} target="_blank" rel="noreferrer">
              <li>{jwk.slice(0,5)}...{jwk.slice(jwk.length-5, jwk.length)}</li>
            </UserAddr>
          </ul>
          <Bio>{profileData.bio}</Bio>
          {profileData.links.twitter && 
          <UserSocial href={`https://twitter.com/${profileData.links.twitter}`} target="_blank" rel="noreferrer">
            <FaTwitter size={25} />
          </UserSocial>}
          {profileData.links.instagram && <UserSocial href={`https://instagram.com/${profileData.links.instagram}`} target="_blank" rel="noreferrer">
            <FaInstagram size={25} />
          </UserSocial>}
          {profileData.links.github && <UserSocial href={`https://github.com/${profileData.links.github}`} target="_blank" rel="noreferrer">
            <FaGithub size={25} />
          </UserSocial>}
          {profileData.links.facebook && <UserSocial href={`https://facebook.com/${profileData.links.facebook}`} target="_blank" rel="noreferrer">
            <FaFacebook size={25} />
          </UserSocial>}
        </DetailsS>}
      </VertoIDinfo>
    </BoxVertoID>
  </>);
}

export default Profile;