import { Component, Prop } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
@Component({
  tag: "promo-add",
  styleUrl: "promo-add.scss"
})
export class PromoAdd {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  render() {
    return (
      <div class="container">
        <h1 class="title">Ajout d'une nouvelle promotion</h1> <br />
        <promo-form history={this.history} is-edit-mode />
      </div>
    );
  }
}
