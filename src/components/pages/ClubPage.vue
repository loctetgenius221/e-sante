<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900"
  >
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      >
        <div class="text-center">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg mb-8"
          >
            <div
              class="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"
            ></div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >Communauté active • 1,247 membres</span
            >
          </div>

          <!-- Main Heading -->
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            <span
              class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Club Digital
            </span>
          </h1>

          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Rejoignez la communauté exclusive des professionnels de santé.
            <span class="text-blue-600 dark:text-blue-400 font-semibold"
              >Échangez, apprenez et grandissez</span
            >
            ensemble.
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <BaseButton
              variant="primary"
              size="lg"
              @click="$router.push('/club/dashboard')"
              class="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <template #icon-left>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </template>
              Accéder au tableau de bord
            </BaseButton>

            <BaseButton
              variant="outline"
              size="lg"
              @click="$router.push('/club/evenements')"
              class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <template #icon-left>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </template>
              Voir les événements
            </BaseButton>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
              >
                1,247
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Membres actifs
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
              >
                342
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Discussions
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2"
              >
                89
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Événements
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
              >
                156
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Opportunités
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
        >
          Une communauté qui vous accompagne
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Découvrez tous les avantages de faire partie de notre communauté
          professionnelle
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Forum -->
        <div
          class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Forum de discussion
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Échangez avec vos pairs, posez vos questions et partagez vos
              expériences professionnelles.
            </p>
            <BaseButton
              variant="outline"
              @click="$router.push('/club/forum')"
              class="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-300 dark:group-hover:border-blue-700"
            >
              Participer au forum
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </BaseButton>
          </div>
        </div>

        <!-- Messagerie -->
        <div
          class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Messagerie privée
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Communiquez en privé avec les membres de la communauté pour des
              échanges personnalisés.
            </p>
            <BaseButton
              variant="outline"
              @click="$router.push('/club/messagerie')"
              class="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:border-purple-300 dark:group-hover:border-purple-700"
            >
              Ouvrir la messagerie
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </BaseButton>
          </div>
        </div>

        <!-- Événements -->
        <div
          class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Événements
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Participez à des webinaires, conférences et formations organisées
              par la communauté.
            </p>
            <BaseButton
              variant="outline"
              @click="$router.push('/club/evenements')"
              class="group-hover:bg-green-50 dark:group-hover:bg-green-900/20 group-hover:border-green-300 dark:group-hover:border-green-700"
            >
              Voir les événements
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </BaseButton>
          </div>
        </div>

        <!-- Opportunités -->
        <div
          class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Opportunités
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Découvrez des offres d'emploi, stages et opportunités de carrière
              dans le secteur de la santé.
            </p>
            <BaseButton
              variant="outline"
              @click="$router.push('/club/opportunites')"
              class="group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:border-orange-300 dark:group-hover:border-orange-700"
            >
              Explorer les opportunités
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </BaseButton>
          </div>
        </div>

        <!-- Ressources -->
        <div
          class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Ressources
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Accédez à des documents, guides et ressources partagées par la
              communauté.
            </p>
            <BaseButton
              variant="outline"
              @click="$router.push('/club/ressources')"
              class="group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:border-indigo-300 dark:group-hover:border-indigo-700"
            >
              Consulter les ressources
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </BaseButton>
          </div>
        </div>

        <!-- Networking -->
        <div
          class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Networking
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Connectez-vous avec d'autres professionnels et développez votre
              réseau professionnel.
            </p>
            <BaseButton
              variant="outline"
              @click="$router.push('/club/membres')"
              class="group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 group-hover:border-teal-300 dark:group-hover:border-teal-700"
            >
              Découvrir les membres
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div
      class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-16"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Prêt à rejoindre la communauté ?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Rejoignez plus de 1,200 professionnels de santé et commencez à
          échanger dès aujourd'hui.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton
            variant="secondary"
            size="lg"
            @click="$router.push('/club/dashboard')"
            class="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50"
          >
            Accéder au tableau de bord
          </BaseButton>
          <BaseButton
            variant="outline"
            size="lg"
            @click="$router.push('/aide')"
            class="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white/10"
          >
            En savoir plus
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/atoms/BaseButton.vue";
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
