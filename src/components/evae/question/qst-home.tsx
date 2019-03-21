import { Component, State, Listen, Prop, EventEmitter, Event } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import { checkStatus } from "../../../global/utils";
import { Qualificatif } from './../../../global/qualificatif';
import { Questions } from "../../../global/question";


@Component({
    tag: 'qst-home',
    styleUrl: 'qst-home.scss'
})
export class QstHome {
  @State() questions: Questions[] = [];
  @State() qualificatifs: Qualificatif [] = [];
  @State() displayNotif = false;
  @State() modeAjout: Boolean =false;

  intitulestr: string = "intitule";
  typestr: string = "type";
  idq:number;


  state: number = 0;
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @Prop({ mutable: true }) isEditMode = false;
  @State() question: any;
  @State() SelectValue: number;
  @State() id : number;
  @State() qualificatif : any;

  @Event() QuestionSupprime: EventEmitter;

    @State() msg = "";
    @State() d: string;
    @State() err: string = "Question supprimée.";
    @State() class: string;

  formulaire: HTMLFormElement;
  switchedToEdit = true;
  @State() selectedReceiverIds: number[] = [];
  @State() header: string = "";
    
    @Listen("QuestionSupprime")
    displayNotifOnDelete(e) {
        this.loadData().then(() => {
        this.d = e.detail.message;
            if (this.d.startsWith("S")) {
            this.class = "message is-success"
                this.header = "Suppression resussite."
                this.displayNotif = true
            } else {
                this.class = "message is-danger"
                this.header = "Erreur de suppression!"
                this.displayNotif = true
            }
        });
    }
  
    componentWillLoad() {
      this.loadData();
      this.loadDataCC();
    }

