import { Logger } from 'ulog';
import { ApolloLink } from 'apollo-link';

export interface ApolloMiddlewareDependencies {
  storage: Storage;
  session: Storage;
  logger: Logger;
}

export type ApolloMiddleware = (
  dep: ApolloMiddlewareDependencies,
) => ApolloLink;
