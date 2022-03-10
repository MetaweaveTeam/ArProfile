import {useEffect, useState} from 'react';
import { T_profile } from '../utils/types';
import { Modal, Text, Input, Row, Checkbox, Button, Textarea, Loading } from '@nextui-org/react';
import { FaDiscord, FaTwitter, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import {AMW} from '../utils/api';
import { protocolName } from '../static';

function EditProfileModale({profile, isOpen, hasClosed}: {profile: T_profile | undefined, isOpen: boolean, hasClosed: () => void}) {
  const [profileData, setProfileData] = useState<T_profile>({
    addr: "",
    links: {},
  });
  const [handleError, setHandleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(profile && profile.handle)
      setProfileData({...profile, handle: profile.handle.slice(0, -7)});
  }, [profile]);

  const save = async () => {
    if(!profileData.handle || profileData.handle && profileData.handle.length <= 0)
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