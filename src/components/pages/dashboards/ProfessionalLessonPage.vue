<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    :page-title="lesson?.title || 'Leçon'"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="animate-pulse">
      <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>

    <!-- Lesson Content -->
    <div v-else-if="lesson" class="space-y-6">
      <!-- Lesson Header -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <BaseButton variant="outline" size="sm" @click="goBack">
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour
            </BaseButton>
            <BaseBadge variant="info" size="sm">
              Leçon {{ lesson.order }} sur {{ course?.lessonsCount }}
            </BaseBadge>
          </div>
          <div class="flex items-center gap-2">
            <BaseButton variant="outline" size="sm" @click="toggleFullscreen">
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </BaseButton>
          </div>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {{ lesson.title }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ lesson.description }}
        </p>
      </div>

      <!-- Video Player -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div class="aspect-video bg-gray-900 flex items-center justify-center">
          <div v-if="lesson.videoUrl" class="w-full h-full">
            <video
              ref="videoPlayer"
              class="w-full h-full object-cover"
              controls
              preload="metadata"
              @timeupdate="onTimeUpdate"
              @ended="onVideoEnded"
            >
              <source :src="lesson.videoUrl" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
          <div v-else class="text-center text-white">
            <svg
              class="w-16 h-16 mx-auto mb-4"
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
            <p class="text-lg">Contenu vidéo non disponible</p>
            <p class="text-sm text-gray-300">
              Cette leçon ne contient pas de vidéo
            </p>
          </div>
        </div>
      </div>

      <!-- Lesson Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Lesson Text Content -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Contenu de la leçon
            </h2>
            <div
              class="prose dark:prose-invert max-w-none"
              v-html="lesson.content"
            ></div>
          </div>

          <!-- Lesson Resources -->
          <div
            v-if="lesson.resources && lesson.resources.length > 0"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Ressources de la leçon
            </h3>
            <div class="space-y-3">
              <div
                v-for="resource in lesson.resources"
                :key="resource.id"
                class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-4 h-4 text-blue-600 dark:text-blue-400"
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
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ resource.title }}
                    </h4>
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
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Progress -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Progression
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Cette leçon</span
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400"
                    >{{ lessonProgress }}%</span
                  >
                </div>
                <div
                  class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                >
                  <div
                    class="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    :style="{ width: `${lessonProgress}%` }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Formation complète</span
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400"
                    >{{ course?.progress }}%</span
                  >
                </div>
                <div
                  class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                >
                  <div
                    class="h-2 bg-green-500 rounded-full transition-all duration-300"
                    :style="{ width: `${course?.progress}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lesson Navigation -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Navigation
            </h3>
            <div class="space-y-2">
              <div
                v-for="(lessonItem, index) in course?.lessons"
                :key="lessonItem.id"
                class="flex items-center justify-between p-3 rounded-lg transition-colors duration-200"
                :class="[
                  lessonItem.id === lesson.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                  lessonItem.locked
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer',
                ]"
                @click="
                  !lessonItem.locked &&
                    lessonItem.id !== lesson.id &&
                    navigateToLesson(lessonItem.id)
                "
              >
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                    :class="[
                      lessonItem.completed
                        ? 'bg-green-100 dark:bg-green-900'
                        : lessonItem.id === lesson.id
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'bg-gray-100 dark:bg-gray-700',
                    ]"
                  >
                    <svg
                      v-if="lessonItem.completed"
                      class="w-4 h-4 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      v-else
                      class="text-sm font-medium text-gray-600 dark:text-gray-400"
                      >{{ index + 1 }}</span
                    >
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ lessonItem.title }}
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ lessonItem.duration }} min
                    </p>
                  </div>
                </div>
                <BaseBadge
                  :variant="
                    lessonItem.completed
                      ? 'success'
                      : lessonItem.locked
                      ? 'secondary'
                      : 'info'
                  "
                  size="sm"
                >
                  {{
                    lessonItem.completed
                      ? "Terminée"
                      : lessonItem.locked
                      ? "Verrouillée"
                      : "Disponible"
                  }}
                </BaseBadge>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Actions
            </h3>
            <div class="space-y-3">
              <BaseButton
                v-if="!lesson.completed"
                variant="primary"
                size="lg"
                @click="markAsCompleted"
                class="w-full"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Marquer comme terminée
              </BaseButton>

              <BaseButton
                v-if="lesson.completed"
                variant="outline"
                size="lg"
                @click="markAsIncomplete"
                class="w-full"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Marquer comme non terminée
              </BaseButton>

              <BaseButton
                v-if="isLastLesson"
                variant="success"
                size="lg"
                @click="completeCourse"
                class="w-full"
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
                Terminer la formation
              </BaseButton>

              <BaseButton
                variant="outline"
                size="lg"
                @click="goToNextLesson"
                :disabled="!nextLesson"
                class="w-full"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Leçon suivante
              </BaseButton>
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
        Leçon non trouvée
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Cette leçon n'existe pas ou vous n'y avez pas accès.
      </p>
      <div class="mt-6">
        <BaseButton variant="primary" @click="goBack">
          Retour à la formation
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
const lesson = ref(null);
const course = ref(null);
const lessonProgress = ref(0);
const videoPlayer = ref(null);

