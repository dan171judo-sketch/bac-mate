import {getVerifiedPool} from "@/lib/bac/verified-pool";
import {gradeAnswerSafe} from "@/lib/bac/safe-answer-grader";
import {getOfficialVariants, officialReleaseId} from "@/lib/bac/official-variant-catalog";
import {normalizeBacProfile} from "@/lib/simulari/blueprint";
import {getNativeOfficialStatement} from "@/lib/bac/native-official-statements";
import type {NivelDificultate,ExercitiuContinutuLectie} from "@/data/continut/tipuri";
export type SubiectSimulare=1|2|3;
export type ExercitiuSimulare={id:string;sourceExerciseId:string;sourceReleaseId?:string;contentFingerprint?:string;lessonSlug:string;lessonTitle:string;subjectNumber:SubiectSimulare;exerciseOrder:number;slotId?:string;nivel:NivelDificultate;tip:ExercitiuContinutuLectie['tip'];enunt:string;variante?:string[];maxPoints:number;competenta?:string};
export type ExercitiuSimulareCuBarem=ExercitiuSimulare&{raspunsCorect:string;rezolvare:ExercitiuContinutuLectie['rezolvare'];explicatieFinala:string;gradingMode?:'deterministic'|'human';acceptedEquivalentForms?:string[]};
export type BancaSimulare={profileCode:string;generatedAt:string;lessonsAvailable:number;exercisesAvailable:number;totalAvailablePoints:number;canBuildFullSimulation:boolean;subjects:{subjectNumber:SubiectSimulare;title:string;targetPoints:number;exercises:ExercitiuSimulareCuBarem[];availablePoints:number}[]};
export type RezultatRaspunsSimulare={corect:boolean;awardedPoints:number;maxPoints:number};

const OFFICIAL_PDF_MODE_PROFILES = new Set([
  "M_mate-info",
  "M_st-nat",
  "M_tehnologic",
  "M_pedagogic",
]);

function officialPdfSlots(subjectNumber: SubiectSimulare): string[] {
  return subjectNumber === 1
    ? ["S1-1", "S1-2", "S1-3", "S1-4", "S1-5", "S1-6"]
    : [
        `S${subjectNumber}-1-a`, `S${subjectNumber}-1-b`, `S${subjectNumber}-1-c`,
        `S${subjectNumber}-2-a`, `S${subjectNumber}-2-b`, `S${subjectNumber}-2-c`,
      ];
}

function construiesteBancaOfficialPdf(profileCode: string): BancaSimulare {
  const normalized = normalizeBacProfile(profileCode);
  const variants = getOfficialVariants(normalized);
  const subjects = ([1, 2, 3] as const).map((subjectNumber) => {
    const exercises: ExercitiuSimulareCuBarem[] = variants.flatMap((variant) =>
      officialPdfSlots(subjectNumber).map((slotId, index) => {
        const releaseId = officialReleaseId(variant.id);
        const sourceId = `${releaseId}::${slotId}`;
        const native = getNativeOfficialStatement(releaseId, slotId);
        if (!native) {
          throw new Error(`Enunț nativ verificat indisponibil: ${normalized} / ${releaseId} / ${slotId}`);
        }
        return {
          id: sourceId, sourceExerciseId: sourceId, sourceReleaseId: releaseId,
          contentFingerprint: `${variant.subjectSha256}:${slotId}`,
          lessonSlug: `bac-official-pdf-${normalized.toLowerCase()}-${slotId.toLowerCase()}`,
          lessonTitle: `BAC oficial 2026 · ${normalized} · ${variant.session} · ${slotId}`,
          subjectNumber, exerciseOrder: index + 1, slotId,
          nivel: subjectNumber === 1 ? "fundament" : subjectNumber === 2 ? "standard-bac" : "avansat",
          tip: "rezolvare-completa",
          enunt: native.statement,
          maxPoints: 5, competenta: `bac-${normalized.toLowerCase()}-${slotId.toLowerCase()}`,
          raspunsCorect: "Evaluare conform baremului oficial privat.", rezolvare: [],
          explicatieFinala: "Baremul oficial nu este inclus în snapshot-ul elevului.",
          gradingMode: "human", acceptedEquivalentForms: [],
        };
      })
    );
    return {
      subjectNumber,
      title: subjectNumber === 1 ? "Subiectul I" : subjectNumber === 2 ? "Subiectul al II-lea" : "Subiectul al III-lea",
      targetPoints: 30, exercises, availablePoints: variants.length ? 30 : 0,
    };
  });
  return {
    profileCode: normalized, generatedAt: new Date().toISOString(), lessonsAvailable: 18,
    exercisesAvailable: variants.length * 18, totalAvailablePoints: variants.length ? 90 : 0,
    canBuildFullSimulation: variants.length > 0, subjects,
  };
}

