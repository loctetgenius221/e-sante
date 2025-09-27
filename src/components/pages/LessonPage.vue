<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Lesson Content -->
    <div v-else-if="lesson" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <RouterLink
              to="/catalogue"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Catalogue
            </RouterLink>
          </li>
          <li>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
          <li>
            <RouterLink
              :to="{
                name: 'training-detail',
                params: { slug: training?.slug },
              }"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {{ training?.title }}
            </RouterLink>
          </li>
          <li>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
          <li>
            <span class="text-gray-900 dark:text-gray-100 font-medium">
              {{ lesson.title }}
            </span>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Video/Audio Player -->
          <BaseCard class="mb-6">
            <div class="aspect-video bg-black rounded-lg overflow-hidden">
              <div
                v-if="lesson.type === 'video'"
                class="relative w-full h-full"
              >
                <video
                  ref="videoPlayer"
                  class="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  @loadedmetadata="onVideoLoaded"
                  @timeupdate="onTimeUpdate"
                  @ended="onVideoEnded"
                >
                  <source :src="lesson.videoUrl" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>

                <!-- Video Overlay -->
                <div
                  v-if="!isVideoPlaying"
                  class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                  <button
                    @click="playVideo"
                    class="p-4 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  >
                    <svg
                      class="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 5v10l8-5-8-5z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                v-else-if="lesson.type === 'audio'"
                class="flex items-center justify-center h-full bg-gray-800"
              >
                <div class="text-center">
                  <div
                    class="p-6 bg-gray-700 rounded-full mb-4 mx-auto w-24 h-24 flex items-center justify-center"
                  >
                    <svg
                      class="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.816a1 1 0 011-.108zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <audio
                    ref="audioPlayer"
                    class="w-full max-w-md"
                    controls
                    preload="metadata"
                    @loadedmetadata="onAudioLoaded"
                    @timeupdate="onTimeUpdate"
                    @ended="onAudioEnded"
                  >
                    <source :src="lesson.audioUrl" type="audio/mpeg" />
                    Votre navigateur ne supporte pas la lecture audio.
                  </audio>
                </div>
              </div>

              <div
                v-else
                class="flex items-center justify-center h-full bg-gray-800"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p class="text-lg font-medium">Contenu PDF</p>
                  <p class="text-sm text-gray-300 mt-1">{{ lesson.title }}</p>
                </div>
              </div>
            </div>

            <!-- Player Controls -->
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <BaseBadge :variant="getTypeVariant(lesson.type)">
                    {{ getTypeLabel(lesson.type) }}
                  </BaseBadge>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ lesson.duration }}
                  </span>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <BaseButton
                  v-if="lesson.downloadable"
                  variant="outline"
                  size="sm"
                  @click="downloadContent"
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

                <BaseButton variant="outline" size="sm" @click="toggleBookmark">
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
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </template>
                  {{ isBookmarked ? "Retiré" : "Marquer" }}
                </BaseButton>
              </div>
            </div>
          </BaseCard>

          <!-- Lesson Content -->
          <BaseCard>
            <template #header>
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ lesson.title }}
              </h2>
            </template>

            <div class="prose dark:prose-invert max-w-none">
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ lesson.description }}
              </p>

              <!-- Transcript -->
              <div v-if="lesson.transcript" class="mt-6">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3"
                >
                  Transcription
                </h3>
                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p
                    class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {{ lesson.transcript }}
                  </p>
                </div>
              </div>

              <!-- Resources -->
              <div
                v-if="lesson.resources && lesson.resources.length > 0"
                class="mt-6"
              >
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3"
                >
                  Ressources complémentaires
                </h3>
                <div class="space-y-2">
                  <div
                    v-for="resource in lesson.resources"
                    :key="resource.id"
                    class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div class="flex items-center">
                      <div
                        class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-3"
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4
                          class="font-medium text-gray-900 dark:text-gray-100"
                        >
                          {{ resource.title }}
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {{ resource.size }}
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
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Progress -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Progression
              </h3>
            </template>

            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Cette leçon
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ lessonProgress }}%
                  </span>
                </div>
                <ProgressBar :value="lessonProgress" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Formation complète
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ trainingProgress }}%
                  </span>
                </div>
                <ProgressBar :value="trainingProgress" />
              </div>
            </div>
          </BaseCard>

          <!-- Lesson Navigation -->
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
                v-for="(trainingLesson, index) in training?.lessons"
                :key="trainingLesson.id"
                class="flex items-center p-3 rounded-lg transition-colors"
                :class="{
                  'bg-gray-100 dark:bg-gray-800':
                    trainingLesson.id === lesson.id,
                  'hover:bg-gray-50 dark:hover:bg-gray-700':
                    trainingLesson.id !== lesson.id,
                }"
              >
                <div class="flex items-center flex-1">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium"
                    :class="{
                      'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900':
                        trainingLesson.id === lesson.id,
                      'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300':
                        trainingLesson.id !== lesson.id,
                    }"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <h4
                      class="text-sm font-medium"
                      :class="{
                        'text-gray-900 dark:text-gray-100':
                          trainingLesson.id === lesson.id,
                        'text-gray-700 dark:text-gray-300':
                          trainingLesson.id !== lesson.id,
                      }"
                    >
                      {{ trainingLesson.title }}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ trainingLesson.duration }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-1">
                  <BaseBadge
                    v-if="
                      trainingsStore.isLessonCompleted(
                        training.id,
                        trainingLesson.id
                      )
                    "
                    variant="success"
                    size="sm"
                  >
                    ✓
                  </BaseBadge>
                  <BaseBadge
                    v-else-if="trainingLesson.id === lesson.id"
                    variant="primary"
                    size="sm"
                  >
                    En cours
                  </BaseBadge>
                  <BaseBadge
                    v-else-if="
                      !trainingsStore.canAccessLesson(
                        training.id,
                        trainingLesson.id
                      )
                    "
                    variant="secondary"
                    size="sm"
                  >
                    🔒
                  </BaseBadge>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-4 flex space-x-2">
              <BaseButton
                v-if="previousLesson"
                variant="outline"
                size="sm"
                @click="goToLesson(previousLesson.id)"
                full-width
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
                Précédent
              </BaseButton>

              <BaseButton
                v-if="nextLesson && canAccessNextLesson"
                variant="primary"
                size="sm"
                @click="goToLesson(nextLesson.id)"
                full-width
              >
                Suivant
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
              </BaseButton>

              <BaseButton
                v-else-if="isLastLesson && isLessonCompleted"
                variant="primary"
                size="sm"
                @click="goToQuiz"
                full-width
              >
                Passer le quiz
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
              </BaseButton>

              <BaseButton
                v-else-if="!isLessonCompleted"
                variant="outline"
                size="sm"
                @click="markLessonAsCompleted"
                full-width
              >
                Marquer comme terminé
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </template>
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Notes -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Mes notes
              </h3>
            </template>

            <div class="space-y-3">
              <textarea
                v-model="userNotes"
                placeholder="Ajoutez vos notes personnelles..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                rows="4"
                @blur="saveNotes"
              ></textarea>
              <BaseButton
                variant="outline"
                size="sm"
                @click="saveNotes"
                full-width
              >
                Sauvegarder
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Leçon non trouvée
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          La leçon que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <div class="mt-6">
          <BaseButton variant="primary" @click="$router.push('/catalogue')">
            Retour au catalogue
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTrainingsStore } from "@/stores/trainings";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import ProgressBar from "@/components/molecules/ProgressBar.vue";

