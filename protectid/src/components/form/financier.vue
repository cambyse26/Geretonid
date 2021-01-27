<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
Vue.use(DisableAutocomplete);

export default {
  template: `
    <div class="modal fade" id="financier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">CONNAÎTRE LES INFORMATIONS DÉTENUES PAR UN ÉTABLISSEMENTS FINANCIER</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Informations sur l'établissement financier</h5>
                    </div>
                    <div class="form-group" autocomplete="off">
                        <label for="message-text" class="col-form-label">Nom de l'organisme</label>
                        <input type="text" v-model="organisme" @input="organismeChanged($event)" class="form-control" placeholder="Nom de l'organisme" list="dataListOrga7" autocomplete="on">
                        <datalist id="dataListOrga7">
                            <option v-for="organisme in listOrganismes"
                                    v-bind:key="organisme.id">
                            {{organisme.name_city}}
                            </option>
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Adresse mail</label>
                        <input class="form-control" placeholder="Adresse mail de l'organisme" id="Mailorga7" v-model="email">
                    </div>
                    <div class="form-group" style="display: none">
                        <label for="recipient-name" class="col-form-label">Code postal</label>
                        <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga7" v-model="addressZip">
                    </div>
                    <div class="form-group" style="display: none">
                        <label for="recipient-name" class="col-form-label">Ville</label>
                        <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga7" v-model="addressCity">
                    </div>
                    <form>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Informations complémentaires</h5>
                        </div>
                        <div class="form-group">
                            <label for="recipient-compte" class="col-form-label">Identifiant client ou numéro de compte</label>
                            <input type="text" name="compte" id="Identifiant7" class="form-control" placeholder="Votre n° de compte">
                        </div>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Nom</label>
                            <input type="text" class="form-control" placeholder="Votre nom" id="Nom7">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Prénom</label>
                            <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom7">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Adresse mail</label>
                            <input class="form-control" placeholder="Votre adresse mail"  id="Mail7">
                        </div>
                        <div class="form-group" style="display: none">
                            <label for="recipient-name" class="col-form-label">Code postal</label>
                            <input type="text" class="form-control" placeholder="Votre code postal" id="Postal7">
                        </div>
                        <div class="form-group" style="display: none">
                            <label for="recipient-name" class="col-form-label">Ville</label>
                            <input type="text" class="form-control" placeholder="Votre ville" id="Ville7" >
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <p>Nous ne récupérons aucune donnée</p>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-primary" v-on:click="generatePDF">Generer le PDF</button>
                </div>
            </div>
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
        "Content-Type": "application/json"
      };
      axios.post(baseURI, param, { headers })
      .then((result) => {
        console.log("updateListOrganismes result " + JSON.stringify(result.data));
        var data = result.data;
        for(var i=0; i<data.length; i++){
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
      const baseURI = "https://api.geretonid.com/api/company/get/" + id;
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

    generatePDF (organismeChanged) {
      const currentOrganisme = organismeChanged.target.value;
      let values = Forms.getValues('.form-control');
      var NP = `${values.Nom7} ${values.Prenom7}`;
      const doc = new Jspdf()
      
      doc.setFontSize(9)
      doc.text(NP, 10, 15)
      doc.text(values.Mail7, 10, 20)
      doc.text(values.Postal7, 10, 25)
      doc.text(values.Ville7, 10, 30)
      doc.text(currentOrganisme, 10, 45)
      doc.text(values.Mailorga7, 105, 50)
      doc.text(values.Postalorga7, 105, 55)
      doc.text(values.Villeorga7, 105, 60)
      doc.setFont('helvetica', 'bold')
      doc.text('Objet: Droit d\'accès\n', 10, 70)
      doc.text(`Ref: ${values.Identifiant7}`,10, 75)
      doc.setFont('courier', 'normal')
      doc.text('Madame, Monsieur,\n', 10, 90)
      doc.text('Conformément à l’article en application de l’article 15 du Règlement général sur la protection des \n', 10, 100)
      doc.text('données (RGPD), je vous prie de bien vouloir m’indiquer si des informations me concernant figurent \n', 10, 105)
      doc.text('figurent dans vos fichiers informatisés ou manuels.', 10, 110)
      doc.text('Dans l’affirmative, je vous demande de me faire parvenir une copie, en langage clair, de l’ensemble,\n', 10, 120)
      doc.text('de ces données (y compris celles figurant dans les zones « blocs-notes » ou « commentaires »).\n', 10, 125)
      doc.text('Vous voudrez bien également me donner toute information disponible sur l’origine de ces données me concernant.\n', 10, 135)
      // doc.text('tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 140)
      doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un\n', 10, 145)
      doc.text('délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 150)
      doc.text('Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.\n', 10, 160)
      doc.text(NP, 10, 185)
      doc.text('P.J :', 10, 200)      
      doc.text('Copie d\'une pièce d\'identité', 10, 205)      

      // doc.save('Droit_acces.pdf')
      Forms.viewPdf(doc)
    }
  }
}
</script>
