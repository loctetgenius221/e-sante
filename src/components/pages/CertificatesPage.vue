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
            Mes Certificats
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Consultez et téléchargez vos certificats de formation
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BaseCard>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ certificates.length }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Certificats obtenus
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ completedTrainings }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Formations terminées
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ averageScore }}%
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Score moyen
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-6">
        <div v-for="n in 3" :key="n" class="animate-pulse">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div
              class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"
            ></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="certificates.length === 0" class="text-center py-12">
        <div
          class="mx-auto h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8"
        >
          <svg
            class="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Aucun certificat obtenu
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Terminez une formation pour obtenir votre premier certificat
        </p>
        <BaseButton variant="primary" @click="$router.push('/catalogue')">
          Explorer les formations
        </BaseButton>
      </div>

      <!-- Certificates List -->
      <div v-else class="space-y-6">
        <div
          v-for="certificate in certificates"
          :key="certificate.id"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div
            class="flex flex-col md:flex-row md:items-center justify-between"
          >
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <div
                  class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4"
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {{ certificate.trainingTitle }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Certificat de formation
                  </p>
                </div>
              </div>

              <div class="ml-16 space-y-2">
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
                  Obtenu le {{ formatDate(certificate.issuedAt) }}
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Score: {{ certificate.score }}/100
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Durée: {{ certificate.duration }}
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-3 mt-4 md:mt-0">
              <BaseButton
                variant="outline"
                size="sm"
                @click="viewCertificate(certificate)"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </template>
                Voir
              </BaseButton>

              <BaseButton
                variant="primary"
                size="sm"
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
                Télécharger
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificate Modal -->
    <BaseModal
      v-if="selectedCertificate"
      :show="showCertificateModal"
      @close="showCertificateModal = false"
      size="lg"
    >
      <div class="p-6">
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Certificat de Formation
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ selectedCertificate.trainingTitle }}
          </p>
        </div>

        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 mb-6"
        >
          <div class="text-center">
            <div
              class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>

            <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Félicitations !
            </h4>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Vous avez terminé avec succès la formation
            </p>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Score obtenu
              </div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {{ selectedCertificate.score }}/100
              </div>
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-400">
              Certificat délivré le
              {{ formatDate(selectedCertificate.issuedAt) }}
            </div>
          </div>
        </div>

        <div class="flex justify-center space-x-4">
          <BaseButton variant="outline" @click="showCertificateModal = false">
            Fermer
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="downloadCertificate(selectedCertificate)"
          >
            Télécharger le certificat
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCertificatesStore } from "@/stores/certificates";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";

const certificatesStore = useCertificatesStore();

const isLoading = ref(true);
const showCertificateModal = ref(false);
const selectedCertificate = ref(null);

const certificates = computed(() => certificatesStore.certificates);
const completedTrainings = computed(() => certificatesStore.completedTrainings);
const averageScore = computed(() => certificatesStore.averageScore);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const viewCertificate = (certificate) => {
  selectedCertificate.value = certificate;
  showCertificateModal.value = true;
};

const downloadCertificate = async (certificate) => {
  try {
    await certificatesStore.downloadCertificate(certificate.id);
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
  }
};

onMounted(async () => {
  try {
    await certificatesStore.fetchCertificates();
  } finally {
    isLoading.value = false;
  }
});
</script>
