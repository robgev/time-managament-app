import React, { useContext, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper'
import TextField from 'components/TextField';
import AppBar from 'components/AppBar';
import Button from 'components/Button';
import { userStore } from 'contexts/Users';
import { setHours } from 'api/Users';

// import useStyles from './styles';

const Tasks = () => {
  // const classes = useStyles();
  const {
    role = '',
    lastName = '', 
    username = '', 
    firstName = '',
    preferredWorkingHoursPerDay = '', 
  } = useContext<any>(userStore);
  const [hours, _setHours] = useState('');

  useEffect(() => {
    _setHours(preferredWorkingHoursPerDay)
  }, [preferredWorkingHoursPerDay])

  const onHourChange = (e:any) => {
    _setHours(e.target.value);
  };

  const onSaveClick = async () => {
    const parsedHours = parseInt(hours, 10);
    const { response } = await setHours(parsedHours);
    if (!response) {
      _setHours(preferredWorkingHoursPerDay)
    }
  }

  const roles = ['User', 'User Manager', 'Admin'];
  return (
    <>
      <AppBar />
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
        marginTop: 50,
      }}>
        <Paper style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column',
          padding: '25px',
        }}>
        <TextField
          disabled
          type="text"
          label="Username"
          value={username}
        />
        <TextField
          disabled
          type="text"
          label="User Role"
          value={role ? roles[role] : ''}
        />
        <TextField 
          disabled
          type="text"
          label="First Name"
          value={firstName}
        />
        <TextField 
          disabled
          type="text"
          label="Last Name"
          value={lastName}
        />
        <TextField 
          type="number"
          value={hours}
          onChange={onHourChange}
          label="Preferred Working Hours/Day"
        />
        <Button
          color="primary"
          onClick={onSaveClick}
        >
          Save
        </Button>
        </Paper>
      </div>
    </>
  )
}

export default Tasks;
