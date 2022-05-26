import { Button } from '@nextui-org/react';
import { useState } from 'react';
import Account from '../arweave-account/lib';

function AppsDataManager() {
  const [appIdentifier, setAppIdentifier] = useState("");

  const handleAppIdentifierChange = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAppIdentifier(e.currentTarget.value);
  }

  const instantiateAccount = async () => {
    alert(appIdentifier);

    // const account = new Account({
    //   AppIdentifier: "test"
    // });

    // await account.get("NVkSolD-1AJcJ0BMfEASJjIuak3Y6CvDJZ4XOIUbU9g");
    // console.log(await account.appData?.set("test", "value of test"));
    // console.log(await account.appData?.get("test"));
  }

  return <>
    AppsDataManager component
    <input
      type="text"
      placeholder="AppIdentifier"
      onChange={handleAppIdentifierChange}
      value={appIdentifier}
    />
    <Button onClick={instantiateAccount}>Instantiate Account</Button>
  </>
}

export default AppsDataManager;