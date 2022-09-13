import React, { ReactNode } from 'react';

export interface MenuItemProps {
  label: string;
  icon?: ReactNode;
  to?: string;
  onClick: (event: MouseEvent) => void;
}

function MenuItem({ label, onClick }: MenuItemProps) {
  return <div>{label}</div>;
}

export default MenuItem;
