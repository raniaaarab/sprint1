import { Component, State, Prop } from "@stencil/core";
import { RouterHistory, LocationSegments, MatchResults } from "@stencil/router";
import { Formation } from "../../../../global/formation";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
import { Promotion } from "../../../../global/promotion";
//import { Promotion } from "../../../../global/promotion";

@Component({
  tag: "form-home1",
  styleUrl: "form-home1.scss"
})
export class FormHome {
  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;
  @State() formations: Formation[] = [];
  @State() promotions: Promotion[] = [];
  @State() uniteenseignements: any = [];
  bgColors = ["blue", "blue", "blue", "blue"];

  /* componentDidLoad() {
     let dropdown = document.querySelector('.dropdown');
     dropdown.addEventListener('click', function (event) {
       event.stopPropagation();
       dropdown.classList.toggle('is-active');
     });
   }
 */

  componentWillLoad() {
    fetch(API_URL + END_POINT.ADM.FORMATIONS)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.formations = json || []))

      .catch(error =>
        console.log("Error while loading formations: " + error.message)

      );

  }

  getBgColor(index): string {
    let indexCouleur = Math.floor(index % 4);

    if (Math.ceil(index / 4) % 2 == 0) {
      indexCouleur = 3 - indexCouleur;
    }

    return "box " + this.bgColors[indexCouleur];
  }

  afficherDetailDe(formationAAfficher) {
    let segment: LocationSegments = {
      pathname: "/adm/form/detail",
      state: {
        formation: formationAAfficher
      },
      query: null,
      key: null
    };

    this.history.push(segment);
  }




  afficherPromotionDe(frm) {



    fetch('http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/Promotion/For/' + frm)


      .then(response => response.json())
      .then(data => {
        this.promotions = data;

        console.log(this.promotions);
      });
  }


  afficherUE(UE) {



    fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/ue/" + UE)


      .then(response => response.json())
      .then(data => {
        this.uniteenseignements = data;

        console.log(this.uniteenseignements);
      });
  }



  render() {
    return (
      <div class="p">
        <div class="form-home container ">
          <br></br>
          <h1 class="title">Formations de l'établissement</h1> <br />
          <div class="columns is-mobile is-multiline ">

            {this.formations.map((formation, index) => {
              return (
                <div class="column is-3">
                  <div
                    class={this.getBgColor(index)}

                  >
                    <h1 class="title">{formation.nomFormation}</h1>
                    <h2 class="subtitle">({formation.codeFormation})</h2>


                    <div class="dropdown is-hoverable">
                      <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2"

                          onMouseOver={() => this.afficherPromotionDe(formation.codeFormation)}
                        >
                          <span>Promotion</span>
                          <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>

                          </span>
                        </button>
                      </div>
                      <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                        <div class="dropdown-content">
                        
                          {this.promotions.map((prm) => {
                            return (
                              <div class="dropdown-item">
                                <a href={"/evae/etu/" + formation.codeFormation + "/" + prm.id.anneeUniversitaire}>{prm.id.anneeUniversitaire}</a>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>


                    <br></br><br></br>

                    <div class="button is-active">

                    <a  id="lien" href={"/evae/for/ue/" + formation.codeFormation}>  Unités d'enseignements </a>
                  
                  </div>
                    {/* <div class="dropdown is-hoverable is-small">
                      <div class="dropdown-trigger is-small">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"
                          onMouseOver={() => this.afficherUE(formation.codeFormation)}
                        >
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
                                <div class="dropdown-item is-small">
                                    <ue-content uniteenseignement={uniteenseignement} />
                                </div>
                              );
                            })}

                          </aside>
                        </div>
                      </div>
                    </div>
 */}
















                  </div>


                </div>
              );
            })}
          </div>
        </div><br></br><br></br><br></br>
      </div>
    );
  }
}