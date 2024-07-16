import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import ProfileShell from './ProfileShell';

export function EmployeeAppShell() {
  const [opened, { toggle }] = useDisclosure();
  const [selected, setSelected] = useState(0);
  const { employee_id } = useParams();

  const URLs = [
    { href: `/employees/${employee_id}`, label: 'Employee' },
    { href: `/employees/${employee_id}/absences`, label: 'Absences' },
  ];
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Button component={Link} to="/employees">
            Home
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {URLs.map((item, index) => (
          <NavLink
            to={item.href}
            active={index === selected}
            label={item.label}
            onClick={() => setSelected(index)}
            component={Link}
            key={item.href}
          />
        ))}
        <ProfileShell />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
