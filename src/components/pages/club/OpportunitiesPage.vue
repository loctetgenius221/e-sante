<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Opportunités du Club Digital"
  >
    <!-- Header Actions -->
    <div class="mb-6">
      <BaseButton variant="primary" @click="showCreateOpportunityModal = true">
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
        Publier une offre
      </BaseButton>
    </div>

    <div class="space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sticky top-8"
          >
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
              Filtres
            </h3>

            <!-- Search -->
            <div class="mb-6">
              <label
                class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
              >
                Recherche
              </label>
              <SearchInput
                :model-value="searchQuery"
                placeholder="Rechercher une opportunité..."
                @update:model-value="handleSearch"
                @search="handleSearchSubmit"
              />
            </div>

            <!-- Type Filter -->
            <div class="mb-6">
              <label
                class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
              >
                Type d'opportunité
              </label>
              <div class="space-y-2">
                <button
                  v-for="type in opportunityTypes"
                  :key="type"
                  @click="toggleTypeFilter(type)"
                  :class="getTypeButtonClasses(type)"
                  class="w-full text-left px-4 py-3 rounded-xl transition-all duration-200"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-medium">{{ type }}</span>
                    <svg
                      v-if="filters.type === type"
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
            <BaseButton
              variant="outline"
              size="sm"
              @click="clearFilters"
              full-width
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

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Results Header -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                >
                  {{ filteredOpportunities.length }} opportunité{{
                    filteredOpportunities.length > 1 ? "s" : ""
                  }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ getActiveFiltersText() }}
                </p>
              </div>
              <div class="flex items-center space-x-2 mt-4 sm:mt-0">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                  <button
                    @click="viewMode = 'grid'"
                    :class="getViewButtonClasses('grid')"
                    class="px-3 py-2 rounded-lg transition-all duration-200"
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
                    :class="getViewButtonClasses('list')"
                    class="px-3 py-2 rounded-lg transition-all duration-200"
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
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div v-for="n in 6" :key="n" class="animate-pulse">
              <div
                class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              >
                <div
                  class="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"
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
            v-else-if="filteredOpportunities.length === 0"
            class="text-center py-16"
          >
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-12"
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              </div>
              <h3
                class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              >
                Aucune opportunité trouvée
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Essayez de modifier vos critères de recherche ou publiez une
                nouvelle opportunité
              </p>
              <BaseButton
                variant="primary"
                @click="showCreateOpportunityModal = true"
              >
                Publier une offre
              </BaseButton>
            </div>
          </div>

          <!-- Opportunities Grid -->
          <div
            v-else-if="viewMode === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="opportunity in filteredOpportunities"
              :key="opportunity.id"
              class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <!-- Opportunity Header -->
              <div
                class="relative h-48 bg-gradient-to-br from-green-500 to-blue-600 overflow-hidden"
              >
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="absolute top-4 right-4">
                  <BaseBadge :variant="getTypeVariant(opportunity.type)">
                    {{ opportunity.type }}
                  </BaseBadge>
                </div>
                <div class="absolute bottom-4 left-4 text-white">
                  <div class="flex items-center space-x-2">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span class="text-sm font-medium">{{
                      opportunity.location
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Opportunity Content -->
              <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h3
                    class="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {{ opportunity.title }}
                  </h3>
                  <BaseBadge :variant="getUrgencyVariant(opportunity.urgency)">
                    {{ getUrgencyLabel(opportunity.urgency) }}
                  </BaseBadge>
                </div>

                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {{ opportunity.description }}
                </p>

                <div
                  class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4"
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {{ opportunity.company }}
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    {{ opportunity.salary }}
                  </div>
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
                    {{ formatDate(opportunity.createdAt) }}
                  </div>
                  <BaseButton variant="primary" size="sm">
                    {{
                      opportunity.isApplied ? "Candidature envoyée" : "Postuler"
                    }}
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Opportunities List -->
          <div v-else class="space-y-4">
            <div
              v-for="opportunity in filteredOpportunities"
              :key="opportunity.id"
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div class="flex flex-col md:flex-row gap-6">
                <div
                  class="md:w-48 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex-shrink-0 relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-black/20"></div>
                  <div class="absolute top-3 right-3">
                    <BaseBadge :variant="getTypeVariant(opportunity.type)">
                      {{ opportunity.type }}
                    </BaseBadge>
                  </div>
                  <div class="absolute bottom-3 left-3 text-white">
                    <div class="flex items-center space-x-1">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span class="text-xs font-medium">{{
                        opportunity.location
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex-1">
                  <div class="flex items-start justify-between mb-3">
                    <h3
                      class="text-xl font-bold text-gray-900 dark:text-gray-100"
                    >
                      {{ opportunity.title }}
                    </h3>
                    <BaseBadge
                      :variant="getUrgencyVariant(opportunity.urgency)"
                    >
                      {{ getUrgencyLabel(opportunity.urgency) }}
                    </BaseBadge>
                  </div>

                  <p class="text-gray-600 dark:text-gray-400 mb-4">
                    {{ opportunity.description }}
                  </p>

                  <div class="flex items-center justify-between">
                    <div
                      class="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {{ opportunity.company }}
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
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                        {{ opportunity.salary }}
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {{ formatDate(opportunity.createdAt) }}
                      </div>
                    </div>
                    <BaseButton variant="primary">
                      {{
                        opportunity.isApplied
                          ? "Candidature envoyée"
                          : "Postuler"
                      }}
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";

// Navigation items pour le Club Digital
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/club/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Forum",
    href: "/club/forum",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    name: "Messagerie",
    href: "/club/messagerie",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    badge: { text: "3", variant: "danger" },
  },
  {
    name: "Événements",
    href: "/club/evenements",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    name: "Opportunités",
    href: "/club/opportunites",
    iconPath:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6",
  },
  {
    name: "Retour au Dashboard",
    href: "/professional/dashboard",
    iconPath: "M10 19l-7-7m0 0l7-7m-7 7h18",
  },
]);

const isLoading = ref(true);
const showCreateOpportunityModal = ref(false);
const searchQuery = ref("");
const viewMode = ref("grid");
const filters = ref({
  type: "",
});

const opportunities = ref([
  {
    id: 1,
    title: "Pharmacien Responsable - Pharmacie Centrale",
    description:
      "Nous recherchons un pharmacien responsable pour diriger notre équipe et assurer la qualité des soins pharmaceutiques.",
    type: "Emploi",
    company: "Pharmacie Centrale de Dakar",
    location: "Dakar, Sénégal",
    salary: "800,000 - 1,200,000 FCFA",
    urgency: "high",
    createdAt: new Date("2024-01-20"),
    isApplied: false,
  },
  {
    id: 2,
    title: "Stage en Pharmacie Hospitalière",
    description:
      "Stage de 6 mois en pharmacie hospitalière pour étudiants en pharmacie. Formation pratique complète.",
    type: "Stage",
    company: "Hôpital Principal de Dakar",
    location: "Dakar, Sénégal",
    salary: "Gratuit + Indemnités",
    urgency: "medium",
    createdAt: new Date("2024-01-18"),
    isApplied: true,
  },
  {
    id: 3,
    title: "Consultant en Pharmacovigilance",
    description:
      "Mission de consulting pour améliorer les systèmes de pharmacovigilance dans les établissements de santé.",
    type: "Consulting",
    company: "Santé Plus Consulting",
    location: "Thiès, Sénégal",
    salary: "À négocier",
    urgency: "low",
    createdAt: new Date("2024-01-15"),
    isApplied: false,
  },
]);

const opportunityTypes = computed(() => [
  "Tous les types",
  "Emploi",
  "Stage",
  "Consulting",
  "Freelance",
  "Formation",
]);

const filteredOpportunities = computed(() => {
  let filtered = opportunities.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (opportunity) =>
        opportunity.title.toLowerCase().includes(query) ||
        opportunity.description.toLowerCase().includes(query) ||
        opportunity.company.toLowerCase().includes(query) ||
        opportunity.type.toLowerCase().includes(query)
    );
  }

  if (filters.value.type && filters.value.type !== "Tous les types") {
    filtered = filtered.filter(
      (opportunity) => opportunity.type === filters.value.type
    );
  }

  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const getTypeButtonClasses = (type) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const selectedClasses = "bg-gray-900 text-white shadow-lg";
  const unselectedClasses =
    "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";

  return filters.value.type === type
    ? `${baseClasses} ${selectedClasses}`
    : `${baseClasses} ${unselectedClasses}`;
};

