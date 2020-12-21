<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
Vue.use(DisableAutocomplete);

export default {
  template: `
   <div class="modal fade" id="trait" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">S'opposer au traitement de données</h5>
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
                <input type="email" name="email" class="form-control" placeholder="Nom de l'organisme"  id="Organisme5" list="Orga" autocomplete="off">
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
                <input class="form-control" placeholder="Adresse mail de l'organisme"  id="Mailorga5">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga5">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga5">
              </div>
            <form>
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
          </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Raison de la demande</label>
                <input class="form-control" id="Info5" placeholder="Exemple: Je veux que le traitement cesse ">
              </div>
             <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom</label>
                <input type="text" class="form-control" placeholder="Votre nom" id="Nom5">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Prénom</label>
                <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom5">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Votre adresse mail"  id="Mail5">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Votre code postal"  id="Postal5">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Votre ville" id="Ville5">
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
      var Nom = document.getElementById('Nom5').value
      var Prenom = document.getElementById('Prenom5').value
      var Mail = document.getElementById('Mail5').value
      var Postal = document.getElementById('Postal5').value
      var Ville = document.getElementById('Ville5').value
      var Organisme = document.getElementById('Organisme5').value
      var Mailorga = document.getElementById('Mailorga5').value
      var Postalorga = document.getElementById('Postalorga5').value
      var Villeorga = document.getElementById('Villeorga5').value
      var Info = document.getElementById('Info5').value
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
      doc.setFont('courier', 'normal')
      doc.text('Madame, Monsieur,\n', 10, 90)
      doc.text('En application de l\'article 21.1 du Règlement général sur la protection des données (RGPD),\n', 10, 100)
      doc.text('je m\'oppose au traitement de mes données à caractère personnel par votre organisme car :\n', 10, 105)
      doc.text(Info, 10, 110)
      doc.text('Dès lors, vous voudrez bien :\n', 10, 120)
      doc.text('- supprimer mes données de vos fichiers et notifier ma demande aux organismes auxquels\n', 10, 125)
      doc.text('vous les auriez communiquées (articles 17.1.c. et 19 du RGPD) ;\n', 10, 130)
      doc.text('- si vous en avez l\'obligation légale, m\'indiquer la durée de conservation de\n', 10, 135)
      doc.text('mes données dans vos bases archives ;\n', 10, 140)
      doc.text('- m\'informer de ces éléments dans les meilleurs délais et au plus tard dans un délai d\'un mois\n', 10, 145)
      doc.text('à compter de la réception de ce courrier (article 12.3 du RGPD).\n', 10, 150)
      doc.text('À défaut de réponse de votre part dans les délais impartis ou en cas de réponse incomplète,\n', 10, 160)
      doc.text('je saisirai la Commission nationale de l\'informatique et des libertés (CNIL) d\'une réclamation.\n', 10, 165)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 175)
      doc.text(NP, 10, 185)
      doc.save('Traitement.pdf')
    }
  },
      mounted () {
    
  document.getElementById("Organisme5").onkeyup = function() {callapi()};
  function callapi(){
    var Nom = document.getElementById('Organisme5').value
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
    var val = document.getElementById("Organisme5").value;
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
          document.getElementById("Mailorga5").value = parsedData2.email;
          document.getElementById("Postalorga5").value = parsedData2.address.zip;
          document.getElementById("Villeorga5").value = parsedData2.address.city;

        }};

        xhr2.send();

        break;
      }
    }
  }
  }
}
</script>
