import { Component, Prop } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import { Enseignant } from "../../../../global/enseignant";
import {
  API_URL,
  END_POINT,
  CONTRAINTES_VALIDATION
} from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";

@Component({
  tag: "ens-form",
  styleUrl: "ens-form.scss"
})
export class EnsForm {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @Prop() isEditMode = false;
  @Prop() enseignant: Enseignant = {} as Enseignant;

  formulaire: HTMLFormElement;

  componentDidLoad() {
    if (this.isEditMode) {
      this.toggleEdit();
    }
  }

  getGenrePourAffichage() {
    if (this.enseignant.sexe === "H") {
      return "Masculin";
    } else if (this.enseignant.sexe === "F") {
      return "Feminin";
    } else {
      return "Information non communiquée";
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
    fetch(API_URL + END_POINT.ADM.ENSEIGNANTS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.enseignant)
    })
      .then(response => checkStatus(response))
      .then(() => this.goBack())
      .catch(error => new Error(error));
  }

  submit() {
    if (this.formulaire.checkValidity()) {
      this.enseignant.emailUbo += "@univ-brest.fr";

      fetch(API_URL + END_POINT.ADM.ENSEIGNANTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.enseignant)
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

    this.enseignant[field] = element.value;
  }

  goBack(): any {
    this.history.push("/adm/ens", {});
  }

  render() {
    if (this.enseignant != null) {
      return (
        <div class="container box">
          <form ref={el => (this.formulaire = el)}>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">ID</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input is-static"
                      type="text"
                      value={this.enseignant.noEnseignant}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Type</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      maxlength="3"
                      placeholder="type"
                      value={this.enseignant.type}
                      data-field="type"
                      onInput={e => this.handleInput(e)}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Genre</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    {!this.isEditMode ? (
                      <input
                        class="input"
                        type="text"
                        placeholder="Nom"
                        value={this.getGenrePourAffichage()}
                        readOnly
                      />
                    ) : (
                      <div class="select">
                        <select
                          data-field="sexe"
                          onInput={e => this.handleInput(e)}
                        >
                          <option
                            value="M"
                            selected={this.enseignant.sexe === "M"}
                          >
                            Masculin
                          </option>
                          <option
                            value="F"
                            selected={this.enseignant.sexe === "F"}
                          >
                            Feminin
                          </option>
                          <option
                            value="N"
                            selected={this.enseignant.sexe === "N"}
                          >
                            Non définit
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
                <label class="label">Nom</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nom"
                      value={this.enseignant.nom}
                      data-field="nom"
                      onInput={e =>
                        this.handleValidity(e, CONTRAINTES_VALIDATION.NOM)
                      }
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Prénom</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Prénom"
                      value={this.enseignant.prenom}
                      data-field="prenom"
                      onInput={e =>
                        this.handleValidity(e, CONTRAINTES_VALIDATION.PRENOM)
                      }
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Email UBO</label>
              </div>
              <div class="field-body">
                {!this.isEditMode ? (
                  <div class="field">
                    <div class="control has-icons-left">
                      <input
                        class="input"
                        type="email"
                        placeholder="Email input"
                        value={this.enseignant.emailUbo}
                        readOnly
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div class="field has-addons">
                    <p class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Email"
                        value={this.enseignant.emailUbo}
                        data-field="emailUbo"
                        onInput={e =>
                          this.handleValidity(
                            e,
                            CONTRAINTES_VALIDATION.EMAIL_UBO
                          )
                        }
                        required
                      />
                    </p>
                    <p class="control">
                      <a class="button is-static">@univ-brest.fr</a>
                    </p>
                  </div>
                )}
              </div>

              <div class="field-label is-normal">
                <label class="label">Email Perso</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      class="input"
                      type="email"
                      placeholder="Email"
                      value={this.enseignant.emailPerso}
                      data-field="emailPerso"
                      onInput={e =>
                        this.handleValidity(e, CONTRAINTES_VALIDATION.EMAIL)
                      }
                      readOnly
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Téléphone</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="tel"
                      placeholder="Téléphone"
                      value={this.enseignant.telephone}
                      pattern="^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$"
                      data-field="telephone"
                      onInput={e =>
                        this.handleValidity(e, CONTRAINTES_VALIDATION.TELEPHONE)
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Mobile</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="tel"
                      placeholder="Mobile"
                      value={this.enseignant.mobile}
                      pattern="^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$"
                      data-field="mobile"
                      onInput={e =>
                        this.handleValidity(e, CONTRAINTES_VALIDATION.TELEPHONE)
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Adresse</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Adresse"
                      data-field="adresse"
                      onInput={e => this.handleInput(e)}
                      value={this.enseignant.adresse}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Code Postal</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="cp"
                      data-field="codePostal"
                      onInput={e => this.handleInput(e)}
                      value={this.enseignant.codePostal}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Ville</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Ville"
                      data-field="ville"
                      onInput={e => this.handleInput(e)}
                      value={this.enseignant.ville}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div class="field-label is-normal">
                <label class="label">Code pays</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Code pays"
                      data-field="pays"
                      maxlength="5"
                      onInput={e => this.handleInput(e)}
                      value={this.enseignant.pays}
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
                    <stencil-route-link url="/adm/ens" activeClass="none">
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
                    <stencil-route-link url="/adm/ens" activeClass="none">
                      Retour
                    </stencil-route-link>
                  </span>
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
