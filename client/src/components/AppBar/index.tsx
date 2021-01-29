import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import SvgIcon from '@material-ui/core/SvgIcon'; 
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

import Logo from 'components/Icons/ReactLogo';
import Link from 'components/Link';
import { remove } from 'utils/token';
import useStyles from './styles';

const Bar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const history = useHistory();
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    remove();
    history.push('/login')
  }

  return (
    <AppBar position="sticky">
        <Toolbar>
          <SvgIcon 
            fontSize="large"
          >
            <Logo />
          </SvgIcon>
          <Typography variant="h6" className={classes.title}>
              Welcome!
          </Typography>
          <div>
            <IconButton
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link color="textPrimary" to="/profile">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
  )
};

export default Bar;
