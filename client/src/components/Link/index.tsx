import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

const Link: FunctionComponent<LinkProps> = ({ children, ...rest }) => {
  return (
    <RouterLink {...rest}>
      <Typography color="primary" component="span">
        {children}
      </Typography>
    </RouterLink>
  );
};

export default Link;
