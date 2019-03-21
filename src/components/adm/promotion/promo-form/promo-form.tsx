import { Component, Prop, State } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import { API_URL, END_POINT, CONTRAINTES_VALIDATION } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";
import { Promotion } from "../../../../global/promotion";
import { Formation } from "../../../../global/formation";

@Component({
  tag: "promo-form",
  styleUrl: "promo-form.scss"
})
export class PromoForm {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @Prop() isEditMode = false;
  @Prop() promotion: Promotion = { id: {} } as Promotion;
  @State() codesFormations: [];

  formulaire: HTMLFormElement;

  componentDidLoad() {
    if (this.isEditMode) {
      this.toggleEdit();
      this.getCodeFormation();
    }
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

  delete() {
    fetch(API_URL + END_POINT.ADM.PROMOTIONS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.promotion)
    })
      .then(response => checkStatus(response))
      .then(() => this.goBack())
      .catch(error => new Error(error));
  }

  submit() {
    if (this.formulaire.checkValidity()) {
      fetch(API_URL + END_POINT.ADM.PROMOTIONS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.promotion)
      })
        .then(response => checkStatus(response))
        .then(() => this.goBack())
        .catch(error => new Error(error));
    } else {
      this.formulaire.reportValidity();
    }
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

  handleInput(e, isId?) {
    let element = e.target;
    let field = element.dataset["field"];

    if (isId) {
      this.promotion.id[field] = element.value;
    } else {
      this.promotion[field] = element.value;
    }
  }

  goBack(): any {
    this.history.push("/adm/promo", {});
  }

  getCodeFormation() {
    fetch(API_URL + END_POINT.ADM.FORMATIONS)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.codesFormations = json.map((item: Formation) => item.codeFormation) || []))
      .catch(error => console.log("Error while loading formations: " + error.message));
  }

  render() {
    if (this.promotion != null) {
      return (
        <div class="container box">
          <form ref={el => (this.formulaire = el)}>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Code formation</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    {!this.isEditMode ? (
                      <input
                        class="input"
                        type="text"
                        placeholder="code formation"
                        value={this.promotion.id.codeFormation}
                        readOnly
                      />
                    ) : (
                      <div class="select">
                        <select data-field="codeFormation" onInput={e => this.handleInput(e, true)} required>
                          {this.codesFormations.map(code => {
                            return <option value={code}>{code}</option>;
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Année universitaire</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="annee universitaire"
                      value={this.promotion.id.anneeUniversitaire}
                      data-field="anneeUniversitaire"
                      onInput={e => this.handleInput(e, true)}
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Date rentrée</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="date"
                      placeholder="date rentrée"
                      value={this.promotion.dateRentree}
                      data-field="dateRentree"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Date rentrée LALP</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="date"
                      placeholder="date rentrée LALP"
                      value={this.promotion.dateReponseLalp}
                      data-field="dateReponseLalp"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Date rentrée LP</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="date"
                      placeholder="date rentrée LP"
                      value={this.promotion.dateReponseLp}
                      data-field="dateReponseLp"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Lieu rentrée</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="lieu rentrée"
                      value={this.promotion.lieuRentree}
                      data-field="lieuRentree"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Sigle promotion</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="sigle promotion"
                      value={this.promotion.siglePromotion}
                      data-field="siglePromotion"
                      onInput={e => this.handleValidity(e, CONTRAINTES_VALIDATION.SIGLE_PROMOTION)}
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">NB étudiants max</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="number"
                      placeholder="nombre max"
                      value={this.promotion.nbMaxEtudiant}
                      data-field="nbMaxEtudiant"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Processus stage</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="tel"
                      placeholder="état recherche stage"
                      value={this.promotion.processusStage}
                      data-field="processusStage"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {this.isEditMode ? (
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <span class="button is-info is-outlined">
                    <stencil-route-link url="/adm/promo" activeClass="none">
                      Annuler
                    </stencil-route-link>
                  </span>
                </p>
                <p class="control">
                  <input
                    type="button"
                    class="button is-primary is-outlined"
                    onClick={() => this.submit()}
                    value="Enregistrer"
                  />
                </p>
              </div>
            ) : (
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <span class="button is-info is-outlined">
                    <stencil-route-link url="/adm/promo" activeClass="none">
                      Retour
                    </stencil-route-link>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-danger is-outlined" onClick={() => this.delete()}>
                    <span>Delete</span>
                    <span class="icon is-small">
                      <i class="fas fa-times" />
                    </span>
                  </a>
                </p>
              </div>
            )}
          </form>
        </div>
      );
    }
  }
}
