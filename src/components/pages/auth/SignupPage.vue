<template>
  <!-- Header -->
  <HomeHeader />

  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Créer un compte
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Rejoignez la communauté des professionnels de santé
        </p>
      </div>

      <!-- Form -->
      <BaseCard class="mt-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Personal Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Informations personnelles
            </h3>

            <div class="grid grid-cols-2 gap-4">
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

          <!-- Role Selection -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              Je suis un(e) :
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="role in roles"
                :key="role.value"
                type="button"
                @click="form.role = role.value"
                :class="getRoleButtonClasses(role.value)"
                class="p-3 text-left border rounded-lg transition-all duration-200"
              >
                <div class="flex items-center">
                  <component :is="role.icon" class="w-5 h-5 mr-2" />
                  <span class="text-sm font-medium">{{ role.label }}</span>
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

          <!-- Professional Information -->
          <div v-if="form.role" class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
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
              min="0"
              max="50"
            />
          </div>

          <!-- Password -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
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
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <input
              v-model="form.acceptTerms"
              type="checkbox"
              class="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded mt-1"
              required
            />
            <label class="ml-2 text-sm text-gray-600 dark:text-gray-400">
              J'accepte les
              <a
                href="/legal"
                class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
              >
                conditions d'utilisation
              </a>
              et la
              <a
                href="/legal"
                class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
              >
                politique de confidentialité
              </a>
            </label>
          </div>
          <p
            v-if="errors.acceptTerms"
            class="text-sm text-red-600 dark:text-red-400"
          >
            {{ errors.acceptTerms }}
          </p>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="isLoading"
            :disabled="!isFormValid"
            full-width
          >
            Créer mon compte
          </BaseButton>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <div class="flex">
              <svg
                class="w-5 h-5 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm text-red-800 dark:text-red-200">{{
                errorMessage
              }}</span>
            </div>
          </div>
        </form>

        <!-- Login link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Déjà un compte ?
            <RouterLink
              to="/auth/login"
              class="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Se connecter
            </RouterLink>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import HomeHeader from "@/components/organisms/HomeHeader.vue";

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");

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
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      `,
    },
  },
  {
    value: "doctor",
    label: "Médecin",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      `,
    },
  },
  {
    value: "student",
    label: "Étudiant",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      `,
    },
  },
  {
    value: "sponsor",
    label: "Partenaire",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      `,
    },
  },
  {
    value: "laboratory",
    label: "Laboratoire",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      `,
    },
  },
];

const isFormValid = computed(() => {
  return (
    form.firstName &&
    form.lastName &&
    form.email &&
    form.role &&
    form.password &&
    form.confirmPassword &&
    form.acceptTerms
  );
});

const getRoleButtonClasses = (roleValue) => {
  const baseClasses = "border-gray-200 dark:border-gray-600";
  const selectedClasses =
    "border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-gray-800";
  const unselectedClasses = "hover:border-gray-300 dark:hover:border-gray-500";

  return form.role === roleValue
    ? `${baseClasses} ${selectedClasses}`
    : `${baseClasses} ${unselectedClasses}`;
};

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  if (!form.firstName) {
    errors.firstName = "Le prénom est requis";
  }

  if (!form.lastName) {
    errors.lastName = "Le nom est requis";
  }

  if (!form.email) {
    errors.email = "L'adresse email est requise";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "L'adresse email n'est pas valide";
  }

  if (form.phone && !/^\+?[1-9]\d{1,14}$/.test(form.phone.replace(/\s/g, ""))) {
    errors.phone = "Le numéro de téléphone n'est pas valide";
  }

  if (!form.role) {
    errors.role = "Veuillez sélectionner votre rôle";
  }

  if (!form.password) {
    errors.password = "Le mot de passe est requis";
  } else if (form.password.length < 6) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "La confirmation du mot de passe est requise";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas";
  }

  if (!form.acceptTerms) {
    errors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
  }

  return !Object.values(errors).some((error) => error);
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const result = await authStore.signup({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      role: form.role,
      phone: form.phone,
      institution: form.institution,
      position: form.position,
      experience: form.experience,
    });

    if (result.success) {
      router.push("/");
    } else {
      errorMessage.value =
        result.error || "Erreur lors de la création du compte";
    }
  } catch (error) {
    errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};
</script>
