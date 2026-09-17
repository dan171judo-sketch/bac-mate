import LectieUniversala from "../../../components/LectieUniversala";
import { lectiaIntervaleNumereReale } from "../../../data/lectii/modul-1";

export default function Page() {
  return (
    <LectieUniversala
      lectie={lectiaIntervaleNumereReale}
    />
  );
}