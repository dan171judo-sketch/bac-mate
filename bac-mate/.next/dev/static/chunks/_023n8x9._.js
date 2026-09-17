(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/LectieUniversala.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LectieUniversala
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/continut/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function LectieUniversala({ lectie }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [supabase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LectieUniversala.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])()
    }["LectieUniversala.useState"]);
    const [accesVerificat, setAccesVerificat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exercitiuCurent, setExercitiuCurent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [raspuns, setRaspuns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [verificat, setVerificat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [xpLectie, setXpLectie] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [xpAcordatLaUltimaVerificare, setXpAcordatLaUltimaVerificare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lectieFinalizata, setLectieFinalizata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoDeschis, setVideoDeschis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [raspunsVideo, setRaspunsVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [videoVerificat, setVideoVerificat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [teorieCompletaDeschisa, setTeorieCompletaDeschisa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exempluDeschis, setExempluDeschis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [salvareCloud, setSalvareCloud] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("nimic");
    const rezultatContentEngine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["obtineContinutLectie"])(lectie.slug);
    const continutDetaliat = rezultatContentEngine.continut;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LectieUniversala.useEffect": ()=>{
            let activ = true;
            async function verificaAccesulSiIncarcaProgresul() {
                const { data: { user }, error: userError } = await supabase.auth.getUser();
                if (!activ) {
                    return;
                }
                if (userError || !user) {
                    router.replace("/cont");
                    return;
                }
                const { data: profil, error: profilError } = await supabase.from("profiles").select("nume, profil_bac, evaluare_initiala_finalizata").eq("id", user.id).maybeSingle();
                if (!activ) {
                    return;
                }
                if (profilError) {
                    router.replace("/cont");
                    return;
                }
                if (!profil?.nume) {
                    router.replace("/date-personale");
                    return;
                }
                if (!profil.profil_bac) {
                    router.replace("/profil");
                    return;
                }
                if (!profil.evaluare_initiala_finalizata) {
                    router.replace("/evaluare");
                    return;
                }
                localStorage.setItem("bac-mate-nume", profil.nume);
                localStorage.setItem("bac-mate-profil-cod", profil.profil_bac);
                localStorage.setItem("bac-mate-evaluare-initiala-finalizata", "da");
                const finalizataLocal = localStorage.getItem(lectie.storageKeyFinalizata) === "da";
                const xpLocal = Number(localStorage.getItem(lectie.storageKeyXp) || "0");
                if (activ) {
                    setLectieFinalizata(finalizataLocal);
                    setXpLectie(Number.isNaN(xpLocal) ? 0 : xpLocal);
                }
                const { data, error } = await supabase.from("student_progress").select("completed, xp").eq("user_id", user.id).eq("lesson_id", lectie.id).maybeSingle();
                if (!activ) {
                    return;
                }
                if (!error && data) {
                    const xpSupabase = typeof data.xp === "number" ? data.xp : 0;
                    const finalizataSupabase = data.completed === true;
                    setXpLectie(xpSupabase);
                    setLectieFinalizata(finalizataSupabase);
                    localStorage.setItem(lectie.storageKeyXp, String(xpSupabase));
                    if (finalizataSupabase) {
                        localStorage.setItem(lectie.storageKeyFinalizata, "da");
                    } else {
                        localStorage.removeItem(lectie.storageKeyFinalizata);
                    }
                }
                if (activ) {
                    setAccesVerificat(true);
                }
            }
            verificaAccesulSiIncarcaProgresul();
            return ({
                "LectieUniversala.useEffect": ()=>{
                    activ = false;
                }
            })["LectieUniversala.useEffect"];
        }
    }["LectieUniversala.useEffect"], [
        lectie.id,
        lectie.storageKeyFinalizata,
        lectie.storageKeyXp,
        router,
        supabase
    ]);
    const exercitiiPentruTest = continutDetaliat?.exercitii?.length ? continutDetaliat.exercitii.map((item)=>{
        const variante = item.variante ?? [];
        const corectIndex = item.tip === "alegere-multipla" ? variante.findIndex((varianta)=>varianta === item.raspunsCorect) : -1;
        return {
            id: item.id,
            tip: item.tip,
            intrebare: item.enunt,
            variante,
            corect: corectIndex,
            raspunsCorect: item.raspunsCorect,
            explicatie: item.explicatieFinala,
            rezolvare: item.rezolvare ?? []
        };
    }) : lectie.exercitii.map((item, index)=>({
            id: `legacy-${index}`,
            tip: "alegere-multipla",
            intrebare: item.intrebare,
            variante: item.variante,
            corect: item.corect,
            raspunsCorect: item.variante[item.corect] ?? "",
            explicatie: item.explicatie,
            rezolvare: []
        }));
    const exercitiu = exercitiiPentruTest[exercitiuCurent];
    const esteUltimul = exercitiuCurent === exercitiiPentruTest.length - 1;
    const esteRezolvareCompleta = exercitiu?.tip === "rezolvare-completa";
    function normalizeazaRaspuns(valoare) {
        return valoare.trim().toLocaleLowerCase("ro-RO").replace(/\s+/g, "").replace(/[.,;:!?]/g, "");
    }
    const corect = !exercitiu ? false : exercitiu.tip === "alegere-multipla" ? typeof raspuns === "number" && raspuns === exercitiu.corect : exercitiu.tip === "raspuns-scurt" ? typeof raspuns === "string" && normalizeazaRaspuns(raspuns) === normalizeazaRaspuns(exercitiu.raspunsCorect) : false;
    const numarExercitiiAutoEvaluabile = exercitiiPentruTest.filter((item)=>item.tip !== "rezolvare-completa").length;
    const xpMaxim = numarExercitiiAutoEvaluabile * 10;
    /*
    XP determinist doar pentru
    exercițiile care pot fi evaluate
    automat.

    Exercițiile de rezolvare completă
    sunt comparate cu soluția-model și
    nu primesc automat XP până când
    vom avea verificarea pas-cu-pas.
  */ const numarAutoEvaluabilePanaAici = exercitiiPentruTest.slice(0, exercitiuCurent + 1).filter((item)=>item.tip !== "rezolvare-completa").length;
    const xpTintaExercitiu = exercitiu?.tip === "rezolvare-completa" ? xpLectie : Math.min(numarAutoEvaluabilePanaAici * 10, xpMaxim);
    async function salveazaProgresulInSupabase(xp, finalizata) {
        setSalvareCloud("salvare");
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            setSalvareCloud("eroare");
            router.replace("/cont");
            return;
        }
        const { error } = await supabase.from("student_progress").upsert({
            user_id: user.id,
            lesson_id: lectie.id,
            xp,
            completed: finalizata,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "user_id,lesson_id"
        });
        if (error) {
            console.error("Eroare la salvarea progresului:", error);
            setSalvareCloud("eroare");
            return;
        }
        setSalvareCloud("salvat");
    }
    async function verificaRaspunsul() {
        if (raspuns === null || !exercitiu || verificat) {
            return;
        }
        setVerificat(true);
        setXpAcordatLaUltimaVerificare(false);
        /*
      Exercițiile de rezolvare completă
      nu primesc încă XP automat.

      Elevul își compară rezolvarea cu
      soluția-model.

      Dacă acesta este ultimul exercițiu,
      lecția este considerată parcursă,
      fără să inventăm o evaluare automată.
    */ if (esteRezolvareCompleta) {
            if (esteUltimul) {
                setLectieFinalizata(true);
                localStorage.setItem(lectie.storageKeyFinalizata, "da");
                await salveazaProgresulInSupabase(xpLectie, true);
            }
            return;
        }
        /*
      Pentru alegere multiplă și răspuns
      scurt folosim rezultatul calculat
      deja în constanta `corect`.

      Astfel păstrăm aceeași logică XP
      pentru ambele tipuri auto-evaluabile.
    */ if (corect) {
            const acordaXpNou = xpLectie < xpTintaExercitiu;
            const xpNou = Math.max(xpLectie, xpTintaExercitiu);
            setXpAcordatLaUltimaVerificare(acordaXpNou);
            const finalizataAcum = esteUltimul;
            setXpLectie(xpNou);
            localStorage.setItem(lectie.storageKeyXp, String(xpNou));
            if (finalizataAcum) {
                setLectieFinalizata(true);
                localStorage.setItem(lectie.storageKeyFinalizata, "da");
            }
            await salveazaProgresulInSupabase(xpNou, finalizataAcum || lectieFinalizata);
        }
    }
    function urmatorulExercitiu() {
        if (exercitiuCurent >= exercitiiPentruTest.length - 1) {
            return;
        }
        setExercitiuCurent((valoare)=>valoare + 1);
        setRaspuns(null);
        setVerificat(false);
        setXpAcordatLaUltimaVerificare(false);
        setSalvareCloud("nimic");
    }
    function incearcaDinNou() {
        setRaspuns(null);
        setVerificat(false);
        setXpAcordatLaUltimaVerificare(false);
        setSalvareCloud("nimic");
    }
    function comutaVideo(numar) {
        if (videoDeschis === numar) {
            setVideoDeschis(null);
        } else {
            setVideoDeschis(numar);
        }
        setRaspunsVideo(null);
        setVideoVerificat(false);
    }
    if (!accesVerificat) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-slate-950 text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-5xl px-6 py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400",
                    children: "Se verifică autentificarea și se încarcă lecția..."
                }, void 0, false, {
                    fileName: "[project]/components/LectieUniversala.tsx",
                    lineNumber: 583,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 582,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LectieUniversala.tsx",
            lineNumber: 581,
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
                            href: "/programa",
                            className: "font-bold text-slate-300 transition hover:text-white",
                            children: "← Programa mea"
                        }, void 0, false, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 596,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/",
                            className: "text-xl font-black",
                            children: [
                                "BAC",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-blue-500",
                                    children: "MATE"
                                }, void 0, false, {
                                    fileName: "[project]/components/LectieUniversala.tsx",
                                    lineNumber: 608,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 603,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400",
                            children: lectie.profil
                        }, void 0, false, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 613,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LectieUniversala.tsx",
                    lineNumber: 595,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 594,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-5xl px-6 py-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-blue-500/10 px-3 py-1 text-sm font-bold text-blue-400",
                                        children: [
                                            "MODUL ",
                                            lectie.modul
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 625,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400",
                                        children: [
                                            "Lecția",
                                            " ",
                                            lectie.numarLectie
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 629,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400",
                                        children: lectie.clasa
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 634,
                                        columnNumber: 13
                                    }, this),
                                    continutDetaliat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `rounded-full px-3 py-1 text-sm font-bold ${rezultatContentEngine.publicabil ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-300"}`,
                                        children: rezultatContentEngine.publicabil ? "✓ Conținut verificat" : `⚠ Conținut ${continutDetaliat.verificare.status}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 639,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-5 text-4xl font-black leading-tight md:text-5xl",
                                children: continutDetaliat ? continutDetaliat.titlu : lectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 653,
                                columnNumber: 11
                            }, this),
                            continutDetaliat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-3xl text-xl font-semibold leading-8 text-blue-300",
                                children: continutDetaliat.subtitlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 660,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 max-w-3xl text-lg leading-8 text-slate-300",
                                children: continutDetaliat ? continutDetaliat.descriere : lectie.descriere
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 667,
                                columnNumber: 11
                            }, this),
                            continutDetaliat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex flex-wrap gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300",
                                        children: [
                                            "⏱",
                                            " ",
                                            continutDetaliat.durataEstimataMinute,
                                            " ",
                                            "minute"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300",
                                        children: [
                                            "🎬",
                                            " ",
                                            continutDetaliat.videoLectii.length,
                                            " ",
                                            "mini-video"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 683,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 674,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 h-3 overflow-hidden rounded-full bg-slate-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-blue-500",
                                    style: {
                                        width: `${lectie.numarLectie / lectie.totalLectiiModul * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/LectieUniversala.tsx",
                                    lineNumber: 695,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 694,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-500",
                                children: [
                                    "Modul ",
                                    lectie.modul,
                                    " • Lecția",
                                    " ",
                                    lectie.numarLectie,
                                    " din",
                                    " ",
                                    lectie.totalLectiiModul
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 707,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this),
                    continutDetaliat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                        children: "🎯 La finalul lecției"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 721,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 grid gap-3 md:grid-cols-2",
                                        children: continutDetaliat.obiective.map((obiectiv, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 rounded-2xl bg-slate-950 p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-black text-blue-400",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 735,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-200",
                                                        children: obiectiv
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 739,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${obiectiv}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 731,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 725,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 720,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-end justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                                        children: "🎬 Lecția video"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 753,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-2 text-3xl font-black md:text-4xl",
                                                        children: "Învață în bucăți scurte"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 757,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-3 max-w-2xl leading-7 text-slate-400",
                                                        children: "Urmărește câte o explicație, apoi verifică imediat dacă ai înțeles."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 761,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 752,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-black text-blue-300",
                                                children: [
                                                    continutDetaliat.videoLectii.length,
                                                    " ",
                                                    "părți"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 768,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 751,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-7 space-y-6",
                                        children: continutDetaliat.videoLectii.map((video)=>{
                                            const deschis = videoDeschis === video.numar;
                                            const intrebare = video.verificareRapida;
                                            const raspunsVideoCorect = intrebare && raspunsVideo === intrebare.raspunsCorect;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "overflow-hidden rounded-3xl border border-slate-800 bg-slate-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex min-h-[320px] items-center justify-center overflow-hidden bg-slate-950 px-6 py-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-black",
                                                                children: [
                                                                    "PARTEA",
                                                                    " ",
                                                                    video.numar
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 800,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute right-5 top-5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300",
                                                                children: [
                                                                    "⏱",
                                                                    " ",
                                                                    video.durataMinute,
                                                                    " ",
                                                                    "min"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 805,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "max-w-2xl text-center",
                                                                children: video.videoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                                    controls: true,
                                                                    className: "mx-auto w-full rounded-2xl",
                                                                    src: video.videoUrl
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/LectieUniversala.tsx",
                                                                    lineNumber: 815,
                                                                    columnNumber: 31
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>comutaVideo(video.numar),
                                                                            className: "mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl shadow-2xl transition hover:scale-105 hover:bg-blue-500",
                                                                            children: deschis ? "✓" : "▶"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 824,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "mt-7 text-2xl font-black md:text-3xl",
                                                                            children: video.titlu
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 838,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-4 leading-7 text-slate-400",
                                                                            children: video.descriere
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 844,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-5 text-sm font-bold text-slate-600",
                                                                            children: "Videoclipul BAC MATE va fi integrat aici."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 850,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/LectieUniversala.tsx",
                                                                    lineNumber: 823,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 813,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 799,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>comutaVideo(video.numar),
                                                        className: "flex w-full items-center justify-between gap-4 border-t border-slate-800 p-6 text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-black uppercase tracking-wider text-emerald-400",
                                                                        children: "După video"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 871,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-xl font-black",
                                                                        children: "Verifică ce ai înțeles"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 875,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 870,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl text-slate-400",
                                                                children: deschis ? "−" : "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 881,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 861,
                                                        columnNumber: 25
                                                    }, this),
                                                    deschis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t border-slate-800 p-6 md:p-7",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-black uppercase tracking-wider text-emerald-400",
                                                                        children: "🧠 3 lucruri de reținut"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 894,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-4 grid gap-3 md:grid-cols-3",
                                                                        children: video.ideiDeRetinut.map((idee, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "rounded-2xl bg-slate-950 p-5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 font-black text-emerald-400",
                                                                                        children: "✓"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 909,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-3 leading-7 text-slate-200",
                                                                                        children: idee
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 913,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, `${idee}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 905,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 899,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 893,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-7 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                                                        children: [
                                                                            "✏️",
                                                                            " ",
                                                                            video.exemplu.titlu
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 927,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-4 text-lg font-black leading-8",
                                                                        children: video.exemplu.enunt
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 936,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-5 space-y-3",
                                                                        children: video.exemplu.rezolvareScurta.map((pas, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex gap-3 rounded-2xl bg-slate-950 p-4",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-black text-blue-400",
                                                                                        children: [
                                                                                            index + 1,
                                                                                            "."
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 954,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "leading-7 text-slate-300",
                                                                                        children: pas
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 960,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, `${pas}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 950,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 944,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-5 rounded-2xl bg-emerald-500/10 p-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-black text-emerald-400",
                                                                                children: [
                                                                                    "Răspuns:",
                                                                                    " "
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 971,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-bold",
                                                                                children: video.exemplu.raspuns
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 975,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 970,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 926,
                                                                columnNumber: 29
                                                            }, this),
                                                            intrebare && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-7 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-black uppercase tracking-wider text-violet-400",
                                                                        children: "⚡ Verificare rapidă"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 989,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "mt-4 text-xl font-black leading-8",
                                                                        children: intrebare.intrebare
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 994,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-5 grid gap-3",
                                                                        children: intrebare.variante.map((varianta, index)=>{
                                                                            let stil = "border-slate-700 bg-slate-950 hover:border-slate-500";
                                                                            if (raspunsVideo === index) {
                                                                                stil = "border-violet-500 bg-violet-500/10";
                                                                            }
                                                                            if (videoVerificat && index === intrebare.raspunsCorect) {
                                                                                stil = "border-emerald-500 bg-emerald-500/10";
                                                                            }
                                                                            if (videoVerificat && raspunsVideo === index && index !== intrebare.raspunsCorect) {
                                                                                stil = "border-red-500 bg-red-500/10";
                                                                            }
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                disabled: videoVerificat,
                                                                                onClick: ()=>setRaspunsVideo(index),
                                                                                className: `rounded-2xl border px-5 py-4 text-left font-semibold transition ${stil}`,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "mr-3 text-slate-500",
                                                                                        children: [
                                                                                            String.fromCharCode(65 + index),
                                                                                            "."
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1051,
                                                                                        columnNumber: 43
                                                                                    }, this),
                                                                                    varianta
                                                                                ]
                                                                            }, `${varianta}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1038,
                                                                                columnNumber: 41
                                                                            }, this);
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1000,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    !videoVerificat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        disabled: raspunsVideo === null,
                                                                        onClick: ()=>setVideoVerificat(true),
                                                                        className: `mt-5 rounded-xl px-5 py-3 font-black transition ${raspunsVideo !== null ? "bg-violet-600 hover:bg-violet-500" : "cursor-not-allowed bg-slate-800 text-slate-500"}`,
                                                                        children: "Verifică"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1069,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    videoVerificat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `mt-5 rounded-2xl p-5 ${raspunsVideoCorect ? "bg-emerald-500/10" : "bg-red-500/10"}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: `font-black ${raspunsVideoCorect ? "text-emerald-400" : "text-red-400"}`,
                                                                                children: raspunsVideoCorect ? "✓ Corect!" : "Nu încă. Uită-te la explicație."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1099,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-2 leading-7 text-slate-300",
                                                                                children: intrebare.explicatie
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1111,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            !raspunsVideoCorect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    setRaspunsVideo(null);
                                                                                    setVideoVerificat(false);
                                                                                },
                                                                                className: "mt-4 rounded-xl border border-slate-700 px-4 py-2 font-bold",
                                                                                children: "Încearcă din nou"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1118,
                                                                                columnNumber: 39
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1092,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 988,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 889,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, video.id, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 793,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 777,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 750,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10 rounded-3xl border border-violet-500/30 bg-violet-500/10 p-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black uppercase tracking-wider text-violet-400",
                                        children: "🤖 Profesorul BAC MATE"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1151,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Nu ai înțeles ceva?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 max-w-3xl leading-7 text-slate-300",
                                        children: "Profesorul AI va putea să îți explice exact partea la care te-ai blocat, fără să fie nevoie să recitești toată lecția."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 flex flex-wrap gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-xl bg-violet-600 px-4 py-3 font-bold transition hover:bg-violet-500",
                                                children: "💡 Explică-mi mai simplu"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1169,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                                children: "🧩 Dă-mi alt exemplu"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                                children: "🎯 Testează-mă"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1185,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-xs text-violet-300/60",
                                        children: "Profesorul AI va fi conectat într-o etapă ulterioară."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1193,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1150,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setTeorieCompletaDeschisa((valoare)=>!valoare),
                                        className: "flex w-full items-center justify-between gap-5 p-7 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-black uppercase tracking-wider text-slate-500",
                                                        children: "📚 Material de aprofundare"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1214,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-2 text-2xl font-black",
                                                        children: "Vrei explicația completă?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1219,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-slate-400",
                                                        children: "Definiții, teorie, formule, exemple rezolvate și greșeli frecvente."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1224,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1213,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl text-slate-400",
                                                children: teorieCompletaDeschisa ? "−" : "+"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1232,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1203,
                                        columnNumber: 15
                                    }, this),
                                    teorieCompletaDeschisa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-slate-800 p-7",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-black uppercase tracking-wider text-violet-400",
                                                        children: "Termeni cheie"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1245,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 flex flex-wrap gap-2",
                                                        children: continutDetaliat.termeniCheie.map((termen)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded-full bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300",
                                                                children: termen
                                                            }, termen, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1252,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1249,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1244,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-black",
                                                        children: "Definiții"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1266,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-5 space-y-4",
                                                        children: continutDetaliat.definitii.map((definitie, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl bg-slate-950 p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-black text-blue-300",
                                                                        children: definitie.termen
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1280,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: definitie.definitie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1286,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    definitie.observatie && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 text-sm leading-6 text-blue-200",
                                                                        children: [
                                                                            "💡",
                                                                            " ",
                                                                            definitie.observatie
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1293,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, `${definitie.termen}-${index}`, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1276,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1270,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1265,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-black",
                                                        children: "Teorie"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1309,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-5 space-y-5",
                                                        children: continutDetaliat.teorie.map((sectiune)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl bg-slate-950 p-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "text-xl font-black",
                                                                        children: sectiune.titlu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1322,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: sectiune.explicatie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1328,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-4 space-y-2",
                                                                        children: sectiune.ideiCheie.map((idee, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "leading-7 text-slate-400",
                                                                                children: [
                                                                                    "✓",
                                                                                    " ",
                                                                                    idee
                                                                                ]
                                                                            }, `${idee}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1340,
                                                                                columnNumber: 35
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1334,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, sectiune.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1316,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1313,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1308,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-black",
                                                        children: "Relații importante"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1361,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-5 grid gap-4 md:grid-cols-2",
                                                        children: continutDetaliat.formule.map((formula)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-black text-amber-300",
                                                                        children: formula.nume
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1374,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-4 rounded-xl bg-slate-950 p-4 text-center text-xl font-black",
                                                                        children: formula.formula
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1380,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-4 leading-7 text-slate-300",
                                                                        children: formula.explicatie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1386,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    formula.exempluScurt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 text-sm leading-6 text-slate-400",
                                                                        children: [
                                                                            "Exemplu:",
                                                                            " ",
                                                                            formula.exempluScurt
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1393,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, formula.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1368,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1365,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1360,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-black",
                                                        children: "Exemple rezolvate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1409,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-5 space-y-4",
                                                        children: continutDetaliat.exempleRezolvate.map((exemplu)=>{
                                                            const deschis = exempluDeschis === exemplu.id;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "overflow-hidden rounded-2xl bg-slate-950",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>setExempluDeschis(deschis ? null : exemplu.id),
                                                                        className: "flex w-full items-center justify-between gap-4 p-5 text-left",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "font-black",
                                                                                        children: exemplu.titlu
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1439,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-2 text-sm leading-6 text-slate-400",
                                                                                        children: exemplu.enunt
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1445,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1438,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xl text-slate-400",
                                                                                children: deschis ? "−" : "+"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1452,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1427,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    deschis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "border-t border-slate-800 p-5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "space-y-3",
                                                                                children: exemplu.pasi.map((pas)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex gap-3 rounded-xl bg-slate-900 p-4",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "font-black text-blue-400",
                                                                                                children: [
                                                                                                    pas.numar,
                                                                                                    "."
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                lineNumber: 1472,
                                                                                                columnNumber: 43
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "font-black",
                                                                                                        children: pas.titlu
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                        lineNumber: 1480,
                                                                                                        columnNumber: 45
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "mt-2 leading-7 text-slate-300",
                                                                                                        children: pas.continut
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                        lineNumber: 1486,
                                                                                                        columnNumber: 45
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                lineNumber: 1479,
                                                                                                columnNumber: 43
                                                                                            }, this)
                                                                                        ]
                                                                                    }, pas.numar, true, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1466,
                                                                                        columnNumber: 41
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1461,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-4 rounded-xl bg-emerald-500/10 p-4",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-black text-emerald-400",
                                                                                        children: [
                                                                                            "Răspuns:",
                                                                                            " "
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1498,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    exemplu.raspunsFinal
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1497,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1460,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, exemplu.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1421,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1413,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1408,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-black text-red-300",
                                                        children: "⚠ Greșeli frecvente"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1518,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-5 space-y-4",
                                                        children: continutDetaliat.greseliFrecvente.map((greseala, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl border border-red-500/20 bg-red-500/5 p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-black text-red-300",
                                                                        children: [
                                                                            "❌",
                                                                            " ",
                                                                            greseala.greseala
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1534,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-400",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "text-slate-200",
                                                                                children: "De ce:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1542,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            greseala.deCeEsteGresit
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1541,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-emerald-300",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Cum o eviți:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1551,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            greseala.cumOEviti
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1550,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, index, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1528,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1522,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1517,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1240,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black uppercase tracking-wider text-emerald-400",
                                        children: "🧠 Fișa de 30 de secunde"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1570,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Ce trebuie să reții"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1575,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 space-y-3",
                                        children: continutDetaliat.rezumat.ideiDeRetinut.map((idee, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 rounded-2xl bg-slate-950 p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-emerald-400",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1589,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-300",
                                                        children: idee
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1593,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${idee}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1585,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1579,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex flex-wrap gap-3",
                                        children: continutDetaliat.rezumat.formuleDeRetinut.map((formula)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-xl bg-slate-950 px-4 py-3 font-black",
                                                children: formula
                                            }, formula, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1604,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1601,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1569,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 717,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                        children: "🎯 Obiective"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1622,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Ce vei ști să faci"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1626,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 grid gap-4 md:grid-cols-3",
                                        children: lectie.obiective.map((obiectiv, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl bg-slate-950 p-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-3xl",
                                                        children: obiectiv.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1640,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-3 font-black",
                                                        children: obiectiv.titlu
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1646,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-sm leading-6 text-slate-400",
                                                        children: obiectiv.descriere
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1652,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${obiectiv.titlu}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1636,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1630,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1621,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                        children: "Lecția video"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1664,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-2 text-3xl font-black",
                                        children: "Învață pas cu pas"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1668,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-7 space-y-6",
                                        children: lectie.videoLectii.map((video)=>{
                                            const deschis = videoDeschis === video.numar;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "overflow-hidden rounded-3xl border border-slate-800 bg-slate-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex min-h-[300px] items-center justify-center bg-slate-950 px-6 py-10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-black",
                                                                children: [
                                                                    "VIDEO",
                                                                    " ",
                                                                    video.numar
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1687,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute right-5 top-5 rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300",
                                                                children: [
                                                                    "⏱",
                                                                    " ",
                                                                    video.durata
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1694,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "max-w-xl text-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>setVideoDeschis(deschis ? null : video.numar),
                                                                        className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl",
                                                                        children: "▶"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1702,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "mt-6 text-2xl font-black",
                                                                        children: video.titlu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1716,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-400",
                                                                        children: video.descriere
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1722,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1701,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1686,
                                                        columnNumber: 25
                                                    }, this),
                                                    deschis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid gap-3 md:grid-cols-2",
                                                                children: video.idei.map((idee, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-3 rounded-2xl bg-slate-950 p-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-emerald-400",
                                                                                children: "✓"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1742,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: idee
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1746,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, `${idee}-${index}`, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1738,
                                                                        columnNumber: 35
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1732,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-5 rounded-2xl bg-blue-500/5 p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-black text-blue-400",
                                                                        children: video.exempluTitlu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1757,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: video.exemplu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1763,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1756,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1731,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, video.numar, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1680,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1672,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1663,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black uppercase tracking-wider text-emerald-400",
                                        children: "🧠 Fișa rapidă"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1779,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: lectie.fisaRapida.titlu
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1783,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 space-y-3",
                                        children: lectie.fisaRapida.continut.map((rand, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 rounded-2xl bg-slate-950 p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-emerald-400",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1800,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-300",
                                                        children: rand
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1804,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${rand}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1796,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1790,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1778,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1618,
                        columnNumber: 11
                    }, this),
                    exercitiu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-7 md:p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                                children: "📝 Mini-test"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1822,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "mt-2 text-3xl font-black",
                                                children: "Verifică dacă ai înțeles"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1826,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-slate-400",
                                                children: [
                                                    exercitiiPentruTest.length,
                                                    " ",
                                                    "exerciții",
                                                    xpMaxim > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            " ",
                                                            "• maximum",
                                                            " ",
                                                            xpMaxim,
                                                            " XP"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1837,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1831,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1821,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl bg-slate-950 px-4 py-3 font-black",
                                        children: [
                                            exercitiuCurent + 1,
                                            "/",
                                            exercitiiPentruTest.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1846,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1820,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 h-2 overflow-hidden rounded-full bg-slate-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-blue-500",
                                    style: {
                                        width: `${(exercitiuCurent + 1) / exercitiiPentruTest.length * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/LectieUniversala.tsx",
                                    lineNumber: 1855,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1854,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-slate-400",
                                        children: [
                                            "Exercițiul",
                                            " ",
                                            exercitiuCurent + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1869,
                                        columnNumber: 15
                                    }, this),
                                    exercitiu.tip === "alegere-multipla" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400",
                                        children: "Alegere multiplă"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1876,
                                        columnNumber: 17
                                    }, this),
                                    exercitiu.tip === "raspuns-scurt" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300",
                                        children: "Răspuns scurt"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1883,
                                        columnNumber: 17
                                    }, this),
                                    exercitiu.tip === "rezolvare-completa" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300",
                                        children: "Rezolvare completă"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1890,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1868,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-6 text-xl font-black md:text-2xl",
                                children: exercitiu.intrebare
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1896,
                                columnNumber: 13
                            }, this),
                            exercitiu.tip === "alegere-multipla" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid gap-3",
                                children: exercitiu.variante.map((varianta, index)=>{
                                    let stil = "border-slate-700 bg-slate-950 hover:border-slate-500";
                                    if (raspuns === index) {
                                        stil = "border-blue-500 bg-blue-500/10";
                                    }
                                    if (verificat && index === exercitiu.corect) {
                                        stil = "border-emerald-500 bg-emerald-500/10";
                                    }
                                    if (verificat && raspuns === index && index !== exercitiu.corect) {
                                        stil = "border-red-500 bg-red-500/10";
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: verificat,
                                        onClick: ()=>setRaspuns(index),
                                        className: `rounded-2xl border px-5 py-4 text-left font-semibold transition ${stil}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mr-3 text-slate-500",
                                                children: [
                                                    String.fromCharCode(65 + index),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1951,
                                                columnNumber: 25
                                            }, this),
                                            varianta
                                        ]
                                    }, `${varianta}-${index}`, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1938,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1902,
                                columnNumber: 15
                            }, this),
                            exercitiu.tip === "raspuns-scurt" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-2 block text-sm font-bold text-slate-400",
                                        children: "Răspunsul tău"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1970,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        disabled: verificat,
                                        value: typeof raspuns === "string" ? raspuns : "",
                                        onChange: (event)=>setRaspuns(event.target.value),
                                        placeholder: "Scrie răspunsul aici...",
                                        className: "w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1974,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1969,
                                columnNumber: 15
                            }, this),
                            exercitiu.tip === "rezolvare-completa" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-2 block text-sm font-bold text-slate-400",
                                        children: "Scrie rezolvarea ta"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1998,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        disabled: verificat,
                                        value: typeof raspuns === "string" ? raspuns : "",
                                        onChange: (event)=>setRaspuns(event.target.value),
                                        placeholder: "Rezolvă problema pas cu pas...",
                                        rows: 7,
                                        className: "w-full resize-y rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 leading-7 text-white outline-none transition focus:border-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2002,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm leading-6 text-slate-500",
                                        children: "Acest tip de exercițiu nu primește încă o evaluare automată. După ce scrii rezolvarea, o vei compara cu soluția-model."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2021,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1997,
                                columnNumber: 15
                            }, this),
                            !verificat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: verificaRaspunsul,
                                disabled: raspuns === null || typeof raspuns === "string" && raspuns.trim() === "",
                                className: `mt-6 rounded-xl px-6 py-3 font-black ${raspuns !== null && !(typeof raspuns === "string" && raspuns.trim() === "") ? "bg-blue-600 hover:bg-blue-500" : "cursor-not-allowed bg-slate-800 text-slate-500"}`,
                                children: esteRezolvareCompleta ? "Compară cu soluția" : "Verifică răspunsul"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2034,
                                columnNumber: 15
                            }, this),
                            verificat && esteRezolvareCompleta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 rounded-2xl bg-blue-500/10 p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-black text-blue-300",
                                        children: "📘 Soluția-model"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2067,
                                        columnNumber: 19
                                    }, this),
                                    exercitiu.rezolvare.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 grid gap-4",
                                        children: exercitiu.rezolvare.map((pas)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl bg-slate-950 p-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-black text-blue-400",
                                                        children: [
                                                            "Pasul",
                                                            " ",
                                                            pas.numar,
                                                            ".",
                                                            " ",
                                                            pas.titlu
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 2080,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 leading-7 text-slate-300",
                                                        children: pas.continut
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 2091,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, `${exercitiu.id}-${pas.numar}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 2076,
                                                columnNumber: 27
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2073,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 rounded-xl bg-slate-950 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold uppercase tracking-wider text-slate-500",
                                                children: "Răspuns final"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 2103,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 font-bold text-emerald-300",
                                                children: exercitiu.raspunsCorect
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 2107,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2102,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 leading-7 text-slate-300",
                                        children: exercitiu.explicatie
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2114,
                                        columnNumber: 19
                                    }, this),
                                    !esteUltimul && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: urmatorulExercitiu,
                                        className: "mt-5 rounded-xl bg-blue-600 px-5 py-3 font-black",
                                        children: "Următorul exercițiu →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2121,
                                        columnNumber: 21
                                    }, this),
                                    esteUltimul && lectieFinalizata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 rounded-2xl bg-slate-950 p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-black",
                                                children: "🎉 Lecție parcursă"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 2136,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 text-slate-300",
                                                children: "Ai ajuns la finalul tuturor exercițiilor."
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 2141,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2135,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2066,
                                columnNumber: 17
                            }, this),
                            verificat && !esteRezolvareCompleta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-6 rounded-2xl p-6 ${corect ? "bg-emerald-500/10" : "bg-red-500/10"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-lg font-black ${corect ? "text-emerald-400" : "text-red-400"}`,
                                        children: corect ? xpAcordatLaUltimaVerificare ? "✓ Corect! Ai câștigat 10 XP." : "✓ Corect! Exercițiul era deja creditat." : "Nu este răspunsul corect."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2160,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 leading-7 text-slate-300",
                                        children: exercitiu.explicatie
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2174,
                                        columnNumber: 19
                                    }, this),
                                    !corect && exercitiu.tip === "raspuns-scurt" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 font-bold text-emerald-300",
                                        children: [
                                            "Răspuns corect:",
                                            " ",
                                            exercitiu.raspunsCorect
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2183,
                                        columnNumber: 23
                                    }, this),
                                    corect && salvareCloud === "salvare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-blue-400",
                                        children: "☁️ Se salvează progresul..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2194,
                                        columnNumber: 23
                                    }, this),
                                    corect && salvareCloud === "salvat" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-emerald-400",
                                        children: "✓ Progres salvat în cont"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2203,
                                        columnNumber: 23
                                    }, this),
                                    corect && salvareCloud === "eroare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-amber-400",
                                        children: "⚠️ Progresul nu a putut fi salvat momentan în cont."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2212,
                                        columnNumber: 23
                                    }, this),
                                    corect && !esteUltimul && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: urmatorulExercitiu,
                                        className: "mt-5 rounded-xl bg-blue-600 px-5 py-3 font-black",
                                        children: "Următorul exercițiu →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2221,
                                        columnNumber: 23
                                    }, this),
                                    !corect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: incearcaDinNou,
                                        className: "mt-5 rounded-xl border border-slate-700 px-5 py-3 font-black",
                                        children: "Încearcă din nou"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2234,
                                        columnNumber: 21
                                    }, this),
                                    corect && esteUltimul && lectieFinalizata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 rounded-2xl bg-slate-950 p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-black",
                                                children: "🎉 Lecție finalizată"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 2249,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 text-slate-300",
                                                children: [
                                                    "Ai acumulat",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            xpLectie,
                                                            " ",
                                                            "XP"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 2256,
                                                        columnNumber: 27
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 2254,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2248,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2153,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex items-center justify-between border-t border-slate-800 pt-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-500",
                                        children: "XP în această lecție"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-black text-amber-400",
                                        children: [
                                            "⭐ ",
                                            xpLectie,
                                            " XP"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 2274,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2269,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1819,
                        columnNumber: 11
                    }, this),
                    lectie.urmatoareaLectie && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-slate-500",
                                children: "Următoarea lecție"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-xl font-black",
                                children: lectie.urmatoareaLectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2289,
                                columnNumber: 13
                            }, this),
                            lectie.urmatoareaLectie.href && lectieFinalizata ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: lectie.urmatoareaLectie.href,
                                className: "mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-black",
                                children: "Continuă →"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2301,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm font-bold text-slate-600",
                                children: "🔒 Finalizează această lecție pentru a continua"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 2312,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 2284,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 619,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LectieUniversala.tsx",
        lineNumber: 593,
        columnNumber: 5
    }, this);
}
_s(LectieUniversala, "J+7QJvCXDNKAnrXU+p7MaGAAXzE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LectieUniversala;
var _c;
__turbopack_context__.k.register(_c, "LectieUniversala");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/continut/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "existaContinutDetaliat",
    ()=>existaContinutDetaliat,
    "obtineContinutLectie",
    ()=>obtineContinutLectie,
    "obtineToateLectiileCuContinut",
    ()=>obtineToateLectiileCuContinut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/continut/lectii/m5-vectori-in-plan.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$numere$2d$reale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/continut/lectii/numere-reale.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$estimari$2d$aproximari$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/continut/lectii/estimari-aproximari.ts [app-client] (ecmascript)");
;
;
;
/*
 * Lecțiile care au deja Content Engine.
 *
 * Lecțiile care nu se găsesc aici continuă să funcționeze
 * prin sistemul legacy din LectieUniversala.
 */ const registruContinut = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutVectoriInPlan"].slug]: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutVectoriInPlan"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$numere$2d$reale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutNumereReale"].slug]: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$numere$2d$reale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutNumereReale"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$estimari$2d$aproximari$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutEstimariAproximari"].slug]: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$estimari$2d$aproximari$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutEstimariAproximari"]
};
/*
 * =========================================================
 * PUBLICATION GATE
 * =========================================================
 *
 * O lecție este considerată publicabilă numai dacă:
 *
 * 1. statusul este "publicabil";
 * 2. matematica a fost verificată;
 * 3. programa a fost verificată;
 * 4. exercițiile au fost verificate;
 * 5. limba română a fost verificată.
 *
 * Validarea structurală singură NU face o lecție publicabilă.
 */ function estePublicabil(continut) {
    const verificare = continut.verificare;
    return verificare.status === "publicabil" && verificare.verificatMatematic === true && verificare.verificatPrograma === true && verificare.verificatExercitii === true && verificare.verificatLimbaRomana === true;
}
function obtineContinutLectie(slug, modul, numarLectie) {
    const dupaSlug = registruContinut[slug];
    if (dupaSlug) {
        return {
            continut: dupaSlug,
            publicabil: estePublicabil(dupaSlug)
        };
    }
    if (typeof modul === "number" && typeof numarLectie === "number") {
        const dupaPozitie = Object.values(registruContinut).find((lectie)=>lectie.modul === modul && lectie.numarLectie === numarLectie);
        if (dupaPozitie) {
            return {
                continut: dupaPozitie,
                publicabil: estePublicabil(dupaPozitie)
            };
        }
    }
    /*
   * Lecția nu are încă un fișier Content Engine.
   *
   * Returnăm null, iar LectieUniversala poate folosi
   * în continuare conținutul legacy.
   */ return {
        continut: null,
        publicabil: false
    };
}
function obtineToateLectiileCuContinut() {
    return Object.values(registruContinut);
}
function existaContinutDetaliat(slug) {
    return Boolean(registruContinut[slug]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/continut/lectii/estimari-aproximari.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "continutEstimariAproximari",
    ()=>continutEstimariAproximari
]);
const continutEstimariAproximari = {
    id: "estimari-aproximari",
    slug: "estimari-aproximari",
    modul: 1,
    numarLectie: 2,
    clasa: "IX",
    profil: "M_mate-info",
    titlu: "Estimări și aproximări",
    subtitlu: "Cum înlocuiești un număr cu o valoare apropiată și cum controlezi eroarea făcută",
    descriere: "În această lecție înveți să deosebești estimarea de aproximare, să construiești aproximări prin lipsă și prin adaos, să rotunjești corect numere reale și să verifici dacă o valoare aproximativă este potrivită pentru problema dată.",
    nivelPrincipal: "fundament",
    durataEstimataMinute: 45,
    prerechizite: [
        "Compararea și ordonarea numerelor reale",
        "Scrierea zecimală a numerelor reale",
        "Poziția cifrelor într-un număr zecimal",
        "Operații elementare cu numere reale"
    ],
    obiective: [
        "Să explici diferența dintre o estimare și o aproximare.",
        "Să determini aproximarea prin lipsă a unui număr real la unități, zecimi sau sutimi.",
        "Să determini aproximarea prin adaos a unui număr real la unități, zecimi sau sutimi.",
        "Să rotunjești corect un număr real la ordinul cerut.",
        "Să compari o valoare exactă cu o valoare aproximativă.",
        "Să folosești estimarea pentru verificarea rapidă a plauzibilității unui rezultat.",
        "Să eviți erorile frecvente produse de numerele negative și de confundarea rotunjirii cu aproximarea prin lipsă sau adaos."
    ],
    termeniCheie: [
        "valoare exactă",
        "valoare aproximativă",
        "estimare",
        "aproximare",
        "aproximare prin lipsă",
        "aproximare prin adaos",
        "rotunjire",
        "ordin de aproximare",
        "unitate",
        "zecime",
        "sutime",
        "eroare absolută"
    ],
    videoLectii: [
        {
            id: "estimari-aproximari-video-1",
            numar: 1,
            titlu: "De ce avem nevoie de estimări și aproximări?",
            durataMinute: 4,
            descriere: "Construim intuitiv ideea de estimare și de aproximare și vedem de ce nu folosim întotdeauna valoarea exactă.",
            scenariu: [
                `Imaginează-ți că intri într-un magazin cu 100 de lei și vrei să cumperi trei produse care costă 29,80 lei, 18,40 lei și 47,30 lei. Ai putea face imediat calculul exact. Dar înainte de asta poți observa că prețurile sunt aproximativ 30, 18 și 47 de lei. Suma este undeva în jur de 95 de lei. Dintr-o privire îți dai seama că banii ar trebui să ajungă. Acesta este rolul unei estimări: obții rapid o valoare apropiată de rezultatul real, suficient de bună pentru scopul problemei.`,
                `Estimarea nu înseamnă că ai calculat greșit și nici că alegi un număr la întâmplare. O estimare trebuie să fie justificată. Alegem valori mai simple, dar apropiate de cele reale, pentru a putea evalua rapid ordinul de mărime al unui rezultat. Dacă ți-ar ieși în exemplul nostru 950 de lei, estimarea de aproximativ 95 de lei ți-ar arăta imediat că ai făcut o eroare de calcul.`,
                `Aproximarea este o idee foarte apropiată, dar de obicei este mai precisă. Pornim de la un număr și îl înlocuim cu un alt număr apropiat, în funcție de precizia cerută. De exemplu, numărul 3,14159 poate fi aproximat la sutimi prin 3,14. Nu mai păstrăm toate cifrele, dar păstrăm suficientă informație pentru situația în care lucrăm.`,
                `Este important să deosebim valoarea exactă de valoarea aproximativă. Dacă lungimea unui segment este exact radical din 2, atunci radical din 2 este valoarea exactă. Numărul 1,41 este doar o aproximare la sutimi. Nu trebuie să scriem radical din 2 egal cu 1,41, deoarece ele nu sunt egale. Putem scrie radical din 2 aproximativ egal cu 1,41.`,
                `În matematică folosim simbolul aproximativ egal atunci când două valori sunt apropiate, dar nu identice. În scriere simplă îl putem citi „aproximativ egal cu”. Ideea principală este să nu transformăm o aproximație într-o egalitate falsă.`,
                `Precizia depinde de problemă. Dacă spui că distanța dintre două orașe este aproximativ 80 de kilometri, precizia la kilometru poate fi suficientă. Dacă măsori o piesă tehnică, o diferență de câteva sutimi poate conta. Așadar, nu există o singură aproximare potrivită în orice situație. Trebuie să știm ordinul la care aproximăm: unități, zecimi, sutimi, miimi și așa mai departe.`,
                `Reține pentru început trei idei. Estimarea ne ajută să anticipăm și să verificăm un rezultat. Aproximarea înlocuiește o valoare cu una apropiată, la o precizie stabilită. Iar valoarea aproximativă nu trebuie confundată cu valoarea exactă. În următorul video vedem cele trei procedee pe care trebuie să le stăpânești: aproximarea prin lipsă, aproximarea prin adaos și rotunjirea.`
            ],
            ideiDeRetinut: [
                "O estimare oferă rapid ordinul de mărime al unui rezultat.",
                "O aproximare înlocuiește o valoare cu una apropiată, la o precizie cerută.",
                "Valoarea aproximativă nu este, în general, egală cu valoarea exactă.",
                "Precizia trebuie adaptată situației."
            ],
            exemplu: {
                titlu: "Estimarea unei sume",
                enunt: "Estimează suma 49,7 + 20,3 + 31,2 înainte de calculul exact.",
                rezolvareScurta: [
                    "Înlocuim valorile cu numere apropiate și ușor de calculat.",
                    "49,7 ≈ 50, 20,3 ≈ 20, 31,2 ≈ 31.",
                    "Estimarea sumei este 50 + 20 + 31 = 101.",
                    "Calculul exact este 101,2, deci estimarea este foarte apropiată."
                ],
                raspuns: "Suma este estimată la aproximativ 101."
            },
            verificareRapida: {
                intrebare: "Care afirmație este corectă?",
                variante: [
                    "O estimare trebuie să fie întotdeauna identică rezultatului exact.",
                    "O aproximare este o valoare apropiată de valoarea exactă.",
                    "Aproximarea se poate face doar la unități.",
                    "Estimarea înseamnă alegerea unui număr la întâmplare."
                ],
                raspunsCorect: 1,
                explicatie: "O aproximare nu este în general egală cu valoarea exactă, ci este aleasă suficient de aproape de aceasta pentru precizia cerută."
            }
        },
        {
            id: "estimari-aproximari-video-2",
            numar: 2,
            titlu: "Prin lipsă, prin adaos și prin rotunjire",
            durataMinute: 5,
            descriere: "Învățăm algoritmul pentru cele trei tipuri uzuale de aproximare și tratăm corect inclusiv numerele negative.",
            scenariu: [
                `Luăm numărul 7,386 și vrem să lucrăm la sutimi. Asta înseamnă că valorile noastre aproximative vor avea două cifre după virgulă. Două numere consecutive de acest tip între care se află 7,386 sunt 7,38 și 7,39. Avem deci inegalitatea 7,38 mai mic decât 7,386, iar 7,386 mai mic decât 7,39.`,
                `Aproximarea prin lipsă este cea mai mare valoare de precizia cerută care este mai mică sau egală cu numărul. În exemplul nostru, aproximarea prin lipsă la sutimi este 7,38. Aproximarea prin adaos este cea mai mică valoare de precizia cerută care este mai mare sau egală cu numărul. Aici este 7,39.`,
                `Putem exprima aceeași idee la zecimi. Numărul 7,386 se află între 7,3 și 7,4. Așadar, la zecimi, aproximarea prin lipsă este 7,3, iar aproximarea prin adaos este 7,4. La unități, numărul este între 7 și 8. Prin lipsă obținem 7, iar prin adaos obținem 8.`,
                `Acum discutăm rotunjirea. La rotunjire alegem dintre valorile apropiate pe cea corespunzătoare regulii cifrei următoare. Dacă vrem să rotunjim 7,386 la sutimi, păstrăm 7,38 și privim cifra miimilor, care este 6. Pentru că este cel puțin 5, mărim cifra sutimilor cu o unitate. Rezultatul este 7,39.`,
                `Dacă rotunjim 7,382 la sutimi, cifra miimilor este 2. Pentru că este mai mică decât 5, păstrăm cifra sutimilor. Obținem 7,38. În problemele școlare aceasta este regula practică pe care o vei folosi cel mai des: privim prima cifră eliminată. Dacă este 0, 1, 2, 3 sau 4, păstrăm ultima cifră reținută. Dacă este 5, 6, 7, 8 sau 9, o mărim cu o unitate.`,
                `Aici apare o diferență esențială. Aproximarea prin lipsă, aproximarea prin adaos și rotunjirea nu sunt același lucru. Pentru 7,382 la sutimi, prin lipsă avem 7,38, prin adaos avem 7,39, iar rotunjirea este 7,38. Pentru 7,386, prin lipsă rămâne 7,38, prin adaos este 7,39, dar rotunjirea devine 7,39.`,
                `Trebuie să fim atenți la numere negative. Luăm minus 2,73 și aproximăm la zecimi. Pe axa numerelor avem minus 2,8 mai mic decât minus 2,73, care este mai mic decât minus 2,7. Prin lipsă trebuie să alegem valoarea mai mică, deci minus 2,8. Prin adaos alegem valoarea mai mare, deci minus 2,7. Este o greșeală foarte frecventă să ștergi pur și simplu cifrele și să spui că minus 2,7 este aproximarea prin lipsă. Nu este: minus 2,7 este mai mare decât minus 2,73.`,
                `Cel mai sigur procedeu, mai ales pentru numere negative, este să scrii întâi încadrarea dintre două valori consecutive de precizia cerută. După aceea, valoarea din stânga este aproximarea prin lipsă, iar valoarea din dreapta este aproximarea prin adaos. În acest fel nu depinzi de memorarea unei reguli mecanice care poate fi aplicată greșit.`
            ],
            ideiDeRetinut: [
                "Prin lipsă alegem cea mai mare valoare de precizia cerută care este mai mică sau egală cu numărul.",
                "Prin adaos alegem cea mai mică valoare de precizia cerută care este mai mare sau egală cu numărul.",
                "Rotunjirea folosește prima cifră eliminată pentru a decide valoarea păstrată.",
                "La numere negative este mai sigur să construiești mai întâi încadrarea."
            ],
            exemplu: {
                titlu: "Trei aproximări ale aceluiași număr",
                enunt: "Pentru x = 12,746, determină aproximarea prin lipsă, prin adaos și rotunjirea la sutimi.",
                rezolvareScurta: [
                    "La sutimi, 12,74 < 12,746 < 12,75.",
                    "Prin lipsă: 12,74.",
                    "Prin adaos: 12,75.",
                    "La rotunjire, cifra miimilor este 6, deci rotunjim la 12,75."
                ],
                raspuns: "Prin lipsă: 12,74; prin adaos: 12,75; rotunjit: 12,75."
            },
            verificareRapida: {
                intrebare: "Care este aproximarea prin lipsă la zecimi a numărului -3,24?",
                variante: [
                    "-3,2",
                    "-3,3",
                    "-3",
                    "-4"
                ],
                raspunsCorect: 1,
                explicatie: "Avem -3,3 < -3,24 < -3,2. Valoarea prin lipsă trebuie să fie mai mică decât numărul, deci -3,3."
            }
        },
        {
            id: "estimari-aproximari-video-3",
            numar: 3,
            titlu: "Exemplu complet: aproximarea unui rezultat",
            durataMinute: 5,
            descriere: "Rezolvăm complet un exemplu în care estimăm, calculăm, aproximăm și verificăm eroarea.",
            scenariu: [
                `Rezolvăm acum un exemplu complet. Considerăm expresia A egal cu 17,83 înmulțit cu 4,12. Vrem mai întâi o estimare, apoi valoarea exactă a produsului, iar la final o aproximare la unități și una la sutimi. Ideea este să folosim estimarea înainte de calcul, nu după, pentru ca ea să funcționeze ca instrument de control.`,
                `Pentru estimare putem înlocui 17,83 cu 18 și 4,12 cu 4. Atunci produsul estimat este 18 ori 4, adică 72. Nu susținem că rezultatul exact este 72. Spunem doar că ar trebui să fie în apropierea acestei valori. Dacă în calculul exact ne-ar ieși 7,2 sau 720, am ști imediat că trebuie să verificăm operația.`,
                `Calculăm acum produsul. 17,83 ori 4,12 este egal cu 73,4596. Rezultatul este într-adevăr apropiat de estimarea 72. Prima verificare de plauzibilitate a trecut.`,
                `Vrem aproximarea prin lipsă și prin adaos la unități. Numărul 73,4596 se află între 73 și 74. Prin lipsă la unități obținem 73. Prin adaos la unități obținem 74. Pentru rotunjire la unități privim cifra zecimilor, care este 4. Fiind mai mică decât 5, rotunjim la 73.`,
                `Trecem la sutimi. Numărul 73,4596 se află între 73,45 și 73,46. Prin lipsă la sutimi avem 73,45, iar prin adaos la sutimi avem 73,46. Pentru rotunjire păstrăm până la cifra sutimilor, adică până la 5, și privim cifra miimilor, care este 9. Fiind cel puțin 5, mărim sutimea cu o unitate. Obținem 73,46.`,
                `Putem măsura cât de mult ne-am îndepărtat de valoarea exactă. Dacă folosim aproximarea 73,46, diferența în valoare absolută este modul din 73,4596 minus 73,46. Obținem 0,0004. Aceasta este eroarea absolută a aproximației respective. Cu cât eroarea absolută este mai mică, cu atât aproximația este mai apropiată de valoarea exactă.`,
                `Observă că precizia și eroarea sunt legate, dar nu sunt același lucru. Spunem că rotunjim la sutimi pentru a descrie ordinul la care păstrăm cifrele. Apoi putem calcula eroarea concretă produsă în cazul respectiv. Pentru 73,4596 aproximat cu 73,46, eroarea este doar 0,0004.`,
                `Într-o problemă de Bac nu este suficient să scrii numai răspunsul dacă cerința solicită justificare. O redactare bună arată încadrarea și apoi concluzia. De exemplu: 73,45 mai mic decât 73,4596 mai mic decât 73,46, deci aproximarea prin lipsă la sutimi este 73,45, iar aproximarea prin adaos este 73,46.`,
                `Metoda completă este deci aceasta: întâi estimezi ordinul rezultatului, apoi faci calculul exact atunci când este posibil, stabilești precizia cerută, construiești valorile vecine de acel ordin și abia apoi alegi prin lipsă, prin adaos sau prin rotunjire. La final verifici dacă răspunsul este compatibil cu estimarea inițială.`,
                `Mai există un caz simplu, dar important. Dacă valoarea exactă are deja precizia cerută, nu este nevoie să o modificăm. De exemplu, la sutimi, numărul 7,25 are atât aproximarea prin lipsă, cât și aproximarea prin adaos egale cu 7,25.`
            ],
            ideiDeRetinut: [
                "Estimarea făcută înainte de calcul este un instrument bun de verificare.",
                "Pentru aproximarea prin lipsă și adaos este utilă încadrarea între două valori consecutive.",
                "Dacă numărul are deja precizia cerută, aproximarea prin lipsă și cea prin adaos coincid cu numărul.",
                "Eroarea absolută este distanța dintre valoarea exactă și aproximația folosită.",
                "Redactarea trebuie să arate clar precizia și procedeul folosit."
            ],
            exemplu: {
                titlu: "Produs estimat și apoi aproximat",
                enunt: "Pentru A = 17,83 · 4,12, estimează rezultatul și rotunjește valoarea exactă la sutimi.",
                rezolvareScurta: [
                    "Estimare: 18 · 4 = 72.",
                    "Calcul exact: A = 73,4596.",
                    "La sutimi păstrăm 73,45 și privim cifra miimilor, 9.",
                    "Rotunjirea este 73,46.",
                    "Rezultatul 73,46 este compatibil cu estimarea inițială de aproximativ 72."
                ],
                raspuns: "A = 73,4596, iar rotunjit la sutimi A ≈ 73,46."
            },
            verificareRapida: {
                intrebare: "Dacă x = 8,274 și îl aproximăm cu 8,27, care este eroarea absolută?",
                variante: [
                    "0,004",
                    "0,04",
                    "0,4",
                    "0,006"
                ],
                raspunsCorect: 0,
                explicatie: "|8,274 - 8,27| = |0,004| = 0,004."
            }
        },
        {
            id: "estimari-aproximari-video-4",
            numar: 4,
            titlu: "Tip Bac: strategie și greșeli frecvente",
            durataMinute: 5,
            descriere: "Consolidăm metoda de lucru și eliminăm greșelile care apar cel mai des în exercițiile cu aproximații.",
            scenariu: [
                `În exercițiile de Bac, aproximările pot apărea direct sau pot fi folosite în interiorul altor capitole. Poți avea de comparat numere reale, de interpretat un rezultat numeric, de citit informații dintr-un grafic sau pur și simplu de verificat dacă rezultatul unui calcul este rezonabil. De aceea această lecție nu trebuie tratată ca o listă de reguli izolate.`,
                `Prima întrebare pe care trebuie să ți-o pui este: ce cere exact enunțul? Aproximare prin lipsă, aproximare prin adaos sau rotunjire? Aceste cuvinte nu sunt sinonime. Dacă enunțul cere prin lipsă, nu ai voie să alegi automat valoarea obținută prin rotunjire. Trebuie să alegi valoarea de precizia cerută care nu depășește numărul.`,
                `A doua întrebare este: la ce ordin lucrăm? La unități, la zecimi, la sutimi sau la alt ordin? De exemplu, pentru 5,678, aproximarea prin lipsă la zecimi este 5,6, dar la sutimi este 5,67. Fără precizie, un răspuns de forma „aproximarea este 5,7” nu spune suficient despre procedeul folosit.`,
                `A treia verificare este semnul numărului. Pentru numere pozitive, ștergerea cifrelor poate părea că funcționează pentru aproximarea prin lipsă. Pentru numere negative această scurtătură devine periculoasă. De exemplu, la zecimi, minus 4,26 este între minus 4,3 și minus 4,2. Prin lipsă avem minus 4,3, nu minus 4,2.`,
                `A patra greșeală este folosirea semnului egal între valoarea exactă și aproximație. Radical din 3 nu este egal cu 1,73. Putem spune radical din 3 aproximativ egal cu 1,73. Egalitatea afirmă identitate exactă, iar aici valorile sunt doar apropiate.`,
                `A cincea greșeală este rotunjirea prea devreme într-un calcul cu mai multe etape. Să presupunem că ai o expresie și trebuie să dai rezultatul final la sutimi. Dacă rotunjești fiecare rezultat intermediar la sutimi, erorile se pot acumula. Este mai sigur să păstrezi cât mai mult din valoarea exactă sau mai multe zecimale și să faci rotunjirea cerută la final.`,
                `Să rezolvăm un exercițiu scurt. Numărul x este egal cu minus 6,347. Cerem aproximarea prin lipsă și prin adaos la sutimi. Construim mai întâi încadrarea: minus 6,35 este mai mic decât minus 6,347, iar minus 6,347 este mai mic decât minus 6,34. Prin lipsă alegem minus 6,35. Prin adaos alegem minus 6,34. Pentru rotunjire, cifra miimilor este 7, deci valoarea la sutimi devine minus 6,35.`,
                `Pentru verificare poți folosi mereu axa numerelor în minte. „Prin lipsă” înseamnă că aproximația se află în stânga sau chiar pe numărul exact. „Prin adaos” înseamnă că se află în dreapta sau chiar pe numărul exact. Această interpretare funcționează atât pentru numere pozitive, cât și pentru numere negative.`,
                `Strategia finală este simplă. Citește procedeul cerut. Identifică ordinul. Construiește cele două valori vecine. Verifică semnul numărului. Alege prin lipsă sau prin adaos ori aplică regula de rotunjire. La final, întreabă-te dacă rezultatul are sens și dacă ai folosit corect semnul aproximativ atunci când valoarea nu este exactă.`,
                `Dacă stăpânești acești pași, exercițiile cu estimări și aproximări devin exerciții de logică și atenție, nu de memorare. Iar beneficiul este mai mare decât această lecție: aceeași abilitate te ajută să verifici rezultate în algebră, funcții, geometrie analitică, probabilități și analiză matematică.`
            ],
            ideiDeRetinut: [
                "Citește exact dacă se cere lipsă, adaos sau rotunjire.",
                "Identifică întotdeauna ordinul de aproximare.",
                "Pentru numere negative folosește încadrarea, nu o scurtătură mecanică.",
                "Nu rotunji inutil rezultatele intermediare.",
                "Folosește estimarea pentru controlul plauzibilității."
            ],
            exemplu: {
                titlu: "Aproximarea unui număr negativ",
                enunt: "Fie x = -6,347. Determină aproximările prin lipsă și prin adaos la sutimi și rotunjirea la sutimi.",
                rezolvareScurta: [
                    "-6,35 < -6,347 < -6,34.",
                    "Prin lipsă: -6,35.",
                    "Prin adaos: -6,34.",
                    "Cifra miimilor este 7, deci prin rotunjire obținem -6,35."
                ],
                raspuns: "Lipsă: -6,35; adaos: -6,34; rotunjire: -6,35."
            },
            verificareRapida: {
                intrebare: "Ce trebuie făcut, de regulă, dacă rezultatul final este cerut la sutimi?",
                variante: [
                    "Rotunjim fiecare număr la sutimi înainte de orice calcul.",
                    "Păstrăm precizia în calculele intermediare și rotunjim rezultatul final la sutimi.",
                    "Eliminăm toate zecimalele.",
                    "Folosim întotdeauna aproximarea prin lipsă."
                ],
                raspunsCorect: 1,
                explicatie: "Rotunjirea prea devreme poate acumula erori. Este mai sigur să păstrezi precizia și să rotunjești la ordinul cerut la final."
            }
        }
    ],
    definitii: [
        {
            termen: "Estimare",
            definitie: "Determinarea rapidă a unei valori apropiate de un rezultat, suficient de precisă pentru scopul urmărit.",
            observatie: "Estimarea este utilă mai ales pentru anticiparea ordinului de mărime și pentru verificarea plauzibilității unui rezultat."
        },
        {
            termen: "Aproximare",
            definitie: "Înlocuirea unei valori cu o altă valoare apropiată de aceasta, respectând o precizie stabilită.",
            observatie: "Valoarea aproximativă nu este, în general, egală cu valoarea exactă."
        },
        {
            termen: "Aproximare prin lipsă",
            definitie: "La un ordin dat, aproximarea prin lipsă a unui număr real x este cea mai mare valoare de acel ordin care este mai mică sau egală cu x.",
            observatie: "Dacă numărul are deja exact precizia cerută, aproximarea prin lipsă este chiar numărul. Pentru numere negative trebuie respectată ordinea reală a numerelor pe axă."
        },
        {
            termen: "Aproximare prin adaos",
            definitie: "La un ordin dat, aproximarea prin adaos a unui număr real x este cea mai mică valoare de acel ordin care este mai mare sau egală cu x.",
            observatie: "Dacă numărul are deja exact precizia cerută, aproximarea prin adaos este chiar numărul."
        },
        {
            termen: "Rotunjire",
            definitie: "Procedeu de alegere a unei valori apropiate la ordinul cerut, folosind prima cifră care urmează după ultima cifră păstrată."
        },
        {
            termen: "Ordin de aproximare",
            definitie: "Poziția până la care păstrăm cifrele unui număr atunci când îl aproximăm: unități, zecimi, sutimi, miimi etc."
        },
        {
            termen: "Valoare exactă",
            definitie: "Valoarea matematică neînlocuită printr-o aproximație.",
            observatie: "De exemplu, √2 este o valoare exactă, în timp ce 1,41 este o aproximație a sa."
        },
        {
            termen: "Eroare absolută",
            definitie: "Distanța dintre valoarea exactă x și valoarea aproximativă a, calculată prin |x - a|.",
            observatie: "Eroarea absolută este întotdeauna nenegativă."
        }
    ],
    teorie: [
        {
            id: "estimari-aproximari-teorie-1",
            titlu: "Estimarea și controlul rezultatului",
            explicatie: "Estimarea simplifică valorile dintr-un calcul pentru a obține rapid ordinul de mărime al rezultatului. Ea este foarte utilă înaintea calculului exact, deoarece permite depistarea unor rezultate evident imposibile.",
            ideiCheie: [
                "Alege numere apropiate și ușor de calculat.",
                "Estimarea nu înlocuiește întotdeauna calculul exact.",
                "Compară rezultatul exact cu estimarea pentru a verifica plauzibilitatea."
            ]
        },
        {
            id: "estimari-aproximari-teorie-2",
            titlu: "Aproximarea prin lipsă și prin adaos",
            explicatie: "Pentru un număr real x și un ordin stabilit, căutăm cea mai mare valoare de ordinul respectiv care este mai mică sau egală cu x și cea mai mică valoare de același ordin care este mai mare sau egală cu x. Prima este aproximarea prin lipsă, iar a doua este aproximarea prin adaos.",
            ideiCheie: [
                "Prin lipsă: valoarea nu depășește numărul.",
                "Prin adaos: valoarea nu este mai mică decât numărul.",
                "Dacă x are deja precizia cerută, cele două aproximări sunt egale cu x.",
                "Încadrarea funcționează fără ambiguități și pentru numere negative."
            ]
        },
        {
            id: "estimari-aproximari-teorie-3",
            titlu: "Rotunjirea",
            explicatie: "Pentru rotunjire păstrăm cifrele până la ordinul cerut și analizăm prima cifră eliminată. Dacă aceasta este mai mică decât 5, ultima cifră păstrată rămâne neschimbată. Dacă este cel puțin 5, ultima cifră păstrată se mărește cu o unitate.",
            ideiCheie: [
                "Identifică mai întâi ordinul cerut.",
                "Privește prima cifră eliminată.",
                "0–4: păstrăm ultima cifră reținută.",
                "5–9: mărim ultima cifră reținută cu o unitate."
            ]
        },
        {
            id: "estimari-aproximari-teorie-4",
            titlu: "Numere negative",
            explicatie: "La numere negative, apropierea de zero nu înseamnă aproximare prin lipsă. Trebuie folosită ordinea de pe axa numerelor. De exemplu, -2,8 < -2,73 < -2,7, deci la zecimi aproximarea prin lipsă este -2,8, iar cea prin adaos este -2,7.",
            ideiCheie: [
                "Compară numerele, nu doar cifrele lor.",
                "Scrie încadrarea înainte de a decide.",
                "Pe axă, prin lipsă este valoarea din stânga.",
                "Pe axă, prin adaos este valoarea din dreapta."
            ]
        },
        {
            id: "estimari-aproximari-teorie-5",
            titlu: "Eroarea unei aproximări",
            explicatie: "O aproximație diferă de obicei de valoarea exactă. Diferența poate fi măsurată prin eroarea absolută |x-a|, unde x este valoarea exactă, iar a este aproximația utilizată.",
            ideiCheie: [
                "Eroarea absolută este nenegativă.",
                "O eroare absolută mai mică înseamnă o aproximație mai apropiată.",
                "Nu confunda ordinul de aproximare cu eroarea efectivă obținută."
            ]
        }
    ],
    formule: [
        {
            id: "estimari-aproximari-formula-1",
            nume: "Încadrarea pentru aproximări",
            formula: "a ≤ x ≤ b",
            explicatie: "La precizia stabilită, a este cea mai mare valoare care satisface a ≤ x, iar b este cea mai mică valoare care satisface x ≤ b. Astfel, a este aproximarea prin lipsă, iar b este aproximarea prin adaos.",
            conditii: [
                "a și b trebuie să aibă precizia cerută.",
                "a trebuie să fie mai mic sau egal cu x.",
                "b trebuie să fie mai mare sau egal cu x.",
                "Dacă x nu are deja exact precizia cerută, a și b sunt două valori consecutive de acel ordin.",
                "Dacă x are deja exact precizia cerută, atunci a = x = b."
            ],
            exempluScurt: "Pentru x = 3,14159 la sutimi: 3,14 < x < 3,15, deci lipsă 3,14 și adaos 3,15. Pentru x = 3,20 la sutimi: lipsă = adaos = 3,20."
        },
        {
            id: "estimari-aproximari-formula-2",
            nume: "Eroarea absolută",
            formula: "E_a = |x - a|",
            explicatie: "Eroarea absolută reprezintă distanța dintre valoarea exactă x și aproximația a.",
            conditii: [
                "x este valoarea exactă.",
                "a este valoarea aproximativă."
            ],
            exempluScurt: "Pentru x = 5,238 și a = 5,24, eroarea este |5,238 - 5,24| = 0,002."
        },
        {
            id: "estimari-aproximari-formula-3",
            nume: "Pasul dintre aproximări consecutive",
            formula: "10^(-n)",
            explicatie: "La n zecimale, două valori consecutive de acea precizie diferă cu 10 la puterea -n.",
            conditii: [
                "n este un număr natural.",
                "Pentru zecimi n = 1.",
                "Pentru sutimi n = 2.",
                "Pentru miimi n = 3."
            ],
            exempluScurt: "La sutimi pasul este 10^(-2) = 0,01."
        }
    ],
    exempleRezolvate: [
        {
            id: "estimari-aproximari-exemplu-1",
            titlu: "Aproximarea unui număr pozitiv",
            enunt: "Pentru x = 8,376, determină aproximarea prin lipsă și prin adaos la sutimi, apoi rotunjește x la sutimi.",
            nivel: "fundament",
            pasi: [
                {
                    numar: 1,
                    titlu: "Identificăm ordinul",
                    continut: "Lucrăm la sutimi, deci folosim numere cu două cifre după virgulă."
                },
                {
                    numar: 2,
                    titlu: "Construim încadrarea",
                    continut: "Avem 8,37 < 8,376 < 8,38."
                },
                {
                    numar: 3,
                    titlu: "Citim aproximările",
                    continut: "Prin lipsă obținem 8,37, iar prin adaos 8,38."
                },
                {
                    numar: 4,
                    titlu: "Rotunjim",
                    continut: "Cifra miimilor este 6. Fiind cel puțin 5, rotunjim la 8,38."
                }
            ],
            raspunsFinal: "Prin lipsă: 8,37; prin adaos: 8,38; rotunjit la sutimi: 8,38.",
            verificare: "Rezultatele respectă încadrarea 8,37 < 8,376 < 8,38."
        },
        {
            id: "estimari-aproximari-exemplu-2",
            titlu: "Aproximarea unui număr negativ",
            enunt: "Pentru x = -5,274, determină aproximarea prin lipsă și prin adaos la zecimi.",
            nivel: "standard-bac",
            pasi: [
                {
                    numar: 1,
                    titlu: "Evităm trunchierea mecanică",
                    continut: "Fiind un număr negativ, lucrăm folosind ordinea de pe axa numerelor."
                },
                {
                    numar: 2,
                    titlu: "Construim încadrarea",
                    continut: "Avem -5,3 < -5,274 < -5,2."
                },
                {
                    numar: 3,
                    titlu: "Alegem prin lipsă",
                    continut: "Valoarea mai mică este -5,3, deci aceasta este aproximarea prin lipsă la zecimi."
                },
                {
                    numar: 4,
                    titlu: "Alegem prin adaos",
                    continut: "Valoarea mai mare este -5,2, deci aceasta este aproximarea prin adaos la zecimi."
                }
            ],
            raspunsFinal: "Prin lipsă: -5,3; prin adaos: -5,2.",
            verificare: "-5,3 este mai mic decât x, iar -5,2 este mai mare decât x."
        },
        {
            id: "estimari-aproximari-exemplu-3",
            titlu: "Estimarea unui calcul",
            enunt: "Estimează valoarea expresiei 39,8 · 5,1 și compară estimarea cu rezultatul exact.",
            nivel: "standard-bac",
            pasi: [
                {
                    numar: 1,
                    titlu: "Alegem valori apropiate",
                    continut: "39,8 este apropiat de 40, iar 5,1 este apropiat de 5."
                },
                {
                    numar: 2,
                    titlu: "Calculăm estimarea",
                    continut: "40 · 5 = 200."
                },
                {
                    numar: 3,
                    titlu: "Calculăm exact",
                    continut: "39,8 · 5,1 = 202,98."
                },
                {
                    numar: 4,
                    titlu: "Comparăm",
                    continut: "202,98 este apropiat de 200, deci estimarea confirmă ordinul de mărime al rezultatului."
                }
            ],
            raspunsFinal: "Estimarea este aproximativ 200, iar valoarea exactă este 202,98.",
            verificare: "Diferența dintre estimare și valoarea exactă este 2,98."
        },
        {
            id: "estimari-aproximari-exemplu-4",
            titlu: "Eroarea absolută",
            enunt: "Numărul x = 12,483 este aproximat cu a = 12,48. Calculează eroarea absolută.",
            nivel: "avansat",
            pasi: [
                {
                    numar: 1,
                    titlu: "Scriem formula",
                    continut: "E_a = |x - a|."
                },
                {
                    numar: 2,
                    titlu: "Înlocuim valorile",
                    continut: "E_a = |12,483 - 12,48|."
                },
                {
                    numar: 3,
                    titlu: "Calculăm diferența",
                    continut: "12,483 - 12,480 = 0,003."
                },
                {
                    numar: 4,
                    titlu: "Aplicăm modulul",
                    continut: "E_a = |0,003| = 0,003."
                }
            ],
            raspunsFinal: "Eroarea absolută este 0,003.",
            verificare: "Eroarea este pozitivă și mai mică decât 0,01, ceea ce este compatibil cu o aproximație foarte apropiată."
        }
    ],
    greseliFrecvente: [
        {
            greseala: "Confundarea aproximării prin lipsă cu rotunjirea.",
            deCeEsteGresit: "Prin lipsă trebuie aleasă cea mai mare valoare de precizia cerută care nu depășește numărul, indiferent care dintre valorile vecine este mai apropiată.",
            cumOEviti: "Scrie încadrarea și alege valoarea din stânga pentru aproximarea prin lipsă."
        },
        {
            greseala: "Pentru -2,73 la zecimi se consideră că aproximarea prin lipsă este -2,7.",
            deCeEsteGresit: "-2,7 este mai mare decât -2,73, deci nu poate fi aproximare prin lipsă.",
            cumOEviti: "Scrie -2,8 < -2,73 < -2,7. Rezultă imediat că prin lipsă este -2,8."
        },
        {
            greseala: "Folosirea semnului egal între o valoare exactă și o aproximație.",
            deCeEsteGresit: "De exemplu √2 și 1,41 nu reprezintă exact același număr.",
            cumOEviti: "Folosește formularea „aproximativ egal cu” atunci când valoarea a fost aproximată."
        },
        {
            greseala: "Rotunjirea tuturor rezultatelor intermediare.",
            deCeEsteGresit: "Erorile produse la fiecare pas se pot acumula și pot modifica rezultatul final.",
            cumOEviti: "Păstrează valoarea exactă sau suficiente zecimale și rotunjește, de regulă, la final."
        },
        {
            greseala: "Ignorarea ordinului cerut.",
            deCeEsteGresit: "Aproximarea la zecimi și aproximarea la sutimi produc rezultate diferite.",
            cumOEviti: "Identifică înainte de orice calcul ultima poziție zecimală care trebuie păstrată."
        }
    ],
    exercitii: [
        {
            id: "estimari-aproximari-exercitiu-1",
            nivel: "fundament",
            tip: "alegere-multipla",
            enunt: "Care este aproximarea prin lipsă la sutimi a numărului 4,278?",
            variante: [
                "4,27",
                "4,28",
                "4,2",
                "4,30"
            ],
            raspunsCorect: "4,27",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Construim încadrarea",
                    continut: "4,27 < 4,278 < 4,28."
                },
                {
                    numar: 2,
                    titlu: "Alegem valoarea prin lipsă",
                    continut: "Valoarea de la stânga este 4,27."
                }
            ],
            explicatieFinala: "Aproximarea prin lipsă la sutimi este 4,27.",
            punctaj: 5,
            competenta: "Determinarea aproximării prin lipsă a unui număr real.",
            gresealaFrecventa: "Alegerea automată a valorii rotunjite în locul valorii prin lipsă."
        },
        {
            id: "estimari-aproximari-exercitiu-2",
            nivel: "fundament",
            tip: "alegere-multipla",
            enunt: "Care este aproximarea prin adaos la zecimi a numărului 6,21?",
            variante: [
                "6,1",
                "6,2",
                "6,3",
                "7"
            ],
            raspunsCorect: "6,3",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Încadrăm numărul",
                    continut: "6,2 < 6,21 < 6,3."
                },
                {
                    numar: 2,
                    titlu: "Alegem valoarea mai mare",
                    continut: "Prin adaos la zecimi obținem 6,3."
                }
            ],
            explicatieFinala: "Prin adaos alegem cea mai mică valoare de precizia cerută care este mai mare sau egală cu numărul.",
            punctaj: 5,
            competenta: "Determinarea aproximării prin adaos."
        },
        {
            id: "estimari-aproximari-exercitiu-3",
            nivel: "fundament",
            tip: "raspuns-scurt",
            enunt: "Rotunjește numărul 15,684 la sutimi.",
            raspunsCorect: "15,68",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Păstrăm sutimile",
                    continut: "Până la sutimi avem 15,68."
                },
                {
                    numar: 2,
                    titlu: "Privim cifra următoare",
                    continut: "Cifra miimilor este 4, mai mică decât 5."
                },
                {
                    numar: 3,
                    titlu: "Concluzionăm",
                    continut: "Cifra sutimilor rămâne neschimbată."
                }
            ],
            explicatieFinala: "Rotunjirea la sutimi este 15,68.",
            punctaj: 5,
            competenta: "Rotunjirea unui număr real la ordinul cerut."
        },
        {
            id: "estimari-aproximari-exercitiu-4",
            nivel: "standard-bac",
            tip: "raspuns-scurt",
            enunt: "Determină aproximarea prin lipsă la zecimi a numărului -7,24.",
            raspunsCorect: "-7,3",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Construim încadrarea",
                    continut: "-7,3 < -7,24 < -7,2."
                },
                {
                    numar: 2,
                    titlu: "Alegem valoarea mai mică",
                    continut: "Valoarea prin lipsă este -7,3."
                }
            ],
            explicatieFinala: "Pentru numere negative folosim ordinea numerică; -7,3 este mai mic decât -7,24.",
            punctaj: 10,
            competenta: "Aproximarea numerelor negative.",
            gresealaFrecventa: "Considerarea lui -7,2 drept aproximare prin lipsă deoarece are aceleași prime cifre."
        },
        {
            id: "estimari-aproximari-exercitiu-5",
            nivel: "standard-bac",
            tip: "rezolvare-completa",
            enunt: "Pentru x = 23,476, determină aproximarea prin lipsă și prin adaos la sutimi, apoi rotunjește numărul la sutimi.",
            raspunsCorect: "Prin lipsă: 23,47; prin adaos: 23,48; rotunjire: 23,48.",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Identificăm valorile consecutive",
                    continut: "La sutimi avem valorile 23,47 și 23,48."
                },
                {
                    numar: 2,
                    titlu: "Scriem încadrarea",
                    continut: "23,47 < 23,476 < 23,48."
                },
                {
                    numar: 3,
                    titlu: "Citim lipsa și adaosul",
                    continut: "Prin lipsă este 23,47; prin adaos este 23,48."
                },
                {
                    numar: 4,
                    titlu: "Rotunjim",
                    continut: "Cifra miimilor este 6, deci rotunjirea la sutimi este 23,48."
                }
            ],
            explicatieFinala: "Încadrarea permite determinarea directă a aproximărilor, iar cifra miimilor stabilește rotunjirea.",
            punctaj: 10,
            competenta: "Aplicarea comparativă a celor trei procedee de aproximare."
        },
        {
            id: "estimari-aproximari-exercitiu-6",
            nivel: "standard-bac",
            tip: "rezolvare-completa",
            enunt: "Estimează produsul 29,8 · 6,1 folosind numere întregi apropiate și apoi calculează valoarea exactă.",
            raspunsCorect: "Estimare: aproximativ 180; valoare exactă: 181,78.",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Alegem valori simple",
                    continut: "29,8 ≈ 30 și 6,1 ≈ 6."
                },
                {
                    numar: 2,
                    titlu: "Estimăm",
                    continut: "30 · 6 = 180."
                },
                {
                    numar: 3,
                    titlu: "Calculăm exact",
                    continut: "29,8 · 6,1 = 181,78."
                },
                {
                    numar: 4,
                    titlu: "Verificăm plauzibilitatea",
                    continut: "181,78 este apropiat de 180, deci estimarea este compatibilă cu rezultatul exact."
                }
            ],
            explicatieFinala: "Estimarea nu trebuie să coincidă cu valoarea exactă; rolul ei este să ofere rapid ordinul corect de mărime.",
            punctaj: 10,
            competenta: "Utilizarea estimării pentru verificarea unui calcul."
        },
        {
            id: "estimari-aproximari-exercitiu-7",
            nivel: "avansat",
            tip: "rezolvare-completa",
            enunt: "Numărul x = 9,736 este aproximat cu a = 9,74. Calculează eroarea absolută.",
            raspunsCorect: "0,004",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Aplicăm formula",
                    continut: "E_a = |x - a|."
                },
                {
                    numar: 2,
                    titlu: "Înlocuim",
                    continut: "E_a = |9,736 - 9,74|."
                },
                {
                    numar: 3,
                    titlu: "Calculăm",
                    continut: "9,736 - 9,740 = -0,004."
                },
                {
                    numar: 4,
                    titlu: "Aplicăm modulul",
                    continut: "|-0,004| = 0,004."
                }
            ],
            explicatieFinala: "Distanța dintre valoarea exactă și aproximație este 0,004.",
            punctaj: 10,
            competenta: "Evaluarea erorii unei aproximații."
        },
        {
            id: "estimari-aproximari-exercitiu-8",
            nivel: "avansat",
            tip: "rezolvare-completa",
            enunt: "Fie x = -3,486. Determină aproximarea prin lipsă și prin adaos la sutimi, rotunjirea la sutimi și verifică poziția tuturor valorilor pe axa numerelor.",
            raspunsCorect: "Prin lipsă: -3,49; prin adaos: -3,48; rotunjire: -3,49.",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Construim valorile vecine",
                    continut: "La sutimi, valorile consecutive relevante sunt -3,49 și -3,48."
                },
                {
                    numar: 2,
                    titlu: "Scriem ordinea",
                    continut: "-3,49 < -3,486 < -3,48."
                },
                {
                    numar: 3,
                    titlu: "Determinăm aproximările",
                    continut: "Prin lipsă obținem -3,49; prin adaos obținem -3,48."
                },
                {
                    numar: 4,
                    titlu: "Rotunjim",
                    continut: "Cifra miimilor este 6, deci valoarea rotunjită la sutimi este -3,49."
                },
                {
                    numar: 5,
                    titlu: "Verificăm",
                    continut: "Pe axa numerelor -3,49 este în stânga lui -3,486, iar -3,48 este în dreapta lui."
                }
            ],
            explicatieFinala: "Încadrarea pe axa numerelor elimină ambiguitatea produsă de semnul minus.",
            punctaj: 15,
            competenta: "Aplicarea riguroasă a aproximărilor pentru numere negative.",
            gresealaFrecventa: "Inversarea aproximării prin lipsă și prin adaos la numere negative."
        }
    ],
    rezumat: {
        ideiDeRetinut: [
            "Estimarea oferă rapid o valoare apropiată și este utilă pentru verificarea rezultatelor.",
            "Aproximarea prin lipsă este cea mai mare valoare de precizia cerută care este mai mică sau egală cu valoarea exactă.",
            "Aproximarea prin adaos este cea mai mică valoare de precizia cerută care este mai mare sau egală cu valoarea exactă.",
            "Dacă numărul are deja precizia cerută, aproximarea prin lipsă și cea prin adaos sunt egale cu numărul.",
            "Rotunjirea și aproximarea prin lipsă sau prin adaos sunt procedee diferite.",
            "La numere negative este recomandată încadrarea pe axa numerelor.",
            "Rotunjirea se face de regulă la finalul unui calcul, nu inutil la fiecare pas.",
            "Eroarea absolută măsoară distanța dintre valoarea exactă și aproximația folosită."
        ],
        formuleDeRetinut: [
            "a ≤ x ≤ b — a este aproximarea prin lipsă, iar b aproximarea prin adaos, la precizia stabilită",
            "Dacă x are deja precizia cerută, atunci a = x = b",
            "E_a = |x - a|",
            "La n zecimale, pasul dintre două valori consecutive este 10^(-n)"
        ],
        checklistElev: [
            "Am identificat dacă se cere estimare, lipsă, adaos sau rotunjire?",
            "Am identificat ordinul: unități, zecimi, sutimi etc.?",
            "Am construit corect încadrarea?",
            "Am verificat dacă numărul are deja precizia cerută?",
            "Dacă numărul este negativ, am verificat ordinea pe axă?",
            "La rotunjire, am analizat prima cifră eliminată?",
            "Am evitat să folosesc egalitatea pentru două valori care sunt doar aproximativ egale?",
            "Rezultatul meu este plauzibil?"
        ]
    },
    legaturaCuBac: {
        importanta: "Programa de examen M_mate-info include explicit, în conținuturile de clasa a IX-a referitoare la mulțimea numerelor reale, aproximările prin lipsă sau prin adaos. Competențele asociate includ și utilizarea estimărilor și aproximărilor în contexte variate. Rotunjirea și controlul erorii sunt folosite în această lecție ca instrumente pedagogice de sprijin și nu sunt prezentate aici ca tipuri distincte de cerințe garantate la examen.",
        tipuriCerinte: [
            "Lucrul cu aproximări prin lipsă sau prin adaos pentru numere reale.",
            "Utilizarea estimărilor și aproximărilor în contexte matematice.",
            "Compararea și ordonarea numerelor reale atunci când acestea intervin în aproximări.",
            "Folosirea aproximărilor ca instrument de calcul sau verificare în probleme cu numere reale."
        ],
        strategie: [
            "Citește exact dacă enunțul cere aproximare prin lipsă sau prin adaos.",
            "Identifică ordinul la care trebuie realizată aproximarea.",
            "Construiește valorile de precizia cerută care încadrează numărul.",
            "Verifică dacă numărul este deja reprezentabil exact la ordinul cerut.",
            "Folosește ordinea numerică, mai ales pentru numere negative.",
            "Dacă într-un calcul este necesară o rotunjire, păstrează suficientă precizie până la rezultatul final.",
            "Folosește estimarea pentru a verifica plauzibilitatea rezultatului."
        ]
    },
    surse: [
        {
            tip: "programa-oficiala",
            titlu: "Programa de examen pentru disciplina Matematică — M_mate-info",
            observatie: "Pentru clasa a IX-a, programa include competența de utilizare a proprietăților operațiilor algebrice ale numerelor, a estimărilor și aproximărilor în contexte variate. În conținuturile referitoare la mulțimea numerelor reale sunt menționate explicit aproximările prin lipsă sau prin adaos."
        },
        {
            tip: "verificare-interna",
            titlu: "BAC MATE — Content Engine V1 — audit matematic al lecției Estimări și aproximări",
            observatie: "Au fost reverificate definițiile, exemplele, calculele, răspunsurile celor 8 exerciții, cele 4 verificări rapide și cazurile cu numere negative."
        },
        {
            tip: "verificare-interna",
            titlu: "BAC MATE — Content Engine V1 — audit editorial și curricular",
            observatie: "Conținuturile explicit susținute de programa de examen au fost separate de elementele pedagogice suplimentare, precum rotunjirea și eroarea absolută."
        }
    ],
    verificare: {
        status: "verificat",
        verificatMatematic: true,
        verificatPrograma: true,
        verificatExercitii: true,
        verificatLimbaRomana: true,
        ultimaVerificare: "2026-09-13",
        observatii: [
            "Structura lecției a trecut BAC MATE Content Validator V1 fără erori critice.",
            "Toate cele 4 scenarii video au trecut pragul orientativ de durată.",
            "Definițiile pentru aproximarea prin lipsă și prin adaos au fost verificate inclusiv pentru numere negative și pentru cazul în care valoarea este deja exact reprezentabilă la ordinul cerut.",
            "Au fost verificate matematic toate cele 4 exemple rezolvate.",
            "Au fost verificate enunțurile, rezolvările și răspunsurile celor 8 exerciții.",
            "Au fost verificate răspunsurile celor 4 verificări rapide din video-uri.",
            "Alinierea curriculară a fost verificată pentru conținuturile M_mate-info de clasa a IX-a.",
            "Rotunjirea și eroarea absolută sunt păstrate ca instrumente pedagogice de sprijin și nu sunt prezentate ca tipuri distincte de cerințe garantate la examen.",
            "Lecția este verificată, dar nu este încă publicabilă.",
            "Publicarea rămâne un gate separat după integrarea în aplicație, build și testul funcțional."
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/continut/lectii/m5-vectori-in-plan.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "continutVectoriInPlan",
    ()=>continutVectoriInPlan
]);
const continutVectoriInPlan = {
    id: "m5-vectori-in-plan",
    slug: "m5-vectori-in-plan",
    modul: 5,
    numarLectie: 1,
    clasa: "Clasa a IX-a",
    profil: "M_mate-info",
    titlu: "Vectori în plan",
    subtitlu: "Înțelege ce este un vector și cum descriem direcția, sensul și lungimea lui.",
    descriere: "Lecția introduce noțiunea de vector în plan, originea și extremitatea unui vector, direcția, sensul și modulul, precum și noțiunile de vectori egali, vectori opuși și vector nul. Aceste idei reprezintă baza pentru operațiile cu vectori și pentru aplicațiile geometrice care urmează.",
    nivelPrincipal: "fundament",
    durataEstimataMinute: 25,
    prerechizite: [
        "Puncte și segmente în plan",
        "Lungimea unui segment",
        "Noțiunile intuitive de direcție și sens"
    ],
    obiective: [
        "Să recunoști un vector și notația lui.",
        "Să identifici originea și extremitatea unui vector.",
        "Să diferențiezi direcția, sensul și modulul unui vector.",
        "Să stabilești când doi vectori sunt egali.",
        "Să recunoști doi vectori opuși.",
        "Să identifici vectorul nul și modulul său."
    ],
    termeniCheie: [
        "vector",
        "segment orientat",
        "origine",
        "extremitate",
        "direcție",
        "sens",
        "modul",
        "vector nul",
        "vector opus",
        "vectori egali"
    ],
    videoLectii: [
        {
            id: "m5-vp-video-1",
            numar: 1,
            titlu: "Ce este un vector?",
            durataMinute: 4,
            descriere: "Pornim de la un segment obișnuit și vedem cum apare ideea de vector atunci când alegem o orientare de la un punct spre altul.",
            scenariu: [
                "Începem cu o idee foarte simplă. Imaginează-ți două puncte distincte din plan, pe care le numim A și B.",
                "Dacă unim punctele A și B, obținem segmentul AB. Un segment obișnuit ne spune unde sunt cele două capete și ce lungime există între ele, dar nu ne spune că trebuie să mergem într-un anumit sens.",
                "Acum adăugăm o săgeată care pornește din A și ajunge în B. În acest moment nu mai avem doar un segment, ci un segment orientat.",
                "Segmentul orientat de la A la B reprezintă vectorul AB.",
                "În notația vectorului AB, punctul A este originea vectorului. Cu alte cuvinte, A este punctul din care pornește săgeata.",
                "Punctul B este extremitatea vectorului. Este punctul spre care arată săgeata.",
                "Ordinea literelor este foarte importantă. Prima literă indică originea, iar a doua literă indică extremitatea.",
                "Dacă scriem vectorul BA în loc de vectorul AB, nu mai vorbim despre aceeași orientare.",
                "Vectorul AB merge de la A spre B, în timp ce vectorul BA merge de la B spre A.",
                "Cele două segmente folosesc aceleași puncte, dar săgețile lor sunt orientate în sensuri opuse.",
                "Poți să îți imaginezi vectorul ca pe o instrucțiune de deplasare. Nu este suficient să știi între ce puncte te afli; contează și de unde pornești și spre ce punct te îndrepți.",
                "De exemplu, dacă A reprezintă casa ta și B reprezintă școala, deplasarea de la casă spre școală nu este aceeași cu deplasarea de la școală spre casă.",
                "Drumul poate avea aceeași lungime, dar orientarea este inversată.",
                "Această idee ne ajută să înțelegem de ce vectorii conțin mai multă informație decât un simplu segment.",
                "În desene, vectorul este reprezentat de obicei printr-o săgeată.",
                "În scriere matematică, putem nota vectorul determinat de A și B printr-o săgeată deasupra literelor AB.",
                "Când citești un exercițiu, primul lucru pe care trebuie să îl verifici este ordinea literelor.",
                "Dacă vezi vectorul MN, M este originea și N este extremitatea.",
                "Dacă vezi vectorul NM, N este originea și M este extremitatea.",
                "Nu trebuie să faci niciun calcul pentru această identificare. Este suficient să citești corect notația.",
                "Reține regula simplă: prima literă este punctul de plecare, iar a doua literă este punctul de sosire.",
                "Aceasta este prima idee fundamentală a lecției și o vom folosi în toate definițiile care urmează."
            ],
            ideiDeRetinut: [
                "Un vector poate fi reprezentat printr-un segment orientat.",
                "Prima literă din notație reprezintă originea vectorului.",
                "A doua literă din notație reprezintă extremitatea vectorului."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "În vectorul →MN, care este originea și care este extremitatea?",
                rezolvareScurta: [
                    "Citirea se face în ordinea literelor.",
                    "Prima literă este M, deci M este originea.",
                    "A doua literă este N, deci N este extremitatea."
                ],
                raspuns: "Originea este M, iar extremitatea este N."
            },
            verificareRapida: {
                intrebare: "În vectorul →AB, punctul A reprezintă:",
                variante: [
                    "extremitatea",
                    "originea",
                    "modulul",
                    "direcția"
                ],
                raspunsCorect: 1,
                explicatie: "Prima literă din notația unui vector indică originea, iar a doua literă indică extremitatea."
            }
        },
        {
            id: "m5-vp-video-2",
            numar: 2,
            titlu: "Direcție, sens și modul",
            durataMinute: 5,
            descriere: "Înțelegem cele trei caracteristici esențiale ale unui vector: direcția, sensul și modulul.",
            scenariu: [
                "Acum știm că un vector poate fi reprezentat printr-un segment orientat. Următorul pas este să înțelegem ce informații sunt necesare pentru a descrie un vector.",
                "Pentru un vector nenul ne interesează trei caracteristici principale: direcția, sensul și modulul.",
                "Aceste trei noțiuni sunt diferite și este important să nu le confundăm.",
                "Începem cu direcția.",
                "Direcția unui vector este dată de dreapta pe care se află segmentul orientat sau de orice dreaptă paralelă cu aceasta.",
                "De exemplu, doi vectori desenați pe două drepte orizontale paralele au aceeași direcție.",
                "Ei nu trebuie să fie desenați pe exact aceeași dreaptă pentru a avea aceeași direcție.",
                "Acest lucru va deveni foarte important atunci când vom discuta despre vectori egali.",
                "A doua caracteristică este sensul.",
                "Sensul ne spune spre ce parte a direcției este orientată săgeata.",
                "Dacă avem o direcție orizontală, un vector poate avea sens spre dreapta sau sens spre stânga.",
                "Dacă avem o direcție verticală, putem avea, de exemplu, sens în sus sau sens în jos.",
                "Prin urmare, doi vectori pot avea aceeași direcție, dar sensuri diferite.",
                "Exact acest lucru se întâmplă pentru vectorii AB și BA atunci când A și B sunt puncte distincte.",
                "Ei se află pe aceeași dreaptă, deci au aceeași direcție.",
                "Dar AB este orientat de la A spre B, iar BA de la B spre A, deci sensurile sunt opuse.",
                "A treia caracteristică este modulul.",
                "Modulul unui vector reprezintă lungimea segmentului orientat care îl reprezintă.",
                "Pentru vectorul AB, modulul este egal cu lungimea segmentului AB.",
                "Dacă segmentul AB are lungimea 6 centimetri, atunci modulul vectorului AB este 6 centimetri.",
                "Modulul este o mărime numerică nenegativă.",
                "Asta înseamnă că modulul nu poate fi negativ.",
                "Un vector poate avea orientări diferite, dar lungimea sa este exprimată printr-un număr mai mare sau egal cu zero.",
                "Este foarte important să nu confundăm vectorul cu modulul său.",
                "Vectorul conține informații despre direcție, sens și modul.",
                "Modulul conține doar informația despre lungime.",
                "De aceea, notația vectorului și notația modulului sunt diferite.",
                "Când vezi săgeata deasupra literelor AB, este vorba despre vector.",
                "Când vezi vectorul între bare de modul, este vorba despre lungimea lui.",
                "Hai să folosim un exemplu simplu.",
                "Presupunem că AB are lungimea 6.",
                "Atunci modulul vectorului AB este tot 6.",
                "Dacă inversăm orientarea și analizăm vectorul BA, lungimea segmentului nu se schimbă.",
                "Prin urmare, și modulul vectorului BA este 6.",
                "Observăm însă că vectorii AB și BA nu sunt identici, pentru că sensul lor este diferit.",
                "Aceasta este diferența esențială dintre vector și modul.",
                "Când rezolvi un exercițiu, întreabă-te mereu separat: care este direcția, care este sensul și care este modulul?",
                "Dacă verifici aceste trei caracteristici în această ordine, vei evita majoritatea confuziilor de început."
            ],
            ideiDeRetinut: [
                "Direcția este legată de dreapta suport sau de o dreaptă paralelă cu aceasta.",
                "Sensul arată orientarea săgeții pe direcția respectivă.",
                "Modulul reprezintă lungimea vectorului și este un număr nenegativ."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "Dacă segmentul AB are lungimea 6 cm, cât este |→AB|?",
                rezolvareScurta: [
                    "Modulul vectorului este lungimea segmentului care îl reprezintă.",
                    "AB = 6 cm.",
                    "Prin urmare, |→AB| = 6 cm."
                ],
                raspuns: "|→AB| = 6 cm."
            },
            verificareRapida: {
                intrebare: "Ce reprezintă modulul unui vector?",
                variante: [
                    "sensul vectorului",
                    "lungimea vectorului",
                    "originea vectorului",
                    "poziția vectorului în plan"
                ],
                raspunsCorect: 1,
                explicatie: "Modulul unui vector reprezintă lungimea segmentului orientat care îl reprezintă."
            }
        },
        {
            id: "m5-vp-video-3",
            numar: 3,
            titlu: "Vectori egali și vectori opuși",
            durataMinute: 5,
            descriere: "Învățăm criteriile după care recunoaștem vectorii egali și vectorii opuși.",
            scenariu: [
                "Avem acum toate elementele necesare pentru a compara doi vectori.",
                "Știm că pentru fiecare vector nenul analizăm direcția, sensul și modulul.",
                "Aceste trei caracteristici ne permit să stabilim dacă doi vectori sunt egali sau dacă sunt opuși.",
                "Începem cu vectorii egali.",
                "Doi vectori nenuli sunt egali dacă au aceeași direcție, același sens și același modul.",
                "Toate cele trei condiții trebuie să fie îndeplinite simultan.",
                "Dacă lipsește chiar și una dintre ele, vectorii nu mai sunt egali.",
                "Un lucru foarte important este că vectorii egali nu trebuie să fie desenați în același loc.",
                "De exemplu, putem avea un vector desenat în partea stângă a foii și alt vector desenat în partea dreaptă.",
                "Dacă au aceeași direcție, același sens și aceeași lungime, cei doi vectori sunt egali.",
                "Poziția lor efectivă în plan nu schimbă această concluzie.",
                "Imaginează-ți două săgeți orizontale, ambele orientate spre dreapta și ambele având lungimea 4 centimetri.",
                "Chiar dacă una este desenată mai sus și cealaltă mai jos, ele reprezintă vectori egali.",
                "Acum să vedem vectorii opuși.",
                "Doi vectori nenuli sunt opuși dacă au aceeași direcție, același modul, dar sensuri opuse.",
                "Așadar, față de cazul vectorilor egali se schimbă o singură caracteristică: sensul.",
                "Un exemplu fundamental este format de vectorii AB și BA, atunci când A și B sunt distincte.",
                "Ei se află pe aceeași dreaptă, deci au aceeași direcție.",
                "Lungimea segmentului AB este egală cu lungimea segmentului BA, deci au același modul.",
                "Dar AB este orientat de la A spre B, iar BA de la B spre A.",
                "Prin urmare, sensurile sunt opuse.",
                "Concluzia este că vectorul BA este opusul vectorului AB.",
                "În notație matematică putem scrie →BA = −→AB.",
                "Acest minus nu înseamnă că lungimea vectorului a devenit negativă.",
                "Modulul rămâne un număr nenegativ.",
                "Semnul minus indică vectorul opus.",
                "Este o distincție foarte importantă.",
                "Când compari doi vectori într-un exercițiu, folosește o metodă fixă.",
                "Pasul unu: compară direcțiile.",
                "Pasul doi: compară sensurile.",
                "Pasul trei: compară modulele.",
                "Dacă toate trei coincid, vectorii nenuli sunt egali.",
                "Dacă direcția și modulul coincid, dar sensurile sunt opuse, vectorii nenuli sunt opuși.",
                "Dacă direcțiile sunt diferite, vectorii nu pot fi egali și nici opuși în sensul acestor definiții.",
                "Această metodă te ajută să nu te bazezi doar pe aspectul desenului.",
                "Într-o problemă de geometrie, desenul poate să nu fie realizat la scară.",
                "Definițiile sunt cele care decid relația dintre vectori.",
                "Să verificăm metoda pe un caz scurt. Presupunem că vectorii u și v au aceeași direcție și același sens, dar modulul lui u este 4, iar modulul lui v este 6.",
                "Chiar dacă săgețile sunt orientate la fel, vectorii nu sunt egali, deoarece modulele lor sunt diferite.",
                "Acum schimbăm situația: u și v au aceeași direcție, module egale, dar sensuri opuse.",
                "În acest caz vectorii sunt opuși, iar relația se poate scrie v = −u.",
                "Observă din nou că semnul minus schimbă vectorul în opusul său, nu transformă modulul într-un număr negativ.",
                "La exerciții, evită concluziile rapide de tipul «arată la fel» sau «au aceeași lungime». Verifică întotdeauna toate informațiile cerute de definiție.",
                "Dacă ai aceeași direcție, același sens și același modul, poți concluziona egalitatea pentru vectorii nenuli.",
                "Dacă ai aceeași direcție, module egale și sensuri opuse, poți concluziona că vectorii nenuli sunt opuși.",
                "Vectorul nul este cazul special și îl analizăm separat în următorul video.",
                "Reține propoziția-cheie: pentru vectorii nenuli, egal înseamnă aceeași direcție, același sens și același modul; opus înseamnă aceeași direcție, modul egal și sens opus."
            ],
            ideiDeRetinut: [
                "Vectori nenuli egali: aceeași direcție, același sens și același modul.",
                "Vectori nenuli opuși: aceeași direcție, același modul și sensuri opuse.",
                "Poziția în plan nu este un criteriu pentru egalitatea vectorilor."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "Vectorii nenuli u și v au aceeași direcție, același sens și module egale. Ce putem spune?",
                rezolvareScurta: [
                    "Direcțiile sunt aceleași.",
                    "Sensurile sunt aceleași.",
                    "Modulele sunt egale.",
                    "Sunt îndeplinite toate condițiile pentru egalitatea vectorilor."
                ],
                raspuns: "u = v."
            },
            verificareRapida: {
                intrebare: "Doi vectori nenuli au aceeași direcție și același modul, dar sensuri opuse. Ei sunt:",
                variante: [
                    "egali",
                    "opuși",
                    "vectori nuli",
                    "perpendiculari"
                ],
                raspunsCorect: 1,
                explicatie: "Doi vectori nenuli cu aceeași direcție și același modul, dar cu sensuri opuse, sunt vectori opuși."
            }
        },
        {
            id: "m5-vp-video-4",
            numar: 4,
            titlu: "Vectorul nul și capcanele frecvente",
            durataMinute: 5,
            descriere: "Încheiem lecția cu vectorul nul, recapitulăm ideile esențiale și eliminăm cele mai frecvente confuzii.",
            scenariu: [
                "Mai avem o situație specială foarte importantă: vectorul nul.",
                "Până acum am discutat în principal despre vectori determinați de două puncte distincte.",
                "Dar ce se întâmplă dacă originea și extremitatea sunt același punct?",
                "Să luăm, de exemplu, vectorul AA.",
                "Originea este A, iar extremitatea este tot A.",
                "Segmentul AA are lungimea zero.",
                "Prin urmare, modulul vectorului AA este zero.",
                "Un astfel de vector se numește vector nul.",
                "Vectorul nul se notează de obicei cu zero vectorial, adică →0.",
                "Orice segment orientat care are aceeași origine și aceeași extremitate reprezintă vectorul nul.",
                "De exemplu, →AA, →BB, →MM sau →PP reprezintă același vector nul.",
                "Toate aceste reprezentări au modulul zero.",
                "Vectorul nul este un caz special și apare frecvent în calculele vectoriale pe care le vei învăța mai târziu.",
                "Pentru el nu folosim mecanic descrierea prin direcție și sens ca pentru un vector nenul. Ceea ce trebuie să recunoști acum este faptul esențial că modulul său este zero.",
                "Acum recapitulăm și cele mai frecvente greșeli.",
                "Prima greșeală este să considerăm că vectorul AB este egal cu vectorul BA.",
                "Dacă A și B sunt distincte, această afirmație este falsă.",
                "Vectorii au aceeași direcție și același modul, dar sensuri opuse.",
                "Așadar, →BA este opusul lui →AB.",
                "A doua greșeală este să confundăm vectorul cu modulul său.",
                "Vectorul →AB nu este același obiect matematic cu modulul |→AB|.",
                "Vectorul este un obiect vectorial, în timp ce modulul său este o lungime exprimată printr-un număr nenegativ.",
                "De aceea nu trebuie să tratăm notațiile →AB și |→AB| ca și cum ar reprezenta același lucru.",
                "A treia greșeală este să credem că doi vectori pot fi egali doar dacă pornesc din același punct.",
                "Aceasta este fals.",
                "Poziția geometrică exactă în desen nu este criteriul pentru egalitatea vectorilor.",
                "Pentru vectorii nenuli contează direcția, sensul și modulul.",
                "A patra greșeală este să confundăm direcția cu sensul.",
                "Două săgeți orientate una spre dreapta și una spre stânga pe două drepte orizontale au aceeași direcție, dar sensuri opuse.",
                "Direcția descrie dreapta suport sau o dreaptă paralelă cu aceasta.",
                "Sensul descrie una dintre cele două orientări posibile pe acea direcție.",
                "Mai există o verificare simplă care merită memorată: dacă modulul unui vector este zero, atunci vectorul este vectorul nul.",
                "Reciproc, vectorul nul are întotdeauna modulul zero.",
                "Această legătură te ajută să recunoști imediat situațiile în care originea și extremitatea coincid.",
                "De exemplu, dacă într-un exercițiu apare vectorul →MM, nu trebuie să cauți o lungime ascunsă.",
                "Punctul de plecare și punctul de sosire sunt același, deci |→MM| = 0 și →MM = →0.",
                "Dacă apare vectorul →AB cu A și B distincte, atunci segmentul AB are lungime strict pozitivă, deci →AB nu este vectorul nul.",
                "Un alt control util este să verifici notațiile înainte de calcule.",
                "→AB este un vector, iar |→AB| este un număr.",
                "Cele două simboluri nu pot fi înlocuite unul cu celălalt într-o egalitate fără să ții cont de tipul obiectului matematic.",
                "În problemele mai lungi, această atenție la notație previne erori care se propagă în pașii următori.",
                "Hai să facem o recapitulare completă.",
                "Un vector poate fi reprezentat printr-un segment orientat.",
                "În notația →AB, prima literă este originea, iar a doua este extremitatea.",
                "Pentru un vector nenul analizăm direcția, sensul și modulul.",
                "Doi vectori nenuli egali au aceeași direcție, același sens și același modul.",
                "Doi vectori nenuli opuși au aceeași direcție și același modul, dar sensuri opuse.",
                "Vectorul nul are modulul egal cu zero.",
                "Dacă reții aceste reguli și le verifici sistematic, ai baza necesară pentru lecțiile următoare despre operații cu vectori."
            ],
            ideiDeRetinut: [
                "Dacă originea și extremitatea coincid, obținem vectorul nul.",
                "Modulul vectorului nul este 0.",
                "Vectorul și modulul său sunt obiecte matematice diferite."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "Ce este vectorul →PP?",
                rezolvareScurta: [
                    "Originea este P.",
                    "Extremitatea este tot P.",
                    "Originea și extremitatea coincid.",
                    "Prin urmare, vectorul este vectorul nul."
                ],
                raspuns: "→PP = →0."
            },
            verificareRapida: {
                intrebare: "Care este modulul vectorului →MM?",
                variante: [
                    "1",
                    "−1",
                    "0",
                    "nu se poate determina"
                ],
                raspunsCorect: 2,
                explicatie: "Vectorul →MM este vectorul nul, deoarece originea și extremitatea coincid. Modulul său este 0."
            }
        }
    ],
    definitii: [
        {
            termen: "Vector",
            definitie: "Un vector poate fi reprezentat printr-un segment orientat. Dacă A este originea și B este extremitatea, vectorul se notează →AB.",
            observatie: "Ordinea literelor este importantă: pentru A și B distincte, →AB și →BA au sensuri opuse."
        },
        {
            termen: "Originea vectorului",
            definitie: "Originea este punctul din care pornește segmentul orientat."
        },
        {
            termen: "Extremitatea vectorului",
            definitie: "Extremitatea este punctul spre care este orientat vectorul."
        },
        {
            termen: "Direcția vectorului",
            definitie: "Pentru un vector nenul, direcția este dată de dreapta suport a segmentului orientat sau de orice dreaptă paralelă cu aceasta."
        },
        {
            termen: "Sensul vectorului",
            definitie: "Pentru un vector nenul, sensul indică una dintre cele două orientări posibile pe direcția vectorului."
        },
        {
            termen: "Modulul vectorului",
            definitie: "Modulul unui vector este lungimea segmentului orientat care îl reprezintă.",
            observatie: "Pentru vectorul →AB, modulul se notează |→AB| și este egal cu lungimea segmentului AB."
        },
        {
            termen: "Vectori egali",
            definitie: "Doi vectori nenuli sunt egali dacă au aceeași direcție, același sens și același modul. Vectorul nul este tratat separat ca un caz special."
        },
        {
            termen: "Vectorul nul",
            definitie: "Vectorul nul este reprezentat de un segment orientat cu originea și extremitatea în același punct și are modulul egal cu 0."
        },
        {
            termen: "Vectorul opus",
            definitie: "Pentru un vector nenul, vectorul opus are aceeași direcție și același modul, dar sens opus.",
            observatie: "Vectorul nul este propriul său opus."
        }
    ],
    teorie: [
        {
            id: "m5-vp-teorie-1",
            titlu: "Segment orientat și notația vectorului",
            explicatie: "Un vector poate fi reprezentat printr-un segment orientat. În notația →AB, A reprezintă originea, iar B reprezintă extremitatea. Ordinea punctelor este esențială deoarece schimbarea lor inversează sensul atunci când A și B sunt distincte.",
            ideiCheie: [
                "→AB pornește din A și ajunge în B.",
                "→BA pornește din B și ajunge în A.",
                "Pentru A și B distincte, →AB și →BA au sensuri opuse."
            ]
        },
        {
            id: "m5-vp-teorie-2",
            titlu: "Direcție, sens și modul",
            explicatie: "Pentru caracterizarea unui vector nenul analizăm direcția, sensul și modulul. Aceste noțiuni trebuie tratate separat. Vectorul nul este cazul special cu modulul 0 și este tratat separat în această lecție.",
            ideiCheie: [
                "Direcția este dată de dreapta suport sau de o dreaptă paralelă cu aceasta.",
                "Sensul arată orientarea pe direcția respectivă.",
                "Modulul reprezintă lungimea vectorului și este nenegativ."
            ]
        },
        {
            id: "m5-vp-teorie-3",
            titlu: "Vectori egali",
            explicatie: "Doi vectori nenuli sunt egali atunci când au aceeași direcție, același sens și același modul.",
            ideiCheie: [
                "Cele trei condiții trebuie verificate simultan.",
                "Vectorii pot avea origini diferite și totuși pot fi egali.",
                "Poziția lor în desen nu determină egalitatea."
            ]
        },
        {
            id: "m5-vp-teorie-4",
            titlu: "Vectori opuși",
            explicatie: "Doi vectori nenuli sunt opuși dacă au aceeași direcție și același modul, dar sensuri opuse.",
            ideiCheie: [
                "Pentru A și B distincte, →AB și →BA sunt vectori opuși.",
                "Opusul vectorului v se notează −v.",
                "Semnul minus indică vectorul opus, nu un modul negativ."
            ]
        },
        {
            id: "m5-vp-teorie-5",
            titlu: "Vectorul nul",
            explicatie: "Dacă originea și extremitatea coincid, obținem vectorul nul. Modulul acestuia este egal cu 0.",
            ideiCheie: [
                "→AA este vector nul.",
                "|→AA| = 0.",
                "Vectorul nul se notează de obicei cu →0."
            ]
        }
    ],
    formule: [
        {
            id: "m5-vp-formula-1",
            nume: "Modulul vectorului determinat de două puncte",
            formula: "|→AB| = AB",
            explicatie: "Modulul vectorului →AB este egal cu lungimea segmentului AB.",
            conditii: [
                "A și B sunt puncte din plan."
            ],
            exempluScurt: "Dacă AB = 5, atunci |→AB| = 5."
        },
        {
            id: "m5-vp-formula-2",
            nume: "Vectori determinați de aceleași două puncte în ordine inversă",
            formula: "→BA = −→AB",
            explicatie: "Pentru două puncte distincte A și B, inversarea originii și extremității păstrează direcția și modulul, dar inversează sensul.",
            conditii: [
                "A și B sunt puncte distincte."
            ],
            exempluScurt: "Opusul vectorului →AB este vectorul →BA."
        },
        {
            id: "m5-vp-formula-3",
            nume: "Modulul vectorului nul",
            formula: "|→0| = 0",
            explicatie: "Vectorul nul are modulul egal cu zero.",
            conditii: [
                "Originea și extremitatea vectorului coincid."
            ],
            exempluScurt: "|→MM| = 0."
        }
    ],
    exempleRezolvate: [
        {
            id: "m5-vp-exemplu-1",
            titlu: "Vector și vector opus",
            enunt: "Fie două puncte distincte A și B. Compară vectorii →AB și →BA.",
            nivel: "fundament",
            pasi: [
                {
                    numar: 1,
                    titlu: "Comparăm direcția",
                    continut: "Ambii vectori sunt determinați de dreapta AB, deci au aceeași direcție."
                },
                {
                    numar: 2,
                    titlu: "Comparăm modulele",
                    continut: "|→AB| = AB și |→BA| = BA. Deoarece AB = BA ca lungimi, modulele sunt egale."
                },
                {
                    numar: 3,
                    titlu: "Comparăm sensurile",
                    continut: "→AB este orientat de la A spre B, iar →BA este orientat de la B spre A. Sensurile sunt opuse."
                },
                {
                    numar: 4,
                    titlu: "Formulăm concluzia",
                    continut: "Vectorii au aceeași direcție și același modul, dar sensuri opuse, deci sunt vectori opuși."
                }
            ],
            raspunsFinal: "Vectorii →AB și →BA sunt opuși: →BA = −→AB.",
            verificare: "Aceeași direcție + module egale + sensuri opuse = vectori opuși."
        },
        {
            id: "m5-vp-exemplu-2",
            titlu: "Recunoașterea vectorului nul",
            enunt: "Punctul M este fix. Ce putem spune despre vectorul →MM?",
            nivel: "fundament",
            pasi: [
                {
                    numar: 1,
                    titlu: "Identificăm originea și extremitatea",
                    continut: "Originea și extremitatea vectorului sunt același punct M."
                },
                {
                    numar: 2,
                    titlu: "Determinăm modulul",
                    continut: "Segmentul MM are lungimea 0, deci |→MM| = 0."
                },
                {
                    numar: 3,
                    titlu: "Identificăm tipul vectorului",
                    continut: "Un vector cu originea egală cu extremitatea este vectorul nul."
                }
            ],
            raspunsFinal: "→MM = →0.",
            verificare: "|→MM| = 0."
        },
        {
            id: "m5-vp-exemplu-3",
            titlu: "Când sunt doi vectori egali?",
            enunt: "Vectorii nenuli u și v au aceeași direcție, același sens și modulele |u| = 7 și |v| = 7. Ce relație există între ei?",
            nivel: "standard-bac",
            pasi: [
                {
                    numar: 1,
                    titlu: "Verificăm direcția",
                    continut: "Direcția celor doi vectori este aceeași."
                },
                {
                    numar: 2,
                    titlu: "Verificăm sensul",
                    continut: "Sensul celor doi vectori este același."
                },
                {
                    numar: 3,
                    titlu: "Verificăm modulul",
                    continut: "Avem |u| = |v| = 7, deci modulele sunt egale."
                },
                {
                    numar: 4,
                    titlu: "Aplicăm definiția",
                    continut: "Sunt îndeplinite simultan toate cele trei condiții pentru egalitatea vectorilor nenuli."
                }
            ],
            raspunsFinal: "u = v.",
            verificare: "Aceeași direcție + același sens + același modul = vectori egali."
        },
        {
            id: "m5-vp-exemplu-4",
            titlu: "Aceeași direcție nu înseamnă automat vectori egali",
            enunt: "Vectorii nenuli u și v au aceeași direcție și același sens, dar |u| = 4 și |v| = 6. Sunt vectorii egali?",
            nivel: "standard-bac",
            pasi: [
                {
                    numar: 1,
                    titlu: "Verificăm direcția",
                    continut: "Vectorii au aceeași direcție."
                },
                {
                    numar: 2,
                    titlu: "Verificăm sensul",
                    continut: "Vectorii au același sens."
                },
                {
                    numar: 3,
                    titlu: "Verificăm modulele",
                    continut: "|u| = 4 și |v| = 6, deci modulele nu sunt egale."
                },
                {
                    numar: 4,
                    titlu: "Formulăm concluzia",
                    continut: "Pentru egalitatea vectorilor trebuie îndeplinite toate cele trei condiții. Deoarece modulele sunt diferite, vectorii nu sunt egali."
                }
            ],
            raspunsFinal: "Nu. Vectorii u și v nu sunt egali.",
            verificare: "Egalitatea vectorilor cere și egalitatea modulelor."
        }
    ],
    greseliFrecvente: [
        {
            greseala: "Elevul consideră că →AB = →BA.",
            deCeEsteGresit: "Pentru A și B distincte, cei doi vectori au aceeași direcție și același modul, dar sensuri opuse.",
            cumOEviti: "Privește întotdeauna ordinea literelor: prima literă este originea, iar a doua este extremitatea."
        },
        {
            greseala: "Elevul confundă vectorul cu modulul său.",
            deCeEsteGresit: "Vectorul și modulul său sunt obiecte matematice diferite. Modulul este lungimea vectorului și este un număr nenegativ.",
            cumOEviti: "Separă notațiile: →AB reprezintă vectorul, iar |→AB| reprezintă modulul său."
        },
        {
            greseala: "Elevul confundă direcția cu sensul.",
            deCeEsteGresit: "Doi vectori nenuli pot avea aceeași direcție și totuși să aibă sensuri opuse.",
            cumOEviti: "Gândește direcția ca pe dreapta suport sau o dreaptă paralelă cu aceasta, iar sensul ca pe orientarea săgeții."
        },
        {
            greseala: "Elevul crede că doi vectori trebuie să aibă aceeași origine pentru a fi egali.",
            deCeEsteGresit: "Egalitatea vectorilor nenuli depinde de direcție, sens și modul, nu de poziția lor în desen.",
            cumOEviti: "Verifică cele trei caracteristici ale vectorilor și nu locul în care sunt reprezentați."
        },
        {
            greseala: "Elevul consideră că un vector poate avea modul negativ.",
            deCeEsteGresit: "Modulul reprezintă o lungime, iar lungimile sunt numere nenegative.",
            cumOEviti: "Reține că |v| ≥ 0 pentru orice vector v."
        }
    ],
    exercitii: [
        {
            id: "m5-vp-ex-1",
            nivel: "fundament",
            tip: "alegere-multipla",
            enunt: "Care este opusul vectorului →AB, dacă A și B sunt puncte distincte?",
            variante: [
                "→BA",
                "→AA",
                "→BB",
                "→AB"
            ],
            raspunsCorect: "→BA",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Observăm orientarea",
                    continut: "Vectorul →AB este orientat de la A spre B."
                },
                {
                    numar: 2,
                    titlu: "Inversăm sensul",
                    continut: "Vectorul cu aceeași direcție și același modul, dar cu sens opus, este →BA."
                }
            ],
            explicatieFinala: "Pentru A și B distincte, →BA = −→AB.",
            punctaj: 1,
            competenta: "Identificarea vectorului opus.",
            gresealaFrecventa: "Confundarea vectorului opus cu vectorul inițial."
        },
        {
            id: "m5-vp-ex-2",
            nivel: "fundament",
            tip: "raspuns-scurt",
            enunt: "Dacă AB = 8 cm, determină |→AB|.",
            raspunsCorect: "8 cm",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Folosim definiția modulului",
                    continut: "Modulul vectorului →AB este lungimea segmentului AB."
                },
                {
                    numar: 2,
                    titlu: "Înlocuim valoarea",
                    continut: "|→AB| = AB = 8 cm."
                }
            ],
            explicatieFinala: "Modulul vectorului este 8 cm.",
            punctaj: 1,
            competenta: "Determinarea modulului unui vector."
        },
        {
            id: "m5-vp-ex-3",
            nivel: "fundament",
            tip: "alegere-multipla",
            enunt: "În vectorul →PQ, punctul Q este:",
            variante: [
                "originea",
                "extremitatea",
                "modulul",
                "direcția"
            ],
            raspunsCorect: "extremitatea",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Citirea notației",
                    continut: "Prima literă indică originea, iar a doua indică extremitatea."
                },
                {
                    numar: 2,
                    titlu: "Aplicăm regula",
                    continut: "În →PQ, P este originea și Q este extremitatea."
                }
            ],
            explicatieFinala: "Q este extremitatea vectorului →PQ.",
            punctaj: 1,
            competenta: "Identificarea originii și extremității unui vector."
        },
        {
            id: "m5-vp-ex-4",
            nivel: "standard-bac",
            tip: "alegere-multipla",
            enunt: "Doi vectori nenuli au aceeași direcție și același modul, dar sensuri opuse. Ei sunt:",
            variante: [
                "egali",
                "opuși",
                "vectori nuli",
                "perpendiculari"
            ],
            raspunsCorect: "opuși",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Identificăm caracteristicile",
                    continut: "Direcția este aceeași, modulele sunt egale, iar sensurile sunt opuse."
                },
                {
                    numar: 2,
                    titlu: "Aplicăm definiția",
                    continut: "Acestea sunt exact condițiile pentru doi vectori nenuli opuși."
                }
            ],
            explicatieFinala: "Cei doi vectori sunt opuși.",
            punctaj: 1,
            competenta: "Recunoașterea relației dintre doi vectori."
        },
        {
            id: "m5-vp-ex-5",
            nivel: "standard-bac",
            tip: "raspuns-scurt",
            enunt: "Determină modulul vectorului →PP.",
            raspunsCorect: "0",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Observăm originea și extremitatea",
                    continut: "Originea și extremitatea coincid în punctul P."
                },
                {
                    numar: 2,
                    titlu: "Identificăm vectorul",
                    continut: "→PP este vectorul nul."
                },
                {
                    numar: 3,
                    titlu: "Determinăm modulul",
                    continut: "Vectorul nul are modulul 0, deci |→PP| = 0."
                }
            ],
            explicatieFinala: "Vectorul nul are modulul egal cu 0.",
            punctaj: 1,
            competenta: "Recunoașterea vectorului nul."
        },
        {
            id: "m5-vp-ex-6",
            nivel: "standard-bac",
            tip: "alegere-multipla",
            enunt: "Vectorii nenuli u și v au aceeași direcție, același sens, |u| = 5 și |v| = 7. Care afirmație este corectă?",
            variante: [
                "u = v",
                "u = −v",
                "u și v nu sunt egali",
                "u și v sunt vectori nuli"
            ],
            raspunsCorect: "u și v nu sunt egali",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Verificăm direcția",
                    continut: "Direcția este aceeași."
                },
                {
                    numar: 2,
                    titlu: "Verificăm sensul",
                    continut: "Sensul este același."
                },
                {
                    numar: 3,
                    titlu: "Verificăm modulele",
                    continut: "|u| = 5 și |v| = 7, deci modulele sunt diferite."
                },
                {
                    numar: 4,
                    titlu: "Aplicăm definiția",
                    continut: "Vectorii egali trebuie să aibă și module egale. Condiția nu este îndeplinită."
                }
            ],
            explicatieFinala: "u și v nu sunt egali deoarece modulele lor sunt diferite.",
            punctaj: 1,
            competenta: "Aplicarea criteriilor de egalitate a vectorilor."
        },
        {
            id: "m5-vp-ex-7",
            nivel: "avansat",
            tip: "rezolvare-completa",
            enunt: "Vectorii nenuli u și v au aceeași direcție și module egale. Precizează ce informație suplimentară este necesară pentru a decide dacă u = v sau u = −v.",
            raspunsCorect: "Trebuie comparate sensurile celor doi vectori.",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Folosim informațiile cunoscute",
                    continut: "Știm deja că vectorii au aceeași direcție și module egale."
                },
                {
                    numar: 2,
                    titlu: "Identificăm informația lipsă",
                    continut: "Pentru a diferenția egalitatea de opoziție trebuie să comparăm sensurile."
                },
                {
                    numar: 3,
                    titlu: "Stabilim primul caz",
                    continut: "Dacă sensurile sunt aceleași, atunci u = v."
                },
                {
                    numar: 4,
                    titlu: "Stabilim al doilea caz",
                    continut: "Dacă sensurile sunt opuse, atunci u = −v."
                }
            ],
            explicatieFinala: "Sensul este informația suplimentară necesară pentru a diferenția cele două situații.",
            punctaj: 2,
            competenta: "Compararea și caracterizarea vectorilor."
        },
        {
            id: "m5-vp-ex-8",
            nivel: "avansat",
            tip: "rezolvare-completa",
            enunt: "Fie punctele distincte A și B. Arată că vectorii →AB și →BA au module egale, dar nu sunt egali.",
            raspunsCorect: "Au module egale și sensuri opuse, deci sunt vectori opuși, nu egali.",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Comparăm modulele",
                    continut: "|→AB| = AB și |→BA| = BA. Lungimea segmentului AB este aceeași indiferent de ordinea capetelor, deci modulele sunt egale."
                },
                {
                    numar: 2,
                    titlu: "Comparăm direcția",
                    continut: "Ambii vectori sunt determinați de aceeași dreaptă AB, deci au aceeași direcție."
                },
                {
                    numar: 3,
                    titlu: "Comparăm sensurile",
                    continut: "→AB este orientat de la A spre B, iar →BA de la B spre A, deci sensurile sunt opuse."
                },
                {
                    numar: 4,
                    titlu: "Concluzionăm",
                    continut: "Deoarece sensurile sunt diferite, vectorii nu sunt egali. Ei sunt vectori opuși."
                }
            ],
            explicatieFinala: "Egalitatea modulelor nu este suficientă pentru egalitatea vectorilor.",
            punctaj: 2,
            competenta: "Justificarea relației dintre vectori folosind definițiile."
        }
    ],
    rezumat: {
        ideiDeRetinut: [
            "Un vector poate fi reprezentat printr-un segment orientat.",
            "În →AB, A este originea și B este extremitatea.",
            "Un vector nenul este caracterizat prin direcție, sens și modul; vectorul nul este cazul special cu modulul 0.",
            "Modulul unui vector reprezintă lungimea sa și este nenegativ.",
            "Doi vectori nenuli egali au aceeași direcție, același sens și același modul.",
            "Doi vectori nenuli opuși au aceeași direcție și același modul, dar sensuri opuse.",
            "Vectorul nul are originea și extremitatea în același punct și modulul 0."
        ],
        formuleDeRetinut: [
            "|→AB| = AB",
            "→BA = −→AB",
            "|→0| = 0"
        ],
        checklistElev: [
            "Pot identifica originea și extremitatea unui vector.",
            "Pot explica diferența dintre direcție și sens pentru un vector nenul.",
            "Pot explica diferența dintre vector și modulul său.",
            "Pot determina modulul unui vector atunci când cunosc lungimea segmentului.",
            "Pot recunoaște vectori egali.",
            "Pot recunoaște vectori opuși.",
            "Pot identifica vectorul nul.",
            "Pot explica de ce →AB și →BA nu sunt egali atunci când A și B sunt distincte."
        ]
    },
    legaturaCuBac: {
        importanta: "Noțiunile elementare despre vectori constituie baza pentru operațiile cu vectori și pentru utilizarea metodelor vectoriale în geometrie. Stăpânirea definițiilor reduce erorile în exercițiile ulterioare în care apar egalități, sume, diferențe și relații între vectori.",
        tipuriCerinte: [
            "Identificarea originii și extremității unui vector.",
            "Compararea direcției, sensului și modulului unor vectori nenuli.",
            "Recunoașterea vectorilor egali sau opuși.",
            "Determinarea modulului unui vector.",
            "Identificarea vectorului nul.",
            "Justificarea unor relații vectoriale elementare."
        ],
        strategie: [
            "Identifică originea și extremitatea din ordinea literelor.",
            "Verifică mai întâi dacă ai un vector nul sau un vector nenul.",
            "Pentru vectorii nenuli, compară separat direcția.",
            "Compară separat sensul.",
            "Compară modulele.",
            "Aplică definiția corespunzătoare numai după ce ai verificat toate caracteristicile necesare."
        ]
    },
    surse: [
        {
            tip: "programa-oficiala",
            titlu: "Programa de examen pentru disciplina Matematică — Bacalaureat, profil M_mate-info",
            observatie: "Lecția acoperă partea introductivă a temei oficiale „Vectori în plan”: segment orientat și noțiunile fundamentale despre vectori. Operațiile cu vectori, înmulțirea cu scalar, coliniaritatea și descompunerea sunt tratate separat în lecțiile următoare ale modulului BAC MATE."
        },
        {
            tip: "verificare-interna",
            titlu: "BAC MATE — audit matematic, pedagogic și lingvistic",
            observatie: "Au fost verificate definițiile, exemplele, formulele, cele 8 exerciții, răspunsurile, explicațiile și scenariile video."
        }
    ],
    verificare: {
        status: "publicabil",
        verificatMatematic: true,
        verificatPrograma: true,
        verificatExercitii: true,
        verificatLimbaRomana: true,
        ultimaVerificare: "2026-09-13",
        observatii: [
            "Prima lecție-etalon verificată pentru BAC MATE Content Engine V1.",
            "Conținutul matematic a fost verificat separat de validarea structurală automată.",
            "Încadrarea curriculară a fost verificată pentru profilul M_mate-info.",
            "Cele 8 exerciții și răspunsurile lor au fost verificate.",
            "Formulările în limba română și explicațiile pedagogice au fost revizuite.",
            "Cele patru scenarii video respectă structura pedagogică stabilită pentru BAC MATE.",
            "Integrarea exercițiilor Content Engine în mini-test a fost verificată funcțional.",
            "Lecția nu este încă publicabilă. Publicarea rămâne un gate separat."
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/continut/lectii/numere-reale.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "continutNumereReale",
    ()=>continutNumereReale
]);
const continutNumereReale = {
    "id": "numere-reale",
    "slug": "numere-reale",
    "modul": 1,
    "numarLectie": 1,
    "clasa": "Clasa a IX-a",
    "profil": "M_mate-info",
    "titlu": "Mulțimi de numere și operații cu numere reale",
    "subtitlu": "Înțelege mulțimile N, Z, Q și R, clasifică numerele corect și recapitulează operațiile de bază cu numere reale.",
    "descriere": "Lecția prezintă principalele mulțimi de numere folosite în liceu: numere naturale, întregi, raționale, iraționale și reale. Elevul învață relațiile de incluziune dintre aceste mulțimi, clasificarea numerelor și ordinea efectuării operațiilor.",
    "nivelPrincipal": "fundament",
    "durataEstimataMinute": 25,
    "prerechizite": [
        "Operații aritmetice elementare",
        "Fracții",
        "Puteri și radicali elementari"
    ],
    "obiective": [
        "Să recunoști mulțimile de numere naturale, întregi, raționale și reale.",
        "Să clasifici corect un număr în una sau mai multe mulțimi numerice.",
        "Să diferențiezi numerele raționale de numerele iraționale.",
        "Să folosești relația de incluziune N ⊂ Z ⊂ Q ⊂ R.",
        "Să efectuezi corect calcule elementare cu numere reale respectând ordinea operațiilor."
    ],
    "termeniCheie": [
        "număr natural",
        "număr întreg",
        "număr rațional",
        "număr irațional",
        "număr real",
        "mulțime",
        "incluziune",
        "fracție",
        "zecimală finită",
        "zecimală periodică"
    ],
    "videoLectii": [
        {
            "id": "m1-nr-video-1",
            "numar": 1,
            "titlu": "N, Z, Q și R explicate simplu",
            "durataMinute": 4,
            "descriere": "Pornim de la mulțimile numerice cunoscute și înțelegem relația dintre numere naturale, întregi, raționale și reale.",
            "scenariu": [
                "În matematică întâlnim multe tipuri de numere, dar ele nu sunt organizate la întâmplare.",
                "Pentru început avem numerele naturale. În această mulțime găsim numerele folosite în mod obișnuit pentru numărare.",
                "În funcție de convenția folosită, mulțimea numerelor naturale poate fi scrisă cu sau fără zero. În această lecție trebuie să urmărim convenția utilizată în materialele BAC MATE.",
                "Următoarea mulțime este mulțimea numerelor întregi, notată cu Z.",
                "Numerele întregi includ numerele naturale, numerele negative corespunzătoare și numărul zero.",
                "De exemplu, minus șapte este număr întreg, zero este număr întreg, iar cinci este număr întreg.",
                "Orice număr natural este și număr întreg.",
                "De aceea putem spune că mulțimea N este inclusă în mulțimea Z.",
                "Mergem mai departe la numerele raționale, notate cu Q.",
                "Un număr rațional este un număr care poate fi scris sub forma unei fracții a supra b, unde a și b sunt numere întregi și b este diferit de zero.",
                "De exemplu, trei pătrimi este număr rațional.",
                "Dar și numărul cinci este rațional, deoarece poate fi scris cinci supra unu.",
                "La fel, minus șapte este rațional, deoarece poate fi scris minus șapte supra unu.",
                "Asta înseamnă că orice număr întreg este și număr rațional.",
                "Prin urmare, Z este inclusă în Q.",
                "Există însă și numere care nu sunt raționale.",
                "Acestea se numesc numere iraționale.",
                "Exemple cunoscute sunt radical din doi și numărul pi.",
                "Ele nu pot fi scrise sub forma unei fracții dintre două numere întregi cu numitor nenul.",
                "Toate numerele raționale și toate numerele iraționale fac parte din mulțimea numerelor reale.",
                "Mulțimea numerelor reale se notează cu R.",
                "Astfel obținem relația foarte importantă N inclus în Z, Z inclus în Q și Q inclus în R.",
                "Putem scrie pe scurt N inclus în Z inclus în Q inclus în R.",
                "Această relație ne ajută să clasificăm rapid numerele.",
                "De exemplu, numărul trei este natural.",
                "Fiind natural, el este automat și întreg.",
                "Fiind întreg, este automat și rațional.",
                "Fiind rațional, este și real.",
                "Numărul minus șapte nu este natural, dar este întreg, rațional și real.",
                "Numărul trei pătrimi nu este întreg, dar este rațional și real.",
                "Radical din doi este irațional, dar este tot număr real.",
                "Atunci când clasifici un număr, încearcă să găsești cea mai mică mulțime importantă din care face parte.",
                "Apoi poți folosi relațiile de incluziune pentru a stabili automat apartenența la mulțimile mai mari.",
                "Reține lanțul N, Z, Q, R. Îl vom folosi pe tot parcursul acestei lecții."
            ],
            "ideiDeRetinut": [
                "N ⊂ Z ⊂ Q ⊂ R.",
                "Orice număr întreg este și rațional.",
                "Numerele iraționale sunt reale, dar nu sunt raționale."
            ],
            "exemplu": {
                "titlu": "Exemplu rapid",
                "enunt": "Clasifică numărul −7.",
                "rezolvareScurta": [
                    "−7 este număr întreg.",
                    "Orice număr întreg este rațional deoarece −7 = −7/1.",
                    "Orice număr rațional este real."
                ],
                "raspuns": "−7 ∈ Z, −7 ∈ Q și −7 ∈ R."
            },
            "verificareRapida": {
                "intrebare": "Care relație de incluziune este corectă?",
                "variante": [
                    "R ⊂ Q ⊂ Z ⊂ N",
                    "N ⊂ Z ⊂ Q ⊂ R",
                    "Z ⊂ N ⊂ Q ⊂ R",
                    "Q ⊂ Z ⊂ N ⊂ R"
                ],
                "raspunsCorect": 1,
                "explicatie": "Numerele naturale sunt incluse în întregi, întregii în raționale, iar raționalele în reale."
            }
        },
        {
            "id": "m1-nr-video-2",
            "numar": 2,
            "titlu": "Rațional sau irațional?",
            "durataMinute": 4,
            "descriere": "Învățăm criteriile simple prin care putem decide dacă un număr este rațional sau irațional.",
            "scenariu": [
                "Una dintre cele mai importante clasificări este diferența dintre numere raționale și numere iraționale.",
                "Începem cu definiția numărului rațional.",
                "Un număr este rațional dacă poate fi scris ca o fracție a supra b, unde a și b sunt numere întregi, iar b este diferit de zero.",
                "De exemplu, trei supra patru este rațional chiar din forma în care este scris.",
                "Numărul minus doi este și el rațional, pentru că îl putem scrie minus doi supra unu.",
                "Numărul zero este rațional, deoarece poate fi scris zero supra unu.",
                "Și numerele zecimale finite sunt raționale.",
                "De exemplu, zero virgulă douăzeci și cinci este egal cu douăzeci și cinci supra o sută, adică unu supra patru.",
                "Prin urmare, zero virgulă douăzeci și cinci este rațional.",
                "Zecimalele periodice sunt de asemenea raționale.",
                "De exemplu, zero virgulă trei periodic reprezintă fracția unu supra trei.",
                "Așadar, faptul că o dezvoltare zecimală are foarte multe cifre nu înseamnă automat că numărul este irațional.",
                "Trebuie să observăm dacă dezvoltarea este periodică.",
                "Un număr irațional nu poate fi scris ca raport al două numere întregi cu numitor nenul.",
                "Exemple clasice sunt radical din doi și pi.",
                "Dezvoltările lor zecimale sunt infinite și neperiodice.",
                "Trebuie însă să fim atenți când vedem un radical.",
                "Nu orice număr care conține un radical este irațional.",
                "De exemplu, radical din nouă este egal cu trei.",
                "Iar trei este număr natural, întreg, rațional și real.",
                "La fel, radical din șaisprezece este patru, deci este rațional.",
                "În schimb, radical din doi este irațional.",
                "O strategie bună este să simplifici mai întâi expresia înainte să o clasifici.",
                "Dacă ai o fracție obișnuită dintre două numere întregi și numitorul este nenul, numărul este rațional.",
                "Dacă ai o zecimală finită, numărul este rațional.",
                "Dacă ai o zecimală periodică, numărul este rațional.",
                "Dacă întâlnești un radical, verifică mai întâi dacă valoarea de sub radical este pătrat perfect atunci când lucrezi cu rădăcina pătrată.",
                "Dacă radicalul se simplifică la un număr întreg sau la un număr rațional, rezultatul este rațional.",
                "Dacă nu, în exemplele elementare ale acestei lecții poți ajunge la un număr irațional.",
                "Pi este un alt exemplu important de număr irațional.",
                "Toate numerele iraționale sunt însă numere reale.",
                "Mulțimea numerelor reale conține atât numerele raționale, cât și numerele iraționale.",
                "Când primești un exercițiu de clasificare, nu te grăbi să judeci doar după aspectul numărului.",
                "Simplifică mai întâi și apoi aplică definiția."
            ],
            "ideiDeRetinut": [
                "Fracțiile dintre întregi cu numitor nenul sunt raționale.",
                "Zecimalele finite și zecimalele periodice sunt raționale.",
                "Un radical nu este automat irațional; trebuie mai întâi simplificat."
            ],
            "exemplu": {
                "titlu": "Exemplu rapid",
                "enunt": "Numerele 0,25 și √2 sunt raționale sau iraționale?",
                "rezolvareScurta": [
                    "0,25 = 25/100 = 1/4, deci este rațional.",
                    "√2 nu poate fi scris ca raport al două numere întregi."
                ],
                "raspuns": "0,25 este rațional, iar √2 este irațional."
            },
            "verificareRapida": {
                "intrebare": "Care dintre următoarele numere este irațional?",
                "variante": [
                    "0,25",
                    "−3",
                    "7/5",
                    "√2"
                ],
                "raspunsCorect": 3,
                "explicatie": "0,25, −3 și 7/5 sunt raționale. √2 este irațional."
            }
        },
        {
            "id": "m1-nr-video-3",
            "numar": 3,
            "titlu": "Cum clasifici corect un număr",
            "durataMinute": 4,
            "descriere": "Aplicăm sistematic relațiile dintre N, Z, Q și R pentru a clasifica diferite tipuri de numere.",
            "scenariu": [
                "Acum vom transforma teoria într-o metodă rapidă de clasificare.",
                "Atunci când vezi un număr, primul pas este să îl simplifici dacă este posibil.",
                "După aceea încerci să găsești cea mai mică mulțime numerică importantă din care face parte.",
                "Să luăm numărul cinci.",
                "Cinci este număr natural.",
                "Cum N este inclusă în Z, cinci este și întreg.",
                "Cum Z este inclusă în Q, cinci este și rațional.",
                "Cum Q este inclusă în R, cinci este și real.",
                "Așadar, un singur număr poate aparține simultan mai multor mulțimi.",
                "Acum luăm numărul minus cinci.",
                "El nu este număr natural în convenția obișnuită folosită pentru numerele negative.",
                "Este însă număr întreg.",
                "Prin incluziune, este și rațional și real.",
                "Să analizăm fracția două supra trei.",
                "Ea este rațională prin definiție.",
                "Nu este număr întreg.",
                "Fiind rațională, este automat și număr real.",
                "Acum luăm radical din nouă.",
                "Nu îl clasificăm imediat după faptul că vedem simbolul radical.",
                "Mai întâi calculăm radical din nouă și obținem trei.",
                "Trei este natural, întreg, rațional și real.",
                "Acesta este un exemplu foarte important: forma inițială a expresiei poate induce în eroare.",
                "Să analizăm radical din doi.",
                "Acesta nu se simplifică la un număr rațional.",
                "Este un număr irațional.",
                "Dar este în continuare număr real.",
                "O altă situație este o zecimală finită, de exemplu unu virgulă cinci.",
                "Putem scrie unu virgulă cinci ca cincisprezece supra zece, apoi simplificăm la trei supra doi.",
                "Este deci rațional și real.",
                "Pentru o zecimală periodică, de exemplu zero virgulă trei periodic, rezultatul este tot rațional.",
                "O greșeală frecventă este să alegi o singură mulțime și să consideri că numărul nu mai aparține celorlalte.",
                "Dacă întrebarea cere toate mulțimile din care face parte numărul, trebuie să folosești incluziunile.",
                "Dacă întrebarea cere cea mai mică mulțime dintre N, Z, Q și R, atunci alegi prima mulțime din lanț în care poate fi încadrat.",
                "Pentru minus șapte, cea mai mică dintre aceste patru este Z.",
                "Pentru trei supra patru, cea mai mică este Q.",
                "Pentru radical din doi, dintre aceste mulțimi enumerate, este R, cu precizarea că numărul este irațional.",
                "Metoda poate fi rezumată astfel: simplifică, identifică tipul numărului și apoi folosește incluziunile."
            ],
            "ideiDeRetinut": [
                "Simplifică expresia înainte de clasificare.",
                "Caută mai întâi cea mai mică mulțime potrivită.",
                "Folosește N ⊂ Z ⊂ Q ⊂ R pentru apartenențele suplimentare."
            ],
            "exemplu": {
                "titlu": "Exemplu rapid",
                "enunt": "Clasifică numărul √9.",
                "rezolvareScurta": [
                    "√9 = 3.",
                    "3 este număr natural.",
                    "Prin incluziune, 3 este și întreg, rațional și real."
                ],
                "raspuns": "√9 = 3 ∈ N, Z, Q și R."
            },
            "verificareRapida": {
                "intrebare": "Care este cea mai mică mulțime dintre N, Z, Q și R care conține numărul −8?",
                "variante": [
                    "N",
                    "Z",
                    "Q",
                    "R"
                ],
                "raspunsCorect": 1,
                "explicatie": "−8 este număr întreg. Este și rațional și real, dar dintre mulțimile date, Z este cea mai mică."
            }
        },
        {
            "id": "m1-nr-video-4",
            "numar": 4,
            "titlu": "Calcule cu numere reale și greșeli frecvente",
            "durataMinute": 5,
            "descriere": "Recapitulăm ordinea operațiilor și eliminăm câteva dintre cele mai frecvente greșeli din calculele elementare.",
            "scenariu": [
                "Ultima parte a lecției este despre calculele cu numere reale.",
                "Când avem mai multe operații într-o expresie, nu le efectuăm pur și simplu de la stânga la dreapta.",
                "Trebuie să respectăm ordinea operațiilor.",
                "În primul rând rezolvăm ceea ce se află în paranteze.",
                "Apoi calculăm puterile și radicalii care pot fi calculați.",
                "După aceea efectuăm înmulțirile și împărțirile.",
                "La final efectuăm adunările și scăderile.",
                "Operațiile de același rang se efectuează în ordinea în care apar, de la stânga la dreapta.",
                "Să analizăm expresia doi minus trei ori minus patru plus cinci.",
                "Înmulțirea are prioritate față de adunare și scădere.",
                "Calculăm mai întâi trei ori minus patru și obținem minus doisprezece.",
                "Expresia devine doi minus minus doisprezece plus cinci.",
                "Scăderea unui număr negativ devine adunare.",
                "Obținem doi plus doisprezece plus cinci.",
                "Rezultatul final este nouăsprezece.",
                "O greșeală frecventă ar fi să calculăm mai întâi doi minus trei.",
                "Asta ar încălca ordinea operațiilor.",
                "O altă zonă în care apar erori este lucrul cu fracțiile.",
                "La adunarea fracțiilor, numitorii trebuie aduși la un numitor comun.",
                "De exemplu, trei pătrimi plus cinci șesimi.",
                "Cel mai mic multiplu comun al lui patru și șase este doisprezece.",
                "Trei pătrimi devine nouă doisprezecimi.",
                "Cinci șesimi devine zece doisprezecimi.",
                "Suma este nouăsprezece doisprezecimi.",
                "Nu adunăm direct numărătorii și numitorii.",
                "Trei pătrimi plus cinci șesimi nu este opt zecimi.",
                "Și semnele trebuie tratate cu atenție.",
                "Produsul a două numere cu același semn este pozitiv.",
                "Produsul a două numere cu semne diferite este negativ.",
                "La scădere, este util să transformăm scăderea într-o adunare cu opusul atunci când apar multe semne.",
                "De exemplu, cinci minus minus doi devine cinci plus doi.",
                "Un alt lucru important este să simplificăm rezultatul când este posibil.",
                "Dacă obținem o fracție, verificăm dacă numărătorul și numitorul au un divizor comun.",
                "Dacă avem radicali simpli, verificăm dacă putem extrage factori pătrați perfecți.",
                "În exercițiile de bază, precizia vine din respectarea pașilor, nu din viteză.",
                "O strategie sigură este să scrii câte o transformare pe fiecare rând.",
                "Astfel poți verifica mai ușor unde apare o eventuală eroare.",
                "Pentru BAC, calculele elementare greșite pot compromite un exercițiu care, conceptual, este simplu.",
                "De aceea ordinea operațiilor și semnele trebuie automatizate prin exercițiu.",
                "Reține: paranteze, puteri și radicali, înmulțiri și împărțiri, apoi adunări și scăderi."
            ],
            "ideiDeRetinut": [
                "Respectă ordinea operațiilor.",
                "La fracții, folosește numitor comun pentru adunare și scădere.",
                "Fii atent la semnele numerelor negative."
            ],
            "exemplu": {
                "titlu": "Exemplu rapid",
                "enunt": "Calculează 2 − 3 × (−4) + 5.",
                "rezolvareScurta": [
                    "Calculăm mai întâi înmulțirea: 3 × (−4) = −12.",
                    "Obținem 2 − (−12) + 5.",
                    "Scăderea unui număr negativ devine adunare.",
                    "2 + 12 + 5 = 19."
                ],
                "raspuns": "19"
            },
            "verificareRapida": {
                "intrebare": "Care este primul calcul care trebuie efectuat în expresia 2 + 3 × 4?",
                "variante": [
                    "2 + 3",
                    "3 × 4",
                    "2 + 4",
                    "Nu contează ordinea"
                ],
                "raspunsCorect": 1,
                "explicatie": "Înmulțirea are prioritate față de adunare."
            }
        }
    ],
    "definitii": [
        {
            "termen": "Număr natural",
            "definitie": "Număr care aparține mulțimii N, conform convenției de lucru adoptate pentru mulțimea numerelor naturale.",
            "observatie": "Convenția privind includerea lui 0 în N trebuie păstrată consecvent în materialele cursului."
        },
        {
            "termen": "Număr întreg",
            "definitie": "Număr care aparține mulțimii Z; această mulțime conține numerele naturale, numerele întregi negative și zero."
        },
        {
            "termen": "Număr rațional",
            "definitie": "Număr care poate fi scris sub forma a/b, unde a și b sunt numere întregi și b ≠ 0."
        },
        {
            "termen": "Număr irațional",
            "definitie": "Număr real care nu este rațional."
        },
        {
            "termen": "Număr real",
            "definitie": "Număr care aparține mulțimii R. Numerele reale includ numerele raționale și numerele iraționale."
        }
    ],
    "teorie": [
        {
            "id": "m1-nr-teorie-1",
            "titlu": "Relația dintre mulțimile numerice",
            "explicatie": "Mulțimile numerice fundamentale sunt legate prin incluziuni. Orice număr natural este întreg, orice număr întreg este rațional, iar orice număr rațional este real.",
            "ideiCheie": [
                "N ⊂ Z",
                "Z ⊂ Q",
                "Q ⊂ R",
                "Prin urmare N ⊂ Z ⊂ Q ⊂ R."
            ]
        },
        {
            "id": "m1-nr-teorie-2",
            "titlu": "Numere raționale și iraționale",
            "explicatie": "Numerele raționale se pot scrie sub forma unei fracții de numere întregi cu numitor nenul. Numerele reale care nu au această proprietate sunt iraționale.",
            "ideiCheie": [
                "Zecimalele finite sunt raționale.",
                "Zecimalele periodice sunt raționale.",
                "√2 și π sunt exemple de numere iraționale.",
                "Un radical trebuie simplificat înainte de clasificare."
            ]
        },
        {
            "id": "m1-nr-teorie-3",
            "titlu": "Ordinea operațiilor",
            "explicatie": "În expresiile numerice, operațiile se efectuează respectând prioritățile matematice.",
            "ideiCheie": [
                "Mai întâi parantezele.",
                "Apoi puterile și radicalii.",
                "Apoi înmulțirile și împărțirile.",
                "La final adunările și scăderile."
            ]
        }
    ],
    "formule": [
        {
            "id": "m1-nr-formula-1",
            "nume": "Incluziunea mulțimilor numerice",
            "formula": "N ⊂ Z ⊂ Q ⊂ R",
            "explicatie": "Orice număr natural este întreg, orice întreg este rațional, iar orice rațional este real."
        },
        {
            "id": "m1-nr-formula-2",
            "nume": "Forma unui număr rațional",
            "formula": "x = a/b, a ∈ Z, b ∈ Z, b ≠ 0",
            "explicatie": "Un număr este rațional dacă poate fi exprimat ca raport al două numere întregi cu numitor nenul."
        }
    ],
    "exempleRezolvate": [
        {
            "id": "m1-nr-exemplu-1",
            "titlu": "Clasificarea unui număr întreg negativ",
            "enunt": "Clasifică numărul −7 în mulțimile N, Z, Q și R.",
            "nivel": "fundament",
            "pasi": [
                {
                    "numar": 1,
                    "titlu": "Verificăm dacă este natural",
                    "continut": "−7 este negativ, deci nu este număr natural."
                },
                {
                    "numar": 2,
                    "titlu": "Verificăm dacă este întreg",
                    "continut": "−7 este număr întreg, deci −7 ∈ Z."
                },
                {
                    "numar": 3,
                    "titlu": "Folosim incluziunile",
                    "continut": "Din Z ⊂ Q ⊂ R rezultă că −7 este și rațional și real."
                }
            ],
            "raspunsFinal": "−7 ∈ Z, Q și R.",
            "verificare": "−7 = −7/1, deci este rațional."
        },
        {
            "id": "m1-nr-exemplu-2",
            "titlu": "Clasificarea unui radical",
            "enunt": "Stabilește dacă √9 este rațional sau irațional.",
            "nivel": "fundament",
            "pasi": [
                {
                    "numar": 1,
                    "titlu": "Simplificăm radicalul",
                    "continut": "√9 = 3."
                },
                {
                    "numar": 2,
                    "titlu": "Clasificăm rezultatul",
                    "continut": "3 este număr natural și, implicit, întreg, rațional și real."
                }
            ],
            "raspunsFinal": "√9 este număr rațional.",
            "verificare": "√9 = 3 = 3/1."
        },
        {
            "id": "m1-nr-exemplu-3",
            "titlu": "Adunarea a două fracții",
            "enunt": "Calculează 3/4 + 5/6.",
            "nivel": "standard-bac",
            "pasi": [
                {
                    "numar": 1,
                    "titlu": "Alegem numitorul comun",
                    "continut": "Cel mai mic multiplu comun al lui 4 și 6 este 12."
                },
                {
                    "numar": 2,
                    "titlu": "Aducem fracțiile la același numitor",
                    "continut": "3/4 = 9/12 și 5/6 = 10/12."
                },
                {
                    "numar": 3,
                    "titlu": "Adunăm",
                    "continut": "9/12 + 10/12 = 19/12."
                }
            ],
            "raspunsFinal": "19/12.",
            "verificare": "19 și 12 nu au divizor comun mai mare decât 1."
        }
    ],
    "greseliFrecvente": [
        {
            "greseala": "Elevul consideră că un număr poate aparține unei singure mulțimi numerice.",
            "deCeEsteGresit": "Mulțimile N, Z, Q și R sunt legate prin incluziuni, deci un număr poate aparține simultan mai multor mulțimi.",
            "cumOEviti": "Folosește lanțul N ⊂ Z ⊂ Q ⊂ R."
        },
        {
            "greseala": "Elevul consideră orice radical drept număr irațional.",
            "deCeEsteGresit": "Unii radicali se simplifică la numere întregi sau raționale, de exemplu √9 = 3.",
            "cumOEviti": "Simplifică radicalul înainte să clasifici numărul."
        },
        {
            "greseala": "Elevul efectuează operațiile strict de la stânga la dreapta.",
            "deCeEsteGresit": "Înmulțirea și împărțirea au prioritate față de adunare și scădere.",
            "cumOEviti": "Respectă ordinea operațiilor la fiecare calcul."
        },
        {
            "greseala": "Elevul adună direct numărătorii și numitorii fracțiilor.",
            "deCeEsteGresit": "La adunarea fracțiilor cu numitori diferiți trebuie folosit un numitor comun.",
            "cumOEviti": "Adu fracțiile la același numitor înainte de adunare."
        }
    ],
    "exercitii": [
        {
            "id": "m1-nr-ex-1",
            "nivel": "fundament",
            "tip": "alegere-multipla",
            "enunt": "Cărei mulțimi îi aparține sigur numărul −7?",
            "variante": [
                "N",
                "Z",
                "N, dar nu Z",
                "Niciunei mulțimi numerice"
            ],
            "raspunsCorect": "Z",
            "rezolvare": [
                {
                    "numar": 1,
                    "titlu": "Observăm semnul",
                    "continut": "−7 este un număr întreg negativ."
                },
                {
                    "numar": 2,
                    "titlu": "Alegem mulțimea",
                    "continut": "Numerele întregi aparțin mulțimii Z."
                }
            ],
            "explicatieFinala": "−7 ∈ Z. Prin incluziune, este și rațional și real.",
            "punctaj": 1,
            "competenta": "Clasificarea numerelor întregi."
        },
        {
            "id": "m1-nr-ex-2",
            "nivel": "fundament",
            "tip": "alegere-multipla",
            "enunt": "Care dintre următoarele numere este irațional?",
            "variante": [
                "0,25",
                "√2",
                "−3",
                "7/5"
            ],
            "raspunsCorect": "√2",
            "rezolvare": [
                {
                    "numar": 1,
                    "titlu": "Analizăm variantele raționale",
                    "continut": "0,25 = 1/4, −3 = −3/1, iar 7/5 este deja fracție."
                },
                {
                    "numar": 2,
                    "titlu": "Identificăm numărul irațional",
                    "continut": "√2 este irațional."
                }
            ],
            "explicatieFinala": "√2 este singurul număr irațional dintre variante.",
            "punctaj": 1,
            "competenta": "Diferențierea numerelor raționale și iraționale."
        },
        {
            "id": "m1-nr-ex-3",
            "nivel": "standard-bac",
            "tip": "alegere-multipla",
            "enunt": "Care relație este corectă?",
            "variante": [
                "R ⊂ Q ⊂ Z ⊂ N",
                "N ⊂ Z ⊂ Q ⊂ R",
                "Z ⊂ N ⊂ R ⊂ Q",
                "Q ⊂ N ⊂ Z ⊂ R"
            ],
            "raspunsCorect": "N ⊂ Z ⊂ Q ⊂ R",
            "rezolvare": [
                {
                    "numar": 1,
                    "titlu": "Pornim de la numerele naturale",
                    "continut": "Orice număr natural este întreg."
                },
                {
                    "numar": 2,
                    "titlu": "Continuăm incluziunile",
                    "continut": "Orice întreg este rațional, iar orice rațional este real."
                }
            ],
            "explicatieFinala": "Relația corectă este N ⊂ Z ⊂ Q ⊂ R.",
            "punctaj": 1,
            "competenta": "Folosirea relațiilor de incluziune."
        },
        {
            "id": "m1-nr-ex-4",
            "nivel": "standard-bac",
            "tip": "raspuns-scurt",
            "enunt": "Calculează 3/4 + 5/6.",
            "raspunsCorect": "19/12",
            "rezolvare": [
                {
                    "numar": 1,
                    "titlu": "Aducem la numitor comun",
                    "continut": "3/4 = 9/12 și 5/6 = 10/12."
                },
                {
                    "numar": 2,
                    "titlu": "Adunăm",
                    "continut": "9/12 + 10/12 = 19/12."
                }
            ],
            "explicatieFinala": "Rezultatul este 19/12.",
            "punctaj": 1,
            "competenta": "Calcul cu numere raționale."
        },
        {
            "id": "m1-nr-ex-5",
            "nivel": "standard-bac",
            "tip": "raspuns-scurt",
            "enunt": "Calculează 2 − 3 × (−4) + 5.",
            "raspunsCorect": "19",
            "rezolvare": [
                {
                    "numar": 1,
                    "titlu": "Calculăm înmulțirea",
                    "continut": "3 × (−4) = −12."
                },
                {
                    "numar": 2,
                    "titlu": "Înlocuim în expresie",
                    "continut": "2 − (−12) + 5 = 2 + 12 + 5."
                },
                {
                    "numar": 3,
                    "titlu": "Finalizăm calculul",
                    "continut": "2 + 12 + 5 = 19."
                }
            ],
            "explicatieFinala": "Respectând ordinea operațiilor obținem 19.",
            "punctaj": 1,
            "competenta": "Respectarea ordinii operațiilor."
        },
        {
            "id": "m1-nr-ex-6",
            "nivel": "avansat",
            "tip": "rezolvare-completa",
            "enunt": "Explică de ce numărul √9 este rațional, deși este scris folosind un radical.",
            "raspunsCorect": "√9 = 3, iar 3 = 3/1, deci este rațional.",
            "rezolvare": [
                {
                    "numar": 1,
                    "titlu": "Calculăm radicalul",
                    "continut": "√9 = 3."
                },
                {
                    "numar": 2,
                    "titlu": "Aplicăm definiția",
                    "continut": "3 poate fi scris 3/1, raport al două numere întregi cu numitor nenul."
                },
                {
                    "numar": 3,
                    "titlu": "Concluzionăm",
                    "continut": "Prin urmare √9 este număr rațional."
                }
            ],
            "explicatieFinala": "Prezența simbolului radical nu înseamnă automat că numărul este irațional.",
            "punctaj": 2,
            "competenta": "Argumentarea clasificării unui număr."
        }
    ],
    "rezumat": {
        "ideiDeRetinut": [
            "N ⊂ Z ⊂ Q ⊂ R.",
            "Un număr rațional se poate scrie sub forma a/b, cu a și b întregi și b ≠ 0.",
            "Zecimalele finite și periodice sunt raționale.",
            "Numerele iraționale sunt reale, dar nu sunt raționale.",
            "Un radical trebuie simplificat înainte de clasificare.",
            "În calcule trebuie respectată ordinea operațiilor."
        ],
        "formuleDeRetinut": [
            "N ⊂ Z ⊂ Q ⊂ R",
            "x = a/b, a,b ∈ Z, b ≠ 0"
        ],
        "checklistElev": [
            "Pot diferenția N, Z, Q și R.",
            "Pot clasifica un număr în mulțimile numerice potrivite.",
            "Pot diferenția un număr rațional de unul irațional.",
            "Pot recunoaște o zecimală finită sau periodică drept număr rațional.",
            "Pot simplifica un radical simplu înainte de clasificare.",
            "Pot respecta ordinea operațiilor într-un calcul."
        ]
    },
    "legaturaCuBac": {
        "importanta": "Mulțimile numerice și calculele cu numere reale reprezintă baza pentru aproape toate capitolele ulterioare de algebră și analiză. Clasificarea corectă, lucrul cu fracții, radicali și semne sunt competențe necesare în numeroase exerciții de Bacalaureat.",
        "tipuriCerinte": [
            "Clasificarea unui număr.",
            "Simplificarea expresiilor numerice.",
            "Calcule cu fracții și radicali.",
            "Folosirea proprietăților numerelor reale.",
            "Respectarea ordinii operațiilor."
        ],
        "strategie": [
            "Simplifică expresia înainte să clasifici numărul.",
            "Identifică cea mai mică mulțime numerică potrivită.",
            "Folosește relațiile de incluziune.",
            "Respectă ordinea operațiilor.",
            "Verifică semnele și simplifică rezultatul final."
        ]
    },
    "surse": [
        {
            "tip": "programa-oficiala",
            "titlu": "Programa de examen pentru disciplina Matematică — Bacalaureat, profil M_mate-info",
            "observatie": "Încadrarea exactă și formulările trebuie confirmate în etapa dedicată verificării programei."
        },
        {
            "tip": "verificare-interna",
            "titlu": "BAC MATE — Content Engine V1",
            "observatie": "Conținut pilot generat controlat și menținut în verificare până la validarea matematică, curriculară, lingvistică și a exercițiilor."
        }
    ],
    "verificare": {
        "status": "verificare",
        "verificatMatematic": false,
        "verificatPrograma": false,
        "verificatExercitii": false,
        "verificatLimbaRomana": false,
        "observatii": [
            "Lecție pilot pentru BAC MATE Content Generator V1.",
            "Generarea nu reprezintă aprobare matematică sau curriculară.",
            "Validatorul structural este rulat automat după generare.",
            "Lecția nu poate fi considerată publicabilă până când toate cele patru verificări nu sunt confirmate."
        ]
    }
};
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

//# sourceMappingURL=_023n8x9._.js.map