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
import {ImProfile} from 'react-icons/im';
import {IoMdWallet} from 'react-icons/io';
import {BsPatchQuestion, BsCodeSlash} from 'react-icons/bs';
import Documentation from './components/Info/Documentation';
import About from './components/Info/About';

const Body = ({syntaxTheme}: {syntaxTheme: any}) =>
  (<div className="App">
    <header>
      <h1>Account</h1>
      <ImProfile size={230} />
      <h2>
        Your identity on the <a href="https://arweave.org" target="_blank" rel="noreferrer">permaweb</a>.
      </h2>
    </header>
    <main>
      <Grid.Container justify="space-between" alignItems="center">
        <h3><IoMdWallet />Access</h3>
        <ThemeSwitch />
      </Grid.Container>
      <Login />
      <h3><BsPatchQuestion />What is Account?</h3>
      <About />
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
