<template>
  <DashboardLayout :navigation-items="navigationItems" page-title="Demandes">
    <!-- Header Actions -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
      <div class="flex gap-3">
        <BaseButton variant="primary" @click="showCreateRequestModal = true">
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
          Nouvelle demande
        </BaseButton>
        <BaseButton variant="outline" @click="exportRequests">
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
          placeholder="Rechercher une demande..."
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
            >Type</label
          >
          <select
            v-model="filters.type"
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Tous les types</option>
            <option value="product">Demande de produit</option>
            <option value="service">Demande de service</option>
            <option value="partnership">Partenariat</option>
            <option value="information">Information</option>
          </select>
        </div>
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
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Priorité</label
          >
          <select
            v-model="filters.priority"
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Toutes les priorités</option>
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Élevée</option>
            <option value="urgent">Urgente</option>
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
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Demandes
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ totalRequests }}
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
              En attente
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ pendingRequests }}
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
              Terminées
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ completedRequests }}
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div class="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
            <svg
              class="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Urgentes
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ urgentRequests }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Requests List -->
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

      <div v-else-if="filteredRequests.length === 0" class="text-center py-12">
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
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Aucune demande trouvée
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Commencez par créer votre première demande.
        </p>
        <div class="mt-6">
          <BaseButton variant="primary" @click="showCreateRequestModal = true">
            Nouvelle demande
          </BaseButton>
        </div>
      </div>

      <div v-else class="space-y-4">
        <BaseCard
          v-for="request in filteredRequests"
          :key="request.id"
          class="hover:shadow-lg transition-shadow duration-200"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ request.title }}
                </h3>
                <BaseBadge
                  :variant="getStatusVariant(request.status)"
                  size="sm"
                >
                  {{ getStatusText(request.status) }}
                </BaseBadge>
                <BaseBadge
                  :variant="getPriorityVariant(request.priority)"
                  size="sm"
                >
                  {{ getPriorityText(request.priority) }}
                </BaseBadge>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {{ request.description }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              {{ getTypeText(request.type) }}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {{ request.client }}
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
              {{ formatDate(request.createdAt) }}
            </div>
          </div>

          <div class="flex gap-2">
            <BaseButton
              variant="outline"
              size="sm"
              @click="viewRequest(request)"
              class="flex-1"
            >
              Voir
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              @click="editRequest(request)"
              class="flex-1"
            >
              Modifier
            </BaseButton>
            <BaseButton
              v-if="request.status === 'pending'"
              variant="primary"
              size="sm"
              @click="acceptRequest(request)"
            >
              Accepter
            </BaseButton>
            <BaseButton
              v-if="request.status === 'pending'"
              variant="danger"
              size="sm"
              @click="rejectRequest(request)"
            >
              Rejeter
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Create Request Modal -->
    <BaseModal
      v-model:open="showCreateRequestModal"
      title="Créer une nouvelle demande"
      size="lg"
    >
      <form @submit.prevent="createRequest" class="space-y-6">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Titre de la demande *
          </label>
          <BaseInput
            v-model="newRequest.title"
            placeholder="Ex: Demande d'analyse de médicaments"
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
            v-model="newRequest.description"
            rows="3"
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Décrivez votre demande en détail..."
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Type *
            </label>
            <select
              v-model="newRequest.type"
              class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Sélectionner un type</option>
              <option value="product">Demande de produit</option>
              <option value="service">Demande de service</option>
              <option value="partnership">Partenariat</option>
              <option value="information">Information</option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Priorité *
            </label>
            <select
              v-model="newRequest.priority"
              class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Sélectionner une priorité</option>
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <BaseButton
            type="button"
            variant="outline"
            @click="showCreateRequestModal = false"
          >
            Annuler
          </BaseButton>
          <BaseButton type="submit" variant="primary" :loading="isCreating">
            Créer la demande
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
const showCreateRequestModal = ref(false);
const showFilters = ref(false);
const isCreating = ref(false);
const searchQuery = ref("");
const filters = ref({
  type: "",
  status: "",
  priority: "",
});

// New request form
const newRequest = ref({
  title: "",
  description: "",
  type: "",
  priority: "",
});

// Mock data
const requests = ref([
  {
    id: 1,
    title: "Demande d'analyse de médicaments génériques",
    description:
      "Analyse complète de la bioéquivalence des médicaments génériques",
    type: "service",
    status: "pending",
    priority: "high",
    client: "Dr. Martin Dubois",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Partenariat pour recherche clinique",
    description: "Collaboration sur un projet de recherche clinique innovant",
    type: "partnership",
    status: "in_progress",
    priority: "medium",
    client: "CHU de Paris",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Information sur équipements d'analyse",
    description: "Demande d'informations techniques sur nos équipements",
    type: "information",
    status: "completed",
    priority: "low",
    client: "Laboratoire ABC",
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    title: "Commande d'équipements spécialisés",
    description: "Achat d'équipements pour laboratoire de pointe",
    type: "product",
    status: "pending",
    priority: "urgent",
    client: "Institut Pasteur",
    createdAt: "2024-01-20",
  },
]);

// Computed
const filteredRequests = computed(() => {
  let filtered = requests.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (request) =>
        request.title.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query) ||
        request.client.toLowerCase().includes(query)
    );
  }

  // Type filter
  if (filters.value.type) {
    filtered = filtered.filter(
      (request) => request.type === filters.value.type
    );
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(
      (request) => request.status === filters.value.status
    );
  }

  // Priority filter
  if (filters.value.priority) {
    filtered = filtered.filter(
      (request) => request.priority === filters.value.priority
    );
  }

  return filtered;
});

