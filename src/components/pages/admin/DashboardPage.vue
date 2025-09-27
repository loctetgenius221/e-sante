<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Tableau de Bord Administrateur
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Vue d'ensemble de la plateforme avec statistiques et métriques clés.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Utilisateurs actifs
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.activeUsers }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
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
                Formations publiées
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.publishedTrainings }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <svg
                class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Certificats délivrés
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.certificatesIssued }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Taux de satisfaction
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.satisfaction }}%
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Utilisateurs récents -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Utilisateurs récents
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/admin/users')"
                >
                  Gérer les utilisateurs
                </BaseButton>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="user in recentUsers"
                :key="user.id"
                class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div class="flex items-center">
                  <img
                    :src="user.avatar"
                    :alt="user.name"
                    class="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ user.name }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ user.email }} - {{ user.role }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <BaseBadge :variant="getUserStatusVariant(user.status)">
                    {{ getUserStatusLabel(user.status) }}
                  </BaseBadge>
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="viewUser(user.id)"
                  >
                    Voir
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Formations en attente -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Formations en attente de validation
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/admin/content')"
                >
                  Gérer le contenu
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <h3
                class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Aucune formation en attente
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Toutes les formations sont validées.
              </p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="training in pendingTrainings"
                :key="training.id"
                class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div class="flex items-center">
                  <img
                    :src="training.image"
                    :alt="training.title"
                    class="w-12 h-12 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ training.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Par {{ training.instructor }} -
                      {{ formatDate(training.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <BaseButton
                    variant="success"
                    size="sm"
                    @click="approveTraining(training.id)"
                  >
                    Approuver
                  </BaseButton>
                  <BaseButton
                    variant="danger"
                    size="sm"
                    @click="rejectTraining(training.id)"
                  >
                    Rejeter
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Alertes -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Alertes
              </h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="alert in alerts"
                :key="alert.id"
                class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                :class="getAlertClasses(alert.type)"
              >
                <div class="flex items-start">
                  <div
                    class="p-1 rounded-lg mr-3"
                    :class="getAlertIconClasses(alert.type)"
                  >
                    <component :is="getAlertIcon(alert.type)" class="w-4 h-4" />
                  </div>
                  <div class="flex-1">
                    <h4
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ alert.title }}
                    </h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      {{ alert.message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Actions rapides -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Actions rapides
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </template>
                Gérer les utilisateurs
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/admin/content')"
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
                Gérer le contenu
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/admin/moderation')"
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </template>
                Modération forum
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/admin/reports')"
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
                Rapports
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const router = useRouter();

const stats = ref({
  activeUsers: 1250,
  publishedTrainings: 45,
  certificatesIssued: 890,
  satisfaction: 96,
});

const recentUsers = ref([
  {
    id: 1,
    name: "Dr. Fatou Sarr",
    email: "fatou.sarr@email.com",
    role: "Pharmacienne",
    avatar:
      "https://images.unsplash.com/photo-1594824388852-8a5b4b5b5b5b?w=40&h=40&fit=crop&crop=face",
    status: "active",
  },
  {
    id: 2,
    name: "Dr. Ibrahima Ba",
    email: "ibrahima.ba@email.com",
    role: "Médecin",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    status: "pending",
  },
]);

const pendingTrainings = ref([
  {
    id: 1,
    title: "Nouvelles thérapies contre le diabète",
    instructor: "Dr. Aminata Diop",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=48&h=48&fit=crop",
    createdAt: new Date("2024-01-20"),
  },
]);

const alerts = ref([
  {
    id: 1,
    type: "warning",
    title: "Utilisateur en attente",
    message: "5 nouveaux utilisateurs en attente de validation",
  },
  {
    id: 2,
    type: "info",
    title: "Nouvelle formation",
    message: "Une nouvelle formation a été soumise pour validation",
  },
  {
    id: 3,
    type: "success",
    title: "Sauvegarde réussie",
    message: "La sauvegarde automatique a été effectuée avec succès",
  },
]);

const getUserStatusVariant = (status) => {
  const variants = {
    active: "success",
    pending: "warning",
    suspended: "danger",
  };
  return variants[status] || "secondary";
};

const getUserStatusLabel = (status) => {
  const labels = {
    active: "Actif",
    pending: "En attente",
    suspended: "Suspendu",
  };
  return labels[status] || status;
};

const getAlertClasses = (type) => {
  const classes = {
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    success:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  };
  return classes[type] || "bg-gray-50 dark:bg-gray-800";
};

const getAlertIconClasses = (type) => {
  const classes = {
    warning:
      "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400",
    info: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    success:
      "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
  };
  return classes[type] || "bg-gray-100 dark:bg-gray-700";
};

const getAlertIcon = (type) => {
  const icons = {
    warning: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      `,
    },
    info: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    },
    success: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    },
  };
  return icons[type] || icons.info;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const viewUser = (userId) => {
  router.push({ name: "admin-user-detail", params: { id: userId } });
};

const approveTraining = (trainingId) => {
  console.log("Approve training:", trainingId);
  // Implement approval logic
};

const rejectTraining = (trainingId) => {
  console.log("Reject training:", trainingId);
  // Implement rejection logic
};

onMounted(() => {
  // Load admin dashboard data
});
</script>
