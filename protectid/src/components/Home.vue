<template>
  <div id='app'>
    <!-- Formulaire -->
    <header class='masthead home-responsive' style="display: flex">
      <div class="container container-responsive" style="margin-top: 13vw; color:  white; margin-right: 2vw">
        <div class="mb-2"  style="color:  white;">
          <h1 class="typography-hero-product-headline" style="margin-bottom: 5vh">Et vos données, vous y pensez ?</h1>
          <h4 class="typography-eyebrow-elevated typography-eyebrow-elevated-responsive" style="">Découvrez comment et quelles données sont récoltées par les entreprises, et supprimez-les en quelques clics :</h4>
          <a class="btn btn-primary btn-xl text-uppercase btn-home btn-home-responsive" href="#services" style="margin-right: 2vh; margin-top: 3vh; color: #0c3dbb; font-weight: bold; background-color: #eee; border-color: #e9ecef;">Générer une demande</a>
          <a class="btn btn-primary btn-xl text-uppercase btn-home btn-home-responsive" href="Droit" style="margin-right: 2vh; margin-top: 3vh; color: #0c3dbb; font-weight: bold; background-color: #eee; border-color: #e9ecef;">En savoir plus sur mes droits</a>
        </div>
      </div>
      <div class="mb-2 mb-2-responsive" style="margin-top: 26vh; margin-right: 4vw">
       <iframe id="ytplayer" type="text/html" width="640px" height="340px" class="youtube-responsive" allowfullscreen
  src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe> </div> 
    </header>
    
    <!-- Services -->
    <section class="text"  id='services'>
      <div class='container'>
              <div class='container' style="text-align: center">
        <div class='etape' style="display: inline-flex; margin-bottom: 1vh;">
            <h1 class=" mb-4 step first expepa text-size ">Etape 1 : Choisissez le droit que vous voulez utiliser</h1>
            <h2 class=" mb-4 step second expepa text-size ">Etape 2 : Indiquez le nom de l'entreprise et vos informations</h2>
            <h3 class=" mb-4 step third expepa text-size ">Etape 3 : Générer le PDF et envoyez-le à l'adresse indiquée</h3>
      </div>
          <div class="droit-container">
            <div class="row d-flex justify-content-center pop" style="margin-top: 1vw; margin-bottom: 1vw; align-items: flex-end;">
            <div class="step forth" style="width: min-content;margin-right: 1vw"><p style="" class="mm89b9">Accedez à ses données</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup img-acces'
                data-toggle='modal'
                data-target='#modal'
                data-form="acces"
                data-pdf="acces"
                @click="addFields"
                style="color: transparent"
              >Droit d'accès</a></div>
              <div class="step forth" style="width: min-content;margin-right: 1vw"><p class="mm89b9">Supprimer ses données personnelles</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger step forth popup img-delete'
                data-toggle='modal'
                data-target='#modal'
                data-form="supprime"
                data-pdf="supprime"
                @click="addFields"
                style="color: transparent"
              >Supprimer ses données personnelles</a></div>
              <div class="step forth" style="width: min-content;margin-right: 1vw"><p class="mm89b9">Ne plus recevoir de publicités</p>
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
              <div class="step forth" style="width: min-content;"><p class="mm89b9">S'opposer au traitement de données</p>
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
            <div class="row d-flex justify-content-center pop" style="margin-bottom: 1vw">
            <div style="width: min-content;margin-right: 1vw"><p class="mm89b9">Clôturer un compte en ligne</p>
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
            <div style="width: min-content;margin-right: 1vw"><p class="mm89b9">Supprimer vos données d'un site internet</p>
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
              <div style="width: min-content;margin-right: 1vw"><p class="mm89b9">Accéder à des images vidéo vous concernant</p>
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
              <div style="width: min-content;"><p class="mm89b9">Stopper la prospection commerciale</p>
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
            <div style="padding-top: 1em;" class="collapse" id="collapse">
            <div class="row d-flex justify-content-center pop">
              <div style="width: min-content;margin-right: 1vw"><p class="mm89b9">Rectifier des données incomplètes</p>
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
              <div style="width: min-content;margin-right: 1vw"><p class="mm89b9">Rectifier des données inexactes</p>
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
              <div style="width: min-content;margin-right: 1vw"><p  class="mm89b9">Accéder à son dossier médical</p>
              <a
                class='btn btn-primary btn-form text-uppercase js-scroll-trigger popup img-medical'
                data-toggle='modal'
                data-target='#medical'
                @click="preview"
                style="color: transparent"
              >Accéder à son dossier médical</a>
              </div>
              <div style="width: 21vh;"><p  class="mm89b9">Accéder aux informations détenues par une banque</p>
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
        <div class='row' style="text-align: center">
          <div class='col-lg-12'>
            <h4 class="step sixth typography-eyebrow-elevated2">L'entreprise a 1 mois pour valider votre demande et peut vous demander un justificatif afin de vérifier votre identité.</h4>
            <h4 class="step sixth typography-eyebrow-elevated2">GERETONID vous permet de contrôler vos données personnelles en vous aidant à exercer vos droits.</h4>
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

