import React from 'react';
import Layout from 'components/Layout';
import AppBar from 'components/AppBar';
import * as TasksManager from 'api/Tasks';

import useStyles from './styles';

const Tasks = () => {
  const classes = useStyles();

  return (
    <Layout>
      <AppBar />
    </Layout>
  )
}

export default Tasks;
