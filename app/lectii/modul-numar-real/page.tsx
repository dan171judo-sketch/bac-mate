import LectieUniversala from "../../../components/LectieUniversala";
import { lectiaModulNumarReal } from "../../../data/lectii/modul-1";

export default function Page() {
  return (
    <LectieUniversala
      lectie={lectiaModulNumarReal}
    />
  );
}