import { Center, Loader, Pagination, Select, Stack, Table } from '@mantine/core';
import { DatePickerInput, DatesRangeValue, DateValue } from '@mantine/dates';
import { useSetState } from '@mantine/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IAbsence, IStatus } from '@/interfaces';

interface IAbsenceTableParams {
  'q[start_date_gteq]': DateValue;
  'q[start_date_lteq]': DateValue;
  'q[absence_type_eq]': 'Vacaciones' | 'Incapacidad';
  'q[status_eq]': 'Rechazado' | 'Pendiente' | 'Aprobado';
  'q[employee_id_eq]': number;
  page: number;
}

function getAbsences(params: Partial<IAbsenceTableParams>) {
  return axios.get('/absences', { params }).then((res) => res.data);
}

export default function AbsenceTable() {
  const { employee_id } = useParams();
  const [filters, setFilters] = useSetState({
    page: 1,
    'q[employee_id_eq]': employee_id,
  } as Partial<IAbsenceTableParams>);

  const handleDateChange = (dates: DatesRangeValue) => {
    const [start, end] = dates;
    setFilters({ 'q[start_date_gteq]': start, 'q[start_date_lteq]': end, page: 1 });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['absences', JSON.stringify(filters)],
    queryFn: () => getAbsences(filters),
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: '10%' }}>Employee ID</Table.Th>
          <Table.Th style={{ width: '20%' }}>
            Start Date
            <DatePickerInput
              clearable
              type="range"
              label="Pick dates range"
              placeholder="Pick dates range"
              value={[filters['q[start_date_gteq]'], filters['q[start_date_lteq]']]}
              onChange={handleDateChange}
            />
          </Table.Th>
          <Table.Th style={{ width: '10%' }}>End Date</Table.Th>
          <Table.Th style={{ width: '20%' }}>
            <Stack>
              Type
              <Select
                clearable
                data={['Incapacidad', 'Vacaciones']}
                value={filters['q[absence_type_eq]']}
                onChange={(absence_type) =>
                  setFilters({ 'q[absence_type_eq]': absence_type, page: 1 })
                }
              />
            </Stack>
          </Table.Th>
          <Table.Th style={{ width: '20%' }}>Details</Table.Th>
          <Table.Th style={{ width: '20%' }}>
            <Stack>
              Status
              <Select
                clearable
                data={['Aprobado', 'Pendiente', 'Rechazado']}
                value={filters['q[status_eq]']}
                onChange={(status) => setFilters({ 'q[status_eq]': status, page: 1 })}
              />
            </Stack>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <AbsenceTableBody data={data} isError={isError} isLoading={isLoading} />
      </Table.Tbody>
      <Table.Caption>
        <Center>
          <Pagination
            total={data?.meta?.total_pages}
            onChange={(value) => setFilters({ page: value })}
            value={filters.page}
          />
        </Center>
      </Table.Caption>
    </Table>
  );
}

function AbsenceTableBody({ data, isLoading, isError }) {
  if (isLoading || isError) return <Loader color="blue" />;
  const { absences }: { absences: IAbsence[] } = data;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['absences'] }),
    mutationFn: ({ id, status }: { id: number; status: IStatus }) =>
      axios.put(`absences/${id}`, { status }),
  });

  const rows = absences.map((absence) => (
    <Table.Tr key={absence.url}>
      <Table.Td>{absence.employee_id}</Table.Td>
      <Table.Td>{absence.start_date}</Table.Td>
      <Table.Td>{absence.end_date}</Table.Td>
      <Table.Td>{absence.absence_type}</Table.Td>
      <Table.Td>{absence.details}</Table.Td>
      <Table.Td>
        <Select
          data={['Aprobado', 'Pendiente', 'Rechazado']}
          defaultValue={absence.status}
          onChange={(value) => mutation.mutate({ id: absence.id, status: value as IStatus })}
        />
      </Table.Td>
    </Table.Tr>
  ));
  return rows;
}
