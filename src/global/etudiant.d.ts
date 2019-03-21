export interface Etudiant{
    adresse: string;
    codePostal : string;
    dateNaissance : Date;
    email : string;
    emailUbo : string;
    groupeAnglais : 0;
    groupeTp : 0;
    lieuNaissance : string;
    mobile : string;
    nationalite : string;
    noEtudiant : string;
    nom : string;
    paysOrigine : string;
    prenom : string;
    promotion : {
            commentaire : string;
            dateRentree : Date;
            dateReponseLalp : Date;
            dateReponseLp : Date;
            enseignant : {
                    adresse : string;
                    codePostal : string;
                    emailPerso : string;
                    emailUbo : string;
                    mobile : string;
                    noEnseignant : 0;
                    nom : string;
                    pays : string;
                    prenom : string;
                    sexe : string;
                    telephone : string;
                    type : string;
                    ville : string;
                    }
                }
            }