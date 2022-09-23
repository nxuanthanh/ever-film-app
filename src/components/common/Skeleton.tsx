import { HTMLProps, ReactNode } from 'react';

interface SkeletonProps {
  className: string;
  children: ReactNode;
}

function Skeleton({ className, children, ...others }: HTMLProps<HTMLDivElement> | SkeletonProps) {
  return (
    <div className={`${className} animate-pulse bg-dark-lighten rounded-md `} {...others}>
      {children}
    </div>
  );
}

export default Skeleton;
