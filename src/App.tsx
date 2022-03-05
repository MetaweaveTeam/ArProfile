import './App.css';
import Login from './components/Login';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeSwitch from './components/ThemeSwitch';
import {ThemeProvider} from 'styled-components';
import {light, dark} from './utils/colors';
import {GlobalStyles} from './static/styles/global';
import { useState } from 'react';
import ctx from './utils/ctx';
import { Grid } from '@nextui-org/react';
import {ImProfile} from 'react-icons/im';
import {IoMdWallet} from 'react-icons/io';
import {BsPatchQuestion, BsCodeSlash} from 'react-icons/bs';

const Body = ({syntaxTheme}: {syntaxTheme: any}) =>
  (<div className="App">
    <header>
      <h1>Account</h1>
      {/* <img src={icons.metaweave} alt="logo" /> */}
      <ImProfile size={230} />
      <h2>
        Your identity on the <a href="https://arweave.org" target="_blank" rel="noreferrer">permaweb</a>.
      </h2>
    </header>
    <main>
      <Grid.Container gap={2} justify="space-between" alignItems="center">
        <h3><IoMdWallet />Access</h3>
        <ThemeSwitch />
      </Grid.Container>
      <Login />
      <h3><BsPatchQuestion />What is Account?</h3>
      <p>Arweave native protocol</p>
      <p>Scalable</p>
      <p>Universal</p>
      <p>Permanent UI to access</p>
      <p>Read/write access UI permanently accessible and immutable</p>
      <p>
        Universal and scalable account protocol for your wallet on Arweave.
        Permanent - Decentralized - Owned by you
      </p>
      <h3><BsCodeSlash />Buidlers</h3>
      <p>The current UI you're browsing now makes the Account protocol permanently accessible, immutable and reusable as you can simply redirect to this permadapp for them to edit their accounts.</p>
      <p>Account protocol is a simple transaction containing the latest data state. A wallet key is attached to its own latest write with the tag Protocol-Name: 'Account-{'<version>'}'</p>
      <SyntaxHighlighter language="shell" style={syntaxTheme}>
        npm install arweave-account
      </SyntaxHighlighter>
      <SyntaxHighlighter language="javascript" style={syntaxTheme}>
        {`import Account from 'arweave-account'

const account = new Account();
await account.get(jwk); // Get Account profile
await account.search(handle); // return array of users`}
      </SyntaxHighlighter>
    </main>
  </div>);

function App() {

  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  const [theme, updateTheme] = useState(mq.matches);
  const setTheme = (t: boolean) => {
    updateTheme(t);
  }

  return (
    <ctx.Provider value={{theme, setTheme}}>
      <ThemeProvider theme={theme ? dark : light}>
        <GlobalStyles />
        <Body syntaxTheme={theme ? a11yDark : duotoneLight} />
      </ThemeProvider>
    </ctx.Provider>
  );
}

export default App;
