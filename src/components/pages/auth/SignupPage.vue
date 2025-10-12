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
              Créer un compte
            </h2>
            <p
              class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
            >
              Accès réservé aux professionnels de santé
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
                      ? 'text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
                  ]"
                  :style="
                    currentStep >= index + 1
                      ? 'background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%);'
                      : ''
                  "
                >
                  {{ index + 1 }}
                </div>
                <div
                  v-if="index < steps.length - 1"
                  :class="[
                    'w-8 sm:w-16 h-1 mx-1 sm:mx-2',
                    currentStep > index + 1
                      ? ''
                      : 'bg-gray-200 dark:bg-gray-700',
                  ]"
                  :style="
                    currentStep > index + 1
                      ? 'background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%);'
                      : ''
                  "
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
              <!-- Step 1: User Category Selection -->
              <div v-if="currentStep === 1" class="space-y-4">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  Sélectionnez votre catégorie
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Choisissez le type de compte qui correspond à votre profil
                </p>

                <div class="grid grid-cols-1 gap-4">
                  <button
                    v-for="category in userCategories"
                    :key="category.value"
                    type="button"
                    @click="form.userCategory = category.value"
                    :class="getCategoryButtonClasses(category.value)"
                    :style="
                      form.userCategory === category.value
                        ? 'background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%); border-color: #0b6e6b;'
                        : ''
                    "
                    class="p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-md w-full"
                  >
                    <div class="flex items-center">
                      <svg
                        class="w-6 h-6 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          :d="category.icon"
                        />
                      </svg>
                      <div>
                        <span class="font-medium text-lg">{{
                          category.label
                        }}</span>
                        <p class="text-sm opacity-90">
                          {{ category.description }}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
                <p
                  v-if="errors.userCategory"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ errors.userCategory }}
                </p>
              </div>

              <!-- Step 2: Role Selection -->
              <div v-if="currentStep === 2" class="space-y-4">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  Votre rôle
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Sélectionnez votre rôle spécifique
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    v-for="role in getAvailableRoles()"
                    :key="role.value"
                    type="button"
                    @click="form.role = role.value"
                    :class="getRoleButtonClasses(role.value)"
                    :style="
                      form.role === role.value
                        ? 'background: linear-gradient(135deg, #0b6e6b 0%, #0a5a58 100%); border-color: #0b6e6b;'
                        : ''
                    "
                    class="p-3 text-left border rounded-lg transition-all duration-200 hover:shadow-md text-sm w-full"
                  >
                    <span class="font-medium">{{ role.label }}</span>
                  </button>
                </div>
                <p
                  v-if="errors.role"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ errors.role }}
                </p>
              </div>

              <!-- Step 3: Personal Information -->
              <div v-if="currentStep === 3" class="space-y-4">
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

              <!-- Step 4: Professional Information -->
              <div v-if="currentStep === 4" class="space-y-4">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  Informations professionnelles
                </h3>

                <!-- Champs pour professionnels de santé -->
                <div v-if="form.userCategory === 'health'" class="space-y-4">
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

                  <!-- Spécialité pour professionnels de santé -->
                  <div
                    v-if="getSelectedRole() && getSelectedRole().specialties"
                  >
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Spécialité
                    </label>
                    <select
                      v-model="form.specialty"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Sélectionnez votre spécialité</option>
                      <option
                        v-for="specialty in getSelectedRole().specialties"
                        :key="specialty"
                        :value="specialty"
                      >
                        {{ specialty }}
                      </option>
                    </select>
                    <p
                      v-if="errors.specialty"
                      class="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {{ errors.specialty }}
                    </p>
                  </div>

                  <BaseInput
                    v-model="form.licenseNumber"
                    label="Numéro de licence/Ordre"
                    placeholder="Votre numéro de licence"
                    :error="errors.licenseNumber"
                  />
                </div>

                <!-- Champs pour sponsors -->
                <div v-if="form.userCategory === 'sponsor'" class="space-y-4">
                  <BaseInput
                    v-model="form.institution"
                    label="Nom de l'organisation"
                    placeholder="Nom de votre organisation"
                    :error="errors.institution"
                    required
                  />

                  <BaseInput
                    v-model="form.position"
                    label="Votre fonction"
                    placeholder="Votre fonction dans l'organisation"
                    :error="errors.position"
                  />

                  <BaseInput
                    v-model="form.address"
                    label="Adresse"
                    placeholder="Adresse complète de l'organisation"
                    :error="errors.address"
                    required
                  />

                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Secteur d'activité
                    </label>
                    <select
                      v-model="form.activitySector"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Sélectionnez votre secteur</option>
                      <option
                        v-for="sector in activitySectors"
                        :key="sector"
                        :value="sector"
                      >
                        {{ sector }}
                      </option>
                    </select>
                    <p
                      v-if="errors.activitySector"
                      class="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {{ errors.activitySector }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 5: Security -->
              <div v-if="currentStep === 5" class="space-y-4">
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
                <button
                  v-if="currentStep > 1"
                  type="button"
                  @click="previousStep"
                  class="px-4 sm:px-6 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 order-2 sm:order-1"
                >
                  Précédent
                </button>
                <div v-else class="order-2 sm:order-1"></div>

                <button
                  v-if="currentStep < steps.length"
                  type="button"
                  @click="nextStep"
                  class="px-4 sm:px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 order-1 sm:order-2"
                  style="
                    background: linear-gradient(
                      135deg,
                      #0b6e6b 0%,
                      #0a5a58 100%
                    );
                  "
                >
                  Suivant
                </button>
                <button
                  v-else
                  type="submit"
                  :disabled="isLoading"
                  class="px-4 sm:px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                  style="
                    background: linear-gradient(
                      135deg,
                      #0b6e6b 0%,
                      #0a5a58 100%
                    );
                  "
                >
                  <span v-if="!isLoading">Créer mon compte</span>
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
                    Création en cours...
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Login link -->
          <div class="mt-4 sm:mt-6 text-center">
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Déjà un compte ?
              <RouterLink
                to="/auth/login"
                class="font-medium hover:underline transition-colors"
                style="color: #0b6e6b"
              >
                Se connecter
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

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");
const currentStep = ref(1);