// Computed
const nextLesson = computed(() => {
  if (!course.value?.lessons) return null;
  const currentIndex = course.value.lessons.findIndex(
    (l) => l.id === lesson.value?.id
  );
  return course.value.lessons[currentIndex + 1];
});

const isLastLesson = computed(() => {
  if (!course.value?.lessons) return false;
  const currentIndex = course.value.lessons.findIndex(
    (l) => l.id === lesson.value?.id
  );
  return currentIndex === course.value.lessons.length - 1;
});

// Mock data
const mockCourse = {
  id: 1,
  title: "Pharmacovigilance Avancée",
  progress: 75,
  lessonsCount: 12,
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
};

const mockLesson = {
  id: 3,
  order: 3,
  title: "Procédures de signalement",
  description:
    "Apprenez les procédures de signalement des effets indésirables des médicaments",
  duration: 50,
  completed: false,
  videoUrl: null, // "https://example.com/video.mp4",
  content: `
    <h3>Introduction</h3>
    <p>Le signalement des effets indésirables est une étape cruciale dans la pharmacovigilance. Cette leçon vous apprendra les procédures standardisées pour signaler efficacement les effets indésirables des médicaments.</p>
    
    <h3>Objectifs d'apprentissage</h3>
    <ul>
      <li>Comprendre l'importance du signalement</li>
      <li>Identifier les différents types d'effets indésirables</li>
      <li>Maîtriser les procédures de signalement</li>
      <li>Utiliser les outils de signalement appropriés</li>
    </ul>
    
    <h3>Types d'effets indésirables</h3>
    <p>Les effets indésirables peuvent être classés selon plusieurs critères :</p>
    <ul>
      <li><strong>Gravité :</strong> Légers, modérés, graves</li>
      <li><strong>Fréquence :</strong> Très fréquents, fréquents, peu fréquents, rares</li>
      <li><strong>Relation de causalité :</strong> Certaine, probable, possible, improbable</li>
    </ul>
    
    <h3>Procédures de signalement</h3>
    <p>Le signalement doit être effectué dans les 15 jours suivant la découverte de l'effet indésirable. Les étapes sont :</p>
    <ol>
      <li>Identification de l'effet indésirable</li>
      <li>Collecte des informations pertinentes</li>
      <li>Remplissage du formulaire de signalement</li>
      <li>Transmission aux autorités compétentes</li>
    </ol>
  `,
  resources: [
    {
      id: 1,
      title: "Formulaire de signalement standard",
      type: "PDF",
    },
    {
      id: 2,
      title: "Guide des procédures",
      type: "Document",
    },
  ],
};

// Methods
const onTimeUpdate = () => {
  if (videoPlayer.value) {
    const progress =
      (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100;
    lessonProgress.value = Math.round(progress);
  }
};

const onVideoEnded = () => {
  lessonProgress.value = 100;
  // Auto-mark as completed if video is watched completely
  if (!lesson.value.completed) {
    markAsCompleted();
  }
};

const markAsCompleted = () => {
  lesson.value.completed = true;
  lessonProgress.value = 100;
  console.log("Lesson marked as completed:", lesson.value.id);
  // In a real app, this would update the backend
};

const markAsIncomplete = () => {
  lesson.value.completed = false;
  lessonProgress.value = 0;
  console.log("Lesson marked as incomplete:", lesson.value.id);
  // In a real app, this would update the backend
};

const completeCourse = () => {
  console.log("Course completed:", course.value.id);
  // In a real app, this would trigger certificate generation
  router.push(`/professional/certificates/${course.value.id}`);
};

const navigateToLesson = (lessonId) => {
  router.push(`/professional/courses/${course.value.id}/lesson/${lessonId}`);
};

const goToNextLesson = () => {
  if (nextLesson.value) {
    navigateToLesson(nextLesson.value.id);
  }
};

const downloadResource = (resource) => {
  console.log("Downloading resource:", resource.id);
  // In a real app, this would trigger a download
  alert(`Téléchargement de ${resource.title}...`);
};

const toggleFullscreen = () => {
  if (videoPlayer.value) {
    if (videoPlayer.value.requestFullscreen) {
      videoPlayer.value.requestFullscreen();
    }
  }
};

const goBack = () => {
  router.push(`/professional/courses/${course.value.id}`);
};

// Lifecycle
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    course.value = mockCourse;
    lesson.value = mockLesson;
  } catch (error) {
    console.error("Error loading lesson:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
