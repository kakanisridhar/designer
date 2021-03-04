import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { createMock } from 'ts-auto-mock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Aside from './aside';
import { AuthProvider, AuthProviderDependencies } from '../../context/auth';
import { AsideProvider } from '../../context/aside';
import theme from '../../styles/theme';

describe('[components][layout] Aside component', () => {
  const authDependencies = createMock<AuthProviderDependencies>();

  it('should render', () => {
    render(
      <Router history={createMemoryHistory()}>
        <ThemeProvider theme={theme}>
          <AsideProvider>
            <AuthProvider dependencies={authDependencies}>
              <Aside />
            </AuthProvider>
          </AsideProvider>
        </ThemeProvider>
      </Router>,
    );
  });
});
