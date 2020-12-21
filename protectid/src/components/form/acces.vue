<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
Vue.use(DisableAutocomplete);

export default {
  template: `
   <div class="modal fade" id="accès" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">EXERCER SON DROIT D'ACCÈS</h5>
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
                <input type="email" name="email" class="form-control" placeholder="Nom de l'organisme"  id="Organisme" list="Orga" autocomplete="off">
                <datalist id="Orga">
                  <option data="" id="1"></option>
                  <option data="" id="2"></option>
                  <option data="" id="3"></option>
                  <option data="" id="4"></option>
                  <option data="" id="5"></option>
                  </datalist>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Adresse mail de l'organisme"  id="Mailorga">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga">
              </div>
            <form>
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
          </div>
             <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom</label>
                <input type="text" class="form-control" placeholder="Votre nom" id="Nom">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Prénom</label>
                <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Votre adresse mail"  id="Mail">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Votre code postal"  id="Postal">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Votre ville" id="Ville" >
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
  methods: {
    generatePDF () {
      var Nom = document.getElementById('Nom').value
      var Prenom = document.getElementById('Prenom').value
      var Mail = document.getElementById('Mail').value
      var Postal = document.getElementById('Postal').value
      var Ville = document.getElementById('Ville').value
      var Organisme = document.getElementById('Organisme').value
      var Mailorga = document.getElementById('Mailorga').value
      var Postalorga = document.getElementById('Postalorga').value
      var Villeorga = document.getElementById('Villeorga').value
      var NP = Nom + ' ' + Prenom
      const doc = new Jspdf()
      doc.setFontSize(9)
      doc.text(NP, 10, 15)
      doc.text(Mail, 10, 20)
      doc.text(Postal, 10, 25)
      doc.text(Ville, 10, 30)
      doc.text(Organisme, 10, 45)
      doc.text(Mailorga, 10, 50)
      doc.text(Postalorga, 10, 55)
      doc.text(Villeorga, 10, 60)
      doc.setFont('helvetica', 'bold')
      doc.text('Objet: Droit d\'accès\n', 10, 70)
      doc.setFont('courier', 'normal')
      doc.text('Madame, Monsieur,\n', 10, 90)
      doc.text('Je vous prie de bien vouloir m\'indiquer si des données me concernant figurent dans\n', 10, 100)
      doc.text('vos fichiers informatisés ou manuels.\n', 10, 105)
      doc.text('Dans l\'affirmative, je souhaiterais obtenir une copie, en langage clair, de l\'ensemble de ces\n', 10, 115)
      doc.text('données (y compris celles figurant dans les zones « blocs-notes » ou « commentaires »),\n', 10, 120)
      doc.text('en application de l\'article 15 du Règlement général sur la protection des données (RGPD).\n', 10, 125)
      doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus\n', 10, 135)
      doc.text('tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 140)
      doc.text('A défaut de réponse de votre part dans les délais impartis ou en cas de réponse\n', 10, 150)
      doc.text('incomplète, je me réserve la possibilité de saisir la Commission nationale de\n', 10, 155)
      doc.text('l\'informatique et des libertés (CNIL) d\'une réclamation.\n', 10, 160)
      doc.text('A toutes fins utiles, vous trouverez des informations sur le site internet de la CNIL :\n', 10, 170)
      doc.text('https://www.cnil.fr/fr/professionnels-comment-repondre-une-demande-de-droit-dacces.\n', 10, 175)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 185)
      doc.text(NP, 10, 195)
      doc.save('Droit_acces.pdf')
    }
  },
  mounted () {
    
  document.getElementById("Organisme").onkeyup = function() {callapi()};
  function callapi(){
    var Nom = document.getElementById('Organisme').value
    var url = "https://api.geretonid.com/api/company/search";
    var xhr = new XMLHttpRequest();
    var data = []
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "token 32ffef7a5e2682244a84fa2a68630da15bc6575b");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      data = []
      console.log(xhr.status);
      console.log(xhr.responseText);
      var parsedData = JSON.parse(xhr.responseText);
      var length = parsedData.length;
      console.log(length)
      for(var i=0;i<length;i++){
      console.log(parsedData[i].name + " ("  + parsedData[i].city + ")" + " " + parsedData[i].id);
      console.log(parsedData[i].id);
      document.getElementById(i + 1).value = parsedData[i].name + " (" + parsedData[i].city + ")";
      document.getElementById(i + 1).data = parsedData[i].id;
      data.push(parsedData[i].id)
      console.log(data)
    }
    }};
    var test = JSON.stringify({"name": Nom});
    xhr.send(test);
    var val = document.getElementById("Organisme").value;
    var opts = document.getElementById('Orga').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        // An item was selected from the list!
        // yourCallbackHere()
        // alert(opts[i].data);
        console.log('CEST ICI')
        console.log(opts[i].value)
        console.log(data[i])
        var url2 = "https://api.geretonid.com/api/company/get/" + opts[i].data;
        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", url2);
        xhr2.setRequestHeader("Authorization", "token 32ffef7a5e2682244a84fa2a68630da15bc6575b");

        xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
          console.log(xhr2.status);
          console.log(xhr2.responseText);
          var parsedData2 = JSON.parse(xhr2.responseText);
          document.getElementById("Mailorga").value = parsedData2.email;
          document.getElementById("Postalorga").value = parsedData2.address.zip;
          document.getElementById("Villeorga").value = parsedData2.address.city;

        }};

        xhr2.send();

        break;
      }
    }
  }
  }
}
</script>
