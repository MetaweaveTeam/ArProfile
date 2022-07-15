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

import { T_addr, T_walletName } from '../utils/types';
import Account, { ArAccount } from 'arweave-account';

import EditProfileModale from './EditProfileModal';
import { AMW } from '../utils/api';

function Profile({addr, walletName, disconnectWallet}: {addr: T_addr, walletName: T_walletName, disconnectWallet: () => void}) {

  const [userAccount, setUserAccount] = useState<ArAccount>()
  const [hasFailed, setHasFailed] = useState<string | false>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [balance, setBalance] = useState<string>();
  
  useEffect(() => {
    (async () => {
      try {
        const account = new Account();
        const user = await account.get(addr);
        setUserAccount(user);
        setBalance(await AMW.getBalance());
      }
      catch (e){
        console.log(e);
        setHasFailed(JSON.stringify(e));
      }
    })()
  }, [addr]);

  return(
    <div className='gradient-border' style={{padding: '5px'}}>{
      hasFailed ? <>
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
    : userAccount ? <>
        <EditProfileModale addr={addr} profile={userAccount.profile} isOpen={modalIsOpen} hasClosed={() => setModalIsOpen(false)} />

        <Grid.Container gap={3} justify="space-between" alignItems='center'>
          <Button auto onClick={disconnectWallet} icon={<AiOutlinePoweroff size={18} />} color="error">Logout</Button>
          {walletName === "bundlr" && <>
            Balance: {balance}
            <a href="https://demo.bundlr.network/" target="_blank" rel="noreferrer">Top-up my bundlr account</a>
          </>}
          <Button auto onClick={() => setModalIsOpen(true)} iconRight={<FiEdit size={18} />} color="gradient">Edit Profile</Button>
        </Grid.Container>
        
        {userAccount.txid && <Grid.Container gap={2} justify="center">
          <a href={`https://viewblock.io/arweave/tx/${userAccount.txid}`} target="_blank" rel="noreferrer" style={{fontFamily: "monospace", fontSize: "larger"}}>
            txid: {userAccount.txid}
          </a>
        </Grid.Container>}
        <BoxVertoID>
          <AvatarS src={userAccount.profile.avatarURL} sx={{ width: 200, height: 200 }} />
          <VertoIDinfo>
            <Name>{userAccount.profile.name}</Name>
            <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
              {userAccount.handle}
            </UserAddr>
            <DetailsS>
              <Bio>{userAccount.profile.bio}</Bio>
              {userAccount.profile.links.twitter && 
              <UserSocial href={`https://twitter.com/${userAccount.profile.links.twitter}`} target="_blank" rel="noreferrer">
                <FaTwitter size={25} />
              </UserSocial>}
              {userAccount.profile.links.github && <UserSocial href={`https://github.com/${userAccount.profile.links.github}`} target="_blank" rel="noreferrer">
                <FaGithub size={25} />
              </UserSocial>}
              {userAccount.profile.links.instagram && <UserSocial href={`https://instagram.com/${userAccount.profile.links.instagram}`} target="_blank" rel="noreferrer">
                <FaInstagram size={25} />
              </UserSocial>}
              {userAccount.profile.links.facebook && <UserSocial href={`https://facebook.com/${userAccount.profile.links.facebook}`} target="_blank" rel="noreferrer">
                <FaFacebook size={25} />
              </UserSocial>}
              {userAccount.profile.links.discord && <span>
                <FaDiscord size={25} /> {userAccount.profile.links.discord}
              </span>}
            </DetailsS>
          </VertoIDinfo>
        </BoxVertoID>
      </>
    : <Grid.Container gap={1} justify="center">
        <Loading size="xl" css={{padding: '$24'}} color="success" />
      </Grid.Container>}
    </div>
  );
}

export default Profile;