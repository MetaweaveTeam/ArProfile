import { FormElement, Grid, Input } from '@nextui-org/react';
import { FaGithub } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Account from 'arweave-account';
import { useEffect, useState } from 'react';

const account = new Account();
let typingTimeout: any = null;

function Documentation({syntaxTheme}: {syntaxTheme: any}) {
  const [walletAddr, setWalletAddr] = useState("aIUmY9Iy4qoW3HOikTy6aJww-mM4Y-CUJ7mXoPdzdog");
  const [getReturn, setGetReturn] = useState("loading...");
  const [handle, setHandle] = useState("cromatikap");
  const [searchReturn, setSearchReturn] = useState("loading...");
  const [uniqueHandle, setUniqueHandle] = useState("cromatikap#aIUdog");
  const [findReturn, setFindReturn] = useState("loading...");

  const handleChangeWalletAddr = (e: React.FormEvent<FormElement>) => {
    const walletAddr = e.currentTarget.value;
    setWalletAddr(walletAddr);

    if(typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(async () => {
      setGetReturn("loading...");
      const a = await account.get(walletAddr);
      setGetReturn(JSON.stringify(a, null, 2));
    }, 300);
  }

  const handleChangeHandle = (e: React.FormEvent<FormElement>) => {
    const handle = e.currentTarget.value;
    setHandle(handle);

    if(typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(async () => {
      setSearchReturn("loading...");
      const a = await account.search(handle);
      setSearchReturn(JSON.stringify(a, null, 2));
    }, 300);
  }

  const handleChangeUniqueHandle = (e: React.FormEvent<FormElement>) => {
    const uniqueHandle = e.currentTarget.value;
    setUniqueHandle(uniqueHandle);

    if(typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(async () => {
      setFindReturn("loading...");
      const a = await account.find(uniqueHandle);
      setFindReturn(JSON.stringify(a, null, 2));
    }, 300);
  }

  useEffect(() => {
    (async () => {
      console.log("useEffect")
      setGetReturn(JSON.stringify(await account.get(walletAddr), null, 2));
      setSearchReturn(JSON.stringify(await account.search(handle), null, 2));
      setFindReturn(JSON.stringify(await account.find(uniqueHandle), null, 2));
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(<>
    <h4>Integrate Account in your app</h4>
    <SyntaxHighlighter language="shell" style={syntaxTheme}>
      npm install arweave-account
    </SyntaxHighlighter>
    <h4>Usage</h4>
    <SyntaxHighlighter language="javascript" style={syntaxTheme}>
{`import Account from 'arweave-account';
...
const account = new Account(opts);`}
    </SyntaxHighlighter>
    An optional arguments object can be passed, here is an example with the default values:
    <SyntaxHighlighter language="javascript" style={syntaxTheme}>
{`const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};`}
    </SyntaxHighlighter>

    {/* <Button onClick={() => account.clearCache()}>clear arweave-account cache</Button> */}

    <h4>Get user profile by wallet address</h4>
    <Input fullWidth
      spellCheck={false}
      aria-label="Wallet address"
      labelLeft="Wallet address" 
      value={walletAddr}
      onChange={handleChangeWalletAddr}
    />
    <SyntaxHighlighter language="javascript" style={syntaxTheme}>
      {`await account.get("${walletAddr}");`}
    </SyntaxHighlighter>
    Return:
    <SyntaxHighlighter language="json" style={syntaxTheme}>
      {getReturn}
    </SyntaxHighlighter>

    <h4>Search user profile by handle name</h4>
    <Input fullWidth
      spellCheck={false}
      aria-label="@handle"
      labelLeft="@handle" 
      value={handle}
      onChange={handleChangeHandle}
    />
    <SyntaxHighlighter language="javascript" style={syntaxTheme}>
      {`await account.search("${handle}");`}
    </SyntaxHighlighter>
    Return:
    <SyntaxHighlighter language="json" style={syntaxTheme}>
      {searchReturn}
    </SyntaxHighlighter>

    <h4>Find user profile by unique handle</h4>
    <Input fullWidth
      spellCheck={false}
      aria-label="@handle"
      labelLeft="@handle" 
      value={uniqueHandle}
      onChange={handleChangeUniqueHandle}
    />
    <SyntaxHighlighter language="javascript" style={syntaxTheme}>
      {`await account.find("${uniqueHandle}");`}
    </SyntaxHighlighter>
    Return:
    <SyntaxHighlighter language="json" style={syntaxTheme}>
      {findReturn}
    </SyntaxHighlighter>
    
    <Grid.Container gap={1} justify="center" alignItems='center'>
      <a href="https://github.com/MetaweaveTeam/arweave-account" target="_blank" rel="noreferrer">arweave-account</a>
      <FaGithub size={50} style={{margin: '20px'}} />
      <a href="https://github.com/MetaweaveTeam/Account" target="_blank" rel="noreferrer">This application</a>
    </Grid.Container>
  </>);
}

export default Documentation;