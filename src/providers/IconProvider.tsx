import { ReactNode } from 'react';
import '@/config/icons';

interface IconProviderProps {
  children: ReactNode;
}

export const IconProvider = ({ children }: IconProviderProps) => {
  return <>{children}</>;
};