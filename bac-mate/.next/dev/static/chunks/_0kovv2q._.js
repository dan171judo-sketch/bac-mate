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
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/continut/lectii/m5-vectori-in-plan.ts [app-client] (ecmascript)");
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
    const continutDetaliat = lectie.slug === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutVectoriInPlan"].slug ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$continut$2f$lectii$2f$m5$2d$vectori$2d$in$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continutVectoriInPlan"] : null;
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
                    lineNumber: 444,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 443,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LectieUniversala.tsx",
            lineNumber: 442,
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
                            lineNumber: 457,
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
                                    lineNumber: 469,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 464,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400",
                            children: lectie.profil
                        }, void 0, false, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 474,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LectieUniversala.tsx",
                    lineNumber: 456,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 455,
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
                                        lineNumber: 486,
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
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400",
                                        children: lectie.clasa
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 495,
                                        columnNumber: 13
                                    }, this),
                                    continutDetaliat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-400",
                                        children: "✓ Lecție BAC MATE"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 500,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 485,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-5 text-4xl font-black leading-tight md:text-5xl",
                                children: continutDetaliat ? continutDetaliat.titlu : lectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this),
                            continutDetaliat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-3xl text-xl font-semibold leading-8 text-blue-300",
                                children: continutDetaliat.subtitlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 max-w-3xl text-lg leading-8 text-slate-300",
                                children: continutDetaliat ? continutDetaliat.descriere : lectie.descriere
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 520,
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
                                        lineNumber: 528,
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
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 527,
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
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 547,
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
                                lineNumber: 560,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 484,
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
                                        lineNumber: 574,
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
                                                        lineNumber: 588,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-200",
                                                        children: obiectiv
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 592,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${obiectiv}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 584,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 578,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 573,
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
                                                        lineNumber: 606,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-2 text-3xl font-black md:text-4xl",
                                                        children: "Învață în bucăți scurte"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-3 max-w-2xl leading-7 text-slate-400",
                                                        children: "Urmărește câte o explicație, apoi verifică imediat dacă ai înțeles."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 614,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 605,
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
                                                lineNumber: 621,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 604,
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
                                                                lineNumber: 653,
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
                                                                lineNumber: 658,
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
                                                                    lineNumber: 668,
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
                                                                            lineNumber: 677,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "mt-7 text-2xl font-black md:text-3xl",
                                                                            children: video.titlu
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 691,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-4 leading-7 text-slate-400",
                                                                            children: video.descriere
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 697,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-5 text-sm font-bold text-slate-600",
                                                                            children: "Videoclipul BAC MATE va fi integrat aici."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/LectieUniversala.tsx",
                                                                            lineNumber: 703,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/LectieUniversala.tsx",
                                                                    lineNumber: 676,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 666,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 652,
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
                                                                        lineNumber: 724,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-xl font-black",
                                                                        children: "Verifică ce ai înțeles"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 728,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl text-slate-400",
                                                                children: deschis ? "−" : "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 734,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 714,
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
                                                                        lineNumber: 747,
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
                                                                                        lineNumber: 762,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-3 leading-7 text-slate-200",
                                                                                        children: idee
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 766,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, `${idee}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 758,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 752,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 746,
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
                                                                        lineNumber: 780,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-4 text-lg font-black leading-8",
                                                                        children: video.exemplu.enunt
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 789,
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
                                                                                        lineNumber: 807,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "leading-7 text-slate-300",
                                                                                        children: pas
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 813,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, `${pas}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 803,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 797,
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
                                                                                lineNumber: 824,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-bold",
                                                                                children: video.exemplu.raspuns
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 828,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 823,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 779,
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
                                                                        lineNumber: 842,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "mt-4 text-xl font-black leading-8",
                                                                        children: intrebare.intrebare
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 847,
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
                                                                                        lineNumber: 904,
                                                                                        columnNumber: 43
                                                                                    }, this),
                                                                                    varianta
                                                                                ]
                                                                            }, `${varianta}-${index}`, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 891,
                                                                                columnNumber: 41
                                                                            }, this);
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 853,
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
                                                                        lineNumber: 922,
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
                                                                                lineNumber: 952,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-2 leading-7 text-slate-300",
                                                                                children: intrebare.explicatie
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 964,
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
                                                                                lineNumber: 971,
                                                                                columnNumber: 39
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 945,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 841,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 742,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, video.id, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 646,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 603,
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
                                        lineNumber: 1004,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Nu ai înțeles ceva?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1008,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 max-w-3xl leading-7 text-slate-300",
                                        children: "Profesorul AI va putea să îți explice exact partea la care te-ai blocat, fără să fie nevoie să recitești toată lecția."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1012,
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
                                                lineNumber: 1022,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                                children: "🧩 Dă-mi alt exemplu"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1030,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                                children: "🎯 Testează-mă"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1038,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1021,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-xs text-violet-300/60",
                                        children: "Profesorul AI va fi conectat într-o etapă ulterioară."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1046,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1003,
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
                                                        lineNumber: 1067,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-2 text-2xl font-black",
                                                        children: "Vrei explicația completă?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1072,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-slate-400",
                                                        children: "Definiții, teorie, formule, exemple rezolvate și greșeli frecvente."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1077,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1066,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl text-slate-400",
                                                children: teorieCompletaDeschisa ? "−" : "+"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1085,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1056,
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
                                                        lineNumber: 1098,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 flex flex-wrap gap-2",
                                                        children: continutDetaliat.termeniCheie.map((termen)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded-full bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300",
                                                                children: termen
                                                            }, termen, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1097,
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
                                                        lineNumber: 1119,
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
                                                                        lineNumber: 1133,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: definitie.definitie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1139,
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
                                                                        lineNumber: 1146,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, `${definitie.termen}-${index}`, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1129,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1123,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1118,
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
                                                        lineNumber: 1162,
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
                                                                        lineNumber: 1175,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: sectiune.explicatie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1181,
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
                                                                                lineNumber: 1193,
                                                                                columnNumber: 35
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1187,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, sectiune.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1169,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1166,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1161,
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
                                                        lineNumber: 1214,
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
                                                                        lineNumber: 1227,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-4 rounded-xl bg-slate-950 p-4 text-center text-xl font-black",
                                                                        children: formula.formula
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1233,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-4 leading-7 text-slate-300",
                                                                        children: formula.explicatie
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1239,
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
                                                                        lineNumber: 1246,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, formula.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1221,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1218,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1213,
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
                                                        lineNumber: 1262,
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
                                                                                        lineNumber: 1292,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-2 text-sm leading-6 text-slate-400",
                                                                                        children: exemplu.enunt
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1298,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1291,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xl text-slate-400",
                                                                                children: deschis ? "−" : "+"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1305,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1280,
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
                                                                                                lineNumber: 1325,
                                                                                                columnNumber: 43
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "font-black",
                                                                                                        children: pas.titlu
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                        lineNumber: 1333,
                                                                                                        columnNumber: 45
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "mt-2 leading-7 text-slate-300",
                                                                                                        children: pas.continut
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                        lineNumber: 1339,
                                                                                                        columnNumber: 45
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                                lineNumber: 1332,
                                                                                                columnNumber: 43
                                                                                            }, this)
                                                                                        ]
                                                                                    }, pas.numar, true, {
                                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                                        lineNumber: 1319,
                                                                                        columnNumber: 41
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1314,
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
                                                                                        lineNumber: 1351,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    exemplu.raspunsFinal
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1350,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1313,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, exemplu.id, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1274,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1266,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1261,
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
                                                        lineNumber: 1371,
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
                                                                        lineNumber: 1387,
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
                                                                                lineNumber: 1395,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            greseala.deCeEsteGresit
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1394,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-emerald-300",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Cum o eviți:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1404,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            " ",
                                                                            greseala.cumOEviti
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1403,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, index, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1381,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1375,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1370,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1093,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1055,
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
                                        lineNumber: 1423,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Ce trebuie să reții"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1428,
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
                                                        lineNumber: 1442,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-300",
                                                        children: idee
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1446,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${idee}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1438,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1432,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex flex-wrap gap-3",
                                        children: continutDetaliat.rezumat.formuleDeRetinut.map((formula)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-xl bg-slate-950 px-4 py-3 font-black",
                                                children: formula
                                            }, formula, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1457,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1454,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1422,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 570,
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
                                        lineNumber: 1475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: "Ce vei ști să faci"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1479,
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
                                                        lineNumber: 1493,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-3 font-black",
                                                        children: obiectiv.titlu
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1499,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-sm leading-6 text-slate-400",
                                                        children: obiectiv.descriere
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1505,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${obiectiv.titlu}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1489,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1483,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1474,
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
                                        lineNumber: 1517,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-2 text-3xl font-black",
                                        children: "Învață pas cu pas"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1521,
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
                                                                lineNumber: 1540,
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
                                                                lineNumber: 1547,
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
                                                                        lineNumber: 1555,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "mt-6 text-2xl font-black",
                                                                        children: video.titlu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1569,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-400",
                                                                        children: video.descriere
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1575,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1554,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1539,
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
                                                                                lineNumber: 1595,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: idee
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 1599,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, `${idee}-${index}`, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1591,
                                                                        columnNumber: 35
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1585,
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
                                                                        lineNumber: 1610,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: video.exemplu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 1616,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 1609,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1584,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, video.numar, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1533,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1525,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1516,
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
                                        lineNumber: 1632,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-black",
                                        children: lectie.fisaRapida.titlu
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1636,
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
                                                        lineNumber: 1653,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "leading-7 text-slate-300",
                                                        children: rand
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1657,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, `${rand}-${index}`, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1649,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1643,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1631,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1471,
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
                                                lineNumber: 1674,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "mt-2 text-3xl font-black",
                                                children: "Verifică dacă ai înțeles"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1678,
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
                                                lineNumber: 1683,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1673,
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
                                        lineNumber: 1693,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1672,
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
                                    lineNumber: 1705,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1704,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-8 text-xl font-black md:text-2xl",
                                children: exercitiu.intrebare
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1719,
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
                                                lineNumber: 1776,
                                                columnNumber: 23
                                            }, this),
                                            varianta
                                        ]
                                    }, `${varianta}-${index}`, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1763,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1725,
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
                                lineNumber: 1792,
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
                                        lineNumber: 1819,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 leading-7 text-slate-300",
                                        children: exercitiu.explicatie
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1833,
                                        columnNumber: 17
                                    }, this),
                                    corect && salvareCloud === "salvare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-blue-400",
                                        children: "☁️ Se salvează progresul..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1842,
                                        columnNumber: 21
                                    }, this),
                                    corect && salvareCloud === "salvat" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-emerald-400",
                                        children: "✓ Progres salvat în cont"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1851,
                                        columnNumber: 21
                                    }, this),
                                    corect && salvareCloud === "eroare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-amber-400",
                                        children: "⚠️ Progresul nu a putut fi salvat momentan în cont."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1860,
                                        columnNumber: 21
                                    }, this),
                                    corect && !esteUltimul && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: urmatorulExercitiu,
                                        className: "mt-5 rounded-xl bg-blue-600 px-5 py-3 font-black",
                                        children: "Următorul exercițiu →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1869,
                                        columnNumber: 21
                                    }, this),
                                    !corect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: incearcaDinNou,
                                        className: "mt-5 rounded-xl border border-slate-700 px-5 py-3 font-black",
                                        children: "Încearcă din nou"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1882,
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
                                                lineNumber: 1897,
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
                                                        lineNumber: 1904,
                                                        columnNumber: 25
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1902,
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
                                                        lineNumber: 1914,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "/dashboard",
                                                        className: "rounded-xl border border-slate-700 px-5 py-3 text-center font-black",
                                                        children: "Dashboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 1922,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 1913,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 1896,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1812,
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
                                        lineNumber: 1935,
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
                                        lineNumber: 1939,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1934,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1671,
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
                                lineNumber: 1950,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-xl font-black",
                                children: lectie.urmatoareaLectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1954,
                                columnNumber: 13
                            }, this),
                            lectie.urmatoareaLectie.href && lectieFinalizata ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: lectie.urmatoareaLectie.href,
                                className: "mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-black",
                                children: "Continuă →"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1966,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm font-bold text-slate-600",
                                children: "🔒 Finalizează această lecție pentru a continua"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 1977,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 1949,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 480,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LectieUniversala.tsx",
        lineNumber: 454,
        columnNumber: 5
    }, this);
}
_s(LectieUniversala, "yKbFbbfJMk3g5iGQFoL0OrNpHBs=", false, function() {
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
    descriere: "Lecția introduce noțiunea de vector în plan, vectori egali, vectorul nul și opusul unui vector. Aceste idei sunt baza calculelor vectoriale și a aplicațiilor geometrice care urmează.",
    nivelPrincipal: "fundament",
    durataEstimataMinute: 25,
    prerechizite: [
        "Puncte și segmente în plan",
        "Lungimea unui segment",
        "Noțiunile de direcție și sens"
    ],
    obiective: [
        "Să recunoști un vector și notația lui.",
        "Să identifici originea și extremitatea unui vector.",
        "Să diferențiezi direcția, sensul și modulul unui vector.",
        "Să recunoști vectori egali și vectori opuși.",
        "Să înțelegi vectorul nul."
    ],
    termeniCheie: [
        "vector",
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
            descriere: "Începem de la ideea de segment orientat și vedem ce înseamnă originea și extremitatea unui vector.",
            scenariu: [
                "Imaginează-ți două puncte, A și B.",
                "Dacă desenăm segmentul dintre ele și punem o săgeată din A spre B, obținem un segment orientat.",
                "Acest segment orientat reprezintă vectorul AB.",
                "Punctul A este originea vectorului.",
                "Punctul B este extremitatea vectorului.",
                "Ordinea literelor este importantă.",
                "Vectorul AB merge de la A la B, iar vectorul BA merge de la B la A."
            ],
            ideiDeRetinut: [
                "Un vector poate fi reprezentat printr-un segment orientat.",
                "Prima literă reprezintă originea.",
                "A doua literă reprezintă extremitatea."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "În vectorul →MN, care este originea și care este extremitatea?",
                rezolvareScurta: [
                    "Prima literă este M.",
                    "A doua literă este N.",
                    "Deci M este originea, iar N este extremitatea."
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
                explicatie: "Prima literă din notația vectorului indică originea."
            }
        },
        {
            id: "m5-vp-video-2",
            numar: 2,
            titlu: "Direcție, sens și modul",
            durataMinute: 5,
            descriere: "Vedem cele trei caracteristici esențiale ale unui vector: direcția, sensul și modulul.",
            scenariu: [
                "Pentru a descrie complet un vector, nu este suficient să spunem cât de lung este.",
                "Un vector are direcție, sens și modul.",
                "Direcția este legată de dreapta pe care se află vectorul sau de o dreaptă paralelă cu aceasta.",
                "Sensul arată în ce parte este orientată săgeata.",
                "Modulul reprezintă lungimea vectorului.",
                "Pentru vectorul AB, modulul este egal cu lungimea segmentului AB.",
                "Modulul este un număr nenegativ."
            ],
            ideiDeRetinut: [
                "Direcția arată orientarea generală a dreptei suport.",
                "Sensul arată spre ce parte este orientată săgeata.",
                "Modulul reprezintă lungimea vectorului."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "Dacă segmentul AB are lungimea 6 cm, cât este |→AB|?",
                rezolvareScurta: [
                    "Modulul vectorului este lungimea segmentului.",
                    "AB = 6 cm.",
                    "Prin urmare |→AB| = 6 cm."
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
            descriere: "Înveți cum recunoști doi vectori egali și cum îi deosebești de doi vectori opuși.",
            scenariu: [
                "Doi vectori sunt egali dacă au aceeași direcție, același sens și același modul.",
                "Nu este necesar să fie desenați în același loc.",
                "Poziția lor în plan nu schimbă egalitatea.",
                "Doi vectori sunt opuși dacă au aceeași direcție și același modul, dar sensuri opuse.",
                "Vectorii AB și BA sunt un exemplu simplu de vectori opuși.",
                "Schimbarea ordinii punctelor inversează sensul vectorului."
            ],
            ideiDeRetinut: [
                "Vectori egali: aceeași direcție, același sens, același modul.",
                "Vectori opuși: aceeași direcție, același modul, sensuri opuse.",
                "→BA = −→AB."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "Vectorii u și v au aceeași direcție, același sens și module egale. Ce putem spune?",
                rezolvareScurta: [
                    "Au aceeași direcție.",
                    "Au același sens.",
                    "Au același modul.",
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
                explicatie: "Aceasta este definiția vectorilor opuși."
            }
        },
        {
            id: "m5-vp-video-4",
            numar: 4,
            titlu: "Vectorul nul și capcanele frecvente",
            durataMinute: 4,
            descriere: "Încheiem lecția cu vectorul nul și cele mai frecvente greșeli pe care trebuie să le eviți.",
            scenariu: [
                "Ce se întâmplă dacă originea și extremitatea sunt același punct?",
                "De exemplu, vectorul AA.",
                "Lungimea segmentului AA este zero.",
                "Prin urmare, vectorul AA este vectorul nul.",
                "Vectorul nul are modulul egal cu zero.",
                "O greșeală frecventă este să confundăm vectorul AB cu vectorul BA.",
                "O altă greșeală este să confundăm vectorul cu modulul său.",
                "Vectorul are direcție, sens și modul, în timp ce modulul este doar o valoare numerică."
            ],
            ideiDeRetinut: [
                "→AA este vectorul nul.",
                "|→0| = 0.",
                "Vectorul și modulul său sunt lucruri diferite."
            ],
            exemplu: {
                titlu: "Exemplu rapid",
                enunt: "Ce este vectorul →PP?",
                rezolvareScurta: [
                    "Originea este P.",
                    "Extremitatea este tot P.",
                    "Originea și extremitatea coincid.",
                    "Vectorul este vectorul nul."
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
                explicatie: "Vectorul →MM este vectorul nul, iar modulul său este 0."
            }
        }
    ],
    definitii: [
        {
            termen: "Vector",
            definitie: "Un vector poate fi reprezentat printr-un segment orientat. Dacă A este originea și B este extremitatea, vectorul se notează →AB.",
            observatie: "Ordinea literelor este importantă: →AB și →BA au sensuri opuse."
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
            termen: "Modulul vectorului",
            definitie: "Modulul unui vector este lungimea segmentului care îl reprezintă.",
            observatie: "Pentru vectorul →AB, modulul se notează |→AB| și este egal cu lungimea AB."
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
            titlu: "Ce informații conține un vector?",
            explicatie: "Un vector nu descrie doar o lungime. Pentru a caracteriza un vector ne interesează direcția, sensul și modulul său.",
            ideiCheie: [
                "Direcția este dată de dreapta suport sau de o dreaptă paralelă cu aceasta.",
                "Sensul arată orientarea pe direcția respectivă.",
                "Modulul reprezintă lungimea vectorului."
            ]
        },
        {
            id: "m5-vp-teorie-2",
            titlu: "Vectori egali",
            explicatie: "Doi vectori sunt egali atunci când au aceeași direcție, același sens și același modul.",
            ideiCheie: [
                "Poziția vectorilor în plan nu este suficientă pentru a-i considera diferiți.",
                "Vectorii pot avea origini diferite și totuși pot fi egali.",
                "Trebuie verificate simultan direcția, sensul și modulul."
            ]
        },
        {
            id: "m5-vp-teorie-3",
            titlu: "Vectori opuși",
            explicatie: "Doi vectori sunt opuși dacă au aceeași direcție și același modul, dar sensuri opuse.",
            ideiCheie: [
                "→AB și →BA sunt vectori opuși.",
                "Opusul vectorului v se notează −v.",
                "Vectorul nul este propriul său opus."
            ]
        },
        {
            id: "m5-vp-teorie-4",
            titlu: "Vectorul nul",
            explicatie: "Dacă originea și extremitatea coincid, obținem vectorul nul. El are modulul 0 și joacă un rol asemănător numărului 0 în calculele cu vectori.",
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
            explicatie: "Modulul vectorului →AB este lungimea segmentului AB.",
            conditii: [
                "A și B sunt puncte din plan."
            ],
            exempluScurt: "Dacă AB = 5, atunci |→AB| = 5."
        },
        {
            id: "m5-vp-formula-2",
            nume: "Vectori opuși",
            formula: "→BA = −→AB",
            explicatie: "Schimbarea ordinii originii și extremității păstrează direcția și modulul, dar inversează sensul.",
            exempluScurt: "Opusul vectorului →AB este vectorul →BA."
        },
        {
            id: "m5-vp-formula-3",
            nume: "Modulul vectorului nul",
            formula: "|→0| = 0",
            explicatie: "Vectorul nul are lungimea egală cu zero."
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
                    continut: "Ambii vectori sunt determinați de aceeași dreaptă AB, deci au aceeași direcție."
                },
                {
                    numar: 2,
                    titlu: "Comparăm modulele",
                    continut: "|→AB| = AB și |→BA| = BA. Deoarece AB = BA ca lungimi, modulele sunt egale."
                },
                {
                    numar: 3,
                    titlu: "Comparăm sensurile",
                    continut: "→AB este orientat de la A spre B, iar →BA de la B spre A. Sensurile sunt opuse."
                }
            ],
            raspunsFinal: "Vectorii →AB și →BA sunt opuși: →BA = −→AB.",
            verificare: "Au aceeași direcție, module egale și sensuri opuse."
        },
        {
            id: "m5-vp-exemplu-2",
            titlu: "Recunoașterea vectorului nul",
            enunt: "Punctul M este fix. Ce putem spune despre vectorul →MM?",
            nivel: "fundament",
            pasi: [
                {
                    numar: 1,
                    titlu: "Identificăm punctele",
                    continut: "Originea și extremitatea vectorului sunt același punct M."
                },
                {
                    numar: 2,
                    titlu: "Determinăm modulul",
                    continut: "Segmentul MM are lungimea 0, deci |→MM| = 0."
                },
                {
                    numar: 3,
                    titlu: "Identificăm vectorul",
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
                    continut: "Direcția este aceeași."
                },
                {
                    numar: 2,
                    titlu: "Verificăm sensul",
                    continut: "Sensul este același."
                },
                {
                    numar: 3,
                    titlu: "Verificăm modulul",
                    continut: "Ambele module sunt egale cu 7."
                }
            ],
            raspunsFinal: "u = v.",
            verificare: "Sunt îndeplinite cele trei condiții: aceeași direcție, același sens și același modul."
        }
    ],
    greseliFrecvente: [
        {
            greseala: "Elevul consideră că →AB = →BA.",
            deCeEsteGresit: "Cei doi vectori au sensuri opuse atunci când A și B sunt distincte.",
            cumOEviti: "Privește întotdeauna ordinea literelor: prima literă este originea, a doua este extremitatea."
        },
        {
            greseala: "Elevul confundă vectorul cu modulul său.",
            deCeEsteGresit: "Vectorul are direcție, sens și modul, în timp ce modulul este doar un număr nenegativ.",
            cumOEviti: "Separă notațiile: →AB reprezintă vectorul, iar |→AB| reprezintă modulul."
        },
        {
            greseala: "Elevul crede că doi vectori trebuie să aibă aceeași origine pentru a fi egali.",
            deCeEsteGresit: "Egalitatea vectorilor depinde de direcție, sens și modul, nu de poziția lor în plan.",
            cumOEviti: "Verifică cele trei caracteristici ale vectorilor, nu punctul în care sunt desenați."
        }
    ],
    exercitii: [
        {
            id: "m5-vp-ex-1",
            nivel: "fundament",
            tip: "alegere-multipla",
            enunt: "Care este opusul vectorului →AB?",
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
            explicatieFinala: "→BA = −→AB.",
            punctaj: 1,
            competenta: "Identificarea vectorului opus.",
            gresealaFrecventa: "Confundarea vectorului cu modulul său."
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
            competenta: "Calcularea modulului unui vector."
        },
        {
            id: "m5-vp-ex-3",
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
                    titlu: "Folosim definiția",
                    continut: "Vectorii opuși au aceeași direcție, același modul și sensuri opuse."
                }
            ],
            explicatieFinala: "Cei doi vectori sunt opuși.",
            punctaj: 1,
            competenta: "Recunoașterea relației dintre vectori."
        },
        {
            id: "m5-vp-ex-4",
            nivel: "standard-bac",
            tip: "raspuns-scurt",
            enunt: "Determină modulul vectorului →PP.",
            raspunsCorect: "0",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Observăm originea și extremitatea",
                    continut: "Originea și extremitatea coincid."
                },
                {
                    numar: 2,
                    titlu: "Identificăm vectorul nul",
                    continut: "→PP este vectorul nul."
                },
                {
                    numar: 3,
                    titlu: "Determinăm modulul",
                    continut: "|→PP| = 0."
                }
            ],
            explicatieFinala: "Vectorul nul are modulul egal cu 0.",
            punctaj: 1,
            competenta: "Recunoașterea vectorului nul."
        },
        {
            id: "m5-vp-ex-5",
            nivel: "avansat",
            tip: "rezolvare-completa",
            enunt: "Vectorii u și v au aceeași direcție și module egale. Precizează ce informație suplimentară este necesară pentru a decide dacă u = v sau u = −v.",
            raspunsCorect: "Trebuie comparate sensurile celor doi vectori.",
            rezolvare: [
                {
                    numar: 1,
                    titlu: "Folosim informațiile cunoscute",
                    continut: "Știm deja că direcțiile sunt aceleași și modulele sunt egale."
                },
                {
                    numar: 2,
                    titlu: "Identificăm informația lipsă",
                    continut: "Mai trebuie să comparăm sensurile."
                },
                {
                    numar: 3,
                    titlu: "Stabilim cele două cazuri",
                    continut: "Dacă sensurile sunt aceleași, u = v. Dacă sensurile sunt opuse, u = −v."
                }
            ],
            explicatieFinala: "Sensul este informația care permite diferențierea celor două situații.",
            punctaj: 2,
            competenta: "Compararea și caracterizarea vectorilor."
        }
    ],
    rezumat: {
        ideiDeRetinut: [
            "Un vector este caracterizat prin direcție, sens și modul.",
            "În →AB, A este originea și B este extremitatea.",
            "Doi vectori egali au aceeași direcție, același sens și același modul.",
            "Doi vectori opuși au aceeași direcție și același modul, dar sensuri opuse.",
            "Vectorul nul are modulul 0."
        ],
        formuleDeRetinut: [
            "|→AB| = AB",
            "→BA = −→AB",
            "|→0| = 0"
        ],
        checklistElev: [
            "Pot identifica originea și extremitatea unui vector.",
            "Pot explica diferența dintre direcție și sens.",
            "Pot determina modulul unui vector când cunosc lungimea segmentului.",
            "Pot recunoaște vectori egali.",
            "Pot recunoaște vectori opuși.",
            "Pot identifica vectorul nul."
        ]
    },
    legaturaCuBac: {
        importanta: "Noțiunile elementare despre vectori sunt fundamentul pentru operațiile cu vectori și pentru rezolvarea unor probleme geometrice din programa de matematică.",
        tipuriCerinte: [
            "Identificarea unor relații între vectori.",
            "Folosirea egalității sau opoziției vectorilor.",
            "Calcularea sau folosirea modulului unui vector.",
            "Pregătirea pentru operații și relații vectoriale mai complexe."
        ],
        strategie: [
            "Identifică mai întâi originea și extremitatea.",
            "Separă direcția de sens.",
            "Verifică modulul.",
            "Abia apoi stabilește relația dintre vectori."
        ]
    },
    surse: [
        {
            tip: "programa-oficiala",
            titlu: "Programa de examen pentru disciplina Matematică — Bacalaureat, profil M_mate-info",
            observatie: "Lecția este încadrată în zona de conținut privind vectorii în plan."
        },
        {
            tip: "verificare-interna",
            titlu: "BAC MATE — verificare pedagogică și matematică",
            observatie: "Conținutul rămâne în verificare până la validarea finală pentru publicare."
        }
    ],
    verificare: {
        status: "verificare",
        verificatMatematic: false,
        verificatPrograma: false,
        verificatExercitii: false,
        verificatLimbaRomana: false,
        observatii: [
            "Lecție-etalon pentru noul sistem de conținut BAC MATE.",
            "Nu se marchează publicabilă înainte de verificările automate și verificarea finală.",
            "Structura include patru blocuri video scurte pentru o experiență de învățare mai ușor de parcurs."
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

//# sourceMappingURL=_0kovv2q._.js.map