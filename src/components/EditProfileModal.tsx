import {useEffect, useState} from 'react';
import { T_addr, T_profile } from '../utils/types';
import { Modal, Text, Input, Row, Checkbox, Button, Textarea, Loading, Grid, Spacer } from '@nextui-org/react';
import { FaDiscord, FaTwitter, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import {AMW} from '../utils/api';
import { protocolName } from '../static';
import { AvatarS } from '../static/styles/Profile';
import { BiUserCircle } from 'react-icons/bi';

function EditProfileModale({addr, profile, isOpen, hasClosed}: {addr: T_addr, profile: T_profile | undefined, isOpen: boolean, hasClosed: () => void}) {
  const [profileData, setProfileData] = useState<T_profile>({
    addr: "",
    links: {},
  });
  const [handleError, setHandleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [picture, setPicture] = useState<{blobUrl: string, type: string} | null>(null);
  const [pictureIsLoading, setPictureIsLoading] = useState(false);

  useEffect(() => {
    if(profile && profile.handle)
      setProfileData({...profile, handle: profile.handle.slice(0, -7)});
  }, [profile]);

  const save = async () => {
    if(!profileData.handle || (profileData.handle && profileData.handle.length) <= 0)
      setHandleError(true);
    else{
      console.log(profileData);
      setIsLoading(true);
      const result = await AMW.write(JSON.stringify(profileData), [
        {name: "Protocol-Name", value: protocolName},
        {name: "handle", value: profileData.handle}
      ]);
      if(result)
        alert("Your profile information has been saved. txid: "+result.txid+"\nPlease wait for miners to confirm the transaction.");
      else
        alert("something wrong happened :(");
      console.log("save result: ", result);
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
            const result = await AMW.write(reader.result, [{name: "Content-Type", value: picture.type}]);
            console.log("picture result", result);
            setProfileData({...profileData, avatar: result.txid})
          }
          catch(e){
            alert("Upload failed :( error in the console");
          }
          finally{
            setPictureIsLoading(false);
            setPicture(null);
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
                    position: 'absolute'
                  }}
                  onClick={uploadPicture}
                >
                  {pictureIsLoading ? <Loading color="white" size="sm" /> : 'Upload'}
                </Button>
              </>
              : profileData.avatar
              ? <AvatarS src={`https://arweave.net/${profileData.avatar}`} sx={{ width: 200, height: 200 }} />
              : <AvatarS sx={{ width: 200, height: 200, fontSize: 'xx-large', fontFamily: 'monospace' }}>#{addr.slice(0, 3)}{addr.slice(-3)}</AvatarS>
            }
          </label>
        </Grid.Container>
        <Input
          disabled
          contentLeft={<BiUserCircle />}
          value={profileData?.avatar ? `${profileData.avatar.slice(0,5)}...${profileData.avatar.slice(-5)}` : ''} placeholder="txid"
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
          value={profileData?.handle ? profileData.handle : ''}
          onChange={(e) => {
            setProfileData({...profileData, handle: e.currentTarget.value})
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