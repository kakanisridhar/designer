import { ApolloLink } from 'apollo-link';

import { HttpHeaders } from '@nestjs-graphql-react/common';
import { StorageKey } from '../../config/enums';
import { ApolloMiddleware } from '../types';

const authMiddleware: ApolloMiddleware = ({ logger, session, storage }) =>
  new ApolloLink((operation, forward) => {
    const accessToken = storage.getItem(StorageKey.ACCESS_TOKEN);
    const refreshToken = session.getItem(StorageKey.REFRESH_TOKEN);

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        [HttpHeaders.AUTHORIZATION]: accessToken ? `Bearer ${accessToken}` : '',
        [HttpHeaders.X_REFRESH_TOKEN]: refreshToken,
      },
    }));

    return forward(operation).map((response) => {
      const context = operation.getContext();
      const {
        response: { headers },
      } = context;

      if (headers) {
        const refreshToken = headers.get(HttpHeaders.X_ACCESS_TOKEN);

        if (refreshToken) {
          logger.debug('refresh_token updated');

          session.setItem(HttpHeaders.X_REFRESH_TOKEN, refreshToken);
          storage.setItem(
            HttpHeaders.X_ACCESS_TOKEN,
            headers.get(HttpHeaders.X_ACCESS_TOKEN),
          );
        }
      }

      return response;
    });
  });

export default authMiddleware;
