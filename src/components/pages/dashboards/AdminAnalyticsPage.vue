<template>
  <DashboardLayout :navigation-items="navigationItems" page-title="Analytics">
    <!-- Header Actions -->
    <template #header-actions>
      <div class="flex space-x-3">
        <BaseSelect v-model="selectedPeriod" class="w-48">
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="90d">3 derniers mois</option>
          <option value="1y">1 an</option>
        </BaseSelect>
        <BaseButton variant="outline" @click="exportData">
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </template>
          Exporter
        </BaseButton>
        <BaseButton variant="outline" @click="refreshData">
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </template>
          Actualiser
        </BaseButton>
      </div>
    </template>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <BaseCard>
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Utilisateurs Actifs
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ metrics.activeUsers }}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              +{{ metrics.usersGrowth }}% vs période précédente
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-green-600 dark:text-green-400"
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
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Formations Complétées
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ metrics.completedTrainings }}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              +{{ metrics.trainingsGrowth }}% vs période précédente
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Certificats Délivrés
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ metrics.certificatesIssued }}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              +{{ metrics.certificatesGrowth }}% vs période précédente
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-orange-600 dark:text-orange-400"
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
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Laboratoires Actifs
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ metrics.activeLaboratories }}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              +{{ metrics.laboratoriesGrowth }}% vs période précédente
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- User Growth Chart -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Croissance des Utilisateurs
          </h3>
        </template>
        <div
          class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Graphique de croissance
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              Intégration avec une bibliothèque de graphiques
            </p>
          </div>
        </div>
      </BaseCard>

      <!-- Training Completion Chart -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Taux de Complétion des Formations
          </h3>
        </template>
        <div
          class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Graphique en secteurs
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              Intégration avec une bibliothèque de graphiques
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Detailed Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Top Formations -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Top Formations
          </h3>
        </template>
        <div class="space-y-4">
          <div
            v-for="(training, index) in topTrainings"
            :key="training.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <div
                class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                {{ index + 1 }}
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ training.name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ training.participants }} participants
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ training.completionRate }}%
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                taux de complétion
              </p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- User Distribution -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Répartition des Utilisateurs
          </h3>
        </template>
        <div class="space-y-4">
          <div
            v-for="role in userDistribution"
            :key="role.name"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full" :class="role.color"></div>
              <span class="ml-3 text-sm text-gray-900 dark:text-gray-100">{{
                role.name
              }}</span>
            </div>
            <div class="text-right">
              <span
                class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >{{ role.count }}</span
              >
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-1"
                >({{ role.percentage }}%)</span
              >
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Recent Activity -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Activité Récente
          </h3>
        </template>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-start space-x-3"
          >
            <div
              class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-900 dark:text-gray-100">
                {{ activity.description }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatTime(activity.timestamp) }}
              </p>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseSelect from "@/components/atoms/BaseSelect.vue";

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

// Data
const selectedPeriod = ref("30d");

const metrics = ref({
  activeUsers: 1247,
  usersGrowth: 12.5,
  completedTrainings: 89,
  trainingsGrowth: 8.3,
  certificatesIssued: 3456,
  certificatesGrowth: 15.2,
  activeLaboratories: 23,
  laboratoriesGrowth: 4.1,
});

const topTrainings = ref([
  {
    id: 1,
    name: "Pharmacovigilance 2024",
    participants: 45,
    completionRate: 95,
  },
  {
    id: 2,
    name: "Gestion des urgences cliniques",
    participants: 30,
    completionRate: 88,
  },
  {
    id: 3,
    name: "Recherche clinique avancée",
    participants: 25,
    completionRate: 92,
  },
  {
    id: 4,
    name: "Gestion de la pharmacie",
    participants: 20,
    completionRate: 85,
  },
]);

const userDistribution = ref([
  {
    name: "Pharmaciens",
    count: 456,
    percentage: 36.6,
    color: "bg-blue-500",
  },
  {
    name: "Médecins",
    count: 234,
    percentage: 18.8,
    color: "bg-green-500",
  },
  {
    name: "Étudiants",
    count: 345,
    percentage: 27.7,
    color: "bg-yellow-500",
  },
  {
    name: "Laboratoires",
    count: 123,
    percentage: 9.9,
    color: "bg-purple-500",
  },
  {
    name: "Autres",
    count: 89,
    percentage: 7.1,
    color: "bg-gray-500",
  },
]);

const recentActivity = ref([
  {
    id: 1,
    description: "Nouveau laboratoire enregistré: Laboratoire Delta",
    timestamp: new Date("2024-03-01T10:30:00"),
  },
  {
    id: 2,
    description:
      'Formation "Pharmacovigilance 2024" complétée par 15 utilisateurs',
    timestamp: new Date("2024-03-01T09:15:00"),
  },
  {
    id: 3,
    description: "25 nouveaux certificats délivrés",
    timestamp: new Date("2024-02-28T16:45:00"),
  },
  {
    id: 4,
    description: "Utilisateur Dr. Marie Diallo a rejoint la plateforme",
    timestamp: new Date("2024-02-28T14:20:00"),
  },
]);

// Methods
const formatTime = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else {
    return "À l'instant";
  }
};

const exportData = () => {
  console.log("Export analytics data");
  // Implement export logic
};

const refreshData = () => {
  console.log("Refresh analytics data");
  // Implement refresh logic
};

onMounted(() => {
  // Load analytics data
});
</script>
