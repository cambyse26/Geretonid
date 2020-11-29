<template>
  <div id='app'>
    <!-- Formulaire -->
    <header class='masthead'>
      <div class='container'>
        <div class='intro-text'>
          <img style=' width: 40%;' src='../../img/ProtectID_logo.png' alt>
          <div class='intro-lead-in'>Bienvenue, Sélectionnez l'objet de votre courrier :</div>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#accès'
          >Exercer son droit d'accès</a>
          <a
            class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
            data-toggle='modal'
            data-target='#supprimer'
          >Supprimer des données personnelles</a>
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
          >S’opposer à la prospection commerciale</a>
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
            >Qu’est-ce que ProtectID?</h2>
            <h4>
              ProtectID est une entreprise permettant de reprendre le contrôle de ses données afin de faire respecter votre vie privée facilement et rapidement.
              <br>
              <br>Vos données personnelles représentent des informations importantes pour les sociétés, elles sont collectées lorsque vous êtes sur internet et que vous vous inscrivez, suite à ça elles sont stockées, analysées dans le but de vous cibler.
              <br>
              <br>Le Règlement Général sur la Protection des Données (RGPD) vise à protéger vos données personnelles et faire valoir vos droits, vous pouvez éxiger un rapport détaillé de ce qu’une entreprise a récolté sur vous, savoir à quoi vos données ont servies et vous pouvez même éxiger la suppression de l’ensemble de vos données personnelles.
              <br>
              <br>Les organismes sont obligés de vous répondre où ils s’exposent à de grave sanctions, nous vous invitons à découvrir les différentes demandes que vous pouvez réaliser :
            </h4>
          </div>
          <router-link
            class='btn btn-primary btn-xl text-uppercase js-scroll-trigger' 
            to='/fonctionalities'
            style='margin: auto; background-color: #184abb'
          >Fonctionnalités</router-link>
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
