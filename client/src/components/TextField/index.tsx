import React from 'react';
import MUITextField, { TextFieldProps } from '@material-ui/core/TextField';
import useStyles from './styles';

const TextField = (props: Partial<TextFieldProps>) => {
  const classes = useStyles();
  return (
    <MUITextField {...props} className={classes.root} />
  )
}

TextField.defaultProps = {
  variant: "outlined",
}

export default TextField;
