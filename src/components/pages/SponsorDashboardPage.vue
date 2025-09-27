<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Tableau de Bord Sponsor
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Gérez vos campagnes publicitaires et suivez vos performances
            </p>
          </div>
          <BaseButton
            variant="primary"
            size="lg"
            @click="showCreateCampaignModal = true"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </template>
            Nouvelle Campagne
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Analytics Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
            >
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Vues Total
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ sponsorsStore.analytics.totalViews.toLocaleString() }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center"
            >
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
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Clics
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ sponsorsStore.analytics.totalClicks.toLocaleString() }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center"
            >
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Conversions
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ sponsorsStore.analytics.totalConversions }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-orange-600 dark:text-orange-400"
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
                ROI
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ sponsorsStore.analytics.returnOnInvestment.toFixed(1) }}%
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Budget Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <BaseCard>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Budget Total
          </h3>
          <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {{ sponsorsStore.totalBudget.toLocaleString() }} FCFA
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Budget alloué à toutes les campagnes
          </p>
        </BaseCard>

        <BaseCard>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Budget Dépensé
          </h3>
          <div class="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            {{ sponsorsStore.spentBudget.toLocaleString() }} FCFA
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{
              (
                (sponsorsStore.spentBudget / sponsorsStore.totalBudget) *
                100
              ).toFixed(1)
            }}% du budget total
          </p>
        </BaseCard>

        <BaseCard>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Budget Restant
          </h3>
          <div
            class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
          >
            {{ sponsorsStore.remainingBudget.toLocaleString() }} FCFA
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Disponible pour de nouvelles campagnes
          </p>
        </BaseCard>
      </div>

      <!-- Campaigns Tabs -->
      <div class="mb-6">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="getTabClasses(tab.id)"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
          >
            {{ tab.name }}
            <span
              class="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs"
            >
              {{ getTabCount(tab.id) }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Campaigns List -->
      <div v-if="sponsorsStore.isLoading" class="space-y-6">
        <BaseCard v-for="n in 3" :key="n" class="animate-pulse">
          <div
            class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"
          ></div>
          <div
            class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"
          ></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </BaseCard>
      </div>

      <div v-else-if="getFilteredCampaigns().length > 0" class="space-y-6">
        <BaseCard
          v-for="campaign in getFilteredCampaigns()"
          :key="campaign.id"
          class="hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ campaign.name }}
                </h3>
                <BaseBadge :variant="getStatusVariant(campaign.status)">
                  {{ getStatusLabel(campaign.status) }}
                </BaseBadge>
                <BaseBadge variant="secondary">
                  {{ getTypeLabel(campaign.type) }}
                </BaseBadge>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ campaign.description }}
              </p>

              <!-- Campaign Metrics -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div class="text-center">
                  <div
                    class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                  >
                    {{ campaign.metrics.impressions.toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Impressions
                  </div>
                </div>
                <div class="text-center">
                  <div
                    class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                  >
                    {{ campaign.metrics.clicks.toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Clics
                  </div>
                </div>
                <div class="text-center">
                  <div
                    class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                  >
                    {{ campaign.metrics.conversions }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Conversions
                  </div>
                </div>
                <div class="text-center">
                  <div
                    class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                  >
                    {{ campaign.metrics.ctr.toFixed(1) }}%
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    CTR
                  </div>
                </div>
              </div>

              <!-- Budget Progress -->
              <div class="mb-4">
                <div
                  class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1"
                >
                  <span>Budget</span>
                  <span
                    >{{ campaign.spent.toLocaleString() }} /
                    {{ campaign.budget.toLocaleString() }} FCFA</span
                  >
                </div>
                <div
                  class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                >
                  <div
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{
                      width: `${(campaign.spent / campaign.budget) * 100}%`,
                    }"
                  ></div>
                </div>
              </div>

              <!-- Campaign Dates -->
              <div
                class="flex items-center text-sm text-gray-600 dark:text-gray-400"
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ formatDate(campaign.startDate) }} -
                {{ formatDate(campaign.endDate) }}
              </div>
            </div>

            <!-- Campaign Actions -->
            <div class="flex flex-col space-y-2 ml-6">
              <BaseButton
                variant="outline"
                size="sm"
                @click="viewCampaign(campaign)"
              >
                Voir
              </BaseButton>

              <BaseButton
                v-if="campaign.status === 'active'"
                variant="outline"
                size="sm"
                @click="pauseCampaign(campaign.id)"
              >
                Pause
              </BaseButton>

              <BaseButton
                v-else-if="campaign.status === 'paused'"
                variant="primary"
                size="sm"
                @click="resumeCampaign(campaign.id)"
              >
                Reprendre
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                @click="editCampaign(campaign)"
              >
                Modifier
              </BaseButton>

              <BaseButton
                variant="danger"
                size="sm"
                @click="deleteCampaign(campaign.id)"
              >
                Supprimer
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <div v-else class="text-center py-12">
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Aucune campagne {{ getActiveTabLabel() }}
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ getEmptyStateMessage() }}
        </p>
        <div class="mt-6">
          <BaseButton variant="primary" @click="showCreateCampaignModal = true">
            Créer une campagne
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Create Campaign Modal -->
    <BaseModal
      :show="showCreateCampaignModal"
      @close="showCreateCampaignModal = false"
      title="Créer une nouvelle campagne"
      size="lg"
    >
      <form @submit.prevent="handleCreateCampaign" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput
            v-model="newCampaign.name"
            label="Nom de la campagne"
            placeholder="Ex: Formation Pharmacovigilance Q1 2024"
            required
          />

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Type de campagne
            </label>
            <select
              v-model="newCampaign.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Sélectionner un type</option>
              <option value="banner">Bannière</option>
              <option value="sidebar">Barre latérale</option>
              <option value="popup">Popup</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>

        <BaseInput
          v-model="newCampaign.description"
          label="Description"
          type="textarea"
          placeholder="Décrivez l'objectif de votre campagne..."
          rows="3"
          required
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Public cible
            </label>
            <select
              v-model="newCampaign.targetAudience"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Sélectionner un public</option>
              <option value="all">Tous les utilisateurs</option>
              <option value="pharmacists">Pharmaciens</option>
              <option value="doctors">Médecins</option>
              <option value="students">Étudiants</option>
            </select>
          </div>

          <BaseInput
            v-model.number="newCampaign.budget"
            label="Budget (FCFA)"
            type="number"
            placeholder="500000"
            required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput
            v-model="newCampaign.startDate"
            label="Date de début"
            type="date"
            required
          />

          <BaseInput
            v-model="newCampaign.endDate"
            label="Date de fin"
            type="date"
            required
          />
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Contenu créatif
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput
              v-model="newCampaign.creative.title"
              label="Titre"
              placeholder="Titre accrocheur"
              required
            />

            <BaseInput
              v-model="newCampaign.creative.subtitle"
              label="Sous-titre"
              placeholder="Description courte"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <BaseInput
              v-model="newCampaign.creative.ctaText"
              label="Texte du bouton"
              placeholder="S'inscrire maintenant"
              required
            />

            <BaseInput
              v-model="newCampaign.creative.ctaLink"
              label="Lien de destination"
              placeholder="/catalogue/formation"
              required
            />
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-6">
          <BaseButton
            type="button"
            variant="outline"
            @click="showCreateCampaignModal = false"
          >
            Annuler
          </BaseButton>
          <BaseButton
            type="submit"
            variant="primary"
            :loading="sponsorsStore.isLoading"
          >
            Créer la campagne
          </BaseButton>
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useSponsorsStore } from "@/stores/sponsors";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";

