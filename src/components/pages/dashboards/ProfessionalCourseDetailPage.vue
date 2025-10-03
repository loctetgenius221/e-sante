<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    :page-title="course?.title || 'Formation'"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="animate-pulse">
      <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>

    <!-- Course Content -->
    <div v-else-if="course" class="space-y-8">
      <!-- Course Header -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
        >
          <!-- Course Info -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <BaseBadge :variant="getStatusVariant(course.status)" size="lg">
                {{ getStatusText(course.status) }}
              </BaseBadge>
              <BaseBadge variant="info" size="lg">
                {{ course.duration }} heures
              </BaseBadge>
            </div>

            <h1
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              {{ course.title }}
            </h1>

            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {{ course.description }}
            </p>

            <!-- Course Meta -->
            <div
              class="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              <div class="flex items-center">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {{ course.instructor }}
              </div>
              <div class="flex items-center">
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
                Inscrit le {{ formatDate(course.enrolledDate) }}
              </div>
              <div class="flex items-center">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ course.lessonsCount }} leçons
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Progression</span
                >
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >{{ course.progress }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  :class="[
                    'h-3 rounded-full transition-all duration-300',
                    course.progress === 100 ? 'bg-green-500' : 'bg-blue-500',
                  ]"
                  :style="{ width: `${course.progress}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Course Actions -->
          <div class="flex flex-col gap-3">
            <BaseButton
              v-if="course.status === 'enrolled'"
              variant="primary"
              size="lg"
              @click="startCourse"
              class="w-full lg:w-auto"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Commencer la formation
            </BaseButton>

            <BaseButton
              v-else-if="course.status === 'in-progress'"
              variant="primary"
              size="lg"
              @click="continueCourse"
              class="w-full lg:w-auto"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Continuer la formation
            </BaseButton>

            <BaseButton
              v-else-if="course.status === 'completed'"
              variant="success"
              size="lg"
              @click="viewCertificate"
              class="w-full lg:w-auto"
            >
              <svg
                class="w-5 h-5 mr-2"
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
              Voir le certificat
            </BaseButton>

            <BaseButton
              variant="outline"
              size="lg"
              @click="goBack"
              class="w-full lg:w-auto"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour aux formations
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Course Content Tabs -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="flex space-x-8 px-6" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
              ]"
            >
              <component :is="tab.icon" class="w-5 h-5 mr-2 inline" />
              {{ tab.name }}
              <BaseBadge
                v-if="tab.badge"
                :variant="tab.badge.variant"
                size="sm"
                class="ml-2"
              >
                {{ tab.badge.text }}
              </BaseBadge>
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Lessons Tab -->
          <div v-if="activeTab === 'lessons'" class="space-y-4">
            <div
              v-for="lesson in course.lessons"
              :key="lesson.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4"
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">
                    {{ lesson.title }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ lesson.duration }} min
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <BaseBadge
                  :variant="
                    lesson.completed
                      ? 'success'
                      : lesson.locked
                      ? 'secondary'
                      : 'info'
                  "
                  size="sm"
                >
                  {{
                    lesson.completed
                      ? "Terminée"
                      : lesson.locked
                      ? "Verrouillée"
                      : "Disponible"
                  }}
                </BaseBadge>
                <BaseButton
                  v-if="!lesson.locked"
                  :variant="lesson.completed ? 'outline' : 'primary'"
                  size="sm"
                  @click="startLesson(lesson)"
                >
                  {{ lesson.completed ? "Revoir" : "Commencer" }}
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Resources Tab -->
          <div v-if="activeTab === 'resources'" class="space-y-4">
            <div
              v-for="resource in course.resources"
              :key="resource.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-5 h-5 text-green-600 dark:text-green-400"
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
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">
                    {{ resource.title }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ resource.type }}
                  </p>
                </div>
              </div>
              <BaseButton
                variant="outline"
                size="sm"
                @click="downloadResource(resource)"
              >
                Télécharger
              </BaseButton>
            </div>
          </div>

          <!-- Quiz Tab -->
          <div v-if="activeTab === 'quiz'" class="space-y-6">
            <div class="text-center py-8">
              <svg
                class="w-16 h-16 text-blue-500 mx-auto mb-4"
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
              <h3
                class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Quiz de la formation
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Testez vos connaissances avec le quiz de cette formation
              </p>
              <BaseButton
                v-if="course.quizAvailable"
                variant="primary"
                size="lg"
                @click="startQuiz"
              >
                Commencer le quiz
              </BaseButton>
              <p v-else class="text-gray-500 dark:text-gray-400">
                Le quiz sera disponible après avoir terminé toutes les leçons
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
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
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
        Formation non trouvée
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Cette formation n'existe pas ou vous n'y avez pas accès.
      </p>
      <div class="mt-6">
        <BaseButton variant="primary" @click="goBack">
          Retour aux formations
        </BaseButton>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const route = useRoute();
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
const isLoading = ref(true);
const course = ref(null);
const activeTab = ref("lessons");

