<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Mentions Légales
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Informations légales et réglementaires concernant la plateforme
            Front E-Santé
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <BaseCard class="sticky top-24">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Navigation
            </h3>
            <nav class="space-y-2">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="activeSection = section.id"
                :class="getSectionClasses(section.id)"
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              >
                {{ section.title }}
              </button>
            </nav>
          </BaseCard>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Terms of Service -->
          <div v-if="activeSection === 'terms'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Conditions d'Utilisation
            </h2>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  1. Objet des Conditions d'Utilisation
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Les présentes conditions d'utilisation ont pour objet de
                  définir les modalités et conditions dans lesquelles Front
                  E-Santé met à disposition des utilisateurs la plateforme de
                  formation en ligne destinée aux professionnels de santé au
                  Sénégal.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  2. Acceptation des Conditions
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  L'utilisation de la plateforme implique l'acceptation pleine
                  et entière des présentes conditions d'utilisation. Ces
                  conditions prévalent sur toute autre condition figurant dans
                  tout autre document, sauf dérogation préalable, expresse et
                  écrite.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  3. Accès au Service
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  L'accès à la plateforme est réservé aux professionnels de
                  santé exerçant au Sénégal. Les utilisateurs doivent créer un
                  compte en fournissant des informations exactes et à jour
                  concernant leur identité et leur statut professionnel.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  4. Utilisation de la Plateforme
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p>L'utilisateur s'engage à :</p>
                  <ul class="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Utiliser la plateforme conformément à sa destination
                    </li>
                    <li>
                      Ne pas porter atteinte à l'ordre public et aux bonnes
                      mœurs
                    </li>
                    <li>Respecter les droits de propriété intellectuelle</li>
                    <li>
                      Ne pas diffuser de contenus illicites ou inappropriés
                    </li>
                    <li>
                      Maintenir la confidentialité de ses identifiants d'accès
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  5. Propriété Intellectuelle
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Tous les contenus présents sur la plateforme (textes, images,
                  vidéos, etc.) sont protégés par le droit d'auteur et
                  appartiennent à Front E-Santé ou à ses partenaires. Toute
                  reproduction, représentation, modification, publication,
                  adaptation de tout ou partie des éléments du site est
                  interdite, sauf autorisation écrite préalable.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  6. Limitation de Responsabilité
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Front E-Santé ne peut être tenu responsable des dommages
                  directs et indirects causés au matériel de l'utilisateur, lors
                  de l'accès au site. Front E-Santé décline toute responsabilité
                  quant à l'utilisation qui pourrait être faite des informations
                  et contenus présents sur la plateforme.
                </p>
              </div>
            </div>
          </div>

          <!-- Privacy Policy -->
          <div v-else-if="activeSection === 'privacy'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Politique de Confidentialité
            </h2>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  1. Collecte des Données
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Front E-Santé collecte les données personnelles nécessaires au
                  fonctionnement de la plateforme, notamment lors de
                  l'inscription et de l'utilisation des services. Ces données
                  incluent les informations d'identification, de contact et
                  d'activité professionnelle.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  2. Utilisation des Données
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p>Les données collectées sont utilisées pour :</p>
                  <ul class="list-disc list-inside space-y-1 ml-4">
                    <li>Gérer l'accès aux formations et services</li>
                    <li>Personnaliser l'expérience utilisateur</li>
                    <li>Générer les certificats de formation</li>
                    <li>Communiquer avec les utilisateurs</li>
                    <li>Améliorer la qualité des services</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  3. Partage des Données
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Front E-Santé ne communique les données personnelles à des
                  tiers que dans les cas strictement nécessaires au
                  fonctionnement du service ou lorsque la loi l'exige. Aucune
                  donnée n'est vendue ou échangée à des fins commerciales.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  4. Sécurité des Données
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Front E-Santé met en œuvre toutes les mesures techniques et
                  organisationnelles appropriées pour protéger les données
                  personnelles contre la destruction, la perte, l'altération, la
                  divulgation ou l'accès non autorisés.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  5. Droits des Utilisateurs
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p>
                    Conformément à la réglementation, vous disposez des droits
                    suivants :
                  </p>
                  <ul class="list-disc list-inside space-y-1 ml-4">
                    <li>Droit d'accès à vos données personnelles</li>
                    <li>Droit de rectification en cas d'inexactitude</li>
                    <li>Droit à l'effacement (droit à l'oubli)</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité des données</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  6. Conservation des Données
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Les données personnelles sont conservées pendant la durée
                  nécessaire aux finalités pour lesquelles elles sont traitées,
                  conformément aux obligations légales et réglementaires
                  applicables.
                </p>
              </div>
            </div>
          </div>

          <!-- Legal Notice -->
          <div v-else-if="activeSection === 'legal-notice'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Mentions Légales
            </h2>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Éditeur du Site
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p><strong>Raison sociale :</strong> Front E-Santé</p>
                  <p><strong>Forme juridique :</strong> Association</p>
                  <p><strong>Adresse :</strong> Dakar, Sénégal</p>
                  <p><strong>Téléphone :</strong> +221 33 812 34 56</p>
                  <p><strong>Email :</strong> contact@frontesante.sn</p>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Directeur de Publication
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p><strong>Nom :</strong> Dr. Amadou DIALLO</p>
                  <p><strong>Qualité :</strong> Président de l'association</p>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Hébergement
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p><strong>Hébergeur :</strong> OVH</p>
                  <p>
                    <strong>Adresse :</strong> 2 rue Kellermann - 59100 Roubaix
                    - France
                  </p>
                  <p><strong>Téléphone :</strong> 1007</p>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Propriété Intellectuelle
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  L'ensemble de ce site relève de la législation sénégalaise et
                  internationale sur le droit d'auteur et la propriété
                  intellectuelle. Tous les droits de reproduction sont réservés,
                  y compris pour les documents téléchargeables et les
                  représentations iconographiques et photographiques.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Liens Hypertextes
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Les liens hypertextes mis en place dans le cadre du présent
                  site web en direction d'autres ressources présentes sur le
                  réseau Internet ne sauraient engager la responsabilité de
                  Front E-Santé.
                </p>
              </div>
            </div>
          </div>

          <!-- GDPR Compliance -->
          <div v-else-if="activeSection === 'gdpr'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Conformité RGPD
            </h2>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Engagement RGPD
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Front E-Santé s'engage à respecter les principes du Règlement
                  Général sur la Protection des Données (RGPD) dans le
                  traitement des données personnelles des utilisateurs, même si
                  le RGPD ne s'applique pas directement au Sénégal.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Base Légale du Traitement
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p>
                    Les traitements de données personnelles sont fondés sur :
                  </p>
                  <ul class="list-disc list-inside space-y-1 ml-4">
                    <li>Le consentement de l'utilisateur</li>
                    <li>
                      L'exécution d'un contrat ou de mesures précontractuelles
                    </li>
                    <li>L'intérêt légitime de Front E-Santé</li>
                    <li>Le respect d'une obligation légale</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Exercice des Droits
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Pour exercer vos droits (accès, rectification, effacement,
                  portabilité, limitation, opposition), vous pouvez nous
                  contacter à l'adresse :
                  <a
                    href="mailto:dpo@frontesante.sn"
                    class="text-blue-600 dark:text-blue-400 hover:underline"
                    >dpo@frontesante.sn</a
                  >
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Délégué à la Protection des Données
                </h3>
                <div class="text-gray-600 dark:text-gray-400 space-y-2">
                  <p><strong>Contact DPO :</strong> dpo@frontesante.sn</p>
                  <p>
                    <strong>Mission :</strong> Veiller au respect de la
                    réglementation sur la protection des données
                  </p>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Réclamations
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  En cas de non-respect de vos droits, vous pouvez introduire
                  une réclamation auprès de la Commission de Protection des
                  Données Personnelles (CDP) du Sénégal.
                </p>
              </div>
            </div>
          </div>

          <!-- Cookie Policy -->
          <div v-else-if="activeSection === 'cookies'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Politique des Cookies
            </h2>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6"
            >
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Qu'est-ce qu'un Cookie ?
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Un cookie est un petit fichier texte déposé sur votre terminal
                  (ordinateur, tablette, smartphone) lors de la visite d'un site
                  web. Il permet de reconnaître votre navigateur et de collecter
                  certaines informations.
                </p>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Types de Cookies Utilisés
                </h3>
                <div class="space-y-4">
                  <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      Cookies Techniques
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Nécessaires au fonctionnement du site (authentification,
                      préférences)
                    </p>
                  </div>

                  <div class="border-l-4 border-green-500 pl-4">
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      Cookies de Performance
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Permettent d'analyser l'utilisation du site pour
                      l'améliorer
                    </p>
                  </div>

                  <div class="border-l-4 border-orange-500 pl-4">
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      Cookies de Préférences
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Mémorisent vos choix et personnalisent votre expérience
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Gestion des Cookies
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Vous pouvez à tout moment choisir de désactiver certains
                  cookies via les paramètres de votre navigateur. Cependant,
                  cela pourrait affecter le bon fonctionnement de certaines
                  fonctionnalités du site.
                </p>

                <div
                  class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                >
                  <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Gérer vos préférences
                  </h4>
                  <p class="text-sm text-blue-700 dark:text-blue-300 mb-3">
                    Vous pouvez modifier vos préférences de cookies à tout
                    moment.
                  </p>
                  <BaseButton variant="primary" size="sm">
                    Gérer les cookies
                  </BaseButton>
                </div>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Durée de Conservation
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Les cookies sont conservés pour une durée maximale de 13 mois,
                  à l'exception des cookies techniques nécessaires au
                  fonctionnement du site.
                </p>
              </div>
            </div>
          </div>

          <!-- Other sections -->
          <div v-else>
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              {{ getSectionTitle(activeSection) }}
            </h2>
            <div class="text-center py-12">
              <div
                class="mx-auto h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8"
              >
                <svg
                  class="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Section en développement
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Cette section sera bientôt disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";

const activeSection = ref("terms");

const sections = ref([
  { id: "terms", title: "Conditions d'Utilisation" },
  { id: "privacy", title: "Confidentialité" },
  { id: "legal-notice", title: "Mentions Légales" },
  { id: "gdpr", title: "Conformité RGPD" },
  { id: "cookies", title: "Politique des Cookies" },
]);

const getSectionClasses = (sectionId) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeClasses =
    "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
  const inactiveClasses = "text-gray-600 dark:text-gray-400";

  return activeSection.value === sectionId
    ? `${baseClasses} ${activeClasses}`
    : `${baseClasses} ${inactiveClasses}`;
};

const getSectionTitle = (sectionId) => {
  const section = sections.value.find((s) => s.id === sectionId);
  return section ? section.title : "Section";
};
</script>
