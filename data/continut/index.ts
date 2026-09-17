import type {
  ContinutLectie,
} from "./tipuri";

import {
  continutVectoriInPlan,
} from "./lectii/m5-vectori-in-plan";

import {
  continutNumereReale,
} from "./lectii/numere-reale";

import {
  continutEstimariAproximari,
} from "./lectii/estimari-aproximari";

import {
  continutModulNumarReal,
} from "./lectii/modul-numar-real";

export type RezultatContentEngine = {
  continut: ContinutLectie | null;
  publicabil: boolean;
};

const registruContinut: Record<
  string,
  ContinutLectie
> = {
  [continutVectoriInPlan.slug]:
    continutVectoriInPlan,

  [continutNumereReale.slug]:
    continutNumereReale,

  [continutEstimariAproximari.slug]:
    continutEstimariAproximari,

  [continutModulNumarReal.slug]:
    continutModulNumarReal,
};

function estePublicabil(
  continut: ContinutLectie
): boolean {
  const verificare =
    continut.verificare;

  return (
    verificare.status ===
      "publicabil" &&
    verificare.verificatMatematic ===
      true &&
    verificare.verificatPrograma ===
      true &&
    verificare.verificatExercitii ===
      true &&
    verificare.verificatLimbaRomana ===
      true
  );
}

export function obtineContinutLectie(
  slug: string,
  modul?: number,
  numarLectie?: number
): RezultatContentEngine {
  const dupaSlug =
    registruContinut[slug];

  if (dupaSlug) {
    return {
      continut: dupaSlug,
      publicabil:
        estePublicabil(
          dupaSlug
        ),
    };
  }

  if (
    typeof modul === "number" &&
    typeof numarLectie === "number"
  ) {
    const dupaPozitie =
      Object.values(
        registruContinut
      ).find(
        (lectie) =>
          lectie.modul === modul &&
          lectie.numarLectie ===
            numarLectie
      );

    if (dupaPozitie) {
      return {
        continut:
          dupaPozitie,
        publicabil:
          estePublicabil(
            dupaPozitie
          ),
      };
    }
  }

  return {
    continut: null,
    publicabil: false,
  };
}

export function obtineToateLectiileCuContinut(): ContinutLectie[] {
  return Object.values(
    registruContinut
  );
}

export function existaContinutDetaliat(
  slug: string
): boolean {
  return Boolean(
    registruContinut[slug]
  );
}