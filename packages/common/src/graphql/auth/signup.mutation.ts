import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
  mutation($email: Email!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export const SIGNUP_MUTATION_RAW = SIGNUP_MUTATION.loc.source.body;
