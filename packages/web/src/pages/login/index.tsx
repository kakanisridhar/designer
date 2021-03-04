/** @jsx jsx */
import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Box, Flex, Spinner, jsx } from 'theme-ui';

import { LOGIN_MUTATION, WHO_AM_I_QUERY } from '@nestjs-graphql-react/common';
import { AuthActionType, useAuth } from '../../context/auth';
import { Routes } from '../../config/enums';
import LoginForm from './components/login-form';
import AnimatedPage from '../../components/layout/animatedPage';

const LoginPage: React.FC = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);
  const whoAmIResult = useQuery(WHO_AM_I_QUERY);
  const { dispatch } = useAuth();
  const history = useHistory();

  // Handle login
  useEffect(() => {
    if (!error && data) {
      dispatch({
        type: AuthActionType.LOGIN,
        payload: {
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
        },
      });
      history.replace(Routes.ROOT);
    }

    if (error) toast.error('Something fail while trying to login');
  }, [data, error, history, dispatch]);

  // Check if user is already logged in
  useEffect(() => {
    if (whoAmIResult.data && whoAmIResult.data.whoAmI)
      history.replace(Routes.ROOT);
  }, [whoAmIResult.data, history]);

  return (
    <AnimatedPage
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        mx: 'auto',
      }}
    >
      <Box
        bg="primary"
        sx={{
          height: '2em',
        }}
      />
      <Flex
        sx={{
          alignSelf: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {whoAmIResult.loading && <Spinner size={300} />}
        {!whoAmIResult.loading && (
          <LoginForm onSubmit={login} loading={loading} />
        )}
      </Flex>
    </AnimatedPage>
  );
};

export default LoginPage;
