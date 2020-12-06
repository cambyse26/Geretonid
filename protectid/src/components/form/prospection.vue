<script>
import Jspdf from 'jspdf'

export default {
  template: `
   <div class="modal fade" id="prospec" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">S’opposer à la prospection commerciale</h5>
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
                <input class="form-control" placeholder="Nom de l'organisme"  id="Organisme1">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Adresse mail de l'organisme"  id="Mailorga1">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga1">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga1">
              </div>
            <form>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Identifiant client ou numéro de compte</label>
                <input class="form-control" id="Identifiant" placeholder="Exemple: ">
              </div>
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
          </div>
             <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom</label>
                <input type="text" class="form-control" placeholder="Votre nom" id="Nom1">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Prénom</label>
                <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom1">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Votre adresse mail"  id="Mail1">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Votre code postal"  id="Postal1">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Votre ville" id="Ville1" >
              </div>
            </form>
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
      var Nom = document.getElementById('Nom1').value
      var Prenom = document.getElementById('Prenom1').value
      var Mail = document.getElementById('Mail1').value
      var Postal = document.getElementById('Postal1').value
      var Ville = document.getElementById('Ville1').value
      var Organisme = document.getElementById('Organisme1').value
      var Mailorga = document.getElementById('Mailorga1').value
      var Postalorga = document.getElementById('Postalorga1').value
      var Villeorga = document.getElementById('Villeorga1').value
      var Identifiant = document.getElementById('Identifiant').value
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
      doc.text('ref:',10, 80)
      doc.text(Identifiant, 18, 80)
      doc.text('Madame, Monsieur,\n', 10, 90)
      doc.text('Je vous demande de noter que je m\'oppose à ce que mes coordonnées, figurant dans vos fichiers, soient\n', 10, 100)
      doc.text('utilisées à des fins de prospection, en application de l\'article 21.2 du Règlement général sur la\n', 10, 105)
      doc.text('protection des données (RGPD).\n', 10, 115)
      doc.text('Ainsi, je vous remercie de supprimer mes coordonnées de vos fichiers d\'envoi de prospection\n', 10, 120)
      doc.text('(article 17.1 du RGPD) et de notifier cette demande de suppression aux partenaires que vous auriez\n', 10, 125)
      doc.text('rendus destinataires de mes données (article 19 du RGPD).\n', 10, 135)
      doc.text('Je vous remercie de m\'informer des mesures prises à la suite de ma demande dans les meilleurs délais et\n', 10, 140)
      doc.text('au plus tard dans un délai d\'un mois à compter de sa réception (article 12.3 du RGPD).\n', 10, 145)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 155)
      doc.text(NP, 10, 165)
      doc.save('Prospection.pdf')
    }
  }
}
</script>
