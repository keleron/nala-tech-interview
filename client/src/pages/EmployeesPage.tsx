import { Button, Center, Group, Loader, Pagination, Table, Text, TextInput } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useSetState } from '@mantine/hooks';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IEmployee } from '@/interfaces';
import EditEmployeeModal from '@/components/Employees/EditEmployeeModal';
import AffixEmployees from '@/components/Employees/AffixEmployees';

export default function EmployeesPage() {
  return (
    <>
      <UserTable />
      <AffixEmployees />
    </>
  );
}

function getEmployees(params: Partial<IUserTableParams>) {
  return axios.get('/employees', { params }).then((res) => res.data);
}
interface IUserTableParams {
  page: number;
  'q[name_cont]': string;
  'q[email_cont]': string;
  'q[s]': string;
}

function UserTable() {
  const [params, setParams] = useSetState({ page: 1 } as Partial<IUserTableParams>);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['employees', JSON.stringify(params)],
    queryFn: () => getEmployees(params),
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: '10%' }}>ID</Table.Th>
          <Table.Th style={{ width: '30%' }}>
            <Group>
              <Text style={{ cursor: 'pointer' }} onClick={() => setParams({ 'q[s]': 'name' })}>
                Employee Name
              </Text>
              <TextInput
                autoFocus
                key="q[name_cont]"
                onChange={({ currentTarget: { value } }) =>
                  setParams({ 'q[name_cont]': value, page: 1 })
                }
                value={params['q[name_cont]']}
              />
            </Group>
          </Table.Th>
          <Table.Th
            style={{ width: '30%', cursor: 'pointer' }}
            onClick={() => setParams({ 'q[s]': 'email' })}
          >
            Email
          </Table.Th>
          <Table.Th style={{ width: '30%' }}></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <UserTableBody data={data} isError={isError} isLoading={isLoading} />
      </Table.Tbody>
      <Table.Caption>
        <Center>
          <Pagination
            total={data?.meta?.total_pages}
            onChange={(page) => setParams({ page })}
            value={params.page}
          />
        </Center>
      </Table.Caption>
    </Table>
  );
}

function UserTableBody({ data, isLoading, isError }) {
  if (isLoading || isError) return <Loader color="blue" />;

  const { employees }: { employees: IEmployee[] } = data;
  if (!employees) return <></>;

  const rows = employees.map((employee) => (
    <Table.Tr key={employee.id}>
      <Table.Td>{employee.id}</Table.Td>
      <Table.Td>{employee.name}</Table.Td>
      <Table.Td>{employee.username}</Table.Td>
      <Table.Td>
        <Group>
          <EditEmployeeModal employee={employee} />
          <Button component={Link} to={`/employees/${employee.id}`}>
            See User
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return rows;
}
