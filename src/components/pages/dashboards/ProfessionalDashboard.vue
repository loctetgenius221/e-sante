<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Tableau de Bord Professionnel"
  >
    <!-- Quick Stats -->
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Cours Inscrits
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
              Cours Terminés
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ completedCourses.length }}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Certificats
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
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-full">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8 min-w-0">
        <!-- Mes Cours Inscrits -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Mes Cours Inscrits
              </h3>
              <BaseButton
                variant="outline"
                size="sm"
                @click="$router.push('/catalogue')"
              >
                Voir le Catalogue
              </BaseButton>
            </div>
          </template>

          <div v-if="enrolledCourses.length === 0" class="text-center py-12">
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
            <h3
              class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Aucun cours inscrit
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Découvrez nos formations et inscrivez-vous à votre premier cours
            </p>
            <div class="mt-6">
              <BaseButton variant="primary" @click="$router.push('/catalogue')">
                Découvrir les formations
              </BaseButton>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="course in enrolledCourses.slice(0, 5)"
              :key="course.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex-1">
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ course.title }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ course.instructor }}
                </p>
                <div class="mt-2">
                  <ProgressBar :value="course.progress" :max="100" />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ course.progress }}% complété
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2 ml-4">
                <BaseBadge
                  :variant="getCourseStatusVariant(course.status)"
                  size="sm"
                >
                  {{ getCourseStatusLabel(course.status) }}
                </BaseBadge>
                <BaseButton
                  v-if="course.status === 'not_started'"
                  variant="primary"
                  size="sm"
                  @click="startCourse(course)"
                >
                  Commencer
                </BaseButton>
                <BaseButton
                  v-else-if="course.status === 'in_progress'"
                  variant="outline"
                  size="sm"
                  @click="continueCourse(course)"
                >
                  Continuer
                </BaseButton>
                <BaseButton
                  v-else
                  variant="outline"
                  size="sm"
                  @click="reviewCourse(course)"
                >
                  Revoir
                </BaseButton>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Certificats Récents -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Certificats Récents
              </h3>
              <BaseButton
                variant="outline"
                size="sm"
                @click="$router.push('/certificates')"
              >
                Voir tous
              </BaseButton>
            </div>
          </template>

          <div v-if="certificates.length === 0" class="text-center py-8">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3
              class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Aucun certificat
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Terminez vos formations pour obtenir vos certificats
            </p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="certificate in certificates.slice(0, 3)"
              :key="certificate.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center"
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ certificate.courseTitle }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Obtenu le {{ formatDate(certificate.issuedAt) }}
                  </p>
                </div>
              </div>
              <BaseButton
                variant="outline"
                size="sm"
                @click="downloadCertificate(certificate)"
              >
                Télécharger
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Club Digital -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Club Digital
              </h3>
              <BaseBadge variant="info" size="sm">Nouveau</BaseBadge>
            </div>
          </template>
          <div class="text-center py-6">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              Rejoignez la communauté
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Échangez avec d'autres professionnels de santé et accédez à des
              ressources exclusives
            </p>
            <BaseButton
              variant="primary"
              @click="$router.push('/club/dashboard')"
              full-width
            >
              Accéder au Club Digital
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Prochaines Formations -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Prochaines Formations
            </h3>
          </template>
          <div class="space-y-4">
            <div
              v-for="training in upcomingTrainings"
              :key="training.id"
              class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ training.title }}
              </h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ formatDate(training.date) }}
              </p>
              <BaseButton
                variant="outline"
                size="sm"
                class="mt-2"
                @click="$router.push(`/trainings/${training.id}`)"
              >
                S'inscrire
              </BaseButton>
            </div>
          </div>
        </BaseCard>

        <!-- Actions Rapides -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Actions Rapides
            </h3>
          </template>
          <div class="space-y-3">
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/catalogue')"
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </template>
              Explorer le catalogue
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/certificates')"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </template>
              Mes certificats
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/profile')"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </template>
              Mon profil
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCoursesStore } from "@/stores/courses";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import ProgressBar from "@/components/atoms/ProgressBar.vue";

// Composables
const router = useRouter();
const authStore = useAuthStore();
const coursesStore = useCoursesStore();

// Navigation items for sidebar
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

// Data
const enrolledCourses = computed(() => coursesStore.enrolledCourses);
const completedCourses = computed(() => coursesStore.completedCourses);
const inProgressCourses = computed(() => coursesStore.inProgressCourses);
const certificates = computed(() => coursesStore.userCertificates);

const upcomingTrainings = ref([
  {
    id: 1,
    title: "Pharmacovigilance 2024",
    date: new Date("2024-03-15"),
  },
  {
    id: 2,
    title: "Gestion des urgences",
    date: new Date("2024-03-20"),
  },
]);

// Methods
const getCourseStatusVariant = (status) => {
  const variants = {
    not_started: "default",
    in_progress: "info",
    completed: "success",
  };
  return variants[status] || "default";
};

const getCourseStatusLabel = (status) => {
  const labels = {
    not_started: "Non commencé",
    in_progress: "En cours",
    completed: "Terminé",
  };
  return labels[status] || status;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const startCourse = (course) => {
  router.push({ name: "course-detail", params: { id: course.id } });
};

const continueCourse = (course) => {
  router.push({ name: "course-detail", params: { id: course.id } });
};

const reviewCourse = (course) => {
  router.push({ name: "course-detail", params: { id: course.id } });
};

const downloadCertificate = (certificate) => {
  // Implement certificate download
  console.log("Download certificate:", certificate);
};

onMounted(async () => {
  await coursesStore.fetchUserCourses();
});
</script>
