<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Mes Formations"
  >
    <!-- Header Actions -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
      <div class="flex gap-3">
        <BaseButton variant="primary" @click="showCreateTrainingModal = true">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </template>
          Créer une formation
        </BaseButton>
        <BaseButton variant="outline" @click="exportTrainings">
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
      </div>

      <!-- Search and Filters -->
      <div class="flex gap-3">
        <SearchInput
          v-model="searchQuery"
          placeholder="Rechercher une formation..."
          class="w-64"
        />
        <BaseButton variant="outline" @click="showFilters = !showFilters">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </template>
          Filtres
        </BaseButton>
      </div>
    </div>

    <!-- Filters Panel -->
    <div
      v-if="showFilters"
      class="mb-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Statut</label
          >
          <select
            v-model="filters.status"
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Catégorie</label
          >
          <select
            v-model="filters.category"
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Toutes les catégories</option>
            <option value="pharmacology">Pharmacologie</option>
            <option value="analytics">Analyses</option>
            <option value="research">Recherche</option>
            <option value="quality">Qualité</option>
          </select>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Date de création</label
          >
          <select
            v-model="filters.dateRange"
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Toutes les dates</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
        </div>
        <div class="flex items-end">
          <BaseButton variant="outline" @click="clearFilters" class="w-full">
            Effacer les filtres
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Formations
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ totalTrainings }}
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Publiées
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ publishedTrainings }}
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              En cours
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ inProgressTrainings }}
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
              Participants
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ totalParticipants }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Trainings List -->
    <div class="space-y-6">
      <div v-if="isLoading" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse"
        >
          <div
            class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"
          ></div>
          <div
            class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"
          ></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>

      <div v-else-if="filteredTrainings.length === 0" class="text-center py-12">
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Aucune formation trouvée
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Commencez par créer votre première formation.
        </p>
        <div class="mt-6">
          <BaseButton variant="primary" @click="showCreateTrainingModal = true">
            Créer une formation
          </BaseButton>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <BaseCard
          v-for="training in filteredTrainings"
          :key="training.id"
          class="hover:shadow-lg transition-shadow duration-200"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ training.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {{ training.description }}
              </p>
            </div>
            <BaseBadge :variant="getStatusVariant(training.status)" size="sm">
              {{ getStatusText(training.status) }}
            </BaseBadge>
          </div>

          <div class="space-y-3 mb-4">
            <div
              class="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              {{ training.category }}
            </div>
            <div
              class="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <svg
                class="w-4 h-4 mr-2"
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
              {{ training.participants }} participants
            </div>
            <div
              class="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Créé le {{ formatDate(training.createdAt) }}
            </div>
          </div>

          <div class="flex gap-2">
            <BaseButton
              variant="outline"
              size="sm"
              @click="viewTraining(training)"
              class="flex-1"
            >
              Voir
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              @click="editTraining(training)"
              class="flex-1"
            >
              Modifier
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              @click="duplicateTraining(training)"
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Create Training Modal -->
    <BaseModal
      v-model:open="showCreateTrainingModal"
      title="Créer une nouvelle formation"
      size="lg"
    >
      <form @submit.prevent="createTraining" class="space-y-6">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Titre de la formation *
          </label>
          <BaseInput
            v-model="newTraining.title"
            placeholder="Ex: Analyse des médicaments génériques"
            required
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Description *
          </label>
          <textarea
            v-model="newTraining.description"
            rows="3"
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Décrivez le contenu de la formation..."
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Catégorie *
            </label>
            <select
              v-model="newTraining.category"
              class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="pharmacology">Pharmacologie</option>
              <option value="analytics">Analyses</option>
              <option value="research">Recherche</option>
              <option value="quality">Qualité</option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Durée (heures) *
            </label>
            <BaseInput
              v-model="newTraining.duration"
              type="number"
              placeholder="8"
              required
            />
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <BaseButton
            type="button"
            variant="outline"
            @click="showCreateTrainingModal = false"
          >
            Annuler
          </BaseButton>
          <BaseButton type="submit" variant="primary" :loading="isCreating">
            Créer la formation
          </BaseButton>
        </div>
      </form>
    </BaseModal>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";

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
const isLoading = ref(true);
const showCreateTrainingModal = ref(false);
const showFilters = ref(false);
const isCreating = ref(false);
const searchQuery = ref("");
const filters = ref({
  status: "",
  category: "",
  dateRange: "",
});

