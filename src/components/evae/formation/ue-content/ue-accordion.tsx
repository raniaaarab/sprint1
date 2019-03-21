

import { Component, Prop, State } from "@stencil/core";
import { checkStatus } from "../../../../global/utils";
import { MatchResults } from "@stencil/router";
import bulmaAccordion from '../../../../../node_modules/bulma-extensions/bulma-accordion/dist/js/bulma-accordion.js'


@Component({
    tag: 'ue-accordion',
    styleUrl: "ue-content.scss"
})
export class UeAccordion {

    @Prop() match: MatchResults;
    @State() uniteenseignements: any = [];

    @State() elementsconstitutifs: any = [];
     accordions;


    
   


    componentWillLoad() {
        fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/ue/" + this.match.params.codeformation)
            .then(response => checkStatus(response))
            .then(response => response.json())
            .then(json => (this.uniteenseignements = json || []))
            .then(a => console.log("ue par code for" + a))
            .catch(error => console.log("Error while loading unites enseignements: " + error.message))
            .then(()=>this.accordions = bulmaAccordion.attach());

    }


    SearchEc(codeFormation, codeue) {



        fetch("https://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/ec/" + codeFormation + "/" + codeue)


            .then(response => response.json())
            .then(data => {
                this.elementsconstitutifs = data;
                console.log(this.elementsconstitutifs)

                console.log("ec avec s  " + this.elementsconstitutifs);
            });
    }

    render() {
        
        return (
            <div class="form-home container">
            <br></br>
            
            


                <section class="accordions">


                <h1 class="title is-2">Les UEs de la formation {this.match.params.codeformation}</h1> <br />

                {this.uniteenseignements.length==0 ? 
            
                

            <div class="form-home container">
        <br/><br/><br/>
            <article class="message is-info">
                <div class="message-header">
                    <p>Oups!</p>
                    <a href="/evae/for" >
                    <button class="delete" aria-label="delete"></button>
                      </a>
                    
                </div>
                <div class="message-body">
                    La formation. <strong>{this.match.params.codeformation}</strong>, ne contient aucune unité d'enseignement. Pensez à la remplir?!
</div>
            </article>
            <br/><br/><br/><br/><br/><br/>
        </div>
        :
        <br/>
}
                    {this.uniteenseignements.map(uniteenseignement => 

                            <article class="accordion ">
                                <div class="accordion-header ">
                                    <p> {uniteenseignement.designation}</p>
                                    {/*<button class="toggle" aria-label="toggle"></button>*/}
                                    <button class="toggle" aria-label="toggle" onClick={() => this.SearchEc(uniteenseignement.id.codeFormation, uniteenseignement.id.codeUe)}></button>

                                </div>

                                <div class="accordion-body">

                                    {this.elementsconstitutifs.length == 0 ?



                                        <div class="accordion-content">
                                            Pas d'élements constitutifs dans cette unité d'enseignement
</div>


                                        :

                                        this.elementsconstitutifs.map(elementconstitutif => {

                                            return (


                                                <div class="accordion-content">
                                                    {elementconstitutif.designation} 
                                                </div>


                                            );


                                        })}
                                    
                                </div>
                            </article>



                        
                    )}




                </section>

                <br/><br/><br/>
            </div>

        );

    }
}