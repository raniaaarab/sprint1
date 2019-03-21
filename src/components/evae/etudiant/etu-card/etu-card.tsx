import { Component, Prop, EventEmitter, Event } from "@stencil/core";
import { API_URL } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";


@Component({
  tag: "etu-card",
  styleUrl: "etu-card.scss"
})
export class EtuCard {
  @Prop() etudiant: any = [];

  @Event() etudiantSupprime: EventEmitter;
  match: any;

  delete(no) {
    fetch(API_URL + "/etudiants/delete/" + no, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.etudiant)
    })
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then((e) => this.etudiantSupprime.emit(e))
      window.scrollTo(0, 0);

  }

 

  render() {
    return (

      
      <div class="card">

        <header class="card-header has-background-light">
          
          <p class="card-header-title  is-centered  title is-4">
          {this.etudiant.sexe == "M" ? <img src="https://img.icons8.com/color/48/000000/student-male.png"></img> : <img src="https://img.icons8.com/color/48/000000/student-female.png"></img>}
           <b> {this.etudiant.prenom}  {this.etudiant.nom}</b>
          </p>
         
        </header>
       
        <div class="card-content has-background-light">
          <div class="content ">

            <i class="far fa-envelope"></i><b>&nbsp;&nbsp; Mail personnel: </b>{this.etudiant.email}<br></br>
            <i class="fas fa-at"></i><b>&nbsp;&nbsp; Mail UBO: </b>{this.etudiant.emailUbo}<br></br>
            &nbsp;<i class="fas fa-mobile-alt"></i><b>&nbsp;&nbsp; Mobile: </b>{this.etudiant.mobile}<br></br>
            <i class="fas fa-city"></i><b>&nbsp; Ville: </b>{this.etudiant.ville}<br></br>
            <i class="fas fa-university"></i><b>&nbsp;&nbsp; Université d'origine: </b>{this.etudiant.universiteOrigine}

          </div>
        </div>
        <footer class="has-text-centered has-background-light">

          <span>
            <p>

              <a class="button is-dark is-rounded" onClick={() => this.delete(this.etudiant.noEtudiant)} >
            
                <span class="icon">
                  <i class="far fa-trash-alt"></i>
                </span>
                <span>Supprimer</span>
              </a>


            </p>
          </span>
          <br></br>
        </footer>
      </div >
    );
  }
}
