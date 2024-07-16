import React from 'react';
import AbsenceTable from '@/components/Absences/AbsenceTable';
import AffixAbsence from '@/components/Absences/AffixAbsence';

export default function EmployeePage() {
  return (
    <>
      <AffixAbsence />
      <AbsenceTable />
    </>
  );
}
