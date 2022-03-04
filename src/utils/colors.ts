import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    profile: {
      username: string;
      handle: string;
    };
    bodyBackground: string;
    text: string;
  }
}

const common = {
  profile: {
    username: '#485aff',
    handle: 'pink'
  }
}

const light = {
  ...common,
  bodyBackground: '#ffffff',
  text: '#18152E'
};

const dark = {
  ...common,
  bodyBackground: '#000000',
  text: '#FFFFFF'
}

export {light, dark};