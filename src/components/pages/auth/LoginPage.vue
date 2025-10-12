<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
    <div class="flex min-h-screen">
      <!-- Left Section - Form -->
      <div
        class="flex-1 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20"
      >
        <div
          class="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-sm overflow-hidden"
        >
          <!-- Logo -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
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
                <span class="text-xl font-bold text-gray-900 dark:text-gray-100"
                  >Synapse</span
                >
                <div class="text-xs font-medium" style="color: #0b6e6b">
                  Professionnels
                </div>
              </div>
            </div>

            <!-- Back to Home Link -->
            <RouterLink
              to="/"
              class="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span class="text-sm font-medium">Retour à l'accueil</span>
            </RouterLink>
          </div>

          <!-- Header -->
          <div class="mb-6 sm:mb-8">
            <h2
              class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100"
            >
              Connexion
            </h2>
            <p
              class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
            >
              Accès réservé aux professionnels de santé
            </p>
          </div>

          <!-- Form -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Email -->
              <BaseInput
                v-model="form.email"
                type="email"
                label="Adresse email"
                placeholder="votre@email.com"
                :error="errors.email"
                required
                autocomplete="email"
              />

              <!-- Password -->
              <BaseInput
                v-model="form.password"
                type="password"
                label="Mot de passe"
                placeholder="••••••••"
                :error="errors.password"
                required
                autocomplete="current-password"
              />

              <!-- Remember Me -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    v-model="form.remember"
                    type="checkbox"
                    class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Se souvenir de moi
                  </label>
                </div>
                <RouterLink
                  to="/auth/forgot-password"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  Mot de passe oublié ?
                </RouterLink>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="text-red-600 dark:text-red-400 text-sm"
              >
                {{ errorMessage }}
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full px-4 py-3 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style="
                  background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%);
                "
              >
                <span v-if="!isLoading">Se connecter</span>
                <span v-else class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connexion en cours...
                </span>
              </button>
            </form>
          </div>

          <!-- Demo credentials -->
          <div
            class="mt-4 sm:mt-6 rounded-lg sm:rounded-xl p-3 sm:p-4"
            style="
              background-color: rgba(11, 110, 107, 0.05);
              border: 1px solid rgba(11, 110, 107, 0.2);
            "
          >
            <div class="text-center">
              <h3 class="text-sm font-medium mb-3" style="color: #0b6e6b">
                Comptes de démonstration
              </h3>
              <div class="space-y-3 text-xs" style="color: #0b6e6b">
                <div class="space-y-1">
                  <div class="break-all font-medium">
                    Pharmacien: pharma@demo.com / demo123
                  </div>
                  <div class="break-all font-medium">
                    Médecin: medecin@demo.com / demo123
                  </div>
                  <div class="break-all font-medium">
                    Étudiant: etudiant@demo.com / demo123
                  </div>
                  <div class="break-all font-medium">
                    Sage-femme: sage@demo.com / demo123
                  </div>
                  <div class="break-all font-medium">
                    Admin: admin@demo.com / demo123
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Login link -->
          <div class="mt-4 sm:mt-6 text-center">
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Pas encore de compte ?
              <RouterLink
                to="/auth/signup"
                class="font-medium hover:underline transition-colors"
                style="color: #0b6e6b"
              >
                Créer un compte
              </RouterLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Right Section - Image -->
      <div
        class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center overflow-hidden"
        style="background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%)"
      >
        <div class="relative w-full h-full">
          <!-- Background Pattern -->
          <div
            class="absolute inset-0"
            style="
              background: linear-gradient(
                135deg,
                rgba(11, 110, 107, 0.9) 0%,
                rgba(10, 90, 88, 0.9) 100%
              );
            "
          ></div>
          <div
            class="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-48 translate-x-48"
            style="background-color: rgba(255, 255, 255, 0.1)"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-80 h-80 rounded-full translate-y-40 -translate-x-40"
            style="background-color: rgba(255, 255, 255, 0.05)"
          ></div>

          <!-- Content -->
          <div
            class="relative z-10 flex flex-col items-center justify-center h-full text-center px-12"
          >
            <div class="max-w-md">
              <div
                class="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8"
                style="background-color: rgba(255, 255, 255, 0.2)"
              >
                <svg
                  class="w-12 h-12 text-white"
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

              <h3 class="text-3xl font-bold text-white mb-4">
                Formation Continue pour les Professionnels de Santé
              </h3>

              <p class="text-lg text-gray-200 mb-8 leading-relaxed">
                Développez vos compétences avec nos formations certifiantes en
                pharmacovigilance, interactions médicamenteuses et gestion
                pharmaceutique au Sénégal.
              </p>

              <div class="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div class="text-2xl font-bold text-white mb-1">2,500+</div>
                  <div class="text-sm text-gray-300">Professionnels</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-white mb-1">50+</div>
                  <div class="text-sm text-gray-300">Formations</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-white mb-1">98%</div>
                  <div class="text-sm text-gray-300">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseInput from "@/components/atoms/BaseInput.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const errors = reactive({
  email: "",
  password: "",
});

const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  let isValid = true;

  if (!form.email.trim()) {
    errors.email = "L'email est requis";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "L'email n'est pas valide";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Le mot de passe est requis";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const result = await authStore.login({
      email: form.email,
      password: form.password,
    });

    if (result.success) {
      // Rediriger vers le dashboard approprié
      const redirectTo = result.redirectTo || route.query.redirect || "/";
      router.push(redirectTo);
    } else {
      errorMessage.value = result.error || "Identifiants incorrects";
    }
  } catch (error) {
    errorMessage.value = error.message || "Identifiants incorrects";
  } finally {
    isLoading.value = false;
  }
};
</script>
