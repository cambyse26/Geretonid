<template>

  <!-- Services -->
  <section class="page-section" id="services">
    
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

        <a 
          class="accordion-droit"
           v-on:click.prevent="setActive('acces')" 
          :class="{ active: isActive('acces') }" 
          href="#acces"
        >
          <p>(Droit d'accès) Accéder à vos données personnelles </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('acces') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('acces') }" 
          id="acces"
        >
          <p>
            Obtenir l’ensemble des données qu’une société a récolté sur vous, savoir comment et par quel moyen elle les a récolté ainsi que<br> la finalité de cette récolte (analyse, vente etc… ), la durée de conservation de vos données.
Vous saurez qui a reçu vos données dans le cas où elles ont été transmises.

<br> En savoir plus : <a href="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces">https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces</a>
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('supprime')" 
          :class="{ active: isActive('supprime') }" 
          href="#supprime"
        >
          <p>(Droit à l’effacement) Supprimer ses données personnelles </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('supprime') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('supprime') }" 
          id="supprime"
        >
          <p>
             obliger une entreprise à supprimer toutes vos données personnelles, il faut préciser les données que vous souhaitez supprimer, pour savoir lesquelles nous vous recommandons d’exercer votre droit “accédez à vos données personnelles") 



<br>En savoir plus : <a href="https://www.cnil.fr/fr/le-droit-leffacement-supprimer-vos-donnees-en-ligne">https://www.cnil.fr/fr/le-droit-leffacement-supprimer-vos-donnees-en-ligne</a>

          </p>
        </div>
        
        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('pub')" 
          :class="{ active: isActive('pub') }" 
          href="#pub"
        >
          <p>(Droit d’opposition) Ne plus recevoir de publicité </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('pub') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('pub') }" 
          id="pub"
        > 
          <p>
            Exiger la suppression de vos coordonnées des fichiers d’envois de publicités de l’entreprise.

            <br>En savoir plus : <a href="https://www.cnil.fr/fr/le-droit-dopposition-refuser-lutilisation-de-vos-donnees">https://www.cnil.fr/fr/le-droit-dopposition-refuser-lutilisation-de-vos-donnees</a>
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('traitement')" 
          :class="{ active: isActive('traitement') }" 
          href="#traitement"
        >
          <p>(Droit d’opposition) S'opposer au traitement de données </p>
         <i class="fas fa-chevron-down" :class="{ rotate: isActive('traitement') }"></i> 
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('traitement') }" 
          id="traitement"
        >
          <p>
            Exiger d’une entreprise l'arrêt immédiat de l’analyse et de la vente de vos données, et de tout traitement de vos données personnelles. ( De nombreux algorithmes analysent vos données personnelles récoltées afin de vous cibler, et de nombreuses entreprises revendent cette analyse à d’autres sociétés.)

            <br> En savoir plus : <a href="https://www.cnil.fr/fr/le-droit-dopposition-refuser-lutilisation-de-vos-donnees">https://www.cnil.fr/fr/le-droit-dopposition-refuser-lutilisation-de-vos-donnees</a>
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('prospection')" 
          :class="{ active: isActive('prospection') }" 
          href="#prospection"
        >
          <p>S'opposer à la prospection commerciale (par sms, mail ou courrier) </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('prospection') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('prospection') }" 
          id="prospection"
        >
          <p>
            Oblige une société à ne plus vous contacter, elle doit ainsi supprimer vos données dans leurs fichiers d’envois / de prospection et notifier leurs partenaires de cette modification.
            <br> En savoir plus : <a href="https://www.cnil.fr/fr/le-droit-dopposition-refuser-lutilisation-de-vos-donnees">https://www.cnil.fr/fr/le-droit-dopposition-refuser-lutilisation-de-vos-donnees</a>
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('inexactes')" 
          :class="{ active: isActive('inexactes') }" 
          href="#inexactes"
        >
          <p>(Droit de rectification) Rectifier des données inexactes</p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('inexactes') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('inexactes') }" 
          id="inexactes"
        >
          <p>
            Modifier des données inexactes vous concernant dans les fichiers d’une entreprise.
            <br> En savoir plus : <a href="https://www.cnil.fr/fr/le-droit-de-rectification-corriger-vos-informations">https://www.cnil.fr/fr/le-droit-de-rectification-corriger-vos-informations</a>
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('incompletes')" 
          :class="{ active: isActive('incompletes') }" 
          href="#incompletes"
        >
          <p>(Droit de rectification) Rectifier des données incomplètes  </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('incompletes') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('incompletes') }" 
          id="incompletes"
        >
          <p>
            Modifier des données incomplètes sur vous dans les fichiers d’une entreprise, celle-ci doit vous informer si vos données ont été communiquées à un tiers.
            <br> En savoir plus : <a href="https://www.cnil.fr/fr/le-droit-de-rectification-corriger-vos-informations">https://www.cnil.fr/fr/le-droit-de-rectification-corriger-vos-informations</a>
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('cloturer')" 
          :class="{ active: isActive('cloturer') }" 
          href="#cloturer"
        >
          <p>(Droit à l’effacement) Clôturer un compte en ligne </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('cloturer') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('cloturer') }" 
          id="cloturer"
        >
          <p>
            Restituer les données à caractère personnel contenues dans le SI suite à la demande des personnes dans un format lisible par une machine. Seules les données communiquées par les personnes doivent lui être transmises (ex : profilage exclu).
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('videos')" 
          :class="{ active: isActive('videos') }" 
          href="#videos"
        >
          <p>Accéder à des images vidéos vous concernant</p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('videos') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('videos') }" 
          id="videos"
        >
          <p>
            Exiger une copie des images vidéos qu’une entreprise a récolté sur vous.
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('financier')" 
          :class="{ active: isActive('financier') }" 
          href="#financier"
        >
          <p>Connaître les informations détenues  par un établissement financier </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('financier') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('financier') }" 
          id="financier"
        >
          <p>
            L’entreprise est obligée de fournir les informations récoltées, d’envoyer une copie claire de l’ensemble des données (les zones “bloc-notes” ou “commentaires) et décrire comment les données ont été récoltées.
          </p>
        </div>

        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('medical')" 
          :class="{ active: isActive('medical') }" 
          href="#medical"
        >
          <p>Accéder à son dossier médical </p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('medical') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('medical') }" 
          id="medical"
        >
          <p>
            Exiger d’obtenir l’ensemble des données qu’un établissement de santé détient.
          </p>
        </div>
