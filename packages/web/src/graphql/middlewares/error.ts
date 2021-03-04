import { onError } from 'apollo-link-error';

import { Errors } from '@nestjs-graphql-react/common';
import { StorageKey } from '../../config/enums';
import { ApolloMiddleware } from '../types';

const errorMiddleware: ApolloMiddleware = ({ logger, session, storage }) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, path }) => {
        switch (message) {
          case Errors.ACCESS_TOKEN_MISSING:
          case Errors.ACCESS_TOKEN_EXPIRED:
            logger.debug(`Error: ${message} ${path && `in ${path[0]}`}`);
            storage.removeItem(StorageKey.ACCESS_TOKEN);
            session.removeItem(StorageKey.REFRESH_TOKEN);
            break;
          default:
            logger.warn(`Error: ${message} ${path && `in ${path[0]}`}`);
            break;
        }
      });
    }

    if (networkError) logger.warn(`Network error: ${networkError}`);
  });

export default errorMiddleware;
