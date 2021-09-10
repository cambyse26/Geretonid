<template>
  <div id='app'>
    <!-- Formulaire -->
    <header class='masthead' style="display: flex">
      <div class="container" style="margin-top: 10vh; margin-left: 14rem; color:  white;">
        <div class="mb-2"  style="margin-top: 18vh; color:  white; margin-left: -25vh;">
          <h1 class="" style="margin-bottom: 5vh">Et vos données, vous y pensez ?</h1>
          <h4 class="" style="margin-left: 12vh; margin-right: 12vh">Découvrez comment et quelles données sont récoltées par les entreprises, et supprimez-les en quelques clics</h4>
          <a class="btn btn-primary btn-xl text-uppercase" href="#services" style="margin-right: 2vh; margin-top: 4vh; color: #0c3dbb; font-weight: bold; background-color: #eee; border-color: #e9ecef;">Générer une demande</a>
          <a class="btn btn-primary btn-xl text-uppercase" href="#services" style="margin-right: 2vh; margin-top: 4vh; color: #0c3dbb; font-weight: bold; background-color: #eee; border-color: #e9ecef;">En savoir plus sur mes droits</a>
        </div>
      </div>
      <div class="mb-2" style="margin-top: 26vh; margin-right: 10vw">
       <iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe> </div> 
    </header>
    
    <!-- Services -->
    <section class="text"  id='services'>
      <div class='container'>
              <div class='container'>
        <div class='intro-text' style="display: inline-flex; margin-bottom: 3vh">
            <h1 class="h4 mb-3 step first">Etape 1 : Choisissez le droit que vous voulez utiliser</h1>
            <h2 class="h4 mb-3 step second">Etape 2 : Indiquez le nom de l'entreprise et vos informations</h2>
            <h3 class="h4 mb-3 step third">Etape 3 : Générer le PDF et envoyez-le à l'adresse indiquée</h3>
      </div>
          <div class="droit-container">
            <div class="row d-flex justify-content-center" style="margin-top: 1vw; margin-bottom: 1vw; align-items: flex-end;">
            <div class="step forth" style="width: min-content;"><p style="padding-bottom: 0.8rem">Droit d'accès</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup img-acces'
                data-toggle='modal'
                data-target='#modal'
                data-form="acces"
                data-pdf="acces"
                @click="addFields"
                style="color: transparent"
              >Droit d'accès</a></div>
              <div class="step forth" style="width: min-content;"><p>Supprimer ses données personnelles</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup img-delete'
                data-toggle='modal'
                data-target='#modal'
                data-form="supprime"
                data-pdf="supprime"
                @click="addFields"
                style="color: transparent"
              >Supprimer ses données personnelles</a></div>
              <div class="step forth" style="width: min-content;"><p>Ne plus recevoir de publicités</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup img-ban' 
                data-toggle='modal'
                data-target='#modal'
                data-form="pub"
                data-pdf="pub"
                @click="addFields"
                style="color: transparent"
              >Ne plus recevoir de publicités</a>
              </div>
              <div class="step forth" style="width: min-content;"><p>S'opposer au traitement de données</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup img-opposer' 
                data-toggle='modal'
                data-target='#modal'
                data-form="traitement"
                data-pdf="traitement"
                @click="addFields"
                style="color: transparent"
              >S'opposer au traitement de données</a>
              </div>
            </div>
            <div class="row d-flex justify-content-center" style="margin-bottom: 1vw">
            <div style="width: min-content;"><p>Clôturer un compte en ligne</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-supprimer-compte' 
                data-toggle='modal'
                data-target='#modal'
                data-form="compte"
                data-pdf="compte"
                @click="addFields"
                style="color: transparent"
              >Clôturer un compte en ligne</a>
            </div>
            <div style="width: min-content;"><p>Supprimer vos données d'un site internet</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-delete-web' 
                data-toggle='modal'
                data-target='#modal'
                data-form="site"
                data-pdf="site"
                @click="addFields"
                style="color: transparent"
              >Supprimer vos données d'un site</a>
            </div>
              <div style="width: min-content;"><p>Accéder à des images vidéo vous concernant</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-camera' 
                data-toggle='modal'
                data-target='#modal'
                data-form="video"
                data-pdf="video"
                @click="addFields"
                style="color: transparent"
              >Accéder à des images vidéo vous concernant</a>
              </div>
              <div style="width: min-content;"><p>Stopper la prospection commerciale</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-prospection'
                data-toggle='modal'
                data-target='#modal'
                data-form="prospection"
                data-pdf="prospection"
                @click="addFields"
                style="color: transparent"
              >Stopper la prospection commerciale</a>
              </div>
            </div>
            <div style="padding-top: 1rem;" class="collapse" id="collapse">
            <div class="row d-flex justify-content-center">
              <div style="width: min-content;"><p>Rectifier des données incomplètes</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-incomplet'
                data-toggle='modal'
                data-target='#modal'
                data-form="rectifier"
                data-pdf="incompletes"
                @click="addFields"
                style="color: transparent"
              >Rectifier des données incomplètes</a>
              </div>
              <div style="width: min-content;"><p>Rectifier des données inexactes</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-inexacte'
                data-toggle='modal'
                data-target='#modal'
                data-form="rectifier"
                data-pdf="inexactes"
                @click="addFields"
                style="color: transparent"
              >Rectifier des données inexactes</a>
              </div>
              <div style="width: min-content;"><p>Accéder à son dossier médical</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-medical'
                data-toggle='modal'
                data-target='#medical'
                @click="preview"
                style="color: transparent"
              >Accéder à son dossier médical</a>
              </div>
              <div style="width: 21vh;"><p>Accéder aux informations détenues par une banque</p>
              <a
                class='btn btn-form text-uppercase js-scroll-trigger popup img-banque'
                data-toggle='modal'
                data-target='#modal'
                data-form="financier"
                data-pdf="financier"
                @click="addFields"
                style="color: transparent"
              >Connaître les informations détenues par un établissement financier</a>
              </div>
          </div>
          </div>
        </div>
           <!-- id="togg1" --> <button data-toggle="collapse" href="#collapse" role="button" aria-expanded="false" aria-controls="collapse" class='btn btn-primary btn-xl text-uppercase js-scroll-trigger step fifth' to='/droit'
            style='margin: auto; background-color: #184abb; margin-bottom: 1rem; margin-top: 1rem; color: white'>Plus de demande</button>
      </div>
      <!-- <router-link
            class='text-uppercase js-scroll-trigger step fifth' 
            to='/droit'
          >Quel droit choisir ?</router-link> -->
        <div class='row'>
          <div class='col-lg-12'>
            <h4 class="step sixth">L'entreprise a 1 mois pour valider votre demande et peut vous demander un justificatif afin de vérifier votre identité.</h4>
            <h4 class="step sixth">GERETONID vous permet de contrôler vos données personnelles en vous aidant à exercer vos droits.</h4>
          </div>
        </div>     
      </div>
    </section>

    <!-- Contact -->
    <!-- <section class='page-section' id='contact'>
      <div class='container'>
        <div class='row'>
          <div class='col-lg-12 text-center'>
            <h2 class='section-heading text-uppercase'>Contactez Nous!</h2>
            <h3 class='section-subheading text-muted'>...................................</h3>
          </div>
        </div>
        <div class='row'>
          <div class='col-lg-12'>
            <form id='contactForm' name='sentMessage' novalidate='novalidate'>
              <div class='row'>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <input
                      class='form-control'
                      id='name'
                      type='text'
                      placeholder='Nom *'
                      required='required'
                      data-validation-required-message='Please enter your name.'
                    >
                    <p class='help-block text-danger'></p>
                  </div>
                  <div class='form-group'>
                    <input
                      class='form-control'
                      id='email'
                      type='email'
                      placeholder='Email *'
                      required='required'
                      data-validation-required-message='Please enter your email address.'
                    >
                    <p class='help-block text-danger'></p>
                  </div>
                  <div class='form-group'>
                    <input
                      class='form-control'
                      id='phone'
                      type='tel'
                      placeholder='Numéro de téléphone *'
                      required='required'
                      data-validation-required-message='Please enter your phone number.'
                    >
                    <p class='help-block text-danger'></p>
                  </div>
                </div>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <textarea
                      class='form-control'
                      id='message'
                      placeholder='Ton message *'
                      required='required'
                      data-validation-required-message='Please enter a message.'
                    ></textarea>
                    <p class='help-block text-danger'></p>
                  </div>
                </div>
                <div class='clearfix'></div>
                <div class='col-lg-12 text-center'>
                  <div id='success'></div>
                  <button
                    id='sendMessageButton' style='background-color: #184abb'
                    class='btn btn-primary btn-xl text-uppercase'
                    type='submit'
                  >Envoyez</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section> -->
    <!--- POP-UP -->
    <Medical></Medical>
    <Modal></Modal>
  </div>
