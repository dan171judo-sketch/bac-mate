"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function TestSupabasePage() {
  const [mesaj, setMesaj] = useState("Verific conexiunea...");

  useEffect(() => {
    async function verifica() {
      try {
        const supabase = createClient();

        const { error } = await supabase.auth.getSession();

        if (error) {
          setMesaj(`❌ Eroare Supabase: ${error.message}`);
          return;
        }

        setMesaj("✅ BAC MATE este conectat la Supabase!");
      } catch (error) {
        if (error instanceof Error) {
          setMesaj(`❌ Eroare: ${error.message}`);
        } else {
          setMesaj("❌ A apărut o eroare necunoscută.");
        }
      }
    }

    verifica();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#07111f",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>{mesaj}</h1>
    </main>
  );
}