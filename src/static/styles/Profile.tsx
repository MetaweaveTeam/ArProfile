import { Avatar } from '@mui/material';
import styled from 'styled-components';
import {transition} from './global';

const AvatarS = styled(Avatar)`
  ${transition}
  display: inline-flex;
  width: 200px;
  height: 200px;
  font-size: xxx-large;
  background-color: ${({ theme }) => theme.profile.username};
  color: ${({ theme }) => theme.profile.username};
`;

const Box = styled('div')`
  ${transition}
  color: ${({theme}) => theme.text};
  padding: 10px 10px 10px 10px;
  margin: auto;
  margin-top: 5px;
  max-width: 600px;
  box-sizing: initial;
`;

const BoxVertoID = styled(Box)`
  display: flex;
  align-items: center;

  @media only screen and (min-width: 724px){
    & > ${AvatarS} {
      margin-right: 20px;
    }
  }

  @media only screen and (max-width: 724px){
    flex-direction: column;
  }
`;

const BoxAnonymous = styled(Box)`
  text-align: center;
`;

const AvatarAnonymousS = styled(Avatar)`
  ${transition}
  display: inline-flex;
  width: 150px;
  height: 150px;
  font-size: xxx-large;
  background-color: ${({ theme }) => theme.profile.username};
  color: ${({ theme }) => theme.profile.username};
`;

const DetailsS = styled('div')`
  &.minified {
    display: none;
  }
`;

const VertoIDinfo = styled('div')`
  flex: 1;
  overflow-wrap: anywhere;
`;

const Name = styled('div')`
  color: ${({theme}) => theme.profile.username};
  font-size: xx-large;
  margin-bottom: -7px;
  font-weight: bold;
`;

const UserAddr = styled('a')`
  ${transition}
  font-family: monospace;
  color: #1a98ff;
  &:hover {
    color: #6aaee4;
  }
`;

const UserSocial = styled('a')`
  ${transition}
  font-family: monospace;
  color: ${({theme}) => theme.text};
  margin-right: 20px;
  &:hover {
    color: #1a98ff;
  }
`;

const Bio = styled('div')`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export {
  BoxVertoID,
  BoxAnonymous,
  AvatarS,
  AvatarAnonymousS,
  VertoIDinfo,
  DetailsS,
  Name,
  UserAddr,
  UserSocial,
  Bio
};