import { Affix, Button, Modal, NumberInput, Select, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';
import { DateInput } from '@mantine/dates';
import { IAbsence } from '@/interfaces';

export default function AffixAbsence() {
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <CreateAbsenceModal />
      </Affix>
    </>
  );
}

function CreateAbsenceModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { employee_id } = useParams();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employee_id,
      leader: '',
      start_date: null,
      end_date: null,
      absence_type: null,
      details: '',
      status: null,
    },
  });

  const mutation = useMutation({
    onError: (err) => notifications.show({ message: err.message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['absences'] });
      notifications.show({ color: 'green', message: 'Success' });
      close();
    },

    mutationFn: (values: Partial<IAbsence>) => axios.post('absences', values),
  });

  return (
    <>
      <Button variant="filled" color="green" onClick={open}>
        Create new Absence
      </Button>
      <Modal opened={opened} onClose={close} title="Bulk Create Users!">
        <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
          <NumberInput label="Employee" display="none" {...form.getInputProps('employee_id')} />
          <TextInput label="Leader" {...form.getInputProps('leader')} />
          <DateInput label="Start Date" {...form.getInputProps('start_date')} />
          <DateInput label="End Date" {...form.getInputProps('end_date')} />
          <Select
            label="Absence Type"
            data={['Incapacidad', 'Vacaciones']}
            {...form.getInputProps('absence_type')}
          />
          <Select
            label="Status"
            data={['Aprobado', 'Pendiente', 'Rechazado']}
            {...form.getInputProps('status')}
          />

          <TextInput label="Details" {...form.getInputProps('details')} />

          <Button mt="md" fullWidth type="submit">
            Crear
          </Button>
        </form>
      </Modal>
    </>
  );
}
