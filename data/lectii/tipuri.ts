export type VideoLectie = {
  numar: number;
  titlu: string;
  durata: string;
  descriere: string;
  idei: string[];
  exempluTitlu: string;
  exemplu: string;
};

export type ExercitiuLectie = {
  intrebare: string;
  variante: string[];
  corect: number;
  explicatie: string;
};

export type Lectie = {
  id: string;
  slug: string;
  modul: number;
  numarLectie: number;
  totalLectiiModul: number;
  clasa: string;
  profil: string;
  titlu: string;
  descriere: string;

  obiective: {
    icon: string;
    titlu: string;
    descriere: string;
  }[];

  videoLectii: VideoLectie[];

  fisaRapida: {
    titlu: string;
    continut: string[];
  };

  exercitii: ExercitiuLectie[];

  storageKeyFinalizata: string;
  storageKeyXp: string;

  urmatoareaLectie?: {
    titlu: string;
    href?: string;
  };
};