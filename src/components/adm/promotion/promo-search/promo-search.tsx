import { Component, State, Prop } from "@stencil/core";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
import { LocationSegments, RouterHistory } from "@stencil/router";
import { Promotion } from "../../../../global/promotion";

@Component({
  tag: "promo-search",
  styleUrl: "promo-search.scss"
})
export class PromoSearch {
  @Prop() history: RouterHistory;
  @State() resultats: Promotion[] = [];
  barreRecherche: HTMLInputElement;
  choixTypeRecherche: HTMLSelectElement;

  lancerRecherche() {
    if (this.choixTypeRecherche.value === "sigle") {
      this.rechercheParSigle(this.barreRecherche.value);
    } else {
      this.rechercheParLieu(this.barreRecherche.value);
    }
  }

  rechercheParSigle(siglePromotion) {
    fetch(API_URL + END_POINT.ADM.PROMOTIONS + `/sigle/${siglePromotion}`)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.resultats = json || []))
      .catch(error => console.log("Error while searching promotion by code: " + error.message));
  }

  rechercheParLieu(lieuRentree) {
    fetch(API_URL + END_POINT.ADM.PROMOTIONS + `/lieuRentree/${lieuRentree}`)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.resultats = json || []))
      .catch(error => console.log("Error while searching promotion by name: " + error.message));
  }

  afficherDetailDe(promotionAAfficher) {
    let segment: LocationSegments = {
      pathname: "/adm/promo/detail",
      state: {
        promotion: promotionAAfficher
      },
      query: null,
      key: null
    };

    this.history.push(segment);
  }

  render() {
    return [
      <div class="form-search container">
        <h1 class="title">Recherche de promotion(s)</h1>
        <div class="columns is-centered">
          <div class="column is-half ">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  class="input is-primary is-rounded"
                  type="text"
                  placeholder="Par sigle ou par lieu rentrée."
                  ref={el => (this.barreRecherche = el)}
                />
              </div>
              <div class="control">
                <div class="select is-primary">
                  <select ref={el => (this.choixTypeRecherche = el)}>
                    <option value="sigle">Par sigle</option>
                    <option value="lieu">Par lieu rentrée</option>
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
      this.resultats != null && this.resultats.length > 0 ? (
        <div class="container">
          <promo-table promotions={this.resultats} history={this.history} />
        </div>
      ) : (
        ""
      )
    ];
  }
}
