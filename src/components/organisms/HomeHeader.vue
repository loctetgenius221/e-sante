<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
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
            <div class="hidden sm:block">
              <span class="text-xl font-bold text-gray-900 dark:text-gray-100"
                >Synapse</span
              >
              <div class="text-xs font-medium" style="color: #0b6e6b">
                Professionnels
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Dark mode toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              v-if="!darkMode"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          <div class="hidden md:flex items-center space-x-3">
            <!-- Contact Button -->
            <div class="hidden md:flex">
              <button
                @click="openContactModal"
                class="text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:shadow-sm flex items-center space-x-2"
                style="
                  &:hover {
                    background-color: rgba(11, 110, 107, 0.1);
                    color: #0b6e6b;
                  }
                "
              >
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
                <span>Nous contacter</span>
              </button>
            </div>
            <RouterLink
              to="/auth/login"
              class="text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:shadow-sm"
              style="
                &:hover {
                  background-color: rgba(11, 110, 107, 0.1);
                  color: #0b6e6b;
                }
              "
            >
              Connexion
            </RouterLink>
            <RouterLink
              to="/auth/signup"
              class="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
              style="
                background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%);
              "
            >
              S'inscrire
            </RouterLink>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
      >
        <!-- Mobile Contact Button -->
        <div class="mb-4">
          <button
            @click="openContactModal"
            class="w-full text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:shadow-sm flex items-center space-x-2"
            style="
              &:hover {
                background-color: rgba(11, 110, 107, 0.1);
                color: #0b6e6b;
              }
            "
          >
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
            <span>Nous contacter</span>
          </button>
        </div>

        <!-- Mobile Auth Actions -->
        <div class="flex items-center space-x-3 pt-4">
          <RouterLink
            to="/auth/login"
            class="text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:shadow-sm"
            style="
              &:hover {
                background-color: rgba(11, 110, 107, 0.1);
                color: #0b6e6b;
              }
            "
          >
            Connexion
          </RouterLink>
          <RouterLink
            to="/auth/signup"
            class="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
            style="
              background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%);
            "
          >
            S'inscrire
          </RouterLink>
        </div>
      </div>
    </div>
  </header>

  <!-- Contact Modal -->
  <div
    v-if="contactModalOpen"
    class="fixed inset-0 z-50 overflow-hidden"
    @click="closeContactModal"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
    ></div>

    <!-- Modal Panel -->
    <div
      class="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out"
      @click.stop
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            style="
              background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%);
            "
          >
            <svg
              class="w-4 h-4 text-white"
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
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Nous contacter
          </h2>
        </div>
        <button
          @click="closeContactModal"
          class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Contact Information -->
        <div class="mb-8">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            style="color: #0b6e6b"
          >
            Informations de contact
          </h3>

          <div class="space-y-4">
            <!-- Email -->
            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
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
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Email
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  contact@frontesante.sn
                </p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
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
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Téléphone
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  +221 33 XXX XX XX
                </p>
              </div>
            </div>

            <!-- Address -->
            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
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
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Adresse
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Dakar, Sénégal
                </p>
              </div>
            </div>

            <!-- Hours -->
            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Horaires
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Lun - Ven: 8h00 - 18h00
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            style="color: #0b6e6b"
          >
            Questions fréquentes
          </h3>

          <div class="space-y-3">
            <!-- FAQ Item 1 -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                @click="toggleFaq(1)"
                class="w-full px-4 py-3 text-left flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>Comment accéder à la plateforme ?</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': openFaq === 1 }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                v-if="openFaq === 1"
                class="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <p>
                  La plateforme est accessible uniquement aux professionnels de
                  santé. Vous devez créer un compte avec vos informations
                  professionnelles pour accéder aux formations et services.
                </p>
              </div>
            </div>

            <!-- FAQ Item 2 -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                @click="toggleFaq(2)"
                class="w-full px-4 py-3 text-left flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>Quels types de formations sont disponibles ?</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': openFaq === 2 }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                v-if="openFaq === 2"
                class="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <p>
                  Nous proposons des formations continues certifiantes dans tous
                  les domaines de la santé : médecine générale, spécialités
                  médicales, pharmacie, soins infirmiers, et bien plus encore.
                </p>
              </div>
            </div>

            <!-- FAQ Item 3 -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                @click="toggleFaq(3)"
                class="w-full px-4 py-3 text-left flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>Les certificats sont-ils reconnus ?</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': openFaq === 3 }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                v-if="openFaq === 3"
                class="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <p>
                  Oui, tous nos certificats sont reconnus par les instances
                  professionnelles sénégalaises et permettent de valider vos
                  heures de formation continue obligatoire.
                </p>
              </div>
            </div>

            <!-- FAQ Item 4 -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                @click="toggleFaq(4)"
                class="w-full px-4 py-3 text-left flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>Comment fonctionne le support technique ?</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': openFaq === 4 }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                v-if="openFaq === 4"
                class="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <p>
                  Notre équipe de support technique est disponible du lundi au
                  vendredi de 8h00 à 18h00. Vous pouvez nous contacter par email
                  ou téléphone pour toute assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const mobileMenuOpen = ref(false);
const contactModalOpen = ref(false);
const openFaq = ref(null);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const darkMode = computed(() => authStore.darkMode);

const toggleDarkMode = () => {
  authStore.toggleDarkMode();
};

const logout = () => {
  authStore.logout();
  router.push("/");
  mobileMenuOpen.value = false;
};

const openContactModal = () => {
  contactModalOpen.value = true;
  mobileMenuOpen.value = false;
};

const closeContactModal = () => {
  contactModalOpen.value = false;
  openFaq.value = null;
};

const toggleFaq = (faqId) => {
  openFaq.value = openFaq.value === faqId ? null : faqId;
};
</script>