const route = useRoute();
const router = useRouter();
const trainingsStore = useTrainingsStore();

const isLoading = ref(true);
const lesson = ref(null);
const training = ref(null);
const isVideoPlaying = ref(false);
const isBookmarked = ref(false);
const userNotes = ref("");
const lessonProgress = ref(0);
const trainingProgress = ref(0);

const videoPlayer = ref(null);
const audioPlayer = ref(null);

const previousLesson = computed(() => {
  if (!training.value || !lesson.value) return null;
  return trainingsStore.getPreviousLesson(training.value.id, lesson.value.id);
});

const nextLesson = computed(() => {
  if (!training.value || !lesson.value) return null;
  return trainingsStore.getNextLesson(training.value.id, lesson.value.id);
});

const isLastLesson = computed(() => {
  if (!training.value || !lesson.value) return false;
  return !trainingsStore.getNextLesson(training.value.id, lesson.value.id);
});

const isLessonCompleted = computed(() => {
  if (!training.value || !lesson.value) return false;
  return trainingsStore.isLessonCompleted(training.value.id, lesson.value.id);
});

const canAccessNextLesson = computed(() => {
  if (!training.value || !lesson.value) return false;
  const next = nextLesson.value;
  if (!next) return false;
  return trainingsStore.canAccessLesson(training.value.id, next.id);
});

