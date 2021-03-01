<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
import PDF from '@/services/PDF';
Vue.use(DisableAutocomplete);

export default {
  template: `
    <div class="modal fade" id="medical" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ACCÉDER À SON DOSSIER MÉDICAL</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Informations sur la société</h5>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label" for="civilite">Civilité</label>
                        <select name="civlite" id="Civilite10" @change="preview" class="form-select custom-select">
                            <option value="Madame">Mme</option>
                            <option value="Monsieur">Mr</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Nom du médecin ou de l'établissement de santé</label>
                        <input class="form-control" @change="preview" placeholder="Nom du destinataire" id="organisme10" v-model="organisme">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Adresse mail</label>
                        <input class="form-control" @change="preview" placeholder="Adresse mail de l'organisme" id="Mailorga10" v-model="email">
                    </div>
                    <form>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Informations complémentaires</h5>
                        </div>
                        <div class="form-group">
                            <label for="recipient-informations" class="col-form-label">Informations complémentaires</label>
                            <textarea name="informations" id="informations_complementaires" @change="preview" rows="4" class="form-control">Pour faciliter le traitement de ma demande, je vous précise les informations suivantes : </textarea>
                        </div>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Nom</label>
                            <input type="text" @change="preview" class="form-control" placeholder="Votre nom" id="Nom10">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Prénom</label>
                            <input type="text" @change="preview" class="form-control" placeholder="Votre Prénom" id="Prenom10">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Adresse mail</label>
                            <input class="form-control" @change="preview" placeholder="Votre adresse mail"  id="Mail10">
                        </div>
                        <div class="form-group" style="display: none">
                            <label for="recipient-name" class="col-form-label">Code postal</label>
                            <input type="text" @change="preview" class="form-control" placeholder="Votre code postal" id="Postal10">
                        </div>
                        <div class="form-group" style="display: none">
                            <label for="recipient-name" class="col-form-label">Ville</label>
                            <input type="text" @change="preview" class="form-control" placeholder="Votre ville" id="Ville10" >
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                  <p>Nous ne récupérons aucune donnée</p>
                  <div class="group-btn">
                    <button type="button" class="btn btn-primary" v-on:click="generatePDF">Generer le PDF</button>
                    <a href="mailto: " id="btn-mail" type="button" @click="changeEmail($event)" class="btn btn-primary">Envoyer par mail</a>  
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                  </div>        
                </div>
            </div>
        </div>
    <div id="preview-medical-pdf"></div>
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
      const baseURI = `${this.getBaseUrl()}/api/company/search`;
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
      const baseURI = `${this.getBaseUrl()}/api/company/get/${id}`;
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
      let currentOrganisme = document.getElementById('organisme10').value
      const values = { ...Forms.getValues('.form-control'), ...Forms.getValues('.form-select')};
      let NP = `${values.Nom10} ${values.Prenom10}`;
      const doc = new Jspdf()
      
      doc.setFontSize(14)
      doc.text(NP, 10, 15)
      doc.text(values.Mail10, 10, 20)
      doc.text(values.Postal10, 10, 25)
      doc.text(values.Ville10, 10, 30, null, null, "right");
      doc.text(currentOrganisme, 200, 45, null, null, "right");
      doc.text(values.Mailorga10, 200, 50, null, null, "right");
      doc.setFont('Times-Roman', 'bold')
      doc.text('Objet: Demande d’accès à mon dossier médical\n', 10, 70)
      doc.setFont('Times-Roman', 'normal')
      doc.text(`${values.Civilite10}, \n`, 10, 90)
      doc.text('En application des dispositions de l’article L. 1111-7 du code de la santé publique, je vous \n', 10, 100)
      doc.text('remercie de m’adresser l’ensemble des données que vous détenez sur ma santé, qu’elles soient \n', 10, 105)
      doc.text('soient sous forme papier ou sur support informatique (ainsi que la signification des codes, \n', 10, 110)
      doc.text('sigles ou abréviations éventuellement utilisés).,\n', 10, 115)
      doc.text('Vous trouverez en pièce jointe un justificatif de mon identité.\n', 10, 125)
      doc.text('Pour votre information, vous disposez d’un délai de huit jours pour satisfaire ma demande. Ce\n', 10, 135)
      doc.text('délai est porté à deux mois lorsque les informations médicales datent de plus de cinq ans.\n', 10, 140)
      doc.text('Je vous prie d’agréer, Monsieur,, l’expression de mes salutations distinguées.\n', 10, 150)
      doc.text(NP, 10, 165)
      doc.text('P.J :\n', 10, 180)
      doc.text('Copie de pièce d\'identité \n', 10, 190)
      doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 145, 280, 60, 15);
      doc.save('Medical.pdf')     
    }, 
    preview () {
      if (window.innerWidth > 1000) {
        let currentOrganisme = document.getElementById('organisme10').value;
        const values = { ...Forms.getValues('.form-control'), ...Forms.getValues('.form-select'), currentOrganisme};
        PDF.previewMedical(values, "#preview-medical-pdf");
      }
    },
    changeEmail(e) {
      console.log(document.getElementById('btn-mail'))
      const mail = document.getElementById('MailorgaModal').value;
      if (mail === '') {
          e.preventDefault();
      }
      return document.getElementById('btn-mail').href = `mailto:${mail}`;
    },
    getBaseUrl() {
      const protocol = window.location.protocol;
      const host = window.location.hostname === "localhost" ? window.location.host : "api.geretonid.com";
      return `${protocol}//${host}`;
    },
  },
}
</script>
