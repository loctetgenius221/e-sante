<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Mes Certificats
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Vos certificats de formation et attestations de réussite
        </p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Certificats obtenus
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ certificates.length }}
              </p>
            </div>
          </div>
        </BaseCard>

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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Score moyen
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ averageScore }}%
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Dernier certificat
              </p>
              <p
                class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ lastCertificateDate }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Filter and Search -->
      <div class="mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un certificat..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <div class="sm:w-48">
            <select
              v-model="selectedYear"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="">Toutes les années</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Certificates Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="certificate in filteredCertificates"
          :key="certificate.id"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
        >
          <!-- Certificate Header -->
          <div class="text-center mb-4">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3"
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ certificate.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ certificate.trainingTitle }}
            </p>
          </div>

          <!-- Certificate Details -->
          <div class="space-y-3 mb-6">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Score obtenu</span
              >
              <span
                class="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                {{ certificate.score }}%
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Date d'obtention</span
              >
              <span
                class="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                {{ formatDate(certificate.issuedAt) }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Numéro</span
              >
              <span
                class="text-sm font-medium text-gray-900 dark:text-gray-100 font-mono"
              >
                {{ certificate.certificateNumber }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Validité</span
              >
              <BaseBadge :variant="getValidityVariant(certificate.validUntil)">
                {{ getValidityLabel(certificate.validUntil) }}
              </BaseBadge>
            </div>
          </div>

          <!-- Certificate Actions -->
          <div class="space-y-2">
            <BaseButton
              variant="primary"
              size="sm"
              full-width
              @click="downloadCertificate(certificate)"
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </template>
              Télécharger PDF
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="shareCertificate(certificate)"
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </template>
              Partager
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCertificates.length === 0" class="text-center py-12">
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
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Aucun certificat trouvé
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{
            searchQuery || selectedYear
              ? "Aucun certificat ne correspond à vos critères de recherche."
              : "Vous n'avez pas encore obtenu de certificat. Terminez une formation pour obtenir votre premier certificat."
          }}
        </p>
        <div class="mt-6">
          <BaseButton
            v-if="!searchQuery && !selectedYear"
            variant="primary"
            @click="$router.push('/catalogue')"
          >
            Explorer les formations
          </BaseButton>
          <BaseButton v-else variant="outline" @click="clearFilters">
            Effacer les filtres
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCertificatesStore } from "@/stores/certificates";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const certificatesStore = useCertificatesStore();

const searchQuery = ref("");
const selectedYear = ref("");

const certificates = ref([
  {
    id: 1,
    title: "Certificat de Formation",
    trainingTitle: "Pharmacovigilance et Sécurité des Médicaments",
    score: 92,
    issuedAt: new Date("2024-01-15"),
    certificateNumber: "CERT-2024-001",
    validUntil: new Date("2025-01-15"),
    downloadUrl: "/certificates/cert-001.pdf",
  },
  {
    id: 2,
    title: "Certificat de Formation",
    trainingTitle: "Interactions Médicamenteuses",
    score: 88,
    issuedAt: new Date("2024-01-10"),
    certificateNumber: "CERT-2024-002",
    validUntil: new Date("2025-01-10"),
    downloadUrl: "/certificates/cert-002.pdf",
  },
  {
    id: 3,
    title: "Certificat de Formation",
    trainingTitle: "Gestion Pharmaceutique",
    score: 95,
    issuedAt: new Date("2023-12-20"),
    certificateNumber: "CERT-2023-003",
    validUntil: new Date("2024-12-20"),
    downloadUrl: "/certificates/cert-003.pdf",
  },
]);

const filteredCertificates = computed(() => {
  let filtered = certificates.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (cert) =>
        cert.title.toLowerCase().includes(query) ||
        cert.trainingTitle.toLowerCase().includes(query) ||
        cert.certificateNumber.toLowerCase().includes(query)
    );
  }

  // Filter by year
  if (selectedYear.value) {
    filtered = filtered.filter(
      (cert) => cert.issuedAt.getFullYear().toString() === selectedYear.value
    );
  }

  return filtered;
});

const availableYears = computed(() => {
  const years = [
    ...new Set(certificates.value.map((cert) => cert.issuedAt.getFullYear())),
  ];
  return years.sort((a, b) => b - a);
});

const averageScore = computed(() => {
  if (certificates.value.length === 0) return 0;
  const total = certificates.value.reduce((sum, cert) => sum + cert.score, 0);
  return Math.round(total / certificates.value.length);
});

const lastCertificateDate = computed(() => {
  if (certificates.value.length === 0) return "-";
  const latest = certificates.value.reduce((latest, cert) =>
    cert.issuedAt > latest ? cert.issuedAt : latest
  );
  return formatDate(latest);
});

const getValidityVariant = (validUntil) => {
  const now = new Date();
  const validDate = new Date(validUntil);
  const daysUntilExpiry = Math.ceil((validDate - now) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0) return "danger";
  if (daysUntilExpiry < 30) return "warning";
  return "success";
};

const getValidityLabel = (validUntil) => {
  const now = new Date();
  const validDate = new Date(validUntil);
  const daysUntilExpiry = Math.ceil((validDate - now) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0) return "Expiré";
  if (daysUntilExpiry < 30) return "Expire bientôt";
  return "Valide";
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const downloadCertificate = (certificate) => {
  // Implement certificate download
  console.log("Download certificate:", certificate.certificateNumber);
  // In a real app, this would trigger a download
  window.open(certificate.downloadUrl, "_blank");
};

const shareCertificate = (certificate) => {
  // Implement certificate sharing
  console.log("Share certificate:", certificate.certificateNumber);
  // In a real app, this would open sharing options
  if (navigator.share) {
    navigator.share({
      title: certificate.title,
      text: `J'ai obtenu mon certificat pour "${certificate.trainingTitle}" avec un score de ${certificate.score}%`,
      url: window.location.href,
    });
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedYear.value = "";
};

onMounted(async () => {
  await certificatesStore.fetchCertificates();
});
</script>