const steps = [
  "Sélection du rôle",
  "Informations personnelles",
  "Informations professionnelles",
  "Sécurité",
];

const form = reactive({
  userCategory: "", // "health" ou "sponsor"
  role: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  institution: "",
  position: "",
  experience: "",
  // Champs spécifiques aux sponsors
  address: "",
  activitySector: "",
  // Champs spécifiques aux professionnels de santé
  specialty: "",
  licenseNumber: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const errors = reactive({
  userCategory: "",
  role: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  institution: "",
  position: "",
  experience: "",
  address: "",
  activitySector: "",
  specialty: "",
  licenseNumber: "",
  password: "",
  confirmPassword: "",
  acceptTerms: "",
});

// Catégories d'utilisateurs
const userCategories = [
  {
    value: "health",
    label: "Professionnel de Santé",
    description: "Médecins, pharmaciens, infirmiers, sages-femmes, etc.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    value: "sponsor",
    label: "Sponsor/Partenaire",
    description: "Laboratoires, structures, institutions, etc.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
];

// Rôles pour professionnels de santé
const healthRoles = [
  {
    value: "doctor",
    label: "Médecin",
    specialties: [
      "Généraliste",
      "Gynécologue",
      "Urologue",
      "Cardiologue",
      "Urgentiste",
      "Anesthésiste",
      "Cancérologue",
      "Pédiatre",
      "Dermatologue",
      "Ophtalmologue",
      "ORL",
      "Neurologue",
      "Psychiatre",
      "Radiologue",
      "Chirurgien",
      "Autre",
    ],
  },
  {
    value: "pharmacist",
    label: "Pharmacien",
    specialties: ["D'officine", "Hospitalier", "Biologiste", "Assistant"],
  },
  {
    value: "nurse",
    label: "Infirmier d'État (IDE)",
    specialties: [
      "Soins généraux",
      "Bloc opératoire",
      "Urgences",
      "Pédiatrie",
      "Psychiatrie",
      "Autre",
    ],
  },
  {
    value: "midwife",
    label: "Sage-femme",
    specialties: ["Sage-femme libérale", "Sage-femme hospitalière", "Autre"],
  },
  {
    value: "pharmacy_seller",
    label: "Vendeur en pharmacie",
    specialties: ["Vendeur", "Préparateur", "Autre"],
  },
];

// Rôles pour sponsors
const sponsorRoles = [
  {
    value: "pharmaceutical_lab",
    label: "Laboratoire pharmaceutique",
  },
  {
    value: "cosmetics_lab",
    label: "Laboratoire cosmétiques",
  },
  {
    value: "medical_device_lab",
    label: "Laboratoire dispositifs médicaux",
  },
  {
    value: "pharmaceutical_wholesaler",
    label: "Grossiste pharmaceutique",
  },
  {
    value: "pna",
    label: "PNA",
  },
  {
    value: "arp",
    label: "ARP",
  },
  {
    value: "medical_order",
    label: "Ordre des médecins",
  },
  {
    value: "pharmacy_order",
    label: "Ordre des pharmaciens",
  },
  {
    value: "health_ministry",
    label: "Ministère de la santé",
  },
  {
    value: "independent_trainer",
    label: "Formateur indépendant",
  },
  {
    value: "other",
    label: "Autres",
  },
];

// Secteurs d'activité pour sponsors
const activitySectors = [
  "Pharmaceutique",
  "Cosmétique",
  "Dispositifs médicaux",
  "Formation",
  "Institution publique",
  "Ordre professionnel",
  "Autre",
];

const validateStep = (step) => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  let isValid = true;

  if (step === 1) {
    if (!form.userCategory) {
      errors.userCategory = "Veuillez sélectionner votre catégorie";
      isValid = false;
    }
  } else if (step === 2) {
    if (!form.role) {
      errors.role = "Veuillez sélectionner votre rôle";
      isValid = false;
    }
  } else if (step === 3) {
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
  } else if (step === 4) {
    if (form.userCategory === "sponsor") {
      if (!form.institution.trim()) {
        errors.institution = "Le nom de l'organisation est requis";
        isValid = false;
      }
      if (!form.address.trim()) {
        errors.address = "L'adresse est requise";
        isValid = false;
      }
      if (!form.activitySector) {
        errors.activitySector = "Le secteur d'activité est requis";
        isValid = false;
      }
    }
  } else if (step === 5) {
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

const getCategoryButtonClasses = (categoryValue) => {
  return [
    "w-full p-4 text-left border rounded-lg transition-all duration-200",
    form.userCategory === categoryValue
      ? "text-white"
      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300",
  ];
};

const getRoleButtonClasses = (roleValue) => {
  return [
    "w-full p-3 text-left border rounded-lg transition-all duration-200",
    form.role === roleValue
      ? "text-white"
      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300",
  ];
};

const getAvailableRoles = () => {
  if (form.userCategory === "health") {
    return healthRoles;
  } else if (form.userCategory === "sponsor") {
    return sponsorRoles;
  }
  return [];
};

const getSelectedRole = () => {
  const roles = getAvailableRoles();
  return roles.find((role) => role.value === form.role);
};

const handleSubmit = async () => {
  if (!validateStep(5)) {
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