const getViewButtonClasses = (mode) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const selectedClasses =
    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm";
  const unselectedClasses = "text-gray-500 dark:text-gray-400";

  return viewMode.value === mode
    ? `${baseClasses} ${selectedClasses}`
    : `${baseClasses} ${unselectedClasses}`;
};

const getTypeVariant = (type) => {
  const variants = {
    Emploi: "primary",
    Stage: "success",
    Consulting: "info",
    Freelance: "warning",
    Formation: "secondary",
  };
  return variants[type] || "default";
};

const getUrgencyVariant = (urgency) => {
  const variants = {
    high: "danger",
    medium: "warning",
    low: "secondary",
  };
  return variants[urgency] || "default";
};

const getUrgencyLabel = (urgency) => {
  const labels = {
    high: "Urgent",
    medium: "Normal",
    low: "Faible",
  };
  return labels[urgency] || urgency;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const getActiveFiltersText = () => {
  const activeFilters = [];
  if (filters.value.type) activeFilters.push(`Type: ${filters.value.type}`);
  if (searchQuery.value)
    activeFilters.push(`Recherche: "${searchQuery.value}"`);

  return activeFilters.length > 0
    ? activeFilters.join(" • ")
    : "Toutes les opportunités";
};

const handleSearch = (value) => {
  searchQuery.value = value;
};

const handleSearchSubmit = (value) => {
  searchQuery.value = value;
};

const toggleTypeFilter = (type) => {
  filters.value.type = filters.value.type === type ? "" : type;
};

const clearFilters = () => {
  filters.value = {
    type: "",
  };
  searchQuery.value = "";
};

onMounted(async () => {
  try {
    // Simulate loading opportunities
    await new Promise((resolve) => setTimeout(resolve, 500));
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
