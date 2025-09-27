<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div
              class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"
            ></div>
            <div class="space-y-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div class="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Training Content -->
    <div
      v-else-if="training"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <RouterLink
              to="/"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Accueil
            </RouterLink>
          </li>
          <li>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
          <li>
            <RouterLink
              to="/catalogue"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Catalogue
            </RouterLink>
          </li>
          <li>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
          <li>
            <span class="text-gray-900 dark:text-gray-100 font-medium">{{
              training.title
            }}</span>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Training Image -->
          <div class="mb-6">
            <img
              :src="training.image"
              :alt="training.title"
              class="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          <!-- Training Info -->
          <div class="mb-6">
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <BaseBadge :variant="getDifficultyVariant(training.difficulty)">
                {{ getDifficultyLabel(training.difficulty) }}
              </BaseBadge>
              <BaseBadge variant="info">{{ training.format }}</BaseBadge>
              <BaseBadge variant="secondary">{{ training.language }}</BaseBadge>
              <BaseBadge v-if="training.featured" variant="warning">
                <template #icon>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </template>
                À la une
              </BaseBadge>
            </div>

            <h1
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              {{ training.title }}
            </h1>

            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {{ training.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <BaseBadge
                v-for="tag in training.tags"
                :key="tag"
                size="sm"
                variant="secondary"
              >
                {{ tag }}
              </BaseBadge>
            </div>
          </div>

          <!-- Lessons -->
          <BaseCard class="mb-6">
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Programme de la formation
              </h3>
            </template>

            <div class="space-y-4">
              <div
                v-for="(lesson, index) in training.lessons"
                :key="lesson.id"
                class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4"
                  >
                    <span
                      class="text-sm font-medium text-gray-600 dark:text-gray-400"
                      >{{ index + 1 }}</span
                    >
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ lesson.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ lesson.duration }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <BaseBadge size="sm" variant="info">{{
                    lesson.type
                  }}</BaseBadge>
                  <button
                    v-if="lesson.downloadable"
                    class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Télécharger"
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Resources -->
          <BaseCard v-if="training.resources && training.resources.length > 0">
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Ressources complémentaires
              </h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="resource in training.resources"
                :key="resource.id"
                class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div class="flex items-center">
                  <svg
                    class="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
                    />
                  </svg>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ resource.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ resource.size }}
                    </p>
                  </div>
                </div>
                <button
                  class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- CTA Card -->
          <BaseCard>
            <div class="text-center">
              <div
                class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{
                  training.price === 0 ? "Gratuit" : `${training.price} FCFA`
                }}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Formation certifiante
              </p>

              <BaseButton
                v-if="authStore.isAuthenticated"
                variant="primary"
                size="lg"
                full-width
                @click="startTraining"
              >
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </template>
                Commencer la formation
              </BaseButton>

              <div v-else class="space-y-3">
                <BaseButton
                  variant="primary"
                  size="lg"
                  full-width
                  @click="$router.push('/auth/signup')"
                >
                  S'inscrire pour commencer
                </BaseButton>
                <BaseButton
                  variant="outline"
                  size="lg"
                  full-width
                  @click="$router.push('/auth/login')"
                >
                  Se connecter
                </BaseButton>
              </div>
            </div>
          </BaseCard>

          <!-- Training Stats -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Informations
              </h3>
            </template>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Durée</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.duration }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Niveau</span
                >
                <BaseBadge :variant="getDifficultyVariant(training.difficulty)">
                  {{ getDifficultyLabel(training.difficulty) }}
                </BaseBadge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Format</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.format }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Langue</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.language }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Étudiants</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.studentsCount.toLocaleString() }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Note</span
                >
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >{{ training.rating }}</span
                  >
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Instructor -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Formateur
              </h3>
            </template>

            <div class="flex items-center">
              <img
                :src="training.instructor.avatar"
                :alt="training.instructor.name"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">
                  {{ training.instructor.name }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ training.instructor.title }}
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Formation non trouvée
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          La formation que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <div class="mt-6">
          <BaseButton variant="outline" @click="$router.push('/catalogue')">
            Retour au catalogue
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useTrainingsStore } from "@/stores/trainings";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const trainingsStore = useTrainingsStore();

const isLoading = ref(true);

const training = computed(() => trainingsStore.currentTraining);

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

const startTraining = () => {
  if (training.value && training.value.lessons.length > 0) {
    router.push({
      name: "lesson",
      params: {
        slug: training.value.slug,
        id: training.value.lessons[0].id,
      },
    });
  }
};

onMounted(async () => {
  try {
    const slug = route.params.slug;
    await trainingsStore.fetchTrainingBySlug(slug);
  } finally {
    isLoading.value = false;
  }
});
</script>
