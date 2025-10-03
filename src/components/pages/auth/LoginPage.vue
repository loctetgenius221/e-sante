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
          <div class="flex items-center space-x-3 mb-8">
            <div
              class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center"
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
                >Front E-Santé</span
              >
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Sénégal
              </div>
            </div>
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
              Accédez à votre espace de formation
            </p>
          </div>

          <!-- Form -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Role Selection -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
                >
                  Je suis un(e) :
                </label>

                <!-- Professional Roles -->
                <div class="mb-6">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Professionnels de Santé
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      v-for="role in professionalRoles"
                      :key="role.value"
                      type="button"
                      @click="form.role = role.value"
                      :class="getRoleButtonClasses(role.value)"
                      class="p-3 text-left border rounded-lg transition-all duration-200 text-sm w-full hover:shadow-md"
                    >
                      <div class="flex items-center">
                        <svg
                          class="w-5 h-5 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            :d="role.iconPath"
                          />
                        </svg>
                        <div>
                          <span
                            class="font-medium text-gray-900 dark:text-gray-100"
                            >{{ role.label }}</span
                          >
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ role.description }}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Laboratory/Partner Roles -->
                <div class="mb-6">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-green-600"
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
                    Laboratoires/Partenaires
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      v-for="role in laboratoryRoles"
                      :key="role.value"
                      type="button"
                      @click="form.role = role.value"
                      :class="getRoleButtonClasses(role.value)"
                      class="p-3 text-left border rounded-lg transition-all duration-200 text-sm w-full hover:shadow-md"
                    >
                      <div class="flex items-center">
                        <svg
                          class="w-5 h-5 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            :d="role.iconPath"
                          />
                        </svg>
                        <div>
                          <span
                            class="font-medium text-gray-900 dark:text-gray-100"
                            >{{ role.label }}</span
                          >
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ role.description }}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Admin Role -->
                <div class="mb-4">
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Administration
                  </h3>
                  <div class="grid grid-cols-1 gap-3">
                    <button
                      v-for="role in adminRoles"
                      :key="role.value"
                      type="button"
                      @click="form.role = role.value"
                      :class="getRoleButtonClasses(role.value)"
                      class="p-3 text-left border rounded-lg transition-all duration-200 text-sm w-full hover:shadow-md"
                    >
                      <div class="flex items-center">
                        <svg
                          class="w-5 h-5 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            :d="role.iconPath"
                          />
                        </svg>
                        <div>
                          <span
                            class="font-medium text-gray-900 dark:text-gray-100"
                            >{{ role.label }}</span
                          >
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ role.description }}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <p
                  v-if="errors.role"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ errors.role }}
                </p>
              </div>

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
              <BaseButton
                type="submit"
                variant="primary"
                size="lg"
                :loading="isLoading"
                class="w-full"
              >
                Se connecter
              </BaseButton>
            </form>
          </div>

          <!-- Demo credentials -->
          <div
            class="mt-4 sm:mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <div class="text-center">
              <h3
                class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3"
              >
                Comptes de démonstration
              </h3>
              <div class="space-y-3 text-xs text-blue-700 dark:text-blue-300">
                <!-- Professional Accounts -->
                <div>
                  <h4
                    class="font-semibold text-blue-800 dark:text-blue-200 mb-1"
                  >
                    Professionnels de Santé
                  </h4>
                  <div class="space-y-1">
                    <div class="break-all">
                      Pharmacien: pharma@demo.com / demo123
                    </div>
                    <div class="break-all">
                      Médecin: medecin@demo.com / demo123
                    </div>
                    <div class="break-all">
                      Étudiant: etudiant@demo.com / demo123
                    </div>
                    <div class="break-all">
                      Sage-femme: sage@demo.com / demo123
                    </div>
                  </div>
                </div>

                <!-- Laboratory/Partner Accounts -->
                <div>
                  <h4
                    class="font-semibold text-blue-800 dark:text-blue-200 mb-1"
                  >
                    Laboratoires/Partenaires
                  </h4>
                  <div class="space-y-1">
                    <div class="break-all">
                      Laboratoire: labo@demo.com / demo123
                    </div>
                    <div class="break-all">
                      Hôpital: hospital@demo.com / demo123
                    </div>
                    <div class="break-all">
                      Clinique: clinic@demo.com / demo123
                    </div>
                  </div>
                </div>

                <!-- Admin Account -->
                <div>
                  <h4
                    class="font-semibold text-blue-800 dark:text-blue-200 mb-1"
                  >
                    Administration
                  </h4>
                  <div class="break-all">Admin: admin@demo.com / demo123</div>
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
                class="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Créer un compte
              </RouterLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Right Section - Image -->
      <div
        class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
      >
        <div class="relative w-full h-full">
          <!-- Background Pattern -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90"
          ></div>
          <div
            class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"
          ></div>

          <!-- Content -->
          <div
            class="relative z-10 flex flex-col items-center justify-center h-full text-center px-12"
          >
            <div class="max-w-md">
              <div
                class="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8"
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
import { ref, computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");

const form = reactive({
  email: "",
  password: "",
  role: "",
  remember: false,
});

const errors = reactive({
  email: "",
  password: "",
  role: "",
});

const roles = [
  {
    value: "pharmacist",
    label: "Pharmacien",
    icon: "svg",
    category: "professional",
    description: "Professionnel de santé",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    value: "doctor",
    label: "Médecin",
    icon: "svg",
    category: "professional",
    description: "Professionnel de santé",
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    value: "midwife",
    label: "Sage-femme",
    icon: "svg",
    category: "professional",
    description: "Professionnel de santé",
    iconPath:
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    value: "student",
    label: "Étudiant",
    icon: "svg",
    category: "professional",
    description: "Professionnel de santé",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    value: "laboratory",
    label: "Laboratoire",
    icon: "svg",
    category: "laboratory",
    description: "Laboratoire/Partenaire",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    value: "hospital",
    label: "Hôpital",
    icon: "svg",
    category: "laboratory",
    description: "Laboratoire/Partenaire",
    iconPath:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    value: "clinic",
    label: "Clinique",
    icon: "svg",
    category: "laboratory",
    description: "Laboratoire/Partenaire",
    iconPath:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    value: "admin",
    label: "Administrateur",
    icon: "svg",
    category: "admin",
    description: "Administrateur système",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

// Computed properties for role categories
const professionalRoles = computed(() =>
  roles.filter((role) => role.category === "professional")
);

const laboratoryRoles = computed(() =>
  roles.filter((role) => role.category === "laboratory")
);

const adminRoles = computed(() =>
  roles.filter((role) => role.category === "admin")
);

const getRoleButtonClasses = (roleValue) => {
  return [
    "w-full p-3 text-left border rounded-lg transition-all duration-200",
    form.role === roleValue
      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-md"
      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
  ];
};

const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  let isValid = true;

  if (!form.role) {
    errors.role = "Veuillez sélectionner votre rôle";
    isValid = false;
  }

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
      role: form.role,
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