// New training form
const newTraining = ref({
  title: "",
  description: "",
  category: "",
  duration: "",
});

// Mock data
const trainings = ref([
  {
    id: 1,
    title: "Analyse des médicaments génériques",
    description:
      "Formation complète sur l'analyse et la validation des médicaments génériques",
    category: "Pharmacologie",
    status: "published",
    participants: 45,
    createdAt: "2024-01-15",
    duration: 8,
  },
  {
    id: 2,
    title: "Contrôle qualité en laboratoire",
    description:
      "Méthodes et procédures de contrôle qualité dans les laboratoires pharmaceutiques",
    category: "Qualité",
    status: "published",
    participants: 32,
    createdAt: "2024-01-10",
    duration: 6,
  },
  {
    id: 3,
    title: "Recherche clinique avancée",
    description: "Techniques de recherche clinique et analyse des données",
    category: "Recherche",
    status: "draft",
    participants: 0,
    createdAt: "2024-01-20",
    duration: 12,
  },
  {
    id: 4,
    title: "Analyses biochimiques",
    description: "Techniques d'analyse biochimique pour les laboratoires",
    category: "Analyses",
    status: "published",
    participants: 28,
    createdAt: "2024-01-05",
    duration: 10,
  },
]);

// Computed
const filteredTrainings = computed(() => {
  let filtered = trainings.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (training) =>
        training.title.toLowerCase().includes(query) ||
        training.description.toLowerCase().includes(query) ||
        training.category.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(
      (training) => training.status === filters.value.status
    );
  }

  // Category filter
  if (filters.value.category) {
    filtered = filtered.filter(
      (training) =>
        training.category.toLowerCase() === filters.value.category.toLowerCase()
    );
  }

  return filtered;
});

const totalTrainings = computed(() => trainings.value.length);
const publishedTrainings = computed(
  () => trainings.value.filter((t) => t.status === "published").length
);
const inProgressTrainings = computed(
  () => trainings.value.filter((t) => t.status === "draft").length
);
const totalParticipants = computed(() =>
  trainings.value.reduce((sum, t) => sum + t.participants, 0)
);

// Methods
const getStatusVariant = (status) => {
  switch (status) {
    case "published":
      return "success";
    case "draft":
      return "warning";
    case "archived":
      return "secondary";
    default:
      return "info";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "published":
      return "Publié";
    case "draft":
      return "Brouillon";
    case "archived":
      return "Archivé";
    default:
      return "Inconnu";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR");
};

const viewTraining = (training) => {
  console.log("Viewing training:", training.id);
  // Navigate to training detail page
};

const editTraining = (training) => {
  console.log("Editing training:", training.id);
  // Navigate to training edit page
};

const duplicateTraining = (training) => {
  console.log("Duplicating training:", training.id);
  // Duplicate training logic
};

const createTraining = async () => {
  try {
    isCreating.value = true;

    const training = {
      id: trainings.value.length + 1,
      title: newTraining.value.title,
      description: newTraining.value.description,
      category: newTraining.value.category,
      status: "draft",
      participants: 0,
      createdAt: new Date().toISOString().split("T")[0],
      duration: parseInt(newTraining.value.duration),
    };

    trainings.value.unshift(training);
    showCreateTrainingModal.value = false;

    // Reset form
    newTraining.value = {
      title: "",
      description: "",
      category: "",
      duration: "",
    };
  } catch (error) {
    console.error("Error creating training:", error);
  } finally {
    isCreating.value = false;
  }
};

const exportTrainings = () => {
  console.log("Exporting trainings...");
  // Export logic
};

const clearFilters = () => {
  filters.value = {
    status: "",
    category: "",
    dateRange: "",
  };
  searchQuery.value = "";
};

// Lifecycle
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error("Error loading trainings:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
