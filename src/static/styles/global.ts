import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({theme}) => theme.bodyBackground};
    color: ${({theme}) => theme.text};
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const transition = "transition: background 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in, opacity 0.2s ease-in;"

export {GlobalStyles, transition};
