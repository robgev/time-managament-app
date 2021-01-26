import React, { ChangeEvent, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useHistory, useLocation } from 'react-router-dom';

import TextField from 'components/TextField';
import Button from 'components/Button';
import Layout from 'components/Layout';
import Link from 'components/Link';
import { IAuthLocationState } from 'components/AuthorizedRoute/types';
import { login } from 'api/Auth';
import * as TokenManager from 'utils/token';

import useStyles from './styles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation<IAuthLocationState>();
  const classes = useStyles();

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onLoginClick = async () => {
    const response = await login({ username, password });
    if (response.accessToken) {
      TokenManager.set(response.accessToken)
      const { from } = location.state || { from: { pathname: '/' } };
      history.push(from);
    }
  }

  return (
    <Layout>
      <Paper className={classes.loginWrapper}>
        <Typography variant="h3" color="primary" gutterBottom>Log In</Typography>
        <TextField
          type="username"
          label="Username"
          value={username}
          onChange={onUsernameChange}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={onPassChange}
        />
        <Button 
          color="primary" 
          onClick={onLoginClick}
          className={classes.loginButton}
        >
          Log In
        </Button>
        <Typography>
          Don't have an account? {' '}
          <Link to="/register">Sign Up</Link>
        </Typography>
      </Paper>
    </Layout>
  )
}

export default Login;
