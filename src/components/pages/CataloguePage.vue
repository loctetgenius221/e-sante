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
        <!-- Modern Filters Sidebar -->
        <div class="lg:w-80 flex-shrink-0">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24 overflow-hidden"
          >
            <!-- Filter Header -->
            <div
              class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-lg font-bold text-gray-900 dark:text-gray-100"
                  >
                    Filtres
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Affinez votre recherche
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 space-y-6">
              <!-- Search -->
              <div>
                <label
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Recherche
                </label>
                <SearchInput
                  :model-value="searchQuery"
                  placeholder="Rechercher une formation..."
                  @update:model-value="handleSearch"
                  @search="handleSearchSubmit"
                  class="w-full"
                />
              </div>

              <!-- Theme Filter -->
              <div>
                <label
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Thème
                </label>
                <div class="space-y-2">
                  <button
                    v-for="theme in themes"
                    :key="theme"
                    @click="toggleThemeFilter(theme)"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-xl transition-all duration-200',
                      filters.theme === theme
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{{ theme }}</span>
                      <svg
                        v-if="filters.theme === theme"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Format Filter -->
              <div>
                <label
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Format
                </label>
                <div class="space-y-2">
                  <button
                    v-for="format in formats"
                    :key="format"
                    @click="toggleFormatFilter(format)"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-xl transition-all duration-200',
                      filters.format === format
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{{ format }}</span>
                      <svg
                        v-if="filters.format === format"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Difficulty Filter -->
              <div>
                <label
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Niveau
                </label>
                <div class="space-y-2">
                  <button
                    v-for="difficulty in difficulties"
                    :key="difficulty"
                    @click="toggleDifficultyFilter(difficulty)"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-xl transition-all duration-200',
                      filters.difficulty === difficulty
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{{
                        getDifficultyLabel(difficulty)
                      }}</span>
                      <svg
                        v-if="filters.difficulty === difficulty"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Clear Filters -->
              <div class="pt-4 border-t border-gray-200 dark:border-gray-600">
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="clearFilters"
                  full-width
                  class="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </template>
                  Effacer les filtres
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Modern Results Header -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div class="flex-1">
                <div class="flex items-center space-x-4 mb-2">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-gray-600 dark:text-gray-400"
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
                    <h2
                      class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                    >
                      {{ filteredTrainings.length }} formation{{
                        filteredTrainings.length > 1 ? "s" : ""
                      }}
                    </h2>
                  </div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ getActiveFiltersText() }}
                </p>
              </div>

              <!-- Modern View Toggle -->
              <div class="flex items-center space-x-2 mt-4 sm:mt-0">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                  <button
                    @click="viewMode = 'grid'"
                    :class="[
                      'px-3 py-2 rounded-lg transition-all duration-200',
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
                    ]"
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
                    :class="[
                      'px-3 py-2 rounded-lg transition-all duration-200',
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
                    ]"
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
            </div>
          </div>

          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div v-for="n in 6" :key="n" class="animate-pulse">
              <div
                class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div
                  class="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"
                ></div>
                <div
                  class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"
                ></div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"
                ></div>
                <div class="flex space-x-2">
                  <div
                    class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"
                  ></div>
                  <div
                    class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="filteredTrainings.length === 0"
            class="text-center py-16"
          >
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12"
            >
              <div
                class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-12 h-12 text-gray-400"
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
              <h3
                class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              >
                Aucune formation trouvée
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Essayez de modifier vos critères de recherche ou d'effacer les
                filtres
              </p>
              <BaseButton
                variant="outline"
                @click="clearFilters"
                class="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </template>
                Effacer les filtres
              </BaseButton>
            </div>
          </div>

          <!-- Trainings Grid -->
          <div
            v-else-if="viewMode === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <TrainingCard
              v-for="training in filteredTrainings"
              :key="training.id"
              :training="training"
            />
          </div>

          <!-- Trainings List -->
          <div v-else class="space-y-6">
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

const toggleThemeFilter = (theme) => {
  filters.value.theme = filters.value.theme === theme ? "" : theme;
  applyFilters();
};

const toggleFormatFilter = (format) => {
  filters.value.format = filters.value.format === format ? "" : format;
  applyFilters();
};

const toggleDifficultyFilter = (difficulty) => {
  filters.value.difficulty =
    filters.value.difficulty === difficulty ? "" : difficulty;
  applyFilters();
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
