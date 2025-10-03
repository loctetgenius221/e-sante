<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Gestion des Certificats"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <BaseButton variant="outline" @click="exportCertificates">
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
        Exporter
      </BaseButton>
    </template>

    <!-- Filters -->
    <div class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BaseInput
          v-model="searchQuery"
          placeholder="Rechercher un certificat..."
          type="search"
        >
          <template #icon-left>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </template>
        </BaseInput>

        <BaseSelect v-model="selectedStatus" placeholder="Tous les statuts">
          <option value="">Tous les statuts</option>
          <option value="issued">Délivré</option>
          <option value="pending">En attente</option>
          <option value="revoked">Révoqué</option>
        </BaseSelect>

        <BaseSelect
          v-model="selectedTraining"
          placeholder="Toutes les formations"
        >
          <option value="">Toutes les formations</option>
          <option value="pharmacovigilance">Pharmacovigilance 2024</option>
          <option value="urgences">Gestion des urgences cliniques</option>
          <option value="recherche">Recherche clinique avancée</option>
        </BaseSelect>

        <BaseButton variant="outline" @click="resetFilters">
          Réinitialiser
        </BaseButton>
      </div>
    </div>

    <!-- Certificates Table -->
    <BaseCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Certificat
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Utilisateur
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Formation
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Délivré le
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Expire le
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr
              v-for="certificate in filteredCertificates"
              :key="certificate.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div
                      class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
                    >
                      <svg
                        class="h-6 w-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ certificate.certificateNumber }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ certificate.score }}% de réussite
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="
                      certificate.userAvatar || '/images/default-avatar.jpg'
                    "
                    :alt="certificate.userName"
                    class="h-8 w-8 rounded-full"
                  />
                  <div class="ml-3">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ certificate.userName }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ certificate.userRole }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-gray-100">
                  {{ certificate.trainingName }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ certificate.trainingCategory }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BaseBadge :variant="getStatusVariant(certificate.status)">
                  {{ getStatusLabel(certificate.status) }}
                </BaseBadge>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(certificate.issuedAt) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(certificate.expiresAt) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end space-x-2">
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="viewCertificate(certificate)"
                  >
                    Voir
                  </BaseButton>
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="downloadCertificate(certificate)"
                  >
                    Télécharger
                  </BaseButton>
                  <BaseButton
                    v-if="certificate.status === 'issued'"
                    variant="danger"
                    size="sm"
                    @click="revokeCertificate(certificate)"
                  >
                    Révoquer
                  </BaseButton>
                  <BaseButton
                    v-else-if="certificate.status === 'revoked'"
                    variant="success"
                    size="sm"
                    @click="restoreCertificate(certificate)"
                  >
                    Restaurer
                  </BaseButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Affichage de {{ (currentPage - 1) * itemsPerPage + 1 }} à
            {{
              Math.min(currentPage * itemsPerPage, filteredCertificates.length)
            }}
            sur {{ filteredCertificates.length }} certificats
          </div>
          <div class="flex items-center space-x-2">
            <BaseButton
              variant="outline"
              size="sm"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              Précédent
            </BaseButton>
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Page {{ currentPage }} sur {{ totalPages }}
            </span>
            <BaseButton
              variant="outline"
              size="sm"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Suivant
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseCard>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseSelect from "@/components/atoms/BaseSelect.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

// Composables
const router = useRouter();

// Navigation items for sidebar
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/admin/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Utilisateurs",
    href: "/admin/users",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    name: "Formations",
    href: "/admin/trainings",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    name: "Certificats",
    href: "/admin/certificates",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Laboratoires",
    href: "/admin/laboratories",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    iconPath:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
]);

// Data
const certificates = ref([
  {
    id: 1,
    certificateNumber: "CERT-2024-001",
    userName: "Dr. Fatou Sarr",
    userRole: "Pharmacien",
    userAvatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
    trainingName: "Pharmacovigilance 2024",
    trainingCategory: "Pharmacologie",
    status: "issued",
    score: 95,
    issuedAt: new Date("2024-02-28"),
    expiresAt: new Date("2025-02-28"),
  },
  {
    id: 2,
    certificateNumber: "CERT-2024-002",
    userName: "Dr. Ibrahima Ba",
    userRole: "Médecin",
    userAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    trainingName: "Gestion des urgences cliniques",
    trainingCategory: "Clinique",
    status: "pending",
    score: 88,
    issuedAt: new Date("2024-02-27"),
    expiresAt: new Date("2025-02-27"),
  },
  {
    id: 3,
    certificateNumber: "CERT-2024-003",
    userName: "Marie Diallo",
    userRole: "Étudiant",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    trainingName: "Recherche clinique avancée",
    trainingCategory: "Recherche",
    status: "issued",
    score: 92,
    issuedAt: new Date("2024-02-26"),
    expiresAt: new Date("2025-02-26"),
  },
  {
    id: 4,
    certificateNumber: "CERT-2024-004",
    userName: "Laboratoire Alpha",
    userRole: "Laboratoire",
    userAvatar:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=40&h=40&fit=crop&crop=face",
    trainingName: "Pharmacovigilance 2024",
    trainingCategory: "Pharmacologie",
    status: "revoked",
    score: 78,
    issuedAt: new Date("2024-02-25"),
    expiresAt: new Date("2025-02-25"),
  },
]);

// Filters
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedTraining = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Computed
const filteredCertificates = computed(() => {
  let filtered = certificates.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (certificate) =>
        certificate.certificateNumber.toLowerCase().includes(query) ||
        certificate.userName.toLowerCase().includes(query) ||
        certificate.trainingName.toLowerCase().includes(query)
    );
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(
      (certificate) => certificate.status === selectedStatus.value
    );
  }

  if (selectedTraining.value) {
    filtered = filtered.filter((certificate) =>
      certificate.trainingName
        .toLowerCase()
        .includes(selectedTraining.value.toLowerCase())
    );
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredCertificates.value.length / itemsPerPage.value);
});

// Methods
const getStatusLabel = (status) => {
  const labels = {
    issued: "Délivré",
    pending: "En attente",
    revoked: "Révoqué",
  };
  return labels[status] || status;
};

const getStatusVariant = (status) => {
  const variants = {
    issued: "success",
    pending: "warning",
    revoked: "danger",
  };
  return variants[status] || "default";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = "";
  selectedTraining.value = "";
  currentPage.value = 1;
};

const viewCertificate = (certificate) => {
  router.push(`/admin/certificates/${certificate.id}`);
};

const downloadCertificate = (certificate) => {
  console.log("Download certificate:", certificate);
  // Implement download logic
};

const revokeCertificate = (certificate) => {
  certificate.status = "revoked";
  console.log("Certificate revoked:", certificate);
};

const restoreCertificate = (certificate) => {
  certificate.status = "issued";
  console.log("Certificate restored:", certificate);
};

const exportCertificates = () => {
  console.log("Export certificates");
  // Implement export logic
};

onMounted(() => {
  // Load certificates data
});
</script>
