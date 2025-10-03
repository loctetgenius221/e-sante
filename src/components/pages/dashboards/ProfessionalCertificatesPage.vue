<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Mes Certificats"
  >
    <!-- Header with Search and Filters -->
    <div class="mb-8">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Mes Certificats
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Consultez et téléchargez vos certificats de formation
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un certificat..."
              class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
          </div>

          <!-- Filter -->
          <select
            v-model="selectedFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les certificats</option>
            <option value="recent">Récents</option>
            <option value="expiring">Expirant bientôt</option>
            <option value="expired">Expirés</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ certificates.length }}
            </p>
          </div>
        </div>
      </BaseCard>

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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Valides
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ validCertificates.length }}
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center"
          >
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Expirant
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ expiringCertificates.length }}
            </p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Expirés
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ expiredCertificates.length }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Certificates Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="certificate in filteredCertificates"
        :key="certificate.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
      >
        <!-- Certificate Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ certificate.courseTitle }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {{ certificate.instructor }}
              </p>

              <!-- Certificate Status -->
              <BaseBadge
                :variant="getStatusVariant(certificate.status)"
                size="sm"
              >
                {{ getStatusText(certificate.status) }}
              </BaseBadge>
            </div>

            <!-- Certificate Icon -->
            <div
              class="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-6 h-6 text-white"
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
          </div>
        </div>

        <!-- Certificate Details -->
        <div class="p-6">
          <div class="space-y-3 mb-6">
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
              <span class="font-medium">Obtenu le:</span>
              <span class="ml-2">{{ formatDate(certificate.issuedDate) }}</span>
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
              <span class="font-medium">Valide jusqu'au:</span>
              <span class="ml-2">{{ formatDate(certificate.expiryDate) }}</span>
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span class="font-medium">Durée:</span>
              <span class="ml-2">{{ certificate.duration }} heures</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <BaseButton
              variant="primary"
              size="sm"
              @click="downloadCertificate(certificate.id)"
              class="flex-1"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Télécharger
            </BaseButton>

            <BaseButton
              variant="outline"
              size="sm"
              @click="viewCertificate(certificate.id)"
            >
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
            </BaseButton>
          </div>
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
        Aucun certificat trouvé
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{
          searchQuery
            ? "Aucun certificat ne correspond à votre recherche."
            : "Vous n'avez pas encore de certificats."
        }}
      </p>
      <div v-if="!searchQuery" class="mt-6">
        <BaseButton
          variant="primary"
          @click="$router.push('/professional/courses')"
        >
          Voir mes formations
        </BaseButton>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const router = useRouter();

// Navigation items (same as ProfessionalDashboard)
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/professional/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Mes formations",
    href: "/professional/courses",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    name: "Certificats",
    href: "/professional/certificates",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Club Digital",
    href: "/club/dashboard",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    badge: { text: "Nouveau", variant: "info" },
    submenu: [
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
    ],
  },
  {
    name: "Profil",
    href: "/professional/profile",
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
]);

// State
const searchQuery = ref("");
const selectedFilter = ref("all");

// Mock data
const certificates = ref([
  {
    id: 1,
    courseTitle: "Pharmacovigilance Avancée",
    instructor: "Dr. Marie Dubois",
    issuedDate: "2024-01-20",
    expiryDate: "2025-01-20",
    duration: 8,
    status: "valid",
  },
  {
    id: 2,
    courseTitle: "Gestion des Urgences Médicales",
    instructor: "Dr. Pierre Martin",
    issuedDate: "2024-01-15",
    expiryDate: "2025-01-15",
    duration: 12,
    status: "valid",
  },
  {
    id: 3,
    courseTitle: "Dermatologie Clinique",
    instructor: "Dr. Sophie Laurent",
    issuedDate: "2023-12-01",
    expiryDate: "2024-12-01",
    duration: 6,
    status: "expiring",
  },
  {
    id: 4,
    courseTitle: "Nutrition et Diététique",
    instructor: "Dr. Jean Moreau",
    issuedDate: "2023-06-15",
    expiryDate: "2024-06-15",
    duration: 10,
    status: "expired",
  },
  {
    id: 5,
    courseTitle: "Pharmacologie Clinique",
    instructor: "Dr. Anne Petit",
    issuedDate: "2024-02-01",
    expiryDate: "2025-02-01",
    duration: 14,
    status: "valid",
  },
]);

// Computed
const validCertificates = computed(() =>
  certificates.value.filter((cert) => cert.status === "valid")
);
const expiringCertificates = computed(() =>
  certificates.value.filter((cert) => cert.status === "expiring")
);
const expiredCertificates = computed(() =>
  certificates.value.filter((cert) => cert.status === "expired")
);

const filteredCertificates = computed(() => {
  let filtered = certificates.value;

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(
      (certificate) =>
        certificate.courseTitle
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        certificate.instructor
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by status
  if (selectedFilter.value !== "all") {
    filtered = filtered.filter(
      (certificate) => certificate.status === selectedFilter.value
    );
  }

  return filtered;
});

// Methods
const getStatusVariant = (status) => {
  switch (status) {
    case "valid":
      return "success";
    case "expiring":
      return "warning";
    case "expired":
      return "danger";
    default:
      return "info";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "valid":
      return "Valide";
    case "expiring":
      return "Expire bientôt";
    case "expired":
      return "Expiré";
    default:
      return "Inconnu";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR");
};

const downloadCertificate = (certificateId) => {
  // Logic to download certificate
  console.log("Downloading certificate:", certificateId);
  // In a real app, this would trigger a download
  alert("Téléchargement du certificat...");
};

const viewCertificate = (certificateId) => {
  // Logic to view certificate
  console.log("Viewing certificate:", certificateId);
  router.push(`/courses/${certificateId}/certificate`);
};
</script>
