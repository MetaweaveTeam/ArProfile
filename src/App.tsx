import { icons } from './static';
import './App.css';
import Login from './components/Login';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeSwitch from './components/ThemeSwitch';
import {ThemeProvider} from 'styled-components';
import {light, dark} from './utils/colors';
import {GlobalStyles} from './static/styles/global';
import { useState } from 'react';
import ctx from './utils/ctx';
import { Grid } from '@nextui-org/react';

const Body = () =>
  (<div className="App">
    <header>
      <img src={icons.metaweave} alt="logo" />
      <h1>Account</h1>
      <p>
        The universal and scalable account protocol for your wallet on Arweave.
      </p>
      <p>
        Permanent - Decentralized - Owned by you
      </p>
    </header>
    <main>
      <Grid.Container gap={2} justify="space-between" alignItems="center">
        <h2>Edit your profile</h2>
        <ThemeSwitch />
      </Grid.Container>
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
        <Body />
      </ThemeProvider>
    </ctx.Provider>
  );
}

export default App;
