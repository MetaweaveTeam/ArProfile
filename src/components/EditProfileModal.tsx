import { useEffect, useState } from 'react';
import { T_profile, T_walletName } from '../types';
import { Transaction } from '../api';
import { Modal, Text, Input, Row, Checkbox, Button, Textarea, Loading } from '@nextui-org/react';
import { FaDiscord, FaTwitter, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';

function EditProfileModale({walletName, isOpen, hasClosed}: {walletName: T_walletName, isOpen: boolean, hasClosed: () => void}) {
  const [profileData, setProfileData] = useState<T_profile>();
  const [isLoading, setIsLoading] = useState(false);

  const save = async () => {
    setIsLoading(true);
    let tx = new Transaction(walletName);
    const response = await tx.broadcast(JSON.stringify(
      {
        username: "cromatikap",
        name: "Axel",
        bio: "Software Engineer.\nFullstack developer.\nTraveler.\nFounder of Argora.",
        links: {
          twitter: "cromatikap",
          instagram: "cromatikap",
          github: "cromatikap"
        },
        image: "Ukdq-mGUm9Gm0A4_K0MLepP6cbPNWmRRkBs7aNzAJz8"
      }),
      [
        {name: "Protocol-Name", value: "Account-0.1"},
        {name: "handle", value: "cromatikap"}
      ]
    );
    console.log(response);
    setIsLoading(false);
  };

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
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="Name"
          contentLeft="Name"
        />
        <Textarea
          aria-label="Bio"
          placeholder="Bio"
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
        />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>
              I agree to the <a
                style={{textDecoration: 'underline'}}
                href="https://www.websitepolicies.com/blog/i-agree-terms-and-conditions"
                target="_blank"
                rel="noreferrer">Terms and Conditions ↗️</a>
            </Text>
          </Checkbox>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error">
        Close
        </Button>
        <Button onClick={save} css={{ px: '$13' }}>
          {isLoading ? <Loading color="white" size="sm" /> : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  </>);
}

export default EditProfileModale;