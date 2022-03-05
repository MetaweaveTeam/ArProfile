import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({theme}) => theme.bodyBackground};
    color: ${({theme}) => theme.text};
  }

  a {
    color: ${({theme}) => theme.userAction};
    text-decoration: inherit;
  }
  a:hover {
    color: ${({theme}) => theme.text};
    text-decoration: underline;
  }

  .gradient-border {
    --borderWidth: 3px;
    background: ${({theme}) => theme.bodyBackground};
    position: relative;
    border-radius: var(--borderWidth);
  }
  .gradient-border:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
  }
  
  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .wallet {
    border: 1px solid ${({theme}) => theme.text};
    background-color: ${({theme}) => theme.bodyBackground};
  }
  .wallet:hover {
    border: 1px solid ${({theme}) => theme.userAction};
  }
`;

const transition = "transition: background 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in, opacity 0.2s ease-in;"

export {GlobalStyles, transition};