<!--
        <a 
          class="accordion-droit" 
          v-on:click.prevent="setActive('autre')" 
          :class="{ active: isActive('autre') }" 
          href="#autre"
        >
          <p>Voir les données de géolocalisation ou de contrôle d’accès (pas très clair)</p>
          <i class="fas fa-chevron-down" :class="{ rotate: isActive('autre') }"></i>
        </a>
        <div 
          class="accordion-panel fade" 
          :class="{ 'active show': isActive('autre') }" 
          id="autre"
        >
          <p>
            Demander si des données sur vous sont présentés dans leurs fichiers.
          </p>

        </div>
          -->
      </div>
      
    </div>

  </section>

</template>

<script>
  export default {
    name: 'Droits',

    data: function () {
      return {
        // Onglet actif (droits)
        activeItem: ''
      }
    },

    methods : {

      isActive (menuItem) {
        return this.activeItem === menuItem;
      },

      setActive (menuItem) {
        // Définir le champs actif sur l'évènement clic
        return this.activeItem = menuItem === this.activeItem ? '' : menuItem;
      },

    },
  }

</script>

<style>

.accordion .accordion-droit {
font-weight: 600 !important;
font-size: 1.4rem !important;
}

.accordion .accordion-panel {
font-weight: 500 !important;
font-size: 1.3rem !important;
text-align: initial !important;
}

p {
  margin-bottom: 0rem !important;
}
</style>
