import { Modal, Text, Input, Row, Checkbox, Button, Textarea } from '@nextui-org/react';
import { FaDiscord, FaTwitter, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';

function EditProfileModale() {
  return(<>
    <Modal
      closeButton
      aria-labelledby="Edit profile"
      open={true}
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
          aria-label="Name"
          contentLeft="Name"
        />
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
        <Button auto>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  </>);
}

export default EditProfileModale;