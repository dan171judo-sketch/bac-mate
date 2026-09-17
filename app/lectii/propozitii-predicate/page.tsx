import LectieUniversala from "../../../components/LectieUniversala";
import { lectiaPropozitiiPredicate } from "../../../data/lectii/modul-1";

export default function Page() {
  return (
    <LectieUniversala
      lectie={lectiaPropozitiiPredicate}
    />
  );
}