const sponsorsStore = useSponsorsStore();

const activeTab = ref("all");
const showCreateCampaignModal = ref(false);

const tabs = ref([
  { id: "all", name: "Toutes" },
  { id: "active", name: "Actives" },
  { id: "paused", name: "En pause" },
  { id: "completed", name: "Terminées" },
]);

const newCampaign = reactive({
  name: "",
  description: "",
  type: "",
  targetAudience: "",
  budget: 0,
  startDate: "",
  endDate: "",
  creative: {
    title: "",
    subtitle: "",
    ctaText: "",
    ctaLink: "",
  },
});

const getTabClasses = (tabId) => {
  const baseClasses =
    "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600";
  const activeClasses = "border-blue-500 text-blue-600 dark:text-blue-400";

  return activeTab.value === tabId ? activeClasses : baseClasses;
};

const getTabCount = (tabId) => {
  switch (tabId) {
    case "all":
      return sponsorsStore.campaignCount;
    case "active":
      return sponsorsStore.activeCampaigns.length;
    case "paused":
      return sponsorsStore.pausedCampaigns.length;
    case "completed":
      return sponsorsStore.completedCampaigns.length;
    default:
      return 0;
  }
};

const getFilteredCampaigns = () => {
  switch (activeTab.value) {
    case "active":
      return sponsorsStore.activeCampaigns;
    case "paused":
      return sponsorsStore.pausedCampaigns;
    case "completed":
      return sponsorsStore.completedCampaigns;
    default:
      return sponsorsStore.campaigns;
  }
};

