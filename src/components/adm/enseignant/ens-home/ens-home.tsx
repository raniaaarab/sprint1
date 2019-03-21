import { Component, State, Listen } from "@stencil/core";
import { Enseignant } from "../../../../global/enseignant";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";

@Component({
  tag: "ens-home",
  styleUrl: "ens-home.scss"
})
export class EnsHome {
  @State() enseignants: Enseignant[] = [];
  @State() displayNotif = false;

  componentWillLoad() {
    this.loadData();
  }

  @Listen("enseignantSupprime")
  displayNotifOnDelete() {
    this.loadData().then(() => (this.displayNotif = true));
  }

  loadData() {
    return fetch(API_URL + END_POINT.ADM.ENSEIGNANTS)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.enseignants = json || []))
      .catch(error => console.log("Error while loading enseignants: " + error.message));
  }

  render() {
    return (
      <section id="cont" class="ens-home section">
        <div class="container">
        <br></br>
          <h1 class="title">Enseignants de l'établissement</h1> <br />
          {this.displayNotif ? (
            <div class="columns is-centered">
              <div class="column is-4">
                <article class="message is-success">
                  <div class="message-header">
                    <p>Success</p>
                    <button class="delete" aria-label="delete" onClick={() => (this.displayNotif = false)} />
                  </div>
                  <div class="message-body">Les informations de l'enseignant ont été supprimées avec succès.</div>
                </article>
              </div>
            </div>
          ) : (
            ""
          )}
          <div class="columns is-multiline is-centered">
            {this.enseignants.map(enseignant => {
              return (
                <div class="column is-4">
                  <ens-card enseignant={enseignant} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
