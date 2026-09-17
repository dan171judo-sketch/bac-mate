import { notFound } from "next/navigation";
import LectieUniversala from "../../../components/LectieUniversala";
import { lectii } from "../../../data/lectii/index";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const lectie = lectii.find(
    (lectie) => lectie.slug === slug
  );

  if (!lectie) {
    notFound();
  }

  return <LectieUniversala lectie={lectie} />;
}