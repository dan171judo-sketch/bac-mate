export type NivelDificultate =
  | "fundament"
  | "standard-bac"
  | "avansat";

export type StatusVerificare =
  | "draft"
  | "verificare"
  | "verificat"
  | "publicabil";

export type SursaLectie = {
  tip:
    | "programa-oficiala"
    | "subiect-oficial"
    | "barem-oficial"
    | "manual"
    | "verificare-interna";

  titlu: string;
  an?: number;
  observatie?: string;
};

export type FormulaLectie = {
  id: string;
  nume: string;
  formula: string;
  explicatie: string;
  conditii?: string[];
  exempluScurt?: string;
};

export type DefinitieLectie = {
  termen: string;
  definitie: string;
  observatie?: string;
};

export type PasExemplu = {
  numar: number;
  titlu: string;
  continut: string;
};

export type ExempluRezolvat = {
  id: string;
  titlu: string;
  enunt: string;
  nivel: NivelDificultate;
  pasi: PasExemplu[];
  raspunsFinal: string;
  verificare?: string;
};

export type GresealaFrecventa = {
  greseala: string;
  deCeEsteGresit: string;
  cumOEviti: string;
};

export type ExercitiuContinutuLectie = {
  id: string;
  nivel: NivelDificultate;

  tip:
    | "alegere-multipla"
    | "raspuns-scurt"
    | "rezolvare-completa";

  enunt: string;
  variante?: string[];
  raspunsCorect: string;
  rezolvare: PasExemplu[];
  explicatieFinala: string;
  punctaj?: number;
  competenta?: string;
  gresealaFrecventa?: string;
};

export type SectiuneTeorie = {
  id: string;
  titlu: string;
  explicatie: string;
  ideiCheie: string[];
};

export type VideoLectieDetaliata = {
  id: string;
  numar: number;
  titlu: string;
  durataMinute: number;
  descriere: string;

  videoUrl?: string;

  scenariu: string[];

  ideiDeRetinut: string[];

  exemplu: {
    titlu: string;
    enunt: string;
    rezolvareScurta: string[];
    raspuns: string;
  };

  verificareRapida?: {
    intrebare: string;
    variante: string[];
    raspunsCorect: number;
    explicatie: string;
  };
};

export type RezumatLectie = {
  ideiDeRetinut: string[];
  formuleDeRetinut: string[];
  checklistElev: string[];
};

export type MetadataVerificare = {
  status: StatusVerificare;

  verificatMatematic: boolean;
  verificatPrograma: boolean;
  verificatExercitii: boolean;
  verificatLimbaRomana: boolean;

  ultimaVerificare?: string;
  observatii?: string[];
};

export type ContinutLectie = {
  id: string;
  slug: string;

  modul: number;
  numarLectie: number;

  clasa: string;
  profil: "M_mate-info";

  titlu: string;
  subtitlu: string;
  descriere: string;

  nivelPrincipal: NivelDificultate;

  durataEstimataMinute: number;

  prerechizite: string[];

  obiective: string[];

  termeniCheie: string[];

  videoLectii: VideoLectieDetaliata[];

  definitii: DefinitieLectie[];

  teorie: SectiuneTeorie[];

  formule: FormulaLectie[];

  exempleRezolvate: ExempluRezolvat[];

  greseliFrecvente: GresealaFrecventa[];

  exercitii: ExercitiuContinutuLectie[];

  rezumat: RezumatLectie;

  legaturaCuBac: {
    importanta: string;
    tipuriCerinte: string[];
    strategie: string[];
  };

  surse: SursaLectie[];

  verificare: MetadataVerificare;
};