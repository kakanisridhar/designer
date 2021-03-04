import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'theme-ui';

import { Routes } from './config/enums';
import { AsideProvider } from './context/aside';
import { AuthProvider } from './context/auth';
import { AppDependencies } from './core/dependencies';
import LoginPage from './pages/login';
import RootPage from './pages/root';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

const App: React.FC<AppDependencies> = ({ ...dependencies }) => {
  return (
    <ApolloProvider client={dependencies.apolloClient}>
      <Router history={dependencies.history}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <AuthProvider dependencies={dependencies}>
            <AsideProvider>
              <AnimatePresence>
                <Switch>
                  <Route exact path={Routes.LOGIN} component={LoginPage} />
                  <Route path={Routes.ROOT} component={RootPage} />
                </Switch>
              </AnimatePresence>
              <ToastContainer />
            </AsideProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
