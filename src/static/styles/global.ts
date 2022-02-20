import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({theme}) => theme.bodyBackground};
    color: ${({theme}) => theme.text};
  }
`;

export default GlobalStyles;
