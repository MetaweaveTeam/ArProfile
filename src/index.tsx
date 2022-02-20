import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from 'styled-components';
import {light, dark} from './static/styles/colors';
import GlobalStyle from './static/styles/global';

const mq = window.matchMedia('(prefers-color-scheme: dark)');

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mq.matches ? dark : light}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
