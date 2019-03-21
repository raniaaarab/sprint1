import { Component } from "@stencil/core";

@Component({
  tag: "adm-home",
  styleUrl: "adm-home.scss"
})
export class AdmHome {
  render() {
    return (
      <div class="adm-home">
        <div class="container is-large has-text-centered">
          <h1 class="title is-bold">
           <br></br> Bienvenue dans le module d'ADMinistration du SPI ! 
          </h1>
        </div>
      </div>
    );
  }
}
