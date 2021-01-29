import { RouteProps } from 'react-router-dom';
import { UserRole } from 'types/User';

interface IAuthorizedRouteProps extends RouteProps {
  component?: typeof React.ReactNode,
  minRole?: UserRole,
}

interface IAuthLocationState {
  from: string,
}
