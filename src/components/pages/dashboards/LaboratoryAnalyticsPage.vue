<template>
  <DashboardLayout :navigation-items="navigationItems" page-title="Analytics">
    <!-- Header Actions -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
      <div class="flex gap-3">
        <BaseButton variant="outline" @click="exportAnalytics">
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </template>
          Exporter
        </BaseButton>
        <BaseButton variant="outline" @click="refreshAnalytics">
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </template>
          Actualiser
        </BaseButton>
      </div>

      <!-- Date Range Selector -->
      <div class="flex gap-3">
        <select
          v-model="selectedPeriod"
          class="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="7">7 derniers jours</option>
          <option value="30">30 derniers jours</option>
          <option value="90">3 derniers mois</option>
          <option value="365">12 derniers mois</option>
        </select>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <BaseCard>
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Chiffre d'affaires
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ totalRevenue }}€
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              +12.5% vs mois dernier
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Commandes
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ totalOrders }}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              +8.2% vs mois dernier
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Clients actifs
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ activeClients }}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              +15.3% vs mois dernier
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Taux de conversion
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ conversionRate }}%
            </p>
            <p class="text-sm text-red-600 dark:text-red-400">
              -2.1% vs mois dernier
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Revenue Chart -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Évolution du chiffre d'affaires
          </h3>
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
                Graphique de revenus
              </p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Orders Chart -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Commandes par catégorie
          </h3>
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
            </div>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Detailed Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Top Products -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Produits les plus vendus
          </h3>
          <div class="space-y-4">
            <div
              v-for="product in topProducts"
              :key="product.id"
              class="flex items-center justify-between"
            >
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ product.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ product.sales }} ventes
                </p>
              </div>
              <div class="text-right">
                <p
                  class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ product.revenue }}€
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ product.growth }}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Recent Activity -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Activité récente
          </h3>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-start"
            >
              <div class="flex-shrink-0">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  {{ activity.description }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatTime(activity.time) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Performance Metrics -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Métriques de performance
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Temps de réponse moyen</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >2.3s</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Taux de satisfaction</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >94.2%</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Taux d'erreur</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >0.8%</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Uptime</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >99.9%</span
              >
            </div>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Data Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Sales by Region -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Ventes par région
          </h3>
          <div class="overflow-x-auto">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            >
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Région
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Ventes
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Revenus
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
              >
                <tr v-for="region in salesByRegion" :key="region.name">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ region.name }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ region.sales }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ region.revenue }}€
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </BaseCard>

      <!-- Customer Segments -->
      <BaseCard>
        <div class="p-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Segments de clients
          </h3>
          <div class="space-y-4">
            <div
              v-for="segment in customerSegments"
              :key="segment.name"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-3"
                  :style="{ backgroundColor: segment.color }"
                ></div>
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ segment.name }}</span
                >
              </div>
              <div class="text-right">
                <p
                  class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ segment.percentage }}%
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ segment.count }} clients
                </p>
              </div>
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

// State
const selectedPeriod = ref("30");

// Mock data
const totalRevenue = ref(125430);
const totalOrders = ref(342);
const activeClients = ref(156);
const conversionRate = ref(12.4);

const topProducts = ref([
  { id: 1, name: "Analyseur X2000", sales: 45, revenue: 67500, growth: 15.2 },
  {
    id: 2,
    name: "Réactifs biochimiques",
    sales: 120,
    revenue: 35800,
    growth: 8.7,
  },
  { id: 3, name: "Microscope Pro", sales: 23, revenue: 57500, growth: 22.1 },
  { id: 4, name: "Service d'analyse", sales: 89, revenue: 13350, growth: 5.3 },
]);

const recentActivity = ref([
  { id: 1, description: "Nouvelle commande reçue", time: "2 min" },
  { id: 2, description: "Produit mis à jour", time: "15 min" },
  { id: 3, description: "Client ajouté", time: "1h" },
  { id: 4, description: "Rapport généré", time: "2h" },
  { id: 5, description: "Formation créée", time: "3h" },
]);

const salesByRegion = ref([
  { name: "Île-de-France", sales: 145, revenue: 45600 },
  { name: "Auvergne-Rhône-Alpes", sales: 98, revenue: 31200 },
  { name: "Provence-Alpes-Côte d'Azur", sales: 76, revenue: 23800 },
  { name: "Nouvelle-Aquitaine", sales: 54, revenue: 16800 },
  { name: "Occitanie", sales: 43, revenue: 13400 },
]);

const customerSegments = ref([
  { name: "Hôpitaux", percentage: 35, count: 45, color: "#3B82F6" },
  { name: "Laboratoires privés", percentage: 28, count: 36, color: "#10B981" },
  { name: "Centres de recherche", percentage: 22, count: 28, color: "#F59E0B" },
  { name: "Universités", percentage: 15, count: 19, color: "#EF4444" },
]);

// Methods
const formatTime = (time) => {
  return time;
};

const exportAnalytics = () => {
  console.log("Exporting analytics...");
  // Export logic
};

const refreshAnalytics = () => {
  console.log("Refreshing analytics...");
  // Refresh logic
};

// Lifecycle
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error("Error loading analytics:", error);
  }
});
</script>
