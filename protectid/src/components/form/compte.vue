<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
Vue.use(DisableAutocomplete);

export default {
  template: `
    <div class="modal fade" id="compte" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">CLÔTURER UN COMPTE EN LIGNE</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Informations sur la société</h5>
                    </div>
                    <div class="form-group" autocomplete="off">
                        <label for="message-text" class="col-form-label">Nom de l'organisme</label>
                        <input type="text" v-model="organisme" @input="organismeChanged($event)" class="form-control" placeholder="Nom de l'organisme" list="dataListOrga6" autocomplete="on">
                        <datalist id="dataListOrga6">
                            <option v-for="organisme in listOrganismes"
                                    v-bind:key="organisme.id">
                            {{organisme.name_city}}
                            </option>
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Adresse mail</label>
                        <input class="form-control" placeholder="Adresse mail de l'organisme" id="Mailorga6" v-model="email">
                    </div>
                    <div class="form-group" style="display: none">
                        <label for="recipient-name" class="col-form-label">Code postal</label>
                        <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga6" v-model="addressZip">
                    </div>
                    <div class="form-group" style="display: none">
                        <label for="recipient-name" class="col-form-label">Ville</label>
                        <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga6" v-model="addressCity">
                    </div>
                    <form>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Informations complémentaires</h5>
                        </div>
                        <div class="form-group">
                            <label for="recipient-identifiant" class="col-form-label">Identifiant du compte concerté</label>
                            <input type="text" name="identifiant" id="Identifiant6" class="form-control" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="recipient-social_network" class="col-form-label">Nom du réseau social</label>
                            <input type="text" name="social_network" class="form-control" id="Reseau_Social" placeholder="Ex : Facebook, Twitter, Linkedin,">
                        </div>
                        <div class="form-group">
                            <label for="recipient-end" class="col-form-label">Url précise sur laquelle sont publiées les informations vous concernant</label>
                            <input type="text" name="heure_fin" class="form-control" id="Url" placeholder="http://www.">
                        </div>
                        <div class="form-group">
                            <label for="recipient-delete_infos" class="col-form-label">Précisez les informations à supprimer</label>
                            <textarea name="delete_infos" class="form-control" id="Delete_Infos" rows="4"></textarea>
                        </div>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Nom</label>
                            <input type="text" class="form-control" placeholder="Votre nom" id="Nom6">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Prénom</label>
                            <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom6">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Adresse mail</label>
                            <input class="form-control" placeholder="Votre adresse mail"  id="Mail6">
                        </div>
                        <div class="form-group" style="display: none">
                            <label for="recipient-name" class="col-form-label">Code postal</label>
                            <input type="text" class="form-control" placeholder="Votre code postal" id="Postal6">
                        </div>
                        <div class="form-group" style="display: none">
                            <label for="recipient-name" class="col-form-label">Ville</label>
                            <input type="text" class="form-control" placeholder="Votre ville" id="Ville6" >
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
      var NP = `${values.Nom6} ${values.Prenom6}`;
      
      const doc = new Jspdf()
      
      doc.setFontSize(9)
      doc.text(NP, 10, 15)
      doc.text(values.Mail6, 10, 20)
      doc.text(values.Postal6, 10, 25)
      doc.text(values.Ville6, 10, 30)
      doc.text(currentOrganisme, 105, 45)
      doc.text(values.Mailorga6, 105, 50)
      doc.text(values.Postalorga6, 105, 55)
      doc.text(values.Villeorga6, 105, 60)
      doc.setFont('helvetica', 'bold')
      doc.text('Objet: Objet : Demande de clôture de compte et de suppression de données personnelles me concernant\n', 10, 75)
      doc.setFont('courier', 'normal')
      doc.text('Madame, Monsieur,\n', 10, 105)
      doc.text(`Je suis titulaire du compte ${values.Identifiant6} sur ${values.Reseau_Social}, qui diffuse des informations me ,\n`, 10, 115)
      doc.text(` concernant à la page: ${values.Url}\n`, 10, 125)
      doc.text('Je souhaite obtenir la clôture de mon compte et vous demande, en application de l’article 17.1\n', 10, 135)
      doc.text('Ainsi, je vous remercie de supprimer mes coordonnées de vos fichiers d’envoi de prospection\n', 10, 145)
      doc.text('(article 17.1 du RGPD) et de notifier cette demande de suppression aux partenaires que  vous\n', 10, 155)
      doc.text('auriez rendus destinataires de mes données (article 19 du RGPD).\n', 10, 165)
      doc.text('Je vous remercie de m’informer des mesures prises à la suite de ma demande dans les meilleurs\n', 10, 175)
      doc.text('délais et au plus tard dans un délai d’un mois à compter de sa réception (article 12.3 du RGPD).\n', 10, 185)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.\n', 10, 205)
      // doc.text('vos fichiers informatisés ou manuels.\n', 10, 105)
      // doc.text('Dans l\'affirmative, je souhaiterais obtenir une copie, en langage clair, de l\'ensemble de ces\n', 10, 115)
      // doc.text('données (y compris celles figurant dans les zones « blocs-notes » ou « commentaires »),\n', 10, 120)
      // doc.text('en application de l\'article 15 du Règlement général sur la protection des données (RGPD).\n', 10, 125)
      // doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus\n', 10, 135)
      // doc.text('tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 140)
      // doc.text('A défaut de réponse de votre part dans les délais impartis ou en cas de réponse\n', 10, 150)
      // doc.text('incomplète, je me réserve la possibilité de saisir la Commission nationale de\n', 10, 155)
      // doc.text('l\'informatique et des libertés (CNIL) d\'une réclamation.\n', 10, 160)
      // doc.text('A toutes fins utiles, vous trouverez des informations sur le site internet de la CNIL :\n', 10, 170)
      // doc.text('https://www.cnil.fr/fr/professionnels-comment-repondre-une-demande-de-droit-dacces.\n', 10, 175)
      // doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 185)
      doc.text(NP, 10, 195)
      // doc.save('Cloture_compte.pdf')
      Forms.viewPdf(doc)
    }
  }
}
</script>
