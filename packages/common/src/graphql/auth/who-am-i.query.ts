import gql from 'graphql-tag';

export const WHO_AM_I_QUERY = gql`
  query whoAmI {
    whoAmI {
      id
      email
      roles
    }
  }
`;

export const WHO_AM_I_QUERY_RAW = WHO_AM_I_QUERY.loc.source.body;
