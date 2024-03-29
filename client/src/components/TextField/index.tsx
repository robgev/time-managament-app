import React from 'react';
import clsx from 'clsx';
import MUITextField, { TextFieldProps } from '@material-ui/core/TextField';
import useStyles from './styles';

const TextField = (props: Partial<TextFieldProps>) => {
  const classes = useStyles();
  return (
    <MUITextField {...props} className={clsx(classes.root, props.className)} />
  )
}

TextField.defaultProps = {
  variant: "outlined",
}

export default TextField;
