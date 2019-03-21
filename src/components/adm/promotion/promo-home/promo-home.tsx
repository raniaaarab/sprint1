import { Component, State, Prop, Listen } from "@stencil/core";
import { RouterHistory } from "@stencil/router";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
import { Promotion } from "../../../../global/promotion";

@Component({
  tag: "promo-home",
  styleUrl: "promo-home.scss"
})
export class FormHome {
  @Prop() history: RouterHistory;
  @State() promotions: Promotion[] = [];
  @State() displayNotif = false;

  componentWillLoad() {
    this.loadData();
  }

  @Listen("promotionSupprime")
  displayNotifOnDelete() {
    this.loadData().then(() => (this.displayNotif = true));
  }

  loadData() {
    return fetch(API_URL + END_POINT.ADM.PROMOTIONS)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.promotions = json || []))
      .catch(error => console.log("Error while loading promotions: " + error.message));
  }

  render() {
    return (
      <div class="promo-home container">
        <h1 class="title">Promotions</h1> <br />
        {this.displayNotif ? (
          <div class="columns is-centered">
            <div class="column is-4">
              <article class="message is-success">
                <div class="message-header">
                  <p>Success</p>
                  <button class="delete" aria-label="delete" onClick={() => (this.displayNotif = false)} />
                </div>
                <div class="message-body">Les informations de la promotion ont été supprimées avec succès.</div>
              </article>
            </div>
          </div>
        ) : (
          ""
        )}
        <promo-table promotions={this.promotions} history={this.history} />
      </div>
    );
  }
}
