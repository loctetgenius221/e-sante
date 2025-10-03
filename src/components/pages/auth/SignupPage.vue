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
              Créer un compte
            </h2>
            <p
              class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
            >
              Rejoignez la communauté des professionnels de santé
            </p>
          </div>

          <!-- Progress Steps -->
          <div class="mb-6 sm:mb-8">
            <div class="flex items-center justify-between">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="flex items-center"
              >
                <div
                  :class="[
                    'w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium',
                    currentStep >= index + 1
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
                  ]"
                >
                  {{ index + 1 }}
                </div>
                <div
                  v-if="index < steps.length - 1"
                  :class="[
                    'w-8 sm:w-16 h-1 mx-1 sm:mx-2',
                    currentStep > index + 1
                      ? 'bg-gray-900'
                      : 'bg-gray-200 dark:bg-gray-700',
                  ]"
                ></div>
              </div>
            </div>
            <div class="mt-3 sm:mt-4 text-center">
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Étape {{ currentStep }} sur {{ steps.length }}:
                {{ steps[currentStep - 1] }}
              </p>
            </div>
          </div>

          <!-- Form -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Step 1: Personal Information -->
              <div v-if="currentStep === 1" class="space-y-4">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  Informations personnelles
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <BaseInput
                    v-model="form.firstName"
                    label="Prénom"
                    placeholder="Votre prénom"
                    :error="errors.firstName"
                    required
                  />
                  <BaseInput
                    v-model="form.lastName"
                    label="Nom"
                    placeholder="Votre nom"
                    :error="errors.lastName"
                    required
                  />
                </div>

                <BaseInput
                  v-model="form.email"
                  type="email"
                  label="Adresse email"
                  placeholder="votre@email.com"
                  :error="errors.email"
                  required
                  autocomplete="email"
                />

                <BaseInput
                  v-model="form.phone"
                  type="tel"
                  label="Téléphone"
                  placeholder="+221 XX XXX XX XX"
                  :error="errors.phone"
                  autocomplete="tel"
                />
              </div>

              <!-- Step 2: Role Selection -->
              <div v-if="currentStep === 2" class="space-y-4">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  Votre profession
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Sélectionnez votre domaine d'activité
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <button
                    v-for="role in roles"
                    :key="role.value"
                    type="button"
                    @click="form.role = role.value"
                    :class="getRoleButtonClasses(role.value)"
                    class="p-3 sm:p-4 text-left border rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-md text-xs sm:text-sm w-full"
                  >
                    <div class="flex items-center min-w-0">
                      <component
                        :is="role.icon"
                        class="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0"
                      />
                      <span class="font-medium truncate">{{ role.label }}</span>
                    </div>
                  </button>
                </div>
                <p
                  v-if="errors.role"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ errors.role }}
                </p>
              </div>

              <!-- Step 3: Professional Information -->
              <div v-if="currentStep === 3" class="space-y-4">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  Informations professionnelles
                </h3>

                <BaseInput
                  v-model="form.institution"
                  label="Établissement/Institution"
                  placeholder="Nom de votre établissement"
                  :error="errors.institution"
                />

                <BaseInput
                  v-model="form.position"
                  label="Poste/Fonction"
                  placeholder="Votre poste actuel"
                  :error="errors.position"
                />

                <BaseInput
                  v-model="form.experience"
                  type="number"
                  label="Années d'expérience"
                  placeholder="0"
                  :error="errors.experience"
                />
              </div>

              <!-- Step 4: Security -->
              <div v-if="currentStep === 4" class="space-y-4">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  Sécurité
                </h3>

                <BaseInput
                  v-model="form.password"
                  type="password"
                  label="Mot de passe"
                  placeholder="••••••••"
                  :error="errors.password"
                  required
                  autocomplete="new-password"
                />

                <BaseInput
                  v-model="form.confirmPassword"
                  type="password"
                  label="Confirmer le mot de passe"
                  placeholder="••••••••"
                  :error="errors.confirmPassword"
                  required
                  autocomplete="new-password"
                />

                <!-- Terms -->
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      v-model="form.acceptTerms"
                      type="checkbox"
                      class="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label class="text-gray-700 dark:text-gray-300">
                      J'accepte les
                      <RouterLink
                        to="/legal"
                        class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 underline"
                      >
                        conditions d'utilisation
                      </RouterLink>
                      et la
                      <RouterLink
                        to="/legal"
                        class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 underline"
                      >
                        politique de confidentialité
                      </RouterLink>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="text-red-600 dark:text-red-400 text-sm"
              >
                {{ errorMessage }}
              </div>

              <!-- Navigation Buttons -->
              <div
                class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6"
              >
                <BaseButton
                  v-if="currentStep > 1"
                  type="button"
                  variant="outline"
                  @click="previousStep"
                  class="px-4 sm:px-6 order-2 sm:order-1"
                >
                  Précédent
                </BaseButton>
                <div v-else class="order-2 sm:order-1"></div>

                <BaseButton
                  v-if="currentStep < steps.length"
                  type="button"
                  variant="primary"
                  @click="nextStep"
                  class="px-4 sm:px-6 order-1 sm:order-2"
                >
                  Suivant
                </BaseButton>
                <BaseButton
                  v-else
                  type="submit"
                  variant="primary"
                  :loading="isLoading"
                  class="px-4 sm:px-6 order-1 sm:order-2"
                >
                  Créer mon compte
                </BaseButton>
              </div>
            </form>
          </div>

          <!-- Login link -->
          <div class="mt-4 sm:mt-6 text-center">
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Déjà un compte ?
              <RouterLink
                to="/auth/login"
                class="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Se connecter
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>

              <h3 class="text-3xl font-bold text-white mb-4">
                Rejoignez notre communauté
              </h3>

              <p class="text-lg text-gray-200 mb-8 leading-relaxed">
                Connectez-vous avec d'autres professionnels de santé, partagez
                vos expériences et développez vos compétences ensemble.
              </p>

              <div class="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div class="text-2xl font-bold text-white mb-1">2,500+</div>
                  <div class="text-sm text-gray-300">Membres</div>
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
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");
const currentStep = ref(1);

