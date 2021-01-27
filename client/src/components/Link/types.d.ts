import { LinkProps } from 'react-router-dom';
interface ILinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  color?: TypographyTypeMap['color']
}
