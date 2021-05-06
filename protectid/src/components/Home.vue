<template>
  <div id='app'>
    <!-- Formulaire -->
    <header class='masthead'>
      <div class='container'>
        <div class='intro-text'>
          <!-- <img style=' width: 25%; margin-top: 20px; height: auto;' src='../../img/ProtectID_logo.png' alt="Logo GeretonID"> -->
          <!--<div class='intro-lead-in'>Bienvenue</div>-->
            <h1 class="h4 mb-3 step first">Etape 1 : Choisissez le droit que vous voulez utiliser</h1>
            <h2 class="h4 mb-3 step second">Etape 2 : Indiquez le nom de l'entreprise et vos informations</h2>
            <h3 class="h4 mb-3 step third">Etape 3 : Générer le PDF et envoyez-le à l'adresse indiquée</h3>

          <div class="droit-container">
            <div class="row d-flex justify-content-center" style="margin-top: 7vw;">
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth acces popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="acces"
                data-pdf="acces"
                @click="addFields"
              >Droit d'accès</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth supprime popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="supprime"
                data-pdf="supprime"
                @click="addFields"
              >Supprimer ses données personnelles</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="pub"
                data-pdf="pub"
                @click="addFields"
              >Ne plus recevoir de publicités</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth opposition popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="traitement"
                data-pdf="traitement"
                @click="addFields"
              >S'opposer au traitement de données</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth cloture popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="compte"
                data-pdf="compte"
                @click="addFields"
              >Clôturer un compte en ligne</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth supprime-infos popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="site"
                data-pdf="site"
                @click="addFields"
              >Supprimer des informations vous concernant d'un site internet</a>
            </div>
            <!--<div class="step" style="width: 745px; height: 12px; background-color: blue; margin-top: 80px; margin-bottom: 80px; margin-right: 20px">

            </div>-->
            <div class="row d-flex justify-content-center">
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="video"
                data-pdf="video"
                @click="addFields"
              >Accéder à des images vidéo vous concernant</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth prospection popup' 
                data-toggle='modal'
                data-target='#modal'
                data-form="prospection"
                data-pdf="prospection"
                @click="addFields"
              >Stopper la prospection commerciale</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup'
                data-toggle='modal'
                data-target='#modal'
                data-form="rectifier"
                data-pdf="incompletes"
                @click="addFields"
              >Rectifier des données incomplètes</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup'
                data-toggle='modal'
                data-target='#modal'
                data-form="rectifier"
                data-pdf="inexactes"
                @click="addFields"
              >Rectifier des données inexactes</a>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup'
                data-toggle='modal'
                data-target='#medical'
                @click="preview"
              >Accéder à son dossier médical</a>
              <a
                class='btn btn-form text-uppercase js-scroll-trigger step forth popup'
                data-toggle='modal'
                data-target='#modal'
                data-form="financier"
                data-pdf="financier"
                @click="addFields"
              >Connaître les informations détenues par un établissement financier</a>
            </div>
          </div>
          
        </div>
      </div>
       <router-link
            class='btn btn-primary btn-xl text-uppercase js-scroll-trigger step fifth' 
            to='/droit'
            style='margin: auto; background-color: #184abb; margin-bottom: 1rem;'
          >Quel droit choisir ?</router-link>
    </header>

    <!-- Services -->
    <section class="text"  id='services'>
      <div class='container'>
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
    }
  }
}
</script>