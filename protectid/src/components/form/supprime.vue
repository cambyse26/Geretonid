<script>
import Jspdf from 'jspdf'

export default {
  template: `
  <div class="modal fade" id="supprimer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">SUPPRIMER DES DONNÉES PERSONNELLES</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Informations sur la société</h5>
          </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Nom de l'organisme</label>
                <input class="form-control" placeholder="Nom de l'organisme"  id="Organisme4">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Adresse mail de l'organisme"  id="Mailorga4">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga4">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga4">
              </div>
            <form>
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
          </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Informations à supprimer</label>
                <input class="form-control" id="Info4" placeholder="Exemple: ">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Motif de la suppression</label>
                <input class="form-control" id="Motif4" placeholder="Exemple: ">
              </div>
             <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom</label>
                <input type="text" class="form-control" placeholder="Votre nom" id="Nom4">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Prénom</label>
                <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom4">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Votre adresse mail"  id="Mail4">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Votre code postal"  id="Postal4">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Votre ville" id="Ville4">
              </div>
            </form>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" v-on:click="generatePDF">Generer le PDF</button>
          </div>
        </div>
      </div>
    </div>`,
  name: 'App',
  methods: {
    generatePDF () {
      var Nom = document.getElementById('Nom4').value
      var Prenom = document.getElementById('Prenom4').value
      var Mail = document.getElementById('Mail4').value
      var Postal = document.getElementById('Postal4').value
      var Ville = document.getElementById('Ville4').value
      var Organisme = document.getElementById('Organisme4').value
      var Mailorga = document.getElementById('Mailorga4').value
      var Postalorga = document.getElementById('Postalorga4').value
      var Villeorga = document.getElementById('Villeorga4').value
      var Info = document.getElementById('Info4').value
      var Motif = document.getElementById('Motif4').value

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
      doc.text('En application de l\'article 17.1 du Règlement général sur la protection\n', 10, 100)
      doc.text('je vous prie d\'effacer de vos fichiers les données personnelles suivantes me concernant:\n', 10, 105)
      doc.text(Info, 10, 110)
      doc.text('Je demande que ces informations soient supprimées car :\n', 10, 120)
      doc.text(Motif, 10, 125)
      doc.text('Vous voudrez bien également notifier cette demande d\'effacement de mes données aux organismes\n', 10, 135)
      doc.text('auxquels vous les auriez communiquées (article 19 du RGPD).\n', 10, 140)
      doc.text('Enfin, je vous prie de m\'informer de ces éléments dans les meilleurs délais et au plus tard\n', 10, 145)
      doc.text('dans un délai d\'un mois à compter de la réception de ce courrier (article 12.3 du RGPD).\n', 10, 150)
      doc.text('A défaut de réponse de votre part dans les délais impartis ou en cas de réponse\n', 10, 155)
      doc.text('incomplète, je me réserve la possibilité de saisir la Commission nationale de\n', 10, 160)
      doc.text('l\'informatique et des libertés (CNIL) d\'une réclamation.\n', 10, 165)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 180)
      doc.text(NP, 10, 190)
      doc.save('Supprimer_données_personelles.pdf')
    }
  }
}
</script>
