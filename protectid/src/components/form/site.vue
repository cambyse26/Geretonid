<script>
import Jspdf from 'jspdf'

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
              <div class="form-group">
                <label for="message-text" class="col-form-label">Nom de l'organisme</label>
                <input class="form-control" placeholder="Nom de l'organisme"  id="Organisme3">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Adresse mail de l'organisme"  id="Mailorga3">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga3">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga3">
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
  methods: {
    generatePDF () {
      var Nom = document.getElementById('Nom3').value
      var Prenom = document.getElementById('Prenom3').value
      var Mail = document.getElementById('Mail3').value
      var Postal = document.getElementById('Postal3').value
      var Ville = document.getElementById('Ville3').value
      var Organisme = document.getElementById('Organisme3').value
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
      doc.text(Organisme, 160, 35)
      doc.text(Mailorga, 160, 40)
      doc.text(Postalorga, 160, 45)
      doc.text(Villeorga, 160, 50)
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
  }
}
</script>
