<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <h1
              class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              Demandes de Produits
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Demandez des produits spécifiques pour votre pharmacie
            </p>
          </div>
          <BaseButton
            variant="primary"
            @click="showNewRequestModal = true"
            class="mt-4 sm:mt-0"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </template>
            Nouvelle demande
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <BaseCard>
          <div class="text-center">
            <div
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1"
            >
              {{ requestStats.total }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Total demandes
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1"
            >
              {{ requestStats.pending }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              En attente
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-2xl font-bold text-green-600 dark:text-green-400 mb-1"
            >
              {{ requestStats.approved }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Approuvées
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1"
            >
              {{ requestStats.processing }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">En cours</div>
          </div>
        </BaseCard>
      </div>

      <!-- Requests List -->
      <div class="space-y-4">
        <div
          v-for="request in requests"
          :key="request.id"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ request.productName }}
                </h3>
                <BaseBadge :variant="getRequestStatusVariant(request.status)">
                  {{ getRequestStatusLabel(request.status) }}
                </BaseBadge>
                <BaseBadge variant="secondary" size="sm">
                  {{ getCategoryLabel(request.category) }}
                </BaseBadge>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ request.description }}
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400"
                    >Quantité:</span
                  >
                  <span
                    class="ml-2 font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ request.quantity }} {{ request.unit }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Budget:</span>
                  <span
                    class="ml-2 font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ request.estimatedBudget }} FCFA
                  </span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Date:</span>
                  <span
                    class="ml-2 font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ formatDate(request.createdAt) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <BaseButton
                variant="outline"
                size="sm"
                @click="viewRequest(request)"
              >
                Voir détails
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Request Modal -->
    <BaseModal
      :show="showNewRequestModal"
      @close="showNewRequestModal = false"
      size="lg"
    >
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Nouvelle demande de produit
        </h3>

        <form @submit.prevent="handleCreateRequest" class="space-y-6">
          <BaseInput
            v-model="newRequest.productName"
            label="Nom du produit"
            placeholder="Ex: Paracétamol 500mg"
            required
          />

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Catégorie
            </label>
            <select
              v-model="newRequest.category"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="medicament">Médicament</option>
              <option value="vitamine">Vitamine</option>
              <option value="equipement">Équipement</option>
              <option value="cosmetique">Cosmétique</option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              v-model="newRequest.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Décrivez le produit et vos besoins spécifiques..."
              required
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="newRequest.quantity"
              label="Quantité"
              type="number"
              placeholder="100"
              required
            />
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Unité
              </label>
              <select
                v-model="newRequest.unit"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Sélectionner une unité</option>
                <option value="boites">Boîtes</option>
                <option value="plaquettes">Plaquettes</option>
                <option value="flacons">Flacons</option>
                <option value="tubes">Tubes</option>
                <option value="pieces">Pièces</option>
              </select>
            </div>
          </div>

          <BaseInput
            v-model="newRequest.estimatedBudget"
            label="Budget estimé (FCFA)"
            type="number"
            placeholder="50000"
            required
          />

          <div class="flex justify-end space-x-3">
            <BaseButton
              type="button"
              variant="outline"
              @click="showNewRequestModal = false"
            >
              Annuler
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              :loading="isCreatingRequest"
            >
              Créer la demande
            </BaseButton>
          </div>
        </form>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const isCreatingRequest = ref(false);
const showNewRequestModal = ref(false);

const newRequest = reactive({
  productName: "",
  category: "",
  description: "",
  quantity: "",
  unit: "",
  estimatedBudget: "",
});

// Mock data
const requests = ref([
  {
    id: 1,
    productName: "Paracétamol 500mg",
    category: "medicament",
    description: "Demande de paracétamol pour le stock de base de la pharmacie",
    quantity: 100,
    unit: "boites",
    estimatedBudget: 25000,
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    productName: "Vitamine D3",
    category: "vitamine",
    description: "Vitamine D3 pour les patients âgés",
    quantity: 50,
    unit: "flacons",
    estimatedBudget: 15000,
    status: "approved",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    productName: "Insuline Glargine",
    category: "medicament",
    description: "Insuline pour patients diabétiques",
    quantity: 20,
    unit: "flacons",
    estimatedBudget: 80000,
    status: "processing",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]);

const requestStats = computed(() => {
  const total = requests.value.length;
  const pending = requests.value.filter((r) => r.status === "pending").length;
  const approved = requests.value.filter((r) => r.status === "approved").length;
  const processing = requests.value.filter(
    (r) => r.status === "processing"
  ).length;

  return { total, pending, approved, processing };
});

const getRequestStatusVariant = (status) => {
  const variants = {
    pending: "warning",
    approved: "success",
    processing: "primary",
    rejected: "danger",
  };
  return variants[status] || "secondary";
};

const getRequestStatusLabel = (status) => {
  const labels = {
    pending: "En attente",
    approved: "Approuvée",
    processing: "En cours",
    rejected: "Rejetée",
  };
  return labels[status] || status;
};

const getCategoryLabel = (category) => {
  const labels = {
    medicament: "Médicament",
    vitamine: "Vitamine",
    equipement: "Équipement",
    cosmetique: "Cosmétique",
  };
  return labels[category] || category;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const viewRequest = (request) => {
  console.log("View request:", request.id);
};

const handleCreateRequest = async () => {
  isCreatingRequest.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const request = {
      id: Date.now(),
      ...newRequest,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    requests.value.unshift(request);
    showNewRequestModal.value = false;

    // Reset form
    Object.keys(newRequest).forEach((key) => {
      newRequest[key] = "";
    });
  } catch (error) {
    console.error("Error creating request:", error);
  } finally {
    isCreatingRequest.value = false;
  }
};

onMounted(() => {
  // Load data
});
</script>
