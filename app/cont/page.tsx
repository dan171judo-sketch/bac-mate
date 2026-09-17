"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function ContPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [loading, setLoading] = useState(false);

  async function creareCont() {
    const emailCurat = email.trim();

    if (!emailCurat || !parola) {
      setMesaj("❌ Completează emailul și parola.");
      return;
    }

    if (parola.length < 6) {
      setMesaj("❌ Parola trebuie să aibă minimum 6 caractere.");
      return;
    }

    setLoading(true);
    setMesaj("");

    const { error } = await supabase.auth.signUp({
      email: emailCurat,
      password: parola,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setMesaj(`❌ ${error.message}`);
    } else {
      setMesaj(
        "✅ Cont creat. Verifică emailul și confirmă contul pentru a continua."
      );
    }

    setLoading(false);
  }

  async function autentificare() {
    const emailCurat = email.trim();

    if (!emailCurat || !parola) {
      setMesaj("❌ Completează emailul și parola.");
      return;
    }

    setLoading(true);
    setMesaj("");

    const {
      data: autentificareData,
      error: autentificareError,
    } = await supabase.auth.signInWithPassword({
      email: emailCurat,
      password: parola,
    });

    if (autentificareError || !autentificareData.user) {
      setMesaj(
        `❌ ${
          autentificareError?.message ||
          "Nu am putut realiza autentificarea."
        }`
      );
      setLoading(false);
      return;
    }

    const user = autentificareData.user;

    const { data: profil, error: profilError } = await supabase
      .from("profiles")
      .select(
        "nume, profil_bac, evaluare_initiala_finalizata"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profilError) {
      setMesaj(
        `❌ Nu am putut verifica profilul: ${profilError.message}`
      );
      setLoading(false);
      return;
    }

    if (!profil?.nume) {
      router.push("/date-personale");
      router.refresh();
      return;
    }

    localStorage.setItem(
      "bac-mate-nume",
      profil.nume
    );

    if (!profil?.profil_bac) {
      router.push("/profil");
      router.refresh();
      return;
    }

    localStorage.setItem(
      "bac-mate-profil-cod",
      profil.profil_bac
    );

    if (!profil.evaluare_initiala_finalizata) {
      router.push("/evaluare");
      router.refresh();
      return;
    }

    localStorage.setItem(
      "bac-mate-evaluare-initiala-finalizata",
      "da"
    );

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07111f",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#0d1b2a",
          border: "1px solid #1f3a56",
          borderRadius: "20px",
          padding: "32px",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>
          Cont BAC MATE
        </h1>

        <p
          style={{
            color: "#a9bdd1",
            marginBottom: "28px",
          }}
        >
          Creează-ți contul sau autentifică-te pentru a-ți
          salva progresul.
        </p>

        <label
          style={{
            display: "block",
            marginBottom: "8px",
          }}
        >
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMesaj("");
          }}
          placeholder="exemplu@email.com"
          autoComplete="email"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #35516d",
            background: "#091522",
            color: "white",
            marginBottom: "18px",
            boxSizing: "border-box",
          }}
        />

        <label
          style={{
            display: "block",
            marginBottom: "8px",
          }}
        >
          Parolă
        </label>

        <input
          type="password"
          value={parola}
          onChange={(e) => {
            setParola(e.target.value);
            setMesaj("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              autentificare();
            }
          }}
          placeholder="Minimum 6 caractere"
          autoComplete="current-password"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #35516d",
            background: "#091522",
            color: "white",
            marginBottom: "22px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={creareCont}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "12px",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Se procesează..."
            : "Creează cont"}
        </button>

        <button
          onClick={autentificare}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #3b82f6",
            background: "transparent",
            color: "white",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Se procesează..."
            : "Autentificare"}
        </button>

        {mesaj && (
          <p
            style={{
              marginTop: "20px",
              lineHeight: "1.5",
            }}
          >
            {mesaj}
          </p>
        )}
      </div>
    </main>
  );
}