import { Component } from "@stencil/core";
import { MatchResults as _ } from "@stencil/router"; // _ = !"declared but never read"

@Component({
  tag: "spi-root",
  styleUrl: "spi-root.scss"
})
export class SpiRoot {
  render() {
    return (
      <div>
        <spi-header />
        <main>
          <stencil-router id="main-router">
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="spi-home" exact={true} />
              <stencil-route url="/adm" component="adm-root" exact={true} />
              <stencil-route url="/adm/home" component="adm-home" exact={true} />
              <stencil-route url="/adm/ens" component="ens-home" exact={true} />
              <stencil-route url="/adm/ens/add" component="ens-add" exact={true} />
              <stencil-route url="/adm/ens/search" component="ens-search" exact={true} />
              <stencil-route url="/adm/ens/detail/:noEnseignant" component="ens-detail" />
              <stencil-route url="/adm/form" component="form-home" exact={true} />
              <stencil-route url="/adm/form/detail" component="form-detail" />
              <stencil-route url="/adm/form/add" component="form-add" exact={true} />
              <stencil-route url="/adm/form/search" component="form-search" exact={true} />
              <stencil-route url="/adm/promo" component="promo-home" exact={true} />
              <stencil-route url="/adm/promo/detail" component="promo-detail" />
              <stencil-route url="/adm/promo/add" component="promo-add" exact={true} />
              <stencil-route url="/adm/promo/search" component="promo-search" exact={true} />

              <stencil-route url="/evae" component="evae-root" exact={true} />
              <stencil-route url="/evae/home" component="evae-home" exact={true} />
              <stencil-route url="/evae/etu/:codeFormation/:anneUniversitaire" component="etu-home" exact={true}/>
              <stencil-route url="/evae/for" component="form-home1" exact={true} />
              <stencil-route url="/evae/for/ue/:codeformation" component="ue-accordion" exact={true} />
              <stencil-route url="/evae/qualificatif" component="quali-home" exact={true} />
              <stencil-route url="/evae/question" component="qst-home" exact={true} />
              <stencil-route url="/evae/rubrique" component="rub-home" exact={true} />
            

              
              
              
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
