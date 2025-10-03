<template>
  <DashboardLayout :navigation-items="navigationItems" page-title="Paramètres">
    <!-- Settings Tabs -->
    <div class="mb-8">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- General Settings -->
    <div v-if="activeTab === 'general'" class="space-y-8">
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Paramètres Généraux
          </h3>
        </template>
        <form @submit.prevent="saveGeneralSettings" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput
              v-model="settings.general.siteName"
              label="Nom du site"
              placeholder="Front-E-Santé"
            />
            <BaseInput
              v-model="settings.general.siteUrl"
              label="URL du site"
              placeholder="https://front-e-sante.com"
            />
            <BaseInput
              v-model="settings.general.adminEmail"
              label="Email administrateur"
              type="email"
              placeholder="admin@front-e-sante.com"
            />
            <BaseInput
              v-model="settings.general.supportEmail"
              label="Email de support"
              type="email"
              placeholder="support@front-e-sante.com"
            />
          </div>
          <div class="flex justify-end">
            <BaseButton type="submit" variant="primary">
              Sauvegarder
            </BaseButton>
          </div>
        </form>
      </BaseCard>

      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Paramètres de Formation
          </h3>
        </template>
        <form @submit.prevent="saveTrainingSettings" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput
              v-model="settings.training.minScore"
              label="Score minimum pour certification"
              type="number"
              placeholder="70"
            />
            <BaseInput
              v-model="settings.training.certificateValidity"
              label="Validité du certificat (mois)"
              type="number"
              placeholder="12"
            />
            <BaseInput
              v-model="settings.training.maxParticipants"
              label="Participants maximum par formation"
              type="number"
              placeholder="50"
            />
            <BaseInput
              v-model="settings.training.autoApproval"
              label="Approbation automatique"
              type="checkbox"
            />
          </div>
          <div class="flex justify-end">
            <BaseButton type="submit" variant="primary">
              Sauvegarder
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>

    <!-- User Management Settings -->
    <div v-if="activeTab === 'users'" class="space-y-8">
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Gestion des Utilisateurs
          </h3>
        </template>
        <form @submit.prevent="saveUserSettings" class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Inscription automatique
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Permettre aux utilisateurs de s'inscrire automatiquement
                </p>
              </div>
              <BaseInput
                v-model="settings.users.autoRegistration"
                type="checkbox"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Validation email requise
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Exiger la validation de l'email lors de l'inscription
                </p>
              </div>
              <BaseInput
                v-model="settings.users.emailVerification"
                type="checkbox"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Approbation manuelle
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Exiger l'approbation manuelle pour les nouveaux utilisateurs
                </p>
              </div>
              <BaseInput
                v-model="settings.users.manualApproval"
                type="checkbox"
              />
            </div>
          </div>
          <div class="flex justify-end">
            <BaseButton type="submit" variant="primary">
              Sauvegarder
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>

    <!-- Security Settings -->
    <div v-if="activeTab === 'security'" class="space-y-8">
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Sécurité
          </h3>
        </template>
        <form @submit.prevent="saveSecuritySettings" class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Authentification à deux facteurs
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Exiger l'authentification à deux facteurs pour les
                  administrateurs
                </p>
              </div>
              <BaseInput
                v-model="settings.security.twoFactorAuth"
                type="checkbox"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Sessions multiples
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Permettre plusieurs sessions simultanées
                </p>
              </div>
              <BaseInput
                v-model="settings.security.multipleSessions"
                type="checkbox"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Logs de sécurité
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enregistrer les activités de sécurité
                </p>
              </div>
              <BaseInput
                v-model="settings.security.securityLogs"
                type="checkbox"
              />
            </div>
          </div>
          <div class="flex justify-end">
            <BaseButton type="submit" variant="primary">
              Sauvegarder
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>

    <!-- Notifications Settings -->
    <div v-if="activeTab === 'notifications'" class="space-y-8">
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Notifications
          </h3>
        </template>
        <form @submit.prevent="saveNotificationSettings" class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Nouveaux utilisateurs
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Notifier lors de nouvelles inscriptions
                </p>
              </div>
              <BaseInput
                v-model="settings.notifications.newUsers"
                type="checkbox"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Nouvelles formations
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Notifier lors de nouvelles formations
                </p>
              </div>
              <BaseInput
                v-model="settings.notifications.newTrainings"
                type="checkbox"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Certificats délivrés
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Notifier lors de la délivrance de certificats
                </p>
              </div>
              <BaseInput
                v-model="settings.notifications.certificates"
                type="checkbox"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Alertes système
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Notifier les alertes système importantes
                </p>
              </div>
              <BaseInput
                v-model="settings.notifications.systemAlerts"
                type="checkbox"
              />
            </div>
          </div>
          <div class="flex justify-end">
            <BaseButton type="submit" variant="primary">
              Sauvegarder
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>

    <!-- System Settings -->
    <div v-if="activeTab === 'system'" class="space-y-8">
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Système
          </h3>
        </template>
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Version de l'application
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">v1.0.0</p>
            </div>
            <div>
              <h4
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Dernière mise à jour
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                15 Mars 2024
              </p>
            </div>
            <div>
              <h4
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Base de données
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">MySQL 8.0</p>
            </div>
            <div>
              <h4
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Serveur
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Node.js 18.x
              </p>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4
              class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4"
            >
              Actions système
            </h4>
            <div class="flex space-x-4">
              <BaseButton variant="outline" @click="clearCache">
                Vider le cache
              </BaseButton>
              <BaseButton variant="outline" @click="backupDatabase">
                Sauvegarder la base de données
              </BaseButton>
              <BaseButton variant="danger" @click="resetSystem">
                Réinitialiser le système
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";

