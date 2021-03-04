import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { NodeEnv } from '@nestjs-graphql-react/common';
import authMiddleware from './middlewares/auth';
import errorMiddleware from './middlewares/error';
import loggerMiddleware from './middlewares/log';
import { ApolloMiddlewareDependencies } from './types';

const schemeMapper = {
  [NodeEnv.DEV]: 'http://',
  [NodeEnv.PROD]: 'http://',
};

const scheme = schemeMapper[process.env.NODE_ENV];

const httpLink = createHttpLink({
  uri: `${scheme}${process.env.HOST}:${process.env.PORT}/graphql`,
});

function configureApollo(dependencies: ApolloMiddlewareDependencies) {
  return new ApolloClient({
    link: from([
      authMiddleware(dependencies),
      errorMiddleware(dependencies),
      loggerMiddleware(dependencies),
      httpLink,
    ]),
    cache: new InMemoryCache(),
  });
}

export default configureApollo;
