<template>
  <div id='app'>
    <!-- Formulaire -->
    <header class='masthead'>
      <div class='container'>
        <div class='intro-text'>
          <img style=' width: 40%;' src='../../img/ProtectID_logo.png' alt>
          <div class='intro-lead-in'>Bienvenue, Choisissez votre formulaire et envoyez-le à l'entreprise de votre choix :</div>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#accès'
          >Droit d'accès</a>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#supprimer'
          >Supprimer ses données personnelles</a>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#pub'
          >Ne plus recevoir de publicités</a>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#trait'
          >S'opposer au traitement de données</a>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#prospec'
          >Stopper la prospection commerciale</a>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#site'
          >Supprimer des informations vous concernant d'un site internet</a>
        </div>
      </div>
    </header>

    <!-- Services -->
    <section class='page-section' id='services'>
      <div class='container'>
        <div class='row'>
          <div class='col-lg-12 text-center'>
            <h2
              class='section-heading text-uppercase'
              style='margin-bottom: 55px'
            >Que faire ?</h2>
            <h4>
              Etape 1 : Choisissez le droit que vous voulez utiliser
              <br>
              <br>Etape 2 : Sélectionnez l’entreprise à laquelle vous souhaitez envoyer votre demande
              <br>
              <br>Etape 3 : Générer le PDF et envoyez-le à l’entreprise
               <br>
              <br>L'entreprise a 1 mois pour vous répondre (Si elle justifie que la demande est complexe, elle peut obtenir un délai de 2 mois)
               <br>
              <br>Elle peut vous demander votre carte d'identité afin d'être sûr qu'il s'agit bien de vous
              <br>
              <br>GERETONID vous permet de contrôler vos données personnelles en vous aidant à exercer vos droits.
            </h4>
          </div>
          <router-link
            class='btn btn-primary btn-xl text-uppercase js-scroll-trigger' 
            to='/droit'
            style='margin: auto; background-color: #184abb'
          >Quel droit choisir ?</router-link>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class='page-section' id='contact'>
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
    </section>
    <!--- POP-UP -->
    <Acces></Acces>
    <Supprimer></Supprimer>
    <Pub></Pub>
    <Traitement></Traitement>
    <Prospection></Prospection>
    <Site></Site>
  </div>
</template>

<script>
import Supprimer from './form/supprime.vue'
import Acces from './form/acces.vue'
import Pub from './form/pub.vue'
import Traitement from './form/traitement.vue'
import Prospection from './form/prospection.vue'
import Site from './form/site.vue'

export default {
  components: {
    Supprimer,
    Acces,
    Pub,
    Traitement,
    Prospection,
    Site
  }
}

</script>