const totalRequests = computed(() => requests.value.length);
const pendingRequests = computed(
  () => requests.value.filter((r) => r.status === "pending").length
);
const completedRequests = computed(
  () => requests.value.filter((r) => r.status === "completed").length
);
const urgentRequests = computed(
  () => requests.value.filter((r) => r.priority === "urgent").length
);

// Methods
const getStatusVariant = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "in_progress":
      return "info";
    case "completed":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "in_progress":
      return "En cours";
    case "completed":
      return "Terminé";
    case "cancelled":
      return "Annulé";
    default:
      return "Inconnu";
  }
};

const getPriorityVariant = (priority) => {
  switch (priority) {
    case "low":
      return "secondary";
    case "medium":
      return "info";
    case "high":
      return "warning";
    case "urgent":
      return "danger";
    default:
      return "secondary";
  }
};

const getPriorityText = (priority) => {
  switch (priority) {
    case "low":
      return "Faible";
    case "medium":
      return "Moyenne";
    case "high":
      return "Élevée";
    case "urgent":
      return "Urgente";
    default:
      return "Inconnue";
  }
};

const getTypeText = (type) => {
  switch (type) {
    case "product":
      return "Demande de produit";
    case "service":
      return "Demande de service";
    case "partnership":
      return "Partenariat";
    case "information":
      return "Information";
    default:
      return "Inconnu";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR");
};

const viewRequest = (request) => {
  console.log("Viewing request:", request.id);
  // Navigate to request detail page
};

const editRequest = (request) => {
  console.log("Editing request:", request.id);
  // Navigate to request edit page
};

const acceptRequest = (request) => {
  request.status = "in_progress";
  console.log("Accepted request:", request.id);
};

const rejectRequest = (request) => {
  request.status = "cancelled";
  console.log("Rejected request:", request.id);
};

const createRequest = async () => {
  try {
    isCreating.value = true;

    const request = {
      id: requests.value.length + 1,
      title: newRequest.value.title,
      description: newRequest.value.description,
      type: newRequest.value.type,
      status: "pending",
      priority: newRequest.value.priority,
      client: "Utilisateur actuel",
      createdAt: new Date().toISOString().split("T")[0],
    };

    requests.value.unshift(request);
    showCreateRequestModal.value = false;

    // Reset form
    newRequest.value = {
      title: "",
      description: "",
      type: "",
      priority: "",
    };
  } catch (error) {
    console.error("Error creating request:", error);
  } finally {
    isCreating.value = false;
  }
};

const exportRequests = () => {
  console.log("Exporting requests...");
  // Export logic
};

const clearFilters = () => {
  filters.value = {
    type: "",
    status: "",
    priority: "",
  };
  searchQuery.value = "";
};

// Lifecycle
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error("Error loading requests:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
