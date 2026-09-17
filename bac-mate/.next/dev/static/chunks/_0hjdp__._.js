(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/lectii/index.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function DashboardPage() {
    _s();
    const [profil, setProfil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("M_mate-info");
    const [progres, setProgres] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [gata, setGata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const profilSalvat = localStorage.getItem("bac-mate-profil-cod") || "M_mate-info";
            setProfil(profilSalvat);
            const progresLectii = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lectii"].map({
                "DashboardPage.useEffect.progresLectii": (lectie)=>{
                    const finalizata = localStorage.getItem(lectie.storageKeyFinalizata) === "da";
                    const xpSalvat = Number(localStorage.getItem(lectie.storageKeyXp) || "0");
                    return {
                        titlu: lectie.titlu,
                        finalizata,
                        xp: Number.isNaN(xpSalvat) ? 0 : xpSalvat,
                        modul: lectie.modul,
                        numarLectie: lectie.numarLectie,
                        totalLectiiModul: lectie.totalLectiiModul,
                        href: `/lectii/${lectie.slug}`
                    };
                }
            }["DashboardPage.useEffect.progresLectii"]);
            setProgres(progresLectii);
            setGata(true);
        }
    }["DashboardPage.useEffect"], []);
    const totalLectii = progres.length;
    const lectiiFinalizate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[lectiiFinalizate]": ()=>progres.filter({
                "DashboardPage.useMemo[lectiiFinalizate]": (lectie)=>lectie.finalizata
            }["DashboardPage.useMemo[lectiiFinalizate]"]).length
    }["DashboardPage.useMemo[lectiiFinalizate]"], [
        progres
    ]);
    const xpTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[xpTotal]": ()=>progres.reduce({
                "DashboardPage.useMemo[xpTotal]": (total, lectie)=>total + lectie.xp
            }["DashboardPage.useMemo[xpTotal]"], 0)
    }["DashboardPage.useMemo[xpTotal]"], [
        progres
    ]);
    const procentGeneral = totalLectii === 0 ? 0 : Math.round(lectiiFinalizate / totalLectii * 100);
    const urmatoareaLectie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[urmatoareaLectie]": ()=>{
            if (progres.length === 0) {
                return null;
            }
            const primaNefinalizata = progres.find({
                "DashboardPage.useMemo[urmatoareaLectie].primaNefinalizata": (lectie)=>!lectie.finalizata
            }["DashboardPage.useMemo[urmatoareaLectie].primaNefinalizata"]);
            if (primaNefinalizata) {
                return primaNefinalizata;
            }
            return progres[progres.length - 1];
        }
    }["DashboardPage.useMemo[urmatoareaLectie]"], [
        progres
    ]);
    const progresPeModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[progresPeModule]": ()=>{
            const module = new Map();
            progres.forEach({
                "DashboardPage.useMemo[progresPeModule]": (lectie)=>{
                    const modulExistent = module.get(lectie.modul) || {
                        total: 0,
                        finalizate: 0
                    };
                    modulExistent.total += 1;
                    if (lectie.finalizata) {
                        modulExistent.finalizate += 1;
                    }
                    module.set(lectie.modul, modulExistent);
                }
            }["DashboardPage.useMemo[progresPeModule]"]);
            return Array.from(module.entries()).sort({
                "DashboardPage.useMemo[progresPeModule]": ([a], [b])=>a - b
            }["DashboardPage.useMemo[progresPeModule]"]).map({
                "DashboardPage.useMemo[progresPeModule]": ([modul, valori])=>({
                        modul,
                        ...valori,
                        procent: valori.total === 0 ? 0 : Math.round(valori.finalizate / valori.total * 100)
                    })
            }["DashboardPage.useMemo[progresPeModule]"]);
        }
    }["DashboardPage.useMemo[progresPeModule]"], [
        progres
    ]);
    if (!gata) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-slate-950 text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-6 py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400",
                    children: "Se încarcă progresul..."
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/page.tsx",
            lineNumber: 127,
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
                            href: "/",
                            className: "text-xl font-black",
                            children: [
                                "BAC ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-blue-500",
                                    children: "MATE"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/programa",
                                    className: "rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-slate-900",
                                    children: "Programa"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400",
                                    children: profil
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-6 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-3 text-4xl font-black md:text-5xl",
                                children: "Progresul tău la BAC MATE"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-3xl text-lg leading-8 text-slate-400",
                                children: "Aici vezi ce ai terminat, cât XP ai acumulat și care este următoarea lecție recomandată."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10 grid gap-5 md:grid-cols-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-3xl border border-slate-800 bg-slate-900 p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-slate-400",
                                        children: "Progres general"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-4xl font-black",
                                        children: [
                                            procentGeneral,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-slate-500",
                                        children: [
                                            lectiiFinalizate,
                                            " din ",
                                            totalLectii,
                                            " lecții construite"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-3xl border border-slate-800 bg-slate-900 p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-slate-400",
                                        children: "Lecții finalizate"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-4xl font-black text-emerald-400",
                                        children: lectiiFinalizate
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-slate-500",
                                        children: "Continuă traseul pas cu pas"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-3xl border border-slate-800 bg-slate-900 p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-slate-400",
                                        children: "XP total"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-4xl font-black text-amber-400",
                                        children: xpTotal
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-slate-500",
                                        children: "XP obținut din lecțiile construite"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-3xl border border-slate-800 bg-slate-900 p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-slate-400",
                                        children: "Lecții disponibile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-4xl font-black text-blue-400",
                                        children: totalLectii
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-slate-500",
                                        children: "Modulul 1 + Modulul 2"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                                        children: "Progres total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-2 text-2xl font-black",
                                                        children: [
                                                            lectiiFinalizate,
                                                            "/",
                                                            totalLectii,
                                                            " lecții"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-black",
                                                children: [
                                                    procentGeneral,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 h-4 overflow-hidden rounded-full bg-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full bg-blue-500 transition-all",
                                            style: {
                                                width: `${procentGeneral}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    urmatoareaLectie && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-8 rounded-3xl border border-blue-500/30 bg-blue-500/5 p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                children: "Continuă de aici"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 text-2xl font-black md:text-3xl",
                                children: urmatoareaLectie.finalizata ? "Ai terminat toate lecțiile construite 🎉" : urmatoareaLectie.titlu
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this),
                            !urmatoareaLectie.finalizata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-slate-300",
                                        children: [
                                            "Modul ",
                                            urmatoareaLectie.modul,
                                            " • Lecția",
                                            " ",
                                            urmatoareaLectie.numarLectie,
                                            " din",
                                            " ",
                                            urmatoareaLectie.totalLectiiModul
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: urmatoareaLectie.href,
                                        className: "mt-5 inline-block rounded-xl bg-blue-600 px-6 py-4 font-black transition hover:bg-blue-500",
                                        children: "Continuă lecția →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 281,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                children: "Progres pe module"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-3xl font-black",
                                children: "Unde te afli în programă"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid gap-5 md:grid-cols-2",
                                children: progresPeModule.map((modul)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-3xl border border-slate-800 bg-slate-900 p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-bold text-blue-400",
                                                                children: [
                                                                    "MODUL ",
                                                                    modul.modul
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-xl font-black",
                                                                children: [
                                                                    modul.finalizate,
                                                                    "/",
                                                                    modul.total,
                                                                    " finalizate"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-black",
                                                        children: [
                                                            modul.procent,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 h-3 overflow-hidden rounded-full bg-slate-800",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded-full bg-emerald-500 transition-all",
                                                    style: {
                                                        width: `${modul.procent}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, modul.modul, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 308,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black uppercase tracking-wider text-blue-400",
                                children: "Lecțiile tale"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-3xl font-black",
                                children: "Istoric și progres"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 space-y-3",
                                children: progres.map((lectie)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: lectie.href,
                                        className: "flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black ${lectie.finalizata ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-500"}`,
                                                children: lectie.finalizata ? "✓" : lectie.numarLectie
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold",
                                                        children: lectie.titlu
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-sm text-slate-500",
                                                        children: [
                                                            "Modul ",
                                                            lectie.modul,
                                                            " • ",
                                                            lectie.xp,
                                                            " XP"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-sm font-black ${lectie.finalizata ? "text-emerald-400" : "text-slate-500"}`,
                                                children: lectie.finalizata ? "Finalizată" : "De parcurs"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, lectie.titlu, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex flex-col gap-3 sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/programa",
                                className: "rounded-xl bg-blue-600 px-6 py-4 text-center font-black transition hover:bg-blue-500",
                                children: "Vezi programa →"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/evaluare",
                                className: "rounded-xl border border-slate-700 px-6 py-4 text-center font-black transition hover:bg-slate-900",
                                children: "Refă evaluarea"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "2sBAoB7Bew74Pl57AUvnuQvGUAs=");
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
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
;
;
;
;
const lectii = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$1$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lectiiModul1"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2f$modul$2d$2$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lectiiModul2"]
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/lectii/modul-1.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lectiiModul1",
    ()=>lectiiModul1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$lectii$2d$vechi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/lectii-vechi.ts [app-client] (ecmascript)");
;
;
const lectiiModul1 = [
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
]);

//# sourceMappingURL=_0hjdp__._.js.map