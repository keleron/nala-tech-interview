import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { BasicAppShell } from './components/BasicAppShell/BasicAppShell';
import EmployeesPage from './pages/EmployeesPage';
import AbsencesPage from './pages/AbsencesPage';
import { EmployeeAppShell } from './components/BasicAppShell/EmployeeAppShell';
import EmployeePage from './pages/EmployeePage';
import LoginPage from './pages/LoginPage';
import EmployeeInfoPage from './pages/EmployeeInfoPage';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <BasicAppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'employees', element: <EmployeesPage /> },
      { path: 'absences', element: <AbsencesPage /> },
    ],
  },
  {
    path: 'employees',
    element: <EmployeeAppShell />,
    children: [
      {
        path: ':employee_id',
        element: <EmployeeInfoPage />,
      },
      {
        path: ':employee_id/absences',
        element: <EmployeePage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
