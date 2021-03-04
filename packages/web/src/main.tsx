import 'setimmediate';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import createLogger, { Loggers } from './config/logger';
import { AppDependencies } from './core/dependencies';
import configureApollo from './graphql/apollo';
import * as serviceWorker from './serviceWorker';

const dependencies: AppDependencies = {
  storage: localStorage,
  session: sessionStorage,
  history: createBrowserHistory(),
  apolloClient: configureApollo({
    storage: localStorage,
    session: sessionStorage,
    logger: createLogger(Loggers.GRAPHQL),
  }),
};

ReactDOM.render(
  <App {...dependencies} />,
  document.getElementById('react-app'),
);

serviceWorker.register();
