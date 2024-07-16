import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { Router } from './Router';
import { theme } from './theme';
import { UserProvider } from './Contexts/UserProvider';

const queryClient = new QueryClient();
axios.defaults.baseURL = 'http://localhost:3000/api/v1/';
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <UserProvider>
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </UserProvider>
    </MantineProvider>
  );
}
