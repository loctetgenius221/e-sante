<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Ma Progression
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Suivez votre parcours d'apprentissage et vos réalisations
        </p>
      </div>

      <!-- Overall Progress -->
      <BaseCard class="mb-8">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Progression Globale
          </h3>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="relative w-24 h-24 mx-auto mb-4">
              <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  class="text-gray-200 dark:text-gray-700"
                  stroke="currentColor"
                  stroke-width="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="text-blue-600 dark:text-blue-400"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  fill="none"
                  :stroke-dasharray="`${overallProgress}, 100`"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span
                  class="text-lg font-bold text-gray-900 dark:text-gray-100"
                >
                  {{ overallProgress }}%
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Progression Globale
            </p>
          </div>

          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ completedTrainingsCount }}
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Formations Terminées
            </p>
          </div>

          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ certificatesCount }}
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Certificats Obtenus
            </p>
          </div>
        </div>
      </BaseCard>

      <!-- Training Progress -->
      <BaseCard class="mb-8">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Progression par Formation
            </h3>
            <div class="flex items-center space-x-2">
              <BaseButton
                variant="outline"
                size="sm"
                :class="{ 'bg-blue-50 dark:bg-blue-900': viewMode === 'all' }"
                @click="viewMode = 'all'"
              >
                Toutes
              </BaseButton>
              <BaseButton
                variant="outline"
                size="sm"
                :class="{
                  'bg-blue-50 dark:bg-blue-900': viewMode === 'in-progress',
                }"
                @click="viewMode = 'in-progress'"
              >
                En Cours
              </BaseButton>
              <BaseButton
                variant="outline"
                size="sm"
                :class="{
                  'bg-blue-50 dark:bg-blue-900': viewMode === 'completed',
                }"
                @click="viewMode = 'completed'"
              >
                Terminées
              </BaseButton>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <div
            v-for="training in filteredTrainings"
            :key="training.id"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h4
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
                >
                  {{ training.title }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {{ training.shortDescription }}
                </p>
                <div
                  class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center">
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
                  <div class="flex items-center">
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
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    {{ training.lessons.length }} leçons
                  </div>
                  <BaseBadge
                    :variant="getDifficultyVariant(training.difficulty)"
                  >
                    {{ getDifficultyLabel(training.difficulty) }}
                  </BaseBadge>
                </div>
              </div>
              <div class="text-right">
                <div
                  class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1"
                >
                  {{ getTrainingProgress(training.id) }}%
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getCompletedLessons(training.id) }}/{{
                    training.lessons.length
                  }}
                  leçons
                </div>
              </div>
            </div>

            <div class="mb-4">
              <ProgressBar :progress="getTrainingProgress(training.id)" />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span
                  v-if="getTrainingProgress(training.id) === 100"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  <svg
                    class="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Terminé
                </span>
                <span
                  v-else-if="getTrainingProgress(training.id) > 0"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  En cours
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  Non commencé
                </span>
              </div>

              <div class="flex items-center space-x-2">
                <BaseButton
                  v-if="getTrainingProgress(training.id) < 100"
                  variant="primary"
                  size="sm"
                  @click="continueTraining(training)"
                >
                  {{
                    getTrainingProgress(training.id) === 0
                      ? "Commencer"
                      : "Continuer"
                  }}
                </BaseButton>
                <BaseButton
                  v-else
                  variant="outline"
                  size="sm"
                  @click="reviewTraining(training)"
                >
                  Réviser
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredTrainings.length === 0" class="text-center py-8">
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
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ getEmptyStateMessage() }}
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ getEmptyStateDescription() }}
          </p>
          <div class="mt-6">
            <BaseButton variant="primary" @click="$router.push('/catalogue')">
              Explorer les formations
            </BaseButton>
          </div>
        </div>
      </BaseCard>

      <!-- Learning Path -->
      <BaseCard class="mb-8">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Parcours d'Apprentissage
          </h3>
        </template>

        <div class="space-y-6">
          <div
            v-for="(path, index) in learningPaths"
            :key="path.id"
            class="relative"
          >
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="getPathStepClass(path)"
                >
                  <span class="text-sm font-medium">
                    {{ path.completed ? "✓" : index + 1 }}
                  </span>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <h4
                  class="text-sm font-medium"
                  :class="
                    path.completed
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-500 dark:text-gray-400'
                  "
                >
                  {{ path.title }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {{ path.description }}
                </p>
                <div v-if="path.progress > 0" class="mt-2">
                  <ProgressBar :progress="path.progress" size="sm" />
                </div>
              </div>
            </div>
            <div
              v-if="index < learningPaths.length - 1"
              class="absolute left-5 top-10 w-0.5 h-6 bg-gray-200 dark:bg-gray-700"
            />
          </div>
        </div>
      </BaseCard>

      <!-- Statistics -->
      <BaseCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Statistiques d'Apprentissage
          </h3>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1"
            >
              {{ totalStudyTime }}
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Temps d'étude total
            </p>
          </div>

          <div class="text-center">
            <div
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1"
            >
              {{ averageScore }}%
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Score moyen</p>
          </div>

          <div class="text-center">
            <div
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1"
            >
              {{ streakDays }}
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Jours de suite
            </p>
          </div>

          <div class="text-center">
            <div
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1"
            >
              {{ totalLessonsCompleted }}
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Leçons terminées
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTrainingsStore } from "@/stores/trainings";
import { useCertificatesStore } from "@/stores/certificates";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import ProgressBar from "@/components/molecules/ProgressBar.vue";

