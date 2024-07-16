import { Container, Loader, Text, TextInput } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IEmployee } from '@/interfaces';

const getEmployee = (employee_id: string | undefined) => axios.get(`/employees/${employee_id}`);

export default function EmployeeInfoPage() {
  const { employee_id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['employee', employee_id],
    queryFn: () => getEmployee(employee_id),
  });

  if (isLoading || isError) return <Loader />;

  const employee: IEmployee = data?.data;
  return (
    <Container size="xs">
      <Text>
        This is a simple employee page! with some data you need, may need, or may edit in the
        future, please check his ABSENCES tab in the left
      </Text>

      <TextInput value={employee.id} disabled label="ID" />
      <TextInput value={employee.name} disabled label="Name" />
      <TextInput value={employee.username} disabled label="Username / Email" />
      <TextInput value={employee.total_days} disabled label="Total Days of Absences" />
    </Container>
  );
}
