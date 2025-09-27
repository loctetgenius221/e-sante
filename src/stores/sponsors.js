import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSponsorsStore = defineStore("sponsors", () => {
  // State
  const campaigns = ref([]);
  const analytics = ref({
    totalViews: 0,
    totalClicks: 0,
    totalConversions: 0,
    conversionRate: 0,
    costPerClick: 0,
    returnOnInvestment: 0,
  });
  const isLoading = ref(false);

  // Getters
  const activeCampaigns = computed(() =>
    campaigns.value.filter((campaign) => campaign.status === "active")
  );

  const pausedCampaigns = computed(() =>
    campaigns.value.filter((campaign) => campaign.status === "paused")
  );

  const completedCampaigns = computed(() =>
    campaigns.value.filter((campaign) => campaign.status === "completed")
  );

  const campaignCount = computed(() => campaigns.value.length);

  const totalBudget = computed(() =>
    campaigns.value.reduce((sum, campaign) => sum + campaign.budget, 0)
  );

  const spentBudget = computed(() =>
    campaigns.value.reduce((sum, campaign) => sum + campaign.spent, 0)
  );

  const remainingBudget = computed(() => totalBudget.value - spentBudget.value);

  // Actions
  const fetchCampaigns = async () => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Load from localStorage or use mock data
      const storedCampaigns = localStorage.getItem("sponsor-campaigns");
      if (storedCampaigns) {
        campaigns.value = JSON.parse(storedCampaigns);
      } else {
        // Initialize with mock data
        campaigns.value = [
          {
            id: 1,
            name: "Formation Pharmacovigilance - Q1 2024",
            description:
              "Campagne pour promouvoir la formation en pharmacovigilance",
            type: "banner",
            targetAudience: "pharmacists",
            budget: 500000,
            spent: 125000,
            status: "active",
            startDate: new Date(
              Date.now() - 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            endDate: new Date(
              Date.now() + 60 * 24 * 60 * 60 * 1000
            ).toISOString(),
            metrics: {
              impressions: 12500,
              clicks: 450,
              conversions: 23,
              ctr: 3.6,
              cpc: 278,
              conversionRate: 5.1,
            },
            creative: {
              title: "Maîtrisez la Pharmacovigilance",
              subtitle: "Formation certifiante pour pharmaciens",
              image: "/images/campaigns/pharmacovigilance-banner.jpg",
              ctaText: "S'inscrire maintenant",
              ctaLink: "/catalogue/pharmacovigilance-securite-medicaments",
            },
            createdAt: new Date(
              Date.now() - 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            updatedAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: 2,
            name: "Services Pharmacie - Promotion",
            description: "Mise en avant des services pharmaceutiques",
            type: "sidebar",
            targetAudience: "all",
            budget: 300000,
            spent: 89000,
            status: "active",
            startDate: new Date(
              Date.now() - 15 * 24 * 60 * 60 * 1000
            ).toISOString(),
            endDate: new Date(
              Date.now() + 45 * 24 * 60 * 60 * 1000
            ).toISOString(),
            metrics: {
              impressions: 8900,
              clicks: 320,
              conversions: 18,
              ctr: 3.6,
              cpc: 278,
              conversionRate: 5.6,
            },
            creative: {
              title: "Services Pharmacie",
              subtitle: "Découvrez nos services spécialisés",
              image: "/images/campaigns/services-pharmacie.jpg",
              ctaText: "En savoir plus",
              ctaLink: "/services-pharmacie",
            },
            createdAt: new Date(
              Date.now() - 15 * 24 * 60 * 60 * 1000
            ).toISOString(),
            updatedAt: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: 3,
            name: "Club Digital - Recrutement",
            description:
              "Campagne pour recruter de nouveaux membres au Club Digital",
            type: "popup",
            targetAudience: "students",
            budget: 200000,
            spent: 200000,
            status: "completed",
            startDate: new Date(
              Date.now() - 60 * 24 * 60 * 60 * 1000
            ).toISOString(),
            endDate: new Date(
              Date.now() - 10 * 24 * 60 * 60 * 1000
            ).toISOString(),
            metrics: {
              impressions: 15600,
              clicks: 780,
              conversions: 45,
              ctr: 5.0,
              cpc: 256,
              conversionRate: 5.8,
            },
            creative: {
              title: "Rejoignez le Club Digital",
              subtitle: "Communauté de professionnels de santé",
              image: "/images/campaigns/club-digital.jpg",
              ctaText: "Rejoindre",
              ctaLink: "/club",
            },
            createdAt: new Date(
              Date.now() - 60 * 24 * 60 * 60 * 1000
            ).toISOString(),
            updatedAt: new Date(
              Date.now() - 10 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
        ];
        localStorage.setItem(
          "sponsor-campaigns",
          JSON.stringify(campaigns.value)
        );
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Calculate analytics from campaigns
      const totalImpressions = campaigns.value.reduce(
        (sum, campaign) => sum + campaign.metrics.impressions,
        0
      );
      const totalClicks = campaigns.value.reduce(
        (sum, campaign) => sum + campaign.metrics.clicks,
        0
      );
      const totalConversions = campaigns.value.reduce(
        (sum, campaign) => sum + campaign.metrics.conversions,
        0
      );

      analytics.value = {
        totalViews: totalImpressions,
        totalClicks: totalClicks,
        totalConversions: totalConversions,
        conversionRate:
          totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
        costPerClick: totalClicks > 0 ? spentBudget.value / totalClicks : 0,
        returnOnInvestment:
          spentBudget.value > 0
            ? ((totalConversions * 5000) / spentBudget.value) * 100
            : 0, // Assuming 5000 FCFA per conversion
      };
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const createCampaign = async (campaignData) => {
    isLoading.value = true;
    try {
      const newCampaign = {
        id: Date.now(),
        ...campaignData,
        spent: 0,
        status: "draft",
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          cpc: 0,
          conversionRate: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      campaigns.value.push(newCampaign);
      localStorage.setItem(
        "sponsor-campaigns",
        JSON.stringify(campaigns.value)
      );

      return { success: true, data: newCampaign };
    } catch (error) {
      console.error("Error creating campaign:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const updateCampaign = async (campaignId, updates) => {
    isLoading.value = true;
    try {
      const index = campaigns.value.findIndex(
        (campaign) => campaign.id === campaignId
      );
      if (index !== -1) {
        campaigns.value[index] = {
          ...campaigns.value[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          "sponsor-campaigns",
          JSON.stringify(campaigns.value)
        );
        return { success: true, data: campaigns.value[index] };
      }
      return { success: false, error: "Campaign not found" };
    } catch (error) {
      console.error("Error updating campaign:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCampaign = async (campaignId) => {
    isLoading.value = true;
    try {
      const index = campaigns.value.findIndex(
        (campaign) => campaign.id === campaignId
      );
      if (index !== -1) {
        campaigns.value.splice(index, 1);
        localStorage.setItem(
          "sponsor-campaigns",
          JSON.stringify(campaigns.value)
        );
        return { success: true };
      }
      return { success: false, error: "Campaign not found" };
    } catch (error) {
      console.error("Error deleting campaign:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const pauseCampaign = async (campaignId) => {
    return await updateCampaign(campaignId, { status: "paused" });
  };

  const resumeCampaign = async (campaignId) => {
    return await updateCampaign(campaignId, { status: "active" });
  };

  const getCampaignById = (campaignId) => {
    return campaigns.value.find((campaign) => campaign.id === campaignId);
  };

  const getCampaignsByStatus = (status) => {
    return campaigns.value.filter((campaign) => campaign.status === status);
  };

  const getCampaignMetrics = (campaignId) => {
    const campaign = getCampaignById(campaignId);
    return campaign ? campaign.metrics : null;
  };

  return {
    // State
    campaigns,
    analytics,
    isLoading,

    // Getters
    activeCampaigns,
    pausedCampaigns,
    completedCampaigns,
    campaignCount,
    totalBudget,
    spentBudget,
    remainingBudget,

    // Actions
    fetchCampaigns,
    fetchAnalytics,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    pauseCampaign,
    resumeCampaign,
    getCampaignById,
    getCampaignsByStatus,
    getCampaignMetrics,
  };
});
