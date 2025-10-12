<template>
  <div class="min-h-screen">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <!-- Header -->
    <HomeHeader />

    <main id="main-content">
      <!-- Hero Section -->
      <section
        class="relative bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 overflow-hidden"
      >
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <svg
            class="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <!-- Medical Cross Pattern -->
        <div class="absolute top-10 right-10 opacity-10">
          <svg
            class="w-20 h-20"
            style="color: #0b6e6b"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>

        <!-- Pulse Animation -->
        <div
          class="absolute bottom-20 left-20 w-4 h-4 rounded-full animate-float opacity-30"
          style="background-color: #0b6e6b"
        ></div>
        <div
          class="absolute top-32 left-1/4 w-2 h-2 rounded-full animate-ping opacity-40 pulse-ring"
          style="background-color: #0b6e6b"
        ></div>
        <div
          class="absolute bottom-32 right-1/4 w-3 h-3 rounded-full animate-float opacity-20"
          style="background-color: #0b6e6b"
        ></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center">
            <!-- Hero Content -->
            <div class="max-w-4xl mx-auto">
              <h1
                class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
              >
                Front E‑Santé
                <span class="gradient-text">Professionnels</span>
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Plateforme privée de formation continue pour les professionnels
                de santé au Sénégal
              </p>

              <!-- Auth CTA Buttons -->
              <div
                v-if="!authStore.isAuthenticated"
                class="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <BaseButton
                  variant="primary"
                  size="lg"
                  @click="$router.push('/auth/login')"
                  aria-label="Se connecter à la plateforme"
                >
                  <template #icon-left>
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </template>
                  Se Connecter
                </BaseButton>
                <BaseButton
                  variant="outline"
                  size="lg"
                  @click="$router.push('/auth/signup')"
                  aria-label="Créer un compte professionnel"
                >
                  <template #icon-left>
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </template>
                  S'inscrire
                </BaseButton>
              </div>

              <!-- Authenticated User Actions -->
              <div
                v-else
                class="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <BaseButton
                  variant="primary"
                  size="lg"
                  @click="$router.push('/dashboard')"
                  aria-label="Accéder au tableau de bord"
                >
                  <template #icon-left>
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
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                    </svg>
                  </template>
                  Tableau de Bord
                </BaseButton>
                <BaseButton
                  variant="outline"
                  size="lg"
                  @click="$router.push('/catalogue')"
                  aria-label="Explorer les formations"
                >
                  <template #icon-left>
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </template>
                  Formations
                </BaseButton>
              </div>

              <!-- Professional Badge -->
              <div
                class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                style="
                  background-color: rgba(11, 110, 107, 0.1);
                  color: #0b6e6b;
                "
              >
                <svg
                  class="w-4 h-4 mr-2"
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
                Accès réservé aux professionnels de santé
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Advertisement Space - Minimalist -->
      <section class="py-8 bg-gray-50 dark:bg-gray-800">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <div class="inline-block">
              <div
                class="bg-white dark:bg-gray-900 rounded-lg p-4 min-h-[100px] w-full max-w-sm mx-auto border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300"
              >
                <!-- Minimalist Ad Space -->
                <div class="flex items-center justify-center h-full">
                  <div class="text-center">
                    <div class="w-6 h-6 mx-auto mb-2 opacity-30">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        class="w-full h-full text-gray-400"
                      >
                        <path
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p
                      class="text-xs text-gray-400 dark:text-gray-500 font-medium"
                    >
                      Espace publicitaire
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <!-- Header -->
          <div class="text-center mb-16">
            <div
              class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style="background-color: rgba(11, 110, 107, 0.1)"
            >
              <svg
                class="w-8 h-8"
                style="color: #0b6e6b"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Nos Services
            </h2>
            <p
              class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Trois solutions intégrées pour optimiser votre pratique
              professionnelle
            </p>
          </div>

          <!-- Services Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- E-Learning -->
            <div
              class="service-card relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group overflow-hidden medical-pattern"
            >
              <!-- Gradient Overlay -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(11, 110, 107, 0.05) 0%,
                    transparent 100%
                  );
                "
              ></div>
              <div class="relative z-10 flex items-center mb-6">
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-lg"
                  style="
                    background: linear-gradient(
                      135deg,
                      #0b6e6b 0%,
                      #0a5a58 100%
                    );
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-gray-100"
                  >
                    E-Learning
                  </h3>
                  <p class="text-blue-600 dark:text-blue-400 text-sm">
                    Formation continue
                  </p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Formations certifiantes avec experts, quiz adaptatifs et
                certificats reconnus.
              </p>
              <div class="space-y-3 mb-6">
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Formations vidéo interactives
                </div>
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Certificats reconnus
                </div>
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Suivi de progression
                </div>
              </div>
              <BaseButton
                variant="outline"
                size="md"
                @click="$router.push('/catalogue')"
                class="w-full"
              >
                Accéder aux Formations
              </BaseButton>
            </div>

            <!-- E-Service -->
            <div
              class="service-card relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group overflow-hidden medical-pattern"
            >
              <!-- Gradient Overlay -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(11, 110, 107, 0.05) 0%,
                    transparent 100%
                  );
                "
              ></div>
              <div class="relative z-10 flex items-center mb-6">
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-lg"
                  style="
                    background: linear-gradient(
                      135deg,
                      #0b6e6b 0%,
                      #0a5a58 100%
                    );
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
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-gray-100"
                  >
                    E-Service
                  </h3>
                  <p class="text-green-600 dark:text-green-400 text-sm">
                    Services pharmaceutiques
                  </p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Accès privilégié aux produits, services de recrutement et
                support technique.
              </p>
              <div class="space-y-3 mb-6">
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Demandes de produits
                </div>
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Catalogue étendu
                </div>
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Support 24/7
                </div>
              </div>
              <BaseButton
                variant="outline"
                size="md"
                @click="$router.push('/services-pharmacie')"
                class="w-full"
              >
                Découvrir les Services
              </BaseButton>
            </div>

            <!-- E-Promotion -->
            <div
              class="service-card relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group overflow-hidden medical-pattern"
            >
              <!-- Gradient Overlay -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(11, 110, 107, 0.05) 0%,
                    transparent 100%
                  );
                "
              ></div>
              <div class="relative z-10 flex items-center mb-6">
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-lg"
                  style="
                    background: linear-gradient(
                      135deg,
                      #0b6e6b 0%,
                      #0a5a58 100%
                    );
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-gray-100"
                  >
                    E-Promotion
                  </h3>
                  <p class="text-purple-600 dark:text-purple-400 text-sm">
                    Marketing & Networking
                  </p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Communauté exclusive, promotions spéciales et développement de
                votre réseau professionnel.
              </p>
              <div class="space-y-3 mb-6">
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-purple-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Promotions exclusives
                </div>
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-purple-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Club Digital
                </div>
                <div
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="w-4 h-4 text-purple-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Networking professionnel
                </div>
              </div>
              <BaseButton
                variant="outline"
                size="md"
                @click="$router.push('/club')"
                class="w-full"
              >
                Rejoindre le Club
              </BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Simple Footer -->
      <div class="relative">
        <SimpleFooter />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseButton from "@/components/atoms/BaseButton.vue";
import HomeHeader from "@/components/organisms/HomeHeader.vue";
import SimpleFooter from "@/components/organisms/SimpleFooter.vue";

const router = useRouter();
const authStore = useAuthStore();
</script>

<style scoped>
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.skip-link:focus {
  left: 1rem;
  top: 1rem;
  width: auto;
  height: auto;
  padding: 0.5rem 0.75rem;
  background: #111827;
  color: #fff;
  border-radius: 0.375rem;
  z-index: 50;
}

/* Custom Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(11, 110, 107, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(11, 110, 107, 0.8),
      0 0 30px rgba(11, 110, 107, 0.6);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Floating Animation */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Glow Effect */
.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Shimmer Effect */
.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Medical Pattern Overlay */
.medical-pattern::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      circle at 25% 25%,
      rgba(11, 110, 107, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(11, 110, 107, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
}

/* Gradient Text Animation */
.gradient-text {
  background: linear-gradient(45deg, #0b6e6b, #0a5a58, #0b6e6b);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Card Hover Effects */
.service-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Pulse Ring Animation */
.pulse-ring {
  position: relative;
}

.pulse-ring::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid currentColor;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.4);
    opacity: 0;
  }
}
</style>
