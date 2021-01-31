import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import AuthorizedRoute from 'components/AuthorizedRoute';

import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Tasks from 'pages/Tasks';
import Profile from 'pages/Profile';
import Users from 'pages/Users';
import theme from 'utils/theme';
import UserProvider from 'contexts/CurrentUser';
import { UserRole } from 'types/User.d'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <UserProvider>
              <AuthorizedRoute path="/profile" component={Profile} />
              <AuthorizedRoute path="/tasks" component={Tasks} />
              <AuthorizedRoute path="/users" component={Users} minRole={UserRole.MANAGER} />
              <AuthorizedRoute exact path="/" component={Tasks} />
            </UserProvider>
          </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;
