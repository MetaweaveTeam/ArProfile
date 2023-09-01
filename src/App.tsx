import './App.css';
import Login from './components/Login';
import { a11yDark, duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeSwitch from './components/ThemeSwitch';
import {ThemeProvider} from 'styled-components';
import {light, dark} from './utils/colors';
import {GlobalStyles} from './static/styles/global';
import { useState } from 'react';
import ctx from './utils/ctx';
import { Grid } from '@nextui-org/react';
import {IoMdWallet} from 'react-icons/io';
import {BsPatchQuestion, BsCodeSlash, BsFillHeartFill} from 'react-icons/bs';
import Documentation from './components/Info/Documentation';
import About from './components/Info/About';
import Using from './components/Info/Using';
const appVersion = require('../package.json').version;

const Body = ({syntaxTheme}: {syntaxTheme: any}) =>
  (<div className="App">
    <header>
      <h1>ArProfile</h1>
      <img style={{width: '300px', marginTop: 0}} src="https://arweave.net/aKIwse_933T-oQpxJnyj-DP0pG03k_88Iw04EbHoolk" alt="logo" />
      <h2>
        Your identity on the <a href="https://arweave.org" target="_blank" rel="noreferrer">permaweb</a>.
      </h2>
      <div id="app-version">{ appVersion }</div>
    </header>
    <main>
      <Grid.Container justify="space-between" alignItems="center">
        <h3><IoMdWallet />Access</h3>
        <ThemeSwitch />
      </Grid.Container>
      <Login />
      <h3><BsPatchQuestion />What is ArProfile?</h3>
      <About />
      <h3><BsFillHeartFill />A profile that follows you accross the ecosystem</h3>
      <Using />
      <h3><BsCodeSlash />Buidlers</h3>
      <Documentation syntaxTheme={syntaxTheme} />
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
