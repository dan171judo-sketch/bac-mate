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
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    const [lectieFinalizata, setLectieFinalizata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoDeschis, setVideoDeschis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [salvareCloud, setSalvareCloud] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("nimic");
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
        if (raspuns === exercitiu.corect) {
            const xpNou = Math.min(xpLectie + 10, xpMaxim);
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
        setSalvareCloud("nimic");
    }
    function incearcaDinNou() {
        setRaspuns(null);
        setVerificat(false);
        setSalvareCloud("nimic");
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
                    lineNumber: 316,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 315,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LectieUniversala.tsx",
            lineNumber: 314,
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
                            lineNumber: 329,
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
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 336,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400",
                            children: lectie.profil
                        }, void 0, false, {
                            fileName: "[project]/components/LectieUniversala.tsx",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LectieUniversala.tsx",
                    lineNumber: 328,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 327,
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
                                        lineNumber: 355,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400",
                                        children: [
                                            "Lecția ",
                                            lectie.numarLectie
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400",
                                        children: lectie.clasa
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 363,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-5 text-4xl font-black leading-tight md:text-5xl",
                                children: lectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 max-w-3xl text-lg leading-8 text-slate-300",
                                children: lectie.descriere
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 372,
                                columnNumber: 11
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
                                    lineNumber: 377,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 376,
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
                                lineNumber: 389,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 353,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                children: "🎯 Obiective"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 text-2xl font-black",
                                children: "Ce vei ști să faci după această lecție"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 401,
                                columnNumber: 11
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
                                                lineNumber: 413,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 font-black",
                                                children: obiectiv.titlu
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm leading-6 text-slate-400",
                                                children: obiectiv.descriere
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 421,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${obiectiv.titlu}-${index}`, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 409,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                children: "Lecția video"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 431,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-3xl font-black",
                                children: "Învață pas cu pas"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-slate-400",
                                children: "Videoclipurile BAC MATE vor fi integrate aici."
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 439,
                                columnNumber: 11
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
                                                            "VIDEO ",
                                                            video.numar
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-5 top-5 rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300",
                                                        children: [
                                                            "⏱ ",
                                                            video.durata
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "max-w-xl text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setVideoDeschis(deschis ? null : video.numar),
                                                                className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl shadow-lg transition hover:scale-105 hover:bg-blue-500",
                                                                children: "▶"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 465,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "mt-6 text-2xl font-black md:text-3xl",
                                                                children: video.titlu
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 leading-7 text-slate-400",
                                                                children: video.descriere
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-5 text-sm font-bold text-slate-600",
                                                                children: "Videoclipul BAC MATE va fi integrat aici."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 455,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-6 md:p-7",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setVideoDeschis(deschis ? null : video.numar),
                                                        className: "flex w-full items-center justify-between text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-black uppercase tracking-wider text-emerald-400",
                                                                        children: "După video"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 507,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-xl font-black",
                                                                        children: "Ce trebuie să reții"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 511,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl text-slate-400",
                                                                children: deschis ? "−" : "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 516,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 495,
                                                        columnNumber: 23
                                                    }, this),
                                                    deschis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-6",
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
                                                                                lineNumber: 530,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-semibold text-slate-200",
                                                                                children: idee
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                                lineNumber: 534,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, `${idee}-${index}`, true, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 526,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 523,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-black text-blue-400",
                                                                        children: video.exempluTitlu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 543,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-3 leading-7 text-slate-300",
                                                                        children: video.exemplu
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                                        lineNumber: 547,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 494,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, video.numar, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 451,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 444,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-emerald-400",
                                children: "🧠 Fișa de 30 de secunde"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 text-2xl font-black",
                                children: lectie.fisaRapida.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 566,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-3",
                                children: lectie.fisaRapida.continut.map((rand, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 rounded-2xl bg-slate-950 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-400",
                                                children: "✓"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 577,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "leading-7 text-slate-300",
                                                children: rand
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 581,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${rand}-${index}`, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 573,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-8 rounded-3xl border border-violet-500/30 bg-violet-500/10 p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-violet-400",
                                children: "🤖 Profesorul BAC MATE"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 591,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 text-2xl font-black",
                                children: "Ai nevoie de ajutor?"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 595,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 leading-7 text-slate-300",
                                children: "Profesorul AI va putea să îți explice această lecție în alt mod, să îți ofere exemple și să identifice exact unde te-ai blocat."
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 599,
                                columnNumber: 11
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
                                        lineNumber: 607,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                        children: "🧩 Dă-mi un exemplu"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 614,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "rounded-xl border border-violet-500/30 px-4 py-3 font-bold",
                                        children: "🎯 Testează-mă"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 621,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 606,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-xs text-violet-300/60",
                                children: "Profesorul AI va fi conectat într-o etapă ulterioară."
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 629,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 590,
                        columnNumber: 9
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
                                                children: "Mini-test"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 639,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "mt-2 text-3xl font-black",
                                                children: "Verifică dacă ai înțeles"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 643,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-slate-400",
                                                children: [
                                                    lectie.exercitii.length,
                                                    " întrebări • maximum ",
                                                    xpMaxim,
                                                    " XP"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 647,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 638,
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
                                        lineNumber: 653,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 637,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 h-2 overflow-hidden rounded-full bg-slate-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-blue-500 transition-all",
                                    style: {
                                        width: `${(exercitiuCurent + 1) / lectie.exercitii.length * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/LectieUniversala.tsx",
                                    lineNumber: 660,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 659,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-8 text-xl font-black md:text-2xl",
                                children: exercitiu.intrebare
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 672,
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
                                                lineNumber: 714,
                                                columnNumber: 23
                                            }, this),
                                            varianta
                                        ]
                                    }, `${varianta}-${index}`, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 705,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 676,
                                columnNumber: 13
                            }, this),
                            !verificat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: verificaRaspunsul,
                                disabled: raspuns === null,
                                className: `mt-6 rounded-xl px-6 py-3 font-black transition ${raspuns !== null ? "bg-blue-600 hover:bg-blue-500" : "cursor-not-allowed bg-slate-800 text-slate-500"}`,
                                children: "Verifică răspunsul"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 729,
                                columnNumber: 15
                            }, this),
                            verificat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-6 rounded-2xl p-6 ${corect ? "bg-emerald-500/10" : "bg-red-500/10"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-lg font-black ${corect ? "text-emerald-400" : "text-red-400"}`,
                                        children: corect ? "✓ Corect! Ai câștigat 10 XP." : "Nu este răspunsul corect."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 751,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 leading-7 text-slate-300",
                                        children: exercitiu.explicatie
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 763,
                                        columnNumber: 17
                                    }, this),
                                    corect && salvareCloud === "salvare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-blue-400",
                                        children: "☁️ Se salvează progresul..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 769,
                                        columnNumber: 21
                                    }, this),
                                    corect && salvareCloud === "salvat" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-emerald-400",
                                        children: "✓ Progres salvat în cont"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 776,
                                        columnNumber: 21
                                    }, this),
                                    corect && salvareCloud === "eroare" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-bold text-amber-400",
                                        children: "⚠️ Progresul este păstrat pe acest dispozitiv, dar nu a putut fi salvat momentan în cont."
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 783,
                                        columnNumber: 21
                                    }, this),
                                    corect && !esteUltimul && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: urmatorulExercitiu,
                                        className: "mt-5 rounded-xl bg-blue-600 px-5 py-3 font-black hover:bg-blue-500",
                                        children: "Următorul exercițiu →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 791,
                                        columnNumber: 19
                                    }, this),
                                    !corect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: incearcaDinNou,
                                        className: "mt-5 rounded-xl border border-slate-700 px-5 py-3 font-black hover:bg-slate-950",
                                        children: "Încearcă din nou"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 801,
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
                                                lineNumber: 814,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 text-slate-300",
                                                children: [
                                                    "Ai terminat lecția și ai acumulat",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            xpLectie,
                                                            " XP"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 25
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 818,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 flex flex-col gap-3 sm:flex-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "/programa",
                                                        className: "rounded-xl bg-blue-600 px-5 py-3 text-center font-black hover:bg-blue-500",
                                                        children: "Continuă traseul →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 828,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "/dashboard",
                                                        className: "rounded-xl border border-slate-700 px-5 py-3 text-center font-black hover:bg-slate-900",
                                                        children: "Dashboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LectieUniversala.tsx",
                                                        lineNumber: 835,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/LectieUniversala.tsx",
                                                lineNumber: 827,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LectieUniversala.tsx",
                                        lineNumber: 813,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 744,
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
                                        lineNumber: 848,
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
                                        lineNumber: 852,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 847,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 636,
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
                                lineNumber: 861,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-xl font-black",
                                children: lectie.urmatoareaLectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 865,
                                columnNumber: 13
                            }, this),
                            lectie.urmatoareaLectie.href && lectieFinalizata ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: lectie.urmatoareaLectie.href,
                                className: "mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-black transition hover:bg-blue-500",
                                children: "Continuă →"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 871,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm font-bold text-slate-600",
                                children: "🔒 Finalizează această lecție pentru a continua"
                            }, void 0, false, {
                                fileName: "[project]/components/LectieUniversala.tsx",
                                lineNumber: 878,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LectieUniversala.tsx",
                        lineNumber: 860,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LectieUniversala.tsx",
                lineNumber: 352,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LectieUniversala.tsx",
        lineNumber: 326,
        columnNumber: 5
    }, this);
}
_s(LectieUniversala, "vr75HaRxcQ4TUxPfnjFwrwx5Er4=", false, function() {
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

//# sourceMappingURL=_1z9c7x0._.js.map