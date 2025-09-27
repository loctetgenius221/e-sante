<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <nav
              class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              <RouterLink
                to="/professional-dashboard"
                class="hover:text-gray-700 dark:hover:text-gray-300"
              >
                Mon Espace
              </RouterLink>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span class="text-gray-700 dark:text-gray-300">{{
                course?.title
              }}</span>
            </nav>

            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h1
                  class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                >
                  {{ course?.title }}
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {{ course?.description }}
                </p>

                <div
                  class="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-2">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{{ course?.duration }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
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
                    <span>{{ course?.lessonsCount }} leçons</span>
                  </div>
                  <div class="flex items-center space-x-2">
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
                    <span>Certificat inclus</span>
                  </div>
                </div>
              </div>

              <div class="ml-8">
                <div class="text-right">
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
                  >
                    Progression
                  </div>
                  <div class="w-32">
                    <ProgressBar :value="courseProgress" :max="100" size="lg" />
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ courseProgress }}% terminé
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Current Lesson -->
          <BaseCard v-if="currentLesson">
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Leçon {{ currentLessonIndex + 1 }} : {{ currentLesson.title }}
                </h3>
                <BaseBadge
                  :variant="getLessonStatusVariant(currentLesson.status)"
                  size="sm"
                >
                  {{ getLessonStatusLabel(currentLesson.status) }}
                </BaseBadge>
              </div>
            </template>

            <div class="space-y-6">
              <!-- Video/Content -->
              <div
                class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center"
              >
                <div class="text-center text-white">
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
                  <p class="text-lg font-medium">Contenu Vidéo</p>
                  <p class="text-sm text-gray-300">
                    {{ currentLesson.duration }}
                  </p>
                </div>
              </div>

              <!-- Lesson Content -->
              <div class="prose dark:prose-invert max-w-none">
                <h4>Objectifs de la leçon</h4>
                <ul>
                  <li
                    v-for="objective in currentLesson.objectives"
                    :key="objective"
                  >
                    {{ objective }}
                  </li>
                </ul>

                <h4>Contenu</h4>
                <p>{{ currentLesson.content }}</p>
              </div>

              <!-- Lesson Actions -->
              <div
                class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <BaseButton
                  v-if="currentLessonIndex > 0"
                  variant="outline"
                  @click="goToPreviousLesson"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </template>
                  Leçon Précédente
                </BaseButton>
                <div v-else></div>

                <div class="flex space-x-3">
                  <BaseButton
                    v-if="currentLesson.status === 'not_started'"
                    variant="primary"
                    @click="startLesson"
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
                    Commencer la Leçon
                  </BaseButton>

                  <BaseButton
                    v-else-if="currentLesson.status === 'in_progress'"
                    variant="primary"
                    @click="completeLesson"
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </template>
                    Marquer comme Terminé
                  </BaseButton>

                  <BaseButton
                    v-else-if="
                      currentLesson.status === 'completed' && hasNextLesson
                    "
                    variant="primary"
                    @click="goToNextLesson"
                  >
                    <template #icon-right>
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </template>
                    Leçon Suivante
                  </BaseButton>

                  <BaseButton
                    v-else-if="
                      currentLesson.status === 'completed' && !hasNextLesson
                    "
                    variant="success"
                    @click="startQuiz"
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
                    Passer le Quiz
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Course Introduction -->
          <BaseCard v-else>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Introduction au Cours
              </h3>
            </template>

            <div class="space-y-6">
              <div class="prose dark:prose-invert max-w-none">
                <h4>À propos de ce cours</h4>
                <p>{{ course?.fullDescription }}</p>

                <h4>Ce que vous allez apprendre</h4>
                <ul>
                  <li
                    v-for="learning in course?.learningObjectives"
                    :key="learning"
                  >
                    {{ learning }}
                  </li>
                </ul>

                <h4>Prérequis</h4>
                <ul>
                  <li
                    v-for="prerequisite in course?.prerequisites"
                    :key="prerequisite"
                  >
                    {{ prerequisite }}
                  </li>
                </ul>
              </div>

              <div class="flex justify-center pt-6">
                <BaseButton variant="primary" size="lg" @click="startCourse">
                  <template #icon-left>
                    <svg
                      class="w-5 h-5"
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
                  Commencer le Cours
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Course Progress -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Progression du Cours
              </h3>
            </template>

            <div class="space-y-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400"
                  >Leçons terminées</span
                >
                <span class="text-gray-900 dark:text-gray-100">
                  {{ completedLessonsCount }} / {{ course?.lessonsCount }}
                </span>
              </div>
              <ProgressBar
                :value="(completedLessonsCount / course?.lessonsCount) * 100"
                :max="100"
              />

              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Quiz</span>
                <BaseBadge
                  :variant="
                    quizStatus === 'completed'
                      ? 'success'
                      : quizStatus === 'available'
                      ? 'info'
                      : 'default'
                  "
                  size="sm"
                >
                  {{ getQuizStatusLabel(quizStatus) }}
                </BaseBadge>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Certificat</span>
                <BaseBadge
                  :variant="
                    certificateStatus === 'available' ? 'success' : 'default'
                  "
                  size="sm"
                >
                  {{ getCertificateStatusLabel(certificateStatus) }}
                </BaseBadge>
              </div>
            </div>
          </BaseCard>

          <!-- Lessons List -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Leçons
              </h3>
            </template>

            <div class="space-y-2">
              <div
                v-for="(lesson, index) in course?.lessons"
                :key="lesson.id"
                class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors"
                :class="{
                  'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800':
                    currentLessonIndex === index,
                  'hover:bg-gray-50 dark:hover:bg-gray-800':
                    currentLessonIndex !== index,
                }"
                @click="goToLesson(index)"
              >
                <div class="flex-shrink-0">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                    :class="{
                      'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400':
                        lesson.status === 'completed',
                      'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400':
                        lesson.status === 'in_progress',
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400':
                        lesson.status === 'not_started',
                    }"
                  >
                    <svg
                      v-if="lesson.status === 'completed'"
                      class="w-4 h-4"
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
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
                  >
                    {{ lesson.title }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ lesson.duration }}
                  </p>
                </div>

                <div class="flex-shrink-0">
                  <BaseBadge
                    :variant="getLessonStatusVariant(lesson.status)"
                    size="xs"
                  >
                    {{ getLessonStatusLabel(lesson.status) }}
                  </BaseBadge>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Quiz Section -->
          <BaseCard v-if="quizStatus !== 'locked'">
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Quiz Final
              </h3>
            </template>

            <div class="space-y-4">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                <p class="mb-2">Testez vos connaissances avec le quiz final.</p>
                <ul class="space-y-1">
                  <li>• {{ course?.quiz?.questionsCount }} questions</li>
                  <li>• {{ course?.quiz?.timeLimit }} minutes</li>
                  <li>• Score minimum : {{ course?.quiz?.passingScore }}%</li>
                </ul>
              </div>

              <BaseButton
                :variant="quizStatus === 'available' ? 'primary' : 'outline'"
                :disabled="quizStatus === 'locked'"
                full-width
                @click="startQuiz"
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
                {{ getQuizButtonLabel(quizStatus) }}
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCoursesStore } from "@/stores/courses";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import ProgressBar from "@/components/atoms/ProgressBar.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const coursesStore = useCoursesStore();

