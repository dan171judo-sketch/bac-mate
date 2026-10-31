import catalogJson from "@/data/bac/official-variant-catalog.json";
import { normalizeBacProfile, type BacProfileCode } from "@/lib/simulari/blueprint";

export type OfficialVariant = {
  id: string;
  year: number;
  profileCode: BacProfileCode;
  session: string;
  variantToken: string;
  subjectPath: string;
  rubricPath: string;
  subjectSha256: string;
  rubricSha256: string;
  official: true;
};

const variants = (catalogJson.variants as OfficialVariant[]).filter((v) => v.official === true);

export function getOfficialVariants(profileCode: string): OfficialVariant[] {
  const normalized = normalizeBacProfile(profileCode);
  return variants.filter((v) => v.profileCode === normalized);
}

export function getOfficialVariantById(id: string): OfficialVariant | null {
  return variants.find((v) => v.id === id) ?? null;
}

export function officialReleaseId(variantId: string): string {
  return `official-pdf:${variantId}`;
}

export function variantIdFromReleaseId(releaseId: string | undefined): string | null {
  const prefix = "official-pdf:";
  return releaseId?.startsWith(prefix) ? releaseId.slice(prefix.length) : null;
}
