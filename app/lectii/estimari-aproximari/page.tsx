import LectieUniversala from "../../../components/LectieUniversala";
import { lectiaEstimariAproximari } from "../../../data/lectii/modul-1";

export default function Page() {
  return (
    <LectieUniversala
      lectie={lectiaEstimariAproximari}
    />
  );
}