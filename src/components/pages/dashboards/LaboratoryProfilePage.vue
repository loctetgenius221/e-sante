<template>
  <DashboardLayout :navigation-items="navigationItems" page-title="Profil">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Profile Header -->
      <BaseCard>
        <div class="p-6">
          <div class="flex items-center space-x-6">
            <div class="flex-shrink-0">
              <div
                class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <span class="text-2xl font-bold text-white">LD</span>
              </div>
            </div>
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Laboratoire Digital
              </h1>
              <p class="text-gray-600 dark:text-gray-400">
                Laboratoire de recherche et d'analyse pharmaceutique
              </p>
              <div class="flex items-center mt-2 space-x-4">
                <BaseBadge variant="success">Actif</BaseBadge>
                <BaseBadge variant="info">Vérifié</BaseBadge>
              </div>
            </div>
            <div class="flex-shrink-0">
              <BaseButton variant="outline" @click="editProfile">
                <template #icon-left>
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </template>
                Modifier
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Profile Information -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Basic Information -->
        <BaseCard>
          <div class="p-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Informations générales
            </h3>
            <div class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nom du laboratoire
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  Laboratoire Digital
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  contact@laboratoire-digital.fr
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Téléphone
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  +33 1 23 45 67 89
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Adresse
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  123 Rue de la Science<br />
                  75013 Paris, France
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Site web
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  www.laboratoire-digital.fr
                </p>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Laboratory Details -->
        <BaseCard>
          <div class="p-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Détails du laboratoire
            </h3>
            <div class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Spécialisation
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  Analyse pharmaceutique et recherche clinique
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Certifications
                </label>
                <div class="flex flex-wrap gap-2">
                  <BaseBadge variant="info" size="sm">ISO 9001</BaseBadge>
                  <BaseBadge variant="info" size="sm">ISO 14001</BaseBadge>
                  <BaseBadge variant="info" size="sm">ISO 45001</BaseBadge>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Année de création
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">2015</p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nombre d'employés
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  25-50 employés
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Statut
                </label>
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  Laboratoire privé
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Statistics -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6"
          >
            Statistiques du laboratoire
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                156
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Clients actifs
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl font-bold text-green-600 dark:text-green-400"
              >
                342
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Commandes
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl font-bold text-purple-600 dark:text-purple-400"
              >
                €125K
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Chiffre d'affaires
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl font-bold text-orange-600 dark:text-orange-400"
              >
                4.8
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Services Offered -->
      <BaseCard>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Services proposés
            </h3>
            <BaseButton variant="outline" size="sm" @click="addService">
              <template #icon-left>
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </template>
              Ajouter
            </BaseButton>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="service in services"
              :key="service.id"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">
                  {{ service.name }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ service.description }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <BaseBadge
                  :variant="service.status === 'active' ? 'success' : 'warning'"
                  size="sm"
                >
                  {{ service.status === "active" ? "Actif" : "Inactif" }}
                </BaseBadge>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="editService(service)"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Team Members -->
      <BaseCard>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Équipe
            </h3>
            <BaseButton variant="outline" size="sm" @click="addTeamMember">
              <template #icon-left>
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </template>
              Ajouter
            </BaseButton>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="member in teamMembers"
              :key="member.id"
              class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div
                class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-bold text-white">{{
                  member.initials
                }}</span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900 dark:text-gray-100">
                  {{ member.name }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ member.role }}
                </p>
              </div>
              <BaseButton
                variant="outline"
                size="sm"
                @click="editTeamMember(member)"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Settings -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Paramètres
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">
                  Notifications par email
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Recevoir les notifications par email
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">
                  Notifications push
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Recevoir les notifications push
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">
                  Mode sombre
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Activer le mode sombre
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
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
import BaseBadge from "@/components/atoms/BaseBadge.vue";

// Navigation items pour le dashboard laboratoire
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/laboratory/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Mes formations",
    href: "/laboratory/trainings",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    name: "Mes produits",
    href: "/laboratory/products",
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    name: "Demandes",
    href: "/laboratory/requests",
    iconPath:
      "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    name: "Analytics",
    href: "/laboratory/analytics",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "Profil",
    href: "/laboratory/profile",
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
]);

// Mock data
const services = ref([
  {
    id: 1,
    name: "Analyse de médicaments",
    description: "Analyse complète des médicaments génériques",
    status: "active",
  },
  {
    id: 2,
    name: "Recherche clinique",
    description: "Services de recherche clinique personnalisés",
    status: "active",
  },
  {
    id: 3,
    name: "Contrôle qualité",
    description: "Services de contrôle qualité pour laboratoires",
    status: "active",
  },
  {
    id: 4,
    name: "Formation professionnelle",
    description: "Formations spécialisées pour professionnels",
    status: "inactive",
  },
]);

const teamMembers = ref([
  {
    id: 1,
    name: "Dr. Marie Dubois",
    role: "Directrice scientifique",
    initials: "MD",
  },
  {
    id: 2,
    name: "Dr. Pierre Martin",
    role: "Responsable recherche",
    initials: "PM",
  },
  {
    id: 3,
    name: "Dr. Sophie Laurent",
    role: "Chef de laboratoire",
    initials: "SL",
  },
  { id: 4, name: "Dr. Jean Moreau", role: "Analyste senior", initials: "JM" },
  {
    id: 5,
    name: "Dr. Claire Petit",
    role: "Spécialiste qualité",
    initials: "CP",
  },
  { id: 6, name: "Dr. Thomas Bernard", role: "Technicien", initials: "TB" },
]);

// Methods
const editProfile = () => {
  console.log("Editing profile...");
  // Navigate to profile edit page
};

const addService = () => {
  console.log("Adding service...");
  // Open add service modal
};

const editService = (service) => {
  console.log("Editing service:", service.id);
  // Open edit service modal
};

const addTeamMember = () => {
  console.log("Adding team member...");
  // Open add team member modal
};

const editTeamMember = (member) => {
  console.log("Editing team member:", member.id);
  // Open edit team member modal
};

// Lifecycle
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error("Error loading profile:", error);
  }
});
</script>