</template>

<script>
import Modal from './form/Modal.vue';
import Medical from './form/medical.vue';
import Forms from '@/services/Forms';
import Vue from 'vue';
import PDF from '@/services/PDF';
import DisableAutocomplete from 'vue-disable-autocomplete';
Vue.use(DisableAutocomplete);

export default {
  components: {
    Medical,
    Modal,
  }, 
  methods: {
    addFields($this) {
      
      Forms.changeModalTitle($this.srcElement); // Modifier le titre de la modal
      Forms.addModalFields($this.srcElement); // Ajouter les champs complémentaires des modal
      Forms.changePdfButton($this.srcElement); // Modifier le pdf à générer
      Forms.changePreview($this.srcElement); // Modifier la preview à afficher 

      // Récupère les valeurs du formulaire (pop-up)
      let values = { 
        ...Forms.getValues(`${$this.srcElement.dataset.target} .form-select`), 
        ...Forms.getValues(`${$this.srcElement.dataset.target} .form-control`), 
      };
      //  Initialise les valeurs de l'organisme pour la preview 
      values['currentOrganisme'] = '';
      
      // Affiche la preview si la fénêtre fait plus de 1000px en largueur
      if (window.innerWidth > 1000) {        
        PDF.preview($this.srcElement.dataset.pdf, values, "#preview-modal-pdf");
      }
    },
    preview($this) {
      // Récupère les valeurs du formulaire (pop-up)
      let values = { 
        ...Forms.getValues(`${$this.srcElement.dataset.target} .form-select`), 
        ...Forms.getValues(`${$this.srcElement.dataset.target} .form-control`), 
      };
      //  Initialise les valeurs de l'organisme pour la preview 
      values['currentOrganisme'] = '';

      // Affiche la preview si la fénêtre fait plus de 1000px en largueur      
      if (window.innerWidth > 1000) {        
        PDF.previewMedical(values, "#preview-medical-pdf");
      }
    },
  }
}
</script>

