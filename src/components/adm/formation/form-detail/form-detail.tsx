import { Component, Prop } from "@stencil/core";
import { RouterHistory, MatchResults } from "@stencil/router";

@Component({
  tag: "form-detail",
  styleUrl: "form-detail.scss"
})
export class FormDetail {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  render() {
    return (
      <div class="container">
        <h1 class="title">Détail de la formation </h1>
        <div>
          <form-form
            history={this.history}
            formation={this.history.location.state.formation}
          />
        </div>
      </div>
    );
  }
}
