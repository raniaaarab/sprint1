import { Component, Prop } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
@Component({
  tag: "form-add",
  styleUrl: "form-add.scss"
})
export class FormAdd {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  render() {
    return (
      <div class="container">
        <h1 class="title">Ajout d'une nouvelle formation</h1> <br />
        <form-form history={this.history} is-edit-mode />
      </div>
    );
  }
}
