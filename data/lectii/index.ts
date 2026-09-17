import { lectiiModul1 } from "./modul-1";
import { lectiiModul2 } from "./modul-2";
import { lectiiModul3 } from "./modul-3";
import { lectiiModul4 } from "./modul-4";
import { lectiiModule5La17 } from "./modul-5";

export type {
  VideoLectie,
  ExercitiuLectie,
  Lectie,
} from "./tipuri";

export {
  lectiaNumereReale,
  lectiaEstimariAproximari,
  lectiaModulNumarReal,
  lectiaIntervaleNumereReale,
  lectiaPropozitiiPredicate,
  lectiaCuantificatori,
  lectiaOperatiiLogice,
  lectiaOperatiiMultimi,
  lectiaInductiaMatematica,
  lectiaDemonstratii,
  lectiiModul1,
} from "./modul-1";

export {
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
  lectiaProgresiiGeometrice,
  lectiiModul2,
} from "./modul-2";

export {
  lectiaFunctiaGradulIntai,
  lectiaGraficFunctieGradulIntai,
  lectiaMonotoniaFunctieiGradulIntai,
  lectiaSemnulFunctieiGradulIntai,
  lectiaEcuatiiGradulIntai,
  lectiaInecuatiiGradulIntai,
  lectiaSistemeEcuatiiLiniare,
  lectiaInterpretareaGeometricaSistemelor,
  lectiaProblemeFunctiiLiniare,
  lectiiModul3,
} from "./modul-3";

export {
  lectiaEcuatiaGradulDoi,
  lectiaDiscriminantul,
  lectiaFormuleleRadacinilor,
  lectiaRelatiileViete,
  lectiaFunctiaGradulDoi,
  lectiaGraficulParabolei,
  lectiaVarfulParabolei,
  lectiaAxaSimetrie,
  lectiaIntersectiiParabola,
  lectiaSemnulGradulDoi,
  lectiaInecuatiiGradulDoi,
  lectiaDreaptaParabola,
  lectiaProblemeParametruGradulDoi,
  lectiiModul4,
} from "./modul-4";

export {
  lectiiModul5,
  lectiiModul6,
  lectiiModul7,
  lectiiModul8,
  lectiiModul9,
  lectiiModul10,
  lectiiModul11,
  lectiiModul12,
  lectiiModul13,
  lectiiModul14,
  lectiiModul15,
  lectiiModul16,
  lectiiModul17,
  lectiiModule5La17,
} from "./modul-5";

export const lectii = [
  ...lectiiModul1,
  ...lectiiModul2,
  ...lectiiModul3,
  ...lectiiModul4,
  ...lectiiModule5La17,
];