import { Component, Prop, EventEmitter, Event,State } from "@stencil/core";
import { Formation } from "../../../../global/formation";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
//import {UniteEnseignement} from "../../../../global/uniteenseignement";

@Component({
  tag: "form-card",
  styleUrl: "form-card.scss"
})
export class FormCard {
  @Prop() formation: Formation;

  @Event() formationSupprime: EventEmitter;

  @State() uniteenseignements: any =[] ;

  delete() {
    fetch(API_URL + END_POINT.ADM.FORMATIONS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formation)
    })
      .then(response => checkStatus(response))
      .then(() => this.formationSupprime.emit())
      .catch(error => new Error(error));
  }
  componentWillLoad(){
    fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/ue/"+this.formation.codeFormation)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.uniteenseignements = json || []))
      .then(a=> console.log("TEST"+a))
      .catch(error => console.log("Error while loading formations: " + error.message));
  }
 /* dataLoad() {
    return fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/ue/"+this.formation.codeFormation)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.uniteenseignements = json || []))
      .then(a=> console.log("TEST"+a))
      .catch(error => console.log("Error while loading formations: " + error.message));
  }*/
  /*componentDidLoad() {
    let dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown.classList.toggle('is-active');
    });   
  }*/

  render() {
    return (
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-centered">
            {this.formation.nomFormation}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <ul>
              <li>Diplome : {this.formation.diplome}</li>
              <li>Double Diplome : {this.formation.doubleDiplome}</li>
              <li>Code Formation : {this.formation.codeFormation}</li>
              <li>
              <div class="dropdown is-hoverable is-small">
  <div class="dropdown-trigger is-small">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Unités d'enseignements</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
    <aside class="menu">
      {this.uniteenseignements.map(uniteenseignement => {
              return (
                  <div>
                <a href="#" class="dropdown-item is-small">
                   <ue-content uniteenseignement={uniteenseignement} />
                   </a>
                   </div>   
              );
            })}
            
            </aside>
    </div>
  </div>




  
</div>
             </li>
            </ul>
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">
            <stencil-route-link
              url={"/adm/ens/detail/" + this.formation.codeFormation}
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