const currentLessonIndex = ref(0);
const isLoading = ref(true);

const course = computed(() => {
  const courseId = parseInt(route.params.id);
  return coursesStore.getCourseById(courseId);
});

const userProgress = computed(() => {
  const courseId = parseInt(route.params.id);
  return coursesStore.getUserProgress(courseId);
});

const currentLesson = computed(() => {
  if (currentLessonIndex.value === -1) return null;
  return course.value?.lessons[currentLessonIndex.value];
});

const completedLessonsCount = computed(() => {
  return userProgress.value?.completedLessons.length || 0;
});

const courseProgress = computed(() => {
  return userProgress.value?.progress || 0;
});

const hasNextLesson = computed(() => {
  return currentLessonIndex.value < course.value?.lessons.length - 1;
});

const quizStatus = computed(() => {
  if (!userProgress.value) return "locked";
  if (completedLessonsCount.value < course.value?.lessonsCount) {
    return "locked";
  }
  if (userProgress.value.quizCompleted) {
    return "completed";
  }
  return "available";
});

const certificateStatus = computed(() => {
  if (userProgress.value?.certificateEarned) {
    return "available";
  }
  return "locked";
});

const getLessonStatusVariant = (status) => {
  const variants = {
    not_started: "default",
    in_progress: "info",
    completed: "success",
  };
  return variants[status] || "default";
};

const getLessonStatusLabel = (status) => {
  const labels = {
    not_started: "Non commencé",
    in_progress: "En cours",
    completed: "Terminé",
  };
  return labels[status] || status;
};

const getQuizStatusLabel = (status) => {
  const labels = {
    locked: "Verrouillé",
    available: "Disponible",
    completed: "Terminé",
  };
  return labels[status] || status;
};

const getCertificateStatusLabel = (status) => {
  const labels = {
    locked: "Verrouillé",
    available: "Disponible",
  };
  return labels[status] || status;
};

const getQuizButtonLabel = (status) => {
  const labels = {
    locked: "Quiz Verrouillé",
    available: "Commencer le Quiz",
    completed: "Refaire le Quiz",
  };
  return labels[status] || "Quiz";
};

const startCourse = () => {
  currentLessonIndex.value = 0;
};

const startLesson = async () => {
  if (currentLesson.value) {
    const courseId = parseInt(route.params.id);
    await coursesStore.updateLessonProgress(
      courseId,
      currentLesson.value.id,
      "in_progress"
    );
  }
};

const completeLesson = async () => {
  if (currentLesson.value) {
    const courseId = parseInt(route.params.id);
    await coursesStore.updateLessonProgress(
      courseId,
      currentLesson.value.id,
      "completed"
    );

    // Auto-advance to next lesson if available
    if (hasNextLesson.value) {
      setTimeout(() => {
        goToNextLesson();
      }, 1000);
    }
  }
};

const goToNextLesson = () => {
  if (hasNextLesson.value) {
    currentLessonIndex.value++;
  }
};

const goToPreviousLesson = () => {
  if (currentLessonIndex.value > 0) {
    currentLessonIndex.value--;
  }
};

const goToLesson = (index) => {
  currentLessonIndex.value = index;
};

const startQuiz = () => {
  router.push({
    name: "course-quiz",
    params: { courseId: course.value.id },
  });
};

onMounted(async () => {
  try {
    await coursesStore.fetchCourses();

    // Set current lesson based on user progress
    if (userProgress.value && userProgress.value.currentLesson) {
      currentLessonIndex.value = userProgress.value.currentLesson - 1;
    }
  } finally {
    isLoading.value = false;
  }
});
</script>
