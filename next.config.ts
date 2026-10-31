import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@napi-rs/canvas",
  ],

  outputFileTracingIncludes: {
    "/api/simulari/official-pdf": [
      "./data/bac/sources/**/*.pdf",
    ],

    "/api/simulari/[id]/finalizare": [
      "./data/bac/sources/**/*.pdf",
    ],
  },
};

export default nextConfig;
