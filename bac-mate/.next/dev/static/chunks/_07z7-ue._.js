(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/programa/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProgramaPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/lectii/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const moduleMateInfo = [
    {
        id: "numere-logica",
        clasa: "Clasa a IX-a",
        icon: "🔢",
        titlu: "Numere reale, logică și mulțimi",
        descriere: "Fundamentele algebrice și logice necesare pentru rezolvarea problemelor de Bac.",
        lectii: [
            "Mulțimi de numere și operații cu numere reale",
            "Estimări și aproximări",
            "Modulul unui număr real",
            "Intervale de numere reale",
            "Propoziții și predicate",
            "Cuantificatori",
            "Negație, conjuncție, disjuncție și implicație",
            "Operații cu mulțimi",
            "Inducția matematică",
            "Demonstrații și raționamente logice"
        ]
    },
    {
        id: "siruri-functii",
        clasa: "Clasa a IX-a",
        icon: "📈",
        titlu: "Șiruri și funcții",
        descriere: "De la citirea unui grafic până la proprietățile fundamentale ale funcțiilor.",
        lectii: [
            "Reper cartezian și produs cartezian",
            "Noțiunea de funcție",
            "Domeniu, codomeniu și imagine",
            "Graficul unei funcții",
            "Lecturi grafice",
            "Egalitatea a două funcții",
            "Restricția unei funcții",
            "Monotonie și mărginire",
            "Paritate și imparitate",
            "Periodicitate",
            "Compunerea funcțiilor",
            "Șiruri de numere reale",
            "Progresii aritmetice",
            "Progresii geometrice"
        ]
    },
    {
        id: "gradul-intai",
        clasa: "Clasa a IX-a",
        icon: "📏",
        titlu: "Funcția și ecuațiile de gradul I",
        descriere: "Modele liniare, ecuații, inecuații și interpretarea lor grafică.",
        lectii: [
            "Funcția f(x) = ax + b",
            "Graficul funcției de gradul I",
            "Monotonia funcției de gradul I",
            "Semnul funcției de gradul I",
            "Ecuații de gradul I",
            "Inecuații de gradul I",
            "Sisteme de ecuații liniare",
            "Interpretarea geometrică a sistemelor",
            "Probleme modelate prin funcții liniare"
        ]
    },
    {
        id: "gradul-doi",
        clasa: "Clasa a IX-a",
        icon: "〽️",
        titlu: "Funcția și ecuația de gradul al II-lea",
        descriere: "Ecuații de gradul II, parabole, semn și probleme clasice de Bac.",
        lectii: [
            "Ecuația de gradul al II-lea",
            "Discriminantul și numărul de soluții",
            "Formulele rădăcinilor",
            "Relațiile lui Viète",
            "Funcția de gradul al II-lea",
            "Graficul parabolei",
            "Vârful parabolei",
            "Axa de simetrie",
            "Intersecția parabolei cu axele",
            "Semnul funcției de gradul al II-lea",
            "Inecuații de gradul al II-lea",
            "Poziția relativă dreaptă-parabolă",
            "Probleme cu parametru"
        ]
    },
    {
        id: "vectori-trigonometrie",
        clasa: "Clasa a IX-a",
        icon: "📐",
        titlu: "Vectori, trigonometrie și geometrie",
        descriere: "Instrumentele geometrice cerute în programa M_mate-info.",
        lectii: [
            "Vectori în plan",
            "Adunarea și scăderea vectorilor",
            "Înmulțirea unui vector cu un scalar",
            "Coliniaritatea vectorilor",
            "Descompunerea vectorilor",
            "Coordonate și vectori",
            "Sinus, cosinus, tangentă și cotangentă",
            "Valori trigonometrice uzuale",
            "Reducerea la primul cadran",
            "Formule trigonometrice",
            "Formule de adunare și scădere",
            "Formule pentru unghi dublu",
            "Transformarea sumei în produs",
            "Teorema sinusurilor",
            "Teorema cosinusului",
            "Lungimi și unghiuri în triunghi",
            "Aria triunghiului",
            "Cercul înscris și cercul circumscris"
        ]
    },
    {
        id: "puteri-radicali-log",
        clasa: "Clasa a X-a",
        icon: "√",
        titlu: "Puteri, radicali și logaritmi",
        descriere: "Calcul algebric avansat folosit în multe exerciții de Bac.",
        lectii: [
            "Puteri cu exponent întreg",
            "Puteri cu exponent rațional",
            "Puteri cu exponent real",
            "Radical de ordin n",
            "Proprietățile radicalilor",
            "Operații cu radicali",
            "Logaritmul unui număr pozitiv",
            "Proprietățile logaritmilor",
            "Schimbarea bazei unui logaritm",
            "Calcule cu puteri, radicali și logaritmi"
        ]
    },
    {
        id: "functii-speciale",
        clasa: "Clasa a X-a",
        icon: "📊",
        titlu: "Funcții exponențiale, logaritmice și trigonometrice",
        descriere: "Funcții speciale, proprietăți și ecuații specifice.",
        lectii: [
            "Funcția putere",
            "Funcția radical",
            "Funcția exponențială",
            "Funcția logaritmică",
            "Funcții trigonometrice",
            "Funcții trigonometrice inverse",
            "Injectivitate",
            "Surjectivitate",
            "Bijectivitate",
            "Funcție inversabilă",
            "Funcția inversă",
            "Ecuații cu radicali",
            "Ecuații exponențiale",
            "Ecuații logaritmice",
            "Ecuații trigonometrice"
        ]
    },
    {
        id: "complexe",
        clasa: "Clasa a X-a",
        icon: "ℂ",
        titlu: "Numere complexe",
        descriere: "Calcule și ecuații în mulțimea numerelor complexe.",
        lectii: [
            "Forma algebrică a unui număr complex",
            "Partea reală și partea imaginară",
            "Egalitatea numerelor complexe",
            "Adunarea și scăderea numerelor complexe",
            "Înmulțirea numerelor complexe",
            "Conjugatul unui număr complex",
            "Împărțirea numerelor complexe",
            "Ecuații de gradul al II-lea în numere complexe",
            "Ecuații bipătrate"
        ]
    },
    {
        id: "combinatorica-probabilitati",
        clasa: "Clasa a X-a",
        icon: "🎲",
        titlu: "Combinatorică și probabilități",
        descriere: "Tehnici de numărare și calculul probabilităților.",
        lectii: [
            "Principiul multiplicării",
            "Permutări",
            "Aranjamente",
            "Combinări",
            "Probleme de numărare",
            "Evenimente aleatoare",
            "Operații cu evenimente",
            "Evenimente egal probabile",
            "Probabilitatea unui eveniment",
            "Probabilitatea evenimentelor compuse",
            "Aplicații financiare"
        ]
    },
    {
        id: "geometrie-analitica",
        clasa: "Clasa a X-a",
        icon: "📍",
        titlu: "Geometrie analitică",
        descriere: "Drepte, coordonate, distanțe și arii în plan.",
        lectii: [
            "Coordonate în plan",
            "Vectori prin coordonate",
            "Ecuația unei drepte",
            "Dreapta determinată de un punct și o direcție",
            "Dreapta determinată de două puncte",
            "Condiții de paralelism",
            "Condiții de perpendicularitate",
            "Distanța dintre două puncte",
            "Distanța de la un punct la o dreaptă",
            "Calculul ariilor în coordonate"
        ]
    },
    {
        id: "matrice",
        clasa: "Clasa a XI-a",
        icon: "▦",
        titlu: "Matrice și determinanți",
        descriere: "Calcul matriceal și determinanți, esențiali pentru Subiectul al II-lea.",
        lectii: [
            "Noțiunea de matrice",
            "Tipuri de matrice",
            "Egalitatea matricelor",
            "Adunarea matricelor",
            "Înmulțirea unei matrice cu un scalar",
            "Înmulțirea matricelor",
            "Puteri de matrice",
            "Determinant de ordinul 2",
            "Determinant de ordinul 3",
            "Proprietățile determinanților",
            "Matrice inversabilă",
            "Inversa unei matrice",
            "Ecuații matriceale"
        ]
    },
    {
        id: "sisteme",
        clasa: "Clasa a XI-a",
        icon: "🧮",
        titlu: "Sisteme de ecuații liniare",
        descriere: "Metodele din programă pentru rezolvarea și analiza sistemelor liniare.",
        lectii: [
            "Forma matriceală a unui sistem",
            "Sisteme compatibile și incompatibile",
            "Regula lui Cramer",
            "Rangul unei matrice",
            "Teorema Kronecker-Capelli",
            "Teorema Rouché",
            "Metoda Gauss",
            "Sisteme cu parametru"
        ]
    },
    {
        id: "limite",
        clasa: "Clasa a XI-a",
        icon: "∞",
        titlu: "Șiruri, limite și continuitate",
        descriere: "Fundamentul analizei matematice necesare pentru Subiectul al III-lea.",
        lectii: [
            "Vecinătăți",
            "Șir convergent",
            "Limita unui șir",
            "Operații cu limite de șiruri",
            "Limite uzuale",
            "Numărul e",
            "Limita unei funcții într-un punct",
            "Limite laterale",
            "Limite la infinit",
            "Operații cu limite de funcții",
            "Forme nedeterminate",
            "Asimptote verticale",
            "Asimptote orizontale",
            "Asimptote oblice",
            "Continuitatea într-un punct",
            "Continuitatea pe un interval",
            "Proprietatea lui Darboux"
        ]
    },
    {
        id: "derivate",
        clasa: "Clasa a XI-a",
        icon: "f′",
        titlu: "Derivate și studiul funcțiilor",
        descriere: "Derivare, monotonie, extreme și reprezentări grafice.",
        lectii: [
            "Derivata unei funcții într-un punct",
            "Interpretarea geometrică a derivatei",
            "Derivatele funcțiilor elementare",
            "Reguli de derivare",
            "Derivata funcției compuse",
            "Teorema lui Fermat",
            "Teorema lui Rolle",
            "Teorema lui Lagrange",
            "Regulile lui l'Hospital",
            "Monotonia cu ajutorul derivatei",
            "Puncte de maxim și minim",
            "Concavitate și convexitate",
            "Derivata de ordinul al II-lea",
            "Puncte de inflexiune",
            "Tabel de variație",
            "Reprezentarea grafică a funcțiilor",
            "Determinarea numărului de soluții ale unei ecuații"
        ]
    },
    {
        id: "structuri",
        clasa: "Clasa a XII-a",
        icon: "⚙️",
        titlu: "Structuri algebrice",
        descriere: "Legi de compoziție, grupuri, inele și corpuri.",
        lectii: [
            "Legi de compoziție",
            "Parte stabilă",
            "Proprietățile unei legi de compoziție",
            "Element neutru",
            "Elemente simetrizabile",
            "Grup",
            "Subgrup",
            "Grup finit",
            "Ordinul unui element",
            "Morfism de grupuri",
            "Izomorfism de grupuri",
            "Inel",
            "Subinel",
            "Corp",
            "Morfisme de inele și corpuri"
        ]
    },
    {
        id: "polinoame",
        clasa: "Clasa a XII-a",
        icon: "P(x)",
        titlu: "Polinoame",
        descriere: "Operații, divizibilitate, rădăcini și ecuații algebrice.",
        lectii: [
            "Polinoame cu coeficienți într-un corp",
            "Gradul unui polinom",
            "Adunarea și înmulțirea polinoamelor",
            "Împărțirea polinoamelor",
            "Teorema împărțirii cu rest",
            "Schema lui Horner",
            "Teorema lui Bézout",
            "Divizibilitatea polinoamelor",
            "Rădăcinile unui polinom",
            "Factorizarea polinoamelor",
            "Relațiile lui Viète pentru polinoame",
            "Ecuații algebrice",
            "Ecuații binome",
            "Ecuații bipătrate",
            "Ecuații reciproce"
        ]
    },
    {
        id: "integrale",
        clasa: "Clasa a XII-a",
        icon: "∫",
        titlu: "Primitive și integrale",
        descriere: "Ultima mare zonă a analizei matematice din programa M_mate-info.",
        lectii: [
            "Primitiva unei funcții",
            "Integrala nedefinită",
            "Primitive uzuale",
            "Proprietățile primitivelor",
            "Integrala definită",
            "Proprietățile integralei definite",
            "Formula Leibniz-Newton",
            "Integrabilitatea funcțiilor continue",
            "Teorema de medie",
            "Integrarea prin părți",
            "Integrarea prin schimbare de variabilă",
            "Integrarea funcțiilor raționale simple",
            "Calculul ariilor",
            "Volumul corpurilor de rotație",
            "Limite de șiruri folosind integrale"
        ]
    }
];
const lectiiVechi = {
    "Mulțimi de numere și operații cu numere reale": {
        href: "/lectii/numere-reale",
        storageKey: "lectie-numere-reale-finalizata"
    },
    "Estimări și aproximări": {
        href: "/lectii/estimari-aproximari",
        storageKey: "lectie-estimari-aproximari-finalizata"
    },
    "Modulul unui număr real": {
        href: "/lectii/modul-numar-real",
        storageKey: "lectie-modul-numar-real-finalizata"
    },
    "Intervale de numere reale": {
        href: "/lectii/intervale-numere-reale",
        storageKey: "lectie-intervale-numere-reale-finalizata"
    },
    "Propoziții și predicate": {
        href: "/lectii/propozitii-predicate",
        storageKey: "lectie-propozitii-predicate-finalizata"
    }
};
function ProgramaPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [supabase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ProgramaPage.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])()
    }["ProgramaPage.useState"]);
    const [profil, setProfil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [modulDeschis, setModulDeschis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lectiiFinalizate, setLectiiFinalizate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [gata, setGata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProgramaPage.useEffect": ()=>{
            let activ = true;
            async function incarcaPrograma() {
                const { data: { user }, error: userError } = await supabase.auth.getUser();
                if (!activ) {
                    return;
                }
                if (userError || !user) {
                    router.replace("/cont");
                    return;
                }
                const { data: profilSupabase, error: profilError } = await supabase.from("profiles").select("nume, profil_bac, evaluare_initiala_finalizata").eq("id", user.id).maybeSingle();
                if (!activ) {
                    return;
                }
                if (profilError) {
                    router.replace("/cont");
                    return;
                }
                if (!profilSupabase?.nume) {
                    router.replace("/date-personale");
                    return;
                }
                if (!profilSupabase.profil_bac) {
                    router.replace("/profil");
                    return;
                }
                if (!profilSupabase.evaluare_initiala_finalizata) {
                    router.replace("/evaluare");
                    return;
                }
                setProfil(profilSupabase.profil_bac);
                localStorage.setItem("bac-mate-nume", profilSupabase.nume);
                localStorage.setItem("bac-mate-profil-cod", profilSupabase.profil_bac);
                localStorage.setItem("bac-mate-evaluare-initiala-finalizata", "da");
                const progres = {};
                Object.entries(lectiiVechi).forEach({
                    "ProgramaPage.useEffect.incarcaPrograma": ([numeLectie, configurare])=>{
                        progres[numeLectie] = localStorage.getItem(configurare.storageKey) === "da";
                    }
                }["ProgramaPage.useEffect.incarcaPrograma"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lectii"].forEach({
                    "ProgramaPage.useEffect.incarcaPrograma": (lectie)=>{
                        progres[lectie.titlu] = localStorage.getItem(lectie.storageKeyFinalizata) === "da";
                    }
                }["ProgramaPage.useEffect.incarcaPrograma"]);
                const { data, error } = await supabase.from("student_progress").select("lesson_id, completed").eq("user_id", user.id);
                if (!activ) {
                    return;
                }
                if (!error && data) {
                    const progresCloud = data;
                    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lectii"].forEach({
                        "ProgramaPage.useEffect.incarcaPrograma": (lectie)=>{
                            const randCloud = progresCloud.find({
                                "ProgramaPage.useEffect.incarcaPrograma.randCloud": (rand)=>rand.lesson_id === lectie.id
                            }["ProgramaPage.useEffect.incarcaPrograma.randCloud"]);
                            if (!randCloud) {
                                return;
                            }
                            progres[lectie.titlu] = randCloud.completed === true;
                            if (randCloud.completed) {
                                localStorage.setItem(lectie.storageKeyFinalizata, "da");
                            } else {
                                localStorage.removeItem(lectie.storageKeyFinalizata);
                            }
                        }
                    }["ProgramaPage.useEffect.incarcaPrograma"]);
                }
                setLectiiFinalizate({
                    ...progres
                });
                setGata(true);
            }
            incarcaPrograma();
            return ({
                "ProgramaPage.useEffect": ()=>{
                    activ = false;
                }
            })["ProgramaPage.useEffect"];
        }
    }["ProgramaPage.useEffect"], [
        router,
        supabase
    ]);
    const totalLectii = moduleMateInfo.reduce((total, modul)=>total + modul.lectii.length, 0);
    function progresModul(modul) {
        return modul.lectii.filter((lectie)=>lectiiFinalizate[lectie] === true).length;
    }
    function gasesteConfigurareLectie(numeLectie) {
        const lectieVeche = lectiiVechi[numeLectie];
        if (lectieVeche) {
            return lectieVeche;
        }
        const lectieNoua = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lectii"].find((lectie)=>lectie.titlu === numeLectie);
        if (!lectieNoua) {
            return null;
        }
        return {
            href: `/lectii/${lectieNoua.slug}`,
            storageKey: lectieNoua.storageKeyFinalizata
        };
    }
    function esteLectiaDeblocata(modul, lectieIndex) {
        const lectieCurenta = modul.lectii[lectieIndex];
        const configurareCurenta = gasesteConfigurareLectie(lectieCurenta);
        if (!configurareCurenta) {
            return false;
        }
        if (lectiiFinalizate[lectieCurenta]) {
            return true;
        }
        const modulIndex = moduleMateInfo.findIndex((modulDinLista)=>modulDinLista.id === modul.id);
        if (modulIndex === 0 && lectieIndex === 0) {
            return true;
        }
        if (lectieIndex > 0) {
            const lectieAnterioara = modul.lectii[lectieIndex - 1];
            return lectiiFinalizate[lectieAnterioara] === true;
        }
        if (lectieIndex === 0 && modulIndex > 0) {
            const modulAnterior = moduleMateInfo[modulIndex - 1];
            const ultimaLectieModulAnterior = modulAnterior.lectii[modulAnterior.lectii.length - 1];
            return lectiiFinalizate[ultimaLectieModulAnterior] === true;
        }
        return false;
    }
    if (!gata) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-slate-950 text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-6 py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400",
                    children: "Se verifică autentificarea și se încarcă programa..."
                }, void 0, false, {
                    fileName: "[project]/app/programa/page.tsx",
                    lineNumber: 690,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/programa/page.tsx",
                lineNumber: 689,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/programa/page.tsx",
            lineNumber: 688,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-950 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-slate-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/dashboard",
                            className: "font-bold text-slate-300 transition hover:text-white",
                            children: "← Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/app/programa/page.tsx",
                            lineNumber: 702,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/",
                            className: "text-xl font-black",
                            children: [
                                "BAC ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-blue-500",
                                    children: "MATE"
                                }, void 0, false, {
                                    fileName: "[project]/app/programa/page.tsx",
                                    lineNumber: 710,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/programa/page.tsx",
                            lineNumber: 709,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400",
                            children: profil
                        }, void 0, false, {
                            fileName: "[project]/app/programa/page.tsx",
                            lineNumber: 713,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/programa/page.tsx",
                    lineNumber: 701,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/programa/page.tsx",
                lineNumber: 700,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-6 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-4xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                        children: "Traseul tău pentru Bac"
                                    }, void 0, false, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 722,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-4 text-4xl font-black md:text-5xl",
                                        children: [
                                            "Programa ",
                                            profil
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 726,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-5 text-lg leading-8 text-slate-300",
                                        children: "Materia este organizată în module de învățare construite pe baza conținuturilor prevăzute în programa de examen."
                                    }, void 0, false, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 730,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 721,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 grid gap-4 md:grid-cols-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-slate-950 p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: "Module"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 739,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-3xl font-black",
                                                children: moduleMateInfo.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 743,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 738,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-slate-950 p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: "Lecții planificate"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 749,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-3xl font-black",
                                                children: totalLectii
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 748,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-slate-950 p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: "Profil"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 759,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-xl font-black text-blue-400",
                                                children: profil
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 763,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 758,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 737,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programa/page.tsx",
                        lineNumber: 720,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-8 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl",
                                    children: "🛟"
                                }, void 0, false, {
                                    fileName: "[project]/app/programa/page.tsx",
                                    lineNumber: 772,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-black",
                                            children: "Recuperare înainte de programă"
                                        }, void 0, false, {
                                            fileName: "[project]/app/programa/page.tsx",
                                            lineNumber: 775,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 leading-7 text-slate-300",
                                            children: "Dacă evaluarea diagnostică descoperă lacune la calcule elementare, BAC MATE îți recomandă mai întâi lecții de recuperare. Acestea te ajută să înțelegi materia de Bac, fără să fie prezentate ca module oficiale separate ale programei."
                                        }, void 0, false, {
                                            fileName: "[project]/app/programa/page.tsx",
                                            lineNumber: 779,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/lectii/procente",
                                            className: "mt-4 inline-block rounded-xl bg-amber-500/10 px-4 py-3 font-bold text-amber-300 transition hover:bg-amber-500/20",
                                            children: "Exemplu existent: Procente →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/programa/page.tsx",
                                            lineNumber: 787,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/programa/page.tsx",
                                    lineNumber: 774,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/programa/page.tsx",
                            lineNumber: 771,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/programa/page.tsx",
                        lineNumber: 770,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                children: "Harta completă"
                            }, void 0, false, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 798,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-3xl font-black",
                                children: "Ce trebuie să stăpânești"
                            }, void 0, false, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 802,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-3xl leading-7 text-slate-400",
                                children: "Lecțiile se deblochează treptat pe măsură ce termini traseul de învățare."
                            }, void 0, false, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 806,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programa/page.tsx",
                        lineNumber: 797,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 space-y-5",
                        children: moduleMateInfo.map((modul, index)=>{
                            const deschis = modulDeschis === modul.id;
                            const finalizate = progresModul(modul);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "overflow-hidden rounded-3xl border border-slate-800 bg-slate-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setModulDeschis(deschis ? null : modul.id),
                                        className: "flex w-full items-center gap-5 p-6 text-left transition hover:bg-slate-800/40 md:p-7",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-2xl font-black",
                                                children: modul.icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 831,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-black text-blue-400",
                                                                children: [
                                                                    "MODUL ",
                                                                    index + 1
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/programa/page.tsx",
                                                                lineNumber: 837,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-400",
                                                                children: modul.clasa
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/programa/page.tsx",
                                                                lineNumber: 841,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-400",
                                                                children: [
                                                                    modul.lectii.length,
                                                                    " lecții"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/programa/page.tsx",
                                                                lineNumber: 845,
                                                                columnNumber: 23
                                                            }, this),
                                                            finalizate > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400",
                                                                children: [
                                                                    finalizate,
                                                                    " finalizate"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/programa/page.tsx",
                                                                lineNumber: 850,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/programa/page.tsx",
                                                        lineNumber: 836,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "mt-2 text-xl font-black md:text-2xl",
                                                        children: modul.titlu
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programa/page.tsx",
                                                        lineNumber: 856,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 leading-6 text-slate-400",
                                                        children: modul.descriere
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programa/page.tsx",
                                                        lineNumber: 860,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 835,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl text-slate-400",
                                                children: deschis ? "−" : "+"
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 865,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 822,
                                        columnNumber: 17
                                    }, this),
                                    deschis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-slate-800 px-6 py-6 md:px-7",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-5 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-black",
                                                        children: "Lecțiile acestui modul"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/programa/page.tsx",
                                                        lineNumber: 873,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-slate-500",
                                                        children: [
                                                            finalizate,
                                                            "/",
                                                            modul.lectii.length,
                                                            " finalizate"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/programa/page.tsx",
                                                        lineNumber: 877,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 872,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-3 md:grid-cols-2",
                                                children: modul.lectii.map((lectie, lectieIndex)=>{
                                                    const configurare = gasesteConfigurareLectie(lectie);
                                                    const finalizata = lectiiFinalizate[lectie] === true;
                                                    const deblocata = esteLectiaDeblocata(modul, lectieIndex);
                                                    if (configurare && deblocata) {
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: configurare.href,
                                                            className: `flex items-center gap-4 rounded-2xl border p-4 transition ${finalizata ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10" : "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${finalizata ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"}`,
                                                                    children: finalizata ? "✓" : lectieIndex + 1
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/programa/page.tsx",
                                                                    lineNumber: 908,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-semibold",
                                                                            children: lectie
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/programa/page.tsx",
                                                                            lineNumber: 921,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: `mt-1 text-xs font-bold ${finalizata ? "text-emerald-400" : "text-blue-400"}`,
                                                                            children: finalizata ? "Finalizată • Poți revedea lecția" : "Disponibilă • Începe lecția"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/programa/page.tsx",
                                                                            lineNumber: 925,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/programa/page.tsx",
                                                                    lineNumber: 920,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: finalizata ? "text-emerald-400" : "text-blue-400",
                                                                    children: finalizata ? "✅" : "→"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/programa/page.tsx",
                                                                    lineNumber: 938,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, lectie, true, {
                                                            fileName: "[project]/app/programa/page.tsx",
                                                            lineNumber: 899,
                                                            columnNumber: 31
                                                        }, this);
                                                    }
                                                    if (configurare && !deblocata) {
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-slate-400",
                                                                    children: lectieIndex + 1
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/programa/page.tsx",
                                                                    lineNumber: 957,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-semibold",
                                                                            children: lectie
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/programa/page.tsx",
                                                                            lineNumber: 962,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-xs text-slate-500",
                                                                            children: lectieIndex === 0 ? "Finalizează modulul anterior pentru a debloca această lecție" : "Finalizează lecția anterioară pentru a o debloca"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/programa/page.tsx",
                                                                            lineNumber: 966,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/programa/page.tsx",
                                                                    lineNumber: 961,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-600",
                                                                    children: "🔒"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/programa/page.tsx",
                                                                    lineNumber: 973,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, lectie, true, {
                                                            fileName: "[project]/app/programa/page.tsx",
                                                            lineNumber: 953,
                                                            columnNumber: 31
                                                        }, this);
                                                    }
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-slate-400",
                                                                children: lectieIndex + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/programa/page.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold",
                                                                        children: lectie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/programa/page.tsx",
                                                                        lineNumber: 990,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-xs text-slate-500",
                                                                        children: "Lecție în pregătire"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/programa/page.tsx",
                                                                        lineNumber: 994,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/programa/page.tsx",
                                                                lineNumber: 989,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-600",
                                                                children: "🔒"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/programa/page.tsx",
                                                                lineNumber: 999,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, lectie, true, {
                                                        fileName: "[project]/app/programa/page.tsx",
                                                        lineNumber: 981,
                                                        columnNumber: 29
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/programa/page.tsx",
                                                lineNumber: 882,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/programa/page.tsx",
                                        lineNumber: 871,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, modul.id, true, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 818,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/programa/page.tsx",
                        lineNumber: 812,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-black text-blue-400",
                                children: "📘 Cum funcționează BAC MATE"
                            }, void 0, false, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 1015,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-4xl leading-7 text-slate-300",
                                children: "Nu trebuie să parcurgi mecanic toate lecțiile. Evaluarea diagnostică, progresul și greșelile tale vor determina ce trebuie să înveți, ce trebuie să repeți și când ești pregătit pentru exercițiile de nivel Bac."
                            }, void 0, false, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 1019,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programa/page.tsx",
                        lineNumber: 1014,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex flex-col gap-3 sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/evaluare",
                                className: "rounded-xl bg-blue-600 px-6 py-4 text-center font-black transition hover:bg-blue-500",
                                children: "Refă evaluarea diagnostică →"
                            }, void 0, false, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 1028,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/dashboard",
                                className: "rounded-xl border border-slate-700 px-6 py-4 text-center font-black transition hover:bg-slate-900",
                                children: "Înapoi la Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/app/programa/page.tsx",
                                lineNumber: 1035,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/programa/page.tsx",
                        lineNumber: 1027,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/programa/page.tsx",
                lineNumber: 719,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/programa/page.tsx",
        lineNumber: 699,
        columnNumber: 5
    }, this);
}
_s(ProgramaPage, "hgU1zGFtmJV0OlL4LYL3Ffym94E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProgramaPage;
var _c;
__turbopack_context__.k.register(_c, "ProgramaPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/lectii-vechi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lectiaCuantificatori",
    ()=>lectiaCuantificatori,
    "lectiaDemonstratii",
    ()=>lectiaDemonstratii,
    "lectiaInductiaMatematica",
    ()=>lectiaInductiaMatematica,
    "lectiaOperatiiLogice",
    ()=>lectiaOperatiiLogice,
    "lectiaOperatiiMultimi",
    ()=>lectiaOperatiiMultimi,
    "lectii",
    ()=>lectii
]);
const lectiaCuantificatori = {
    id: "cuantificatori",
    slug: "cuantificatori",
    modul: 1,
    numarLectie: 6,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Cuantificatori",
    descriere: "În această lecție vei învăța ce înseamnă cuantificatorul universal și cuantificatorul existențial și cum îi folosim în propoziții matematice.",
    obiective: [
        {
            icon: "∀",
            titlu: "Să înțelegi „pentru orice”",
            descriere: "Vei recunoaște și interpreta cuantificatorul universal."
        },
        {
            icon: "∃",
            titlu: "Să înțelegi „există”",
            descriere: "Vei recunoaște și interpreta cuantificatorul existențial."
        },
        {
            icon: "🧠",
            titlu: "Să citești corect un enunț",
            descriere: "Vei transforma scrierea simbolică într-un enunț matematic exprimat în cuvinte."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este un cuantificator?",
            durata: "3–4 min",
            descriere: "Pornim de la predicate și vedem cum le putem transforma în propoziții.",
            idei: [
                "Un predicat conține una sau mai multe variabile.",
                "Cuantificatorii precizează pentru câte valori trebuie să fie adevărat predicatul.",
                "Cei doi cuantificatori de bază sunt universal și existențial.",
                "Domeniul variabilei trebuie precizat."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă P(x) este x² ≥ 0 și x este număr real, putem afirma că pentru orice x real, x² ≥ 0."
        },
        {
            numar: 2,
            titlu: "Cuantificatorul universal ∀",
            durata: "4 min",
            descriere: "Înveți cum citim și verificăm o afirmație de forma «pentru orice».",
            idei: [
                "∀ se citește «pentru orice» sau «oricare ar fi».",
                "Proprietatea trebuie să fie adevărată pentru fiecare element.",
                "Un singur contraexemplu face falsă o afirmație universală.",
                "Mulțimea din care este ales x contează."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "∀x ∈ R, x² ≥ 0 se citește: pentru orice număr real x, x² este mai mare sau egal cu 0."
        },
        {
            numar: 3,
            titlu: "Cuantificatorul existențial ∃",
            durata: "4 min",
            descriere: "Înveți ce înseamnă că există cel puțin un element cu o anumită proprietate.",
            idei: [
                "∃ se citește «există».",
                "Este suficientă cel puțin o valoare care verifică proprietatea.",
                "Nu este necesar ca proprietatea să fie adevărată pentru toate valorile.",
                "Un exemplu potrivit poate demonstra o afirmație existențială."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "∃x ∈ Z astfel încât x² = 4 este adevărat, deoarece x = 2 verifică relația."
        },
        {
            numar: 4,
            titlu: "∀ sau ∃?",
            durata: "4 min",
            descriere: "Comparăm cele două tipuri de afirmații și înveți să le deosebești rapid.",
            idei: [
                "∀ înseamnă toate valorile.",
                "∃ înseamnă cel puțin o valoare.",
                "Pentru ∀ putem căuta un contraexemplu.",
                "Pentru ∃ putem căuta un exemplu."
            ],
            exempluTitlu: "Comparație",
            exemplu: "∀x ∈ R, x² ≥ 0 este adevărat. ∃x ∈ R, x² = 9 este de asemenea adevărat."
        }
    ],
    fisaRapida: {
        titlu: "Cele două simboluri esențiale",
        continut: [
            "∀ = pentru orice.",
            "∃ = există cel puțin un element.",
            "Un contraexemplu poate arăta că o afirmație universală este falsă.",
            "Un exemplu poate arăta că o afirmație existențială este adevărată.",
            "Verifică întotdeauna domeniul variabilei."
        ]
    },
    exercitii: [
        {
            intrebare: "Cum se citește simbolul ∀?",
            variante: [
                "Există",
                "Pentru orice",
                "Nu există",
                "Este egal cu"
            ],
            corect: 1,
            explicatie: "∀ reprezintă cuantificatorul universal și se citește «pentru orice»."
        },
        {
            intrebare: "Cum se citește simbolul ∃?",
            variante: [
                "Pentru orice",
                "Există",
                "Este inclus în",
                "Este diferit de"
            ],
            corect: 1,
            explicatie: "∃ reprezintă cuantificatorul existențial și se citește «există»."
        },
        {
            intrebare: "Care afirmație este adevărată?",
            variante: [
                "∀x ∈ R, x > 0",
                "∀x ∈ R, x² ≥ 0",
                "∀x ∈ R, x² < 0",
                "∀x ∈ R, x = 1"
            ],
            corect: 1,
            explicatie: "Pătratul oricărui număr real este mai mare sau egal cu 0."
        },
        {
            intrebare: "Cum scriem «există un număr întreg al cărui pătrat este 9»?",
            variante: [
                "∀x ∈ Z, x² = 9",
                "∃x ∈ Z, x² = 9",
                "∀x ∈ Z, x² ≠ 9",
                "x ∉ Z"
            ],
            corect: 1,
            explicatie: "Folosim ∃ deoarece este suficient să existe cel puțin o valoare potrivită."
        },
        {
            intrebare: "Pentru a arăta că «∀x ∈ R, x > 0» este falsă, este suficient:",
            variante: [
                "Să verificăm toate numerele",
                "Să găsim un contraexemplu",
                "Să găsim un număr pozitiv",
                "Să calculăm un radical"
            ],
            corect: 1,
            explicatie: "De exemplu x = 0 este un contraexemplu, deoarece 0 > 0 este fals."
        },
        {
            intrebare: "Care afirmație despre ∃ este corectă?",
            variante: [
                "Proprietatea trebuie să fie adevărată pentru toate valorile.",
                "Este suficientă cel puțin o valoare potrivită.",
                "Se notează cu ∀.",
                "Se folosește doar pentru numere naturale."
            ],
            corect: 1,
            explicatie: "Cuantificatorul existențial cere existența a cel puțin unui element potrivit."
        }
    ],
    storageKeyFinalizata: "lectie-cuantificatori-finalizata",
    storageKeyXp: "lectie-cuantificatori-xp",
    urmatoareaLectie: {
        titlu: "Negație, conjuncție, disjuncție și implicație",
        href: "/lectii/negatie-conjunctie-disjunctie-implicatie"
    }
};
const lectiaOperatiiLogice = {
    id: "operatii-logice",
    slug: "negatie-conjunctie-disjunctie-implicatie",
    modul: 1,
    numarLectie: 7,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Negație, conjuncție, disjuncție și implicație",
    descriere: "Înveți operațiile logice elementare și cum se modifică valoarea de adevăr atunci când combinăm propoziții.",
    obiective: [
        {
            icon: "¬",
            titlu: "Să negi o propoziție",
            descriere: "Vei înțelege ce înseamnă «nu P»."
        },
        {
            icon: "∧ ∨",
            titlu: "Să combini propoziții",
            descriere: "Vei lucra cu «și» și «sau»."
        },
        {
            icon: "⇒",
            titlu: "Să înțelegi implicația",
            descriere: "Vei interpreta corect expresia «dacă P, atunci Q»."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Negația unei propoziții",
            durata: "4 min",
            descriere: "Vedem ce se întâmplă cu valoarea de adevăr atunci când negăm un enunț.",
            idei: [
                "Negația lui P se notează ¬P.",
                "Dacă P este adevărată, ¬P este falsă.",
                "Dacă P este falsă, ¬P este adevărată.",
                "Negația trebuie să exprime exact contrariul logic."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă P este «5 > 2», atunci ¬P este «5 ≤ 2»."
        },
        {
            numar: 2,
            titlu: "Conjuncția și disjuncția",
            durata: "5 min",
            descriere: "Înțelegi diferența dintre «P și Q» și «P sau Q».",
            idei: [
                "P ∧ Q înseamnă P și Q.",
                "Conjuncția este adevărată numai dacă ambele propoziții sunt adevărate.",
                "P ∨ Q înseamnă P sau Q.",
                "Disjuncția este adevărată dacă cel puțin una dintre propoziții este adevărată."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă P este adevărată și Q este falsă, atunci P ∧ Q este falsă, iar P ∨ Q este adevărată."
        },
        {
            numar: 3,
            titlu: "Implicația",
            durata: "5 min",
            descriere: "Înveți cum funcționează propoziția «dacă P, atunci Q».",
            idei: [
                "Implicația se notează P ⇒ Q.",
                "P se numește ipoteză, iar Q concluzie.",
                "Implicația este falsă atunci când P este adevărată și Q este falsă.",
                "În celelalte cazuri, implicația este adevărată."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă x = 2, atunci x² = 4. Pentru x = 2, atât ipoteza cât și concluzia sunt adevărate."
        },
        {
            numar: 4,
            titlu: "Echivalența",
            durata: "4 min",
            descriere: "Facem legătura și cu echivalența, operație logică prevăzută în aceeași zonă de programă.",
            idei: [
                "P ⇔ Q se citește «P dacă și numai dacă Q».",
                "Echivalența este adevărată când P și Q au aceeași valoare de adevăr.",
                "Poate fi privită ca două implicații: P ⇒ Q și Q ⇒ P.",
                "Este folosită frecvent la transformări echivalente."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru x real, x = 0 ⇔ x² = 0."
        }
    ],
    fisaRapida: {
        titlu: "Cele patru operații pe scurt",
        continut: [
            "¬P = negația lui P.",
            "P ∧ Q = P și Q.",
            "P ∨ Q = P sau Q.",
            "P ⇒ Q = dacă P, atunci Q.",
            "P ⇔ Q = P dacă și numai dacă Q."
        ]
    },
    exercitii: [
        {
            intrebare: "Dacă P este adevărată, atunci ¬P este:",
            variante: [
                "Adevărată",
                "Falsă",
                "Uneori adevărată",
                "Nedefinită"
            ],
            corect: 1,
            explicatie: "Negația schimbă valoarea de adevăr a propoziției."
        },
        {
            intrebare: "Când este adevărată conjuncția P ∧ Q?",
            variante: [
                "Numai când ambele sunt adevărate",
                "Când cel puțin una este adevărată",
                "Numai când ambele sunt false",
                "Întotdeauna"
            ],
            corect: 0,
            explicatie: "Conjuncția «și» cere ca ambele propoziții să fie adevărate."
        },
        {
            intrebare: "Dacă P este adevărată și Q este falsă, P ∨ Q este:",
            variante: [
                "Falsă",
                "Adevărată",
                "Nedefinită",
                "Echivalentă cu Q"
            ],
            corect: 1,
            explicatie: "Disjuncția este adevărată dacă cel puțin una dintre propoziții este adevărată."
        },
        {
            intrebare: "Implicația P ⇒ Q este falsă atunci când:",
            variante: [
                "P este adevărată și Q este falsă",
                "P și Q sunt adevărate",
                "P este falsă și Q adevărată",
                "P și Q sunt false"
            ],
            corect: 0,
            explicatie: "Acesta este singurul caz în care o implicație este falsă."
        },
        {
            intrebare: "Care este negația propoziției «x > 3»?",
            variante: [
                "x > 3",
                "x < 3",
                "x ≤ 3",
                "x = 3"
            ],
            corect: 2,
            explicatie: "Negația lui x > 3 este x ≤ 3."
        },
        {
            intrebare: "Simbolul ⇔ se citește:",
            variante: [
                "Și",
                "Sau",
                "Dacă și numai dacă",
                "Nu"
            ],
            corect: 2,
            explicatie: "⇔ reprezintă echivalența logică."
        }
    ],
    storageKeyFinalizata: "lectie-operatii-logice-finalizata",
    storageKeyXp: "lectie-operatii-logice-xp",
    urmatoareaLectie: {
        titlu: "Operații cu mulțimi",
        href: "/lectii/operatii-cu-multimi"
    }
};
const lectiaOperatiiMultimi = {
    id: "operatii-cu-multimi",
    slug: "operatii-cu-multimi",
    modul: 1,
    numarLectie: 8,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Operații cu mulțimi",
    descriere: "Înveți reuniunea, intersecția, diferența, complementara și relațiile de incluziune și egalitate dintre mulțimi.",
    obiective: [
        {
            icon: "∪",
            titlu: "Să calculezi reuniunea",
            descriere: "Vei reuni elementele care apar în cel puțin una dintre două mulțimi."
        },
        {
            icon: "∩",
            titlu: "Să calculezi intersecția",
            descriere: "Vei identifica elementele comune."
        },
        {
            icon: "⊂",
            titlu: "Să înțelegi incluziunea",
            descriere: "Vei recunoaște când o mulțime este inclusă în alta."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Reuniunea și intersecția",
            durata: "5 min",
            descriere: "Cele două operații de bază cu mulțimi.",
            idei: [
                "A ∪ B conține elementele care sunt în A sau în B.",
                "A ∩ B conține elementele comune celor două mulțimi.",
                "Un element se scrie o singură dată într-o mulțime.",
                "Dacă nu există elemente comune, intersecția este mulțimea vidă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă A = {1, 2, 3} și B = {3, 4}, atunci A ∪ B = {1, 2, 3, 4}, iar A ∩ B = {3}."
        },
        {
            numar: 2,
            titlu: "Diferența și complementara",
            durata: "5 min",
            descriere: "Vedem cum păstrăm elementele unei mulțimi care nu apar în alta.",
            idei: [
                "A \\ B conține elementele din A care nu aparțin lui B.",
                "Diferența nu este în general comutativă.",
                "Complementara unei mulțimi depinde de mulțimea universală.",
                "Trebuie să știm universul de referință."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă A = {1, 2, 3} și B = {3, 4}, atunci A \\ B = {1, 2}."
        },
        {
            numar: 3,
            titlu: "Incluziunea și egalitatea",
            durata: "4 min",
            descriere: "Înveți ce înseamnă că toate elementele unei mulțimi aparțin alteia.",
            idei: [
                "A ⊆ B înseamnă că orice element al lui A aparține și lui B.",
                "Două mulțimi sunt egale dacă au exact aceleași elemente.",
                "Ordinea elementelor nu contează.",
                "Repetarea unui element nu schimbă mulțimea."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă A = {1, 2} și B = {1, 2, 3}, atunci A ⊆ B."
        },
        {
            numar: 4,
            titlu: "Legătura dintre logică și mulțimi",
            durata: "4 min",
            descriere: "Conectăm operațiile logice studiate anterior cu operațiile asupra mulțimilor.",
            idei: [
                "Conjuncția este legată de intersecție.",
                "Disjuncția este legată de reuniune.",
                "Negația este legată de complementară.",
                "Aceste legături ajută la înțelegerea logicii matematice."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Condiția «x ∈ A și x ∈ B» înseamnă exact că x ∈ A ∩ B."
        }
    ],
    fisaRapida: {
        titlu: "Operațiile esențiale",
        continut: [
            "A ∪ B = elementele care aparțin lui A sau lui B.",
            "A ∩ B = elementele comune.",
            "A \\ B = elementele din A care nu aparțin lui B.",
            "A ⊆ B = orice element al lui A aparține și lui B.",
            "A = B când cele două mulțimi au exact aceleași elemente."
        ]
    },
    exercitii: [
        {
            intrebare: "Dacă A = {1, 2, 3} și B = {3, 4}, atunci A ∪ B este:",
            variante: [
                "{3}",
                "{1, 2, 3, 4}",
                "{1, 2}",
                "{4}"
            ],
            corect: 1,
            explicatie: "Reuniunea conține toate elementele care apar în cel puțin una dintre mulțimi."
        },
        {
            intrebare: "Pentru aceleași mulțimi, A ∩ B este:",
            variante: [
                "{1, 2}",
                "{3}",
                "{4}",
                "∅"
            ],
            corect: 1,
            explicatie: "Singurul element comun este 3."
        },
        {
            intrebare: "Dacă A = {1, 2, 3} și B = {3, 4}, A \\ B este:",
            variante: [
                "{1, 2}",
                "{3}",
                "{4}",
                "{1, 2, 4}"
            ],
            corect: 0,
            explicatie: "Păstrăm elementele din A care nu aparțin lui B."
        },
        {
            intrebare: "Dacă A = {1, 2} și B = {1, 2, 3}, care relație este corectă?",
            variante: [
                "B ⊆ A",
                "A ⊆ B",
                "A ∩ B = ∅",
                "A = B"
            ],
            corect: 1,
            explicatie: "Fiecare element al lui A aparține și lui B."
        },
        {
            intrebare: "Dacă A ∩ B = ∅, atunci:",
            variante: [
                "A și B nu au elemente comune",
                "A = B",
                "A este vidă obligatoriu",
                "B este vidă obligatoriu"
            ],
            corect: 0,
            explicatie: "Intersecția vidă înseamnă că nu există elemente comune."
        },
        {
            intrebare: "Condiția «x ∈ A și x ∈ B» este echivalentă cu:",
            variante: [
                "x ∈ A ∪ B",
                "x ∈ A ∩ B",
                "x ∉ A",
                "A = B"
            ],
            corect: 1,
            explicatie: "Conjuncția celor două condiții corespunde intersecției."
        }
    ],
    storageKeyFinalizata: "lectie-operatii-cu-multimi-finalizata",
    storageKeyXp: "lectie-operatii-cu-multimi-xp",
    urmatoareaLectie: {
        titlu: "Inducția matematică",
        href: "/lectii/inductia-matematica"
    }
};
const lectiaInductiaMatematica = {
    id: "inductia-matematica",
    slug: "inductia-matematica",
    modul: 1,
    numarLectie: 9,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Inducția matematică",
    descriere: "Înveți principiul inducției matematice și structura unei demonstrații pentru afirmații care depind de un număr natural.",
    obiective: [
        {
            icon: "1️⃣",
            titlu: "Să verifici cazul inițial",
            descriere: "Vei începe demonstrația de la prima valoare relevantă."
        },
        {
            icon: "➡️",
            titlu: "Să formulezi ipoteza de inducție",
            descriere: "Vei presupune afirmația adevărată pentru un anumit rang."
        },
        {
            icon: "✅",
            titlu: "Să faci pasul de inducție",
            descriere: "Vei demonstra că afirmația este adevărată și pentru rangul următor."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ideea inducției matematice",
            durata: "5 min",
            descriere: "Înțelegi mecanismul de bază al unei demonstrații prin inducție.",
            idei: [
                "Inducția se folosește pentru afirmații dependente de n natural.",
                "Mai întâi verificăm cazul inițial.",
                "Apoi presupunem afirmația adevărată pentru n = k.",
                "Pe baza ipotezei, demonstrăm cazul n = k + 1."
            ],
            exempluTitlu: "Imagine mentală",
            exemplu: "Este asemănător unui șir de piese de domino: prima cade, iar fiecare piesă o face să cadă pe următoarea."
        },
        {
            numar: 2,
            titlu: "Cazul inițial și ipoteza de inducție",
            durata: "5 min",
            descriere: "Înveți să scrii primele două părți ale demonstrației.",
            idei: [
                "Cazul inițial trebuie verificat, nu doar afirmat.",
                "Ipoteza de inducție este o presupunere temporară.",
                "De obicei notăm rangul cu k.",
                "Nu demonstrăm din nou ipoteza în pasul de inducție."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru formula 1 + 2 + ... + n = n(n+1)/2, verificăm mai întâi n = 1."
        },
        {
            numar: 3,
            titlu: "Pasul de inducție",
            durata: "6 min",
            descriere: "Vedem cum trecem de la cazul k la cazul k + 1.",
            idei: [
                "Presupunem formula adevărată pentru k.",
                "Scriem expresia pentru k + 1.",
                "Folosim ipoteza de inducție.",
                "Transformăm până obținem formula dorită pentru k + 1."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă 1 + ... + k = k(k+1)/2, atunci adăugăm k+1 și simplificăm pentru a obține formula corespunzătoare lui k+1."
        },
        {
            numar: 4,
            titlu: "Cum recunoști o demonstrație corectă",
            durata: "4 min",
            descriere: "Evităm cele mai frecvente greșeli în inducție.",
            idei: [
                "Nu sări peste cazul inițial.",
                "Nu presupune direct cazul k + 1.",
                "Folosește explicit ipoteza de inducție.",
                "Încheie precizând concluzia pentru toate valorile din domeniul considerat."
            ],
            exempluTitlu: "Regula de aur",
            exemplu: "Baza pornește lanțul, iar pasul de inducție îl continuă."
        }
    ],
    fisaRapida: {
        titlu: "Schema unei demonstrații prin inducție",
        continut: [
            "1. Verifică afirmația pentru valoarea inițială.",
            "2. Presupune afirmația adevărată pentru n = k.",
            "3. Demonstrează afirmația pentru n = k + 1.",
            "4. Concluzionează că afirmația este adevărată pentru toate valorile considerate."
        ]
    },
    exercitii: [
        {
            intrebare: "Care este primul pas într-o demonstrație prin inducție?",
            variante: [
                "Cazul inițial",
                "Concluzia",
                "Contraexemplul",
                "Derivarea"
            ],
            corect: 0,
            explicatie: "Trebuie mai întâi să verificăm că afirmația este adevărată pentru valoarea de pornire."
        },
        {
            intrebare: "În ipoteza de inducție presupunem că afirmația este adevărată pentru:",
            variante: [
                "n = k",
                "n = 0 obligatoriu",
                "n = k + 2",
                "toate numerele reale"
            ],
            corect: 0,
            explicatie: "În mod obișnuit presupunem afirmația adevărată pentru un rang generic n = k."
        },
        {
            intrebare: "În pasul de inducție trebuie să demonstrăm afirmația pentru:",
            variante: [
                "k - 1",
                "k + 1",
                "2k",
                "0"
            ],
            corect: 1,
            explicatie: "Pornind de la ipoteza pentru k, demonstrăm cazul următor k + 1."
        },
        {
            intrebare: "Care afirmație despre ipoteza de inducție este corectă?",
            variante: [
                "Este o presupunere temporară folosită în demonstrație",
                "Este concluzia finală",
                "Trebuie demonstrată separat pentru orice k",
                "Nu este folosită în pasul următor"
            ],
            corect: 0,
            explicatie: "Ipoteza de inducție este presupusă pentru un rang generic și folosită pentru a demonstra rangul următor."
        },
        {
            intrebare: "Pentru formula 1 + 2 + ... + n = n(n+1)/2, cazul inițial n = 1 dă:",
            variante: [
                "1 = 1",
                "1 = 2",
                "0 = 1",
                "2 = 1"
            ],
            corect: 0,
            explicatie: "Membrul stâng este 1, iar membrul drept este 1·2/2 = 1."
        },
        {
            intrebare: "De ce sunt necesare atât cazul inițial, cât și pasul de inducție?",
            variante: [
                "Cazul inițial pornește lanțul, iar pasul îl continuă",
                "Pentru că reprezintă aceeași verificare",
                "Pentru că inducția se aplică numai la două valori",
                "Nu sunt ambele necesare"
            ],
            corect: 0,
            explicatie: "Fără bază nu avem punct de pornire, iar fără pasul de inducție nu putem trece la valorile următoare."
        }
    ],
    storageKeyFinalizata: "lectie-inductia-matematica-finalizata",
    storageKeyXp: "lectie-inductia-matematica-xp",
    urmatoareaLectie: {
        titlu: "Demonstrații și raționamente logice",
        href: "/lectii/demonstratii-rationamente-logice"
    }
};
const lectiaDemonstratii = {
    id: "demonstratii-rationamente-logice",
    slug: "demonstratii-rationamente-logice",
    modul: 1,
    numarLectie: 10,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Demonstrații și raționamente logice",
    descriere: "Încheiem modulul prin folosirea logicii în demonstrații matematice, inclusiv demonstrația directă și demonstrația prin reducere la absurd.",
    obiective: [
        {
            icon: "🧩",
            titlu: "Să identifici ipoteza",
            descriere: "Vei separa datele problemei de ceea ce trebuie demonstrat."
        },
        {
            icon: "➡️",
            titlu: "Să urmărești un raționament",
            descriere: "Vei construi o succesiune logică de pași."
        },
        {
            icon: "⚡",
            titlu: "Să înțelegi reducerea la absurd",
            descriere: "Vei vedea cum o presupunere contrară poate conduce la contradicție."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ipoteză și concluzie",
            durata: "4 min",
            descriere: "Învățăm structura de bază a unei demonstrații matematice.",
            idei: [
                "Ipoteza reprezintă ceea ce știm sau presupunem.",
                "Concluzia reprezintă ceea ce trebuie demonstrat.",
                "Fiecare pas trebuie justificat.",
                "Nu putem folosi concluzia ca argument pentru ea însăși."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă n este număr par, atunci n = 2k pentru un anumit k întreg. De aici putem construi demonstrații despre n."
        },
        {
            numar: 2,
            titlu: "Demonstrația directă",
            durata: "5 min",
            descriere: "Pornim de la ipoteză și ajungem prin pași corecți la concluzie.",
            idei: [
                "Pornim de la ceea ce este cunoscut.",
                "Aplicăm definiții și proprietăți corecte.",
                "Fiecare pas trebuie să rezulte din pasul anterior.",
                "Ajungem la concluzia cerută."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă n = 2k este par, atunci n² = 4k² = 2·(2k²), deci n² este par."
        },
        {
            numar: 3,
            titlu: "Reducerea la absurd",
            durata: "5–6 min",
            descriere: "Presupunem contrariul concluziei și arătăm că această presupunere duce la o contradicție.",
            idei: [
                "Presupunem că afirmația pe care vrem să o demonstrăm este falsă.",
                "Folosim logic această presupunere împreună cu ipotezele.",
                "Ajungem la o contradicție.",
                "Concluzionăm că presupunerea contrară nu poate fi adevărată."
            ],
            exempluTitlu: "Ideea metodei",
            exemplu: "Dacă presupunerea contrară conduce simultan la o afirmație și la negația ei, avem o contradicție."
        },
        {
            numar: 4,
            titlu: "Cum verifici un raționament",
            durata: "4 min",
            descriere: "Înveți să depistezi salturile nejustificate și concluziile greșite.",
            idei: [
                "Verifică dacă fiecare pas are justificare.",
                "Nu confunda un exemplu cu o demonstrație universală.",
                "Nu confunda implicația cu reciproca ei.",
                "Un contraexemplu poate demonta o afirmație universală falsă."
            ],
            exempluTitlu: "Atenție",
            exemplu: "Faptul că o proprietate este adevărată pentru câteva exemple nu demonstrează că este adevărată pentru toate valorile."
        }
    ],
    fisaRapida: {
        titlu: "Cum construiești o demonstrație",
        continut: [
            "Identifică ipoteza și concluzia.",
            "Folosește numai definiții, proprietăți și rezultate justificate.",
            "În demonstrația directă mergi de la ipoteză spre concluzie.",
            "În reducerea la absurd presupui contrariul concluziei și cauți o contradicție.",
            "Un exemplu nu demonstrează o afirmație universală, dar un contraexemplu o poate infirma."
        ]
    },
    exercitii: [
        {
            intrebare: "Într-o demonstrație, ipoteza reprezintă:",
            variante: [
                "Ceea ce știm sau presupunem",
                "Rezultatul final",
                "O greșeală",
                "Un contraexemplu obligatoriu"
            ],
            corect: 0,
            explicatie: "Ipoteza conține informațiile de la care pornește raționamentul."
        },
        {
            intrebare: "Într-o demonstrație directă:",
            variante: [
                "Pornim de la ipoteză și ajungem la concluzie",
                "Presupunem întotdeauna concluzia falsă",
                "Verificăm doar un exemplu",
                "Nu avem nevoie de justificări"
            ],
            corect: 0,
            explicatie: "Demonstrația directă pornește de la ipoteze și deduce concluzia prin pași corecți."
        },
        {
            intrebare: "În reducerea la absurd, presupunem inițial:",
            variante: [
                "Contrariul concluziei",
                "Că toate numerele sunt egale",
                "Că ipoteza este inutilă",
                "Că demonstrația este deja terminată"
            ],
            corect: 0,
            explicatie: "Presupunem contrariul concluziei și arătăm că această presupunere conduce la contradicție."
        },
        {
            intrebare: "Dacă n este par, putem scrie:",
            variante: [
                "n = 2k, cu k întreg",
                "n = 2k + 1, cu k întreg",
                "n = k/2 obligatoriu",
                "n = 1"
            ],
            corect: 0,
            explicatie: "Aceasta este definiția unui număr întreg par."
        },
        {
            intrebare: "Pentru a arăta că o afirmație universală este falsă, poate fi suficient:",
            variante: [
                "Un contraexemplu",
                "Un exemplu favorabil",
                "O presupunere",
                "O definiție fără legătură"
            ],
            corect: 0,
            explicatie: "Un singur contraexemplu este suficient pentru a infirma o afirmație de tip «pentru orice»."
        },
        {
            intrebare: "Care este o greșeală de raționament?",
            variante: [
                "Să justificăm fiecare pas",
                "Să folosim concluzia ca argument pentru ea însăși",
                "Să pornim de la ipoteză",
                "Să folosim o definiție corectă"
            ],
            corect: 1,
            explicatie: "Nu putem demonstra o concluzie presupunând chiar concluzia pe care vrem să o demonstrăm."
        }
    ],
    storageKeyFinalizata: "lectie-demonstratii-rationamente-logice-finalizata",
    storageKeyXp: "lectie-demonstratii-rationamente-logice-xp",
    urmatoareaLectie: {
        titlu: "Reper cartezian și produs cartezian"
    }
};
const lectii = [
    lectiaCuantificatori,
    lectiaOperatiiLogice,
    lectiaOperatiiMultimi,
    lectiaInductiaMatematica,
    lectiaDemonstratii
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/lectii/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lectii",
    ()=>lectii
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$1$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/lectii/modul-1.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$2$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/lectii/modul-2.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/lectii/modul-3.ts [app-client] (ecmascript)");
;
;
;
;
;
;
const lectii = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$1$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lectiiModul1"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$2$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiiModul2"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiiModul3"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/lectii/modul-1.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lectiaEstimariAproximari",
    ()=>lectiaEstimariAproximari,
    "lectiaIntervaleNumereReale",
    ()=>lectiaIntervaleNumereReale,
    "lectiaModulNumarReal",
    ()=>lectiaModulNumarReal,
    "lectiaNumereReale",
    ()=>lectiaNumereReale,
    "lectiaPropozitiiPredicate",
    ()=>lectiaPropozitiiPredicate,
    "lectiiModul1",
    ()=>lectiiModul1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2d$vechi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/lectii-vechi.ts [app-client] (ecmascript)");
;
const lectiaNumereReale = {
    id: "numere-reale",
    slug: "numere-reale",
    modul: 1,
    numarLectie: 1,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Mulțimi de numere și operații cu numere reale",
    descriere: "În această lecție înveți mulțimile N, Z, Q și R, cum clasifici numerele și cum efectuezi corect operații cu numere reale.",
    obiective: [
        {
            icon: "🔢",
            titlu: "Să recunoști mulțimile de numere",
            descriere: "Vei înțelege diferența dintre numere naturale, întregi, raționale și reale."
        },
        {
            icon: "🧠",
            titlu: "Să clasifici corect un număr",
            descriere: "Vei folosi relația N ⊂ Z ⊂ Q ⊂ R."
        },
        {
            icon: "➗",
            titlu: "Să calculezi corect",
            descriere: "Vei aplica ordinea operațiilor în calcule cu numere reale."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "N, Z, Q și R explicate simplu",
            durata: "4–5 min",
            descriere: "Înțelegi ce reprezintă cele patru mulțimi importante.",
            idei: [
                "N = numere naturale",
                "Z = numere întregi",
                "Q = numere raționale",
                "R = numere reale"
            ],
            exempluTitlu: "Exemplu rapid",
            exemplu: "-7 este întreg, rațional și real: -7 ∈ Z, -7 ∈ Q și -7 ∈ R."
        },
        {
            numar: 2,
            titlu: "Rațional sau irațional?",
            durata: "4 min",
            descriere: "Înveți cum recunoști rapid numerele raționale și iraționale.",
            idei: [
                "O fracție a/b, cu b ≠ 0, este rațională.",
                "O zecimală finită este rațională.",
                "O zecimală periodică este rațională.",
                "√2 și π sunt iraționale."
            ],
            exempluTitlu: "Exemplu rapid",
            exemplu: "0,25 = 1/4 este rațional, în timp ce √2 este irațional."
        },
        {
            numar: 3,
            titlu: "Cum clasifici corect un număr",
            durata: "3–4 min",
            descriere: "Folosești relațiile de incluziune dintre mulțimi.",
            idei: [
                "N ⊂ Z",
                "Z ⊂ Q",
                "Q ⊂ R",
                "Un număr poate aparține mai multor mulțimi."
            ],
            exempluTitlu: "Regula de memorat",
            exemplu: "N ⊂ Z ⊂ Q ⊂ R. Numărul 3 aparține tuturor celor patru mulțimi."
        },
        {
            numar: 4,
            titlu: "Calcule cu numere reale",
            durata: "5 min",
            descriere: "Recapitulăm ordinea operațiilor.",
            idei: [
                "Mai întâi parantezele.",
                "Apoi puterile și radicalii.",
                "Apoi înmulțirile și împărțirile.",
                "La final adunările și scăderile."
            ],
            exempluTitlu: "Exemplu rapid",
            exemplu: "2 - 3 × (-4) + 5 = 2 + 12 + 5 = 19."
        }
    ],
    fisaRapida: {
        titlu: "Ce trebuie să reții",
        continut: [
            "N = numere naturale.",
            "Z = numere întregi.",
            "Q = numere raționale.",
            "R = numere reale.",
            "N ⊂ Z ⊂ Q ⊂ R.",
            "Zecimalele finite și periodice sunt raționale.",
            "√2 și π sunt iraționale.",
            "√9 = 3, deci √9 este rațional."
        ]
    },
    exercitii: [
        {
            intrebare: "Cărei mulțimi îi aparține numărul -7?",
            variante: [
                "Doar numerelor naturale",
                "Numerelor întregi, raționale și reale",
                "Doar numerelor iraționale",
                "Doar numerelor reale"
            ],
            corect: 1,
            explicatie: "-7 este întreg, rațional și real."
        },
        {
            intrebare: "Care număr este irațional?",
            variante: [
                "0,25",
                "√2",
                "-3",
                "7/5"
            ],
            corect: 1,
            explicatie: "√2 este irațional."
        },
        {
            intrebare: "Care relație este corectă?",
            variante: [
                "R ⊂ Q ⊂ Z ⊂ N",
                "N ⊂ Z ⊂ Q ⊂ R",
                "Z ⊂ N ⊂ R ⊂ Q",
                "Q ⊂ N ⊂ Z ⊂ R"
            ],
            corect: 1,
            explicatie: "Relația corectă este N ⊂ Z ⊂ Q ⊂ R."
        },
        {
            intrebare: "Calculați: 3/4 + 5/6",
            variante: [
                "8/10",
                "19/12",
                "8/24",
                "13/12"
            ],
            corect: 1,
            explicatie: "3/4 = 9/12 și 5/6 = 10/12. Suma este 19/12."
        },
        {
            intrebare: "Care afirmație este adevărată?",
            variante: [
                "√9 este irațional",
                "π este rațional",
                "0,333... este rațional",
                "Orice număr real este rațional"
            ],
            corect: 2,
            explicatie: "0,333... = 1/3, deci este rațional."
        },
        {
            intrebare: "Calculați: 2 - 3 × (-4) + 5",
            variante: [
                "-5",
                "19",
                "15",
                "-9"
            ],
            corect: 1,
            explicatie: "3 × (-4) = -12, deci 2 - (-12) + 5 = 19."
        }
    ],
    storageKeyFinalizata: "lectie-numere-reale-finalizata",
    storageKeyXp: "lectie-numere-reale-xp",
    urmatoareaLectie: {
        titlu: "Estimări și aproximări",
        href: "/lectii/estimari-aproximari"
    }
};
const lectiaEstimariAproximari = {
    id: "estimari-aproximari",
    slug: "estimari-aproximari",
    modul: 1,
    numarLectie: 2,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Estimări și aproximări",
    descriere: "Înveți să aproximezi numere reale prin lipsă și prin adaos și să alegi precizia potrivită.",
    obiective: [
        {
            icon: "🎯",
            titlu: "Să aproximezi",
            descriere: "Vei aproxima numere la unități, zecimi, sutimi și alte ordine."
        },
        {
            icon: "⬇️",
            titlu: "Prin lipsă și prin adaos",
            descriere: "Vei înțelege diferența dintre cele două tipuri de aproximare."
        },
        {
            icon: "📏",
            titlu: "Să alegi precizia",
            descriere: "Vei interpreta corect precizia unui rezultat."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce înseamnă aproximarea?",
            durata: "4 min",
            descriere: "Înțelegi de ce înlocuim uneori un număr cu unul apropiat.",
            idei: [
                "O aproximare este o valoare apropiată.",
                "Numărul aproximat este mai simplu de folosit.",
                "Precizia ne spune cât de fină este aproximarea."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "3,14159 poate fi aproximat la sutimi prin 3,14."
        },
        {
            numar: 2,
            titlu: "Aproximarea prin lipsă",
            durata: "4 min",
            descriere: "Alegi o valoare apropiată care nu depășește numărul.",
            idei: [
                "Prin lipsă obținem o valoare mai mică sau egală.",
                "Respectăm ordinul de precizie cerut.",
                "Nu rotunjim automat."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Aproximarea prin lipsă la zecimi a lui 4,78 este 4,7."
        },
        {
            numar: 3,
            titlu: "Aproximarea prin adaos",
            durata: "4 min",
            descriere: "Alegi o valoare apropiată mai mare sau egală cu numărul.",
            idei: [
                "Prin adaos obținem o valoare mai mare sau egală.",
                "Respectăm precizia indicată.",
                "Este diferită de aproximarea prin lipsă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Aproximarea prin adaos la zecimi a lui 4,72 este 4,8."
        },
        {
            numar: 4,
            titlu: "Rotunjirea",
            durata: "4–5 min",
            descriere: "Folosești cifra următoare pentru a decide rotunjirea.",
            idei: [
                "Dacă cifra următoare este 0–4, păstrăm cifra.",
                "Dacă este 5–9, mărim cifra cu 1.",
                "Rotunjirea nu este același lucru cu aproximarea prin lipsă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "3,47 rotunjit la zecimi este 3,5."
        }
    ],
    fisaRapida: {
        titlu: "Reguli rapide",
        continut: [
            "Prin lipsă: valoare mai mică sau egală.",
            "Prin adaos: valoare mai mare sau egală.",
            "La rotunjire ne uităm la cifra imediat următoare.",
            "0–4 → păstrăm cifra.",
            "5–9 → mărim cifra cu 1."
        ]
    },
    exercitii: [
        {
            intrebare: "Care este aproximarea prin lipsă la zecimi a lui 5,78?",
            variante: [
                "5,7",
                "5,8",
                "5,78",
                "6"
            ],
            corect: 0,
            explicatie: "Prin lipsă la zecimi obținem 5,7."
        },
        {
            intrebare: "Care este aproximarea prin adaos la zecimi a lui 5,72?",
            variante: [
                "5,7",
                "5,8",
                "5,72",
                "6"
            ],
            corect: 1,
            explicatie: "Prin adaos la zecimi obținem 5,8."
        },
        {
            intrebare: "Rotunjiți 8,46 la zecimi.",
            variante: [
                "8,4",
                "8,5",
                "8,46",
                "9"
            ],
            corect: 1,
            explicatie: "Cifra sutimilor este 6, deci 8,4 devine 8,5."
        },
        {
            intrebare: "Rotunjiți 12,342 la sutimi.",
            variante: [
                "12,34",
                "12,35",
                "12,3",
                "12,342"
            ],
            corect: 0,
            explicatie: "Cifra miimilor este 2, deci păstrăm sutimea: 12,34."
        },
        {
            intrebare: "Care afirmație despre aproximarea prin lipsă este corectă?",
            variante: [
                "Este întotdeauna mai mare decât numărul.",
                "Este mai mică sau egală cu numărul.",
                "Este întotdeauna egală cu rotunjirea.",
                "Nu depinde de precizie."
            ],
            corect: 1,
            explicatie: "Aproximarea prin lipsă nu depășește numărul inițial."
        },
        {
            intrebare: "Rotunjiți 2,995 la sutimi.",
            variante: [
                "2,99",
                "3,00",
                "2,90",
                "2,95"
            ],
            corect: 1,
            explicatie: "Cifra miimilor este 5, deci rotunjim în sus: 3,00."
        }
    ],
    storageKeyFinalizata: "lectie-estimari-aproximari-finalizata",
    storageKeyXp: "lectie-estimari-aproximari-xp",
    urmatoareaLectie: {
        titlu: "Modulul unui număr real",
        href: "/lectii/modul-numar-real"
    }
};
const lectiaModulNumarReal = {
    id: "modul-numar-real",
    slug: "modul-numar-real",
    modul: 1,
    numarLectie: 3,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Modulul unui număr real",
    descriere: "În această lecție vei înțelege ce înseamnă |x|, cum se calculează modulul și de ce poate fi interpretat ca o distanță.",
    obiective: [
        {
            icon: "📍",
            titlu: "Să înțelegi modulul",
            descriere: "Vei interpreta |x| ca distanța de la x la 0."
        },
        {
            icon: "🧮",
            titlu: "Să calculezi",
            descriere: "Vei calcula modulul numerelor pozitive, negative și al lui 0."
        },
        {
            icon: "📏",
            titlu: "Să folosești distanța",
            descriere: "Vei folosi modulul pentru distanțe și ecuații simple."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este modulul?",
            durata: "4 min",
            descriere: "Modulul reprezintă distanța față de zero.",
            idei: [
                "|x| ≥ 0 pentru orice număr real x.",
                "|5| = 5.",
                "|-5| = 5.",
                "|0| = 0."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Numerele -4 și 4 sunt ambele la distanța 4 față de 0."
        },
        {
            numar: 2,
            titlu: "Formula modulului",
            durata: "4 min",
            descriere: "Înțelegi definiția în funcție de semnul lui x.",
            idei: [
                "Dacă x ≥ 0, atunci |x| = x.",
                "Dacă x < 0, atunci |x| = -x.",
                "Rezultatul modulului nu este negativ."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru x = -7 avem |-7| = -(-7) = 7."
        },
        {
            numar: 3,
            titlu: "Ecuații simple cu modul",
            durata: "4–5 min",
            descriere: "Rezolvi ecuații de forma |x| = a.",
            idei: [
                "Dacă a > 0, avem două soluții: x = a și x = -a.",
                "Dacă a = 0, avem soluția x = 0.",
                "Dacă a < 0, ecuația nu are soluții reale."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "|x| = 4 are soluțiile x = 4 și x = -4."
        },
        {
            numar: 4,
            titlu: "Distanța dintre două numere",
            durata: "4 min",
            descriere: "Aplici formula distanței pe axa numerelor.",
            idei: [
                "Distanța dintre a și b este |a - b|.",
                "Distanța este întotdeauna nenegativă.",
                "|a - b| = |b - a|."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Distanța dintre -2 și 5 este |-2 - 5| = |-7| = 7."
        }
    ],
    fisaRapida: {
        titlu: "Modul în 30 de secunde",
        continut: [
            "|x| reprezintă distanța de la x la 0.",
            "|x| ≥ 0.",
            "Dacă x ≥ 0, |x| = x.",
            "Dacă x < 0, |x| = -x.",
            "|x| = a, a > 0 → x = ±a.",
            "Distanța dintre a și b este |a - b|."
        ]
    },
    exercitii: [
        {
            intrebare: "Cât este |-8|?",
            variante: [
                "-8",
                "8",
                "0",
                "Nu există"
            ],
            corect: 1,
            explicatie: "Modulul reprezintă distanța față de zero. |-8| = 8."
        },
        {
            intrebare: "Cât este |5|?",
            variante: [
                "-5",
                "0",
                "5",
                "10"
            ],
            corect: 2,
            explicatie: "5 este pozitiv, deci |5| = 5."
        },
        {
            intrebare: "Cât este |0|?",
            variante: [
                "0",
                "1",
                "-1",
                "Nu există"
            ],
            corect: 0,
            explicatie: "Numărul 0 se află la distanța 0 față de el însuși."
        },
        {
            intrebare: "Care sunt soluțiile ecuației |x| = 4?",
            variante: [
                "Doar x = 4",
                "Doar x = -4",
                "x = 4 sau x = -4",
                "Ecuația nu are soluții"
            ],
            corect: 2,
            explicatie: "Atât 4, cât și -4 au modulul egal cu 4."
        },
        {
            intrebare: "Ecuația |x| = -3 are:",
            variante: [
                "O soluție",
                "Două soluții",
                "Infinit de multe soluții",
                "Nicio soluție"
            ],
            corect: 3,
            explicatie: "Modulul unui număr real nu poate fi negativ."
        },
        {
            intrebare: "Care este distanța dintre numerele -2 și 5?",
            variante: [
                "3",
                "5",
                "7",
                "-7"
            ],
            corect: 2,
            explicatie: "|-2 - 5| = |-7| = 7."
        }
    ],
    storageKeyFinalizata: "lectie-modul-numar-real-finalizata",
    storageKeyXp: "lectie-modul-numar-real-xp",
    urmatoareaLectie: {
        titlu: "Intervale de numere reale",
        href: "/lectii/intervale-numere-reale"
    }
};
const lectiaIntervaleNumereReale = {
    id: "intervale-numere-reale",
    slug: "intervale-numere-reale",
    modul: 1,
    numarLectie: 4,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Intervale de numere reale",
    descriere: "Înveți să citești și să scrii intervale, să verifici apartenența unui număr și să transformi inecuații simple în intervale.",
    obiective: [
        {
            icon: "↔️",
            titlu: "Să citești intervale",
            descriere: "Vei înțelege capetele incluse și neincluse."
        },
        {
            icon: "✍️",
            titlu: "Să scrii intervale",
            descriere: "Vei transforma condiții cu inegalități în notație de interval."
        },
        {
            icon: "✅",
            titlu: "Să verifici apartenența",
            descriere: "Vei stabili dacă un număr aparține unui interval."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este un interval?",
            durata: "4 min",
            descriere: "Înțelegi intervalele ca mulțimi de numere reale.",
            idei: [
                "[a,b] include ambele capete.",
                "]a,b[ nu include capetele.",
                "[a,b[ include a, dar nu b.",
                "]a,b] nu include a, dar include b."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "[2,5] conține toate numerele reale dintre 2 și 5, inclusiv 2 și 5."
        },
        {
            numar: 2,
            titlu: "Paranteze și inegalități",
            durata: "4–5 min",
            descriere: "Legi simbolurile <, ≤, > și ≥ de notația intervalelor.",
            idei: [
                "≤ sau ≥ înseamnă că valoarea este inclusă.",
                "< sau > înseamnă că valoarea nu este inclusă.",
                "În notația folosită uzual în România: ]a,b[ pentru interval deschis."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "-3 ≤ x < 6 se scrie x ∈ [-3,6[."
        },
        {
            numar: 3,
            titlu: "Intervale nemărginite",
            durata: "4 min",
            descriere: "Înveți intervalele care conțin ±∞.",
            idei: [
                "∞ și -∞ nu sunt numere reale.",
                "Infinitul nu este inclus niciodată.",
                "x ≤ 4 înseamnă x ∈ ]-∞,4].",
                "x ≥ 2 înseamnă x ∈ [2,+∞[."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "x > -1 se scrie x ∈ ]-1,+∞[."
        },
        {
            numar: 4,
            titlu: "Apartenența la interval",
            durata: "4 min",
            descriere: "Verifici rapid dacă un număr aparține intervalului.",
            idei: [
                "Comparăm numărul cu limitele intervalului.",
                "Verificăm dacă extremitățile sunt incluse.",
                "Citirea atentă a parantezelor este esențială."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "3 ∈ [1,5], iar 5 ∉ [1,5[."
        }
    ],
    fisaRapida: {
        titlu: "Intervale pe scurt",
        continut: [
            "[a,b] → a și b sunt incluse.",
            "]a,b[ → a și b nu sunt incluse.",
            "[a,b[ → a inclus, b exclus.",
            "]a,b] → a exclus, b inclus.",
            "Lângă -∞ și +∞ capătul este întotdeauna deschis.",
            "Notația internațională (a,b) este echivalentă cu ]a,b[."
        ]
    },
    exercitii: [
        {
            intrebare: "Ce interval corespunde condiției 2 ≤ x ≤ 5?",
            variante: [
                "[2,5]",
                "]2,5[",
                "[2,5[",
                "]2,5]"
            ],
            corect: 0,
            explicatie: "Ambele capete sunt incluse, deci intervalul este [2,5]."
        },
        {
            intrebare: "Ce interval corespunde condiției 2 < x < 5?",
            variante: [
                "[2,5]",
                "]2,5[",
                "[2,5[",
                "]2,5]"
            ],
            corect: 1,
            explicatie: "Niciun capăt nu este inclus: ]2,5[."
        },
        {
            intrebare: "Care interval reprezintă x ≥ 2?",
            variante: [
                "[2,+∞[",
                "]2,+∞[",
                "]-∞,2]",
                "]-∞,2["
            ],
            corect: 0,
            explicatie: "2 este inclus, iar +∞ nu poate fi inclus: [2,+∞[."
        },
        {
            intrebare: "Care interval reprezintă x < -1?",
            variante: [
                "[-1,+∞[",
                "]-1,+∞[",
                "]-∞,-1[",
                "]-∞,-1]"
            ],
            corect: 2,
            explicatie: "-1 nu este inclus, deci ]-∞,-1[."
        },
        {
            intrebare: "Care este forma pentru -3 ≤ x < 6?",
            variante: [
                "[-3,6[",
                "]-3,6]",
                "[-3,6]",
                "]-3,6["
            ],
            corect: 0,
            explicatie: "-3 este inclus, iar 6 este exclus: [-3,6[."
        },
        {
            intrebare: "Care afirmație este corectă?",
            variante: [
                "Infinitul poate fi inclus.",
                "[1,+∞] este corect.",
                "Infinitul nu este niciodată inclus.",
                "+∞ este cel mai mare număr real."
            ],
            corect: 2,
            explicatie: "+∞ și -∞ nu sunt numere reale și nu sunt incluse în interval."
        }
    ],
    storageKeyFinalizata: "lectie-intervale-numere-reale-finalizata",
    storageKeyXp: "lectie-intervale-numere-reale-xp",
    urmatoareaLectie: {
        titlu: "Propoziții și predicate",
        href: "/lectii/propozitii-predicate"
    }
};
const lectiaPropozitiiPredicate = {
    id: "propozitii-predicate",
    slug: "propozitii-predicate",
    modul: 1,
    numarLectie: 5,
    totalLectiiModul: 10,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Propoziții și predicate",
    descriere: "În această lecție vei înțelege diferența dintre o propoziție matematică și un predicat și vei învăța să găsești mulțimea de adevăr.",
    obiective: [
        {
            icon: "✅",
            titlu: "Să recunoști propoziții",
            descriere: "Vei identifica enunțurile adevărate sau false."
        },
        {
            icon: "🔤",
            titlu: "Să recunoști predicate",
            descriere: "Vei observa când adevărul depinde de o variabilă."
        },
        {
            icon: "🎯",
            titlu: "Să găsești mulțimea de adevăr",
            descriere: "Vei determina valorile pentru care predicatul este adevărat."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este o propoziție matematică?",
            durata: "3–4 min",
            descriere: "Înveți ce înseamnă valoare de adevăr.",
            idei: [
                "O propoziție are o valoare de adevăr.",
                "Poate fi adevărată sau falsă.",
                "O întrebare nu este propoziție matematică."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2 + 3 = 5 este propoziție adevărată."
        },
        {
            numar: 2,
            titlu: "Ce este un predicat?",
            durata: "4 min",
            descriere: "Înțelegi enunțurile care depind de o variabilă.",
            idei: [
                "Predicatul conține una sau mai multe variabile.",
                "Adevărul depinde de valorile variabilelor.",
                "Prin înlocuire obținem o propoziție."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "P(x): x + 2 = 5 este adevărat pentru x = 3."
        },
        {
            numar: 3,
            titlu: "Propoziție sau predicat?",
            durata: "4–5 min",
            descriere: "Înveți să faci rapid diferența.",
            idei: [
                "Valoare de adevăr deja stabilită → propoziție.",
                "Adevăr dependent de variabilă → predicat.",
                "Întrebările și comenzile nu sunt propoziții matematice."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "5 > 2 este propoziție, iar x > 2 este predicat."
        },
        {
            numar: 4,
            titlu: "Mulțimea de adevăr",
            durata: "4–5 min",
            descriere: "Determini valorile care fac predicatul adevărat.",
            idei: [
                "Pornim de la domeniul variabilei.",
                "Rezolvăm condiția.",
                "Păstrăm valorile admise."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "P(x): x > 2, x ∈ {1,2,3,4} are mulțimea de adevăr {3,4}."
        }
    ],
    fisaRapida: {
        titlu: "Diferența esențială",
        continut: [
            "Propoziție = enunț adevărat sau fals.",
            "Predicat = enunț al cărui adevăr depinde de variabilă.",
            "Prin atribuirea unei valori, predicatul devine propoziție.",
            "Mulțimea de adevăr conține valorile care fac predicatul adevărat."
        ]
    },
    exercitii: [
        {
            intrebare: "Care enunț este propoziție matematică?",
            variante: [
                "x + 2 = 7",
                "Cât este 2 + 2?",
                "3 + 4 = 7",
                "Calculează suma"
            ],
            corect: 2,
            explicatie: "3 + 4 = 7 are o valoare de adevăr clară."
        },
        {
            intrebare: "„9 este număr par” este:",
            variante: [
                "Predicat",
                "Propoziție adevărată",
                "Propoziție falsă",
                "Nu este enunț matematic"
            ],
            corect: 2,
            explicatie: "Este o propoziție falsă."
        },
        {
            intrebare: "Care este un predicat?",
            variante: [
                "5 < 8",
                "x + 1 = 4",
                "10 este număr natural",
                "2 + 2 = 4"
            ],
            corect: 1,
            explicatie: "Adevărul lui x + 1 = 4 depinde de x."
        },
        {
            intrebare: "Pentru P(x): x + 1 = 4, ce valoare îl face adevărat?",
            variante: [
                "1",
                "2",
                "3",
                "4"
            ],
            corect: 2,
            explicatie: "x + 1 = 4 ⇒ x = 3."
        },
        {
            intrebare: "P(x): x > 2, cu x ∈ {1,2,3,4}. Care este mulțimea de adevăr?",
            variante: [
                "{1,2}",
                "{2,3}",
                "{3,4}",
                "{1,4}"
            ],
            corect: 2,
            explicatie: "Valorile mai mari decât 2 sunt 3 și 4."
        },
        {
            intrebare: "Care afirmație este corectă?",
            variante: [
                "Orice întrebare este propoziție.",
                "Un predicat are mereu aceeași valoare de adevăr.",
                "O propoziție poate fi adevărată sau falsă.",
                "O propoziție trebuie să conțină o variabilă."
            ],
            corect: 2,
            explicatie: "O propoziție matematică poate fi adevărată sau falsă."
        }
    ],
    storageKeyFinalizata: "lectie-propozitii-predicate-finalizata",
    storageKeyXp: "lectie-propozitii-predicate-xp",
    urmatoareaLectie: {
        titlu: "Cuantificatori",
        href: "/lectii/cuantificatori"
    }
};
;
const lectiiModul1 = [
    lectiaNumereReale,
    lectiaEstimariAproximari,
    lectiaModulNumarReal,
    lectiaIntervaleNumereReale,
    lectiaPropozitiiPredicate,
    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2d$vechi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiaCuantificatori"],
    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2d$vechi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiaOperatiiLogice"],
    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2d$vechi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiaOperatiiMultimi"],
    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2d$vechi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiaInductiaMatematica"],
    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2d$vechi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiaDemonstratii"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/lectii/modul-2.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lectiaCompunereaFunctiilor",
    ()=>lectiaCompunereaFunctiilor,
    "lectiaDomeniuCodomeniuImagine",
    ()=>lectiaDomeniuCodomeniuImagine,
    "lectiaEgalitateaFunctiilor",
    ()=>lectiaEgalitateaFunctiilor,
    "lectiaGraficulUneiFunctii",
    ()=>lectiaGraficulUneiFunctii,
    "lectiaLecturiGrafice",
    ()=>lectiaLecturiGrafice,
    "lectiaMonotonieMarginire",
    ()=>lectiaMonotonieMarginire,
    "lectiaNotiuneaDeFunctie",
    ()=>lectiaNotiuneaDeFunctie,
    "lectiaParitateImparitate",
    ()=>lectiaParitateImparitate,
    "lectiaPeriodicitate",
    ()=>lectiaPeriodicitate,
    "lectiaProgresiiAritmetice",
    ()=>lectiaProgresiiAritmetice,
    "lectiaProgresiiGeometrice",
    ()=>lectiaProgresiiGeometrice,
    "lectiaReperCartezian",
    ()=>lectiaReperCartezian,
    "lectiaRestrictiaFunctiei",
    ()=>lectiaRestrictiaFunctiei,
    "lectiaSiruriNumereReale",
    ()=>lectiaSiruriNumereReale,
    "lectiiModul2",
    ()=>lectiiModul2
]);
const lectiaReperCartezian = {
    id: "reper-cartezian-produs-cartezian",
    slug: "reper-cartezian-produs-cartezian",
    modul: 2,
    numarLectie: 1,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Reper cartezian și produs cartezian",
    descriere: "Înveți cum localizăm puncte în plan, cum identificăm cadranele și cum reprezentăm produsul cartezian al două mulțimi numerice.",
    obiective: [
        {
            icon: "📍",
            titlu: "Să citești coordonate",
            descriere: "Vei identifica abscisa și ordonata unui punct."
        },
        {
            icon: "🧭",
            titlu: "Să recunoști cadranele",
            descriere: "Vei determina cadranul unui punct după semnele coordonatelor."
        },
        {
            icon: "×",
            titlu: "Să înțelegi produsul cartezian",
            descriere: "Vei construi perechi ordonate din două mulțimi."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Reperul cartezian",
            durata: "4 min",
            descriere: "Planul cartezian este format din două axe perpendiculare.",
            idei: [
                "Axa Ox este axa absciselor.",
                "Axa Oy este axa ordonatelor.",
                "Originea este punctul O(0, 0).",
                "Un punct se scrie A(x, y)."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Punctul A(3, 2) are abscisa 3 și ordonata 2."
        },
        {
            numar: 2,
            titlu: "Cele patru cadrane",
            durata: "4 min",
            descriere: "Semnele coordonatelor ne arată în ce cadran se află un punct.",
            idei: [
                "Cadranul I: x > 0 și y > 0.",
                "Cadranul II: x < 0 și y > 0.",
                "Cadranul III: x < 0 și y < 0.",
                "Cadranul IV: x > 0 și y < 0."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Punctul B(-2, 5) se află în cadranul al II-lea."
        },
        {
            numar: 3,
            titlu: "Produsul cartezian",
            durata: "5 min",
            descriere: "Construim mulțimea tuturor perechilor ordonate posibile.",
            idei: [
                "A × B este mulțimea perechilor (a, b).",
                "Primul element aparține lui A.",
                "Al doilea element aparține lui B.",
                "Ordinea elementelor din pereche contează."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă A={1,2} și B={3,4}, atunci A×B={(1,3),(1,4),(2,3),(2,4)}."
        }
    ],
    fisaRapida: {
        titlu: "Ce trebuie să reții",
        continut: [
            "Punctul A(x, y): x este abscisa, y este ordonata.",
            "Originea este O(0,0).",
            "Semnele lui x și y determină cadranul.",
            "A × B conține toate perechile (a,b), cu a∈A și b∈B.",
            "În general, A × B nu este același lucru cu B × A."
        ]
    },
    exercitii: [
        {
            intrebare: "Care este abscisa punctului A(-3, 5)?",
            variante: [
                "5",
                "-3",
                "3",
                "-5"
            ],
            corect: 1,
            explicatie: "Prima coordonată este abscisa, deci abscisa este -3."
        },
        {
            intrebare: "În ce cadran se află punctul B(-2, 4)?",
            variante: [
                "I",
                "II",
                "III",
                "IV"
            ],
            corect: 1,
            explicatie: "x este negativ, iar y pozitiv, deci punctul este în cadranul II."
        },
        {
            intrebare: "Punctul C(4, -1) se află în cadranul:",
            variante: [
                "I",
                "II",
                "III",
                "IV"
            ],
            corect: 3,
            explicatie: "x > 0 și y < 0 corespund cadranului IV."
        },
        {
            intrebare: "Dacă A={1,2} și B={3}, atunci A×B este:",
            variante: [
                "{(1,3),(2,3)}",
                "{(3,1),(3,2)}",
                "{1,2,3}",
                "{(1,2,3)}"
            ],
            corect: 0,
            explicatie: "Primul element al perechii vine din A, al doilea din B."
        },
        {
            intrebare: "Ce punct reprezintă originea reperului?",
            variante: [
                "(1,1)",
                "(0,1)",
                "(1,0)",
                "(0,0)"
            ],
            corect: 3,
            explicatie: "Originea axelor are ambele coordonate egale cu zero."
        }
    ],
    storageKeyFinalizata: "lectie-reper-cartezian-produs-cartezian-finalizata",
    storageKeyXp: "lectie-reper-cartezian-produs-cartezian-xp",
    urmatoareaLectie: {
        titlu: "Noțiunea de funcție",
        href: "/lectii/notiunea-de-functie"
    }
};
const lectiaNotiuneaDeFunctie = {
    id: "notiunea-de-functie",
    slug: "notiunea-de-functie",
    modul: 2,
    numarLectie: 2,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Noțiunea de funcție",
    descriere: "Înveți ce este o funcție și cum deosebim o funcție de o corespondență care nu este funcție.",
    obiective: [
        {
            icon: "f",
            titlu: "Să recunoști o funcție",
            descriere: "Vei înțelege regula fundamentală a unei funcții."
        },
        {
            icon: "→",
            titlu: "Să citești notația",
            descriere: "Vei interpreta corect scrierea f: A → B."
        },
        {
            icon: "🧠",
            titlu: "Să identifici cazurile greșite",
            descriere: "Vei recunoaște corespondențele care nu sunt funcții."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este o funcție?",
            durata: "4 min",
            descriere: "O funcție asociază fiecărui element din domeniu exact o valoare.",
            idei: [
                "Fiecărui x din domeniu îi corespunde o singură valoare.",
                "Notația uzuală este f: A → B.",
                "Scriem y=f(x).",
                "Aceeași valoare y poate corespunde mai multor valori x."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x)=2x+1 este o funcție: pentru fiecare x obținem exact o valoare."
        },
        {
            numar: 2,
            titlu: "Ce NU este o funcție?",
            durata: "4 min",
            descriere: "Vedem situațiile în care regula funcției nu este respectată.",
            idei: [
                "Un x nu poate avea două imagini diferite.",
                "Fiecare element din domeniu trebuie să aibă imagine.",
                "Mai multe valori x pot avea aceeași imagine."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă lui x=1 îi asociem simultan 2 și 3, corespondența nu este funcție."
        },
        {
            numar: 3,
            titlu: "Calcularea valorilor unei funcții",
            durata: "5 min",
            descriere: "Înlocuim x cu valoarea cerută în formula funcției.",
            idei: [
                "Pentru f(2), înlocuim x cu 2.",
                "Respectăm ordinea operațiilor.",
                "Rezultatul este imaginea lui 2 prin funcția f."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă f(x)=3x-1, atunci f(2)=3·2-1=5."
        }
    ],
    fisaRapida: {
        titlu: "Definiția practică",
        continut: [
            "O funcție atribuie fiecărui element din domeniu exact o imagine.",
            "f: A → B înseamnă funcție de la A la B.",
            "f(x) este imaginea lui x.",
            "Un x nu poate avea două imagini diferite."
        ]
    },
    exercitii: [
        {
            intrebare: "Dacă f(x)=2x+3, atunci f(1) este:",
            variante: [
                "2",
                "3",
                "5",
                "6"
            ],
            corect: 2,
            explicatie: "f(1)=2·1+3=5."
        },
        {
            intrebare: "Într-o funcție, unui element din domeniu îi pot corespunde:",
            variante: [
                "Exact două imagini",
                "Exact o imagine",
                "Oricâte imagini",
                "Nicio imagine"
            ],
            corect: 1,
            explicatie: "Aceasta este condiția fundamentală pentru a avea o funcție."
        },
        {
            intrebare: "Dacă f(x)=x², atunci f(-3)=",
            variante: [
                "-9",
                "9",
                "-6",
                "6"
            ],
            corect: 1,
            explicatie: "(-3)²=9."
        },
        {
            intrebare: "Ce reprezintă f(x)?",
            variante: [
                "Imaginea lui x",
                "Domeniul",
                "Codomeniul",
                "Axa Ox"
            ],
            corect: 0,
            explicatie: "f(x) este valoarea asociată lui x prin funcția f."
        },
        {
            intrebare: "O corespondență în care același x are două valori diferite este:",
            variante: [
                "Întotdeauna funcție",
                "Nu este funcție",
                "Funcție constantă",
                "Funcție periodică"
            ],
            corect: 1,
            explicatie: "Un element din domeniu trebuie să aibă o singură imagine."
        }
    ],
    storageKeyFinalizata: "lectie-notiunea-de-functie-finalizata",
    storageKeyXp: "lectie-notiunea-de-functie-xp",
    urmatoareaLectie: {
        titlu: "Domeniu, codomeniu și imagine",
        href: "/lectii/domeniu-codomeniu-imagine"
    }
};
const lectiaDomeniuCodomeniuImagine = {
    id: "domeniu-codomeniu-imagine",
    slug: "domeniu-codomeniu-imagine",
    modul: 2,
    numarLectie: 3,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Domeniu, codomeniu și imagine",
    descriere: "Înveți să identifici domeniul, codomeniul și imaginile elementelor printr-o funcție.",
    obiective: [
        {
            icon: "D",
            titlu: "Să identifici domeniul",
            descriere: "Vei vedea de unde pot fi alese valorile lui x."
        },
        {
            icon: "B",
            titlu: "Să recunoști codomeniul",
            descriere: "Vei identifica mulțimea în care ajung valorile."
        },
        {
            icon: "f(x)",
            titlu: "Să calculezi imagini",
            descriere: "Vei determina imaginea unui element sau a unei mulțimi."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Domeniul",
            durata: "4 min",
            descriere: "Domeniul este mulțimea valorilor pentru care funcția este definită.",
            idei: [
                "În f:A→B, A este domeniul.",
                "Valorile lui x sunt alese din domeniu.",
                "Unele formule impun restricții asupra domeniului."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x)=1/x, x=0 nu este permis deoarece nu putem împărți la zero."
        },
        {
            numar: 2,
            titlu: "Codomeniul",
            durata: "4 min",
            descriere: "Codomeniul este mulțimea în care sunt declarate valorile funcției.",
            idei: [
                "În f:A→B, B este codomeniul.",
                "Codomeniul face parte din definiția funcției.",
                "Nu trebuie confundat automat cu mulțimea valorilor efectiv obținute."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă f:R→R, f(x)=x², codomeniul este R, chiar dacă valorile funcției sunt nenegative."
        },
        {
            numar: 3,
            titlu: "Imaginea",
            durata: "5 min",
            descriere: "Imaginea unui element este valoarea obținută prin aplicarea funcției.",
            idei: [
                "Imaginea lui x este f(x).",
                "Imaginea unei mulțimi se obține aplicând funcția elementelor ei.",
                "Valoarea obținută trebuie să aparțină codomeniului."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x)=x+2, imaginea lui 3 este f(3)=5."
        }
    ],
    fisaRapida: {
        titlu: "A → B",
        continut: [
            "A = domeniul.",
            "B = codomeniul.",
            "x ∈ A.",
            "f(x) ∈ B.",
            "Imaginea lui x este f(x)."
        ]
    },
    exercitii: [
        {
            intrebare: "În notația f:A→B, domeniul este:",
            variante: [
                "A",
                "B",
                "f",
                "x"
            ],
            corect: 0,
            explicatie: "Mulțimea A este domeniul funcției."
        },
        {
            intrebare: "În notația f:A→B, codomeniul este:",
            variante: [
                "A",
                "B",
                "x",
                "f(x)"
            ],
            corect: 1,
            explicatie: "Mulțimea B este codomeniul."
        },
        {
            intrebare: "Pentru f(x)=x+4, imaginea lui 2 este:",
            variante: [
                "2",
                "4",
                "6",
                "8"
            ],
            corect: 2,
            explicatie: "f(2)=2+4=6."
        },
        {
            intrebare: "Pentru f(x)=1/x, care valoare trebuie exclusă?",
            variante: [
                "1",
                "-1",
                "0",
                "2"
            ],
            corect: 2,
            explicatie: "Împărțirea la zero nu este definită."
        },
        {
            intrebare: "Pentru f(x)=x², imaginea lui -2 este:",
            variante: [
                "-4",
                "4",
                "-2",
                "2"
            ],
            corect: 1,
            explicatie: "(-2)²=4."
        }
    ],
    storageKeyFinalizata: "lectie-domeniu-codomeniu-imagine-finalizata",
    storageKeyXp: "lectie-domeniu-codomeniu-imagine-xp",
    urmatoareaLectie: {
        titlu: "Graficul unei funcții",
        href: "/lectii/graficul-unei-functii"
    }
};
const lectiaGraficulUneiFunctii = {
    id: "graficul-unei-functii",
    slug: "graficul-unei-functii",
    modul: 2,
    numarLectie: 4,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Graficul unei funcții",
    descriere: "Înveți ce reprezintă graficul unei funcții și cum verificăm dacă un punct aparține acestuia.",
    obiective: [
        {
            icon: "📈",
            titlu: "Să înțelegi graficul",
            descriere: "Vei conecta formula unei funcții cu punctele din plan."
        },
        {
            icon: "•",
            titlu: "Să verifici puncte",
            descriere: "Vei verifica dacă un punct aparține graficului."
        },
        {
            icon: "🧮",
            titlu: "Să construiești puncte",
            descriere: "Vei calcula valori și le vei transforma în coordonate."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este graficul?",
            durata: "4 min",
            descriere: "Graficul este format din punctele ale căror coordonate respectă relația y=f(x).",
            idei: [
                "Un punct de pe grafic are forma (x,f(x)).",
                "Coordonata y este calculată cu formula funcției.",
                "Graficul reprezintă vizual comportamentul funcției."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x)=2x, punctul (3,6) aparține graficului."
        },
        {
            numar: 2,
            titlu: "Tabel de valori",
            durata: "5 min",
            descriere: "Alegem valori pentru x și calculăm valorile corespunzătoare y.",
            idei: [
                "Alegem câteva valori x.",
                "Calculăm f(x).",
                "Obținem puncte (x,f(x))."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x)=x+1: x=0 dă (0,1), iar x=2 dă (2,3)."
        },
        {
            numar: 3,
            titlu: "Verificarea apartenenței",
            durata: "4 min",
            descriere: "Înlocuim coordonata x în formula funcției și comparăm rezultatul cu y.",
            idei: [
                "Calculăm f(x₀).",
                "Comparăm cu y₀.",
                "Dacă y₀=f(x₀), punctul aparține graficului."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "P(2,5) aparține graficului lui f(x)=2x+1 deoarece f(2)=5."
        }
    ],
    fisaRapida: {
        titlu: "Testul unui punct",
        continut: [
            "P(x₀,y₀) aparține graficului dacă y₀=f(x₀).",
            "Graficul este format din puncte (x,f(x)).",
            "Un tabel de valori ne ajută să construim graficul."
        ]
    },
    exercitii: [
        {
            intrebare: "Pentru f(x)=x+2, care punct aparține graficului?",
            variante: [
                "(1,1)",
                "(1,2)",
                "(1,3)",
                "(2,1)"
            ],
            corect: 2,
            explicatie: "f(1)=3, deci (1,3) aparține graficului."
        },
        {
            intrebare: "Pentru f(x)=2x, punctul (4,8):",
            variante: [
                "Aparține graficului",
                "Nu aparține",
                "Este originea",
                "Nu poate fi verificat"
            ],
            corect: 0,
            explicatie: "2·4=8."
        },
        {
            intrebare: "Graficul unei funcții este format din puncte de forma:",
            variante: [
                "(f(x),x)",
                "(x,f(x))",
                "(x,x)",
                "(0,f(x))"
            ],
            corect: 1,
            explicatie: "Prima coordonată este x, iar a doua este valoarea funcției."
        },
        {
            intrebare: "Dacă f(3)=7, ce punct aparține graficului?",
            variante: [
                "(7,3)",
                "(3,7)",
                "(3,3)",
                "(7,7)"
            ],
            corect: 1,
            explicatie: "Punctul este (x,f(x))=(3,7)."
        },
        {
            intrebare: "Pentru f(x)=x², punctul (-2,4):",
            variante: [
                "Aparține",
                "Nu aparține",
                "Nu are sens",
                "Este pe Oy"
            ],
            corect: 0,
            explicatie: "f(-2)=4."
        }
    ],
    storageKeyFinalizata: "lectie-graficul-unei-functii-finalizata",
    storageKeyXp: "lectie-graficul-unei-functii-xp",
    urmatoareaLectie: {
        titlu: "Lecturi grafice",
        href: "/lectii/lecturi-grafice"
    }
};
const lectiaLecturiGrafice = {
    id: "lecturi-grafice",
    slug: "lecturi-grafice",
    modul: 2,
    numarLectie: 5,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Lecturi grafice",
    descriere: "Înveți să extragi informații matematice direct din reprezentarea grafică a unei funcții.",
    obiective: [
        {
            icon: "🔍",
            titlu: "Să citești valori",
            descriere: "Vei determina f(x) direct dintr-un grafic."
        },
        {
            icon: "0",
            titlu: "Să găsești zerouri",
            descriere: "Vei identifica intersecțiile graficului cu axa Ox."
        },
        {
            icon: "📊",
            titlu: "Să interpretezi graficul",
            descriere: "Vei extrage informații despre funcție din forma graficului."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Cum citim f(a)",
            durata: "4 min",
            descriere: "Pornim de la valoarea a pe Ox și ajungem la grafic.",
            idei: [
                "Fixăm x=a.",
                "Identificăm punctul corespunzător de pe grafic.",
                "Coordonata verticală este f(a)."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă graficul conține punctul (2,5), atunci f(2)=5."
        },
        {
            numar: 2,
            titlu: "Zerourile funcției",
            durata: "4 min",
            descriere: "Zerourile sunt valorile x pentru care f(x)=0.",
            idei: [
                "Pe grafic, căutăm intersecțiile cu Ox.",
                "În acele puncte y=0.",
                "Abscisele lor sunt soluțiile ecuației f(x)=0."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă graficul intersectează Ox în (3,0), atunci x=3 este un zero al funcției."
        },
        {
            numar: 3,
            titlu: "Intersecția cu Oy",
            durata: "4 min",
            descriere: "Intersecția cu axa Oy apare pentru x=0.",
            idei: [
                "Pe Oy avem x=0.",
                "Punctul de intersecție este (0,f(0)).",
                "Graficul poate oferi rapid această valoare."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă graficul trece prin (0,-2), atunci f(0)=-2."
        }
    ],
    fisaRapida: {
        titlu: "Citirea graficului",
        continut: [
            "Punctul (a,b) de pe grafic înseamnă f(a)=b.",
            "Intersecțiile cu Ox dau soluțiile ecuației f(x)=0.",
            "Intersecția cu Oy se obține pentru x=0.",
            "Graficul poate arăta creșteri, descreșteri și extreme."
        ]
    },
    exercitii: [
        {
            intrebare: "Dacă punctul (4,7) este pe grafic, atunci:",
            variante: [
                "f(7)=4",
                "f(4)=7",
                "f(4)=4",
                "f(7)=7"
            ],
            corect: 1,
            explicatie: "Punctul (x,y) de pe grafic înseamnă y=f(x)."
        },
        {
            intrebare: "Un zero al funcției este o valoare x pentru care:",
            variante: [
                "f(x)=1",
                "f(x)=x",
                "f(x)=0",
                "x=0 obligatoriu"
            ],
            corect: 2,
            explicatie: "Prin definiție, un zero verifică f(x)=0."
        },
        {
            intrebare: "Zerourile funcției se citesc grafic la intersecția cu:",
            variante: [
                "Oy",
                "Ox",
                "Originea obligatoriu",
                "Nicio axă"
            ],
            corect: 1,
            explicatie: "Pe Ox coordonata y este zero."
        },
        {
            intrebare: "Intersecția cu Oy corespunde valorii:",
            variante: [
                "x=0",
                "y=0",
                "x=1",
                "y=1"
            ],
            corect: 0,
            explicatie: "Toate punctele de pe axa Oy au abscisa zero."
        },
        {
            intrebare: "Dacă graficul trece prin (0,3), atunci:",
            variante: [
                "f(3)=0",
                "f(0)=3",
                "f(3)=3",
                "f(0)=0"
            ],
            corect: 1,
            explicatie: "Coordonata verticală este f(0)=3."
        }
    ],
    storageKeyFinalizata: "lectie-lecturi-grafice-finalizata",
    storageKeyXp: "lectie-lecturi-grafice-xp",
    urmatoareaLectie: {
        titlu: "Egalitatea a două funcții",
        href: "/lectii/egalitatea-a-doua-functii"
    }
};
const lectiaEgalitateaFunctiilor = {
    id: "egalitatea-a-doua-functii",
    slug: "egalitatea-a-doua-functii",
    modul: 2,
    numarLectie: 6,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Egalitatea a două funcții",
    descriere: "Înveți condițiile necesare pentru ca două funcții să fie egale.",
    obiective: [
        {
            icon: "=",
            titlu: "Să verifici egalitatea",
            descriere: "Vei verifica domeniul, codomeniul și valorile funcțiilor."
        },
        {
            icon: "D",
            titlu: "Să compari domeniile",
            descriere: "Vei înțelege de ce formula singură nu este suficientă."
        },
        {
            icon: "f=g",
            titlu: "Să compari valorile",
            descriere: "Vei verifica dacă f(x)=g(x) pentru toate valorile din domeniu."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Când sunt două funcții egale?",
            durata: "5 min",
            descriere: "Egalitatea funcțiilor presupune mai mult decât formule asemănătoare.",
            idei: [
                "Funcțiile trebuie să aibă același domeniu.",
                "În definiția completă se ține cont și de codomeniu.",
                "Valorile trebuie să coincidă pentru fiecare x."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x)=x+x și g(x)=2x pe același domeniu au aceleași valori."
        },
        {
            numar: 2,
            titlu: "Aceeași formulă, domenii diferite",
            durata: "4 min",
            descriere: "Două expresii identice pot defini funcții diferite dacă domeniile diferă.",
            idei: [
                "Domeniul face parte din definiția funcției.",
                "Trebuie verificat înainte de compararea formulelor."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f:R→R, f(x)=x² și g:[0,∞)→R, g(x)=x² nu au același domeniu."
        },
        {
            numar: 3,
            titlu: "Simplificarea formulelor",
            durata: "4 min",
            descriere: "Uneori expresiile arată diferit, dar sunt algebric egale.",
            idei: [
                "Simplificăm ambele formule.",
                "Comparăm rezultatele pe întregul domeniu.",
                "Verificăm și eventualele restricții."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x)=(x+1)² și g(x)=x²+2x+1 au aceeași expresie după dezvoltare."
        }
    ],
    fisaRapida: {
        titlu: "Checklist pentru egalitate",
        continut: [
            "Compară domeniile.",
            "Ține cont de codomenii.",
            "Verifică f(x)=g(x) pentru fiecare x din domeniu.",
            "Nu te baza doar pe aspectul formulelor."
        ]
    },
    exercitii: [
        {
            intrebare: "f(x)=2x și g(x)=x+x pe același domeniu sunt:",
            variante: [
                "Egale",
                "Diferite",
                "Constante",
                "Nedefinite"
            ],
            corect: 0,
            explicatie: "x+x=2x pentru fiecare x."
        },
        {
            intrebare: "Două funcții cu aceeași formulă, dar domenii diferite sunt:",
            variante: [
                "Obligatoriu egale",
                "Nu sunt aceeași funcție",
                "Întotdeauna constante",
                "Întotdeauna periodice"
            ],
            corect: 1,
            explicatie: "Domeniul face parte din definiția funcției."
        },
        {
            intrebare: "Care relație este adevărată pentru orice x real?",
            variante: [
                "(x+1)²=x²+2x+1",
                "(x+1)²=x²+1",
                "2x=x+2",
                "x²=x"
            ],
            corect: 0,
            explicatie: "Dezvoltarea corectă este x²+2x+1."
        },
        {
            intrebare: "Pentru funcții egale trebuie ca valorile lor:",
            variante: [
                "Să coincidă pentru toate valorile domeniului",
                "Să coincidă doar pentru x=0",
                "Să fie pozitive",
                "Să fie întregi"
            ],
            corect: 0,
            explicatie: "Egalitatea trebuie să fie valabilă pentru fiecare x din domeniu."
        },
        {
            intrebare: "Care element trebuie verificat înainte de compararea formulelor?",
            variante: [
                "Culoarea graficului",
                "Domeniul",
                "Fontul",
                "Unitatea XP"
            ],
            corect: 1,
            explicatie: "Domeniul este o componentă esențială a funcției."
        }
    ],
    storageKeyFinalizata: "lectie-egalitatea-a-doua-functii-finalizata",
    storageKeyXp: "lectie-egalitatea-a-doua-functii-xp",
    urmatoareaLectie: {
        titlu: "Restricția unei funcții",
        href: "/lectii/restrictia-unei-functii"
    }
};
const lectiaRestrictiaFunctiei = {
    id: "restrictia-unei-functii",
    slug: "restrictia-unei-functii",
    modul: 2,
    numarLectie: 7,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Restricția unei funcții",
    descriere: "Înveți ce înseamnă să păstrăm aceeași regulă a funcției, dar să lucrăm pe o parte mai mică a domeniului.",
    obiective: [
        {
            icon: "⊂",
            titlu: "Să înțelegi restricția",
            descriere: "Vei lucra cu un subdomeniu al funcției inițiale."
        },
        {
            icon: "f",
            titlu: "Să păstrezi regula",
            descriere: "Formula funcției rămâne aceeași pe noul domeniu."
        },
        {
            icon: "📈",
            titlu: "Să interpretezi grafic",
            descriere: "Vei vedea restricția ca pe o parte a graficului inițial."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este o restricție?",
            durata: "4 min",
            descriere: "Limităm domeniul fără să schimbăm valorile funcției pe acel domeniu.",
            idei: [
                "Alegem un subdomeniu.",
                "Formula rămâne aceeași.",
                "Păstrăm doar valorile corespunzătoare noului domeniu."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă f:R→R, f(x)=x², o restricție poate fi aceeași formulă pentru x≥0."
        },
        {
            numar: 2,
            titlu: "Restricția pe grafic",
            durata: "4 min",
            descriere: "Din graficul complet păstrăm numai punctele cu abscise din noul domeniu.",
            idei: [
                "Nu desenăm punctele din afara subdomeniului.",
                "Forma locală a graficului nu se schimbă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru x² restricționată la [0,∞), păstrăm jumătatea din dreapta a parabolei."
        },
        {
            numar: 3,
            titlu: "De ce folosim restricții?",
            durata: "4 min",
            descriere: "Restricțiile permit studierea funcției pe zone de interes.",
            idei: [
                "Putem analiza separat un interval.",
                "Unele proprietăți devin mai ușor de observat.",
                "Restricția va fi importantă și pentru funcții inversabile."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Funcția x² nu este strict crescătoare pe R, dar este crescătoare pe [0,∞)."
        }
    ],
    fisaRapida: {
        titlu: "Restricția",
        continut: [
            "Alegem un domeniu mai mic.",
            "Formula funcției rămâne aceeași.",
            "Graficul restricției este partea corespunzătoare din graficul inițial."
        ]
    },
    exercitii: [
        {
            intrebare: "Prin restricționarea unei funcții se modifică în primul rând:",
            variante: [
                "Domeniul",
                "Formula obligatoriu",
                "Numele axelor",
                "Originea"
            ],
            corect: 0,
            explicatie: "Restricția presupune alegerea unui subdomeniu."
        },
        {
            intrebare: "Pentru f(x)=x² restricționată la x≥0, f(3)=",
            variante: [
                "-9",
                "9",
                "3",
                "0"
            ],
            corect: 1,
            explicatie: "Formula rămâne x², deci f(3)=9."
        },
        {
            intrebare: "Într-o restricție, regula funcției:",
            variante: [
                "Se păstrează",
                "Se schimbă obligatoriu",
                "Dispare",
                "Devine mereu constantă"
            ],
            corect: 0,
            explicatie: "Restricția păstrează regula funcției pe un domeniu mai mic."
        },
        {
            intrebare: "Graficul unei restricții este:",
            variante: [
                "O parte din graficul inițial",
                "Întotdeauna o dreaptă",
                "Întotdeauna o parabolă",
                "Graficul invers"
            ],
            corect: 0,
            explicatie: "Păstrăm punctele corespunzătoare noului domeniu."
        },
        {
            intrebare: "Dacă domeniul inițial este R, care poate fi un subdomeniu?",
            variante: [
                "[0,∞)",
                "Doar R obligatoriu",
                "Niciunul",
                "Numai mulțimea vidă"
            ],
            corect: 0,
            explicatie: "[0,∞) este o submulțime a lui R."
        }
    ],
    storageKeyFinalizata: "lectie-restrictia-unei-functii-finalizata",
    storageKeyXp: "lectie-restrictia-unei-functii-xp",
    urmatoareaLectie: {
        titlu: "Monotonie și mărginire",
        href: "/lectii/monotonie-si-marginire"
    }
};
const lectiaMonotonieMarginire = {
    id: "monotonie-si-marginire",
    slug: "monotonie-si-marginire",
    modul: 2,
    numarLectie: 8,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Monotonie și mărginire",
    descriere: "Înveți să recunoști din formule și grafice când o funcție crește, descrește sau este mărginită.",
    obiective: [
        {
            icon: "↗",
            titlu: "Să recunoști creșterea",
            descriere: "Vei identifica funcții crescătoare."
        },
        {
            icon: "↘",
            titlu: "Să recunoști descreșterea",
            descriere: "Vei identifica funcții descrescătoare."
        },
        {
            icon: "↕",
            titlu: "Să înțelegi mărginirea",
            descriere: "Vei recunoaște existența limitelor superioare și inferioare."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Funcții crescătoare",
            durata: "5 min",
            descriere: "Când x crește, valorile funcției evoluează în aceeași direcție.",
            idei: [
                "Comparăm x₁<x₂.",
                "Pentru o funcție crescătoare, f(x₁)≤f(x₂).",
                "Graficul tinde să urce de la stânga la dreapta."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x)=2x este strict crescătoare pe R."
        },
        {
            numar: 2,
            titlu: "Funcții descrescătoare",
            durata: "5 min",
            descriere: "Pe măsură ce x crește, valorile funcției scad.",
            idei: [
                "Pentru x₁<x₂, valorile merg în sens opus.",
                "Graficul coboară de la stânga la dreapta."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x)=-x este strict descrescătoare pe R."
        },
        {
            numar: 3,
            titlu: "Funcții mărginite",
            durata: "5 min",
            descriere: "Valorile unei funcții pot rămâne sub sau peste anumite limite.",
            idei: [
                "Mărginită superior înseamnă f(x)≤M.",
                "Mărginită inferior înseamnă f(x)≥m.",
                "Mărginită înseamnă ambele condiții."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x)=x² este mărginită inferior de 0."
        }
    ],
    fisaRapida: {
        titlu: "Monotonie și mărginire",
        continut: [
            "Crescătoare: valori mai mari ale lui x nu produc valori mai mici ale funcției.",
            "Descrescătoare: valorile funcției evoluează în sens opus lui x.",
            "Mărginită superior: există M cu f(x)≤M.",
            "Mărginită inferior: există m cu f(x)≥m."
        ]
    },
    exercitii: [
        {
            intrebare: "Funcția f(x)=x este:",
            variante: [
                "Crescătoare",
                "Descrescătoare",
                "Constantă",
                "Nedefinită"
            ],
            corect: 0,
            explicatie: "Când x crește, și f(x)=x crește."
        },
        {
            intrebare: "Funcția f(x)=-x este:",
            variante: [
                "Crescătoare",
                "Descrescătoare",
                "Pară",
                "Constantă"
            ],
            corect: 1,
            explicatie: "Valorile scad când x crește."
        },
        {
            intrebare: "Funcția f(x)=x² este mărginită inferior de:",
            variante: [
                "0",
                "-1",
                "-∞ ca număr real",
                "10"
            ],
            corect: 0,
            explicatie: "x²≥0 pentru orice x real."
        },
        {
            intrebare: "Mărginită superior înseamnă că există M astfel încât:",
            variante: [
                "f(x)≤M",
                "f(x)≥M",
                "f(x)=M pentru orice x",
                "x≤M"
            ],
            corect: 0,
            explicatie: "M este o limită superioară pentru valorile funcției."
        },
        {
            intrebare: "Graficul unei funcții crescătoare, citit de la stânga la dreapta:",
            variante: [
                "Tinde să urce",
                "Tinde să coboare",
                "Dispare",
                "Este mereu orizontal"
            ],
            corect: 0,
            explicatie: "Aceasta este interpretarea geometrică intuitivă a creșterii."
        }
    ],
    storageKeyFinalizata: "lectie-monotonie-si-marginire-finalizata",
    storageKeyXp: "lectie-monotonie-si-marginire-xp",
    urmatoareaLectie: {
        titlu: "Paritate și imparitate",
        href: "/lectii/paritate-si-imparitate"
    }
};
const lectiaParitateImparitate = {
    id: "paritate-si-imparitate",
    slug: "paritate-si-imparitate",
    modul: 2,
    numarLectie: 9,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Paritate și imparitate",
    descriere: "Înveți să recunoști funcțiile pare și impare și simetriile graficelor lor.",
    obiective: [
        {
            icon: "±",
            titlu: "Să verifici f(-x)",
            descriere: "Vei folosi formula funcției pentru a testa paritatea."
        },
        {
            icon: "↔",
            titlu: "Să recunoști funcții pare",
            descriere: "Vei identifica simetria față de axa Oy."
        },
        {
            icon: "⤢",
            titlu: "Să recunoști funcții impare",
            descriere: "Vei identifica simetria față de origine."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Funcția pară",
            durata: "4 min",
            descriere: "O funcție pară verifică relația f(-x)=f(x).",
            idei: [
                "Domeniul trebuie să permită compararea lui x cu -x.",
                "Graficul este simetric față de Oy."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x)=x², f(-x)=(-x)²=x²=f(x)."
        },
        {
            numar: 2,
            titlu: "Funcția impară",
            durata: "4 min",
            descriere: "O funcție impară verifică f(-x)=-f(x).",
            idei: [
                "Graficul are simetrie față de origine.",
                "Schimbarea semnului lui x schimbă semnul valorii."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x)=x³, f(-x)=-x³=-f(x)."
        },
        {
            numar: 3,
            titlu: "Nici pară, nici impară",
            durata: "4 min",
            descriere: "Nu orice funcție trebuie să aparțină uneia dintre cele două categorii.",
            idei: [
                "Calculăm f(-x).",
                "Comparăm cu f(x) și -f(x).",
                "Dacă nu coincide cu niciuna, funcția nu este nici pară, nici impară."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x)=x+1 nu este nici pară, nici impară."
        }
    ],
    fisaRapida: {
        titlu: "Testul parității",
        continut: [
            "Pară: f(-x)=f(x).",
            "Impară: f(-x)=-f(x).",
            "Pară → simetrie față de Oy.",
            "Impară → simetrie față de origine."
        ]
    },
    exercitii: [
        {
            intrebare: "Funcția f(x)=x² este:",
            variante: [
                "Pară",
                "Impară",
                "Niciuna",
                "Periodică obligatoriu"
            ],
            corect: 0,
            explicatie: "f(-x)=(-x)²=x²=f(x)."
        },
        {
            intrebare: "Funcția f(x)=x³ este:",
            variante: [
                "Pară",
                "Impară",
                "Constantă",
                "Niciuna"
            ],
            corect: 1,
            explicatie: "f(-x)=-x³=-f(x)."
        },
        {
            intrebare: "Graficul unei funcții pare este simetric față de:",
            variante: [
                "Ox",
                "Oy",
                "Origine",
                "Dreapta y=x"
            ],
            corect: 1,
            explicatie: "Funcțiile pare au simetrie față de axa Oy."
        },
        {
            intrebare: "Pentru o funcție impară avem:",
            variante: [
                "f(-x)=f(x)",
                "f(-x)=-f(x)",
                "f(x)=0 mereu",
                "f(-x)=x"
            ],
            corect: 1,
            explicatie: "Aceasta este relația caracteristică funcțiilor impare."
        },
        {
            intrebare: "Funcția f(x)=x+1 este:",
            variante: [
                "Pară",
                "Impară",
                "Nici pară, nici impară",
                "Zero"
            ],
            corect: 2,
            explicatie: "f(-x)=-x+1 nu este nici f(x), nici -f(x)."
        }
    ],
    storageKeyFinalizata: "lectie-paritate-si-imparitate-finalizata",
    storageKeyXp: "lectie-paritate-si-imparitate-xp",
    urmatoareaLectie: {
        titlu: "Periodicitate",
        href: "/lectii/periodicitate"
    }
};
const lectiaPeriodicitate = {
    id: "periodicitate",
    slug: "periodicitate",
    modul: 2,
    numarLectie: 10,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Periodicitate",
    descriere: "Înveți ce înseamnă ca valorile unei funcții să se repete după un anumit interval.",
    obiective: [
        {
            icon: "🔁",
            titlu: "Să înțelegi perioada",
            descriere: "Vei interpreta relația f(x+T)=f(x)."
        },
        {
            icon: "T",
            titlu: "Să verifici o perioadă",
            descriere: "Vei testa algebric dacă o valoare este perioadă."
        },
        {
            icon: "📈",
            titlu: "Să recunoști repetarea grafică",
            descriere: "Vei identifica modele care se repetă."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este o funcție periodică?",
            durata: "4 min",
            descriere: "Valorile unei funcții periodice se repetă după o distanță fixă.",
            idei: [
                "Există T>0 cu f(x+T)=f(x).",
                "T se numește perioadă.",
                "Graficul repetă aceeași formă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Funcțiile trigonometrice oferă exemple clasice de funcții periodice."
        },
        {
            numar: 2,
            titlu: "Verificarea unei perioade",
            durata: "4 min",
            descriere: "Înlocuim x cu x+T și comparăm rezultatul cu f(x).",
            idei: [
                "Calculăm f(x+T).",
                "Simplificăm.",
                "Dacă obținem f(x) pentru toate valorile admise, T este perioadă."
            ],
            exempluTitlu: "Exemplu conceptual",
            exemplu: "Dacă valorile unei funcții se repetă la fiecare 4 unități, atunci 4 este o perioadă."
        },
        {
            numar: 3,
            titlu: "Citirea periodicității din grafic",
            durata: "4 min",
            descriere: "Observăm distanța orizontală după care modelul grafic se repetă.",
            idei: [
                "Căutăm două porțiuni identice consecutive.",
                "Măsurăm distanța pe axa Ox.",
                "Repetarea trebuie să continue pe domeniul funcției."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă același model reapare la x, x+3, x+6, atunci 3 poate fi o perioadă."
        }
    ],
    fisaRapida: {
        titlu: "Periodicitate",
        continut: [
            "T>0 este perioadă dacă f(x+T)=f(x).",
            "Graficul unei funcții periodice se repetă.",
            "Periodicitatea poate fi verificată algebric sau grafic."
        ]
    },
    exercitii: [
        {
            intrebare: "Relația caracteristică unei perioade T este:",
            variante: [
                "f(x+T)=f(x)",
                "f(x+T)=x",
                "f(T)=0",
                "f(x)=T"
            ],
            corect: 0,
            explicatie: "Aceasta exprimă repetarea valorilor după T unități."
        },
        {
            intrebare: "O perioadă T trebuie să fie:",
            variante: [
                "Pozitivă",
                "Obligatoriu zero",
                "Negativă obligatoriu",
                "Irațională"
            ],
            corect: 0,
            explicatie: "În definiție se consideră T>0."
        },
        {
            intrebare: "Graficul unei funcții periodice:",
            variante: [
                "Repetă un model",
                "Este mereu o dreaptă",
                "Este mereu o parabolă",
                "Nu poate intersecta Ox"
            ],
            corect: 0,
            explicatie: "Caracteristica vizuală este repetarea formei."
        },
        {
            intrebare: "Dacă o funcție repetă aceeași valoare la fiecare 5 unități, 5 poate fi:",
            variante: [
                "O perioadă",
                "Domeniul",
                "Codomeniul",
                "Un zero obligatoriu"
            ],
            corect: 0,
            explicatie: "Repetarea după 5 unități indică o posibilă perioadă."
        },
        {
            intrebare: "Pentru a verifica algebric T calculăm:",
            variante: [
                "f(x+T)",
                "f(0) numai",
                "T²",
                "x/T numai"
            ],
            corect: 0,
            explicatie: "Apoi comparăm f(x+T) cu f(x)."
        }
    ],
    storageKeyFinalizata: "lectie-periodicitate-finalizata",
    storageKeyXp: "lectie-periodicitate-xp",
    urmatoareaLectie: {
        titlu: "Compunerea funcțiilor",
        href: "/lectii/compunerea-functiilor"
    }
};
const lectiaCompunereaFunctiilor = {
    id: "compunerea-functiilor",
    slug: "compunerea-functiilor",
    modul: 2,
    numarLectie: 11,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Compunerea funcțiilor",
    descriere: "Înveți să aplici două funcții succesiv și să calculezi expresii de forma (f∘g)(x).",
    obiective: [
        {
            icon: "∘",
            titlu: "Să înțelegi compunerea",
            descriere: "Vei aplica mai întâi o funcție și apoi cealaltă."
        },
        {
            icon: "f(g(x))",
            titlu: "Să calculezi formule",
            descriere: "Vei determina formule pentru funcții compuse."
        },
        {
            icon: "↔",
            titlu: "Să respecți ordinea",
            descriere: "Vei vedea că f∘g și g∘f nu sunt în general egale."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este compunerea?",
            durata: "5 min",
            descriere: "Rezultatul primei funcții devine intrarea celei de-a doua.",
            idei: [
                "(f∘g)(x)=f(g(x)).",
                "Mai întâi calculăm g(x).",
                "Apoi aplicăm f rezultatului."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă f(x)=x+1 și g(x)=2x, atunci (f∘g)(x)=2x+1."
        },
        {
            numar: 2,
            titlu: "Ordinea contează",
            durata: "5 min",
            descriere: "Schimbarea ordinii funcțiilor poate produce alt rezultat.",
            idei: [
                "f∘g înseamnă f după g.",
                "g∘f înseamnă g după f.",
                "În general, cele două rezultate sunt diferite."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Cu f(x)=x+1 și g(x)=2x, (g∘f)(x)=2x+2."
        },
        {
            numar: 3,
            titlu: "Domeniul compunerii",
            durata: "5 min",
            descriere: "Trebuie ca valoarea produsă de prima funcție să poată fi introdusă în următoarea.",
            idei: [
                "x trebuie să fie admis de g.",
                "g(x) trebuie să fie admis de f.",
                "Restricțiile de domeniu trebuie verificate."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă f(t)=1/t, atunci pentru f(g(x)) trebuie să avem g(x)≠0."
        }
    ],
    fisaRapida: {
        titlu: "Compunerea",
        continut: [
            "(f∘g)(x)=f(g(x)).",
            "Începem cu funcția din interior.",
            "Ordinea funcțiilor contează.",
            "Trebuie verificat domeniul."
        ]
    },
    exercitii: [
        {
            intrebare: "Dacă f(x)=x+1 și g(x)=2x, atunci (f∘g)(x)=",
            variante: [
                "2x+1",
                "2x+2",
                "x+3",
                "2x"
            ],
            corect: 0,
            explicatie: "f(g(x))=f(2x)=2x+1."
        },
        {
            intrebare: "Cu aceleași funcții, (g∘f)(x)=",
            variante: [
                "2x+1",
                "2x+2",
                "x+1",
                "2x"
            ],
            corect: 1,
            explicatie: "g(f(x))=g(x+1)=2(x+1)=2x+2."
        },
        {
            intrebare: "În (f∘g)(x), care funcție se aplică prima?",
            variante: [
                "g",
                "f",
                "Ambele simultan",
                "Niciuna"
            ],
            corect: 0,
            explicatie: "Întâi calculăm g(x), apoi aplicăm f."
        },
        {
            intrebare: "În general, f∘g și g∘f sunt:",
            variante: [
                "Mereu egale",
                "Nu neapărat egale",
                "Mereu zero",
                "Mereu constante"
            ],
            corect: 1,
            explicatie: "Compunerea nu este în general comutativă."
        },
        {
            intrebare: "Dacă f(x)=x² și g(x)=x+1, atunci (f∘g)(x)=",
            variante: [
                "x²+1",
                "(x+1)²",
                "x²+x",
                "2x+1"
            ],
            corect: 1,
            explicatie: "f(g(x))=(x+1)²."
        }
    ],
    storageKeyFinalizata: "lectie-compunerea-functiilor-finalizata",
    storageKeyXp: "lectie-compunerea-functiilor-xp",
    urmatoareaLectie: {
        titlu: "Șiruri de numere reale",
        href: "/lectii/siruri-de-numere-reale"
    }
};
const lectiaSiruriNumereReale = {
    id: "siruri-de-numere-reale",
    slug: "siruri-de-numere-reale",
    modul: 2,
    numarLectie: 12,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Șiruri de numere reale",
    descriere: "Înveți ce este un șir, cum poate fi definit și cum studiem termenii, monotonia și mărginirea sa.",
    obiective: [
        {
            icon: "aₙ",
            titlu: "Să înțelegi un șir",
            descriere: "Vei interpreta un șir ca pe o funcție definită pe numere naturale."
        },
        {
            icon: "🔢",
            titlu: "Să calculezi termeni",
            descriere: "Vei folosi formula termenului general."
        },
        {
            icon: "↗",
            titlu: "Să observi proprietăți",
            descriere: "Vei recunoaște șiruri monotone și mărginite."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este un șir?",
            durata: "4 min",
            descriere: "Un șir este o succesiune ordonată de numere.",
            idei: [
                "Termenii se notează a₁,a₂,a₃,...",
                "aₙ reprezintă termenul de rang n.",
                "Ordinea termenilor contează."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru aₙ=2n, termenii sunt 2,4,6,8,..."
        },
        {
            numar: 2,
            titlu: "Modalități de definire",
            durata: "5 min",
            descriere: "Un șir poate fi dat prin formula termenului general sau printr-o regulă de recurență.",
            idei: [
                "Formula explicită ne permite calcularea directă a lui aₙ.",
                "O recurență folosește termeni anteriori.",
                "Trebuie cunoscut termenul inițial când folosim recurențe."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "a₁=1 și aₙ₊₁=aₙ+2 produce șirul 1,3,5,7,..."
        },
        {
            numar: 3,
            titlu: "Monotonie și mărginire",
            durata: "5 min",
            descriere: "Aceleași idei întâlnite la funcții apar și la șiruri.",
            idei: [
                "Un șir poate fi crescător sau descrescător.",
                "Poate fi mărginit superior sau inferior.",
                "Comparăm termeni consecutivi sau folosim formula."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Șirul aₙ=n este crescător și mărginit inferior."
        }
    ],
    fisaRapida: {
        titlu: "Șiruri",
        continut: [
            "aₙ = termenul de rang n.",
            "Un șir poate fi definit explicit sau recurent.",
            "Ordinea termenilor contează.",
            "Șirurile pot fi monotone și/sau mărginite."
        ]
    },
    exercitii: [
        {
            intrebare: "Pentru aₙ=3n, cât este a₄?",
            variante: [
                "7",
                "12",
                "9",
                "4"
            ],
            corect: 1,
            explicatie: "a₄=3·4=12."
        },
        {
            intrebare: "Simbolul aₙ reprezintă:",
            variante: [
                "Termenul de rang n",
                "Suma tuturor termenilor",
                "O funcție constantă obligatoriu",
                "Un număr negativ"
            ],
            corect: 0,
            explicatie: "aₙ este termenul corespunzător indicelui n."
        },
        {
            intrebare: "Șirul 2,4,6,8,... poate avea formula:",
            variante: [
                "aₙ=2n",
                "aₙ=n+1",
                "aₙ=n²",
                "aₙ=2"
            ],
            corect: 0,
            explicatie: "Pentru n=1,2,3,... obținem 2,4,6,..."
        },
        {
            intrebare: "Într-o definiție recurentă folosim de obicei:",
            variante: [
                "Termeni anteriori",
                "Doar graficul",
                "Numai codomeniul",
                "Niciun termen inițial"
            ],
            corect: 0,
            explicatie: "Recurența exprimă un termen prin unul sau mai mulți termeni anteriori."
        },
        {
            intrebare: "Șirul aₙ=n este:",
            variante: [
                "Crescător",
                "Descrescător",
                "Constant",
                "Periodic"
            ],
            corect: 0,
            explicatie: "Valorile 1,2,3,... cresc."
        }
    ],
    storageKeyFinalizata: "lectie-siruri-de-numere-reale-finalizata",
    storageKeyXp: "lectie-siruri-de-numere-reale-xp",
    urmatoareaLectie: {
        titlu: "Progresii aritmetice",
        href: "/lectii/progresii-aritmetice"
    }
};
const lectiaProgresiiAritmetice = {
    id: "progresii-aritmetice",
    slug: "progresii-aritmetice",
    modul: 2,
    numarLectie: 13,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Progresii aritmetice",
    descriere: "Înveți să recunoști o progresie aritmetică și să calculezi termenul general și suma primilor termeni.",
    obiective: [
        {
            icon: "+r",
            titlu: "Să identifici rația",
            descriere: "Vei determina diferența constantă dintre termeni consecutivi."
        },
        {
            icon: "aₙ",
            titlu: "Să calculezi termenul general",
            descriere: "Vei folosi formula progresiei aritmetice."
        },
        {
            icon: "Σ",
            titlu: "Să calculezi sume",
            descriere: "Vei determina suma primilor n termeni."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este o progresie aritmetică?",
            durata: "5 min",
            descriere: "Diferența dintre doi termeni consecutivi este constantă.",
            idei: [
                "aₙ₊₁=aₙ+r.",
                "r se numește rația progresiei aritmetice.",
                "r poate fi pozitivă, negativă sau zero."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2,5,8,11,... este progresie aritmetică de rație r=3."
        },
        {
            numar: 2,
            titlu: "Termenul general",
            durata: "5 min",
            descriere: "Putem calcula direct orice termen fără să scriem toți termenii anteriori.",
            idei: [
                "aₙ=a₁+(n-1)r.",
                "Putem porni și de la un alt termen cunoscut.",
                "Formula permite găsirea rapidă a unui rang sau termen."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru a₁=2 și r=3, a₅=2+4·3=14."
        },
        {
            numar: 3,
            titlu: "Suma primilor n termeni",
            durata: "5 min",
            descriere: "Calculăm eficient suma unei progresii aritmetice.",
            idei: [
                "Sₙ=n(a₁+aₙ)/2.",
                "Putem înlocui aₙ prin formula termenului general.",
                "Formula evită adunarea manuală a tuturor termenilor."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru 1+2+3+4+5, S₅=5(1+5)/2=15."
        }
    ],
    fisaRapida: {
        titlu: "Progresia aritmetică",
        continut: [
            "aₙ₊₁=aₙ+r.",
            "aₙ=a₁+(n-1)r.",
            "Sₙ=n(a₁+aₙ)/2.",
            "Trei termeni consecutivi a,b,c sunt în progresie aritmetică dacă 2b=a+c."
        ]
    },
    exercitii: [
        {
            intrebare: "Șirul 3,7,11,15,... are rația:",
            variante: [
                "3",
                "4",
                "7",
                "11"
            ],
            corect: 1,
            explicatie: "Diferența dintre termeni consecutivi este 4."
        },
        {
            intrebare: "Dacă a₁=5 și r=2, atunci a₄=",
            variante: [
                "9",
                "11",
                "13",
                "7"
            ],
            corect: 1,
            explicatie: "a₄=5+(4-1)·2=11."
        },
        {
            intrebare: "Formula termenului general este:",
            variante: [
                "aₙ=a₁+(n-1)r",
                "aₙ=a₁·rⁿ",
                "aₙ=n+r",
                "aₙ=a₁+r"
            ],
            corect: 0,
            explicatie: "Aceasta este formula standard pentru progresia aritmetică."
        },
        {
            intrebare: "Dacă 2, x, 8 sunt în progresie aritmetică, x=",
            variante: [
                "4",
                "5",
                "6",
                "3"
            ],
            corect: 1,
            explicatie: "2x=2+8=10, deci x=5."
        },
        {
            intrebare: "Suma 1+2+3+4+5 este:",
            variante: [
                "10",
                "15",
                "20",
                "25"
            ],
            corect: 1,
            explicatie: "S₅=5(1+5)/2=15."
        }
    ],
    storageKeyFinalizata: "lectie-progresii-aritmetice-finalizata",
    storageKeyXp: "lectie-progresii-aritmetice-xp",
    urmatoareaLectie: {
        titlu: "Progresii geometrice",
        href: "/lectii/progresii-geometrice"
    }
};
const lectiaProgresiiGeometrice = {
    id: "progresii-geometrice",
    slug: "progresii-geometrice",
    modul: 2,
    numarLectie: 14,
    totalLectiiModul: 14,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Progresii geometrice",
    descriere: "Înveți să recunoști o progresie geometrică și să calculezi termenul general și suma primilor termeni.",
    obiective: [
        {
            icon: "×q",
            titlu: "Să identifici rația",
            descriere: "Vei determina raportul constant dintre termeni consecutivi."
        },
        {
            icon: "aₙ",
            titlu: "Să calculezi termenul general",
            descriere: "Vei folosi formula progresiei geometrice."
        },
        {
            icon: "Σ",
            titlu: "Să calculezi suma",
            descriere: "Vei folosi formula sumei primilor n termeni."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este o progresie geometrică?",
            durata: "5 min",
            descriere: "Fiecare termen se obține înmulțind termenul anterior cu aceeași valoare.",
            idei: [
                "aₙ₊₁=aₙ·q.",
                "q se numește rația progresiei geometrice.",
                "Raportul termenilor consecutivi este constant când este definit."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2,6,18,54,... este progresie geometrică de rație q=3."
        },
        {
            numar: 2,
            titlu: "Termenul general",
            durata: "5 min",
            descriere: "Calculăm direct termenul de rang n.",
            idei: [
                "aₙ=a₁·q^(n-1).",
                "Putem porni și de la un termen cunoscut.",
                "Puterile lui q determină evoluția termenilor."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă a₁=2 și q=3, atunci a₄=2·3³=54."
        },
        {
            numar: 3,
            titlu: "Suma primilor n termeni",
            durata: "6 min",
            descriere: "Folosim formula sumei când q este diferit de 1.",
            idei: [
                "Pentru q≠1: Sₙ=a₁(qⁿ-1)/(q-1).",
                "O formă echivalentă este a₁(1-qⁿ)/(1-q).",
                "Pentru q=1, toți termenii sunt egali și Sₙ=n·a₁."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "1+2+4+8=15, corespunzător unei progresii cu a₁=1 și q=2."
        }
    ],
    fisaRapida: {
        titlu: "Progresia geometrică",
        continut: [
            "aₙ₊₁=aₙ·q.",
            "aₙ=a₁·q^(n-1).",
            "Pentru q≠1: Sₙ=a₁(qⁿ-1)/(q-1).",
            "Pentru trei termeni consecutivi a,b,c ai unei progresii geometrice: b²=ac."
        ]
    },
    exercitii: [
        {
            intrebare: "Șirul 2,6,18,54,... are rația:",
            variante: [
                "2",
                "3",
                "6",
                "9"
            ],
            corect: 1,
            explicatie: "Fiecare termen se obține înmulțind termenul anterior cu 3."
        },
        {
            intrebare: "Dacă a₁=2 și q=2, atunci a₄=",
            variante: [
                "8",
                "12",
                "16",
                "32"
            ],
            corect: 2,
            explicatie: "a₄=2·2³=16."
        },
        {
            intrebare: "Formula termenului general este:",
            variante: [
                "aₙ=a₁q^(n-1)",
                "aₙ=a₁+(n-1)q",
                "aₙ=nq",
                "aₙ=q+n"
            ],
            corect: 0,
            explicatie: "Aceasta este formula standard a progresiei geometrice."
        },
        {
            intrebare: "Dacă 2, x, 8 sunt termeni consecutivi ai unei progresii geometrice și x>0, atunci x=",
            variante: [
                "2",
                "4",
                "6",
                "8"
            ],
            corect: 1,
            explicatie: "x²=2·8=16, iar x>0, deci x=4."
        },
        {
            intrebare: "Suma 1+2+4+8 este:",
            variante: [
                "12",
                "14",
                "15",
                "16"
            ],
            corect: 2,
            explicatie: "1+2+4+8=15."
        }
    ],
    storageKeyFinalizata: "lectie-progresii-geometrice-finalizata",
    storageKeyXp: "lectie-progresii-geometrice-xp",
    urmatoareaLectie: {
        titlu: "Funcția f(x) = ax + b"
    }
};
const lectiiModul2 = [
    lectiaReperCartezian,
    lectiaNotiuneaDeFunctie,
    lectiaDomeniuCodomeniuImagine,
    lectiaGraficulUneiFunctii,
    lectiaLecturiGrafice,
    lectiaEgalitateaFunctiilor,
    lectiaRestrictiaFunctiei,
    lectiaMonotonieMarginire,
    lectiaParitateImparitate,
    lectiaPeriodicitate,
    lectiaCompunereaFunctiilor,
    lectiaSiruriNumereReale,
    lectiaProgresiiAritmetice,
    lectiaProgresiiGeometrice
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/lectii/modul-3.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lectiaEcuatiiGradulIntai",
    ()=>lectiaEcuatiiGradulIntai,
    "lectiaFunctiaGradulIntai",
    ()=>lectiaFunctiaGradulIntai,
    "lectiaGraficFunctieGradulIntai",
    ()=>lectiaGraficFunctieGradulIntai,
    "lectiaInecuatiiGradulIntai",
    ()=>lectiaInecuatiiGradulIntai,
    "lectiaInterpretareaGeometricaSistemelor",
    ()=>lectiaInterpretareaGeometricaSistemelor,
    "lectiaMonotoniaFunctieiGradulIntai",
    ()=>lectiaMonotoniaFunctieiGradulIntai,
    "lectiaProblemeFunctiiLiniare",
    ()=>lectiaProblemeFunctiiLiniare,
    "lectiaSemnulFunctieiGradulIntai",
    ()=>lectiaSemnulFunctieiGradulIntai,
    "lectiaSistemeEcuatiiLiniare",
    ()=>lectiaSistemeEcuatiiLiniare,
    "lectiiModul3",
    ()=>lectiiModul3
]);
const lectiaFunctiaGradulIntai = {
    id: "functia-gradul-intai",
    slug: "functia-gradul-intai",
    modul: 3,
    numarLectie: 1,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Funcția f(x) = ax + b",
    descriere: "Înveți forma funcției de gradul I, rolul coeficienților a și b și cum calculezi rapid valorile funcției.",
    obiective: [
        {
            icon: "🔎",
            titlu: "Să recunoști funcția",
            descriere: "Vei identifica funcțiile de forma f(x) = ax + b."
        },
        {
            icon: "🧮",
            titlu: "Să calculezi valori",
            descriere: "Vei determina f(x) pentru diferite valori ale lui x."
        },
        {
            icon: "🧠",
            titlu: "Să înțelegi coeficienții",
            descriere: "Vei înțelege rolul numerelor a și b."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Cum recunoști o funcție de gradul I",
            durata: "4 min",
            descriere: "Pornim de la forma generală f(x) = ax + b.",
            idei: [
                "Forma este f(x) = ax + b.",
                "a și b sunt numere reale.",
                "Pentru funcția de gradul I avem a ≠ 0.",
                "x este variabila independentă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x) = 2x + 3 este funcție de gradul I, cu a = 2 și b = 3."
        },
        {
            numar: 2,
            titlu: "Cum calculezi f(x)",
            durata: "4 min",
            descriere: "Înlocuiești x cu valoarea cerută.",
            idei: [
                "Scriem formula funcției.",
                "Înlocuim x.",
                "Respectăm ordinea operațiilor.",
                "Calculăm rezultatul."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x) = 2x + 3 avem f(4) = 2 × 4 + 3 = 11."
        },
        {
            numar: 3,
            titlu: "Rolul lui a",
            durata: "4 min",
            descriere: "Coeficientul a influențează direcția și înclinarea dreptei.",
            idei: [
                "a este coeficientul lui x.",
                "a > 0 conduce la o funcție crescătoare.",
                "a < 0 conduce la o funcție descrescătoare.",
                "Valoarea lui |a| influențează înclinarea graficului."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "În f(x) = -3x + 2 avem a = -3, deci funcția este descrescătoare."
        },
        {
            numar: 4,
            titlu: "Rolul lui b",
            durata: "3–4 min",
            descriere: "Coeficientul b arată valoarea funcției pentru x = 0.",
            idei: [
                "f(0) = b.",
                "Graficul trece prin punctul (0,b).",
                "b reprezintă intersecția cu axa Oy."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x) = 5x - 2 avem f(0) = -2, deci graficul trece prin (0,-2)."
        }
    ],
    fisaRapida: {
        titlu: "Funcția de gradul I pe scurt",
        continut: [
            "f(x) = ax + b, cu a ≠ 0.",
            "a = coeficientul lui x.",
            "b = termenul liber.",
            "f(0) = b.",
            "Pentru a calcula f(x), înlocuiești x cu valoarea cerută."
        ]
    },
    exercitii: [
        {
            intrebare: "Care dintre următoarele este o funcție de gradul I?",
            variante: [
                "f(x) = x² + 1",
                "f(x) = 3x - 5",
                "f(x) = 7",
                "f(x) = 1/x"
            ],
            corect: 1,
            explicatie: "3x - 5 are forma ax + b, cu a = 3 ≠ 0."
        },
        {
            intrebare: "Pentru f(x) = 2x + 1, cât este f(3)?",
            variante: [
                "5",
                "6",
                "7",
                "8"
            ],
            corect: 2,
            explicatie: "f(3) = 2 × 3 + 1 = 7."
        },
        {
            intrebare: "În funcția f(x) = -4x + 7, coeficientul a este:",
            variante: [
                "7",
                "-4",
                "4",
                "-7"
            ],
            corect: 1,
            explicatie: "Coeficientul lui x este -4."
        },
        {
            intrebare: "În funcția f(x) = 5x - 3, cât este f(0)?",
            variante: [
                "5",
                "0",
                "-3",
                "3"
            ],
            corect: 2,
            explicatie: "f(0) = 5 × 0 - 3 = -3."
        },
        {
            intrebare: "Pentru f(x) = -2x + 4, cât este f(-1)?",
            variante: [
                "2",
                "4",
                "6",
                "-6"
            ],
            corect: 2,
            explicatie: "f(-1) = -2 × (-1) + 4 = 6."
        },
        {
            intrebare: "Dacă f(x) = ax + b și f(0) = 8, atunci:",
            variante: [
                "a = 8",
                "b = 8",
                "a + b = 8",
                "x = 8"
            ],
            corect: 1,
            explicatie: "f(0) = a × 0 + b = b, deci b = 8."
        }
    ],
    storageKeyFinalizata: "lectie-functia-gradul-intai-finalizata",
    storageKeyXp: "lectie-functia-gradul-intai-xp",
    urmatoareaLectie: {
        titlu: "Graficul funcției de gradul I",
        href: "/lectii/grafic-functie-gradul-intai"
    }
};
const lectiaGraficFunctieGradulIntai = {
    id: "grafic-functie-gradul-intai",
    slug: "grafic-functie-gradul-intai",
    modul: 3,
    numarLectie: 2,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Graficul funcției de gradul I",
    descriere: "Înveți să construiești graficul unei funcții de forma f(x) = ax + b folosind două puncte.",
    obiective: [
        {
            icon: "📈",
            titlu: "Să construiești graficul",
            descriere: "Vei reprezenta funcția printr-o dreaptă."
        },
        {
            icon: "📍",
            titlu: "Să găsești două puncte",
            descriere: "Vei calcula coordonate suficiente pentru trasarea dreptei."
        },
        {
            icon: "✂️",
            titlu: "Să găsești intersecțiile",
            descriere: "Vei determina punctele de intersecție cu axele."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "De ce graficul este o dreaptă?",
            durata: "4 min",
            descriere: "Funcția de gradul I are ca reprezentare grafică o dreaptă.",
            idei: [
                "Graficul lui f(x) = ax + b este o dreaptă.",
                "Două puncte distincte determină o dreaptă.",
                "Este suficient să calculăm două puncte."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x) = x + 1 putem folosi punctele (0,1) și (1,2)."
        },
        {
            numar: 2,
            titlu: "Metoda tabelului",
            durata: "4–5 min",
            descriere: "Alegi două valori pentru x și calculezi valorile lui y.",
            idei: [
                "Alegem două valori simple pentru x.",
                "Calculăm f(x).",
                "Obținem două puncte.",
                "Unim punctele printr-o dreaptă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x) = 2x + 1: x = 0 → y = 1 și x = 1 → y = 3."
        },
        {
            numar: 3,
            titlu: "Intersecția cu Oy",
            durata: "3 min",
            descriere: "Pentru Oy punem x = 0.",
            idei: [
                "Pe Oy avem x = 0.",
                "f(0) = b.",
                "Intersecția este (0,b)."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x) = 3x - 6 intersectează Oy în punctul (0,-6)."
        },
        {
            numar: 4,
            titlu: "Intersecția cu Ox",
            durata: "4 min",
            descriere: "Pentru Ox punem y = 0.",
            idei: [
                "Pe Ox avem f(x) = 0.",
                "Rezolvăm ax + b = 0.",
                "Pentru a ≠ 0 obținem x = -b/a."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "3x - 6 = 0 ⇒ x = 2, deci intersecția cu Ox este (2,0)."
        }
    ],
    fisaRapida: {
        titlu: "Cum desenezi dreapta",
        continut: [
            "Graficul funcției de gradul I este o dreaptă.",
            "Două puncte distincte sunt suficiente.",
            "Intersecția cu Oy: x = 0.",
            "Intersecția cu Ox: f(x) = 0.",
            "Pentru f(x) = ax + b, rădăcina este x = -b/a."
        ]
    },
    exercitii: [
        {
            intrebare: "Graficul unei funcții de gradul I este:",
            variante: [
                "O parabolă",
                "O dreaptă",
                "Un cerc",
                "O hiperbolă"
            ],
            corect: 1,
            explicatie: "Funcția f(x) = ax + b, a ≠ 0, are graficul o dreaptă."
        },
        {
            intrebare: "Pentru f(x) = 2x + 3, intersecția cu Oy este:",
            variante: [
                "(3,0)",
                "(0,3)",
                "(2,3)",
                "(0,2)"
            ],
            corect: 1,
            explicatie: "Punem x = 0 și obținem y = 3."
        },
        {
            intrebare: "Pentru f(x) = x - 4, intersecția cu Ox este:",
            variante: [
                "(0,-4)",
                "(4,0)",
                "(-4,0)",
                "(0,4)"
            ],
            corect: 1,
            explicatie: "x - 4 = 0 ⇒ x = 4."
        },
        {
            intrebare: "Ce două puncte aparțin graficului lui f(x) = x + 2?",
            variante: [
                "(0,2) și (1,3)",
                "(0,1) și (2,2)",
                "(2,0) și (3,1)",
                "(0,-2) și (1,-3)"
            ],
            corect: 0,
            explicatie: "f(0) = 2 și f(1) = 3."
        },
        {
            intrebare: "Câte puncte distincte sunt suficiente pentru a determina o dreaptă?",
            variante: [
                "1",
                "2",
                "3",
                "4"
            ],
            corect: 1,
            explicatie: "Prin două puncte distincte trece o singură dreaptă."
        },
        {
            intrebare: "Pentru f(x) = -2x + 6, rădăcina funcției este:",
            variante: [
                "-3",
                "2",
                "3",
                "6"
            ],
            corect: 2,
            explicatie: "-2x + 6 = 0 ⇒ x = 3."
        }
    ],
    storageKeyFinalizata: "lectie-grafic-functie-gradul-intai-finalizata",
    storageKeyXp: "lectie-grafic-functie-gradul-intai-xp",
    urmatoareaLectie: {
        titlu: "Monotonia funcției de gradul I",
        href: "/lectii/monotonia-functiei-gradul-intai"
    }
};
const lectiaMonotoniaFunctieiGradulIntai = {
    id: "monotonia-functiei-gradul-intai",
    slug: "monotonia-functiei-gradul-intai",
    modul: 3,
    numarLectie: 3,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Monotonia funcției de gradul I",
    descriere: "Înveți să stabilești imediat dacă o funcție de gradul I este crescătoare sau descrescătoare.",
    obiective: [
        {
            icon: "📈",
            titlu: "Să recunoști creșterea",
            descriere: "Vei identifica funcțiile crescătoare."
        },
        {
            icon: "📉",
            titlu: "Să recunoști descreșterea",
            descriere: "Vei identifica funcțiile descrescătoare."
        },
        {
            icon: "⚡",
            titlu: "Să folosești coeficientul a",
            descriere: "Vei decide monotonia fără a desena graficul."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce înseamnă funcție crescătoare?",
            durata: "4 min",
            descriere: "Pe măsură ce x crește, valorile funcției cresc.",
            idei: [
                "Pentru funcția de gradul I contează semnul lui a.",
                "Dacă a > 0, funcția este strict crescătoare.",
                "Graficul urcă de la stânga la dreapta."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x) = 3x + 1 este crescătoare deoarece 3 > 0."
        },
        {
            numar: 2,
            titlu: "Ce înseamnă funcție descrescătoare?",
            durata: "4 min",
            descriere: "Pe măsură ce x crește, valorile funcției scad.",
            idei: [
                "Dacă a < 0, funcția este strict descrescătoare.",
                "Graficul coboară de la stânga la dreapta.",
                "Termenul b nu schimbă monotonia."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "f(x) = -2x + 5 este descrescătoare deoarece -2 < 0."
        },
        {
            numar: 3,
            titlu: "De ce b nu contează pentru monotonie",
            durata: "3–4 min",
            descriere: "b deplasează dreapta, dar nu schimbă sensul ei.",
            idei: [
                "Semnul lui a decide monotonia.",
                "b schimbă intersecția cu Oy.",
                "Două funcții cu același a au aceeași monotonie."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2x + 1 și 2x - 100 sunt ambele crescătoare."
        },
        {
            numar: 4,
            titlu: "Decizia rapidă la exerciții",
            durata: "3 min",
            descriere: "Te uiți doar la coeficientul lui x.",
            idei: [
                "Identifică a.",
                "a > 0 → crescătoare.",
                "a < 0 → descrescătoare."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x) = -7x + 20 nu este nevoie de grafic: a = -7 < 0."
        }
    ],
    fisaRapida: {
        titlu: "Regula de memorat",
        continut: [
            "f(x) = ax + b.",
            "a > 0 → funcția este strict crescătoare.",
            "a < 0 → funcția este strict descrescătoare.",
            "b nu influențează monotonia."
        ]
    },
    exercitii: [
        {
            intrebare: "Funcția f(x) = 4x - 7 este:",
            variante: [
                "Crescătoare",
                "Descrescătoare",
                "Constantă",
                "Periodicǎ"
            ],
            corect: 0,
            explicatie: "a = 4 > 0, deci funcția este crescătoare."
        },
        {
            intrebare: "Funcția f(x) = -3x + 2 este:",
            variante: [
                "Crescătoare",
                "Descrescătoare",
                "Constantă",
                "Pară"
            ],
            corect: 1,
            explicatie: "a = -3 < 0, deci funcția este descrescătoare."
        },
        {
            intrebare: "Ce coeficient determină monotonia lui f(x) = ax + b?",
            variante: [
                "Doar b",
                "a",
                "a + b",
                "x"
            ],
            corect: 1,
            explicatie: "Semnul coeficientului a determină monotonia."
        },
        {
            intrebare: "Care funcție este descrescătoare?",
            variante: [
                "f(x) = x + 1",
                "f(x) = 5x",
                "f(x) = -x + 7",
                "f(x) = 2x - 10"
            ],
            corect: 2,
            explicatie: "Coeficientul lui x este -1."
        },
        {
            intrebare: "Funcțiile f(x) = 2x + 5 și g(x) = 2x - 9 sunt:",
            variante: [
                "Ambele crescătoare",
                "Ambele descrescătoare",
                "Una crescătoare și una descrescătoare",
                "Constante"
            ],
            corect: 0,
            explicatie: "Ambele au coeficientul a = 2 > 0."
        },
        {
            intrebare: "Dacă a < 0 în f(x) = ax + b, graficul:",
            variante: [
                "Urcă de la stânga la dreapta",
                "Coboară de la stânga la dreapta",
                "Este orizontal",
                "Este o parabolă"
            ],
            corect: 1,
            explicatie: "a < 0 înseamnă funcție descrescătoare."
        }
    ],
    storageKeyFinalizata: "lectie-monotonia-functiei-gradul-intai-finalizata",
    storageKeyXp: "lectie-monotonia-functiei-gradul-intai-xp",
    urmatoareaLectie: {
        titlu: "Semnul funcției de gradul I",
        href: "/lectii/semnul-functiei-gradul-intai"
    }
};
const lectiaSemnulFunctieiGradulIntai = {
    id: "semnul-functiei-gradul-intai",
    slug: "semnul-functiei-gradul-intai",
    modul: 3,
    numarLectie: 4,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Semnul funcției de gradul I",
    descriere: "Înveți să determini unde funcția este pozitivă, negativă sau egală cu zero.",
    obiective: [
        {
            icon: "0️⃣",
            titlu: "Să găsești rădăcina",
            descriere: "Vei rezolva f(x) = 0."
        },
        {
            icon: "➕",
            titlu: "Să găsești zona pozitivă",
            descriere: "Vei determina unde f(x) > 0."
        },
        {
            icon: "➖",
            titlu: "Să găsești zona negativă",
            descriere: "Vei determina unde f(x) < 0."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Rădăcina funcției",
            durata: "4 min",
            descriere: "Pornim prin rezolvarea ecuației f(x) = 0.",
            idei: [
                "ax + b = 0.",
                "x₀ = -b/a.",
                "În x₀ funcția își schimbă semnul."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru f(x) = 2x - 6 avem x₀ = 3."
        },
        {
            numar: 2,
            titlu: "Cazul a > 0",
            durata: "4 min",
            descriere: "Pentru coeficient pozitiv, semnul trece de la minus la plus.",
            idei: [
                "La stânga rădăcinii: f(x) < 0.",
                "În rădăcină: f(x) = 0.",
                "La dreapta rădăcinii: f(x) > 0."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru 2x - 6: negativ pe ]-∞,3[, zero la 3, pozitiv pe ]3,+∞[."
        },
        {
            numar: 3,
            titlu: "Cazul a < 0",
            durata: "4 min",
            descriere: "Pentru coeficient negativ, semnele se inversează.",
            idei: [
                "La stânga rădăcinii: f(x) > 0.",
                "În rădăcină: f(x) = 0.",
                "La dreapta rădăcinii: f(x) < 0."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru -x + 4: pozitiv pe ]-∞,4[, zero la 4, negativ pe ]4,+∞[."
        },
        {
            numar: 4,
            titlu: "Tabelul de semn",
            durata: "4 min",
            descriere: "Organizezi rezultatul într-o schemă simplă.",
            idei: [
                "Găsești rădăcina.",
                "Te uiți la semnul lui a.",
                "Completezi semnul pe cele două intervale."
            ],
            exempluTitlu: "Regulă",
            exemplu: "Pentru a > 0: − | 0 | +. Pentru a < 0: + | 0 | −."
        }
    ],
    fisaRapida: {
        titlu: "Tabelul de semn",
        continut: [
            "x₀ = -b/a.",
            "a > 0 → − | 0 | +.",
            "a < 0 → + | 0 | −.",
            "f(x₀) = 0."
        ]
    },
    exercitii: [
        {
            intrebare: "Rădăcina funcției f(x) = 2x - 8 este:",
            variante: [
                "-4",
                "2",
                "4",
                "8"
            ],
            corect: 2,
            explicatie: "2x - 8 = 0 ⇒ x = 4."
        },
        {
            intrebare: "Pentru f(x) = 2x - 8, funcția este pozitivă pentru:",
            variante: [
                "x < 4",
                "x > 4",
                "x = 4",
                "x < 0"
            ],
            corect: 1,
            explicatie: "a > 0 și rădăcina este 4, deci f(x) > 0 pentru x > 4."
        },
        {
            intrebare: "Pentru f(x) = -x + 5, rădăcina este:",
            variante: [
                "-5",
                "0",
                "1",
                "5"
            ],
            corect: 3,
            explicatie: "-x + 5 = 0 ⇒ x = 5."
        },
        {
            intrebare: "Pentru f(x) = -x + 5, f(x) > 0 pentru:",
            variante: [
                "x < 5",
                "x > 5",
                "x = 5",
                "x > 0"
            ],
            corect: 0,
            explicatie: "a < 0, deci funcția este pozitivă la stânga rădăcinii."
        },
        {
            intrebare: "Dacă a > 0, semnul funcției în jurul rădăcinii este:",
            variante: [
                "+ | 0 | −",
                "− | 0 | +",
                "+ | + | +",
                "− | − | −"
            ],
            corect: 1,
            explicatie: "Pentru a > 0 funcția trece de la valori negative la valori pozitive."
        },
        {
            intrebare: "Pentru f(x) = 3x + 6, f(x) = 0 când:",
            variante: [
                "x = 2",
                "x = -2",
                "x = -3",
                "x = 3"
            ],
            corect: 1,
            explicatie: "3x + 6 = 0 ⇒ x = -2."
        }
    ],
    storageKeyFinalizata: "lectie-semnul-functiei-gradul-intai-finalizata",
    storageKeyXp: "lectie-semnul-functiei-gradul-intai-xp",
    urmatoareaLectie: {
        titlu: "Ecuații de gradul I",
        href: "/lectii/ecuatii-gradul-intai"
    }
};
const lectiaEcuatiiGradulIntai = {
    id: "ecuatii-gradul-intai",
    slug: "ecuatii-gradul-intai",
    modul: 3,
    numarLectie: 5,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Ecuații de gradul I",
    descriere: "Înveți să rezolvi ecuații liniare și să verifici corect soluția obținută.",
    obiective: [
        {
            icon: "🧮",
            titlu: "Să izolezi necunoscuta",
            descriere: "Vei transforma ecuația până obții valoarea lui x."
        },
        {
            icon: "⚖️",
            titlu: "Să păstrezi egalitatea",
            descriere: "Vei efectua aceleași operații în ambii membri."
        },
        {
            icon: "✅",
            titlu: "Să verifici soluția",
            descriere: "Vei înlocui soluția în ecuația inițială."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Forma ax + b = 0",
            durata: "4 min",
            descriere: "Ecuația de gradul I are o rezolvare directă când a ≠ 0.",
            idei: [
                "ax + b = 0.",
                "a ≠ 0.",
                "x = -b/a."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2x - 6 = 0 ⇒ 2x = 6 ⇒ x = 3."
        },
        {
            numar: 2,
            titlu: "Termeni în ambii membri",
            durata: "4–5 min",
            descriere: "Grupăm termenii cu x și termenii liberi.",
            idei: [
                "Eliminăm parantezele dacă există.",
                "Mutăm termenii cu x într-un membru.",
                "Mutăm numerele în celălalt membru.",
                "Reducem termenii asemenea."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "3x + 2 = x + 8 ⇒ 2x = 6 ⇒ x = 3."
        },
        {
            numar: 3,
            titlu: "Ecuații cu paranteze",
            durata: "5 min",
            descriere: "Aplici distributivitatea înainte de a grupa termenii.",
            idei: [
                "a(b + c) = ab + ac.",
                "Ai grijă la semnul minus.",
                "Apoi rezolvi ecuația liniară obținută."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2(x + 3) = 10 ⇒ 2x + 6 = 10 ⇒ x = 2."
        },
        {
            numar: 4,
            titlu: "Verificarea soluției",
            durata: "3 min",
            descriere: "Înlocuiești valoarea lui x în ecuația inițială.",
            idei: [
                "Calculezi membrul stâng.",
                "Calculezi membrul drept.",
                "Dacă sunt egali, soluția este corectă."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru 3x + 2 = 11 și x = 3: 3 × 3 + 2 = 11."
        }
    ],
    fisaRapida: {
        titlu: "Schema de rezolvare",
        continut: [
            "Desfaci parantezele.",
            "Grupezi termenii cu x.",
            "Grupezi termenii liberi.",
            "Împarți la coeficientul lui x.",
            "Verifici soluția."
        ]
    },
    exercitii: [
        {
            intrebare: "Rezolvați: 2x - 6 = 0",
            variante: [
                "x = -3",
                "x = 2",
                "x = 3",
                "x = 6"
            ],
            corect: 2,
            explicatie: "2x = 6 ⇒ x = 3."
        },
        {
            intrebare: "Rezolvați: 3x + 2 = 11",
            variante: [
                "x = 2",
                "x = 3",
                "x = 4",
                "x = 9"
            ],
            corect: 1,
            explicatie: "3x = 9 ⇒ x = 3."
        },
        {
            intrebare: "Rezolvați: 5x = 20",
            variante: [
                "x = 2",
                "x = 4",
                "x = 5",
                "x = 15"
            ],
            corect: 1,
            explicatie: "Împărțim la 5 și obținem x = 4."
        },
        {
            intrebare: "Rezolvați: 3x + 1 = x + 7",
            variante: [
                "x = 2",
                "x = 3",
                "x = 4",
                "x = 6"
            ],
            corect: 1,
            explicatie: "2x = 6 ⇒ x = 3."
        },
        {
            intrebare: "Rezolvați: 2(x + 3) = 10",
            variante: [
                "x = 1",
                "x = 2",
                "x = 3",
                "x = 5"
            ],
            corect: 1,
            explicatie: "2x + 6 = 10 ⇒ 2x = 4 ⇒ x = 2."
        },
        {
            intrebare: "Rezolvați: 7 - x = 2",
            variante: [
                "x = -5",
                "x = 5",
                "x = 7",
                "x = 9"
            ],
            corect: 1,
            explicatie: "-x = -5 ⇒ x = 5."
        }
    ],
    storageKeyFinalizata: "lectie-ecuatii-gradul-intai-finalizata",
    storageKeyXp: "lectie-ecuatii-gradul-intai-xp",
    urmatoareaLectie: {
        titlu: "Inecuații de gradul I",
        href: "/lectii/inecuatii-gradul-intai"
    }
};
const lectiaInecuatiiGradulIntai = {
    id: "inecuatii-gradul-intai",
    slug: "inecuatii-gradul-intai",
    modul: 3,
    numarLectie: 6,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Inecuații de gradul I",
    descriere: "Înveți să rezolvi inecuații liniare și regula esențială privind schimbarea sensului inegalității.",
    obiective: [
        {
            icon: "⚖️",
            titlu: "Să rezolvi inecuații",
            descriere: "Vei izola necunoscuta la fel ca într-o ecuație."
        },
        {
            icon: "🔄",
            titlu: "Să schimbi corect sensul",
            descriere: "Vei recunoaște când semnul inegalității trebuie inversat."
        },
        {
            icon: "↔️",
            titlu: "Să scrii soluția ca interval",
            descriere: "Vei transforma rezultatul în notație de interval."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ecuație versus inecuație",
            durata: "4 min",
            descriere: "În loc de = folosim <, >, ≤ sau ≥.",
            idei: [
                "Procedăm asemănător ecuațiilor.",
                "Adunarea și scăderea nu schimbă sensul.",
                "Înmulțirea sau împărțirea cu număr negativ schimbă sensul."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2x + 1 > 5 ⇒ 2x > 4 ⇒ x > 2."
        },
        {
            numar: 2,
            titlu: "Regula numărului negativ",
            durata: "4 min",
            descriere: "Este regula care produce cele mai multe greșeli.",
            idei: [
                "Dacă împărțim la un număr negativ, inversăm sensul.",
                "< devine >.",
                "≤ devine ≥."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "-2x > 6 ⇒ x < -3."
        },
        {
            numar: 3,
            titlu: "Soluția ca interval",
            durata: "4 min",
            descriere: "Scriem mulțimea soluțiilor folosind intervale.",
            idei: [
                "x > 2 → ]2,+∞[.",
                "x ≥ 2 → [2,+∞[.",
                "x < 2 → ]-∞,2[.",
                "x ≤ 2 → ]-∞,2]."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "x ≤ 4 înseamnă S = ]-∞,4]."
        },
        {
            numar: 4,
            titlu: "Inecuații cu paranteze",
            durata: "5 min",
            descriere: "Desfaci parantezele și reduci termenii.",
            idei: [
                "Aplici distributivitatea.",
                "Grupezi termenii.",
                "Verifici semnul coeficientului lui x înainte de împărțire."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "2(x - 1) ≤ 6 ⇒ 2x - 2 ≤ 6 ⇒ x ≤ 4."
        }
    ],
    fisaRapida: {
        titlu: "Regula care nu trebuie uitată",
        continut: [
            "Adunare/scădere cu același număr → sensul rămâne.",
            "Înmulțire/împărțire cu număr pozitiv → sensul rămâne.",
            "Înmulțire/împărțire cu număr negativ → sensul se inversează.",
            "La final putem scrie soluția sub formă de interval."
        ]
    },
    exercitii: [
        {
            intrebare: "Rezolvați: 2x > 6",
            variante: [
                "x > 3",
                "x < 3",
                "x ≥ 3",
                "x > 6"
            ],
            corect: 0,
            explicatie: "Împărțim la 2 > 0, deci sensul rămâne: x > 3."
        },
        {
            intrebare: "Rezolvați: -2x > 6",
            variante: [
                "x > -3",
                "x < -3",
                "x > 3",
                "x < 3"
            ],
            corect: 1,
            explicatie: "Împărțim la -2, deci inversăm sensul: x < -3."
        },
        {
            intrebare: "Rezolvați: x + 4 ≤ 9",
            variante: [
                "x ≤ 5",
                "x ≥ 5",
                "x < 13",
                "x ≤ 13"
            ],
            corect: 0,
            explicatie: "Scădem 4: x ≤ 5."
        },
        {
            intrebare: "Care interval corespunde soluției x > 2?",
            variante: [
                "[2,+∞[",
                "]2,+∞[",
                "]-∞,2[",
                "]-∞,2]"
            ],
            corect: 1,
            explicatie: "2 nu este inclus, deci ]2,+∞[."
        },
        {
            intrebare: "Rezolvați: 2(x - 1) ≤ 6",
            variante: [
                "x ≤ 2",
                "x ≤ 4",
                "x ≥ 4",
                "x < 4"
            ],
            corect: 1,
            explicatie: "2x - 2 ≤ 6 ⇒ 2x ≤ 8 ⇒ x ≤ 4."
        },
        {
            intrebare: "Când trebuie schimbat sensul inegalității?",
            variante: [
                "Când adunăm un număr",
                "Când scădem un număr",
                "Când împărțim la un număr negativ",
                "Niciodată"
            ],
            corect: 2,
            explicatie: "La înmulțirea sau împărțirea cu un număr negativ, sensul se inversează."
        }
    ],
    storageKeyFinalizata: "lectie-inecuatii-gradul-intai-finalizata",
    storageKeyXp: "lectie-inecuatii-gradul-intai-xp",
    urmatoareaLectie: {
        titlu: "Sisteme de ecuații liniare",
        href: "/lectii/sisteme-ecuatii-liniare"
    }
};
const lectiaSistemeEcuatiiLiniare = {
    id: "sisteme-ecuatii-liniare",
    slug: "sisteme-ecuatii-liniare",
    modul: 3,
    numarLectie: 7,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Sisteme de ecuații liniare",
    descriere: "Înveți să rezolvi sisteme cu două ecuații și două necunoscute prin substituție și reducere.",
    obiective: [
        {
            icon: "🔗",
            titlu: "Să înțelegi sistemul",
            descriere: "Vei căuta valori care satisfac simultan ambele ecuații."
        },
        {
            icon: "🔁",
            titlu: "Metoda substituției",
            descriere: "Vei exprima o necunoscută și o vei înlocui."
        },
        {
            icon: "➕",
            titlu: "Metoda reducerii",
            descriere: "Vei elimina una dintre necunoscute prin adunarea ecuațiilor."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Ce este un sistem?",
            durata: "4 min",
            descriere: "Soluția trebuie să verifice ambele ecuații.",
            idei: [
                "Avem două necunoscute.",
                "Avem două condiții simultane.",
                "Soluția se scrie ca pereche (x,y)."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "x + y = 5 și x - y = 1 au soluția x = 3, y = 2."
        },
        {
            numar: 2,
            titlu: "Metoda substituției",
            durata: "5 min",
            descriere: "Izolezi una dintre necunoscute.",
            idei: [
                "Exprimi x sau y.",
                "Înlocuiești în cealaltă ecuație.",
                "Rezolvi ecuația cu o necunoscută.",
                "Revii pentru cealaltă necunoscută."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "x + y = 5 ⇒ y = 5 - x. Înlocuim în a doua ecuație."
        },
        {
            numar: 3,
            titlu: "Metoda reducerii",
            durata: "5 min",
            descriere: "Faci coeficienții unei necunoscute opuși.",
            idei: [
                "Pregătim ecuațiile.",
                "Adunăm sau scădem.",
                "O necunoscută dispare.",
                "Calculăm apoi cealaltă necunoscută."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "x + y = 5 și x - y = 1. Adunând: 2x = 6 ⇒ x = 3."
        },
        {
            numar: 4,
            titlu: "Verificarea perechii",
            durata: "3 min",
            descriere: "Înlocuiești x și y în ambele ecuații.",
            idei: [
                "Verificăm prima ecuație.",
                "Verificăm a doua ecuație.",
                "Ambele trebuie să fie adevărate."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Pentru (3,2): 3 + 2 = 5 și 3 - 2 = 1."
        }
    ],
    fisaRapida: {
        titlu: "Două metode de bază",
        continut: [
            "Substituție: exprimi o necunoscută și o înlocuiești.",
            "Reducere: elimini o necunoscută prin adunare/scădere.",
            "Soluția este perechea (x,y).",
            "Perechea trebuie să verifice ambele ecuații."
        ]
    },
    exercitii: [
        {
            intrebare: "Care este soluția sistemului x + y = 5, x - y = 1?",
            variante: [
                "(2,3)",
                "(3,2)",
                "(4,1)",
                "(1,4)"
            ],
            corect: 1,
            explicatie: "Adunăm ecuațiile: 2x = 6 ⇒ x = 3, apoi y = 2."
        },
        {
            intrebare: "Din ecuația x + y = 7 exprimăm y:",
            variante: [
                "y = x - 7",
                "y = 7 - x",
                "y = 7x",
                "y = x + 7"
            ],
            corect: 1,
            explicatie: "Scădem x din ambii membri: y = 7 - x."
        },
        {
            intrebare: "Metoda prin care înlocuim o necunoscută în cealaltă ecuație se numește:",
            variante: [
                "Reducere",
                "Substituție",
                "Factorizare",
                "Inducție"
            ],
            corect: 1,
            explicatie: "Aceasta este metoda substituției."
        },
        {
            intrebare: "Pentru sistemul x + y = 4, x - y = 2, cât este x?",
            variante: [
                "1",
                "2",
                "3",
                "4"
            ],
            corect: 2,
            explicatie: "Adunăm: 2x = 6 ⇒ x = 3."
        },
        {
            intrebare: "Pentru același sistem x + y = 4, x - y = 2, cât este y?",
            variante: [
                "1",
                "2",
                "3",
                "-1"
            ],
            corect: 0,
            explicatie: "x = 3, deci 3 + y = 4 ⇒ y = 1."
        },
        {
            intrebare: "O soluție a unui sistem trebuie:",
            variante: [
                "Să verifice doar prima ecuație",
                "Să verifice doar a doua ecuație",
                "Să verifice ambele ecuații",
                "Să aibă x = y"
            ],
            corect: 2,
            explicatie: "Sistemul impune simultan ambele ecuații."
        }
    ],
    storageKeyFinalizata: "lectie-sisteme-ecuatii-liniare-finalizata",
    storageKeyXp: "lectie-sisteme-ecuatii-liniare-xp",
    urmatoareaLectie: {
        titlu: "Interpretarea geometrică a sistemelor",
        href: "/lectii/interpretarea-geometrica-sistemelor"
    }
};
const lectiaInterpretareaGeometricaSistemelor = {
    id: "interpretarea-geometrica-sistemelor",
    slug: "interpretarea-geometrica-sistemelor",
    modul: 3,
    numarLectie: 8,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Interpretarea geometrică a sistemelor",
    descriere: "Înțelegi legătura dintre un sistem de ecuații liniare și poziția a două drepte în plan.",
    obiective: [
        {
            icon: "📐",
            titlu: "Să vezi ecuațiile ca drepte",
            descriere: "Fiecare ecuație liniară poate reprezenta o dreaptă."
        },
        {
            icon: "🎯",
            titlu: "Să interpretezi intersecția",
            descriere: "Punctul comun corespunde soluției sistemului."
        },
        {
            icon: "🔍",
            titlu: "Să recunoști cele trei cazuri",
            descriere: "Vei distinge drepte secante, paralele și coincidente."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "O ecuație liniară în plan",
            durata: "4 min",
            descriere: "Ecuațiile cu x și y pot reprezenta drepte.",
            idei: [
                "O ecuație liniară descrie o dreaptă.",
                "Un sistem reprezintă două drepte.",
                "Soluțiile comune sunt punctele comune."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "x + y = 5 reprezintă o dreaptă în plan."
        },
        {
            numar: 2,
            titlu: "O singură soluție",
            durata: "4 min",
            descriere: "Două drepte secante au un singur punct comun.",
            idei: [
                "Dreptele se intersectează.",
                "Există un singur punct comun.",
                "Sistemul are o singură soluție."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă dreptele se intersectează în (3,2), sistemul are soluția (3,2)."
        },
        {
            numar: 3,
            titlu: "Nicio soluție",
            durata: "4 min",
            descriere: "Dreptele paralele distincte nu au punct comun.",
            idei: [
                "Dreptele sunt paralele.",
                "Nu se intersectează.",
                "Sistemul nu are soluții."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dreptele y = 2x + 1 și y = 2x - 3 sunt paralele distincte."
        },
        {
            numar: 4,
            titlu: "Infinit de multe soluții",
            durata: "4 min",
            descriere: "Dacă ecuațiile reprezintă aceeași dreaptă, toate punctele ei sunt comune.",
            idei: [
                "Dreptele coincid.",
                "Au infinit de multe puncte comune.",
                "Sistemul are infinit de multe soluții."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "x + y = 2 și 2x + 2y = 4 reprezintă aceeași dreaptă."
        }
    ],
    fisaRapida: {
        titlu: "Cele trei cazuri",
        continut: [
            "Drepte secante → o soluție.",
            "Drepte paralele distincte → nicio soluție.",
            "Drepte coincidente → infinit de multe soluții.",
            "Soluția este punctul de intersecție."
        ]
    },
    exercitii: [
        {
            intrebare: "Dacă două drepte se intersectează într-un singur punct, sistemul are:",
            variante: [
                "Nicio soluție",
                "O soluție",
                "Două soluții",
                "Infinit de multe soluții"
            ],
            corect: 1,
            explicatie: "Punctul de intersecție este unica soluție."
        },
        {
            intrebare: "Dacă două drepte sunt paralele distincte, sistemul are:",
            variante: [
                "O soluție",
                "Două soluții",
                "Nicio soluție",
                "Infinit de multe soluții"
            ],
            corect: 2,
            explicatie: "Dreptele paralele distincte nu au punct comun."
        },
        {
            intrebare: "Dacă două drepte coincid, sistemul are:",
            variante: [
                "Nicio soluție",
                "O soluție",
                "Infinit de multe soluții",
                "Exact două soluții"
            ],
            corect: 2,
            explicatie: "Toate punctele dreptei comune sunt soluții."
        },
        {
            intrebare: "Soluția geometrică a unui sistem compatibil determinat reprezintă:",
            variante: [
                "Originea",
                "Punctul de intersecție al dreptelor",
                "Axa Ox",
                "Panta unei drepte"
            ],
            corect: 1,
            explicatie: "Perechea (x,y) este punctul comun celor două drepte."
        },
        {
            intrebare: "Dreptele y = 3x + 1 și y = 3x - 5 sunt:",
            variante: [
                "Secante",
                "Paralele distincte",
                "Coincidente",
                "Perpendiculare"
            ],
            corect: 1,
            explicatie: "Au aceeași pantă și termeni liberi diferiți."
        },
        {
            intrebare: "Ecuațiile x + y = 2 și 2x + 2y = 4 reprezintă:",
            variante: [
                "Drepte paralele distincte",
                "Drepte perpendiculare",
                "Aceeași dreaptă",
                "Drepte fără nicio legătură"
            ],
            corect: 2,
            explicatie: "A doua ecuație se obține înmulțind prima ecuație cu 2."
        }
    ],
    storageKeyFinalizata: "lectie-interpretarea-geometrica-sistemelor-finalizata",
    storageKeyXp: "lectie-interpretarea-geometrica-sistemelor-xp",
    urmatoareaLectie: {
        titlu: "Probleme modelate prin funcții liniare",
        href: "/lectii/probleme-functii-liniare"
    }
};
const lectiaProblemeFunctiiLiniare = {
    id: "probleme-functii-liniare",
    slug: "probleme-functii-liniare",
    modul: 3,
    numarLectie: 9,
    totalLectiiModul: 9,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Probleme modelate prin funcții liniare",
    descriere: "Aplici funcțiile și ecuațiile liniare în probleme concrete cu prețuri, distanțe, tarife și alte situații reale.",
    obiective: [
        {
            icon: "📝",
            titlu: "Să traduci problema",
            descriere: "Vei transforma informațiile din text într-o formulă matematică."
        },
        {
            icon: "📊",
            titlu: "Să construiești modelul",
            descriere: "Vei folosi expresii de forma ax + b."
        },
        {
            icon: "✅",
            titlu: "Să interpretezi rezultatul",
            descriere: "Vei verifica dacă răspunsul are sens în context."
        }
    ],
    videoLectii: [
        {
            numar: 1,
            titlu: "Cum transformăm textul în matematică",
            durata: "5 min",
            descriere: "Identificăm necunoscuta și relația dintre mărimi.",
            idei: [
                "Alegem necunoscuta x.",
                "Identificăm valoarea fixă.",
                "Identificăm valoarea care depinde de x.",
                "Construim formula."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Un taxi costă 10 lei pornirea și 3 lei/km. Costul este C(x) = 3x + 10."
        },
        {
            numar: 2,
            titlu: "Tarif fix plus tarif variabil",
            durata: "4 min",
            descriere: "Una dintre cele mai comune situații produce exact forma ax + b.",
            idei: [
                "b = cost fix.",
                "a = cost pentru o unitate.",
                "x = numărul de unități."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Abonament 20 lei + 5 lei pentru fiecare utilizare: C(x) = 5x + 20."
        },
        {
            numar: 3,
            titlu: "Când căutăm valoarea lui x",
            durata: "4–5 min",
            descriere: "Dacă știm rezultatul final, obținem o ecuație.",
            idei: [
                "Scriem funcția.",
                "Egalăm funcția cu valoarea cunoscută.",
                "Rezolvăm ecuația.",
                "Interpretăm x."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "3x + 10 = 40 ⇒ 3x = 30 ⇒ x = 10 km."
        },
        {
            numar: 4,
            titlu: "Verificarea rezultatului",
            durata: "3–4 min",
            descriere: "Nu ne oprim la calcul: răspunsul trebuie să aibă sens.",
            idei: [
                "Verificăm unitatea de măsură.",
                "Verificăm dacă valoarea este posibilă.",
                "Scriem răspunsul în contextul problemei."
            ],
            exempluTitlu: "Exemplu",
            exemplu: "Dacă x reprezintă numărul de produse, o valoare negativă nu este acceptabilă în context."
        }
    ],
    fisaRapida: {
        titlu: "Modelul liniar",
        continut: [
            "Identifică necunoscuta.",
            "Caută partea fixă → b.",
            "Caută valoarea pe unitate → a.",
            "Construiește f(x) = ax + b.",
            "Rezolvă ecuația dacă este necesar.",
            "Interpretează rezultatul în context."
        ]
    },
    exercitii: [
        {
            intrebare: "Un taxi percepe 8 lei pornirea și 2 lei/km. Costul pentru x km este:",
            variante: [
                "C(x) = 8x + 2",
                "C(x) = 2x + 8",
                "C(x) = 10x",
                "C(x) = x + 10"
            ],
            corect: 1,
            explicatie: "8 lei este costul fix, iar 2 lei se plătesc pentru fiecare kilometru."
        },
        {
            intrebare: "Pentru C(x) = 2x + 8, cât costă o cursă de 5 km?",
            variante: [
                "10 lei",
                "13 lei",
                "18 lei",
                "20 lei"
            ],
            corect: 2,
            explicatie: "C(5) = 2 × 5 + 8 = 18 lei."
        },
        {
            intrebare: "Un serviciu costă 15 lei fix și 4 lei pentru fiecare unitate. Formula este:",
            variante: [
                "4x + 15",
                "15x + 4",
                "19x",
                "4x - 15"
            ],
            corect: 0,
            explicatie: "15 este partea fixă, iar 4 este costul pe unitate."
        },
        {
            intrebare: "Dacă C(x) = 3x + 10 și costul total este 40 lei, cât este x?",
            variante: [
                "5",
                "10",
                "15",
                "30"
            ],
            corect: 1,
            explicatie: "3x + 10 = 40 ⇒ 3x = 30 ⇒ x = 10."
        },
        {
            intrebare: "În modelul f(x) = 6x + 25, dacă 25 reprezintă abonamentul lunar, atunci 6 poate reprezenta:",
            variante: [
                "Numărul total de luni",
                "Costul pentru fiecare unitate consumată",
                "Costul fix",
                "Valoarea lui x"
            ],
            corect: 1,
            explicatie: "Coeficientul lui x reprezintă variația pentru fiecare unitate."
        },
        {
            intrebare: "După rezolvarea unei probleme modelate matematic este important:",
            variante: [
                "Să ignorăm contextul",
                "Să verificăm dacă rezultatul are sens",
                "Să schimbăm formula",
                "Să alegem mereu un număr întreg"
            ],
            corect: 1,
            explicatie: "Rezultatul matematic trebuie interpretat în situația concretă."
        }
    ],
    storageKeyFinalizata: "lectie-probleme-functii-liniare-finalizata",
    storageKeyXp: "lectie-probleme-functii-liniare-xp",
    urmatoareaLectie: {
        titlu: "Continuă cu Modulul 4",
        href: "/programa"
    }
};
const lectiiModul3 = [
    lectiaFunctiaGradulIntai,
    lectiaGraficFunctieGradulIntai,
    lectiaMonotoniaFunctieiGradulIntai,
    lectiaSemnulFunctieiGradulIntai,
    lectiaEcuatiiGradulIntai,
    lectiaInecuatiiGradulIntai,
    lectiaSistemeEcuatiiLiniare,
    lectiaInterpretareaGeometricaSistemelor,
    lectiaProblemeFunctiiLiniare
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://ujkqlrgbpfihubbusttq.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_b6_9_NSTO_ZQt6EY7Cajgw_S4nY9GPY"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_07z7-ue._.js.map