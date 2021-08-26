<template>
  <div id='app'>
    <!-- Formulaire -->
    <header class='masthead' style="display: flex">
      <div class="container" style="margin-top: 18vh; color:  white;">
        <div class="mb-2"  style="margin-top: 18vh; color:  white; margin-left: -25vh;">
          <h1 class="">Welcome To Our Studio!</h1>
          <h2 class="">It's Nice To Meet You</h2>
          <a class="btn btn-primary btn-xl text-uppercase" href="#services" style="margin-right: 2vh;">Tell Me More</a>
          <a class="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
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
        <div class='intro-text' style="display: inline-flex">
            <h1 class="h4 mb-3 step first">Etape 1 : Choisissez le droit que vous voulez utiliser</h1>
            <h2 class="h4 mb-3 step second">Etape 2 : Indiquez le nom de l'entreprise et vos informations</h2>
            <h3 class="h4 mb-3 step third">Etape 3 : Générer le PDF et envoyez-le à l'adresse indiquée</h3>
      </div>
          <div class="droit-container">
            <div class="row d-flex justify-content-center" style="margin-top: 1vw; align-items: flex-end;">
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
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup img-opposition' 
                data-toggle='modal'
                data-target='#modal'
                data-form="traitement"
                data-pdf="traitement"
                @click="addFields"
                style="color: transparent"
              >S'opposer au traitement de données</a>
              </div>
            </div>
              <div style="padding-top: 1rem;" class="collapse" id="collapse">
            <div class="row d-flex justify-content-center">
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="compte"
                data-pdf="compte"
                @click="addFields"
              >Clôturer un compte en ligne</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="site"
                data-pdf="site"
                @click="addFields"
              >Supprimer des informations vous concernant d'un site internet</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="video"
                data-pdf="video"
                @click="addFields"
              >Accéder à des images vidéo vous concernant</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="prospection"
                data-pdf="prospection"
                @click="addFields"
              >Stopper la prospection commerciale</a>
            </div>
            <div class="row d-flex justify-content-center">
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup'
                data-toggle='modal'
                data-target='#modal'
                data-form="rectifier"
                data-pdf="incompletes"
                @click="addFields"
              >Rectifier des données incomplètes</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup'
                data-toggle='modal'
                data-target='#modal'
                data-form="rectifier"
                data-pdf="inexactes"
                @click="addFields"
              >Rectifier des données inexactes</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup'
                data-toggle='modal'
                data-target='#medical'
                @click="preview"
              >Accéder à son dossier médical</a>
              <a
                class='btn btn-form text-uppercase js-scroll-trigger popup'
                data-toggle='modal'
                data-target='#modal'
                data-form="financier"
                data-pdf="financier"
                @click="addFields"
              >Connaître les informations détenues par un établissement financier</a>
          </div>
          </div>
        </div>
           <!-- id="togg1" --> <button data-toggle="collapse" href="#collapse" role="button" aria-expanded="false" aria-controls="collapse" class='btn btn-primary btn-xl text-uppercase js-scroll-trigger step fifth' to='/droit'
            style='margin: auto; background-color: #184abb; margin-bottom: 1rem; margin-top: 1.5rem; color: white'>Plus de demande</button>
      </div>
       <router-link
            class='text-uppercase js-scroll-trigger step fifth' 
            to='/droit'
            style='margin: auto; margin-bottom: 1rem;'
          >Quel droit choisir ?</router-link>
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

.img-opposition {
    background-image: url("../../img/Popup_img/opposer_traitement.png");
    background-size: 5rem !important;
    background-position: center;
}
</style>
