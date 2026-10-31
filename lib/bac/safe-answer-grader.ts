export type PrivateRubric={exerciseId:string;gradingMode:'deterministic'|'human';acceptedEquivalentForms?:string[];maxPoints:number;requiresHumanReview?:boolean};
export type GradeResult={state:'graded'|'pending';awardedPoints:number|null;isCorrect:boolean|null;reason:string};
const norm=(v:string)=>v.normalize('NFKC').trim().replace(/\s+/g,' ').toLocaleLowerCase('ro-RO');
export function gradeAnswerSafe(answer:string,rubric:PrivateRubric):GradeResult{
 if(rubric.gradingMode!=='deterministic'||rubric.requiresHumanReview) return {state:'pending',awardedPoints:null,isCorrect:null,reason:'requiresHumanReview'};
 const accepted=(rubric.acceptedEquivalentForms??[]).map(norm).filter(Boolean);
 if(!accepted.length) return {state:'pending',awardedPoints:null,isCorrect:null,reason:'no-verified-accepted-forms'};
 const ok=accepted.includes(norm(answer));
 return {state:'graded',awardedPoints:ok?rubric.maxPoints:0,isCorrect:ok,reason:ok?'verified-equivalent-form':'not-an-accepted-verified-form'};
}
