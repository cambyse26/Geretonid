<script>
import Jspdf from 'jspdf'

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
            <form>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Raison de la suppression des données</label>
                <input class="form-control" id="Info" placeholder="Exemple: ">
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
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Informations sur la société</h5>
          </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Nom de l'organisme</label>
                <input class="form-control" placeholder="Nom de l'organisme"  id="Organisme">
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
            </div>
          <div class="modal-footer">
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
      var Info = document.getElementById('Info').value
      var NP = Nom + ' ' + Prenom
      const doc = new Jspdf()
      doc.setFontSize(9)
      doc.text(NP, 10, 15)
      doc.text(Mail, 10, 20)
      doc.text(Postal, 10, 25)
      doc.text(Ville, 10, 30)
      doc.text(Organisme, 160, 35)
      doc.text(Mailorga, 160, 40)
      doc.text(Postalorga, 160, 45)
      doc.text(Villeorga, 160, 50)
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
  }
}
</script>
