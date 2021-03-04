import { useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { WHO_AM_I_QUERY } from '@nestjs-graphql-react/common';
import { Routes } from '../../config/enums';
import HomePage from './home';
import AboutPage from './about';
import Layout from '../../components/layout';

const RootPage: React.FC = () => {
  const { loading, error } = useQuery(WHO_AM_I_QUERY);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      history.replace(Routes.LOGIN);
      toast.warn('You need to authenticate before continue');
    }
  }, [error, history]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <Layout aside={true}>
      <Switch>
        <Route exact path={Routes.ROOT} component={HomePage} />
        <Route path={Routes.ABOUT} component={AboutPage} />
      </Switch>
    </Layout>
  );
};

export default RootPage;
