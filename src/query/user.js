import gql from 'graphql-tag';

export const SIGNIN = gql`
  mutation signIn($input: signInInput!) {
    signIn(input: $input) {
      user {
        role
      }
      token
    }
  }
`;

export const GET_USER = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      role
    }
  }
`;
