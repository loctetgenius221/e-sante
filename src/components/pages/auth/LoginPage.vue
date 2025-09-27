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
          Connexion
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Accédez à votre espace de formation
        </p>
      </div>

      <!-- Form -->
      <BaseCard class="mt-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
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

          <!-- Remember me & Forgot password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Se souvenir de moi
              </span>
            </label>
            <a
              href="#"
              class="text-sm text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Mot de passe oublié ?
            </a>
          </div>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="isLoading"
            :disabled="!isFormValid"
            full-width
          >
            Se connecter
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

        <!-- Sign up link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Pas encore de compte ?
            <RouterLink
              to="/auth/signup"
              class="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Créer un compte
            </RouterLink>
          </p>
        </div>
      </BaseCard>

      <!-- Demo credentials -->
      <BaseCard
        variant="flat"
        class="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      >
        <div class="text-center">
          <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Comptes de démonstration
          </h3>
          <div class="space-y-1 text-xs text-blue-700 dark:text-blue-300">
            <div>Pharmacien: pharma@demo.com / demo123</div>
            <div>Médecin: medecin@demo.com / demo123</div>
            <div>Étudiant: etudiant@demo.com / demo123</div>
            <div>Sage-femme: sage@demo.com / demo123</div>
            <div>Laboratoire: labo@demo.com / demo123</div>
            <div>Hôpital: hospital@demo.com / demo123</div>
            <div>Admin: admin@demo.com / demo123</div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import HomeHeader from "@/components/organisms/HomeHeader.vue";

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
    category: "professional",
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
    category: "professional",
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
    category: "professional",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      `,
    },
  },
  {
    value: "midwife",
    label: "Sage-femme",
    category: "professional",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      `,
    },
  },
  {
    value: "laboratory",
    label: "Laboratoire",
    category: "structure",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      `,
    },
  },
  {
    value: "hospital",
    label: "Hôpital",
    category: "structure",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      `,
    },
  },
];

const isFormValid = computed(() => {
  return form.email && form.password && form.role;
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
  errors.email = "";
  errors.password = "";
  errors.role = "";

  if (!form.email) {
    errors.email = "L'adresse email est requise";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "L'adresse email n'est pas valide";
  }

  if (!form.password) {
    errors.password = "Le mot de passe est requis";
  } else if (form.password.length < 6) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères";
  }

  if (!form.role) {
    errors.role = "Veuillez sélectionner votre rôle";
  }

  return !errors.email && !errors.password && !errors.role;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const result = await authStore.login({
      email: form.email,
      password: form.password,
      role: form.role,
    });

    if (result.success) {
      // Redirection selon le type d'utilisateur
      let redirectTo = "/";
      if (authStore.isProfessional) {
        redirectTo = "/professional-dashboard";
      } else if (authStore.isStructure) {
        redirectTo = "/structure-dashboard";
      } else if (authStore.isAdmin) {
        redirectTo = "/admin";
      } else {
        redirectTo = route.query.redirect || "/";
      }
      router.push(redirectTo);
    } else {
      errorMessage.value = result.error || "Erreur de connexion";
    }
  } catch (error) {
    errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};
</script>
