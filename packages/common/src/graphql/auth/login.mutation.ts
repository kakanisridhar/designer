import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN_MUTATION_RAW = LOGIN_MUTATION.loc.source.body;