const getStatusVariant = (status) => {
  const variants = {
    active: "success",
    paused: "warning",
    completed: "secondary",
    draft: "default",
  };
  return variants[status] || "default";
};

const getStatusLabel = (status) => {
  const labels = {
    active: "Active",
    paused: "En pause",
    completed: "Terminée",
    draft: "Brouillon",
  };
  return labels[status] || status;
};

const getTypeLabel = (type) => {
  const labels = {
    banner: "Bannière",
    sidebar: "Barre latérale",
    popup: "Popup",
    email: "Email",
  };
  return labels[type] || type;
};

const getActiveTabLabel = () => {
  const tab = tabs.value.find((t) => t.id === activeTab.value);
  return tab ? tab.name.toLowerCase() : "";
};

const getEmptyStateMessage = () => {
  switch (activeTab.value) {
    case "active":
      return "Commencez par créer votre première campagne active.";
    case "paused":
      return "Aucune campagne n'est actuellement en pause.";
    case "completed":
      return "Aucune campagne n'est encore terminée.";
    default:
      return "Créez votre première campagne pour commencer.";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const handleCreateCampaign = async () => {
  const result = await sponsorsStore.createCampaign(newCampaign);
  if (result.success) {
    showCreateCampaignModal.value = false;
    // Reset form
    Object.keys(newCampaign).forEach((key) => {
      if (key === "creative") {
        Object.keys(newCampaign.creative).forEach((creativeKey) => {
          newCampaign.creative[creativeKey] = "";
        });
      } else {
        newCampaign[key] = key === "budget" ? 0 : "";
      }
    });
    // Refresh analytics
    await sponsorsStore.fetchAnalytics();
  }
};

const viewCampaign = (campaign) => {
  // TODO: Implement campaign detail view
  console.log("View campaign:", campaign);
};

const editCampaign = (campaign) => {
  // TODO: Implement campaign editing
  console.log("Edit campaign:", campaign);
};

const pauseCampaign = async (campaignId) => {
  await sponsorsStore.pauseCampaign(campaignId);
  await sponsorsStore.fetchAnalytics();
};

const resumeCampaign = async (campaignId) => {
  await sponsorsStore.resumeCampaign(campaignId);
  await sponsorsStore.fetchAnalytics();
};

const deleteCampaign = async (campaignId) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette campagne ?")) {
    await sponsorsStore.deleteCampaign(campaignId);
    await sponsorsStore.fetchAnalytics();
  }
};

onMounted(async () => {
  await sponsorsStore.fetchCampaigns();
  await sponsorsStore.fetchAnalytics();
});
</script>
