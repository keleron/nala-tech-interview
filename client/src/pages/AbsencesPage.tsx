import AbsenceTable from '@/components/Absences/AbsenceTable';
import AffixAbsences from '@/components/Absences/AffixAbsences';

export default function AbsencesPage() {
  return (
    <>
      <AffixAbsences />
      <AbsenceTable />
    </>
  );
}
