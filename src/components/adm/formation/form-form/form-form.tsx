import { Component, Prop } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import { Formation } from "../../../../global/formation";
import {
  API_URL,
  END_POINT,
  CONTRAINTES_VALIDATION
} from "../../../../global/constantes";
import {
  checkStatus,
  getSelectOuiNonPourAffichage
} from "../../../../global/utils";

@Component({
  tag: "form-form",
  styleUrl: "form-form.scss"
})
export class FormForm {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @Prop({ mutable: true }) isEditMode = false;
  @Prop() formation: Formation = {} as Formation;

  formulaire: HTMLFormElement;
  switchedToEdit = false;

  componentDidLoad() {
    if (this.isEditMode) {
      this.toggleEdit();
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

  switchToEditMode() {
    this.isEditMode = true;
    this.switchedToEdit = true;
    this.toggleEdit();
  }

  delete() {
    fetch(API_URL + END_POINT.ADM.FORMATIONS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formation)
    })
      .then(response => checkStatus(response))
      .then(() => this.goBack())
      .catch(error => new Error(error));
  }

  submit() {
    if (this.formulaire.checkValidity()) {
      let method = "POST";
      if (this.switchedToEdit) {
        method = "PUT";
      }
      fetch(API_URL + END_POINT.ADM.FORMATIONS, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.formation)
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

  handleInput(e) {
    let element = e.target;

    let field = element.dataset["field"];

    this.formation[field] = element.value;
  }

  goBack(): any {
    this.history.push("/adm/form", {});
  }

  render() {
    if (this.formation != null) {
      return (
        <div class="container box">
          <form ref={el => (this.formulaire = el)}>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Code Formation</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      data-field="codeFormation"
                      value={this.formation.codeFormation}
                      onInput={e =>
                        this.handleValidity(
                          e,
                          CONTRAINTES_VALIDATION.CODE_FORMATION
                        )
                      }
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Diplôme</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="type"
                      value={this.formation.diplome}
                      data-field="diplome"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Double diplôme</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    {!this.isEditMode ? (
                      <input
                        class="input"
                        type="text"
                        placeholder="est un double diplôme ?"
                        value={getSelectOuiNonPourAffichage(
                          this.formation.doubleDiplome
                        )}
                        readOnly
                      />
                    ) : (
                      <div class="select">
                        <select
                          data-field="doubleDiplome"
                          onInput={e => this.handleInput(e)}
                        >
                          <option
                            value="O"
                            selected={this.formation.doubleDiplome === "O"}
                          >
                            Oui
                          </option>
                          <option
                            value="N"
                            selected={this.formation.doubleDiplome === "N"}
                          >
                            Non
                          </option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Nom de la formation</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nom formation"
                      value={this.formation.nomFormation}
                      data-field="nomFormation"
                      onInput={e =>
                        this.handleValidity(
                          e,
                          CONTRAINTES_VALIDATION.NOM_FORMATION
                        )
                      }
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Nombre d'année</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nombre d'année"
                      value={this.formation.n0Annee}
                      data-field="n0Annee"
                      onInput={e => this.handleInput(e)}
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Date début accréditation</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      class="input"
                      type="date"
                      value={this.formation.debutAccreditation}
                      data-field="debutAccreditation"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </p>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Date fin accréditation</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="date"
                      value={this.formation.finAccreditation}
                      data-field="finAccreditation"
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
                    <stencil-route-link url="/adm/form" activeClass="none">
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
                    <stencil-route-link url="/adm/form" activeClass="none">
                      Retour
                    </stencil-route-link>
                  </span>
                </p>
                <p class="control">
                  <a
                    class="button is-primary is-outlined"
                    onClick={() => this.switchToEditMode()}
                  >
                    <span>Edit</span>
                    <span class="icon is-small">
                      <i class="fas fa-pen" />
                    </span>
                  </a>
                </p>
                <p class="control">
                  <a
                    class="button is-danger is-outlined"
                    onClick={() => this.delete()}
                  >
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
