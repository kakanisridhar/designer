import { render } from '@testing-library/react';
import React from 'react';
import { createMock } from 'ts-auto-mock';

import Header from './header';
import { AuthProviderDependencies, AuthProvider } from '../../context/auth';
import { AsideProvider } from 'context/aside';

describe('[components][layout] Header component', () => {
  const authDependencies = createMock<AuthProviderDependencies>();

  it('should render', () => {
    render(
      <AsideProvider>
        <AuthProvider dependencies={authDependencies}>
          <Header title="my test app" />
        </AuthProvider>
      </AsideProvider>,
    );
  });
});
