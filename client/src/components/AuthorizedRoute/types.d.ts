import { RouteProps } from 'react-router-dom';

interface IAuthorizedRouteProps extends RouteProps {
  component?: typeof React.ReactNode,
}

interface IAuthLocationState {
  from: string,
}
