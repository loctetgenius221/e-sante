<template>
  <footer
    class="bg-gray-900 dark:bg-gray-800 text-white relative overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo et Description -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              style="
                background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%);
              "
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div>
              <span class="text-xl font-bold">Front E‑Santé</span>
              <div class="text-xs font-medium" style="color: #0b6e6b">
                Professionnels
              </div>
            </div>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            Plateforme privée de formation continue pour les professionnels de
            santé au Sénégal. Développez vos compétences avec nos formations
            certifiantes et nos services spécialisés.
          </p>
        </div>

        <!-- Liens Rapides -->
        <div class="col-span-1 md:col-span-1">
          <h3 class="text-lg font-semibold mb-6" style="color: #0b6e6b">
            Nos Services
          </h3>
          <ul class="space-y-3">
            <li>
              <RouterLink
                to="/catalogue"
                class="text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center group"
              >
                <div
                  class="w-1 h-1 rounded-full mr-3 transition-colors group-hover:bg-white"
                  style="background-color: #0b6e6b"
                ></div>
                Formations E-Learning
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center group"
              >
                <div
                  class="w-1 h-1 rounded-full mr-3 transition-colors group-hover:bg-white"
                  style="background-color: #0b6e6b"
                ></div>
                Services E-Service
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/club"
                class="text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center group"
              >
                <div
                  class="w-1 h-1 rounded-full mr-3 transition-colors group-hover:bg-white"
                  style="background-color: #0b6e6b"
                ></div>
                Club E-Promotion
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/aide"
                class="text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center group"
              >
                <div
                  class="w-1 h-1 rounded-full mr-3 transition-colors group-hover:bg-white"
                  style="background-color: #0b6e6b"
                ></div>
                Support Technique
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-span-1 md:col-span-1">
          <h3 class="text-lg font-semibold mb-6" style="color: #0b6e6b">
            Contact
          </h3>
          <div class="space-y-4 text-sm text-gray-300">
            <div class="flex items-center space-x-3 group">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-white group-hover:bg-opacity-10"
                style="background-color: rgba(11, 110, 107, 0.1)"
              >
                <svg
                  class="w-4 h-4"
                  style="color: #0b6e6b"
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
              </div>
              <span class="group-hover:text-white transition-colors"
                >contact@frontesante.sn</span
              >
            </div>
            <div class="flex items-center space-x-3 group">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-white group-hover:bg-opacity-10"
                style="background-color: rgba(11, 110, 107, 0.1)"
              >
                <svg
                  class="w-4 h-4"
                  style="color: #0b6e6b"
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
              </div>
              <span class="group-hover:text-white transition-colors"
                >+221 33 XXX XX XX</span
              >
            </div>
            <div class="flex items-center space-x-3 group">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-white group-hover:bg-opacity-10"
                style="background-color: rgba(11, 110, 107, 0.1)"
              >
                <svg
                  class="w-4 h-4"
                  style="color: #0b6e6b"
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
              </div>
              <span class="group-hover:text-white transition-colors"
                >Dakar, Sénégal</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-sm text-gray-400 mb-4 md:mb-0">
            © {{ currentYear }} Front E‑Santé Professionnels. Tous droits
            réservés.
          </div>
          <div class="flex flex-wrap gap-6">
            <RouterLink
              to="/legal"
              class="text-sm text-gray-400 hover:text-white transition-all duration-200 hover:underline"
              style="
                &:hover {
                  color: #0b6e6b;
                }
              "
            >
              Mentions Légales
            </RouterLink>
            <RouterLink
              to="/privacy"
              class="text-sm text-gray-400 hover:text-white transition-all duration-200 hover:underline"
              style="
                &:hover {
                  color: #0b6e6b;
                }
              "
            >
              Politique de Confidentialité
            </RouterLink>
            <RouterLink
              to="/terms"
              class="text-sm text-gray-400 hover:text-white transition-all duration-200 hover:underline"
              style="
                &:hover {
                  color: #0b6e6b;
                }
              "
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
