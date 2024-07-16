import { Affix, Button, FileInput, Group, Modal, Space, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IEmployee } from '@/interfaces';

export default function AffixEmployees() {
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Group>
          <CreateEmployeeModal />
          <BulkUpsertEmployeesModal />
        </Group>
      </Affix>
    </>
  );
}

function CreateEmployeeModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      notifications.show({ message: 'User Created', color: 'green' });
      close();
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: JSON.stringify(error?.response?.data),
        color: 'red',
      });
    },
    mutationFn: (up_employee: Partial<IEmployee>) =>
      axios.post('employees', { employee: up_employee }),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      username: '',
    },
  });

  return (
    <>
      <Button variant="filled" color="green" onClick={open}>
        Add User
      </Button>
      <Modal opened={opened} onClose={close} title="Create User">
        <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
          <TextInput label="Name" description="" {...form.getInputProps('name')} />
          <TextInput label="Email" description="" {...form.getInputProps('username')} />
          <Space h="md" />
          <Button fullWidth type="submit">
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
}

function BulkUpsertEmployeesModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);

  function bulkUpsertEmployees() {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    axios.post('/employees/bulk_upsert', formData);
    notifications.show({ message: 'Bulk Upsert will start soon!', color: 'blue' });
    close();
  }

  return (
    <>
      <Button variant="filled" color="green" onClick={open}>
        Import Users
      </Button>
      <Modal opened={opened} onClose={close} title="Bulk Create Users!">
        <Stack>
          <FileInput
            value={file}
            onChange={setFile}
            label="Select a File"
            description="Upload a file with headers `User ID`, `Nombre`, `Email`"
            placeholder=""
          />
          <Button
            variant="filled"
            type="submit"
            color="green"
            onClick={() => bulkUpsertEmployees(file)}
          >
            Upload File
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
