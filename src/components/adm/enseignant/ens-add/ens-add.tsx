import { Component, Prop } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
@Component({
  tag: "ens-add",
  styleUrl: "ens-add.scss"
})
export class EnsAdd {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  render() {
    return (
      <div class="container">
        <h1 class="title">Ajout d'un nouvel enseignant</h1> <br />
        <ens-form history={this.history} is-edit-mode />
      </div>
    );
  }
}
