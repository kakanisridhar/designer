import { ApolloLink } from 'apollo-link';
import { ApolloMiddleware } from 'graphql/types';

const loggerMiddleware: ApolloMiddleware = ({ logger }) =>
  new ApolloLink((operation, forward) => {
    logger.info(
      `==> ${operation.operationName ? 'query ' : 'mutation '} ${
        operation.operationName
      }`,
      operation.variables,
    );

    return forward(operation).map((response) => {
      logger.debug(`<== `, response.data);

      return response;
    });
  });

export default loggerMiddleware;
