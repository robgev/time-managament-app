import React, { ChangeEvent, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import TextField from 'components/TextField';
import Button from 'components/Button';
import Layout from 'components/Layout';
import Link from 'components/Link';
import { register } from 'api/Auth';

import useStyles from './styles';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const classes = useStyles();

  const changeFunc = (setFunction: Function) => (e: ChangeEvent<HTMLInputElement>) => {
    setFunction(e.target.value);
  }

  const onSignupClick = async () => {
    const response = await register({ 
      username, 
      password,
      firstName,
      lastName,
     });
  }

  return (
    <Layout>
      <Paper className={classes.loginWrapper}>
        <Typography variant="h3" color="primary" gutterBottom>Sign Up</Typography>
        <TextField
          type="text"
          label="First Name"
          value={firstName}
          onChange={changeFunc(setFistName)}
        />
        <TextField
          type="text"
          label="Last Name"
          value={lastName}
          onChange={changeFunc(setLastName)}
        />
        <TextField
          type="username"
          label="Username"
          value={username}
          onChange={changeFunc(setUsername)}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={changeFunc(setPassword)}
        />
        <Button 
          color="primary" 
          onClick={onSignupClick}
          className={classes.loginButton}
        >
          Sign Up
        </Button>
        <Typography>
          Already have an account? {' '}
          <Link to="/login">Log In</Link>
        </Typography>
      </Paper>
    </Layout>
  )
}

export default Signup;
