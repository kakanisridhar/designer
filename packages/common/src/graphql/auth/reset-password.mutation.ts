import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation($password: String!, $newPassword: String!) {
    resetPassword(password: $password, newPassword: $newPassword)
  }
`;

export const RESET_PASSWORD_MUTATION_RAW =
  RESET_PASSWORD_MUTATION.loc.source.body;
