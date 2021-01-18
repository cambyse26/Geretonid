<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
Vue.use(DisableAutocomplete);

export default {
  template: `
   <div class="modal fade" id="site" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Supprimer des informations vous concernant d'un site internet</h5>
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
                <input type="text" v-model="organisme" @input="organismeChanged($event)" class="form-control" placeholder="Nom de l'organisme" list="dataListOrga" autocomplete="on">
                <datalist id="dataListOrga">
                  <option v-for="organisme in listOrganismes"
                          v-bind:key="organisme.id">
                    {{organisme.name_city}}
                  </option>
                </datalist>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Adresse mail de l'organisme" id="Mailorga3" v-model="email">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga3" v-model="addressZip">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga3" v-model="addressCity">
              </div>
            <form>
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
          </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Urls précises sur lesquelles sont publiées les informations vous concernant</label>
                <input class="form-control" id="Urls" placeholder="Exemple: ">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Précisez les informations à supprimer</label>
                <input class="form-control" id="Info" placeholder="Exemple: ">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Précisez les raisons pour lesquelles vous souhaitez faire effacer ces données</label>
                <input class="form-control" id="Motif" placeholder="Exemple: ">
              </div>
             <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom</label>
                <input type="text" class="form-control" placeholder="Votre nom" id="Nom3">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Prénom</label>
                <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom3">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Votre adresse mail"  id="Mail3">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Votre code postal"  id="Postal3">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Votre ville" id="Ville3" >
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
      var Nom = document.getElementById('Nom3').value
      var Prenom = document.getElementById('Prenom3').value
      var Mail = document.getElementById('Mail3').value
      var Postal = document.getElementById('Postal3').value
      var Ville = document.getElementById('Ville3').value
      var Mailorga = document.getElementById('Mailorga3').value
      var Postalorga = document.getElementById('Postalorga3').value
      var Villeorga = document.getElementById('Villeorga3').value
      var Urls = document.getElementById('Urls').value
      var Info = document.getElementById('Info').value
      var Motif = document.getElementById('Motif').value
      var NP = Nom + ' ' + Prenom
      const doc = new Jspdf()
      
      doc.setFontSize(9)
      doc.text(NP, 10, 15)
      doc.text(Mail, 10, 20)
      doc.text(Postal, 10, 25)
      doc.text(Ville, 10, 30)
      doc.text(currentOrganisme, 10, 45)
      doc.text(Mailorga, 10, 50)
      doc.text(Postalorga, 10, 55)
      doc.text(Villeorga, 10, 60)
      doc.setFont('helvetica', 'bold')
      doc.setFont('courier', 'normal')
      doc.text('Madame, Monsieur,\n', 10, 90)
      doc.text('Des informations me concernant sont actuellement diffusées sur votre site internet sur les pages suivantes :\n', 10, 100)
      doc.text(Urls, 10, 105)
      doc.text('Aussi, en application des articles 21.1 et 17.1.c. du Règlement général sur la protection des données\n', 10, 115)
      doc.text('(RGPD), je vous remercie de supprimer les données personnelles suivantes me concernant :\n', 10, 120)
      doc.text(Info, 10, 125)
      doc.text('Je souhaite que ces informations soient supprimées car :\n', 10, 135)
      doc.text(Motif, 10, 140)
      doc.text('Je vous remercie également de faire le nécessaire pour que ces pages ne soient plus référencées par les\n', 10, 150)
      doc.text('moteurs de recherche (article 17.2 du RGPD).\n', 10, 155)
      doc.text('Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai\n', 10, 160)
      doc.text('d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 170)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 185)
      doc.text(NP, 10, 195)
      doc.save('Site.pdf')
    }
  },  
  mounted () {
    this.updateListOrganismes("a");
  }
}
</script>