// Tabs configuration
const tabs = ref([
  {
    id: "lessons",
    name: "Leçons",
    icon: "svg",
    iconPath:
      "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "resources",
    name: "Ressources",
    icon: "svg",
    iconPath:
      "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "quiz",
    name: "Quiz",
    icon: "svg",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    badge: { text: "Disponible", variant: "success" },
  },
]);

// Mock data
const mockCourse = {
  id: 1,
  title: "Pharmacovigilance Avancée",
  description:
    "Formation complète sur la pharmacovigilance et la gestion des effets indésirables des médicaments",
  duration: 8,
  instructor: "Dr. Marie Dubois",
  enrolledDate: "2024-01-15",
  progress: 75,
  status: "in-progress",
  lessonsCount: 12,
  quizAvailable: true,
  lessons: [
    {
      id: 1,
      title: "Introduction à la pharmacovigilance",
      duration: 45,
      completed: true,
      locked: false,
    },
    {
      id: 2,
      title: "Identification des effets indésirables",
      duration: 60,
      completed: true,
      locked: false,
    },
    {
      id: 3,
      title: "Procédures de signalement",
      duration: 50,
      completed: false,
      locked: false,
    },
    {
      id: 4,
      title: "Analyse des données de pharmacovigilance",
      duration: 70,
      completed: false,
      locked: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide de pharmacovigilance 2024",
      type: "PDF",
    },
    {
      id: 2,
      title: "Modèles de signalement",
      type: "Document",
    },
    {
      id: 3,
      title: "Vidéo de démonstration",
      type: "Vidéo",
    },
  ],
};

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

const startCourse = () => {
  console.log("Starting course:", course.value.id);
  router.push(`/professional/courses/${course.value.id}/lesson/1`);
};

const continueCourse = () => {
  console.log("Continuing course:", course.value.id);
  // Find first incomplete lesson
  const nextLesson = course.value.lessons.find(
    (lesson) => !lesson.completed && !lesson.locked
  );
  if (nextLesson) {
    router.push(
      `/professional/courses/${course.value.id}/lesson/${nextLesson.id}`
    );
  }
};

const viewCertificate = () => {
  console.log("Viewing certificate for course:", course.value.id);
  router.push(`/professional/certificates/${course.value.id}`);
};

const startLesson = (lesson) => {
  console.log("Starting lesson:", lesson.id);
  router.push(`/professional/courses/${course.value.id}/lesson/${lesson.id}`);
};

const startQuiz = () => {
  console.log("Starting quiz for course:", course.value.id);
  router.push(`/professional/courses/${course.value.id}/quiz`);
};

const downloadResource = (resource) => {
  console.log("Downloading resource:", resource.id);
  // In a real app, this would trigger a download
  alert(`Téléchargement de ${resource.title}...`);
};

const goBack = () => {
  router.push("/professional/courses");
};

// Lifecycle
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    course.value = mockCourse;
  } catch (error) {
    console.error("Error loading course:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
