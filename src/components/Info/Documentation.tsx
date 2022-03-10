import { Grid } from '@nextui-org/react';
import { FaGithub } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function Documentation({syntaxTheme}: {syntaxTheme: any}) {
  return(<>
    <h4>Integrate Account in your app</h4>
    <SyntaxHighlighter language="shell" style={syntaxTheme}>
      npm install arweave-account
    </SyntaxHighlighter>
    <h4>Usage</h4>
    <SyntaxHighlighter language="javascript" style={syntaxTheme}>
      {`import Account from 'arweave-account'

const account = new Account();
const {profile, txid} = await account.get(walletAddr); // Get Account
const profiles = await account.search(handle); // return array of matching handle name accounts`}
    </SyntaxHighlighter>
    Voilà.
    <Grid.Container gap={1} justify="center" alignItems='center'>
      <a href="https://github.com/MetaweaveTeam/arweave-account" target="_blank" rel="noreferrer">arweave-account</a>
      <FaGithub size={50} style={{margin: '20px'}} />
      <a href="https://github.com/MetaweaveTeam/Account" target="_blank" rel="noreferrer">This application</a>
    </Grid.Container>
  </>);
}

export default Documentation;