// Navigation items for sidebar
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/admin/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Utilisateurs",
    href: "/admin/users",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    name: "Formations",
    href: "/admin/trainings",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    name: "Certificats",
    href: "/admin/certificates",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Laboratoires",
    href: "/admin/laboratories",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    iconPath:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
]);

// Tabs
const tabs = ref([
  { id: "general", name: "Général" },
  { id: "users", name: "Utilisateurs" },
  { id: "security", name: "Sécurité" },
  { id: "notifications", name: "Notifications" },
  { id: "system", name: "Système" },
]);

const activeTab = ref("general");

// Settings data
const settings = ref({
  general: {
    siteName: "Front-E-Santé",
    siteUrl: "https://front-e-sante.com",
    adminEmail: "admin@front-e-sante.com",
    supportEmail: "support@front-e-sante.com",
  },
  training: {
    minScore: 70,
    certificateValidity: 12,
    maxParticipants: 50,
    autoApproval: false,
  },
  users: {
    autoRegistration: true,
    emailVerification: true,
    manualApproval: false,
  },
  security: {
    twoFactorAuth: true,
    multipleSessions: false,
    securityLogs: true,
  },
  notifications: {
    newUsers: true,
    newTrainings: true,
    certificates: true,
    systemAlerts: true,
  },
});

// Methods
const saveGeneralSettings = () => {
  console.log("Saving general settings:", settings.value.general);
  // Implement save logic
};

const saveTrainingSettings = () => {
  console.log("Saving training settings:", settings.value.training);
  // Implement save logic
};

const saveUserSettings = () => {
  console.log("Saving user settings:", settings.value.users);
  // Implement save logic
};

const saveSecuritySettings = () => {
  console.log("Saving security settings:", settings.value.security);
  // Implement save logic
};

const saveNotificationSettings = () => {
  console.log("Saving notification settings:", settings.value.notifications);
  // Implement save logic
};

const clearCache = () => {
  console.log("Clearing cache");
  // Implement cache clearing logic
};

const backupDatabase = () => {
  console.log("Backing up database");
  // Implement backup logic
};

const resetSystem = () => {
  console.log("Resetting system");
  // Implement system reset logic
};

onMounted(() => {
  // Load settings data
});
</script>
