<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Mes Formations"
  >
    <!-- Header with Search and Filters -->
    <div class="mb-8">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Mes Formations
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Gérez vos formations et suivez votre progression
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher une formation..."
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
            <option value="all">Toutes les formations</option>
            <option value="enrolled">Inscrites</option>
            <option value="in-progress">En cours</option>
            <option value="completed">Terminées</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Inscrites
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ enrolledCourses.length }}
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              En Cours
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ inProgressCourses.length }}
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Terminées
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ completedCourses.length }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Courses List -->
    <div class="space-y-6">
      <div
        v-for="course in filteredCourses"
        :key="course.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div class="p-6">
          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <!-- Course Info -->
            <div class="flex-1">
              <div class="flex items-start gap-4">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                <div class="flex-1">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
                  >
                    {{ course.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 mb-3">
                    {{ course.description }}
                  </p>

                  <!-- Course Meta -->
                  <div
                    class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {{ course.duration }} heures
                    </div>
                    <div class="flex items-center">
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {{ course.instructor }}
                    </div>
                    <div class="flex items-center">
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
                      Inscrit le {{ formatDate(course.enrolledDate) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Progress and Actions -->
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <!-- Progress -->
              <div class="w-full sm:w-48">
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Progression</span
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400"
                    >{{ course.progress }}%</span
                  >
                </div>
                <div
                  class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                >
                  <div
                    :class="[
                      'h-2 rounded-full transition-all duration-300',
                      course.progress === 100 ? 'bg-green-500' : 'bg-blue-500',
                    ]"
                    :style="{ width: `${course.progress}%` }"
                  ></div>
                </div>
              </div>

              <!-- Status Badge -->
              <BaseBadge :variant="getStatusVariant(course.status)" size="lg">
                {{ getStatusText(course.status) }}
              </BaseBadge>

              <!-- Actions -->
              <div class="flex gap-2">
                <BaseButton
                  v-if="course.status === 'enrolled'"
                  variant="primary"
                  size="sm"
                  @click="startCourse(course.id)"
                >
                  Commencer
                </BaseButton>
                <BaseButton
                  v-else-if="course.status === 'in-progress'"
                  variant="primary"
                  size="sm"
                  @click="continueCourse(course.id)"
                >
                  Continuer
                </BaseButton>
                <BaseButton
                  v-else-if="course.status === 'completed'"
                  variant="success"
                  size="sm"
                  @click="viewCertificate(course.id)"
                >
                  Voir Certificat
                </BaseButton>

                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="viewCourseDetails(course.id)"
                >
                  Détails
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredCourses.length === 0" class="text-center py-12">
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
        Aucune formation trouvée
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{
          searchQuery
            ? "Aucune formation ne correspond à votre recherche."
            : "Vous n'êtes inscrit à aucune formation pour le moment."
        }}
      </p>
      <div v-if="!searchQuery" class="mt-6">
        <BaseButton variant="primary" @click="$router.push('/catalogue')">
          Parcourir le catalogue
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
const courses = ref([
  {
    id: 1,
    title: "Pharmacovigilance Avancée",
    description:
      "Formation complète sur la pharmacovigilance et la gestion des effets indésirables",
    duration: 8,
    instructor: "Dr. Marie Dubois",
    enrolledDate: "2024-01-15",
    progress: 75,
    status: "in-progress",
  },
  {
    id: 2,
    title: "Gestion des Urgences Médicales",
    description:
      "Apprenez à gérer efficacement les situations d'urgence en pharmacie",
    duration: 12,
    instructor: "Dr. Pierre Martin",
    enrolledDate: "2024-01-10",
    progress: 100,
    status: "completed",
  },
  {
    id: 3,
    title: "Dermatologie Clinique",
    description:
      "Formation spécialisée en dermatologie pour les professionnels de santé",
    duration: 6,
    instructor: "Dr. Sophie Laurent",
    enrolledDate: "2024-02-01",
    progress: 0,
    status: "enrolled",
  },
  {
    id: 4,
    title: "Nutrition et Diététique",
    description:
      "Concepts fondamentaux de la nutrition et conseils diététiques",
    duration: 10,
    instructor: "Dr. Jean Moreau",
    enrolledDate: "2024-01-20",
    progress: 45,
    status: "in-progress",
  },
]);

// Computed
const enrolledCourses = computed(() =>
  courses.value.filter((course) => course.status === "enrolled")
);
const inProgressCourses = computed(() =>
  courses.value.filter((course) => course.status === "in-progress")
);
const completedCourses = computed(() =>
  courses.value.filter((course) => course.status === "completed")
);

const filteredCourses = computed(() => {
  let filtered = courses.value;

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        course.instructor
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by status
  if (selectedFilter.value !== "all") {
    filtered = filtered.filter(
      (course) => course.status === selectedFilter.value
    );
  }

  return filtered;
});

// Methods
const getStatusVariant = (status) => {
  switch (status) {
    case "enrolled":
      return "info";
    case "in-progress":
      return "warning";
    case "completed":
      return "success";
    default:
      return "info";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "enrolled":
      return "Inscrite";
    case "in-progress":
      return "En cours";
    case "completed":
      return "Terminée";
    default:
      return "Inconnu";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR");
};

const startCourse = (courseId) => {
  // Logic to start course
  console.log("Starting course:", courseId);
  router.push(`/professional/courses/${courseId}`);
};

const continueCourse = (courseId) => {
  // Logic to continue course
  console.log("Continuing course:", courseId);
  router.push(`/professional/courses/${courseId}`);
};

const viewCertificate = (courseId) => {
  // Logic to view certificate
  console.log("Viewing certificate for course:", courseId);
  router.push(`/courses/${courseId}/certificate`);
};

const viewCourseDetails = (courseId) => {
  // Logic to view course details
  console.log("Viewing course details:", courseId);
  router.push(`/professional/courses/${courseId}`);
};
</script>
