import { Avatar, Group, NavLink } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IEmployee } from '@/interfaces';

export default function ProfileShell() {
  const navigate = useNavigate();

  const user: IEmployee | null = JSON.parse(localStorage.getItem('user') as string);
  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  return (
    <Group mt="auto">
      <Avatar color="cyan" radius="xl">
        MK
      </Avatar>
      {user?.username}
      <NavLink
        label="Logout"
        onClick={() => {
          axios.get('/logout').then(() => {
            localStorage.removeItem('user');
            notifications.show({ message: 'Loggout' });
          });
          navigate('/login');
        }}
      />
    </Group>
  );
}
