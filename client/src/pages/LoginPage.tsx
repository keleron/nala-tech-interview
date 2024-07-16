import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/Contexts/UserProvider';

interface ILoginParams {
  username: string;
  password: string;
}

export default function LoginPage() {
  const form = useForm({ initialValues: { username: '', password: '' } });

  const { setUser } = useUser();
  const navigate = useNavigate();

  function handleSubmit(values: ILoginParams) {
    axios
      .post('/login', values)
      .then(({ data }) => {
        setUser(data);
        notifications.show({ color: 'green', message: 'Logged!' });
        navigate('/employees');
      })
      .catch(() => notifications.show({ color: 'red', message: 'Bad Credentials' }));
  }

  return (
    <Modal opened onClose={() => {}} title="Login!">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Username / Email"
          description="Your admin Username"
          placeholder="admin@nala.com"
          {...form.getInputProps('username')}
        />
        <TextInput label="Password" type="password" {...form.getInputProps('password')} />
        <Button mt="md" type="submit">
          Login
        </Button>
      </form>
    </Modal>
  );
}
