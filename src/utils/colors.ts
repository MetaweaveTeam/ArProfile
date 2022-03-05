import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    profile: {
      username: string;
      handle: string;
    };
    userAction: string;
    bodyBackground: string;
    text: string;
  }
}

const common = {
  profile: {
    username: '#485aff',
    handle: 'pink'
  },
  userAction: 'rgb(238, 22, 173)'
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