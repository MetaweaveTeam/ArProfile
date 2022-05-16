import { useEffect, useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaFacebook, FaGithub, FaDiscord } from 'react-icons/fa';
import {Button, Grid, Loading, Text, Spacer} from '@nextui-org/react';

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

import { T_addr, T_profile, T_walletName, T_txid } from '../utils/types';
import Account from '../arweave-account/lib';

import EditProfileModale from './EditProfileModal';
import { AMW } from '../utils/api';

function Profile({addr, walletName, disconnectWallet}: {addr: T_addr, walletName: T_walletName, disconnectWallet: () => void}) {

  const [profileData, setProfileData] = useState<T_profile>();
  const [profileTxid, setProfileTxid] = useState<T_txid>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState<string | false>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [balance, setBalance] = useState<string>();
  
  useEffect(() => {
    (async () => {
      try {
        const account = new Account();
        const user = await account.get(addr);
        if(user){
          setProfileData(user.profile);
          setProfileTxid(user.txid);
          setBalance(await AMW.getBalance());
        }
      }
      catch (e){
        console.log(e);
        setHasFailed(JSON.stringify(e));
      }
      finally {
        setIsLoading(false);
      }
    })()
  }, [addr]);

  return(
    <div className='gradient-border' style={{padding: '5px'}}>{isLoading
    ? <Grid.Container gap={1} justify="center">
        <Loading size="xl" css={{padding: '$24'}} color="success" />
      </Grid.Container>
    : hasFailed ? <>
        <Spacer y={3}/>
        <Grid.Container gap={1} justify="center">
          <Text color="error">Something wrong happened :(</Text>
        </Grid.Container>
        <Spacer y={2}/>
        <Grid.Container gap={1} justify="center">
          <Button color="secondary" onClick={disconnectWallet}>Retry</Button>
        </Grid.Container>
        <Spacer y={3}/>
      </>
    : <>
        <EditProfileModale addr={addr} profile={profileData} isOpen={modalIsOpen} hasClosed={() => setModalIsOpen(false)} />

        <Grid.Container gap={3} justify="space-between" alignItems='center'>
          <Button auto onClick={disconnectWallet} icon={<AiOutlinePoweroff size={18} />} color="error">Logout</Button>
          {walletName === "bundlr" && <>
            Balance: {balance}
            <a href="https://demo.bundlr.network/" target="_blank" rel="noreferrer">Top-up my bundlr account</a>
          </>}
          <Button auto onClick={() => setModalIsOpen(true)} iconRight={<FiEdit size={18} />} color="gradient">Edit Profile</Button>
        </Grid.Container>
        
        {profileData ? <>
          {profileTxid && <Grid.Container gap={2} justify="center">
            <a href={`https://viewblock.io/arweave/tx/${profileTxid}`} target="_blank" rel="noreferrer" style={{fontFamily: "monospace", fontSize: "larger"}}>
              txid: {profileTxid}
            </a>
          </Grid.Container>}
          <BoxVertoID>
            {profileData.avatar
              ? <AvatarS src={`https://arweave.net/${profileData.avatar}`} sx={{ width: 200, height: 200 }} />
              : <AvatarS sx={{ width: 200, height: 200, fontSize: 'xx-large', fontFamily: 'monospace' }}>#{addr.slice(0, 3)}{addr.slice(-3)}</AvatarS>
            }
            <VertoIDinfo>
            {profileData.name && <Name>{profileData.name}</Name>}
              <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
                @{profileData.handle}
              </UserAddr>
              <DetailsS>
                <Bio>{profileData.bio}</Bio>
                {profileData.links.twitter && 
                <UserSocial href={`https://twitter.com/${profileData.links.twitter}`} target="_blank" rel="noreferrer">
                  <FaTwitter size={25} />
                </UserSocial>}
                {profileData.links.github && <UserSocial href={`https://github.com/${profileData.links.github}`} target="_blank" rel="noreferrer">
                  <FaGithub size={25} />
                </UserSocial>}
                {profileData.links.instagram && <UserSocial href={`https://instagram.com/${profileData.links.instagram}`} target="_blank" rel="noreferrer">
                  <FaInstagram size={25} />
                </UserSocial>}
                {profileData.links.facebook && <UserSocial href={`https://facebook.com/${profileData.links.facebook}`} target="_blank" rel="noreferrer">
                  <FaFacebook size={25} />
                </UserSocial>}
                {profileData.links.discord && <span>
                  <FaDiscord size={25} /> {profileData.links.discord}
                </span>}
              </DetailsS>
            </VertoIDinfo>
          </BoxVertoID>
        </> : <>
          <div style={{
            fontSize: 'xx-large',
            textAlign: 'center',
            padding: '70px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div>
              Hello{` `}
              <span style={{
                fontSize: '',
                fontFamily: 'monospace'
              }}>
                <a href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
                  {`${addr.slice(0,5)}...${addr.slice(addr.length-5, addr.length)}`}
                </a>
              </span>
              {` 🙂`}
            </div>
            <Button onClick={() => setModalIsOpen(true)} color="success" size="xl" css={{marginTop: '30px'}}>Activate my Account</Button>
          </div>
        </>}
      </>}
    </div>
  );
}

export default Profile;