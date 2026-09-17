export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Bara de navigare */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
            B
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight">BAC MATE</p>
            <p className="text-xs text-slate-400">Profesorul tău pentru Bac</p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#cum-functioneaza" className="text-sm text-slate-300 hover:text-white">
            Cum funcționează
          </a>

          <a href="#functionalitati" className="text-sm text-slate-300 hover:text-white">
            Funcționalități
          </a>

          <button className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold hover:bg-slate-800">
            Autentificare
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Pregătire inteligentă pentru Bacalaureat
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            De la
            <span className="text-blue-500"> „nu înțeleg nimic” </span>
            la nota pe care ți-o dorești la Bac.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            BAC MATE îți explică matematica pas cu pas, îți descoperă punctele
            slabe și îți construiește un plan personalizat de învățare.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
  href="/evaluare"
  className="rounded-xl bg-blue-600 px-7 py-4 text-center font-semibold transition hover:bg-blue-500"
>
  Începe evaluarea gratuită
</a>

            <button className="rounded-xl border border-slate-700 px-7 py-4 font-semibold text-slate-200 transition hover:bg-slate-800">
              Vezi cum funcționează
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-400">
            <span>✓ Fără card</span>
            <span>✓ Explicații pas cu pas</span>
            <span>✓ Progres personalizat</span>
          </div>
        </div>

        {/* Card demonstrativ */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Bun venit înapoi</p>
              <h2 className="mt-1 text-2xl font-bold">Pregătirea ta pentru Bac</h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-xl">
              🎯
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800 p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Progres general</p>
              <p className="font-bold text-blue-400">37%</p>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-[37%] rounded-full bg-blue-500" />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Continuă. Mai ai 3 lecții în planul de astăzi.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Nota estimată</p>
              <p className="mt-2 text-3xl font-bold">7.85</p>
              <p className="mt-2 text-sm text-green-400">↑ +0.45 luna aceasta</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Seria de învățare</p>
              <p className="mt-2 text-3xl font-bold">8 zile</p>
              <p className="mt-2 text-sm text-orange-300">🔥 Continuă seria</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <p className="text-sm font-semibold text-blue-300">
              Recomandarea BAC MATE
            </p>

            <p className="mt-2 font-semibold">
              Recapitulează funcțiile de gradul al II-lea
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Ai greșit 3 exerciții din această categorie. O sesiune de 15 minute
              te poate ajuta să consolidezi capitolul.
            </p>
          </div>
        </div>
      </section>

      {/* Cum funcționează */}
      <section
        id="cum-functioneaza"
        className="border-t border-slate-800 bg-slate-900/50 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold text-blue-400">Simplu și personalizat</p>

            <h2 className="mt-3 text-4xl font-bold">
              BAC MATE învață cum înveți tu.
            </h2>

            <p className="mt-5 text-lg text-slate-400">
              Nu primești doar lecții. Primești un traseu construit în funcție
              de nivelul, greșelile și obiectivul tău.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
              <div className="text-3xl">🧠</div>
              <h3 className="mt-5 text-xl font-bold">1. Te evaluăm</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Un test inițial identifică ce știi, unde ai goluri și ce trebuie
                să înveți mai întâi.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
              <div className="text-3xl">📚</div>
              <h3 className="mt-5 text-xl font-bold">2. Înveți pas cu pas</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Lecții scurte, exemple clare și exerciții adaptate nivelului
                tău.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
              <div className="text-3xl">📈</div>
              <h3 className="mt-5 text-xl font-bold">3. Îți urmărim progresul</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Vezi ce ai îmbunătățit, ce trebuie repetat și cum evoluează nota
                estimată.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcționalități */}
      <section id="functionalitati" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold">
            Tot ce ai nevoie pentru pregătirea la Bac
          </h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["💬", "Profesor AI", "Cere explicații diferite până când înțelegi."],
              ["✍️", "Exerciții interactive", "Rezolvă pas cu pas și primește feedback."],
              ["📝", "Simulări Bac", "Teste cronometrate și evaluarea rezultatului."],
              ["🎯", "Plan personalizat", "Știi în fiecare zi exact ce ai de făcut."],
              ["⚠️", "Caietul greșelilor", "BAC MATE ține minte unde greșești."],
              ["📊", "Analiză progres", "Vezi evoluția pe capitole și competențe."],
              ["🔁", "Recapitulare inteligentă", "Repetă materia exact când ai nevoie."],
              ["🏆", "Obiectiv de notă", "Planul se adaptează notei pe care o urmărești."],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="text-3xl">{icon}</div>
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-8 py-14 text-center">
          <h2 className="text-4xl font-bold">
            Începe pregătirea pentru Bac mai inteligent.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Fă evaluarea inițială și află care sunt capitolele pe care trebuie
            să le îmbunătățești.
          </p>

          <a
  href="/evaluare"
  className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50"
>
  Începe gratuit
</a>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        BAC MATE • Platformă educațională pentru pregătirea Bacalaureatului
      </footer>
    </main>
  );
}