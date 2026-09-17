import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");

const linieCheie = env
  .split(/\r?\n/)
  .find((linie) => linie.trim().startsWith("GEMINI_API_KEY="));

if (!linieCheie) {
  console.error("❌ Nu găsesc GEMINI_API_KEY în .env.local");
  process.exit(1);
}

const apiKey = linieCheie
  .slice("GEMINI_API_KEY=".length)
  .trim();

console.log("🔑 Cheia a fost găsită.");
console.log("🧪 Testăm Gemini Interactions API...");

const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/interactions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      model: "gemini-3.8-flash",
      input: "Răspunde exact cu textul: BAC MATE OK",
    }),
  }
);

const text = await response.text();

console.log("");
console.log("STATUS:", response.status);
console.log(text);