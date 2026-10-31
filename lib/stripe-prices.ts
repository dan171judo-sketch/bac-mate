export const STRIPE_PRICES = {
  saptamanal: "price_1UUO2ID6exw6QAtPuAS91zOT",
  lunar: "price_1UUO4JD6exw6QAtPvSEM4Mui",
  "6-luni": "price_1UUO4uD6exw6QAtPzCdAPZ7B",
  anual: "price_1UUO5MD6exw6QAtPlE1tbPZ9",
} as const;

export type StripePlan = keyof typeof STRIPE_PRICES;
