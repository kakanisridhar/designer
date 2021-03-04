import gql from 'graphql-tag';

const { loc } = gql`
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

export const getUsersQuery = loc.source.body;
