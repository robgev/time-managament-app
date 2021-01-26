import React from 'react';
import MUIButton, { ButtonProps } from '@material-ui/core/Button';

const Button = (props: Partial<ButtonProps>) => (
  <MUIButton {...props} />
)

Button.defaultProps = {
  variant: "outlined",
}

export default Button;
