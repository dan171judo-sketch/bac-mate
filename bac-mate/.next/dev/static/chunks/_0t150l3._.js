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
    const rezultatContentEngine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["obtineContinutLectie"])({
        slug: lectie.slug,
        modul: lectie.modul,
        numarLectie: lectie.numarLectie
    });
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
    const exercitiu = lectie.exercitii[exercitiuCurent];
    const esteUltimul = exercitiuCurent === lectie.exercitii.length - 1;
    const corect = raspuns === exercitiu?.corect;
    const xpMaxim = lectie.exercitii.length * 10;
    /*
    XP determinist pe exercițiu.

    Exercițiul 0 -> țintă 10 XP
    Exercițiul 1 -> țintă 20 XP
    Exercițiul 2 -> țintă 30 XP

    Dacă elevul repetă un exercițiu deja creditat,
    XP-ul nu mai crește.
  */ const xpTintaExercitiu = Math.min((exercitiuCurent + 1) * 10, xpMaxim);
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
        if (raspuns === exercitiu.corect) {
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
        if (exercitiuCurent >= lectie.exercitii.length - 1) {
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
                    lineNumber: 448,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 447,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LectieUniversala.tsx",
            lineNumber: 446,
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
                            lineNumber: 461,
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
                                    lineNumber: 473,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 468,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400",
                            children: lectie.profil
                        }, void 0, false, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 478,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LectieUniversala.tsx",
                    lineNumber: 460,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 459,
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
                                        lineNumber: 490,
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
                                        lineNumber: 494,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400",
                                        children: lectie.clasa
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 499,
                                        columnNumber: 13
                                    }, this),
                                    continutDetaliat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `rounded-full px-3 py-1 text-sm font-bold ${rezultatContentEngine.publicabil ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-300"}`,
                                        children: rezultatContentEngine.publicabil ? "✓ Conținut verificat" : `⚠ Conținut ${continutDetaliat.verificare.status}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 504,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-5 text-4xl font-black leading-tight md:text-5xl",
                                children: continutDetaliat ? continutDetaliat.titlu : lectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 518,
                                columnNumber: 11
                            }, this),
                            continutDetaliat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-3xl text-xl font-semibold leading-8 text-blue-300",
                                children: continutDetaliat.subtitlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 525,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 max-w-3xl text-lg leading-8 text-slate-300",
                                children: continutDetaliat ? continutDetaliat.descriere : lectie.descriere
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 532,
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
                                        lineNumber: 540,
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
                                        lineNumber: 548,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 539,
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
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 559,
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
                                lineNumber: 572,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 488,
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
                                        lineNumber: 586,
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
                                                        lineNumber: 600,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-200",
                                                        children: obiectiv
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${obiectiv}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 596,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 590,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 585,
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
                                                        lineNumber: 618,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-2 text-3xl font-black md:text-4xl",
                                                        children: "Învață în bucăți scurte"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 622,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-3 max-w-2xl leading-7 text-slate-400",
                                                        children: "Urmărește câte o explicație, apoi verifică imediat dacă ai înțeles."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 626,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 617,
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
                                                lineNumber: 633,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 616,
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
                                                                lineNumber: 665,
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
                                                                lineNumber: 670,
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
                                                                    lineNumber: 680,
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
                                                                            lineNumber: 689,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "mt-7 text-2xl font-black md:text-3xl",
                                                                            children: video.titlu
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 703,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-4 leading-7 text-slate-400",
                                                                            children: video.descriere
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 709,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-5 text-sm font-bold text-slate-600",
                                                                            children: "Videoclipul BAC MATE va fi integrat aici."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 715,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/LectieUniversala.tsx",
                                                                    lineNumber: 688,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 678,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 664,
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
                                                                        lineNumber: 736,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-xl font-black",
                                                                        children: "Verifică ce ai înțeles"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 740,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 735,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl text-slate-400",
                                                                children: deschis ? "−" : "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 746,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 726,
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
                                                                        lineNumber: 759,
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
                                                                                        lineNumber: 774,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-3 leading-7 text-slate-200",
                                                                                        children: idee
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 778,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, `${idee}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 770,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 764,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 758,
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
                                                                        lineNumber: 792,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-4 text-lg font-black leading-8",
                                                                        children: video.exemplu.enunt
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 801,
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
                                                                                        lineNumber: 819,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "leading-7 text-slate-300",
                                                                                        children: pas
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 825,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, `${pas}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 815,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 809,
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
                                                                                lineNumber: 836,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-bold",
                                                                                children: video.exemplu.raspuns
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 840,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 835,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 791,
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
                                                                        lineNumber: 854,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "mt-4 text-xl font-black leading-8",
                                                                        children: intrebare.intrebare
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 859,
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
                                                                                        lineNumber: 916,
                                                                                        columnNumber: 43
                                                                                    }, this),
                                                                                    varianta
                                                                                ]
                                                                            }, `${varianta}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 903,
                                                                                columnNumber: 41
                                                                            }, this);
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 865,
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
                                                                        lineNumber: 934,
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
                                                                                lineNumber: 964,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-2 leading-7 text-slate-300",
                                                                                children: intrebare.explicatie
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 976,
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
                                                                                lineNumber: 983,
                                                                                columnNumber: 39
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 957,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 853,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, video.id, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 658,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 642,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 615,
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
                                        lineNumber: 1016,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Nu ai înțeles ceva?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1020,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 max-w-3xl leading-7 text-slate-300",
                                        children: "Profesorul AI va putea să îți explice exact partea la care te-ai blocat, fără să fie nevoie să recitești toată lecția."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1024,
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
                                                lineNumber: 1034,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                                children: "🧩 Dă-mi alt exemplu"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1042,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                                children: "🎯 Testează-mă"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1050,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1033,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-xs text-violet-300/60",
                                        children: "Profesorul AI va fi conectat într-o etapă ulterioară."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1058,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1015,
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
                                                        lineNumber: 1079,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-2 text-2xl font-black",
                                                        children: "Vrei explicația completă?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1084,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-slate-400",
                                                        children: "Definiții, teorie, formule, exemple rezolvate și greșeli frecvente."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1089,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1078,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl text-slate-400",
                                                children: teorieCompletaDeschisa ? "−" : "+"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1097,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1068,
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
                                                        lineNumber: 1110,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 flex flex-wrap gap-2",
                                                        children: continutDetaliat.termeniCheie.map((termen)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded-full bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300",
                                                                children: termen
                                                            }, termen, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1117,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1109,
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
                                                        lineNumber: 1131,
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
                                                                        lineNumber: 1145,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: definitie.definitie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1151,
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
                                                                        lineNumber: 1158,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, `${definitie.termen}-${index}`, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1141,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1135,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1130,
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
                                                        lineNumber: 1174,
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
                                                                        lineNumber: 1187,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: sectiune.explicatie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1193,
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
                                                                                lineNumber: 1205,
                                                                                columnNumber: 35
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1199,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, sectiune.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1181,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1178,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1173,
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
                                                        lineNumber: 1226,
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
                                                                        lineNumber: 1239,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-4 rounded-xl bg-slate-950 p-4 text-center text-xl font-black",
                                                                        children: formula.formula
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1245,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-4 leading-7 text-slate-300",
                                                                        children: formula.explicatie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1251,
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
                                                                        lineNumber: 1258,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, formula.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1233,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1230,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1225,
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
                                                        lineNumber: 1274,
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
                                                                                        lineNumber: 1304,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-2 text-sm leading-6 text-slate-400",
                                                                                        children: exemplu.enunt
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1310,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1303,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xl text-slate-400",
                                                                                children: deschis ? "−" : "+"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1317,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1292,
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
                                                                                                lineNumber: 1337,
                                                                                                columnNumber: 43
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "font-black",
                                                                                                        children: pas.titlu
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                        lineNumber: 1345,
                                                                                                        columnNumber: 45
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "mt-2 leading-7 text-slate-300",
                                                                                                        children: pas.continut
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                        lineNumber: 1351,
                                                                                                        columnNumber: 45
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                lineNumber: 1344,
                                                                                                columnNumber: 43
                                                                                            }, this)
                                                                                        ]
                                                                                    }, pas.numar, true, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1331,
                                                                                        columnNumber: 41
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1326,
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
                                                                                        lineNumber: 1363,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    exemplu.raspunsFinal
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1362,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1325,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, exemplu.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1286,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1278,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1273,
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
                                                        lineNumber: 1383,
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
                                                                        lineNumber: 1399,
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
                                                                                lineNumber: 1407,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            greseala.deCeEsteGresit
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1406,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-emerald-300",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Cum o eviți:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1416,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            greseala.cumOEviti
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1415,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, index, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1393,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1387,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1382,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1105,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1067,
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
                                        lineNumber: 1435,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Ce trebuie să reții"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1440,
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
                                                        lineNumber: 1454,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-300",
                                                        children: idee
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1458,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${idee}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1450,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1444,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex flex-wrap gap-3",
                                        children: continutDetaliat.rezumat.formuleDeRetinut.map((formula)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-xl bg-slate-950 px-4 py-3 font-black",
                                                children: formula
                                            }, formula, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1469,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1466,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1434,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 582,
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
                                        lineNumber: 1487,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Ce vei ști să faci"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1491,
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
                                                        lineNumber: 1505,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-3 font-black",
                                                        children: obiectiv.titlu
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1511,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-sm leading-6 text-slate-400",
                                                        children: obiectiv.descriere
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1517,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${obiectiv.titlu}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1501,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1495,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1486,
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
                                        lineNumber: 1529,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-2 text-3xl font-black",
                                        children: "Învață pas cu pas"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1533,
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
                                                                lineNumber: 1552,
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
                                                                lineNumber: 1559,
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
                                                                        lineNumber: 1567,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "mt-6 text-2xl font-black",
                                                                        children: video.titlu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1581,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-400",
                                                                        children: video.descriere
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1587,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1566,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1551,
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
                                                                                lineNumber: 1607,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: idee
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1611,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, `${idee}-${index}`, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1603,
                                                                        columnNumber: 35
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1597,
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
                                                                        lineNumber: 1622,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: video.exemplu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1628,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1621,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1596,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, video.numar, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1545,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1537,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1528,
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
                                        lineNumber: 1644,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: lectie.fisaRapida.titlu
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1648,
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
                                                        lineNumber: 1665,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-300",
                                                        children: rand
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1669,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${rand}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1661,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1655,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1643,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1483,
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
                                                lineNumber: 1686,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "mt-2 text-3xl font-black",
                                                children: "Verifică dacă ai înțeles"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1690,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-slate-400",
                                                children: [
                                                    lectie.exercitii.length,
                                                    " ",
                                                    "întrebări • maximum",
                                                    " ",
                                                    xpMaxim,
                                                    " XP"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1695,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1685,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl bg-slate-950 px-4 py-3 font-black",
                                        children: [
                                            exercitiuCurent + 1,
                                            "/",
                                            lectie.exercitii.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1705,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1684,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 h-2 overflow-hidden rounded-full bg-slate-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-blue-500",
                                    style: {
                                        width: `${(exercitiuCurent + 1) / lectie.exercitii.length * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/LectieUniversala.tsx",
                                    lineNumber: 1717,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1716,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-8 text-xl font-black md:text-2xl",
                                children: exercitiu.intrebare
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1731,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                lineNumber: 1788,
                                                columnNumber: 23
                                            }, this),
                                            varianta
                                        ]
                                    }, `${varianta}-${index}`, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1775,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1737,
                                columnNumber: 13
                            }, this),
                            !verificat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: verificaRaspunsul,
                                disabled: raspuns === null,
                                className: `mt-6 rounded-xl px-6 py-3 font-black ${raspuns !== null ? "bg-blue-600 hover:bg-blue-500" : "cursor-not-allowed bg-slate-800 text-slate-500"}`,
                                children: "Verifică răspunsul"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1804,
                                columnNumber: 15
                            }, this),
                            verificat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-6 rounded-2xl p-6 ${corect ? "bg-emerald-500/10" : "bg-red-500/10"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-lg font-black ${corect ? "text-emerald-400" : "text-red-400"}`,
                                        children: corect ? xpAcordatLaUltimaVerificare ? "✓ Corect! Ai câștigat 10 XP." : "✓ Corect! Exercițiul era deja creditat." : "Nu este răspunsul corect."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1831,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 leading-7 text-slate-300",
                                        children: exercitiu.explicatie
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1845,
                                        columnNumber: 17
                                    }, this),
                                    corect && salvareCloud === "salvare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-blue-400",
                                        children: "☁️ Se salvează progresul..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1854,
                                        columnNumber: 21
                                    }, this),
                                    corect && salvareCloud === "salvat" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-emerald-400",
                                        children: "✓ Progres salvat în cont"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1863,
                                        columnNumber: 21
                                    }, this),
                                    corect && salvareCloud === "eroare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-amber-400",
                                        children: "⚠️ Progresul nu a putut fi salvat momentan în cont."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1872,
                                        columnNumber: 21
                                    }, this),
                                    corect && !esteUltimul && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: urmatorulExercitiu,
                                        className: "mt-5 rounded-xl bg-blue-600 px-5 py-3 font-black",
                                        children: "Următorul exercițiu →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1881,
                                        columnNumber: 21
                                    }, this),
                                    !corect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: incearcaDinNou,
                                        className: "mt-5 rounded-xl border border-slate-700 px-5 py-3 font-black",
                                        children: "Încearcă din nou"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1894,
                                        columnNumber: 19
                                    }, this),
                                    corect && esteUltimul && lectieFinalizata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 rounded-2xl bg-slate-950 p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-black",
                                                children: "🎉 Lecție finalizată"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1909,
                                                columnNumber: 23
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
                                                        lineNumber: 1916,
                                                        columnNumber: 25
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1914,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 flex flex-col gap-3 sm:flex-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "/programa",
                                                        className: "rounded-xl bg-blue-600 px-5 py-3 text-center font-black",
                                                        children: "Continuă traseul →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1926,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "/dashboard",
                                                        className: "rounded-xl border border-slate-700 px-5 py-3 text-center font-black",
                                                        children: "Dashboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1934,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1925,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1908,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1824,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex items-center justify-between border-t border-slate-800 pt-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-500",
                                        children: "XP în această lecție"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1947,
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
                                        lineNumber: 1951,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1946,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1683,
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
                                lineNumber: 1962,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-xl font-black",
                                children: lectie.urmatoareaLectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1966,
                                columnNumber: 13
                            }, this),
                            lectie.urmatoareaLectie.href && lectieFinalizata ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: lectie.urmatoareaLectie.href,
                                className: "mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-black",
                                children: "Continuă →"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1978,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm font-bold text-slate-600",
                                children: "🔒 Finalizează această lecție pentru a continua"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1989,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1961,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LectieUniversala.tsx",
        lineNumber: 458,
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
    "obtineContinutLectie",
    ()=>obtineContinutLectie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/continut/lectii/m5-vectori-in-plan.ts [app-client] (ecmascript)");
