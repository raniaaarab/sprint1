import { Component, State, Listen, Prop } from "@stencil/core";

import { checkStatus } from "../../../../global/utils";
import { Etudiant } from "../../../../global/etudiant";
import { Promotion } from "../../../../global/promotion";
import { Formation } from "../../../../global/formation";
import { END_POINT } from "../../../../global/constantes";
import { MatchResults } from "@stencil/router";

@Component({
  tag: "etu-home",
  styleUrl: "etu-home.scss"
})
export class EtuHome {
  [x: string]: any;
  @Prop() match: MatchResults;
  @State() etudiants: Etudiant[] = [];
  @State() promotions: Promotion[] = [];
  @State() formations: Formation[] = [];
  @State() displayNotif = false;
  @State() header ="Erreur de suppression!";
  @State() msg = "";
  @State() d: any =[];
  

  componentWillLoad() {
    this.loadData();
  }

  @Listen("etudiantSupprime")
  displayNotifOnDelete(e) {
    this.loadData().then(() => {
      this.d = e.detail.message;
          if (this.d.startsWith("Er")) {
            this.class = "message is-danger"
            this.header = "Erreur Suppress"
            this.msg=e.detail.message
            this.displayNotif = true;


          } else {
           
            this.header = "Suppression resussite."

            this.class = "message is-success"
            
            this.msg=e.detail.message
            this.displayNotif = true;
          }
      });
}

  loadData() {
    
    return fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io" + END_POINT.ADM.ETUDIANTS + this.match.params.codeFormation +"/" + this.match.params.anneUniversitaire)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.etudiants = json || []))
      .then(e=> this.d = console.log(e))
      .catch(error => console.log("Error while loading etudiants: " + error.message));
  }

  render() {
    
    return (
     
      <section id="cont1" class="etu-home section text-is-centered">
        <div class="container">
       
         

           <a href="/evae/for"><i class="fas fa-long-arrow-alt-left fa-5x"></i></a>
          <h1 class="title is-1 has-text-centered">{this.match.params.codeFormation +" -  "+ this.match.params.anneUniversitaire} </h1> <br />
          {this.displayNotif ? (
            <div class="columns is-centered">
              <div class="column is-4">
              <article class ={this.class}>
                  <div class="message-header">
                    <p>{this.header}</p>
                    <button class="delete" aria-label="delete" onClick={() => (this.displayNotif = false)} />
                  </div>
                  <div class="message-body" id="erroemsg">{this.msg}</div>
                </article>
              </div>
            </div>
          ) : (
            ""
          )}
          <div class="columns is-multiline is-centered">
            {this.etudiants.map(etudiant => {
              return (
                <div class="column is-4">
                  <div class="r">
                  <etu-card etudiant={etudiant} /><br></br>
                    
                    </div>
                    

                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