const getTypeVariant = (type) => {
  const variants = {
    video: "primary",
    audio: "info",
    pdf: "secondary",
  };
  return variants[type] || "default";
};

const getTypeLabel = (type) => {
  const labels = {
    video: "Vidéo",
    audio: "Audio",
    pdf: "PDF",
  };
  return labels[type] || type;
};

const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.play();
    isVideoPlaying.value = true;
  }
};

const onVideoLoaded = () => {
  // Video loaded
};

const onAudioLoaded = () => {
  // Audio loaded
};

const onTimeUpdate = () => {
  // Update progress based on current time
  const player = videoPlayer.value || audioPlayer.value;
  if (player && player.duration) {
    const progress = (player.currentTime / player.duration) * 100;
    lessonProgress.value = Math.round(progress);
  }
};

const onVideoEnded = () => {
  isVideoPlaying.value = false;
  markLessonAsCompleted();
};

const onAudioEnded = () => {
  markLessonAsCompleted();
};

const markLessonAsCompleted = () => {
  if (lesson.value && training.value) {
    // Mark lesson as completed in the store
    trainingsStore.markLessonAsCompleted(training.value.id, lesson.value.id);

    // Show completion message
    showCompletionMessage();

    // Auto-navigate to next lesson after a delay
    setTimeout(() => {
      navigateToNextLesson();
    }, 2000);
  }
};

const showCompletionMessage = () => {
  // You can implement a toast notification here
  console.log("Leçon terminée avec succès !");
};

const navigateToNextLesson = () => {
  if (training.value && lesson.value) {
    const nextLesson = trainingsStore.getNextLesson(
      training.value.id,
      lesson.value.id
    );

    if (nextLesson) {
      // Navigate to next lesson
      router.push({
        name: "lesson",
        params: {
          slug: training.value.slug,
          id: nextLesson.id,
        },
      });
    } else {
      // No more lessons, navigate to quiz
      router.push({
        name: "quiz",
        params: {
          slug: training.value.slug,
        },
      });
    }
  }
};

const downloadContent = () => {
  // Implement download functionality
  console.log("Download content:", lesson.value);
};

const downloadResource = (resource) => {
  // Implement resource download
  console.log("Download resource:", resource);
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
  // Save bookmark state
};

const saveNotes = () => {
  // Save user notes
  console.log("Save notes:", userNotes.value);
};

const goToLesson = (lessonId) => {
  router.push({
    name: "lesson",
    params: {
      slug: training.value.slug,
      id: lessonId,
    },
  });
};

const goToQuiz = () => {
  router.push({
    name: "quiz",
    params: {
      slug: training.value.slug,
    },
  });
};

onMounted(async () => {
  try {
    const { slug, id } = route.params;

    // Fetch training data
    await trainingsStore.fetchTrainingBySlug(slug);
    training.value = trainingsStore.currentTraining;

    if (training.value) {
      // Find the specific lesson
      lesson.value = training.value.lessons.find((l) => l.id === parseInt(id));

      if (lesson.value) {
        // Load lesson-specific data
        userNotes.value = lesson.value.notes || "";
        isBookmarked.value = lesson.value.bookmarked || false;
        lessonProgress.value = lesson.value.progress || 0;
        trainingProgress.value = training.value.progress || 0;
      }
    }
  } catch (error) {
    console.error("Error loading lesson:", error);
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  // Cleanup
  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
  if (audioPlayer.value) {
    audioPlayer.value.pause();
  }
});
</script>