.expepa {
    white-space: pre-line !important;
    max-width: 100% !important;
    font-size: 2em;
    font-weight: var(--tl-font-weight, 800) !important;
    letter-spacing: var(--tl-letter-spacing, 0em) !important;
    line-height: var(--tl-line-height, 36px) !important;
    color: var(--tl-color, #222222) !important;
    -webkit-line-clamp: var(--tl-line-clamp) !important;
}

.mm89b9 {
    font-size: 1.2em !important;
    line-height: 22px !important;
    text-overflow: ellipsis !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    color: rgb(34, 34, 34) !important;
    font-weight: 600 !important;
    white-space: pre-line !important;
    -webkit-box-pack: center;
    min-height: 7vh;
}

.typography-eyebrow-elevated {
    font-size: 2em;
    line-height: 1.14286;
    font-weight: 600;
    letter-spacing: .007em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
}

@media (max-width: 1264px) {
.typography-eyebrow-elevated-responsive {
    font-size: 1.5em;
    line-height: 1.14286;
    font-weight: 600;
    letter-spacing: .007em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
}
}

.typography-eyebrow-elevated2 {
    font-size: 1.7em;
    line-height: 1.14286;
    font-weight: 600;
    letter-spacing: .007em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
}

.typography-hero-product-headline {
    font-size: 3em;
    line-height: 1.07143;
    font-weight: 600;
    letter-spacing: -.005em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
}

@media (max-width: 1264px) {
.typography-hero-product-headline {
    font-size: 2em;
    line-height: 1.07143;
    font-weight: 600;
    letter-spacing: -.005em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
    margin-bottom: 2vh !important;
}
}

@media (max-width: 1264px) {
.etape {
display: block !important;
}
}

@media (max-width: 1264px) {
.text-size {
font-size: 1.5em !important;
}
}

@media (max-width: 1264px) {
.pop {
  max-width: 50vw;
}
}

@media (max-width: 1264px) {
.popup {
  margin-bottom: 5vh !important;
}
}

.btn-home {
  font-size: 130% !important;
}

@media (max-width: 1264px) {
.btn-home-responsive{
  font-size: 100% !important;
}
}

@media (max-width: 1520px) {
.home-responsive {
  display: block !important;
}
}

@media (max-width: 1520px) {
.container-responsive {
  margin-top: 2vw !important;
  margin-right: 0vw !important;
  margin-left: 0vw !important;
}
}

@media (max-width: 1520px) {
.youtube-responsive {
width: 80vw !important;
height: 30vh !important;
}
}

@media (max-width: 1520px) {
.mb-2-responsive {
  margin-top: 10vw !important;
}
}
</style>