export function construiesteBancaSimulare(profileCode='M_mate-info'):BancaSimulare {
  const normalizedProfileCode = normalizeBacProfile(profileCode);
  if (OFFICIAL_PDF_MODE_PROFILES.has(normalizedProfileCode) && getOfficialVariants(normalizedProfileCode).length > 0) {
    return construiesteBancaOfficialPdf(normalizedProfileCode);
  }
  const pool=getVerifiedPool(normalizedProfileCode);
  const subjects=([1,2,3] as const).map(subjectNumber=>{const exercises=pool.filter(x=>x.subjectNumber===subjectNumber).map((x,index):ExercitiuSimulareCuBarem=>({id:x.id,sourceExerciseId:x.sourceExerciseId,sourceReleaseId:x.sourceReleaseId,contentFingerprint:x.contentFingerprint,lessonSlug:x.lessonSlug,lessonTitle:`BAC verificat · ${x.sourceReleaseId} · ${x.slotId}`,subjectNumber,exerciseOrder:index+1,slotId:x.slotId,nivel:subjectNumber===1?'fundament':subjectNumber===2?'standard-bac':'avansat',tip:'rezolvare-completa',enunt:x.statement,maxPoints:x.points,competenta:x.skillId,raspunsCorect:'Barem privat verificat.',rezolvare:x.rubricSteps.map((s,i)=>({numar:i+1,titlu:`${s.points}p`,continut:s.criterion})),explicatieFinala:'Se acceptă numai evaluarea conform baremului verificat.',gradingMode:x.gradingMode,acceptedEquivalentForms:[...x.acceptedEquivalentForms]}));return{subjectNumber,title:subjectNumber===1?'Subiectul I':subjectNumber===2?'Subiectul al II-lea':'Subiectul al III-lea',targetPoints:30,exercises,availablePoints:exercises.reduce((a,e)=>a+e.maxPoints,0)}});
  const required=(n:1|2|3)=>n===1?['S1-1','S1-2','S1-3','S1-4','S1-5','S1-6']:[`S${n}-1-a`,`S${n}-1-b`,`S${n}-1-c`,`S${n}-2-a`,`S${n}-2-b`,`S${n}-2-c`];
  const canBuildFullSimulation=subjects.every(s=>required(s.subjectNumber).every(slot=>s.exercises.some(e=>e.slotId===slot)));
  return{profileCode:normalizedProfileCode,generatedAt:new Date().toISOString(),lessonsAvailable:new Set(pool.map(x=>x.lessonSlug)).size,exercisesAvailable:pool.length,totalAvailablePoints:pool.reduce((a,x)=>a+x.points,0),canBuildFullSimulation,subjects};
}
export function obtineExercitiuDinBanca(exerciseId:string,profileCode='M_mate-info'){for(const s of construiesteBancaSimulare(profileCode).subjects){const e=s.exercises.find(x=>x.id===exerciseId);if(e)return e}return null}
export function verificaRaspunsObiectiv(exercitiu:ExercitiuSimulareCuBarem,raspunsElev:string):RezultatRaspunsSimulare|null{const r=gradeAnswerSafe(raspunsElev,{exerciseId:exercitiu.id,gradingMode:exercitiu.gradingMode??'human',acceptedEquivalentForms:exercitiu.acceptedEquivalentForms,maxPoints:exercitiu.maxPoints,requiresHumanReview:(exercitiu.gradingMode??'human')!=='deterministic'});return r.state==='graded'?{corect:r.isCorrect===true,awardedPoints:r.awardedPoints??0,maxPoints:exercitiu.maxPoints}:null}
export function calculeazaNotaFinala(puncteSubiecte:number,puncteOficiu=10){const s=Math.max(0,Math.min(90,puncteSubiecte)),o=Math.max(0,Math.min(10,puncteOficiu));return Number((Math.min(100,s+o)/10).toFixed(2))}



