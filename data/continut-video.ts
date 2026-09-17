/*
  BAC MATE
  Registru central pentru conținutul video generat.

  Scop:
  - LectieUniversala nu va avea nevoie de 219 importuri manuale.
  - Conținutul se caută după modul + numărul lecției.
  - Lecțiile încă negenerate sunt tratate normal.
  - Publicarea/verificarea umană rămân separate.
*/

export type CadruVideoGenerat = {
  numar: number;
  vizual: string;
  naratiune: string;
};

export type ExempluVideoGenerat = {
  titlu: string;
  enunt: string;
  rezolvare: string[];
  raspuns: string;
};

export type VerificareRapidaVideo = {
  intrebare: string;
  variante: string[];
  raspunsCorect: number;
  explicatie: string;
};

export type VideoGenerat = {
  id: string;
  numar: number;
  rol: string;
  titlu: string;
  durataTintaMinute: number;
  status: string;

  verificare?: {
    matematic?: boolean;
    programa?: boolean;
    limbaRomana?: boolean;
    exemplu?: boolean;
    audio?: boolean;
    video?: boolean;
  };

  scenariu: string[];
  cadre: CadruVideoGenerat[];
  ideiDeRetinut: string[];
  formule: string[];

  exemplu: ExempluVideoGenerat | null;

  verificareRapida:
    | VerificareRapidaVideo
    | null;

  media?: {
    videoUrl?: string;
    audioUrl?: string;
    subtitrareUrl?: string;
    thumbnailUrl?: string;
  };

  metadata?: Record<
    string,
    unknown
  >;
};

export type ContinutVideoLectie = {
  versiuneSchema: number;

  id: string;
  modul: number;
  numarLectie: number;
  titlu: string;

  slugContinut?: string;
  status: string;

  standardCalitate?: Record<
    string,
    unknown
  >;

  obiectivGeneral?: string;

  videoLectii: VideoGenerat[];

  controlCalitate?: {
    continutGenerat?: boolean;
    verificatAutomat?: boolean;
    verificatMatematic?: boolean;
    verificatPrograma?: boolean;
    verificatManual?: boolean;
    gataPentruRandare?: boolean;
    gataPentruPublicare?: boolean;
  };

  generareAI?: Record<
    string,
    unknown
  >;
};

/*
  ---------------------------------------------------------
  Încărcare automată
  ---------------------------------------------------------

  Next/Webpack/Turbopack nu ne permite să construim pur și
  simplu un import JSON dintr-un string arbitrar în browser.

  De aceea folosim require.context pentru a indexa toate
  fișierele JSON aflate în data/continut-video/modul-*.

  Dacă mediul nu oferă require.context, returnăm o listă
  goală în loc să stricăm aplicația.
*/

type RequireContext = {
  keys: () => string[];

  (
    id: string
  ):
    | ContinutVideoLectie
    | {
        default:
          ContinutVideoLectie;
      };
};

type RequireCuContext = {
  context?: (
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ) => RequireContext;
};

let cache:
  | ContinutVideoLectie[]
  | null = null;

function incarcaToateLectiile():
  ContinutVideoLectie[] {
  if (cache) {
    return cache;
  }

  const rezultate:
    ContinutVideoLectie[] = [];

  try {
    const requireCuContext =
      require as unknown as RequireCuContext;

    if (
      typeof requireCuContext.context !==
      "function"
    ) {
      cache = [];

      return cache;
    }

    const context =
      requireCuContext.context(
        "./continut-video",
        true,
        /^\.\/modul-\d+\/lectia-\d+\.json$/
      );

    for (
      const cale of context.keys()
    ) {
      try {
        const modul =
          context(cale);

        const lectie =
          "default" in modul
            ? modul.default
            : modul;

        if (
          lectie &&
          typeof lectie ===
            "object" &&
          typeof lectie.modul ===
            "number" &&
          typeof lectie.numarLectie ===
            "number" &&
          Array.isArray(
            lectie.videoLectii
          )
        ) {
          rezultate.push(
            lectie
          );
        }
      } catch {
        /*
          Un JSON problematic nu trebuie
          să blocheze toate celelalte lecții.
        */
      }
    }
  } catch {
    /*
      Dacă încărcarea automată nu este
      disponibilă, aplicația continuă să
      funcționeze fără conținutul generat.
    */
  }

  rezultate.sort(
    (a, b) =>
      a.modul - b.modul ||
      a.numarLectie -
        b.numarLectie
  );

  cache = rezultate;

  return rezultate;
}

/*
  Funcția principală pe care o va folosi
  LectieUniversala.
*/

export function obtineContinutVideo(
  modul: number,
  numarLectie: number
):
  | ContinutVideoLectie
  | null {
  const lectii =
    incarcaToateLectiile();

  return (
    lectii.find(
      (lectie) =>
        lectie.modul === modul &&
        lectie.numarLectie ===
          numarLectie
    ) ?? null
  );
}

/*
  Util pentru verificări și pentru
  viitorul panou de administrare.
*/

export function obtineToateLectiileVideo():
  ContinutVideoLectie[] {
  return [
    ...incarcaToateLectiile(),
  ];
}

export function numaraLectiiVideoGenerate():
  number {
  return incarcaToateLectiile()
    .filter(
      (lectie) =>
        lectie.videoLectii
          .length === 4
    )
    .length;
}

export function areContinutVideoComplet(
  modul: number,
  numarLectie: number
): boolean {
  const continut =
    obtineContinutVideo(
      modul,
      numarLectie
    );

  return Boolean(
    continut &&
      continut.videoLectii
        .length === 4
  );
}