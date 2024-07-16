import { Button, Modal, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IEmployee } from '@/interfaces';

export default function EditEmployeeModal({ employee }: { employee: Partial<IEmployee> }) {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    mutationFn: (up_employee: Partial<IEmployee>) =>
      axios.put(`/employees/${up_employee.id}`, { employee: up_employee }),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: employee.id,
      name: employee.name,
      username: employee.username,
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title={`Employee - ${employee.name}`}>
        <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
          <TextInput label="Name" description="" {...form.getInputProps('name')} />
          <TextInput label="Email" description="" {...form.getInputProps('username')} />
          <Space h="md" />
          <Button fullWidth type="submit">
            Save
          </Button>
        </form>
      </Modal>
      <Button onClick={open}>Edit User</Button>
    </>
  );
}
