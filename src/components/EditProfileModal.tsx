import {useEffect, useState} from 'react';
import { T_addr } from '../utils/types';
import { Modal, Text, Input, /*Row, Checkbox,*/ Button, Textarea, Loading, Grid, Spacer } from '@nextui-org/react';
import { FaDiscord, FaTwitter, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import {arweave} from '../utils/api';
import { AvatarS } from '../static/styles/Profile';
import { BiUserCircle } from 'react-icons/bi';
import Account, { ArProfile } from '../arweave-account/lib';

/*
 *  ACCEPTED_DISPATCH_SIZE comes from https://github.com/th8ta/ArConnect/blob/e36880e3b2b363e356f7f08b19281351998a9cbe/src/api/modules/dispatch/index.ts#L17
 *  This is a workaround until the following issue is solved: https://github.com/th8ta/ArConnect/issues/88
 */
const ACCEPTED_DISPATCH_SIZE = 120 * Math.pow(10, 3);

function EditProfileModale({addr, profile, isOpen, hasClosed}: {addr: T_addr, profile: ArProfile, isOpen: boolean, hasClosed: () => void}) {
  const [profileData, setProfileData] = useState<ArProfile>(profile);
  const [handleError, setHandleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [picture, setPicture] = useState<{blobUrl: string, type: string} | null>(null);
  const [pictureIsLoading, setPictureIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if(profile && profile.handleName)
      setProfileData({...profile, handleName: profile.handleName});
  }, [profile]);

  const save = async () => {
    if(!profileData.handleName || (profileData.handleName && profileData.handleName.length <= 0))
      setHandleError(true);
    else{
      console.log(profileData);
      setIsLoading(true);
      const account = new Account();
      try {
        await account.connect();
        const result = await account.updateProfile(profileData);
        alert(`Your account has been successfully set! The network is processing your transaction: ${result.id}`);
      }
      catch(e) {
        alert(`Sorry, something went wrong:\n${e}`);
      }

      setIsLoading(false);
      hasClosed();
    }
  }

  const handleChangePicture = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("handleChangePicture");
    const files = e.currentTarget.files;
    if(files && files.length > 0){
      setPicture({
        blobUrl: URL.createObjectURL(files[0]),
        type: files[0].type
      });
      setIsUploaded(false);
    }
    e.currentTarget.files = null;
  };

  const uploadPicture = async () => {
    setPictureIsLoading(true);
    if(picture){
      let blob = await fetch(picture.blobUrl).then(r => r.blob());
      
      const reader = new FileReader();
      reader.addEventListener('loadend', async () => {
        if(reader.result){
          try{
            let tx = await arweave.createTransaction({ data:reader.result })
            tx.addTag('Content-Type',picture.type)

            const winstons = await arweave.wallets.getBalance(addr);
            const balance = parseFloat(winstons);
            const fee = parseFloat(tx.reward);
            const numBytes = parseInt(tx.data_size);

            if(numBytes <= ACCEPTED_DISPATCH_SIZE) {
              //@ts-ignore arweave-js does not have the latest arconnect type defitions that include 'dispatch()'
              let result = await window.arweaveWallet.dispatch(tx);
              setProfileData({...profileData, avatar: `ar://${result.id}`});
            }
            else if (balance >= fee) {
              await arweave.transactions.sign(tx);
              await arweave.transactions.post(tx);
              setProfileData({...profileData, avatar: `ar://${tx.id}`});
            }
            else {
              alert("Upload failed: Not enough funds in your wallet.\n\nTransfer some AR tokens to your wallet or try an image smaller than 100KB in size.");
              throw Error("Not enough funds");
            }
            setIsUploaded(true);
          }
          catch(e){
            alert("Upload failed :( error in the console");
            console.error(e);
          }
          finally{
            setPictureIsLoading(false);
          }
        }
      });
      reader.readAsArrayBuffer(blob);
    }
  }

  return(<>
    <Modal
      preventClose
      closeButton
      aria-labelledby="Edit profile"
      open={isOpen}
      onClose={hasClosed}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Edit profile information
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container gap={1} justify="center">
          <label style={{display: 'inherit', cursor: 'pointer'}}>
            <input hidden
              type="file"
              accept="image/*"
              onChange={handleChangePicture}
              aria-label="avatar file"
            />
            {
              picture ? <>
                <AvatarS src={picture.blobUrl} sx={{ width: 200, height: 200 }} />
                <Button auto
                  color="gradient"
                  style={{
                    position: 'absolute',
                    visibility: isUploaded ? 'hidden' : 'visible'
                  }}
                  onClick={uploadPicture}
                >
                  {pictureIsLoading ? <Loading color="white" size="sm" /> : 'Upload'}
                </Button>
              </>
              : 
              <AvatarS src={profileData.avatarURL} sx={{ width: 200, height: 200 }} />
            }
          </label>
        </Grid.Container>
        <Input
          disabled
          contentLeft={<BiUserCircle />}
          value={profileData.avatar} placeholder="Avatar URI"
          aria-label='avatar txid'
        />
        <Spacer y={1}/>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="handle"
          placeholder="handle"
          contentLeft="@"
          status={handleError ? 'error' : 'default'}
          value={profileData?.handleName ? profileData.handleName : ''}
          onChange={(e) => {
            setProfileData({...profileData, handleName: e.currentTarget.value})
            setHandleError(false);
          }}
          label={handleError ? 'Please write your handle name' : ''}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="Name"
          contentLeft="Name"
          value={profileData?.name ? profileData.name : ''}
          onChange={(e) => setProfileData({...profileData, name: e.currentTarget.value})}
        />
        <Textarea
          aria-label="Bio"
          placeholder="Bio"
          value={profileData?.bio ? profileData.bio : ''}
          onChange={(e) => setProfileData({...profileData, bio: e.currentTarget.value})}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="Twitter"
          placeholder="Twitter handle"
          contentLeft={<FaTwitter />}
          value={profileData.links.twitter ? profileData.links.twitter : ''}
          onChange={(e) => setProfileData({...profileData, links: {...profileData.links, twitter: e.currentTarget.value}})}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="Discord"
          placeholder="Discord handle"
          contentLeft={<FaDiscord />}
          value={profileData.links.discord ? profileData.links.discord : ''}
          onChange={(e) => setProfileData({...profileData, links: {...profileData.links, discord: e.currentTarget.value}})}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="Github"
          placeholder="Github handle"
          contentLeft={<FaGithub />}
          value={profileData.links.github ? profileData.links.github : ''}
          onChange={(e) => setProfileData({...profileData, links: {...profileData.links, github: e.currentTarget.value}})}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="Instagram"
          placeholder="Instagram handle"
          contentLeft={<FaInstagram />}
          value={profileData.links.instagram ? profileData.links.instagram : ''}
          onChange={(e) => setProfileData({...profileData, links: {...profileData.links, instagram: e.currentTarget.value}})}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="Facebook"
          placeholder="Facebook handle"
          contentLeft={<FaFacebook />}
          value={profileData.links.facebook ? profileData.links.facebook : ''}
          onChange={(e) => setProfileData({...profileData, links: {...profileData.links, facebook: e.currentTarget.value}})}
        />
        {/* <Row justify="space-between">
          <Checkbox>
            <Text size={14}>
              I agree to the <a
                style={{textDecoration: 'underline'}}
                href="https://www.websitepolicies.com/blog/i-agree-terms-and-conditions"
                target="_blank"
                rel="noreferrer">Terms and Conditions ↗️</a>
            </Text>
          </Checkbox>
        </Row> */}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={hasClosed}>
        Cancel
        </Button>
        <Button onClick={save} css={{ px: '$13' }}>
          {isLoading ? <Loading color="white" size="sm" /> : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  </>);
}

export default EditProfileModale;