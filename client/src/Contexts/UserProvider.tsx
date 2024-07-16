import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { IEmployee } from '@/interfaces';

interface UserContextType {
  user: IEmployee | null;
  setUser: (user: IEmployee | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<IEmployee | null>({ key: 'user' });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
  return context;
};
