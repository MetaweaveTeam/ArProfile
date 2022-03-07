import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function Documentation({syntaxTheme}: {syntaxTheme: any}) {
  return(<>
    <p>The current UI you're browsing now makes the Account protocol permanently accessible, immutable and reusable as you can simply redirect to this permadapp for them to edit their accounts.</p>
    <p>Account protocol is a simple transaction containing the latest data state. A wallet key is attached to its own latest write with the tag Protocol-Name: 'Account-{'<version>'}'</p>
    <SyntaxHighlighter language="shell" style={syntaxTheme}>
      npm install arweave-account
    </SyntaxHighlighter>
    <SyntaxHighlighter language="javascript" style={syntaxTheme}>
      {`import Account from 'arweave-account'

const account = new Account();
await account.get(jwk); // Get Account
await account.search(handle); // return array of similar Accounts`}
    </SyntaxHighlighter>
  </>);
}

export default Documentation;