import { Component } from "@stencil/core";

@Component({
  tag: "evae-home",
  styleUrl: "evae-home.scss"
})
export class EvaeHome {
  render() {
    return [
      <div class="evae-home">
        <div class="container is-large has-text-centered">
          <br></br><br></br><h1 class="title is-3 is-bold">Bienvenue dans le module d'EVAluation Enseignant du SPI! </h1>
         
        </div>
      </div>
    ];
  }
}
