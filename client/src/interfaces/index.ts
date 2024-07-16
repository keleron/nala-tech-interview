export interface IEmployee {
  id: number;
  username: string;
  name: string;
  total_days: number;
  url: string;
  absences: string;
}

export interface IAbsence {
  id: number;
  employee_id: number;
  leader: string;
  start_date: string;
  end_date: string;
  absence_type: IAbsenceType;
  details: string;
  status: IStatus;
  days: number;
  url: string;
}

export interface IMeta {
  current_page: number;
  total_pages: number;
}

export enum IAbsenceType {
  Incapacidad = 'Incapacidad',
  Vacaciones = 'Vacaciones',
}

export enum IStatus {
  Aprobado = 'Aprobado',
  Pendiente = 'Pendiente',
  Rechazado = 'Rechazado',
}
