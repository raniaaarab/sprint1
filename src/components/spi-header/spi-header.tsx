import { Component, State } from "@stencil/core";

@Component({
  tag: "spi-header",
  styleUrl: "spi-header.scss"
})
export class SpiHeader {
  @State() adm = false;
  @State() evae = false;
  burger!: any;
  menu!: any;

  componentDidLoad() {
    let loadingPath = window.location.pathname;

    if (loadingPath.startsWith("/adm")) {
      this.toggleADM();
    } else if (loadingPath.startsWith("/evae")) {
      this.toggleEVAE();
    } else {
      this.adm = false;
      this.evae = false;
    }
  }

  toggleBurger() {
    this.burger.classList.toggle("is-active");
    this.menu.classList.toggle("is-active");
  }

  toggleADM() {
    this.adm = true;
    this.evae = false;
  }

  toggleEVAE() {
    this.adm = false;
    this.evae = true;
  }

  render() {
    return [
      <div class="spi-header">
        <nav
          class=" navbar is-dark has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-item">
                <span class="has-text-white">
                  
                </span>{" "}
                <strong>SPI</strong>
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
                <a class="navbar-item" onClick={() => this.toggleADM()}>
                  <stencil-route-link url="/adm/home">ADM</stencil-route-link>
                </a>

                <a class="navbar-item" onClick={() => this.toggleEVAE()}>
                  <stencil-route-link url="/evae/home">EVAE</stencil-route-link>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>,

      this.adm ? <adm-header /> : "",
      this.evae ? <evae-header /> : ""
    ];
  }
}
