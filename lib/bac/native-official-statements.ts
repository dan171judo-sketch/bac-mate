import nativeJson from "@/data/bac/native-official-statements.json";
import { getOfficialVariantById, variantIdFromReleaseId } from "@/lib/bac/official-variant-catalog";

export type NativeOfficialStatement = {
  releaseId: string;
  variantId: string;
  profileCode: string;
  slotId: string;
  statement: string;
  subjectSha256: string;
  verified: true;
  verification: string;
};

type RawStatement = Partial<NativeOfficialStatement> & { verified?: boolean };
const AUTHORITATIVE = new Set(["verified-benchmark", "human-verified-official-pdf"]);
const rows = (nativeJson.statements as RawStatement[]).filter((row) => {
  if (row.verified !== true || !AUTHORITATIVE.has(row.verification ?? "")) return false;
  if (!row.releaseId || !row.variantId || !row.profileCode || !row.slotId || !row.statement || !row.subjectSha256) return false;
  const variantId = variantIdFromReleaseId(row.releaseId);
  const variant = variantId ? getOfficialVariantById(variantId) : null;
  return Boolean(variant && variant.id === row.variantId && variant.profileCode === row.profileCode && variant.subjectSha256 === row.subjectSha256);
});
const byKey = new Map(rows.map((row) => [`${row.releaseId}::${row.slotId}`, row as NativeOfficialStatement]));

export function getNativeOfficialStatement(releaseId: string, slotId: string): NativeOfficialStatement | null {
  return byKey.get(`${releaseId}::${slotId}`) ?? null;
}
