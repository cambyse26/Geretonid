<script>

import Vue from 'vue';
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
import Pdf from '@/services/PDF';

Vue.use(DisableAutocomplete);

export default {

    template: `
        <div class="modal fade" id="modal" preview="" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="modal-title" class="modal-title"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body was-validated">
                    <!-- bouton allant sur la page droit -->
                        <div class="btn-group d-flex justify-content-center">
                            <button type="button" class="mx-auto btn btn-primary" data-toggle="collapse" data-target="#info-droit" aria-expanded="false" aria-controls="info-droit" v-on:click="showInfo">Pour plus d'informations</button>
                        </div>
                        <p id="info-droit" class="collapse"></p>
                        <div class="modal-header">
                            <h5 class="modal-title">Informations sur la société</h5>
                        </div>
                        <div class="form-group" autocomplete="off">
                            <label for="organismeModal" class="col-form-label">Nom de l'organisme</label>
                            <input type="text" id="organismeModal" v-model="organisme" @change="preview" @input="organismeChanged($event);" class="form-control" placeholder="Nom de l'organisme" list="dataListOrgaModal" autocomplete="on" required>
                            <datalist id="dataListOrgaModal">
                                <option v-for="organisme in listOrganismes"
                                        v-bind:key="organisme.id">
                                    {{organisme.name_city}}
                                </option>
                            </datalist>
                        </div>
                        <div class="form-group">
                            <label for="MailorgaModal" class="col-form-label">Adresse mail</label>
                            <input class="form-control" placeholder="Adresse mail de l'organisme" @change="preview" id="MailorgaModal" v-model="email" required>
                        </div>
                        <form>
                            <div id="complementaires"></div>
                            <div class="modal-header">
                                <h5 class="modal-title">Vos informations</h5>
                            </div>
                            <div class="form-group">
                                <label for="NomModal" class="col-form-label">Nom</label>
                                <input type="text" class="form-control" @change="preview" placeholder="Votre nom" id="NomModal" required>
                            </div>
                            <div class="form-group">
                                <label for="PrenomModal" class="col-form-label">Prénom</label>
                                <input type="text" class="form-control" @change="preview" placeholder="Votre Prénom" id="PrenomModal" required>
                            </div>
                            <div class="form-group">
                                <label for="MailModal" class="col-form-label">Adresse mail</label>
                                <input class="form-control" @change="preview" placeholder="Votre adresse mail"  id="MailModal" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p>Nous ne récupérons aucune donnée</p>
                        <div class="group-btn">
                            <button type="button" id="generate-pdf" class="btn btn-primary" v-on:click="generatePDF">Generer le PDF</button>
                            <a href="mailto: " id="btn-mail" type="button" @click="changeEmail($event)" class="btn btn-primary">Envoyer par mail</a>  
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                        </div>        
                    </div>
                </div>
            </div>
            <div id="preview-modal-pdf"></div>
        </div>    
    </div>
    `,
    name: 'App', 
    data () {
        return {
            organisme: "",
            listOrganismes: [],
            email: "",
            addressZip: "",
            addressCity: ""
        }
    },
    methods: {

        //
        // gestion de la modification du <input id="Organisme">
        // - maj des infos sur l'organisme selectionné dans la liste
        // sinon
        // - maj de la datalist (via listOrganismes)
        //
        organismeChanged: function(ev) {
        
            // recupere le valeur contenu dans le input id="Organisme">
            const currentOrganisme = ev.target.value;

            console.log("organismeChanged start. currentOrganisme=" + currentOrganisme + " inputCheckedAtDom:" + ev);

            // clean other related inputs
            this.email = "";
            this.addressZip = "";
            this.addressCity = "";

            if (currentOrganisme.length > 0) {
                if (this.validOrganisme(currentOrganisme) === false) {

                    // organisme inconnu: propose une nouvelle list
                    this.updateListOrganismes(currentOrganisme);
                }
            }

            console.log("organismeChanged end");
        },

        //
        // verifie si l'organisme present est valide (connu)
        // - recuperation du id dans la liste pour obtenir les details (à revoir)
        //
        validOrganisme(currentOrganisme) {
            // TODO verifier si c'est un organisme connu (il faut une requete http get par le nom)
            // plutot que de faire un loop sur la liste dispo
            var val = currentOrganisme;
            console.log("search " + val + " in " + JSON.stringify(this.listOrganismes));
            for (var i = 0; i < this.listOrganismes.length; i++) {
                console.log("compare " + val + " with " + this.listOrganismes[i].name_city);
                if (val === this.listOrganismes[i].name_city) {
                this.updateOrganismeDetails(this.listOrganismes[i].id);
                return true;
                }
            }
            return false;
        },

        //
        // recupere la liste des orgnismes candidats via un request http
        //
        updateListOrganismes(match) {
            console.log("updateListOrganismes start");
            const baseURI = 'https://api.geretonid.com/api/company/search';
            const param = { name: match };
            const headers = {
                "Authorization":  "token 32ffef7a5e2682244a84fa2a68630da15bc6575b",
                "Content-Type": "application/json", 
                "Clear-Site-Data": "*",
            };
            axios.post(baseURI, param, { headers })
            .then((result) => {
                console.log("updateListOrganismes result " + JSON.stringify(result.data));
                var data = result.data;
                console.log({tt: 'ici', data: result.data,})
                for(var i=0; i< data.length; i++){
                    data[i].name_city = data[i].name + " (" + data[i].city + ")";
                }
                // maj listOrganismes (vue:data:listOrganismes) qui enclenche automatique la maj de la page
                this.listOrganismes = data;
            })
            console.log("updateListOrganismes end");
        },

        //
        // recupere le detail d'un orgnisme via un request http
        // 
        updateOrganismeDetails(id) {
            console.log("updateOrganismeDetails start");
            const baseURI = `https://api.geretonid.com/api/company/get/${id}`;
            const headers = {
                headers : {
                "Authorization":  "token 32ffef7a5e2682244a84fa2a68630da15bc6575b",
                } 
            };
            axios.get(baseURI, headers)
            .then((result) => {
                console.log("updateOrganismeDetails result:" + JSON.stringify(result.data));
                this.email = result.data.email;
                this.addressZip = result.data.address.zip;
                this.addressCity = result.data.address.city;
            })
            console.log("updateOrganismeDetails end");
        },
        generatePDF($this) {
            let currentOrganisme = document.getElementById('organismeModal').value;
            const values = { ...Forms.getValues('.form-control'), ...Forms.getValues('.form-select'), currentOrganisme};
            Pdf.generate($this.srcElement.dataset.pdf, values);
        },
        preview($this) {
            if (window.innerWidth > 1000) { 
                let currentOrganisme = document.getElementById('organismeModal').value;
                const values = { ...Forms.getValues('.form-control'), ...Forms.getValues('.form-select'), currentOrganisme};
                const pdf = document.getElementById('modal').getAttribute('preview');
    
                Pdf.preview(pdf, values, "#preview-modal-pdf");
                
                console.log($this.srcElement);
            }
        },

        changeEmail(e) {
            const mail = document.getElementById('MailorgaModal').value;
            if (mail === '') {
                e.preventDefault();
            }
            return document.getElementById('btn-mail').href = `mailto:${mail}`;
        },

        // getBaseUrl() {
        //     const protocol = window.location.protocol;
        //     const host = window.location.hostname === "localhost" ? window.location.host : "api.geretonid.com";
        //     return `${protocol}//${host}`;
        // },

        showInfo() {
            const droit = document.getElementById('modal-title');
            let info = document.getElementById('info-droit');
            switch(droit.innerHTML){
                case "DROIT D'ACCÈS":
                    info.innerHTML = "Obtenir l’ensemble des données qu’une société a récolté sur vous, savoir comment elle les a récolté.";
                    break;
                case "SUPPRIMER SES DONNÉES PERSONNELLES":
                    info.innerHTML = "Obliger une entreprise à supprimer vos données personnelles.";
                    break;
                case "NE PLUS RECEVOIR DE PUBLICITÉS":
                    info.innerHTML = "Exiger la suppression de vos coordonnées des fichiers d’envois de publicités de l’entreprise.";
                    break;
                case "S'OPPOSER AU TRAITEMENT DE DONNÉES":
                    info.innerHTML = "Exiger d’une entreprise l'arrêt immédiat de l’analyse, la vente de vos données. Tout traitement de vos données personnelles. De nombreux algorithmes analysent vos données personnelles récoltées afin de vous cibler, il y a de nombreuses entreprises qui revendent cette analyse à d’autres sociétés.";
                    break;
                case "STOPPER LA PROSPECTION COMMERCIALE":
                    info.innerHTML = "Oblige une société à ne plus vous contacter, elle doit ainsi supprimer vos données dans leurs fichiers d’envois / de prospection et notifier leurs partenaires de cette modification.";
                    break;
                case "SUPPRIMER DES INFORMATIONS VOUS CONCERNANT D'UN SITE INTERNET":
                    info.innerHTML = "Obliger une entreprise à supprimer des informations vous concernant d'un site internet.";
                    break;
                case "ACCÉDER À DES IMAGES VIDÉO VOUS CONCERNANT":
                    info.innerHTML = "Accéder à des images vidéos vous concernant";
                    break;
                case "CLÔTURER UN COMPTE EN LIGNE":
                    info.innerHTML = "Restituer les Données à caractère personnel contenues dans le SI suite à la demande des personnes dans un format lisible par une machine. Seules les données communiquées par les personnes doivent lui être transmises (ex : profilage exclu).";
                    break;
                case "RECTIFIER DES DONNÉES INCOMPLÈTES":
                    info.innerHTML = "Modifier des données incomplètes sur vous dans les fichiers d’une entreprise, celle-ci doit vous informer si ces données si vos données ont été communiquées à un tiers.";
                    break;
                case "RECTIFIER DES DONNÉES INEXACTES":
                    info.innerHTML = "Modifier des données inexactes vous concernant dans les fichiers d’une entreprise.";
                    break;
                case "ACCÉDER À SON DOSSIER MÉDICAL":
                    info.innerHTML = "Exiger d’obtenir l’ensemble des données qu’un établissement de santé détient.";
                    break
                case "CONNAÎTRE LES INFORMATIONS DÉTENUES PAR UN ÉTABLISSEMENT FINANCIER":
                    info.innerHTML = "L’entreprise est obligée de fournir les informations récoltées, d’envoyer une copie claire de l’ensemble des données (les zones “bloc-notes” ou “commentaires) et décrire comment les données ont été récoltées.";
                    break;
            }
        },
    }

}
</script>

<style>
.fade {
    transition: opacity 0s !important; /* annulation de la transition (bug d'affichage) */
}
</style>