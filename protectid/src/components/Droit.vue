<template>

  <!-- Services -->
  <section class="page-section" id="services" style="margin-bottom: 6vh">
    
    <div class="container" style="margin-top: 20px;">

      <!--
        <h1 class="section-heading text-uppercase" style="margin-bottom: 70px"></h1>
          <h4> Droit à l'oubli : mise en place d'une suppression de vos données, vous pouvez choisir de supprimer tout ou partie de vos données.
          <br><br>Droit d'accès : restituer les données à caractère personnel suite à la demande des personnes
          <br><br>Droit d'information : restituer les informations demandées par les personnes sur ses données privées et les traitements effectués.
          <br><br>Droit à la portabilité : restituer les Données à caractère personnel contenues dans le SI suite à la demande des personnes dans un format lisible par une  machine. Seules les données communiquées par les personnes doivent lui être transmises (ex : profilage exclu)
          <br><br>Droit à la rectification : pouvoir modifier les DCP suite à la demandes des personnes
          <br><br>Droit d'opposition à un traitement : pouvoir arrêter certains traitements à la demande des personnes (ex : opposition au profilage,
          aux sollicitations commerciales)
          <br><br>Droit à la limitation : pouvoir arrêter plusieurs ou tous les traitements sauf le stockage des DCP à la demande des personne
          </h4>
      -->

      <h1 class="text-center mb-4">Mes différents droits</h1>

      <div class="accordion">

        <div class="accordion-droit" data-droit="acces" v-on:click="displayPanel">
          <p>Droit d'accès</p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="acces">
          <p>
            Obtenir l’ensemble des données qu’une société a récolté sur vous, savoir comment elle les a récolté.
          </p>
        </div>

        <div class="accordion-droit" data-droit="supprime" v-on:click="displayPanel">
          <p>Supprimer ses données personnelles </p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="supprime">
          <p>
            Obliger une entreprise à supprimer vos données personnelles.
          </p>
        </div>
        
        <div class="accordion-droit" data-droit="pub" v-on:click="displayPanel">
          <p>Ne plus recevoir de publicité</p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="pub">
          <p>
            Exiger la suppression de vos coordonnées des fichiers d’envois de publicités de l’entreprise.
          </p>
        </div>

        <div class="accordion-droit" data-droit="traitement" v-on:click="displayPanel">
          <p>S'opposer au traitement de données </p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="traitement">
          <p>
            Exiger d’une entreprise l'arrêt immédiat de l’analyse, la vente de vos données. Tout traitement de vos données personnelles. De nombreux algorithmes analysent vos données personnelles récoltées afin de vous cibler, il y a de nombreuses entreprises qui revendent cette analyse à d’autres sociétés.
          </p>
        </div>

        <div class="accordion-droit" data-droit="prospection" v-on:click="displayPanel">
          <p>S'opposer à la prospection commerciale (par sms, mail ou courrier )</p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="prospection">
          <p>
            Oblige une société à ne plus vous contacter, elle doit ainsi supprimer vos données dans leurs fichiers d’envois / de prospection et notifier leurs partenaires de cette modification.
          </p>
        </div>

        <div class="accordion-droit" data-droit="inexactes" v-on:click="displayPanel">
          <p>Rectifier des données inexactes </p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="inexactes">
          <p>
            Modifier des données inexactes vous concernant dans les fichiers d’une entreprise.
          </p>
        </div>

        <div class="accordion-droit" data-droit="incompletes" v-on:click="displayPanel">
          <p>Rectifier des données incomplètes </p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="incompletes">
          <p>
            Modifier des données incomplètes sur vous dans les fichiers d’une entreprise, celle-ci doit vous informer si ces données si vos données ont été communiquées à un tiers.
          </p>
        </div>

        <div class="accordion-droit" data-droit="cloturer" v-on:click="displayPanel">
          <p>Clôturer un compte en ligne</p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="cloturer">
          <p>
            Restituer les Données à caractère personnel contenues dans le SI suite à la demande des personnes dans un format lisible par une machine. Seules les données communiquées par les personnes doivent lui être transmises (ex : profilage exclu).
          </p>
        </div>

        <div class="accordion-droit" data-droit="videos" v-on:click="displayPanel">
          <p>Accéder à des images vidéos vous concernant</p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="videos">
          <p>
            Exiger une copie des images vidéos qu’une entreprise a récolté sur vous.
          </p>
        </div>

        <div class="accordion-droit" data-droit="financier" v-on:click="displayPanel">
          <p>Connaître les informations détenues  par un établissement financier </p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="financier">
          <p>
            L’entreprise est obligée de fournir les informations récoltées, d’envoyer une copie claire de l’ensemble des données (les zones “bloc-notes” ou “commentaires) et décrire comment les données ont été récoltées.
          </p>
        </div>

        <div class="accordion-droit" data-droit="medical" v-on:click="displayPanel">
          <p>Accéder à son dossier médical </p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="medical">
          <p>
            Exiger d’obtenir l’ensemble des données qu’un établissement de santé détient.
          </p>
        </div>

        <div class="accordion-droit" data-droit="autre" v-on:click="displayPanel">
          <p>Voir les données de géolocalisation ou de contrôle d’accès (pas très clair)</p>
          <i class="fas fa-chevron-down" v-on:click="displayPanel"></i>
        </div>
        <div class="accordion-panel hidden" data-panel="autre">
          <p>
            Demander si des données sur vous sont présentés dans leurs fichiers.
          </p>
        </div>

      </div>
      
    </div>

  </section>

</template>

<script type="text/javascript" src="./fontawesome/js/all.min.js"></script>
<script>

  export default {
    name: 'Droits',

    data: function () {
      return {
        activeItem: 'droit',
        hiddenItem: true,
      }
    },

    methods : {
      displayPanel ($this) {

        let panel = $this.target;
        const icon = panel.childNodes[1];  
        const active = document.querySelector('.accordion-droit.active'); 
        
        if (panel === active) {
          panel.classList.remove('active');
          active.childNodes[1].style.transform += 'rotate(180deg)';
          return document.querySelector(`[data-panel=${panel.dataset.droit}]`).classList.replace('show', 'hidden');
        }

        if (active) {
          document.querySelector(`[data-panel=${active.dataset.droit}]`).classList.replace('show', 'hidden');
          active.classList.remove('active');
          icon.style.transform += 'rotate(180deg)';
        }

        panel.classList.add('active');
        icon.style.transform += 'rotate(180deg)';
        return document.querySelector(`[data-panel=${panel.dataset.droit}]`).classList.replace('hidden', 'show');
        
      },
    },
  }

</script>