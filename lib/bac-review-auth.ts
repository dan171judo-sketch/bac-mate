import crypto from "node:crypto";
import { cookies } from "next/headers";

export const BAC_REVIEW_COOKIE = "bac_review_admin";

function tokenFor(secret: string) {
  return crypto.createHash("sha256").update(`bac-mate-review:${secret}`).digest("hex");
}

export function configuredReviewSecret() {
  return process.env.BAC_REVIEW_ADMIN_SECRET?.trim() || null;
}

export function validReviewToken(token: string | undefined) {
  const secret = configuredReviewSecret();
  if (!secret || !token) return false;
  const expected = Buffer.from(tokenFor(secret));
  const actual = Buffer.from(token);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

export async function isBacReviewAuthorized() {
  const store = await cookies();
  return validReviewToken(store.get(BAC_REVIEW_COOKIE)?.value);
}

export function reviewTokenForConfiguredSecret() {
  const secret = configuredReviewSecret();
  return secret ? tokenFor(secret) : null;
}
