import { Enseignant } from "./enseignant";
import { Formation } from "./formation";
import { PromotionPK } from "./promotionpk";

export interface Promotion {
  id: PromotionPK;
  commentaire: string;
  dateRentree: string;
  dateReponseLalp: string;
  dateReponseLp: string;
  lieuRentree: string;
  nbMaxEtudiant: number;
  processusStage: string;
  siglePromotion: string;
  enseignant: Enseignant;
  formation: Formation;
}
