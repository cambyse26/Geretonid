<template>
  <div>

  <!-- Header -->
  <header class="masthead">
    <div class="container">
      <div class="intro-text">
        <div class="intro-lead-in">Bienvenue !</div>
        <div class="intro-heading text-uppercase">Protect ID</div>
        <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" data-toggle="modal" data-target="#exampleModal" >Formulaire</a>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </header>

  <!-- Services -->
  <section class="page-section" id="services">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase" style="margin-bottom: 55px">Qu’est-ce que Protect ID?</h2>
<h4>ProtectID est une entreprise permettant de reprendre le contrôle de ses données afin de faire respecter votre vie privée facilement et rapidement.
<br>
<br>
Vos données personnelles représentent des informations importantes pour les sociétés, elles sont collectées lorsque vous êtes sur internet et que vous vous inscrivez, suite à ça elles sont stockées, analysées dans le but de vous cibler.
<br>
<br>
Le Règlement Général sur la Protection des Données (RGPD) vise à protéger vos données personnelles et faire valoir vos droits, vous pouvez éxiger un rapport détaillé de ce qu’une entreprise a récolté sur vous, savoir à quoi vos données ont servies et vous pouvez même éxiger la suppression de l’ensemble de vos données personnelles.
<br>
<br>
Les organismes sont obligés de vous répondre où ils s’exposent à de grave sanctions, nous vous invitons à découvrir les différentes demandes que vous pouvez réaliser :</h4>
         </div>
        <router-link class="btn btn-warning btn-xl text-uppercase js-scroll-trigger" to="/fonctionalities" style="margin: auto"> Fonctionnalités</router-link>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="page-section" id="contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Contactez Nous!</h2>
          <h3 class="section-subheading text-muted">...................................</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <form id="contactForm" name="sentMessage" novalidate="novalidate">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input class="form-control" id="name" type="text" placeholder="Nom *" required="required" data-validation-required-message="Please enter your name.">
                  <p class="help-block text-danger"></p>
                </div>
                <div class="form-group">
                  <input class="form-control" id="email" type="email" placeholder="Email *" required="required" data-validation-required-message="Please enter your email address.">
                  <p class="help-block text-danger"></p>
                </div>
                <div class="form-group">
                  <input class="form-control" id="phone" type="tel" placeholder="Numéro de téléphone *" required="required" data-validation-required-message="Please enter your phone number.">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <textarea class="form-control" id="message" placeholder="Ton message *" required="required" data-validation-required-message="Please enter a message."></textarea>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="col-lg-12 text-center">
                <div id="success"></div>
                <button id="sendMessageButton" class="btn btn-primary btn-xl text-uppercase" type="submit">Envoyez</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
</script>
