import { Component, State } from "@stencil/core";
import { Enseignant } from "../../../../global/enseignant";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";

@Component({
  tag: "ens-search",
  styleUrl: "ens-search.scss"
})
export class EnsSearch {
  @State() resultats: Enseignant[] = [];
  barreRecherche: HTMLInputElement;

  lancerRecherche() {
    if (this.barreRecherche.value.includes("@")) {
      this.rechercheParMail(this.barreRecherche.value);
    } else {
      this.rechercheParNom(this.barreRecherche.value);
    }
  }

  rechercheParMail(email) {
    fetch(API_URL + END_POINT.ADM.ENSEIGNANTS + `/emailUbo/${email}`)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.resultats = [].concat(json)))
      .catch(error =>
        console.log(
          "Error while searching enseignant by email: " + error.message
        )
      );
  }

  rechercheParNom(nom) {
    fetch(API_URL + END_POINT.ADM.ENSEIGNANTS + `/nom/${nom}`)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.resultats = json || []))
      .catch(error =>
        console.log(
          "Error while searching enseignant by name: " + error.message
        )
      );
  }

  render() {
    return [
      <div class="container">
        <h1 class="title">Recherche d'enseignant(s)</h1>
        <div class="columns is-centered">
          <div class="column is-half ">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  class="input is-primary is-rounded"
                  type="text"
                  placeholder="Par nom ou e-mail UBO."
                  ref={el => (this.barreRecherche = el)}
                />
              </div>
              <div class="control">
                <a
                  class="button is-primary is-rounded"
                  onClick={() => this.lancerRecherche()}
                >
                  Rechercher
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <br />,
      <div class="container">
        <div class="columns is-multiline is-centered">
          {this.resultats.map(enseignant => {
            return (
              <div class="column is-4">
                <ens-card enseignant={enseignant} />
              </div>
            );
          })}
        </div>
      </div>
    ];
  }
}
