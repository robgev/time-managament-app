import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ILinkProps } from './types';

const Link: FunctionComponent<ILinkProps> = ({ children, color, ...rest }) => {
  return (
    <RouterLink {...rest}>
      <Typography color={color} component="span">
        {children}
      </Typography>
    </RouterLink>
  );
};

Link.defaultProps = {
  color: 'primary'
}

export default Link;
