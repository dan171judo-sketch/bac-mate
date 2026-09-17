import LectieUniversala from "../../../components/LectieUniversala";
import { lectiaCuantificatori } from "../../../data/lectii";

export default function Page() {
  return (
    <LectieUniversala lectie={lectiaCuantificatori} />
  );
}