import { icons } from './static';
import './App.css';
import Login from './components/Login';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  return (
    <div className="App">
      <header>
        <img src={icons.metaweave} alt="logo" />
        <h1>Account</h1>
        <p>
          An universal account protocol for your Arweave Wallet.
        </p>
        <p>
          Permanent - Decentralized - Owned by you
        </p>
      </header>
      <main>
        <h2>Edit your profile</h2>
        <Login />
        <h2>Developers</h2>
        <SyntaxHighlighter language="shell" style={a11yDark}>
          npm install arweave-account
        </SyntaxHighlighter>
        <SyntaxHighlighter language="javascript" style={a11yDark}>
          {`import { Account } from 'arweave-account'

Account.get(jwk); // Get Account profile
Account.search(handle); // return array of users`}
        </SyntaxHighlighter>
      </main>
    </div>
  );
}

export default App;
