<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Services Pharmacie
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Gérez vos demandes de produits, consultez les promotions et accédez
          aux services pharmaceutiques.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
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
                Demandes en cours
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.pendingRequests }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Promotions actives
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.activePromotions }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Offres d'emploi
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.jobOffers }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Taux de satisfaction
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ stats.satisfaction }}%
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Demandes récentes -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Demandes récentes
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/services-pharmacie/demande')"
                >
                  Nouvelle demande
                </BaseButton>
              </div>
            </template>

            <div v-if="recentRequests.length === 0" class="text-center py-8">
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
              <h3
                class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Aucune demande récente
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Créez votre première demande de produit.
              </p>
              <div class="mt-6">
                <BaseButton
                  variant="primary"
                  @click="$router.push('/services-pharmacie/demande')"
                >
                  Créer une demande
                </BaseButton>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="request in recentRequests"
                :key="request.id"
                class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div class="flex items-center">
                  <div
                    class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4"
                  >
                    <svg
                      class="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ request.productName }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Quantité: {{ request.quantity }} -
                      {{ request.pharmacyName }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <BaseBadge :variant="getStatusVariant(request.status)">
                    {{ getStatusLabel(request.status) }}
                  </BaseBadge>
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="viewRequest(request.id)"
                  >
                    Voir
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Promotions actives -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Promotions actives
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/services-pharmacie/promotions')"
                >
                  Voir tout
                </BaseButton>
              </div>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="promotion in activePromotions"
                :key="promotion.id"
                class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ promotion.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ promotion.company }}
                    </p>
                  </div>
                  <BaseBadge variant="warning">
                    -{{ promotion.discount }}%
                  </BaseBadge>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {{ promotion.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    Valide jusqu'au {{ formatDate(promotion.endDate) }}
                  </span>
                  <BaseButton
                    variant="primary"
                    size="sm"
                    @click="
                      $router.push({
                        name: 'product-detail',
                        params: { id: promotion.id },
                      })
                    "
                  >
                    Voir l'offre
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Offres d'emploi -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Offres d'emploi
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/services-pharmacie/recrutement')"
                >
                  Voir tout
                </BaseButton>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="job in recentJobs"
                :key="job.id"
                class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {{ job.title }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {{ job.company }} - {{ job.location }}
                </p>
                <div class="flex items-center justify-between">
                  <BaseBadge
                    :variant="job.type === 'CDI' ? 'success' : 'info'"
                    size="sm"
                  >
                    {{ job.type }}
                  </BaseBadge>
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="
                      $router.push({
                        name: 'job-detail',
                        params: { id: job.id },
                      })
                    "
                  >
                    Postuler
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Actions rapides -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Actions rapides
              </h3>
            </template>

            <div class="space-y-3">
              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/services-pharmacie/demande')"
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </template>
                Nouvelle demande
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/services-pharmacie/recrutement')"
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </template>
                Voir les emplois
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/aide')"
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </template>
                Support client
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const router = useRouter();

const stats = ref({
  pendingRequests: 5,
  activePromotions: 12,
  jobOffers: 8,
  satisfaction: 94,
});

const recentRequests = ref([
  {
    id: 1,
    productName: "Paracétamol 500mg",
    quantity: "100 boîtes",
    pharmacyName: "Pharmacie du Plateau",
    status: "pending",
  },
  {
    id: 2,
    productName: "Amoxicilline 1g",
    quantity: "50 boîtes",
    pharmacyName: "Pharmacie de la Liberté",
    status: "approved",
  },
]);

const activePromotions = ref([
  {
    id: 1,
    title: "Réduction sur les antibiotiques",
    company: "Laboratoire Sanofi",
    description: "Remise de 15% sur tous les antibiotiques de la gamme",
    discount: 15,
    endDate: new Date("2024-02-28"),
  },
  {
    id: 2,
    title: "Offre spéciale vitamines",
    company: "Laboratoire Bayer",
    description: "Achetez 2, obtenez 1 gratuit sur les compléments vitaminés",
    discount: 33,
    endDate: new Date("2024-02-15"),
  },
]);

const recentJobs = ref([
  {
    id: 1,
    title: "Pharmacien titulaire",
    company: "Pharmacie Centrale",
    location: "Dakar",
    type: "CDI",
  },
  {
    id: 2,
    title: "Préparateur en pharmacie",
    company: "Pharmacie de la Gare",
    location: "Thiès",
    type: "CDD",
  },
]);

const getStatusVariant = (status) => {
  const variants = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
  };
  return variants[status] || "secondary";
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "En attente",
    approved: "Approuvée",
    rejected: "Rejetée",
  };
  return labels[status] || status;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const viewRequest = (requestId) => {
  // Navigate to request detail
  console.log("View request:", requestId);
};

onMounted(() => {
  // Load pharmacy services data
});
</script>
