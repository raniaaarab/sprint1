import { Component, State, Listen, Prop,Event } from "@stencil/core";
import { Qualificatif } from "../../../../global/qualificatif";
import { MatchResults, RouterHistory } from "@stencil/router";
//import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";
@Component({
  tag: "quali-home",
  styleUrl: "quali-home.scss"
})
export class QualiHome {
  @State() qualificatifs: Qualificatif[] = [];
  @State() displayNotif = false;
  @State() modeAjout :boolean = false;
 // minstr: string = "min";
  //maxstr: string = "max";
  minimal:string;
  maximal:string;
  state: number = 0;
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @Prop({ mutable: true }) isEditMode = true;
  @Prop() qualificatif: Qualificatif = {} as Qualificatif;
  @Event() qualifSupprime : EventEmitter;

  //variables du message de suppression
  @State() msg = "";
    @State() d: string;
    @State() err: string = "Qualificatif supprimé.";
    @State() class: string;
    @State() header: string = "Erreur de suppression!";

  formulaire: HTMLFormElement;
  switchedToEdit = true;

  componentWillLoad() {
    this.loadData();
  }
  enadisable(idQualificatif: number) {
    //console.log(id);
    var minimus = document.getElementById("min" + idQualificatif) as HTMLInputElement;
    var maximus = document.getElementById("max" + idQualificatif) as HTMLInputElement;
    if (maximus.disabled == true && minimus.disabled == true) {
      maximus.disabled = false;
      minimus.disabled = false;
    }
    else {


      const maximal = maximus.value;
      const minimal = minimus.value;


      const p = {
        idQualificatif,
        maximal,
        minimal,


      };
      //console.log(id);
      console.log(p);
      minimus.disabled = true;
      maximus.disabled = true;
      fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/qualificatif", {
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
    //e.preventDefault();
     // console.log("!");
      //const maximal = e.maximal;
      const maximal = this.maximal;
      const minimal = this.minimal;

      const payload = {
        
        maximal,
        minimal
      };
     
      console.log(this.minimal);
      console.log(this.maximal);
      fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/qualificatif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
      )
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
    fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/qualificatif/Supp/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.qualificatif)
    })
        .then(response => checkStatus(response))
        .then(response => response.json())
        .then((e) => this.qualifSupprime.emit(e))
        .catch(error => new Error(error));
        window.scrollTo(0, 0);

}

  /* submit(p) {   
     const id = p.idQualificatif;
     const max = p.maximal;
     const min = p.minimal;
    
     
     const postedited = {
     id,
     max,
       min,
       
       
     };
       fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/qualificatif", {
         method: "GET",
         headers: { "Content-Type": "application/json" },
         //body: JSON.stringify(p)
       })
       .then(function(res) { 
         return res.json();
       })
       .then(function(data) {
         console.log(JSON.stringify(data));
       });
   }
   */

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

    this.qualificatif[field] = element.value;
  }

  goBack(): any {
    this.history.push("/evae/qualificatif", {});
  }

  //
  @Listen("qualifSupprime")
    displayNotifOnDelete(e) {
        this.loadData().then(() => {
        this.d = e.detail.message;
            if (this.d.startsWith("Q")) {
            this.class = "message is-success"
                this.header = "Suppression resussite."
                this.displayNotif = true
            } else {
                this.class = "message is-danger"
                this.displayNotif = true
            }
        });
    }
    loadData() {
      return fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/qualificatif")

          .then(response => checkStatus(response))
          .then(response => response.json())
          .then(json => (this.qualificatifs = json || []))
          .catch(error => console.log("Error while loading qualificatifs: " + error.message));
  }

  ajouteLigne() {

    if(this.modeAjout == false){
      

    
    
    const ligne = document.createElement('tr');
    const cell = document.createElement('td');
    const i = document.createElement('input');
    i.setAttribute('class','input');
    i.disabled=true;
    cell.appendChild(i);

    //const texte = document.createTextNode('bla bla bla');

    
    //cell.appendChild(texte);


    const cell2 = document.createElement('td');
    const i2 = document.createElement('input');
  // const i2  = document.getElementById("min");
   // console.log(i2);  
   //i2.inputMode();
   //this.qualificatif.minimal = i2.formTarget.valueOf();
   i2.setAttribute('type','text');
   i2.setAttribute('name','minimal');
   i2.setAttribute('class','input');
   i2.setAttribute( 'onChange','{e => {this.minimal = e.target.value ; console.log(e)}}');
   i2.oninput = (e : any) => {this.minimal = e.target.value}
   
   //i2.setAttribute( 'onInput','{e => this.handleInput(e)}');
    

    cell2.appendChild(i2);
 
    const cell3 = document.createElement('td');

    const i3 = document.createElement('input');
    i3.setAttribute('type','text');
    i3.setAttribute('name','maximal');
    i3.setAttribute('class','input');
    //i3.onClick( 'onChange','{e  => (console.log("tt"))}');
    i3.oninput = (e : any) => {this.maximal = e.target.value}
    
    //i3.setAttribute( 'onInput','{e => this.handleInput(e)}');
    cell3.appendChild(i3);


    /*const cell4 = document.createElement('td');

    const i4 = document.getElementById('add_line');

    cell4.appendChild(i4);*/


    const cell4 = document.createElement('td');
     cell4.setAttribute('colspan','2');

    const i4 = document.createElement('button');
  // const i2  = document.getElementById("min");
   // console.log(i2);  
   //i2.inputMode();
   //this.qualificatif.minimal = i2.formTarget.valueOf();

   const texte = document.createTextNode('Submit');
   i4.appendChild(texte);

  // i4.setAttribute( 'onClick','{() => console.log("test")}');
   i4.onclick = () => this.post();

   i4.setAttribute('class', 'button is-success is-fullwidth');
   
   cell4.appendChild(i4);
//onClick={() => this.post(this)}
    ligne.appendChild(cell);
 

    ligne.appendChild(cell2);

    ligne.appendChild(cell3);

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
              <h1 class="title is-1 has-text-centered">Gestion des Couples Qualificatifs
              &nbsp;&nbsp;&nbsp;
             
             <span class="icon has-text-info is-outlined" onClick={() => this.ajouteLigne()}  
             >
                         <br></br> <i class="fas fa-plus-circle fa-2x" title="cliquer pour ajouter un couple " id="rr"></i>
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
                    <th  class="has-text-centered">Min</th>
                    <th class="has-text-centered">Max</th>
                    <th colSpan={2} class="has-text-centered">Opérations</th>
                   

                  </tr>
                </thead>

                <tbody>
                  {this.qualificatifs.map(qualificatif =>
                    <tr>
                      <td><div class="cotnrol">
                        <input class="input" type="text" placeholder="Disabled input"
                          data-field="maximal"
                          onInput={e => this.handleInput(e)}
                          id={"" + qualificatif.idQualificatif} value={qualificatif.idQualificatif} disabled readOnly /> </div></td>
                      <td><div class="control">
                        <input class="input" type="text" placeholder="Disabled input"
                          data-field="minimal"
                          onInput={(e: any) => { this.handleInput(e); console.log(e.target.value) }}
                          id={"min" + qualificatif.idQualificatif} value={qualificatif.minimal} disabled />
                      </div></td>
                      <td><div class="control">
                        <input class="input" type="text" placeholder="Disabled input"
                          data-field="maximal"
                          onInput={e => this.handleInput(e)}
                          id={"max" + qualificatif.idQualificatif} value={qualificatif.maximal} disabled />
                      </div></td>
                      <td><button class="button is-primary is-outlined" onClick={() => this.enadisable(qualificatif.idQualificatif)} >
                        <span class="icon">
                          <i class="far fa-edit"></i>
                        </span>
                        <span>Editer</span>
                      </button></td>

                      <td><button onClick={() => this.delete(qualificatif.idQualificatif)} class="button is-danger is-outlined">
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