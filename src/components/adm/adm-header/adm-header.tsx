import { Component } from "@stencil/core";

@Component({
  tag: "adm-header",
  styleUrl: "adm-header.scss"
})
export class AdmHeader {
  burger!: any;
  menu!: any;

  toggleBurger() {
    this.burger.classList.toggle("is-active");
    this.menu.classList.toggle("is-active");
  }

  render() {
    return (
      <div class="adm-header">
        <nav
          class="navbar is-warning has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-item">
                <span>
                  <i class="fas fa-tools" />
                </span>{" "}
                <strong>SPI-ADM</strong>
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
                    <stencil-route-link url="/adm/ens" activeClass="none">
                      Enseignant
                    </stencil-route-link>
                  </span>

                  <div class="navbar-dropdown">
                    <span class="navbar-item">
                      <stencil-route-link url="/adm/ens" activeClass="none">
                        Liste d'enseignants
                      </stencil-route-link>
                    </span>
                    <span class="navbar-item">
                      <stencil-route-link url="/adm/ens/add" activeClass="none">
                        Ajouter
                      </stencil-route-link>
                    </span>
                    <hr class="navbar-divider" />
                    <span class="navbar-item">
                      <stencil-route-link
                        url="/adm/ens/search"
                        activeClass="none"
                      >
                        Rechercher
                      </stencil-route-link>
                    </span>
                  </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable">
                  <span class="navbar-link">
                    <stencil-route-link url="/adm/form" activeClass="none">
                      Formation
                    </stencil-route-link>
                  </span>

                  <div class="navbar-dropdown">
                    <span class="navbar-item">
                      <stencil-route-link url="/adm/form" activeClass="none">
                        Liste des formations
                      </stencil-route-link>
                    </span>
                    <span class="navbar-item">
                      <stencil-route-link
                        url="/adm/form/add"
                        activeClass="none"
                      >
                        Ajouter
                      </stencil-route-link>
                    </span>
                    <hr class="navbar-divider" />
                    <span class="navbar-item">
                      <stencil-route-link
                        url="/adm/form/search"
                        activeClass="none"
                      >
                        Rechercher
                      </stencil-route-link>
                    </span>
                  </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable">
                  <span class="navbar-link">
                    <stencil-route-link url="/adm/promo" activeClass="none">
                      Promotion
                    </stencil-route-link>
                  </span>

                  <div class="navbar-dropdown">
                    <span class="navbar-item">
                      <stencil-route-link url="/adm/promo" activeClass="none">
                        Liste des promotions
                      </stencil-route-link>
                    </span>
                    <span class="navbar-item">
                      <stencil-route-link
                        url="/adm/promo/add"
                        activeClass="none"
                      >
                        Ajouter
                      </stencil-route-link>
                    </span>
                    <hr class="navbar-divider" />
                    <span class="navbar-item">
                      <stencil-route-link
                        url="/adm/promo/search"
                        activeClass="none"
                      >
                        Rechercher
                      </stencil-route-link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