    enadisable(idQuestion) {
      //console.log(id);
      var intitule1 = document.getElementById("intitule" + idQuestion) as HTMLInputElement;
      var type1 = document.getElementById("type" + idQuestion) as HTMLInputElement;
      var coupleQualif = document.getElementById("cc" + idQuestion) as HTMLInputElement;
      

      if (intitule1.disabled == true && type1.disabled == true && coupleQualif.disabled == true ) {
        intitule1.disabled = false;
        type1.disabled = false;
        coupleQualif.disabled = false;
        
      }
      else {
        this.isEditMode=false;
        const intitule = intitule1.value;
        const type = type1.value;

        const qualificatif = JSON.parse(coupleQualif.value);
  
        const p = {
            
            
            idQuestion,
            qualificatif,
            intitule,
            type
            
  
        };

        console.log("Ajouter : ");
        console.log(p);
        intitule1.disabled = true;
        type1.disabled = true;
        coupleQualif.disabled = true ;
        fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/question", {
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
        const intitule = this.intitulestr;
        const type = this.typestr;
        const qualificatif= this.qualificatif;
        
        const payload = {
            intitule,
            
            qualificatif,
            type
        };
       console.log(payload);
       
        fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
  
          .then(function (data) {
            console.log(JSON.stringify(data));
          });
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
        fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/question/Supp/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.question)
        })
            .then(response => checkStatus(response))
            .then(response => response.json())
            .then((e) => this.QuestionSupprime.emit(e))
            .catch(error => new Error(error));
            window.scrollTo(0, 0);
    }
  
    
  
    handleValidity(e): void {
      let element: HTMLInputElement = e.target;
  
      if (!element.checkValidity() && element.value != "") {
        element.classList.add("is-danger");
      } else {
        element.classList.remove("is-danger");
        this.handleInput(e);
      }
    }
  
    handleInput(e) {
      let element = e.target;
  
      let field = element.dataset["field"];
  
      this.question[field] = element.value;
    }
  
    goBack(): any {
      this.history.push("/evae/question", {});
    }

    loadData() {
        return fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/question")

            .then(response => checkStatus(response))
            .then(response => response.json())
            .then(json => (this.questions = json || []))
            .catch(error => console.log("Error while loading questions: " + error.message));
    }

  
    loadDataCC() {
        return fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/qualificatif")
          .then(response => checkStatus(response))
          .then(response => response.json())
          .then(json => (this.qualificatifs = json || []))
          .then(a => console.log(a))
          .catch(error => console.log("Error while loading qualificatifs: " + error.message)) 
          .then(()=> this.qualificatif=this.qualificatifs[0]);        
      }
      
  
      ajouteLigne() {

        if(this.modeAjout == false){
          
    
        
        
        const ligne = document.createElement('tr');
        const cell = document.createElement('td');
        const i = document.createElement('input');
        i.setAttribute('class','input');
        i.disabled=true;
        cell.appendChild(i);
  
        //ajout de la 2eme case celle des questions
        const cell2 = document.createElement('td');
        const i2 = document.createElement('input');
       i2.setAttribute('type','text');
       i2.setAttribute('name','intitule');
       i2.setAttribute('class','input');
       i2.oninput = (e : any) => {this.intitulestr = e.target.value }
       cell2.appendChild(i2);
  
      //ajout de la 3ème case celle des types 
     
        const cell3 = document.createElement('td');
        const i3 = document.createElement('input');
        i3.setAttribute('type','text');
        i3.setAttribute('name','type');
        i3.setAttribute('class','input');
        i3.oninput = (e : any) => {this.typestr = e.target.value}
        cell3.appendChild(i3);
  
  
      //ajout de la 4ème case celles des couples qualificatifs 
        const celltd = document.createElement('td');
        const celldiv = document.createElement('div');
        celldiv.setAttribute('class','select');
        celltd.appendChild(celldiv);
        const cellselect = document.createElement('select');
        celldiv.appendChild(cellselect);
       
        cellselect.onchange=(event:any) => {this.qualificatif=JSON.parse(event.target.value) ;console.log("hh" + this.qualificatif)} ;

        {this.qualificatifs.map((qualif) => 
        {const celloption = document.createElement('option');
        
        celloption.value = JSON.stringify(qualif);
        celloption.innerHTML = "<br></br>" +qualif.maximal + " / " + qualif.minimal;
        cellselect.appendChild(celloption);
        })}
        
        const cell5 = document.createElement('td');
        cell5.setAttribute('colspan','2');
        const i5 = document.createElement('button');
        const texte = document.createTextNode('Submit');
        i5.appendChild(texte);
        i5.onclick = () => this.post();
        i5.setAttribute('class', 'button is-success is-fullwidth');
        cell5.appendChild(i5);
  
        ligne.appendChild(cell);
        ligne.appendChild(cell2);
        ligne.appendChild(cell3);
        ligne.appendChild(celltd);
        ligne.appendChild(cell5);
  
        document.getElementById('superTableau').prepend(ligne);
        this.modeAjout = true;}
    
      }
  
    handleSelect(event) {
        this.id=event.target.value;
        console.log(" lets see" +event.target.value);
      }
  
    render() {
      return (
  
  
        <section class="section text-is-centered">
          <div class="container">
            <div class="columns is-centered">
  
              <div class="column is-narrow">
              <h1 class="title is-1 has-text-centered">Gestion des Questions
              &nbsp;&nbsp;&nbsp;
             
             <span class="icon has-text-info is-outlined" onClick={() => this.ajouteLigne()}  
             >
                         <br></br> <i class="fas fa-plus-circle fa-2x" title="cliquer pour ajouter une question" id="rr"></i>
                        </span>
                        
              
              </h1> 
                <br />

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
  
                <table id="superTableau" class="table is-bordered  is-narrow is-hoverable ">
                  <thead>
                    <tr>
                      <th  class="has-text-centered">Id</th>
                      <th  class="has-text-centered">Intitule</th>
                      <th  class="has-text-centered">Type</th>
                      <th  class="has-text-centered">Couple qualificatif</th>
                      <th colSpan={2}  class="has-text-centered">Opérations</th>
                  
  
  
                    </tr>
                  </thead>
  
                  <tbody>
                    {this.questions.map(question => 
                      <tr>
                        <td><div class="cotnrol">
                          <input class="input" type="text" placeholder="Disabled input" 
                            data-field="id"
                            onInput={e => this.handleInput(e)}
                            id={"" + question.idQuestion} value={question.idQuestion} disabled readOnly /> </div></td>
                        <td><div class="control">
                          <input class="input" type="text" placeholder="Disabled input" 
                            
                            onInput={(e: any) => { question.intitule = e.target.value }}
                            id={"intitule" + question.idQuestion} value={question.intitule} disabled />
                        </div></td>
                        <td><div class="control">
                          <input class="input" type="text" placeholder="Disabled input"
                            
                            onInput={(e:any) => {question.type =e.target.value ; console.log(e.target.value)}}
                            id={"type" + question.idQuestion} value={question.type} disabled />
                        </div></td>
                        
                       <td>
                                                    <div   class="select">
                                                <select id={"cc" + question.idQuestion} disabled onChange={(event:any) => this.qualificatif=JSON.parse(event.target.value)}>
                                                    {this.qualificatifs.map((qualif) => (
                                                        
                                                        <option value={JSON.stringify(qualif)} selected=
                                                            {qualif.idQualificatif == question.qualificatif.idQualificatif ? true : false}  >
                                                            {qualif.maximal + " / " + qualif.minimal}</option>
                                                     ))}
                                                </select>
                                            </div>
                                            </td>
                            
                        <td><button class="button is-primary is-outlined" onClick={() => this.enadisable(question.idQuestion)} >
                          <span class="icon">
                            <i class="far fa-edit"></i>
                          </span>
                          <span>Editer</span>
                          
                        </button></td>
                        
  
                        <td><button onClick={() => this.delete(question.idQuestion)} class="button is-danger is-outlined">
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