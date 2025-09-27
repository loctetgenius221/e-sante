<template>
  <footer class="bg-gray-900 dark:bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo et Description -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div
              class="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="text-xl font-bold">Front E-Santé</span>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            Plateforme de formation continue pour les professionnels de santé au
            Sénégal. Développez vos compétences avec nos formations
            certifiantes.
          </p>
        </div>

        <!-- Liens Rapides -->
        <div class="col-span-1 md:col-span-1">
          <h3 class="text-lg font-semibold mb-4">Liens Rapides</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/catalogue"
                class="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Catalogue des Formations
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Produits Pharmaceutiques
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/club"
                class="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Club Digital
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/aide"
                class="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Aide & Support
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-span-1 md:col-span-1">
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <div class="space-y-2 text-sm text-gray-300">
            <div class="flex items-center space-x-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>contact@frontesante.sn</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+221 33 XXX XX XX</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Dakar, Sénégal</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-sm text-gray-400">
            © {{ currentYear }} Front E-Santé. Tous droits réservés.
          </div>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <RouterLink
              to="/legal"
              class="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Mentions Légales
            </RouterLink>
            <RouterLink
              to="/privacy"
              class="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Politique de Confidentialité
            </RouterLink>
            <RouterLink
              to="/terms"
              class="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Conditions d'Utilisation
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>
