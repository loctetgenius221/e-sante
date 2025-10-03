<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Tableau de Bord Administrateur"
  >
    <!-- Quick Stats -->
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
              Utilisateurs Totaux
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ totalUsers }}
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
              Formations Actives
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ activeTrainings }}
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
              {{ totalCertificates }}
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
              Laboratoires
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ totalLaboratories }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Utilisateurs Récents -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Utilisateurs Récents
              </h3>
              <BaseButton
                variant="outline"
                size="sm"
                @click="$router.push('/admin/users')"
              >
                Voir tous
              </BaseButton>
            </div>
          </template>

          <div class="space-y-4">
            <div
              v-for="user in recentUsers"
              :key="user.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <img
                  :src="user.avatar || '/images/default-avatar.jpg'"
                  :alt="user.name"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ user.name }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ getUserRoleLabel(user.role) }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(user.createdAt) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <BaseBadge
                  :variant="getUserStatusVariant(user.status)"
                  size="sm"
                >
                  {{ getUserStatusLabel(user.status) }}
                </BaseBadge>
                <BaseButton variant="outline" size="sm" @click="viewUser(user)">
                  Voir
                </BaseButton>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Formations en Attente -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Formations en Attente
              </h3>
              <BaseButton
                variant="outline"
                size="sm"
                @click="$router.push('/admin/trainings')"
              >
                Voir toutes
              </BaseButton>
            </div>
          </template>

          <div v-if="pendingTrainings.length === 0" class="text-center py-8">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3
              class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Aucune formation en attente
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Toutes les formations sont approuvées
            </p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="training in pendingTrainings"
              :key="training.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex-1">
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ training.title }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Par {{ training.creatorName }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatDate(training.createdAt) }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <BaseButton
                  variant="success"
                  size="sm"
                  @click="approveTraining(training)"
                >
                  Approuver
                </BaseButton>
                <BaseButton
                  variant="danger"
                  size="sm"
                  @click="rejectTraining(training)"
                >
                  Rejeter
                </BaseButton>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Activité Récente -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Activité Récente
            </h3>
          </template>

          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
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
                  {{ formatDate(activity.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Statistiques Rapides -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Statistiques
            </h3>
          </template>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Nouveaux utilisateurs (7j)</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >{{ newUsersThisWeek }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Formations complétées</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >{{ completedTrainings }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Taux de satisfaction</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >{{ satisfactionRate }}%</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Utilisateurs actifs</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >{{ activeUsers }}</span
              >
            </div>
          </div>
        </BaseCard>

        <!-- Actions Rapides -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Actions Rapides
            </h3>
          </template>
          <div class="space-y-3">
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/admin/users')"
            >
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </template>
              Gérer les utilisateurs
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/admin/trainings')"
            >
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </template>
              Gérer les formations
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/admin/analytics')"
            >
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </template>
              Analytics
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/admin/settings')"
            >
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </template>
              Paramètres
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Alertes -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Alertes
            </h3>
          </template>
          <div class="space-y-3">
            <div
              v-for="alert in alerts"
              :key="alert.id"
              :class="[
                'p-3 rounded-lg border-l-4',
                alert.type === 'warning'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400'
                  : '',
                alert.type === 'error'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-400'
                  : '',
                alert.type === 'info'
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                  : '',
              ]"
            >
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ alert.title }}
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {{ alert.message }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

// Composables
const router = useRouter();
const authStore = useAuthStore();

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
const totalUsers = ref(1247);
const activeTrainings = ref(89);
const totalCertificates = ref(3456);
const totalLaboratories = ref(23);

const recentUsers = ref([
  {
    id: 1,
    name: "Dr. Fatou Sarr",
    role: "pharmacist",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-28"),
  },
  {
    id: 2,
    name: "Dr. Ibrahima Ba",
    role: "doctor",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-27"),
  },
  {
    id: 3,
    name: "Laboratoire Alpha",
    role: "laboratory",
    status: "pending",
    avatar:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-26"),
  },
]);

const pendingTrainings = ref([
  {
    id: 1,
    title: "Nouvelle formation sur les vaccins",
    creatorName: "Laboratoire Beta",
    createdAt: new Date("2024-02-28"),
  },
  {
    id: 2,
    title: "Formation avancée en pharmacologie",
    creatorName: "Dr. Marie Diallo",
    createdAt: new Date("2024-02-27"),
  },
]);

const recentActivities = ref([
  {
    id: 1,
    description: "Nouveau laboratoire enregistré: Laboratoire Gamma",
    createdAt: new Date("2024-02-28T10:30:00"),
  },
  {
    id: 2,
    description: 'Formation "Pharmacovigilance 2024" approuvée',
    createdAt: new Date("2024-02-28T09:15:00"),
  },
  {
    id: 3,
    description: "15 nouveaux certificats délivrés",
    createdAt: new Date("2024-02-27T16:45:00"),
  },
]);

const alerts = ref([
  {
    id: 1,
    type: "warning",
    title: "Formation en attente",
    message: "3 formations en attente d'approbation depuis plus de 48h",
  },
  {
    id: 2,
    type: "info",
    title: "Nouvelle version",
    message: "Mise à jour de la plateforme disponible",
  },
]);

// Computed
const newUsersThisWeek = computed(() => 23);
const completedTrainings = computed(() => 156);
const satisfactionRate = computed(() => 94);
const activeUsers = computed(() => 892);

// Methods
const getUserRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    midwife: "Sage-femme",
    laboratory: "Laboratoire",
    hospital: "Hôpital",
    clinic: "Clinique",
    admin: "Administrateur",
  };
  return labels[role] || role;
};

const getUserStatusVariant = (status) => {
  const variants = {
    active: "success",
    pending: "warning",
    suspended: "danger",
  };
  return variants[status] || "default";
};

const getUserStatusLabel = (status) => {
  const labels = {
    active: "Actif",
    pending: "En attente",
    suspended: "Suspendu",
  };
  return labels[status] || status;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const viewUser = (user) => {
  router.push(`/admin/users/${user.id}`);
};

const approveTraining = (training) => {
  console.log("Approve training:", training);
  // Implement approval logic
};

const rejectTraining = (training) => {
  console.log("Reject training:", training);
  // Implement rejection logic
};

onMounted(() => {
  // Load admin data
});
</script>
