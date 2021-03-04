import { render } from '@testing-library/react';
import React from 'react';
import { createMock } from 'ts-auto-mock';

import Layout from './';
import { AuthProvider, AuthProviderDependencies } from '../../context/auth';
import { AsideProvider } from '../../context/aside';

describe('[components][layout] Layout component', () => {
  const authDependencies = createMock<AuthProviderDependencies>();

  it('should render', () => {
    render(
      <AsideProvider>
        <AuthProvider dependencies={authDependencies}>
          <Layout />
        </AuthProvider>
      </AsideProvider>,
    );
  });
});
