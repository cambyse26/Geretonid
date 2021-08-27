<script>

import Vue from 'vue';
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
import Pdf from '@/services/PDF';

Vue.use(DisableAutocomplete);

export default {

    template: `
        <div class="modal fade" id="modal" preview="" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" v-on:click="close">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="modal-title" class="modal-title"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                     <div class="modal-body"> <!-- class="was-validated" -->
                    <!-- bouton allant sur la page droit -->
                        <div class="btn-group d-flex justify-content-center">
                            <button type="button" id="infos" class="mx-auto btn btn-primary" data-toggle="collapse" data-target="#info-droit" aria-expanded="false" aria-controls="info-droit" v-on:click="showInfo">Pour plus d'informations</button>
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
                            <button type="button" id="generate-pdf" style="color: white" class="btn btn-primary" v-on:click="generatePDF">Generer le PDF</button>
                                                        <a id="btn-mail" type="button" @click="changeEmail($event)" style="color: white" class="btn btn-primary" >Envoyer par mail</a>
                            <a id="btn-gmail" type="button" @click="Gmail($event)" style="color: white" class="btn btn-primary">Gmail</a>
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
            let orgaName = document.getElementById('organismeModal').value;
            let orgaMail = document.getElementById('MailorgaModal').value;
            let prenom = document.getElementById('PrenomModal').value;
            let nom = document.getElementById('NomModal').value;
            let mail = document.getElementById('MailModal').value;
            const droit = document.getElementById('modal-title');
            console.log('mail sending');
            document.getElementById('btn-mail').target="_blank";
            switch(droit.innerHTML) {
                case "DROIT D'ACCÈS":
                    window.location.href =`mailto:${orgaMail}?subject=droit%20d'accès&body=${prenom}%20${nom}%0A%0A${mail}%0A%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AMadame%2C%20Monsieur%2C%0AJe%20vous%20prie%20de%20bien%20vouloir%20m%27indiquer%20si%20des%20donn%C3%A9es%20me%20concernant%20figurent%20dans%0Avos%20fichiers%20informatis%C3%A9s%20ou%20manuels.%0ADans%20l%27affirmative%2C%20je%20souhaiterais%20obtenir%20une%20copie%2C%20en%20langage%20clair%2C%20de%20l%27ensemble%0Ade%20ces%20et%20donn%C3%A9es%20%28y%20compris%20celles%20figurant%20dans%20les%20zones%20%C2%AB%20blocs-notes%20%C2%BB%20ou%20%C2%AB%0Acommentaires%20%C2%BB%29%20en%20application%20de%20l%27article%2015%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%0Aprotection%20des%20donn%C3%A9es%20%28RGPD%29.%0AJe%20vous%20remercie%20de%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%0Aplus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%0A12.3%20du%20RGPD%29.%0AA%20d%C3%A9faut%20de%20r%C3%A9ponse%20de%20votre%20part%20dans%20les%20d%C3%A9lais%20impartis%20ou%20en%20cas%20de%20r%C3%A9ponse%0Aincompl%C3%A8te%20je%20me%20r%C3%A9serve%20la%20possibilit%C3%A9%20de%20saisir%20la%20Commission%20nationale%20de%0Al%27informatique%20et%20des%20libert%C3%A9s%20%28CNIL%29%20d%27une%20r%C3%A9clamation.%0AA%20toutes%20fins%20utiles%2C%20vous%20trouverez%20des%20informations%20sur%20le%20site%20internet%20de%20la%20CNIL%20%3A%0Ahttps%3A%2F%2Fwww.cnil.fr%2Ffr%2Fprofessionnels-comment-repondre-une-demande-de-droit-dac%0Aces.%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%0Adistingu%C3%A9es.%0A%0A${prenom}%20${nom}`;
                    break
                case "SUPPRIMER SES DONNÉES PERSONNELLES":
                    {
                        const infos = Forms.getInfo();
                        const motif = Forms.getMotif();
                        window.location.href=`mailto:${orgaMail}?subject=Droit%20à%20l'effacement%20RGPD&body=${prenom}%20${nom}%0A%0A${mail}%0A%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Suppression%20de%20donn%C3%A9es%20personnelles%0A%0AMadame%2C%20Monsieur%2C%0A%0AEn%20application%20de%20l%27article%2017.1%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%2C%0AJe%20vous%20prie%20d%27effacer%20de%20vos%20fichiers%20les%20donn%C3%A9es%20personnelles%20suivantes%20me%20concernant%20%3A%0A%0A${infos}%0A%0AJe%20demande%20que%20ces%20informations%20soient%20supprim%C3%A9es%20car%20%3A%0A%0A${motif}%0A%0AVous%20voudrez%20bien%20%C3%A9galement%20notifier%20cette%20demande%20d%27effacement%20de%20mes%20donn%C3%A9es%20aux%20organismes%20auxquels%20vous%20les%20auriez%20communiqu%C3%A9es%20%28article%2019%20du%20RGPD%29.%0A%0AEnfin%2C%20je%20vous%20prie%20de%20m%27informer%20de%20ces%20%C3%A9l%C3%A9ments%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ce%20courrier%20%28article%2012.3%20du%20RGPD%29.%0A%0AA%20d%C3%A9faut%20de%20r%C3%A9ponse%20de%20votre%20part%20dans%20les%20d%C3%A9lais%20impartis%20ou%20en%20cas%20de%20r%C3%A9ponse%20incompl%C3%A8te%2C%20je%20me%20r%C3%A9serve%20la%20possibilit%C3%A9%20de%20saisir%20la%20Commission%20nationale%20de%20l%27informatique%20et%20des%20libert%C3%A9s%20%28CNIL%29%20d%27une%20r%C3%A9clamation.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A${prenom}%20${nom}`;
                        break
                    }
                case "NE PLUS RECEVOIR DE PUBLICITÉS":
                    window.location.href=`mailto:${orgaMail}?subject=Stopper%20la%20publicité%20Droit%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Opposition%20%C3%A0%20recevoir%20de%20la%20publicit%C3%A9%0A%0AMadame%2C%20Monsieur%2C%0A%0AConform%C3%A9ment%20aux%20dispositions%20de%20l%27article%2021.2%20du%20RGPD%2C%20je%20vous%20remercie%20de%20bien%0Avouloir%20supprimer%20mes%20coordonn%C3%A9es%20de%20vos%20fichiers%20d%27envoi%20de%20publicit%C3%A9s.%0A%0AJe%20vous%20rappelle%20que%20vous%20disposez%20d%27un%20d%C3%A9lai%20maximal%20d%27un%20mois%20suivant%20la%0Ar%C3%A9ception%20de%20ce%20courrier%20pour%20r%C3%A9pondre%20%C3%A0%20ma%20demande%2C%20conform%C3%A9ment%20%C3%A0%20l%27article%2012.3%0Adu%20RGPD.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                    break
                case "STOPPER LA PROSPECTION COMMERCIALE":
                    {
                        const identifiant = Forms.getIdentifiant();
                        window.location.href=`mailto:${orgaMail}?subject=Stopper%20la%20prospection%20commerciale%20Droit%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Opposition%20%C3%A0%20l%E2%80%99utilisation%20commerciale%20de%20mes%20coordonn%C3%A9es%0A%0Aref%3A%20${identifiant}%0A%0AMadame%2C%20Monsieur%2C%0A%0AJe%20vous%20demande%20de%20noter%20que%20je%20m%27oppose%20%C3%A0%20ce%20que%20mes%20coordonn%C3%A9es%2C%20figurant%20dans%0Avos%20fichiers%2C%20soient%20utilis%C3%A9es%20%C3%A0%20des%20fins%20de%20prospection%2C%20en%20application%20de%20l%27article%0A21.2%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%20%28RGPD%29.%0A%0AAinsi%2C%20je%20vous%20remercie%20de%20supprimer%20mes%20coordonn%C3%A9es%20de%20vos%20fichiers%20d%27envoi%20de%0Aprospection%20%28article%2017.1%20du%20RGPD%29%20et%20de%20notifier%20cette%20demande%20de%20suppression%20aux%0Apartenaires%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%0ARGPD%29.%0A%0AJe%20vous%20remercie%20de%20m%27informer%20des%20mesures%20prises%20%C3%A0%20la%20suite%20de%20ma%20demande%20dans%0Ales%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20sa%20r%C3%A9ception%0A%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                        break
                    }
                case "S'OPPOSER AU TRAITEMENT DE DONNÉES":
                   {
                        const infosTraitment = Forms.getInfo();
                        window.location.href=`mailto:${orgaMail}?subject=Suppression%20d'informations%20me%20concernant%20Droit%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Opposition%20%C3%A0%20l%E2%80%99utilisation%20commerciale%20de%20mes%20coordonn%C3%A9es%0A%0Aref%3A%20${infosTraitment}%0A%0AMadame%2C%20Monsieur%2C%0A%0AJe%20vous%20demande%20de%20noter%20que%20je%20m%27oppose%20%C3%A0%20ce%20que%20mes%20coordonn%C3%A9es%2C%20figurant%20dans%0Avos%20fichiers%2C%20soient%20utilis%C3%A9es%20%C3%A0%20des%20fins%20de%20prospection%2C%20en%20application%20de%20l%27article%0A21.2%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%20%28RGPD%29.%0A%0AAinsi%2C%20je%20vous%20remercie%20de%20supprimer%20mes%20coordonn%C3%A9es%20de%20vos%20fichiers%20d%27envoi%20de%0Aprospection%20%28article%2017.1%20du%20RGPD%29%20et%20de%20notifier%20cette%20demande%20de%20suppression%20aux%0Apartenaires%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%0ARGPD%29.%0A%0AJe%20vous%20remercie%20de%20m%27informer%20des%20mesures%20prises%20%C3%A0%20la%20suite%20de%20ma%20demande%20dans%0Ales%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20sa%20r%C3%A9ception%0A%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                        break
                   }
                case "RECTIFIER DES DONNÉES INCOMPLÈTES":
                    {
                        const rectifierInc = Forms.getRectifier();
                        const rectifieesInc = Forms.getRectifiees();
                        window.location.href=`mailto:${orgaMail}?subject=RECTIFIER%20DES%20DONN%C3%89ES%20INCOMPL%C3%88TES&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Rectification%20de%20donn%C3%A9es%20me%20concernant%0AMadame%2C%20Monsieur%2C%0A%0ALes%20donn%C3%A9es%20suivantes%20me%20concernant%20qui%20figurent%20dans%20vos%20fichiers%20sont%20incompl%C3%A8tes%20%3A%0A%0A${rectifierInc}%0A%0APar%20cons%C3%A9quent%2C%20en%20application%20de%20l%E2%80%99article%2016%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%0Aprotection%20des%20donn%C3%A9es%20%28RGPD%29%2C%20je%20vous%20remercie%20de%20bien%20vouloir%20compl%C3%A9ter%20votre%0Afichier%20avec%20les%20donn%C3%A9es%20ci-dessous%20utiles%20%C3%A0%20votre%20traitement%20%3A%0A%0A${rectifieesInc}%0A%0AVous%20voudrez%20bien%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%0Aplus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20remercie%20%C3%A9galement%20de%20notifier%20cette%20demande%20de%20rectification%20aux%0Aorganismes%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                        break
                    }
                case "RECTIFIER DES DONNÉES INEXACTES":
                    {
                        const rectifierInex = Forms.getRectifier();
                        const rectifieesInex = Forms.getRectifiees();
                        window.location.href=`mailto:${orgaMail}?subject=RECTIFIER%20DES%20DONN%C3%89ES%20INEXACTES%0A&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Rectification%20de%20donn%C3%A9es%20me%20concernant%0A%0AMadame%2C%20Monsieur%2C%0A%0ALes%20donn%C3%A9es%20suivantes%20me%20concernant%20qui%20figurent%20dans%20vos%20fichiers%20sont%20inexactes%20%3A%0A%0A${rectifierInex}%0A%0APar%20cons%C3%A9quent%2C%20en%20application%20de%20l%E2%80%99article%2016%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%0Aprotection%20des%20donn%C3%A9es%20%28RGPD%29%2C%20je%20vous%20remercie%20de%20bien%20vouloir%20compl%C3%A9ter%20votre%0Afichier%20avec%20les%20donn%C3%A9es%20ci-dessous%20utiles%20%C3%A0%20votre%20traitement%20%3A%0A%0A${rectifieesInex}%0A%0AVous%20voudrez%20bien%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%0Aplus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%0A12.3%20du%20RGPD%29.%0A%0AJe%20vous%20remercie%20%C3%A9galement%20de%20notifier%20cette%20demande%20de%20rectification%20aux%0Aorganismes%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%0ARGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                        break
                    }
                case "CONNAÎTRE LES INFORMATIONS DÉTENUES PAR UN ÉTABLISSEMENT FINANCIER":
                    {
                        const identifiantFinancier = Forms.getIdentifiant();
                        window.location.href=`mailto:${orgaMail}?subject=%20Etablissement%20financier%20Droit%20d%27acc%C3%A8s%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A${orgaMail}%0A${orgaName}%0A%0ARef%3A%20${identifiantFinancier}%0A%0AMadame%2C%20Monsieur%2C%0AConform%C3%A9ment%20%C3%A0%20l%E2%80%99article%20en%20application%20de%20l%E2%80%99article%2015%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%20%28RGPD%29%2C%20je%20vous%20prie%20de%20bien%20vouloir%20m%E2%80%99indiquer%20si%20des%20informations%20me%20concernant%20figurent%20%C2%A0dans%20vos%20fichiers%20informatis%C3%A9s%20ou%0Amanuels.%0A%0ADans%20l%E2%80%99affirmative%2C%20je%20vous%20demande%20de%20me%20faire%20parvenir%20une%20copie%2C%20en%20langage%0Aclair%2C%20de%20l%27ensemble%20de%20ces%20donn%C3%A9es%20%28y%20compris%20celles%20figurant%20dans%20les%20zones%20%C2%AB%0Ablocs-notes%20%C2%BB%20ou%20%C2%AB%20commentaires%20%C2%BB%29.%0A%0AVous%20voudrez%20bien%20%C3%A9galement%20me%20donner%20toute%20information%20disponible%20sur%20l%E2%80%99origine%20de%20ces%20donn%C3%A9es%20me%20concernant.%0A%0AJe%20vous%20remercie%20de%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%E2%80%99un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%E2%80%99agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%E2%80%99expression%20de%20mes%20salutations%0Adistingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                        break
                    }
            }
            if (mail === '') {
                e.preventDefault();
            }
            return document.getElementById('btn-mail').href = `mailto:${mail}`;
        },
        
        Gmail(e) {
            let orgaName = document.getElementById('organismeModal').value;
            let orgaMail = document.getElementById('MailorgaModal').value;
            let prenom = document.getElementById('PrenomModal').value;
            let nom = document.getElementById('NomModal').value;
            let mail = document.getElementById('MailModal').value;
            const droit = document.getElementById('modal-title');
            switch(droit.innerHTML) {
                case "DROIT D'ACCÈS":
                    return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=droit%20d'accès&body=${prenom}%20${nom}%0A%0A${mail}%0A%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AMadame%2C%20Monsieur%2C%0AJe%20vous%20prie%20de%20bien%20vouloir%20m%27indiquer%20si%20des%20donn%C3%A9es%20me%20concernant%20figurent%20dans%0Avos%20fichiers%20informatis%C3%A9s%20ou%20manuels.%0ADans%20l%27affirmative%2C%20je%20souhaiterais%20obtenir%20une%20copie%2C%20en%20langage%20clair%2C%20de%20l%27ensemble%0Ade%20ces%20et%20donn%C3%A9es%20%28y%20compris%20celles%20figurant%20dans%20les%20zones%20%C2%AB%20blocs-notes%20%C2%BB%20ou%20%C2%AB%0Acommentaires%20%C2%BB%29%20en%20application%20de%20l%27article%2015%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%0Aprotection%20des%20donn%C3%A9es%20%28RGPD%29.%0AJe%20vous%20remercie%20de%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%0Aplus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%0A12.3%20du%20RGPD%29.%0AA%20d%C3%A9faut%20de%20r%C3%A9ponse%20de%20votre%20part%20dans%20les%20d%C3%A9lais%20impartis%20ou%20en%20cas%20de%20r%C3%A9ponse%0Aincompl%C3%A8te%20je%20me%20r%C3%A9serve%20la%20possibilit%C3%A9%20de%20saisir%20la%20Commission%20nationale%20de%0Al%27informatique%20et%20des%20libert%C3%A9s%20%28CNIL%29%20d%27une%20r%C3%A9clamation.%0AA%20toutes%20fins%20utiles%2C%20vous%20trouverez%20des%20informations%20sur%20le%20site%20internet%20de%20la%20CNIL%20%3A%0Ahttps%3A%2F%2Fwww.cnil.fr%2Ffr%2Fprofessionnels-comment-repondre-une-demande-de-droit-dac%0Aces.%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%0Adistingu%C3%A9es.%0A%0A${prenom}%20${nom}`;
                case "SUPPRIMER SES DONNÉES PERSONNELLES":
                    {
                        const infos = Forms.getInfo();
                        const motif = Forms.getMotif();
                        return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=Droit%20à%20l'effacement%20RGPD&body=${prenom}%20${nom}%0A%0A${mail}%0A%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Suppression%20de%20donn%C3%A9es%20personnelles%0A%0AMadame%2C%20Monsieur%2C%0A%0AEn%20application%20de%20l%27article%2017.1%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%2C%0AJe%20vous%20prie%20d%27effacer%20de%20vos%20fichiers%20les%20donn%C3%A9es%20personnelles%20suivantes%20me%20concernant%20%3A%0A%0A${infos}%0A%0AJe%20demande%20que%20ces%20informations%20soient%20supprim%C3%A9es%20car%20%3A%0A%0A${motif}%0A%0AVous%20voudrez%20bien%20%C3%A9galement%20notifier%20cette%20demande%20d%27effacement%20de%20mes%20donn%C3%A9es%20aux%20organismes%20auxquels%20vous%20les%20auriez%20communiqu%C3%A9es%20%28article%2019%20du%20RGPD%29.%0A%0AEnfin%2C%20je%20vous%20prie%20de%20m%27informer%20de%20ces%20%C3%A9l%C3%A9ments%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ce%20courrier%20%28article%2012.3%20du%20RGPD%29.%0A%0AA%20d%C3%A9faut%20de%20r%C3%A9ponse%20de%20votre%20part%20dans%20les%20d%C3%A9lais%20impartis%20ou%20en%20cas%20de%20r%C3%A9ponse%20incompl%C3%A8te%2C%20je%20me%20r%C3%A9serve%20la%20possibilit%C3%A9%20de%20saisir%20la%20Commission%20nationale%20de%20l%27informatique%20et%20des%20libert%C3%A9s%20%28CNIL%29%20d%27une%20r%C3%A9clamation.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A${prenom}%20${nom}`;
                    }
                case "NE PLUS RECEVOIR DE PUBLICITÉS":
                    return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=Stopper%20la%20publicité%20Droit%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Opposition%20%C3%A0%20recevoir%20de%20la%20publicit%C3%A9%0A%0AMadame%2C%20Monsieur%2C%0A%0AConform%C3%A9ment%20aux%20dispositions%20de%20l%27article%2021.2%20du%20RGPD%2C%20je%20vous%20remercie%20de%20bien%0Avouloir%20supprimer%20mes%20coordonn%C3%A9es%20de%20vos%20fichiers%20d%27envoi%20de%20publicit%C3%A9s.%0A%0AJe%20vous%20rappelle%20que%20vous%20disposez%20d%27un%20d%C3%A9lai%20maximal%20d%27un%20mois%20suivant%20la%0Ar%C3%A9ception%20de%20ce%20courrier%20pour%20r%C3%A9pondre%20%C3%A0%20ma%20demande%2C%20conform%C3%A9ment%20%C3%A0%20l%27article%2012.3%0Adu%20RGPD.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                case "STOPPER LA PROSPECTION COMMERCIALE":
                    {
                        const identifiant = Forms.getIdentifiant();
                        return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=Stopper%20la%20prospection%20commerciale%20Droit%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Opposition%20%C3%A0%20l%E2%80%99utilisation%20commerciale%20de%20mes%20coordonn%C3%A9es%0A%0Aref%3A%20${identifiant}%0A%0AMadame%2C%20Monsieur%2C%0A%0AJe%20vous%20demande%20de%20noter%20que%20je%20m%27oppose%20%C3%A0%20ce%20que%20mes%20coordonn%C3%A9es%2C%20figurant%20dans%0Avos%20fichiers%2C%20soient%20utilis%C3%A9es%20%C3%A0%20des%20fins%20de%20prospection%2C%20en%20application%20de%20l%27article%0A21.2%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%20%28RGPD%29.%0A%0AAinsi%2C%20je%20vous%20remercie%20de%20supprimer%20mes%20coordonn%C3%A9es%20de%20vos%20fichiers%20d%27envoi%20de%0Aprospection%20%28article%2017.1%20du%20RGPD%29%20et%20de%20notifier%20cette%20demande%20de%20suppression%20aux%0Apartenaires%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%0ARGPD%29.%0A%0AJe%20vous%20remercie%20de%20m%27informer%20des%20mesures%20prises%20%C3%A0%20la%20suite%20de%20ma%20demande%20dans%0Ales%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20sa%20r%C3%A9ception%0A%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                    }
                case "S'OPPOSER AU TRAITEMENT DE DONNÉES":
                   {
                        const infosTraitment = Forms.getInfo();
                        return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=Suppression%20d'informations%20me%20concernant%20Droit%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Opposition%20%C3%A0%20l%E2%80%99utilisation%20commerciale%20de%20mes%20coordonn%C3%A9es%0A%0Aref%3A%20${infosTraitment}%0A%0AMadame%2C%20Monsieur%2C%0A%0AJe%20vous%20demande%20de%20noter%20que%20je%20m%27oppose%20%C3%A0%20ce%20que%20mes%20coordonn%C3%A9es%2C%20figurant%20dans%0Avos%20fichiers%2C%20soient%20utilis%C3%A9es%20%C3%A0%20des%20fins%20de%20prospection%2C%20en%20application%20de%20l%27article%0A21.2%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%20%28RGPD%29.%0A%0AAinsi%2C%20je%20vous%20remercie%20de%20supprimer%20mes%20coordonn%C3%A9es%20de%20vos%20fichiers%20d%27envoi%20de%0Aprospection%20%28article%2017.1%20du%20RGPD%29%20et%20de%20notifier%20cette%20demande%20de%20suppression%20aux%0Apartenaires%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%0ARGPD%29.%0A%0AJe%20vous%20remercie%20de%20m%27informer%20des%20mesures%20prises%20%C3%A0%20la%20suite%20de%20ma%20demande%20dans%0Ales%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20sa%20r%C3%A9ception%0A%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                   }
                case "RECTIFIER DES DONNÉES INCOMPLÈTES":
                    {
                        const rectifierInc = Forms.getRectifier();
                        const rectifieesInc = Forms.getRectifiees();
                        return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=RECTIFIER%20DES%20DONN%C3%89ES%20INCOMPL%C3%88TES&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Rectification%20de%20donn%C3%A9es%20me%20concernant%0AMadame%2C%20Monsieur%2C%0A%0ALes%20donn%C3%A9es%20suivantes%20me%20concernant%20qui%20figurent%20dans%20vos%20fichiers%20sont%20incompl%C3%A8tes%20%3A%0A%0A${rectifierInc}%0A%0APar%20cons%C3%A9quent%2C%20en%20application%20de%20l%E2%80%99article%2016%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%0Aprotection%20des%20donn%C3%A9es%20%28RGPD%29%2C%20je%20vous%20remercie%20de%20bien%20vouloir%20compl%C3%A9ter%20votre%0Afichier%20avec%20les%20donn%C3%A9es%20ci-dessous%20utiles%20%C3%A0%20votre%20traitement%20%3A%0A%0A${rectifieesInc}%0A%0AVous%20voudrez%20bien%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%0Aplus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20remercie%20%C3%A9galement%20de%20notifier%20cette%20demande%20de%20rectification%20aux%0Aorganismes%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                    }
                case "RECTIFIER DES DONNÉES INEXACTES":
                    {
                        const rectifierInex = Forms.getRectifier();
                        const rectifieesInex = Forms.getRectifiees()
                        return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=RECTIFIER%20DES%20DONN%C3%89ES%20INEXACTES%0A&body=${prenom}%20${nom}%0A${mail}%0A%0A%0A${orgaMail}%0A${orgaName}%0A%0AObjet%3A%20Rectification%20de%20donn%C3%A9es%20me%20concernant%0A%0AMadame%2C%20Monsieur%2C%0A%0ALes%20donn%C3%A9es%20suivantes%20me%20concernant%20qui%20figurent%20dans%20vos%20fichiers%20sont%20inexactes%20%3A%0A%0A${rectifierInex}%0A%0APar%20cons%C3%A9quent%2C%20en%20application%20de%20l%E2%80%99article%2016%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%0Aprotection%20des%20donn%C3%A9es%20%28RGPD%29%2C%20je%20vous%20remercie%20de%20bien%20vouloir%20compl%C3%A9ter%20votre%0Afichier%20avec%20les%20donn%C3%A9es%20ci-dessous%20utiles%20%C3%A0%20votre%20traitement%20%3A%0A%0A${rectifieesInex}%0A%0AVous%20voudrez%20bien%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%0Aplus%20tard%20dans%20un%20d%C3%A9lai%20d%27un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%0A12.3%20du%20RGPD%29.%0A%0AJe%20vous%20remercie%20%C3%A9galement%20de%20notifier%20cette%20demande%20de%20rectification%20aux%0Aorganismes%20que%20vous%20auriez%20rendus%20destinataires%20de%20mes%20donn%C3%A9es%20%28article%2019%20du%0ARGPD%29.%0A%0AJe%20vous%20prie%20d%27agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%27expression%20de%20mes%20salutations%20distingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                    }
                case "CONNAÎTRE LES INFORMATIONS DÉTENUES PAR UN ÉTABLISSEMENT FINANCIER":
                    {
                        const identifiantFinancier = Forms.getIdentifiant();
                        return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${orgaMail}&su=%20Etablissement%20financier%20Droit%20d%27acc%C3%A8s%20RGPD&body=${prenom}%20${nom}%0A${mail}%0A%0A${orgaMail}%0A${orgaName}%0A%0ARef%3A%20${identifiantFinancier}%0A%0AMadame%2C%20Monsieur%2C%0AConform%C3%A9ment%20%C3%A0%20l%E2%80%99article%20en%20application%20de%20l%E2%80%99article%2015%20du%20R%C3%A8glement%20g%C3%A9n%C3%A9ral%20sur%20la%20protection%20des%20donn%C3%A9es%20%28RGPD%29%2C%20je%20vous%20prie%20de%20bien%20vouloir%20m%E2%80%99indiquer%20si%20des%20informations%20me%20concernant%20figurent%20%C2%A0dans%20vos%20fichiers%20informatis%C3%A9s%20ou%0Amanuels.%0A%0ADans%20l%E2%80%99affirmative%2C%20je%20vous%20demande%20de%20me%20faire%20parvenir%20une%20copie%2C%20en%20langage%0Aclair%2C%20de%20l%27ensemble%20de%20ces%20donn%C3%A9es%20%28y%20compris%20celles%20figurant%20dans%20les%20zones%20%C2%AB%0Ablocs-notes%20%C2%BB%20ou%20%C2%AB%20commentaires%20%C2%BB%29.%0A%0AVous%20voudrez%20bien%20%C3%A9galement%20me%20donner%20toute%20information%20disponible%20sur%20l%E2%80%99origine%20de%20ces%20donn%C3%A9es%20me%20concernant.%0A%0AJe%20vous%20remercie%20de%20me%20faire%20parvenir%20votre%20r%C3%A9ponse%20dans%20les%20meilleurs%20d%C3%A9lais%20et%20au%20plus%20tard%20dans%20un%20d%C3%A9lai%20d%E2%80%99un%20mois%20%C3%A0%20compter%20de%20la%20r%C3%A9ception%20de%20ma%20demande%20%28article%2012.3%20du%20RGPD%29.%0A%0AJe%20vous%20prie%20d%E2%80%99agr%C3%A9er%2C%20Madame%2C%20Monsieur%2C%20l%E2%80%99expression%20de%20mes%20salutations%0Adistingu%C3%A9es.%0A%0A%0A${prenom}%20${nom}`;
                    }
            }
            if (mail === '') {
                e.preventDefault();
            }
            return document.getElementById('btn-gmail').href=`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=target@email.com&bcc=test@gmail.com&su=droitdacc%C3%A8s&body=${mail}`;
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
        close: function (envent) {
            if (envent) {
                var element =  document.getElementById('info-droit');
                element.classList.remove('show');
                console.log('closed');
            }
        },
        greet: function (event) {
            // `this` inside methods points to the Vue instance
            alert('Hello ' + this.name + '!')
            // `event` is the native DOM event
            if (event) {
                alert(event.target.tagName)
            }
        }
    }

}
</script>

<style>
.fade {
    transition: opacity 0s !important; /* annulation de la transition (bug d'affichage) */
}

.collapse {
    margin: 0.4rem !important;
}

.collapsing {
    margin: 0.4rem !important;
}

.div.group-btn {
    color: white !important;
}

.mx-auto.btn.btn-primary {
    color: white !important
}
</style>
