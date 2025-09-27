<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Services Pharmacie
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Accédez aux services spécialisés pour les pharmaciens : demandes de
            produits, promotions et recrutement
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Product Requests -->
        <BaseCard
          class="hover:shadow-lg transition-shadow cursor-pointer group"
          @click="$router.push('/services-pharmacie/demande')"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors"
            >
              <svg
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              Demandes de Produits
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Demandez des produits spécifiques pour votre pharmacie et recevez
              des offres personnalisées
            </p>
            <BaseButton
              variant="outline"
              class="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
            >
              Faire une demande
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Product Promotions -->
        <BaseCard
          class="hover:shadow-lg transition-shadow cursor-pointer group"
          @click="$router.push('/services-pharmacie/produits')"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors"
            >
              <svg
                class="w-8 h-8 text-green-600 dark:text-green-400"
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
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              Promotions Produits
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Découvrez les dernières promotions et offres spéciales sur les
              produits pharmaceutiques
            </p>
            <BaseButton
              variant="outline"
              class="group-hover:bg-green-50 dark:group-hover:bg-green-900/20"
            >
              Voir les promotions
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Recruitment -->
        <BaseCard
          class="hover:shadow-lg transition-shadow cursor-pointer group"
          @click="$router.push('/services-pharmacie/recrutement')"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors"
            >
              <svg
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
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
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              Recrutement
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Trouvez des opportunités d'emploi ou publiez vos offres de
              recrutement
            </p>
            <BaseButton
              variant="outline"
              class="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20"
            >
              Voir les offres
            </BaseButton>
          </div>
        </BaseCard>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <BaseCard>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.activeRequests }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Demandes actives
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.availableProducts }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Produits disponibles
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.jobOffers }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Offres d'emploi
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.satisfiedPharmacies }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Pharmacies satisfaites
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Requests -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Demandes récentes
            </h3>
          </template>

          <div class="space-y-4">
            <div
              v-for="request in recentRequests"
              :key="request.id"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex-1">
                <h4 class="font-medium text-gray-900 dark:text-gray-100">
                  {{ request.product }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ request.pharmacy }} • {{ formatDate(request.createdAt) }}
                </p>
              </div>
              <BaseBadge :variant="getRequestStatusVariant(request.status)">
                {{ getRequestStatusLabel(request.status) }}
              </BaseBadge>
            </div>
          </div>

          <div class="mt-4">
            <BaseButton
              variant="outline"
              size="sm"
              @click="$router.push('/services-pharmacie/demande')"
            >
              Voir toutes les demandes
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Featured Products -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Produits en promotion
            </h3>
          </template>

          <div class="space-y-4">
            <div
              v-for="product in featuredProducts"
              :key="product.id"
              class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div
                class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-gray-400"
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
              <div class="flex-1">
                <h4 class="font-medium text-gray-900 dark:text-gray-100">
                  {{ product.name }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ product.supplier }} • {{ product.discount }}% de réduction
                </p>
              </div>
              <BaseBadge variant="success" size="sm">
                -{{ product.discount }}%
              </BaseBadge>
            </div>
          </div>

          <div class="mt-4">
            <BaseButton
              variant="outline"
              size="sm"
              @click="$router.push('/services-pharmacie/produits')"
            >
              Voir tous les produits
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const stats = ref({
  activeRequests: 24,
  availableProducts: 156,
  jobOffers: 8,
  satisfiedPharmacies: 89,
});

const recentRequests = ref([
  {
    id: 1,
    product: "Paracétamol 500mg",
    pharmacy: "Pharmacie du Centre",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    product: "Vitamine D3",
    pharmacy: "Pharmacie de la Paix",
    status: "approved",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    product: "Insuline Glargine",
    pharmacy: "Pharmacie de l'Espoir",
    status: "processing",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
]);

const featuredProducts = ref([
  {
    id: 1,
    name: "Aspirine 500mg",
    supplier: "Laboratoire Sanofi",
    discount: 15,
  },
  {
    id: 2,
    name: "Oméprazole 20mg",
    supplier: "Laboratoire Pfizer",
    discount: 20,
  },
  {
    id: 3,
    name: "Métformine 850mg",
    supplier: "Laboratoire Novartis",
    discount: 12,
  },
]);

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return "À l'instant";
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`;
  } else {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  }
};

onMounted(() => {
  // Load data from store or API
});
</script>
