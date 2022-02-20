import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bodyBackground: string;
    text: string;
  }
}

const light = {
  bodyBackground: '#ffffff',
  text: '#18152E'
};

const dark = {
  bodyBackground: '#000000',
  text: '#FFFFFF'
}

export {light, dark};