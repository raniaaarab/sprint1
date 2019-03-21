import { Component, Prop, EventEmitter, Event } from "@stencil/core";
import { Enseignant } from "../../../../global/enseignant";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";

@Component({
  tag: "ens-card",
  styleUrl: "ens-card.scss"
})
export class EnsCard {
  @Prop() enseignant: Enseignant;

  @Event() enseignantSupprime: EventEmitter;

  delete() {
    fetch(API_URL + END_POINT.ADM.ENSEIGNANTS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.enseignant)
    })
      .then(response => checkStatus(response))
      .then(() => this.enseignantSupprime.emit())
      .catch(error => new Error(error));
  }

  render() {
    return (
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-centered">
            {this.enseignant.prenom} {this.enseignant.nom}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <ul>
              <li>Mail UBO : {this.enseignant.emailUbo}</li>
              <li>Type : {this.enseignant.type}</li>
            </ul>
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">
            <stencil-route-link
              url={"/adm/ens/detail/" + this.enseignant.noEnseignant}
            >
              Detail
            </stencil-route-link>
          </span>
          <span class="card-footer-item">
            <a onClick={() => this.delete()}>Delete</a>
          </span>
        </footer>
      </div>
    );
  }
}
