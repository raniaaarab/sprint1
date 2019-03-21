import { Qualificatif } from "./qualificatif";
import { Enseignant } from './enseignant.d';

export interface Questions {
    qualificatif : Qualificatif,
    enseignant : Enseignant,
    idQuestion : number,
    intitule : string,
    type :string

}