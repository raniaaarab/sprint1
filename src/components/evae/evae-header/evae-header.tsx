import { Component } from "@stencil/core";

@Component({
  tag: "evae-header",
  styleUrl: "evae-header.scss"
})
export class EvaeHeader {
  burger!: any;
  menu!: any;

  toggleBurger() {
    this.burger.classList.toggle("is-active");
    this.menu.classList.toggle("is-active");
  }

  render() {
    return (
      <div class="evae-header">
        <nav
          class="navbar is-light has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-item">
                <span>
                 
                </span>{" "}
                <strong>SPI-EVAE</strong>
              </span>

              <a
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar-content"
                onClick={() => this.toggleBurger()}
                ref={el => (this.burger = el)}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

            <div
              id="navbar-content"
              class="navbar-menu"
              ref={el => (this.menu = el)}
            >
              <div class="navbar-start">
                <div class="navbar-item has-dropdown is-hoverable">
                  <span class="navbar-link">
                    <a href="/evae/for" >
                    <i class="fas fa-book-reader"></i>

                      &nbsp;Formation
                    </a>
                  </span>

                  <div class="navbar-dropdown">
                    <span class="navbar-item">
                      <a href="/evae/for">
                        Liste des formations
                      </a>
                    </span>
                    <span class="navbar-item">
                      <a href="/evae/for" >
                        Liste des étudiants
                      </a>
                    </span>
                    
                  </div>
                </div>


                <div class="navbar-item has-dropdown is-hoverable">
                  <span class="navbar-link">
                    <a href="/evae/qualificatif" >
                    <i class="far fa-list-alt"></i>
                      &nbsp;Couples qualificatifs
                    </a>
                  </span>


                  <div class="navbar-dropdown">
                    <span class="navbar-item">
                      <a href="/evae/qualificatif" >
                        Gestion des couples qualificatifs
                      </a>
                    </span>
                   
                  

            
              </div></div>
              
              
              
              

              <div class="navbar-item has-dropdown is-hoverable">
                  <span class="navbar-link">
                    <a  href="/evae/question" >
                    <i class="fas fa-question-circle"></i>
                     &nbsp;Questions
                    </a>
                  </span>


                  <div class="navbar-dropdown">
                    <span class="navbar-item">
                      <a href="/evae/question" >
                        Gestion des questions
                      </a>
                    </span>
                   
                  

            
              </div></div>
              
              <div class="navbar-item has-dropdown is-hoverable">
                  <span class="navbar-link">
                    <a href="/evae/rubrique" >
                    <i class="fas fa-calendar-minus"></i>
                      &nbsp;Rubriques
                    </a>
                  </span>


                  <div class="navbar-dropdown">
                    <span class="navbar-item">
                      <a href="/evae/rubrique" >
                        Gestion des Rubriques
                      </a>
                    </span>
                   
                  

            
              </div></div>
              
              
              </div>
              
              
              
              </div>



              
            </div>
          
        </nav>
      </div>
    );
  }
}
