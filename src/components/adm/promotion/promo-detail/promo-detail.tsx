import { Component, Prop } from "@stencil/core";
import { RouterHistory, MatchResults } from "@stencil/router";

@Component({
  tag: "promo-detail",
  styleUrl: "promo-detail.scss"
})
export class PromoDetail {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  render() {
    return (
      <div class="container">
        <h1 class="title">Détail de la promotion </h1>
        <div>
          <promo-form history={this.history} promotion={this.history.location.state.promotion} />
        </div>
      </div>
    );
  }
}