const router = useRouter();
const trainingsStore = useTrainingsStore();
const certificatesStore = useCertificatesStore();

const viewMode = ref("all");

const learningPaths = ref([
  {
    id: 1,
    title: "Pharmacovigilance et Sécurité des Médicaments",
    description: "Comprendre les principes de base de la pharmacovigilance",
    completed: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Gestion des Interactions Médicamenteuses",
    description: "Identifier et gérer les interactions entre médicaments",
    completed: true,
    progress: 100,
  },
  {
    id: 3,
    title: "Optimisation Thérapeutique",
    description: "Optimiser les traitements pour une meilleure efficacité",
    completed: false,
    progress: 45,
  },
  {
    id: 4,
    title: "Éducation Thérapeutique du Patient",
    description: "Améliorer l'observance et l'éducation des patients",
    completed: false,
    progress: 0,
  },
]);

const completedTrainingsCount = computed(() => {
  return trainingsStore.trainings.filter(
    (training) => getTrainingProgress(training.id) === 100
  ).length;
});

const certificatesCount = computed(() => {
  return certificatesStore.earnedCertificates.length;
});

const overallProgress = computed(() => {
  if (trainingsStore.trainings.length === 0) return 0;

  const totalProgress = trainingsStore.trainings.reduce((sum, training) => {
    return sum + getTrainingProgress(training.id);
  }, 0);

  return Math.round(totalProgress / trainingsStore.trainings.length);
});

const filteredTrainings = computed(() => {
  const trainings = trainingsStore.trainings;

  switch (viewMode.value) {
    case "in-progress":
      return trainings.filter((training) => {
        const progress = getTrainingProgress(training.id);
        return progress > 0 && progress < 100;
      });
    case "completed":
      return trainings.filter(
        (training) => getTrainingProgress(training.id) === 100
      );
    default:
      return trainings;
  }
});

const totalStudyTime = computed(() => {
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

const averageScore = computed(() => {
  return certificatesStore.averageScore;
});

const streakDays = computed(() => {
  // Mock data - in real app, this would come from user activity
  return 7;
});

const totalLessonsCompleted = computed(() => {
  return trainingsStore.trainings.reduce((total, training) => {
    return total + getCompletedLessons(training.id);
  }, 0);
});

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
  // Mock progress data - in real app, this would come from user progress
  const progress = {
    1: 100,
    2: 100,
    3: 45,
    4: 0,
  };
  return progress[trainingId] || 0;
};

const getCompletedLessons = (trainingId) => {
  const training = trainingsStore.trainings.find((t) => t.id === trainingId);
  if (!training) return 0;

  const progress = getTrainingProgress(trainingId);
  return Math.round((progress / 100) * training.lessons.length);
};

const getPathStepClass = (path) => {
  if (path.completed) {
    return "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400";
  } else if (path.progress > 0) {
    return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400";
  } else {
    return "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400";
  }
};

const getEmptyStateMessage = () => {
  switch (viewMode.value) {
    case "in-progress":
      return "Aucune formation en cours";
    case "completed":
      return "Aucune formation terminée";
    default:
      return "Aucune formation disponible";
  }
};

const getEmptyStateDescription = () => {
  switch (viewMode.value) {
    case "in-progress":
      return "Commencez une nouvelle formation pour voir votre progression ici.";
    case "completed":
      return "Terminez vos premières formations pour les voir ici.";
    default:
      return "Explorez notre catalogue de formations pour commencer votre apprentissage.";
  }
};

const continueTraining = (training) => {
  router.push({
    name: "training-detail",
    params: { slug: training.slug },
  });
};

const reviewTraining = (training) => {
  router.push({
    name: "training-detail",
    params: { slug: training.slug },
  });
};

onMounted(async () => {
  await trainingsStore.fetchTrainings();
  await certificatesStore.fetchCertificates();
});
</script>
