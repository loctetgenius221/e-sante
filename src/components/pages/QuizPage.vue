<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Quiz Content -->
    <div v-else-if="quiz" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Quiz de validation
            </span>
          </li>
        </ol>
      </nav>

      <!-- Quiz Header -->
      <BaseCard class="mb-6">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Quiz de validation
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ training?.title }}
          </p>

          <!-- Quiz Info -->
          <div
            class="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400"
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {{ quiz.questions.length }} questions
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ quiz.timeLimit }} minutes
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              {{ quiz.passingScore }}% pour réussir
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Quiz Progress -->
      <BaseCard class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Progression
          </h3>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Question {{ currentQuestionIndex + 1 }} sur
              {{ quiz.questions.length }}
            </span>
            <div v-if="quiz.timeLimit" class="flex items-center text-sm">
              <svg
                class="w-4 h-4 mr-1 text-gray-500"
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
              <span
                :class="
                  timeRemaining < 60
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                "
              >
                {{ formatTime(timeRemaining) }}
              </span>
            </div>
          </div>
        </div>
        <ProgressBar
          :value="(currentQuestionIndex / quiz.questions.length) * 100"
        />
      </BaseCard>

      <!-- Quiz Question -->
      <BaseCard v-if="!quizCompleted && !showResults">
        <div class="mb-6">
          <h2
            class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            {{ currentQuestion.question }}
          </h2>

          <!-- Question Image -->
          <div v-if="currentQuestion.image" class="mb-4">
            <img
              :src="currentQuestion.image"
              :alt="currentQuestion.question"
              class="w-full max-w-md mx-auto rounded-lg"
            />
          </div>

          <!-- Answer Options -->
          <div class="space-y-3">
            <label
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              :class="{
                'border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-gray-800':
                  selectedAnswer === index,
              }"
            >
              <input
                v-model="selectedAnswer"
                :value="index"
                type="radio"
                class="sr-only"
              />
              <div
                class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center"
                :class="{
                  'border-gray-900 dark:border-gray-100':
                    selectedAnswer === index,
                  'border-gray-300 dark:border-gray-600':
                    selectedAnswer !== index,
                }"
              >
                <div
                  v-if="selectedAnswer === index"
                  class="w-2 h-2 rounded-full bg-gray-900 dark:bg-gray-100"
                ></div>
              </div>
              <span class="text-gray-900 dark:text-gray-100">
                {{ option }}
              </span>
            </label>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between">
          <BaseButton
            v-if="currentQuestionIndex > 0"
            variant="outline"
            @click="previousQuestion"
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
          <div v-else></div>

          <BaseButton
            variant="primary"
            :disabled="selectedAnswer === null"
            @click="nextQuestion"
          >
            {{ isLastQuestion ? "Terminer le quiz" : "Suivant" }}
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
        </div>
      </BaseCard>

      <!-- Quiz Results -->
      <BaseCard v-if="showResults">
        <div class="text-center">
          <!-- Result Icon -->
          <div class="mb-6">
            <div
              class="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
              :class="{
                'bg-green-100 dark:bg-green-900/20': quizPassed,
                'bg-red-100 dark:bg-red-900/20': !quizPassed,
              }"
            >
              <svg
                v-if="quizPassed"
                class="w-10 h-10 text-green-600 dark:text-green-400"
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
              <svg
                v-else
                class="w-10 h-10 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Result Title -->
          <h2
            class="text-2xl font-bold mb-2"
            :class="{
              'text-green-600 dark:text-green-400': quizPassed,
              'text-red-600 dark:text-red-400': !quizPassed,
            }"
          >
            {{ quizPassed ? "Félicitations !" : "Quiz échoué" }}
          </h2>

          <!-- Score -->
          <div class="mb-6">
            <div
              class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ finalScore }}%
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ correctAnswers }} bonnes réponses sur
              {{ quiz.questions.length }}
            </p>
          </div>

          <!-- Result Message -->
          <div class="mb-6">
            <p
              class="text-lg"
              :class="{
                'text-green-600 dark:text-green-400': quizPassed,
                'text-red-600 dark:text-red-400': !quizPassed,
              }"
            >
              {{
                quizPassed
                  ? "Vous avez réussi le quiz ! Vous pouvez maintenant télécharger votre certificat."
                  : `Vous devez obtenir au moins ${quiz.passingScore}% pour réussir. Vous avez encore ${remainingAttempts} tentative(s).`
              }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              v-if="quizPassed"
              variant="primary"
              size="lg"
              @click="downloadCertificate"
            >
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </template>
              Télécharger le certificat
            </BaseButton>

            <BaseButton
              v-if="!quizPassed && remainingAttempts > 0"
              variant="primary"
              size="lg"
              @click="retakeQuiz"
            >
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </template>
              Reprendre le quiz
            </BaseButton>

            <BaseButton variant="outline" size="lg" @click="goToTraining">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </template>
              Retour à la formation
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          Quiz non trouvé
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Le quiz que vous recherchez n'existe pas ou a été supprimé.
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
import { useQuizStore } from "@/stores/quiz";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import ProgressBar from "@/components/molecules/ProgressBar.vue";

const route = useRoute();
const router = useRouter();
const trainingsStore = useTrainingsStore();
const quizStore = useQuizStore();

const isLoading = ref(true);
const quiz = ref(null);
const training = ref(null);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const answers = ref([]);
const quizCompleted = ref(false);
const showResults = ref(false);
const timeRemaining = ref(0);
const remainingAttempts = ref(2);

const currentQuestion = computed(() => {
  return quiz.value?.questions[currentQuestionIndex.value] || null;
});

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === quiz.value?.questions.length - 1;
});

