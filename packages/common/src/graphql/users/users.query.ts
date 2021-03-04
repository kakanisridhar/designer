import gql from 'graphql-tag';

export const GET_USERS_QUERY = gql`
  query getUsers(
    $skip: Int
    $take: Int
    $order: Order
    $sortBy: String
    $email: String
  ) {
    getUsers(
      skip: $skip
      take: $take
      order: $order
      sortBy: $sortBy
      email: $email
    ) {
      createdAt
      updatedAt
      id
      email
      roles
    }
  }
`;

export const GET_USERS_QUERY_RAW = GET_USERS_QUERY.loc.source.body;
