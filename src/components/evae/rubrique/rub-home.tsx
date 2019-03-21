import { Component, State, Listen, Prop,Event } from "@stencil/core";
import { Rubrique } from "../../../global/rubrique";
import { MatchResults, RouterHistory } from "@stencil/router";
import { checkStatus } from "../../../global/utils";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
  tag: "rub-home",
  styleUrl: "rub-home.scss"
})

export class RubHome {
  @State() rubriques: Rubrique[] = [];
  @State() displayNotif = false;
  @State() modeAjout :boolean = false;

  designation:string;
  ordre:number;
  type:string;
  state: number = 0;

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @Prop({ mutable: true }) isEditMode = true;
  @Prop() rubrique: Rubrique = {} as Rubrique;
  @Event() rubriqueSupprime : EventEmitter;

  //variables du message de suppression
    @State() msg = "";
    @State() d: string;
    @State() class: string;
    @State() header: string = "";

  formulaire: HTMLFormElement;
  switchedToEdit = true;

  componentWillLoad() {
    this.loadData();
  }
  enadisable(idRubrique: number) {
    
    var design = document.getElementById("designation" + idRubrique) as HTMLInputElement;
    var or = document.getElementById("ordre" + idRubrique) as HTMLInputElement;
    var ty = document.getElementById("type" + idRubrique) as HTMLInputElement;

    if (design.disabled == true ) {
     design.disabled=false;
     or.disabled=false;
     ty.disabled=false;
    }
    else {
      const designation = design.value;
      const ordre = or.value;
      const type = ty.value;
      
      const p = {
        idRubrique,
        designation,
        ordre,
        type
        
      };
      
      console.log(p);
      design.disabled = true;
      or.disabled = true;
      ty.disabled = true;
      
      fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/rubrique", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p)
      })