const finalScore = computed(() => {
  if (!quiz.value) return 0;
  return Math.round((correctAnswers.value / quiz.value.questions.length) * 100);
});

const correctAnswers = computed(() => {
  return answers.value.filter((answer, index) => {
    return answer === quiz.value.questions[index].correctAnswer;
  }).length;
});

const quizPassed = computed(() => {
  return finalScore.value >= quiz.value?.passingScore;
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const nextQuestion = () => {
  if (selectedAnswer.value === null) return;

  // Save answer
  answers.value[currentQuestionIndex.value] = selectedAnswer.value;

  if (isLastQuestion.value) {
    // Quiz completed
    completeQuiz();
  } else {
    // Go to next question
    currentQuestionIndex.value++;
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null;
  }
};

const completeQuiz = () => {
  quizCompleted.value = true;
  showResults.value = true;

  // Save quiz results
  quizStore.saveQuizResults({
    trainingId: training.value.id,
    score: finalScore.value,
    passed: quizPassed.value,
    answers: answers.value,
    completedAt: new Date(),
  });

  // Stop timer
  if (quiz.value.timeLimit) {
    clearInterval(timerInterval.value);
  }
};

const downloadCertificate = () => {
  // Implement certificate download
  console.log("Download certificate for training:", training.value.id);
};

const retakeQuiz = () => {
  // Reset quiz state
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  answers.value = [];
  quizCompleted.value = false;
  showResults.value = false;
  remainingAttempts.value--;

  // Reset timer
  if (quiz.value.timeLimit) {
    timeRemaining.value = quiz.value.timeLimit * 60;
    startTimer();
  }
};

const goToTraining = () => {
  router.push({
    name: "training-detail",
    params: { slug: training.value.slug },
  });
};

const startTimer = () => {
  if (quiz.value.timeLimit) {
    timeRemaining.value = quiz.value.timeLimit * 60;
    timerInterval.value = setInterval(() => {
      timeRemaining.value--;
      if (timeRemaining.value <= 0) {
        clearInterval(timerInterval.value);
        completeQuiz();
      }
    }, 1000);
  }
};

let timerInterval = ref(null);

onMounted(async () => {
  try {
    const { slug } = route.params;

    // Fetch training data
    await trainingsStore.fetchTrainingBySlug(slug);
    training.value = trainingsStore.currentTraining;

    if (training.value) {
      // Fetch quiz data
      await quizStore.fetchQuizByTrainingId(training.value.id);
      quiz.value = quizStore.currentQuiz;

      if (quiz.value) {
        // Initialize quiz state
        answers.value = new Array(quiz.value.questions.length).fill(null);
        startTimer();
      }
    }
  } catch (error) {
    console.error("Error loading quiz:", error);
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>