const steps = [
  "Informations personnelles",
  "Votre profession",
  "Informations professionnelles",
  "Sécurité",
];

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  institution: "",
  position: "",
  experience: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  institution: "",
  position: "",
  experience: "",
  password: "",
  confirmPassword: "",
  acceptTerms: "",
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
];

const validateStep = (step) => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  let isValid = true;

  if (step === 1) {
    if (!form.firstName.trim()) {
      errors.firstName = "Le prénom est requis";
      isValid = false;
    }
    if (!form.lastName.trim()) {
      errors.lastName = "Le nom est requis";
      isValid = false;
    }
    if (!form.email.trim()) {
      errors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "L'email n'est pas valide";
      isValid = false;
    }
  } else if (step === 2) {
    if (!form.role) {
      errors.role = "Veuillez sélectionner votre profession";
      isValid = false;
    }
  } else if (step === 4) {
    if (!form.password) {
      errors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (form.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = "La confirmation du mot de passe est requise";
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }
    if (!form.acceptTerms) {
      errors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
      isValid = false;
    }
  }

  return isValid;
};

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < steps.length) {
      currentStep.value++;
    }
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const getRoleButtonClasses = (roleValue) => {
  return [
    "w-full p-3 text-left border rounded-lg transition-all duration-200",
    form.role === roleValue
      ? "border-gray-900 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300",
  ];
};

const handleSubmit = async () => {
  if (!validateStep(4)) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const result = await authStore.register(form);

    if (result.success) {
      // Rediriger vers le dashboard approprié
      const redirectTo = result.redirectTo || "/";
      router.push(redirectTo);
    } else {
      errorMessage.value =
        result.error || "Une erreur est survenue lors de la création du compte";
    }
  } catch (error) {
    errorMessage.value =
      error.message || "Une erreur est survenue lors de la création du compte";
  } finally {
    isLoading.value = false;
  }
};
</script>
