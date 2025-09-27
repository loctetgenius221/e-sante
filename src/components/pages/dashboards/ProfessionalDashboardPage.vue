<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <ProfessionalHeader />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
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
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
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
                <BaseButton
                  variant="primary"
                  @click="$router.push('/catalogue')"
                >
                  Explorer le Catalogue
                </BaseButton>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="course in enrolledCourses"
                :key="course.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                @click="startCourse(course)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                      <h4
                        class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                      >
                        {{ course.title }}
                      </h4>
                      <BaseBadge
                        :variant="getCourseStatusVariant(course.status)"
                        size="sm"
                      >
                        {{ getCourseStatusLabel(course.status) }}
                      </BaseBadge>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {{ course.shortDescription }}
                    </p>
                    <div
                      class="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <span>{{ course.duration }}</span>
                      <span>{{ course.lessonsCount }} leçons</span>
                      <span
                        >Inscrit le {{ formatDate(course.enrolledAt) }}</span
                      >
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-right">
                      <div
                        class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1"
                      >
                        Progression
                      </div>
                      <div class="w-24">
                        <ProgressBar
                          :value="course.progress"
                          :max="100"
                          size="sm"
                        />
                      </div>
                      <div
                        class="text-xs text-gray-500 dark:text-gray-400 mt-1"
                      >
                        {{ course.progress }}%
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <BaseButton
                      v-if="course.status === 'not_started'"
                      variant="primary"
                      size="sm"
                      @click.stop="startCourse(course)"
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
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </template>
                      Commencer
                    </BaseButton>
                    <BaseButton
                      v-else-if="course.status === 'in_progress'"
                      variant="primary"
                      size="sm"
                      @click.stop="continueCourse(course)"
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
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </template>
                      Continuer
                    </BaseButton>
                    <BaseButton
                      v-else-if="course.status === 'completed'"
                      variant="outline"
                      size="sm"
                      @click.stop="reviewCourse(course)"
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
                      Réviser
                    </BaseButton>
                  </div>

                  <div
                    v-if="course.certificate"
                    class="flex items-center space-x-2"
                  >
                    <BaseButton
                      variant="outline"
                      size="sm"
                      @click.stop="viewCertificate(course.certificate)"
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
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      </template>
                      Certificat
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Certificats Obtenus -->
          <BaseCard v-if="certificates.length > 0">
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Mes Certificats
              </h3>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="certificate in certificates"
                :key="certificate.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                @click="viewCertificate(certificate)"
              >
                <div class="flex items-center space-x-3">
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
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ certificate.courseTitle }}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Obtenu le {{ formatDate(certificate.issuedAt) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Actions Rapides
              </h3>
            </template>

            <div class="space-y-3">
              <BaseButton
                variant="outline"
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
                Explorer le Catalogue
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/club')"
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </template>
                Club Digital
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/mon-compte')"
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
                Mon Profil
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Progression Globale -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Progression Globale
              </h3>
            </template>

            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Formations terminées</span
                  >
                  <span class="text-gray-900 dark:text-gray-100">{{
                    completedCourses.length
                  }}</span>
                </div>
                <ProgressBar
                  :value="
                    (completedCourses.length /
                      Math.max(enrolledCourses.length, 1)) *
                    100
                  "
                  :max="100"
                />
              </div>

              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Certificats obtenus</span
                  >
                  <span class="text-gray-900 dark:text-gray-100">{{
                    certificates.length
                  }}</span>
                </div>
                <ProgressBar
                  :value="
                    (certificates.length /
                      Math.max(completedCourses.length, 1)) *
                    100
                  "
                  :max="100"
                />
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useTrainingsStore } from "@/stores/trainings";
import { useCoursesStore } from "@/stores/courses";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import ProgressBar from "@/components/atoms/ProgressBar.vue";
import ProfessionalHeader from "@/components/organisms/ProfessionalHeader.vue";

const router = useRouter();
const authStore = useAuthStore();
const trainingsStore = useTrainingsStore();
const coursesStore = useCoursesStore();

// Use courses store data
const enrolledCourses = computed(() => coursesStore.enrolledCourses);
const completedCourses = computed(() => coursesStore.completedCourses);
const inProgressCourses = computed(() => coursesStore.inProgressCourses);
const certificates = computed(() => coursesStore.userCertificates);

const getRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    midwife: "Sage-femme",
  };
  return labels[role] || role;
};

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
  router.push({
    name: "course-detail",
    params: { id: course.id },
  });
};

const continueCourse = (course) => {
  router.push({
    name: "course-detail",
    params: { id: course.id },
  });
};

const reviewCourse = (course) => {
  router.push({
    name: "course-detail",
    params: { id: course.id },
  });
};

const viewCertificate = (certificate) => {
  router.push({
    name: "course-certificate",
    params: { courseId: certificate.courseId },
  });
};

onMounted(async () => {
  await Promise.all([
    trainingsStore.fetchTrainings(),
    coursesStore.fetchCourses(),
  ]);
});
</script>
