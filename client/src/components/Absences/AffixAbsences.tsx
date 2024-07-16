import { Affix, Button, FileInput, Group, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function bulkCreateAbsences(file: File | null): Promise<void | AxiosResponse> {
  if (!file) return Promise.resolve();

  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/absences/bulk_create', formData);
}

export default function AffixAbsences() {
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Group>
          <BulkCreateAbsencesModal />
        </Group>
      </Affix>
    </>
  );
}

function BulkCreateAbsencesModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onError: (err) => notifications.show({ message: err.message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['absences'] });
      notifications.show({ color: 'blue', message: 'Bulk Create will start soon!' });
      close();
    },
    mutationFn: (value: File | null) => bulkCreateAbsences(value),
  });

  return (
    <>
      <Button variant="filled" color="green" onClick={open}>
        Import Absences
      </Button>
      <Modal opened={opened} onClose={close} title="Bulk Create Users!">
        <Stack>
          <FileInput
            value={file}
            onChange={setFile}
            label="Select a File"
            description="Upload a file with headers `User ID`,`Lider`,`Fecha desde`,`Fecha hasta`,`Tipo`,`Motivo`,`Estado`"
            placeholder=""
          />
          <Button
            variant="filled"
            type="submit"
            color="green"
            onClick={() => mutation.mutate(file)}
          >
            Upload File
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