        .then(function (data) {
          console.log(JSON.stringify(data));
        });

    }

  } 



  post() {
    console.log("!");
      const designation = this.designation;
      const ordre = this.ordre;
      const type = this.type;
      const payload = {
        designation,
        ordre,
        type
      };
     
      console.log(this.designation);
      console.log(this.ordre);
      console.log(this.type);
      fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/rubrique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      location.reload();
    }

  toggleEdit() {
    let elements: any = document.getElementsByTagName("input");
    let allInputs = [...elements];

    allInputs
      .filter(item => !item.classList.contains("is-static"))
      .filter(item => item.Type !== "button")
      .map(item => {
        item.readOnly = !this.isEditMode;
        if (item.required) {
          item.classList.add("is-danger");
        }
      });
  }

  switchToEditMode() {
    this.isEditMode = true;
    this.switchedToEdit = true;
    this.toggleEdit();
  }

  delete(id: number) {
    fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/rubrique/Supp/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.rubrique)
    })
        .then(response => checkStatus(response))
        .then(response => response.json())
        .then((e) => this.rubriqueSupprime.emit(e))
        .catch(error => new Error(error));
        window.scrollTo(0, 0);

}
  handleValidity(e, texteContrainte): void {
    let element: HTMLInputElement = e.target;
    texteContrainte.replace("tt", "");

    if (!element.checkValidity() && element.value != "") {
      element.classList.add("is-danger");
      element.title = texteContrainte;
    } else {
      element.classList.remove("is-danger");
      element.title = "";
      this.handleInput(e);
    }
  }

  handleInput(e) {
    let element = e.target;

    let field = element.dataset["field"];

    this.rubrique[field] = element.value;
  }

  goBack(): any {
    this.history.push("/evae/rubrique", {});
  }

  @Listen("rubriqueSupprime")
    displayNotifOnDelete(e) {
        this.loadData().then(() => {
        this.d = e.detail.message;
            if (this.d.startsWith("S")) {
            this.class = "message is-success"
            this.header = "Rubrique supprimée!"
            this.displayNotif = true
            } else {

                this.class = "message is-danger"
                this.header = "Erreur de suppression!"
                this.displayNotif = true
            }
        });
    }
    loadData() {
      return fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/rubrique")

          .then(response => checkStatus(response))
          .then(response => response.json())
          .then(json => (this.rubriques = json || []))
          .catch(error => console.log("Error while loading rubriques: " + error.message));
  }

  ajouteLigne() {

    if(this.modeAjout == false){
   
    const ligne = document.createElement('tr');
    const cell = document.createElement('td');
    const i = document.createElement('input');
    i.setAttribute('class','input');
    i.disabled=true;
    cell.appendChild(i);

    const cell2 = document.createElement('td');
    const i2 = document.createElement('input');
        i2.setAttribute('type','text');
        i2.setAttribute('name','designation');
        i2.setAttribute('class','input');
        i2.setAttribute( 'onChange','{e => {this.designation = e.target.value ; console.log(e)}}');
        i2.oninput = (e : any) => {this.designation = e.target.value}

        cell2.appendChild(i2);
 
    const cell3 = document.createElement('td');
    const i3 = document.createElement('input');
    i3.setAttribute('type','text');
    i3.setAttribute('name','ordre');
    i3.setAttribute('class','input');
    i3.oninput = (e : any) => {this.ordre = e.target.value}
    cell3.appendChild(i3);
    
    const cell35 = document.createElement('td');
    const i35 = document.createElement('input');
    i35.setAttribute('type','text');
    i35.setAttribute('name','type');
    i35.setAttribute('class','input');
    
    i35.oninput = (e : any) => {this.type = e.target.value}

    cell35.appendChild(i35);

    const cell4 = document.createElement('td');
     cell4.setAttribute('colspan','2');

    const i4 = document.createElement('button');
 
   const texte = document.createTextNode('Submit');
   i4.appendChild(texte);
   i4.onclick = () => this.post();
   i4.setAttribute('class', 'button is-success is-fullwidth');
   cell4.appendChild(i4);

    ligne.appendChild(cell);
    ligne.appendChild(cell2);
    ligne.appendChild(cell3);
    ligne.appendChild(cell35);
    ligne.appendChild(cell4);

    document.getElementById('superTableau').prepend(ligne);
    this.modeAjout = true;}

  }

  render() {
    return (
      <section class="section text-is-centered">
        <div class="container">
          <div class="columns is-centered">

            <div class="column is-narrow">
            <div></div>
              <h1 class="title is-1 has-text-centered">Gestion des Rubriques
              &nbsp;&nbsp;&nbsp;
             
             <span class="icon has-text-info is-outlined" onClick={() => this.ajouteLigne()}  
             >
                         <br></br> <i class="fas fa-plus-circle fa-2x" title="cliquer pour ajouter une rubrique" id="rr" ></i>
                        </span>
                        
              </h1> 
              {this.displayNotif ? (
                        <div class="columns is-centered">
                            <div class="column is-4">
                                <article class={this.class}>
                                    <div class="message-header">
                                        <p>{this.header} </p>
                                        <button class="delete" aria-label="delete" onClick={() => (this.displayNotif = false)} />
                                    </div>
                                    <div class="message-body" id="erroemsg">{this.d}</div>
                                </article>
                            </div>
                        </div>
                    ) : (
                            ""
                        )}
             
<br></br>
              <table id="superTableau" class="table is-bordered  is-narrow is-hoverable  ">
                <thead>
                  <tr>
                    <th class="has-text-centered ">Id</th>
                    <th  class="has-text-centered">Designation</th>
                    <th class="has-text-centered">Ordre</th>
                    <th class="has-text-centered">Type</th>
                    <th colSpan={2} class="has-text-centered">Opérations</th>

                  </tr>
                </thead>

                <tbody>
                  {this.rubriques.map(rubrique =>
                    <tr>
                      <td><div class="control">
                        <input class="input" type="text" placeholder="Disabled input"
                          data-field="id"
                          onInput={e => this.handleInput(e)}
                          id={"" + rubrique.idRubrique} value={rubrique.idRubrique} disabled readOnly /> </div></td>
                      <td><div class="control">
                        <input class="input" type="text" placeholder="Disabled input"
                          data-field="designation"
                          onInput={(e: any) => { this.handleInput(e); console.log(e.target.value) }}
                          id={"designation" + rubrique.idRubrique} value={rubrique.designation} disabled />
                      </div></td>
                      <td><div class="control">
                        <input class="input" type="text" placeholder="Disabled input"
                          data-field="ordre"
                          onInput={e => this.handleInput(e)}
                          id={"ordre" + rubrique.idRubrique} value={rubrique.ordre} disabled />
                      </div></td>
                      <td><div class="control">
                        <input class="input" type="text" placeholder="Disabled input"
                          data-field="type"
                          onInput={e => this.handleInput(e)}
                          id={"type" + rubrique.idRubrique} value={rubrique.type} disabled />
                      </div></td>
                      <td><button class="button is-primary is-outlined" onClick={() => this.enadisable(rubrique.idRubrique)} >
                        <span class="icon">
                          <i class="far fa-edit"></i>
                        </span>
                        <span>Editer</span>
                      </button></td>

                      <td><button onClick={() => this.delete(rubrique.idRubrique)} class="button is-danger is-outlined">
                        <span class="icon">
                          <i class="fas fa-trash"></i>
                        </span>
                        <span>Supprimer</span>
                      </button></td>
                    </tr>


                  )}

                </tbody>
               

              </table>
              <tr>
                  <td>
                    
                    
                    
                    </td></tr>
              </div></div></div>

          

      </section>
    )
  }
}