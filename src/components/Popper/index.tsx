import { ReactNode } from 'react';

interface PopperProps {
  className: string;
  children: ReactNode;
}

function Popper({ children, className }: PopperProps) {
  return <div className={className}>{children}</div>;
}

export default Popper;
