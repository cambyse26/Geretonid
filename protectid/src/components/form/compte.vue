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
                        <input type="text" id="organisme6" v-model="organisme" @input="organismeChanged($event)" class="form-control" placeholder="Nom de l'organisme" list="dataListOrga6" autocomplete="on">
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
                    <a href="mailto: bcc=bonplanmat@gmail.com" type="button" class="btn btn-primary">Envoyer par mail</a>          
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

    generatePDF () {
      let currentOrganisme = document.getElementById('organisme6').value
      let values = Forms.getValues('.form-control');
      var NP = `${values.Nom6} ${values.Prenom6}`;
      
      const doc = new Jspdf()
      
      doc.setFontSize(14)
      doc.text(NP, 10, 15)
      doc.text(values.Mail6, 10, 20)
      doc.text(values.Postal6, 10, 25)
      doc.text(values.Ville6, 10, 30)
      doc.text(currentOrganisme, 200, 40, null, null, "right");
      doc.text(values.Mailorga6, 200, 45, null, null, "right");
      doc.text(values.Postalorga6, 200, 50, null, null, "right");
      doc.text(values.Villeorga6, 200, 55, null, null, "right");
      doc.setFont('Times-Roman', 'bold')
      doc.text('Objet : Demande de clôture de compte et de suppression de données personnelles me\n', 10, 75)
      doc.text('concernant', 10, 80)
      doc.setFont('Times-Roman', 'normal')
      doc.text('Madame, Monsieur,\n', 10, 105)
      doc.text(`Je suis titulaire du compte ${values.Identifiant6} sur ${values.Reseau_Social}, qui diffuse des informations me \n`, 10, 120)
      doc.text(`concernant à la page: ${values.Url}\n`, 10, 125)
      doc.text('Je souhaite obtenir la clôture de mon compte et vous demande, en application de l’article 17.1\n', 10, 135)
      doc.text('du Règlement général sur la protection des données (RGPD),  de supprimer l’ensemble de \n', 10, 140)
      doc.text('mes données personnelles qui lui sont rattachées, à savoir :\n', 10, 145)
      Forms.setLines(doc, values.Delete_Infos, 150)
      doc.text('Je vous remercie de bien vouloir m\'informer des mesures prises à la suite de ma demande dans\n', 10, 180)
      doc.text('les meilleurs délais et au plus tard dans un délai d’un mois à compter de sa réception \n', 10, 185)
      doc.text('(article 12.3 du RGPD).\n', 10, 190)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.\n', 10, 200)
      doc.text(NP, 10, 215)
      doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 145, 280, 60, 15);

      doc.save('Cloture_compte.pdf')
      
    }
  }
}
</script>
