<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Mon Tableau de Bord
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Suivez votre progression et gérez votre compte
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <img
              :src="authStore.user?.avatar || '/images/default-avatar.jpg'"
              :alt="authStore.user?.name"
              class="h-12 w-12 rounded-full"
            />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ authStore.user?.name }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ getRoleLabel(authStore.user?.role) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Overview -->
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Formations Terminées
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ certificatesStore.completedTrainings }}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Certificats Obtenus
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ certificatesStore.earnedCertificates.length }}
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Score Moyen
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ certificatesStore.averageScore }}%
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Temps d'Étude
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ totalStudyTime }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Recent Activity -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Activité Récente
              </h3>
            </template>

            <div class="space-y-4">
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="flex items-start space-x-3"
              >
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="getActivityIconClass(activity.type)"
                >
                  <component
                    :is="getActivityIcon(activity.type)"
                    class="w-4 h-4"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900 dark:text-gray-100">
                    {{ activity.description }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatTimeAgo(activity.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Current Trainings -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Formations en Cours
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/catalogue')"
                >
                  Voir toutes
                </BaseButton>
              </div>
            </template>

            <div v-if="currentTrainings.length > 0" class="space-y-4">
              <div
                v-for="training in currentTrainings"
                :key="training.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ training.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ training.shortDescription }}
                    </p>
                  </div>
                  <BaseBadge
                    :variant="getDifficultyVariant(training.difficulty)"
                  >
                    {{ getDifficultyLabel(training.difficulty) }}
                  </BaseBadge>
                </div>

                <div class="mb-3">
                  <div
                    class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1"
                  >
                    <span>Progression</span>
                    <span>{{ getTrainingProgress(training.id) }}%</span>
                  </div>
                  <ProgressBar :progress="getTrainingProgress(training.id)" />
                </div>

                <div class="flex items-center justify-between">
                  <div
                    class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ training.duration }}
                  </div>
                  <BaseButton
                    variant="primary"
                    size="sm"
                    @click="continueTraining(training)"
                  >
                    Continuer
                  </BaseButton>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8">
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <h3
                class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Aucune formation en cours
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Commencez une nouvelle formation pour voir votre progression
                ici.
              </p>
              <div class="mt-6">
                <BaseButton
                  variant="primary"
                  @click="$router.push('/catalogue')"
                >
                  Explorer les formations
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Actions Rapides
              </h3>
            </template>

            <div class="space-y-3">
              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/catalogue')"
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
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </template>
                Explorer les Formations
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/mon-compte/certificats')"
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </template>
                Mes Certificats
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/club')"
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
                Club Digital
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/mon-compte/progression')"
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
                Ma Progression
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Achievements -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Réalisations
              </h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="achievement in achievements"
                :key="achievement.id"
                class="flex items-center space-x-3"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="
                    achievement.earned
                      ? 'bg-yellow-100 dark:bg-yellow-900'
                      : 'bg-gray-100 dark:bg-gray-700'
                  "
                >
                  <svg
                    class="w-5 h-5"
                    :class="
                      achievement.earned
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-gray-400'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <p
                    class="text-sm font-medium"
                    :class="
                      achievement.earned
                        ? 'text-gray-900 dark:text-gray-100'
                        : 'text-gray-500 dark:text-gray-400'
                    "
                  >
                    {{ achievement.title }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ achievement.description }}
                  </p>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCertificatesStore } from "@/stores/certificates";
import { useTrainingsStore } from "@/stores/trainings";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import ProgressBar from "@/components/molecules/ProgressBar.vue";

const router = useRouter();
const authStore = useAuthStore();
const certificatesStore = useCertificatesStore();
const trainingsStore = useTrainingsStore();

const recentActivities = ref([
  {
    id: 1,
    type: "certificate",
    description:
      "Certificat obtenu : Pharmacovigilance et Sécurité des Médicaments",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: "lesson",
    description: "Leçon terminée : Signalement des effets indésirables",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    type: "quiz",
    description: "Quiz réussi : Gestion des Interactions Médicamenteuses (85%)",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    type: "forum",
    description:
      "Message posté dans le forum : Questions sur la pharmacovigilance",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]);

const achievements = ref([
  {
    id: 1,
    title: "Premier Pas",
    description: "Terminer votre première formation",
    earned: true,
  },
  {
    id: 2,
    title: "Érudit",
    description: "Obtenir 5 certificats",
    earned: certificatesStore.earnedCertificates.length >= 5,
  },
  {
    id: 3,
    title: "Expert",
    description: "Obtenir 10 certificats",
    earned: certificatesStore.earnedCertificates.length >= 10,
  },
  {
    id: 4,
    title: "Perfectionniste",
    description: "Obtenir un score de 100% à un quiz",
    earned: false,
  },
  {
    id: 5,
    title: "Social",
    description: "Poster 10 messages dans le forum",
    earned: false,
  },
]);

const currentTrainings = computed(() => {
  return trainingsStore.trainings
    .filter((training) => {
      const progress = getTrainingProgress(training.id);
      return progress > 0 && progress < 100;
    })
    .slice(0, 3);
});

const totalStudyTime = computed(() => {
  // Calculate total study time from completed trainings
  const totalMinutes = trainingsStore.trainings.reduce((total, training) => {
    if (getTrainingProgress(training.id) === 100) {
      const duration = training.duration;
      const hours = parseInt(duration.split("h")[0]);
      const minutes = parseInt(duration.split("h")[1]?.split("min")[0] || 0);
      return total + hours * 60 + minutes;
    }
    return total;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}min`;
});

const getRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    sponsor: "Sponsor",
    admin: "Administrateur",
  };
  return labels[role] || role;
};

const getDifficultyVariant = (difficulty) => {
  const variants = {
    débutant: "success",
    intermédiaire: "warning",
    avancé: "danger",
  };
  return variants[difficulty] || "default";
};

const getDifficultyLabel = (difficulty) => {
  const labels = {
    débutant: "Débutant",
    intermédiaire: "Intermédiaire",
    avancé: "Avancé",
  };
  return labels[difficulty] || difficulty;
};

const getTrainingProgress = (trainingId) => {
  // This would typically come from the trainings store
  // For now, return a mock progress
  const progress = {
    1: 75,
    2: 45,
    3: 100,
    4: 0,
  };
  return progress[trainingId] || 0;
};

const getActivityIcon = (type) => {
  const icons = {
    certificate: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    },
    lesson: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      `,
    },
    quiz: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      `,
    },
    forum: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      `,
    },
  };
  return icons[type] || icons.lesson;
};

const getActivityIconClass = (type) => {
  const classes = {
    certificate:
      "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    lesson: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    quiz: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    forum:
      "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
  };
  return classes[type] || classes.lesson;
};

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  if (diffInSeconds < 3600)
    return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400)
    return `Il y a ${Math.floor(diffInSeconds / 3600)} h`;
  return `Il y a ${Math.floor(diffInSeconds / 86400)} j`;
};

const continueTraining = (training) => {
  router.push({
    name: "training-detail",
    params: { slug: training.slug },
  });
};

onMounted(async () => {
  await certificatesStore.fetchCertificates();
  await trainingsStore.fetchTrainings();
});
</script>