<style>

.row {
  justify-content: center;
}
 
.modal-title {
    max-inline-size: fit-content;
    word-spacing: 0.2rem;
    font-weight: 700;
}

.img-acces {
    background-image: url("../../img/Popup_img/search-folder.png");
    background-size: 5rem !important;
    background-position: center;
}

.img-delete {
    background-image: url("../../img/Popup_img/delete.png");
    background-size: 5rem !important;
    background-position: center;
}

.img-ban {
    background-image: url("../../img/Popup_img/ban-solid.png");
    background-size: 5rem !important;
    background-position: center;
}

.img-delete-web {
    background-image: url("../../img/Popup_img/delete_web.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-camera {  
    background-image: url("../../img/Popup_img/camera.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-medical {  
    background-image: url("../../img/Popup_img/medical.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-supprimer-compte {
    background-image: url("../../img/Popup_img/supprimer_compte.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-banque {
    background-image: url("../../img/Popup_img/banque.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-opposer {
    background-image: url("../../img/Popup_img/opposer.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-prospection {
    background-image: url("../../img/Popup_img/prospection.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-inexacte {
    background-image: url("../../img/Popup_img/inexacte.png");
    background-size: 5rem !important;
    background-position: center;
}
.img-incomplet {
    background-image: url("../../img/Popup_img/incomplet.png");
    background-size: 5rem !important;
    background-position: center;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto&display=swap');
body {
font-family: 'Times New Roman', Times, serif;
}
</style>
