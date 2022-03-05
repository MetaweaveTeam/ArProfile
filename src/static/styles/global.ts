import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({theme}) => theme.bodyBackground};
    color: ${({theme}) => theme.text};
  }

  a {
    color: rgb(238, 22, 173);
    text-decoration: inherit;
  }
  a:hover {
    color: rgb(248, 23, 182);
  }
`;

const transition = "transition: background 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in, opacity 0.2s ease-in;"

export {GlobalStyles, transition};
