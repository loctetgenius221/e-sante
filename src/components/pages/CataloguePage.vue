<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <HomeHeader />

    <!-- Page Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Catalogue des Formations
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez toutes nos formations certifiantes pour les professionnels
            de santé
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-64 flex-shrink-0">
          <BaseCard class="sticky top-24">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Filtres
            </h3>

            <!-- Search -->
            <div class="mb-6">
              <SearchInput
                :model-value="searchQuery"
                placeholder="Rechercher..."
                @update:model-value="handleSearch"
                @search="handleSearchSubmit"
              />
            </div>

            <!-- Theme Filter -->
            <div class="mb-6">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Thème
              </label>
              <select
                v-model="filters.theme"
                @change="applyFilters"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Tous les thèmes</option>
                <option v-for="theme in themes" :key="theme" :value="theme">
                  {{ theme }}
                </option>
              </select>
            </div>

            <!-- Format Filter -->
            <div class="mb-6">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Format
              </label>
              <select
                v-model="filters.format"
                @change="applyFilters"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Tous les formats</option>
                <option v-for="format in formats" :key="format" :value="format">
                  {{ format }}
                </option>
              </select>
            </div>

            <!-- Difficulty Filter -->
            <div class="mb-6">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Niveau
              </label>
              <select
                v-model="filters.difficulty"
                @change="applyFilters"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Tous les niveaux</option>
                <option
                  v-for="difficulty in difficulties"
                  :key="difficulty"
                  :value="difficulty"
                >
                  {{ getDifficultyLabel(difficulty) }}
                </option>
              </select>
            </div>

            <!-- Clear Filters -->
            <BaseButton
              variant="outline"
              size="sm"
              @click="clearFilters"
              full-width
            >
              Effacer les filtres
            </BaseButton>
          </BaseCard>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Results Header -->
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
          >
            <div>
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ filteredTrainings.length }} formation{{
                  filteredTrainings.length > 1 ? "s" : ""
                }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ getActiveFiltersText() }}
              </p>
            </div>

            <!-- View Toggle -->
            <div class="flex items-center space-x-2 mt-4 sm:mt-0">
              <button
                @click="viewMode = 'grid'"
                :class="
                  viewMode === 'grid'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400'
                "
                class="p-2 rounded-lg transition-colors"
              >
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="
                  viewMode === 'list'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400'
                "
                class="p-2 rounded-lg transition-colors"
              >
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div v-for="n in 6" :key="n" class="animate-pulse">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div
                  class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
                ></div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
                ></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="filteredTrainings.length === 0"
            class="text-center py-12"
          >
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
            <h3
              class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Aucune formation trouvée
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Essayez de modifier vos critères de recherche
            </p>
            <div class="mt-6">
              <BaseButton variant="outline" @click="clearFilters">
                Effacer les filtres
              </BaseButton>
            </div>
          </div>

          <!-- Trainings Grid -->
          <div
            v-else-if="viewMode === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <TrainingCard
              v-for="training in filteredTrainings"
              :key="training.id"
              :training="training"
            />
          </div>

          <!-- Trainings List -->
          <div v-else class="space-y-4">
            <div
              v-for="training in filteredTrainings"
              :key="training.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex flex-col md:flex-row gap-4">
                <img
                  :src="training.image"
                  :alt="training.title"
                  class="w-full md:w-48 h-32 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-2">
                    <h3
                      class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {{ training.title }}
                    </h3>
                    <BaseBadge
                      :variant="getDifficultyVariant(training.difficulty)"
                    >
                      {{ getDifficultyLabel(training.difficulty) }}
                    </BaseBadge>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {{ training.shortDescription }}
                  </p>
                  <div class="flex items-center justify-between">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {{ training.studentsCount.toLocaleString() }}
                      </div>
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
                        {{ training.rating }}
                      </div>
                    </div>
                    <BaseButton
                      variant="primary"
                      size="sm"
                      @click="
                        $router.push({
                          name: 'training-detail',
                          params: { slug: training.slug },
                        })
                      "
                    >
                      Voir la formation
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useTrainingsStore } from "@/stores/trainings";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";
import TrainingCard from "@/components/molecules/TrainingCard.vue";
import HomeHeader from "@/components/organisms/HomeHeader.vue";

const route = useRoute();
const trainingsStore = useTrainingsStore();

const isLoading = ref(true);
const viewMode = ref("grid");
const searchQuery = ref("");
const filters = ref({
  theme: "",
  format: "",
  difficulty: "",
});

const filteredTrainings = computed(() => trainingsStore.filteredTrainings);
const themes = computed(() => trainingsStore.themes);
const formats = computed(() => trainingsStore.formats);
const difficulties = computed(() => trainingsStore.difficulties);

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

const getActiveFiltersText = () => {
  const activeFilters = [];
  if (filters.value.theme) activeFilters.push(`Thème: ${filters.value.theme}`);
  if (filters.value.format)
    activeFilters.push(`Format: ${filters.value.format}`);
  if (filters.value.difficulty)
    activeFilters.push(
      `Niveau: ${getDifficultyLabel(filters.value.difficulty)}`
    );
  if (searchQuery.value)
    activeFilters.push(`Recherche: "${searchQuery.value}"`);

  return activeFilters.length > 0
    ? activeFilters.join(" • ")
    : "Toutes les formations";
};

const handleSearch = (value) => {
  searchQuery.value = value;
  trainingsStore.setSearchQuery(value);
};

const handleSearchSubmit = (value) => {
  searchQuery.value = value;
  trainingsStore.setSearchQuery(value);
};

const applyFilters = () => {
  trainingsStore.setFilters(filters.value);
};

const clearFilters = () => {
  filters.value = {
    theme: "",
    format: "",
    difficulty: "",
  };
  searchQuery.value = "";
  trainingsStore.clearFilters();
};

// Watch for route query changes
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.search) {
      searchQuery.value = newQuery.search;
      trainingsStore.setSearchQuery(newQuery.search);
    }
  },
  { immediate: true }
);

onMounted(async () => {
  try {
    await trainingsStore.fetchTrainings();
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
