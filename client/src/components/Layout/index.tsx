import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import useStyles from './styles';

const Container: FunctionComponent<ILayoutProps> = ({ 
  className, 
  ...rest
}) => {
  const classes = useStyles();
  return (
    <div 
      className={clsx(classes.root, className)} 
      {...rest} 
    />
  )
}

export default Container;
