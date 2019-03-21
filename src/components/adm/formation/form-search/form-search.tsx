import { Component, State, Prop } from "@stencil/core";
import { Formation } from "../../../../global/formation";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
import { LocationSegments, RouterHistory } from "@stencil/router";

@Component({
  tag: "form-search",
  styleUrl: "form-search.scss"
})
export class FormSearch {
  @Prop() history: RouterHistory;
  @State() resultats: Formation[] = [];
  barreRecherche: HTMLInputElement;
  choixTypeRecherche: HTMLSelectElement;

  lancerRecherche() {
    if (this.choixTypeRecherche.value === "code") {
      this.rechercheParCode(this.barreRecherche.value);
    } else {
      this.rechercheParNom(this.barreRecherche.value);
    }
  }

  rechercheParCode(code) {
    fetch(API_URL + END_POINT.ADM.FORMATIONS + `/${code}`)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.resultats = [].concat(json)))
      .catch(error => console.log("Error while searching formation by code: " + error.message));
  }

  rechercheParNom(nom) {
    fetch(API_URL + END_POINT.ADM.FORMATIONS + `/nom/${nom}`)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.resultats = json || []))
      .catch(error => console.log("Error while searching formation by name: " + error.message));
  }

  afficherDetailDe(formationAAfficher) {
    let segment: LocationSegments = {
      pathname: "/adm/form/detail",
      state: {
        formation: formationAAfficher
      },
      query: null,
      key: null
    };

    this.history.push(segment);
  }

  render() {
    return [
      <div class="form-search container">
        <h1 class="title">Recherche de formation(s)</h1>
        <div class="columns is-centered">
          <div class="column is-half ">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  class="input is-primary is-rounded"
                  type="text"
                  placeholder="Par code ou par nom."
                  ref={el => (this.barreRecherche = el)}
                />
              </div>
              <div class="control">
                <div class="select is-primary">
                  <select ref={el => (this.choixTypeRecherche = el)}>
                    <option value="code">Par code</option>
                    <option value="nom">Par nom</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <a class="button is-primary is-rounded" onClick={() => this.lancerRecherche()}>
                  Rechercher
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <br />,
      <div class="form-search container">
        <div class="columns is-multiline is-centered">
          {this.resultats.map(formation => {
            return (
              <div class="column is-4">
                <div class="box green" onClick={() => this.afficherDetailDe(formation)}>
                  <h1 class="title">{formation.nomFormation}</h1>
                  <h2 class="subtitle">({formation.codeFormation})</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ];
  }
}