;
const registruContinut = [
    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutVectoriInPlan"]
];
function estePublicabil(continut) {
    const verificare = continut.verificare;
    return verificare.status === "publicabil" && verificare.verificatMatematic === true && verificare.verificatPrograma === true && verificare.verificatExercitii === true && verificare.verificatLimbaRomana === true;
}
function obtineContinutLectie(criterii) {
    const continut = registruContinut.find((lectie)=>{
        const acelasiSlug = lectie.slug === criterii.slug;
        const acelasiModul = criterii.modul === undefined || lectie.modul === criterii.modul;
        const acelasiNumar = criterii.numarLectie === undefined || lectie.numarLectie === criterii.numarLectie;
        return acelasiSlug && acelasiModul && acelasiNumar;
    }) ?? null;
    if (!continut) {
        return {
            continut: null,
            gasit: false,
            publicabil: false
        };
    }
    return {
        continut,
        gasit: true,
        publicabil: estePublicabil(continut)
    };
}
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
                "Pentru un vector ne interesează trei caracteristici principale: direcția, sensul și modulul.",
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
                "Știm că pentru fiecare vector analizăm direcția, sensul și modulul.",
                "Aceste trei caracteristici ne permit să stabilim dacă doi vectori sunt egali sau dacă sunt opuși.",
                "Începem cu vectorii egali.",
                "Doi vectori sunt egali dacă au aceeași direcție, același sens și același modul.",
                "Toate cele trei condiții trebuie să fie îndeplinite simultan.",
                "Dacă lipsește chiar și una dintre ele, vectorii nu mai sunt egali.",
                "Un lucru foarte important este că vectorii egali nu trebuie să fie desenați în același loc.",
                "De exemplu, putem avea un vector desenat în partea stângă a foii și alt vector desenat în partea dreaptă.",
                "Dacă au aceeași direcție, același sens și aceeași lungime, cei doi vectori sunt egali.",
                "Poziția lor efectivă în plan nu schimbă această concluzie.",
                "Imaginează-ți două săgeți orizontale, ambele orientate spre dreapta și ambele având lungimea 4 centimetri.",
                "Chiar dacă una este desenată mai sus și cealaltă mai jos, ele reprezintă vectori egali.",
                "Acum să vedem vectorii opuși.",
                "Doi vectori sunt opuși dacă au aceeași direcție, același modul, dar sensuri opuse.",
                "Așadar, față de cazul vectorilor egali se schimbă o singură caracteristică: sensul.",
                "Un exemplu fundamental este format de vectorii AB și BA.",
                "Ei se află pe aceeași dreaptă, deci au aceeași direcție.",
                "Lungimea segmentului AB este egală cu lungimea segmentului BA, deci au același modul.",
                "Dar AB este orientat de la A spre B, iar BA de la B spre A.",
                "Prin urmare, sensurile sunt opuse.",
                "Concluzia este că vectorul BA este opusul vectorului AB.",
                "În notație matematică putem scrie că BA este egal cu minus AB, în sens vectorial.",
                "Acest minus nu înseamnă că lungimea vectorului a devenit negativă.",
                "Modulul rămâne un număr nenegativ.",
                "Semnul minus indică faptul că vectorul are sensul opus.",
                "Este o distincție foarte importantă.",
                "Când compari doi vectori într-un exercițiu, folosește o metodă fixă.",
                "Pasul unu: compară direcțiile.",
                "Pasul doi: compară sensurile.",
                "Pasul trei: compară modulele.",
                "Dacă toate trei coincid, vectorii sunt egali.",
                "Dacă direcția și modulul coincid, dar sensurile sunt opuse, vectorii sunt opuși.",
                "Dacă direcțiile sunt diferite, nu putem vorbi nici despre vectori egali, nici despre vectori opuși în sensul acestor definiții.",
                "Această metodă te ajută să nu te bazezi doar pe aspectul desenului.",
                "Într-o problemă de geometrie, desenul poate să nu fie realizat la scară.",
                "Definițiile sunt cele care decid relația dintre vectori.",
                "Reține propoziția-cheie: egal înseamnă aceeași direcție, același sens și același modul; opus înseamnă aceeași direcție, modul egal și sens opus."
            ],
            ideiDeRetinut: [
                "Vectori egali: aceeași direcție, același sens și același modul.",
                "Vectori opuși: aceeași direcție, același modul și sensuri opuse.",
                "Poziția în plan nu este un criteriu pentru egalitatea vectorilor."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "Vectorii u și v au aceeași direcție, același sens și module egale. Ce putem spune?",
                rezolvareScurta: [
                    "Direcțiile sunt aceleași.",
                    "Sensurile sunt aceleași.",
                    "Modulele sunt egale.",
                    "Sunt îndeplinite toate condițiile pentru egalitatea vectorilor."
                ],
                raspuns: "u = v."
            },
            verificareRapida: {
                intrebare: "Doi vectori au aceeași direcție și același modul, dar sensuri opuse. Ei sunt:",
                variante: [
                    "egali",
                    "opuși",
                    "vectori nuli",
                    "perpendiculari"
                ],
                raspunsCorect: 1,
                explicatie: "Vectorii opuși au aceeași direcție și același modul, dar sensuri opuse."
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
                "Până acum am discutat despre vectori determinați de două puncte care pot fi distincte.",
                "Dar ce se întâmplă dacă originea și extremitatea sunt același punct?",
                "Să luăm, de exemplu, vectorul AA.",
                "Originea este A, iar extremitatea este tot A.",
                "Segmentul AA are lungimea zero.",
                "Prin urmare, modulul vectorului AA este zero.",
                "Un astfel de vector se numește vector nul.",
                "Vectorul nul se notează de obicei cu zero vectorial, adică zero cu săgeată.",
                "Orice vector care are aceeași origine și aceeași extremitate este un vector nul.",
                "De exemplu, AA, BB, MM sau PP reprezintă vectorul nul.",
                "Toți au modulul zero.",
                "Vectorul nul este un caz special și apare frecvent în calculele vectoriale pe care le vei învăța mai târziu.",
                "Acum recapitulăm și cele mai frecvente greșeli.",
                "Prima greșeală este să considerăm că vectorul AB este egal cu vectorul BA.",
                "Dacă A și B sunt distincte, această afirmație este falsă.",
                "Vectorii au aceeași direcție și același modul, dar sensuri opuse.",
                "Așadar, BA este opusul lui AB.",
                "A doua greșeală este să confundăm vectorul cu modulul său.",
                "Vectorul AB nu este același obiect matematic cu modulul vectorului AB.",
                "Vectorul are direcție, sens și modul.",
                "Modulul reprezintă doar lungimea.",
                "De aceea modulul este un număr nenegativ.",
                "A treia greșeală este să credem că doi vectori pot fi egali doar dacă pornesc din același punct.",
                "Aceasta este fals.",
                "Originea geometrică exactă în desen nu este criteriul pentru egalitatea vectorilor.",
                "Contează direcția, sensul și modulul.",
                "A patra greșeală este să confundăm direcția cu sensul.",
                "Două săgeți orientate una spre dreapta și una spre stânga pe două drepte orizontale au aceeași direcție, dar sensuri opuse.",
                "Direcția descrie familia de drepte paralele.",
                "Sensul descrie una dintre cele două orientări posibile pe acea direcție.",
                "Hai să facem o recapitulare completă.",
                "Un vector este reprezentat printr-un segment orientat.",
                "Prima literă este originea, iar a doua este extremitatea.",
                "Pentru a caracteriza un vector folosim direcția, sensul și modulul.",
                "Doi vectori egali au aceeași direcție, același sens și același modul.",
                "Doi vectori opuși au aceeași direcție și același modul, dar sensuri opuse.",
                "Vectorul nul are originea și extremitatea în același punct și modulul egal cu zero.",
                "Dacă reții aceste reguli și le verifici sistematic, ai baza necesară pentru lecțiile următoare despre operații cu vectori."
            ],
            ideiDeRetinut: [
                "Dacă originea și extremitatea coincid, obținem vectorul nul.",
                "Modulul vectorului nul este 0.",
                "Vectorul, modulul, direcția și sensul sunt noțiuni diferite."
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
            definitie: "Direcția unui vector este dată de dreapta suport a segmentului orientat sau de orice dreaptă paralelă cu aceasta."
        },
        {
            termen: "Sensul vectorului",
            definitie: "Sensul indică una dintre cele două orientări posibile pe direcția vectorului."
        },
        {
            termen: "Modulul vectorului",
            definitie: "Modulul unui vector este lungimea segmentului orientat care îl reprezintă.",
            observatie: "Pentru vectorul →AB, modulul se notează |→AB| și este egal cu lungimea segmentului AB."
        },
        {
            termen: "Vectori egali",
            definitie: "Doi vectori sunt egali dacă au aceeași direcție, același sens și același modul."
        },
        {
            termen: "Vectorul nul",
            definitie: "Vectorul nul are originea și extremitatea în același punct și are modulul egal cu 0."
        },
        {
            termen: "Vectorul opus",
            definitie: "Vectorul opus unui vector are aceeași direcție și același modul, dar sens opus."
        }
    ],
    teorie: [
        {
            id: "m5-vp-teorie-1",
            titlu: "Segment orientat și notația vectorului",
            explicatie: "Un vector poate fi reprezentat printr-un segment orientat. În notația →AB, A reprezintă originea, iar B reprezintă extremitatea. Ordinea punctelor este esențială deoarece schimbarea lor inversează sensul.",
            ideiCheie: [
                "→AB pornește din A și ajunge în B.",
                "→BA pornește din B și ajunge în A.",
                "Pentru A și B distincte, →AB și →BA au sensuri opuse."
            ]
        },
        {
            id: "m5-vp-teorie-2",
            titlu: "Direcție, sens și modul",
            explicatie: "Pentru caracterizarea unui vector analizăm direcția, sensul și modulul. Aceste noțiuni trebuie tratate separat.",
            ideiCheie: [
                "Direcția este dată de dreapta suport sau de o dreaptă paralelă cu aceasta.",
                "Sensul arată orientarea pe direcția respectivă.",
                "Modulul reprezintă lungimea vectorului și este nenegativ."
            ]
        },
        {
            id: "m5-vp-teorie-3",
            titlu: "Vectori egali",
            explicatie: "Doi vectori sunt egali atunci când au aceeași direcție, același sens și același modul.",
            ideiCheie: [
                "Cele trei condiții trebuie verificate simultan.",
                "Vectorii pot avea origini diferite și totuși pot fi egali.",
                "Poziția lor în desen nu determină egalitatea."
            ]
        },
        {
            id: "m5-vp-teorie-4",
            titlu: "Vectori opuși",
            explicatie: "Doi vectori sunt opuși dacă au aceeași direcție și același modul, dar sensuri opuse.",
            ideiCheie: [
                "Pentru A și B distincte, →AB și →BA sunt vectori opuși.",
                "Opusul vectorului v se notează −v.",
                "Semnul minus indică sensul opus, nu un modul negativ."
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
            enunt: "Vectorii u și v au aceeași direcție, același sens și modulele |u| = 7 și |v| = 7. Ce relație există între ei?",
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
                    continut: "Sunt îndeplinite simultan toate cele trei condiții pentru egalitatea vectorilor."
                }
            ],
            raspunsFinal: "u = v.",
            verificare: "Aceeași direcție + același sens + același modul = vectori egali."
        },
        {
            id: "m5-vp-exemplu-4",
            titlu: "Aceeași direcție nu înseamnă automat vectori egali",
            enunt: "Vectorii u și v au aceeași direcție și același sens, dar |u| = 4 și |v| = 6. Sunt vectorii egali?",
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
            deCeEsteGresit: "Vectorul are direcție, sens și modul, în timp ce modulul este doar lungimea vectorului și este un număr nenegativ.",
            cumOEviti: "Separă notațiile: →AB reprezintă vectorul, iar |→AB| reprezintă modulul său."
        },
        {
            greseala: "Elevul confundă direcția cu sensul.",
            deCeEsteGresit: "Doi vectori pot avea aceeași direcție și totuși să aibă sensuri opuse.",
            cumOEviti: "Gândește direcția ca pe orientarea dreptei suport, iar sensul ca pe partea spre care indică săgeata."
        },
        {
            greseala: "Elevul crede că doi vectori trebuie să aibă aceeași origine pentru a fi egali.",
            deCeEsteGresit: "Egalitatea vectorilor depinde de direcție, sens și modul, nu de poziția lor în desen.",
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
            enunt: "Doi vectori au aceeași direcție și același modul, dar sensuri opuse. Ei sunt:",
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
                    continut: "Acestea sunt exact condițiile pentru doi vectori opuși."
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
            enunt: "Vectorii u și v au aceeași direcție, același sens, |u| = 5 și |v| = 7. Care afirmație este corectă?",
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
            enunt: "Vectorii u și v au aceeași direcție și module egale. Precizează ce informație suplimentară este necesară pentru a decide dacă u = v sau u = −v.",
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
            "Un vector este caracterizat prin direcție, sens și modul.",
            "Modulul unui vector reprezintă lungimea sa și este nenegativ.",
            "Doi vectori egali au aceeași direcție, același sens și același modul.",
            "Doi vectori opuși au aceeași direcție și același modul, dar sensuri opuse.",
            "Vectorul nul are originea și extremitatea în același punct și modulul 0."
        ],
        formuleDeRetinut: [
            "|→AB| = AB",
            "→BA = −→AB",
            "|→0| = 0"
        ],
        checklistElev: [
            "Pot identifica originea și extremitatea unui vector.",
            "Pot explica diferența dintre direcție și sens.",
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
            "Compararea direcției, sensului și modulului unor vectori.",
            "Recunoașterea vectorilor egali sau opuși.",
            "Determinarea modulului unui vector.",
            "Identificarea vectorului nul.",
            "Justificarea unor relații vectoriale elementare."
        ],
        strategie: [
            "Identifică originea și extremitatea din ordinea literelor.",
            "Compară separat direcția.",
            "Compară separat sensul.",
            "Compară modulele.",
            "Aplică definiția corespunzătoare numai după ce ai verificat toate caracteristicile."
        ]
    },
    surse: [
        {
            tip: "programa-oficiala",
            titlu: "Programa de examen pentru disciplina Matematică — Bacalaureat, profil M_mate-info",
            observatie: "Încadrarea exactă în programa oficială trebuie confirmată în etapa dedicată verificării de programă înainte de publicare."
        },
        {
            tip: "verificare-interna",
            titlu: "BAC MATE — verificare pedagogică și matematică",
            observatie: "Conținutul rămâne în verificare până la validarea matematică, curriculară, lingvistică și a exercițiilor."
        }
    ],
    verificare: {
        status: "verificare",
        verificatMatematic: false,
        verificatPrograma: false,
        verificatExercitii: false,
        verificatLimbaRomana: false,
        observatii: [
            "Lecție-etalon pentru BAC MATE Content Engine V1.",
            "Structura pedagogică este organizată pentru învățare progresivă: concept, caracteristici, comparație, recapitulare și capcane.",
            "Cele patru scenarii video au fost extinse astfel încât să poată constitui baza unor mini-lecții reale, nu doar texte demonstrative.",
            "Exercițiile acoperă nivelurile fundament, standard-bac și avansat.",
            "Conținutul nu se marchează publicabil înainte de verificarea matematică, verificarea programei, verificarea exercițiilor și verificarea limbii române.",
            "După validarea acestei lecții, structura poate fi folosită drept șablon pentru generarea controlată a celorlalte lecții BAC MATE."
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

//# sourceMappingURL=_0t150l3._.js.map