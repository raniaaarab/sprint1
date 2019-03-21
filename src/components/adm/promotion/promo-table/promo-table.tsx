import { Component, Prop, EventEmitter, Event } from "@stencil/core";
import { LocationSegments, RouterHistory } from "@stencil/router";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
import { Promotion } from "../../../../global/promotion";

@Component({
  tag: "promo-table",
  styleUrl: "promo-table.scss"
})
export class PromoTable {
  @Prop() history: RouterHistory;
  @Prop() promotions: Promotion[] = [];

  @Event() promotionSupprime: EventEmitter;

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

  delete(promotion) {
    fetch(API_URL + END_POINT.ADM.PROMOTIONS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promotion)
    })
      .then(response => checkStatus(response))
      .then(() => this.promotionSupprime.emit())
      .catch(error => new Error(error));
  }

  render() {
    return (
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>
              <abbr title="Sigle promotion">Sigle</abbr>
            </th>
            <th>Date rentrée</th>
            <th>Lieu rentrée</th>
            <th>
              <abbr title="Nombre max d'étudiants">NB max</abbr>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>
              <abbr title="Sigle promotion">Sigle</abbr>
            </th>
            <th>Date rentrée</th>
            <th>Lieu rentrée</th>
            <th>
              <abbr title="Nombre max d'étudiants">NB max</abbr>
            </th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <tbody>
          {this.promotions.map(promotion => {
            return (
              <tr>
                <th>{promotion.siglePromotion}</th>
                <td>{promotion.dateRentree}</td>
                <td>{promotion.lieuRentree}</td>
                <td>{promotion.nbMaxEtudiant}</td>
                <td>
                  <div class="field is-grouped">
                    <p class="control">
                      <a class="button is-primary" onClick={() => this.afficherDetailDe(promotion)}>
                        <span class="icon">
                          <i class="fas fa-info-circle" />
                        </span>
                      </a>
                    </p>
                    <p class="control">
                      <a class="button is-danger" onClick={() => this.delete(promotion)}>
                        <span class="icon">
                          <i class="fas fa-trash-alt" />
                        </span>
                      </a>
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
