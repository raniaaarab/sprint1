import { Component, Prop, State } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import { Enseignant } from "../../../../global/enseignant";
import { API_URL, END_POINT } from "../../../../global/constantes";

@Component({
  tag: "ens-detail",
  styleUrl: "ens-detail.scss"
})
export class EnsDetail {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @State() enseignant: Enseignant;

  componentWillLoad() {
    let noEnseignant = this.match.params.noEnseignant;

    if (noEnseignant != null) {
      fetch(API_URL + END_POINT.ADM.ENSEIGNANTS + "/" + noEnseignant)
        .then(response => response.json())
        .then(json => (this.enseignant = json || []))
        .catch(error =>
          console.log("Error while loading enseignant: " + error.message)
        );
    }
  }

  render() {
    return (
      <div class="container">
        <h1 class="title">Détail de l'enseignant </h1>
        {this.enseignant ? (
          <div>
            <ens-form history={this.history} enseignant={this.enseignant} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
