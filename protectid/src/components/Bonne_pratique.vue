<template>
  <!-- bonne pratique -->
  <section class="page-section" id="">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1 class="section-heading text-uppercase" style="margin: 70px">Bonnes Pratiques</h1>
        </div>
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" data-interval="5000">
          <div class="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../../img/img1.jpg" class="d-block w-100" alt="First Slide">
              <router-link to="/reglemdp">
                <div class="carousel-caption d-none d-md-block">
                  <h3>6 règles a suivre pour créer un mot de passe</h3>
                  <p style="font-size: 20px">Un mot de passe bien construit vous assure une sécurité.</p>
                </div>
              </router-link>
            </div>
            <div class="carousel-item">
              <img src="../../img/img2.jpeg" class="d-block w-100" alt="Second Slide">
              <router-link to="protectrs">
                <div class="carousel-caption d-none d-md-block">
                  <h3>Se protéger sur un réseau public</h3>
                  <p style="font-size: 20px">4 moyens de se protéger.</p>
                </div>
              </router-link>
            </div>
             <div class="carousel-item">
              <img src="../../img/img3.jpg" class="d-block w-100" alt="Third Slide">
              <div class="carousel-caption d-none d-md-block">
                 <h3 style=" color:black">Bonne pratique</h3>
                 <p style="font-size: 20px; color:black">Nos Bonnes pratiques.</p>
               </div>               
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Précédent</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Suivant</span>
          </a>
        </div>              
      </div>

      <h2 class="bp" style="padding-top:45px;">Nos bonnes pratiques récentes</h2>

      <div class="bprecent-container">
        <router-link to="reglemdp">
          <img 
            src="../../img/img1.jpg" alt="mdp" style="margin: 15px">
            <h5>6 règles a suivre pour créer un mot de passe</h5>
            <p class="p">12/04/2021</p>
            <p class="p">Loanne L.</p></router-link>
        <router-link to="protectrs">
          <img 
            src="../../img/img2.jpeg" alt="rs" style="margin: 15px">
            <h5>Se protéger sur un réseau public</h5>
            <p class="p">12/04/2021</p>
            <p class="p">Loanne L.</p></router-link>
        <a href="/Bonne_pratique">
          <img 
            src="../../img/img3.jpg" alt="rs" style="margin: 15px">
            <h5>Bonnes Pratiques</h5>
            <p class="p">12/04/2021</p>
            <p class="p">12/04/2021</p></a>
         <router-link to="reglemdp">
          <img 
            src="../../img/img1.jpg" alt="mdp" style="margin: 15px">
            <h5>6 règles a suivre pour créer un mot de passe</h5>
            <p class="p">12/04/2021</p>
            <p class="p">Loanne L.</p></router-link>
        <router-link to="protectrs">
          <img 
            src="../../img/img2.jpeg" alt="rs" style="margin: 15px">
            <h5>Se protéger sur un réseau public</h5>
            <p class="p">12/04/2021</p>
            <p class="p">Loanne L.</p></router-link>
        
      </div>

      <h2 class="bp">Toutes nos bonnes pratiques</h2>
      
      <div class="bp-container">
        <router-link to="reglemdp" style="margin: 10px">
          <img 
            src="../../img/img1.jpg" alt="mdp"></router-link>
        
        <router-link to="protectrs" style="margin: 10px">
          <img 
            src="../../img/img2.jpeg" alt="rs"></router-link>
        <a href="/Bonne_pratique">
          <img 
            src="../../img/img3.jpg" alt="bp"></a>
        <router-link to="reglemdp" style="margin: 10px">
          <img 
            src="../../img/img1.jpg" alt="mdp"></router-link>
        
        <router-link to="protectrs" style="margin: 10px">
          <img 
            src="../../img/img2.jpeg" alt="rs"></router-link>
        <a href="/Bonne_pratique">
          <img 
            src="../../img/img3.jpg" alt="bp"></a>
        <router-link to="reglemdp" style="margin: 10px">
          <img 
            src="../../img/img1.jpg" alt="mdp"></router-link>
        
        <router-link to="protectrs" style="margin: 10px">
          <img 
            src="../../img/img2.jpeg" alt="rs"></router-link>
        <a href="/Bonne_pratique">
          <img 
            src="../../img/img3.jpg" alt="bp"></a>
      </div>

    </div>
  </section></template>
