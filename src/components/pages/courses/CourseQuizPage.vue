<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <nav
              class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2"
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
              <RouterLink
                :to="`/courses/${courseId}`"
                class="hover:text-gray-700 dark:hover:text-gray-300"
              >
                {{ course?.title }}
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
              <span class="text-gray-700 dark:text-gray-300">Quiz Final</span>
            </nav>

            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Quiz Final - {{ course?.title }}
            </h1>
          </div>

          <div class="text-right">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Question {{ currentQuestionIndex + 1 }} sur {{ questions.length }}
            </div>
            <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ formatTime(timeRemaining) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quiz Instructions -->
      <BaseCard v-if="!quizStarted" class="mb-8">
        <template #header>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Instructions du Quiz
          </h2>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div
                class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3"
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {{ questions.length }} Questions
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Questions à choix multiples
              </p>
            </div>

            <div class="text-center">
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3"
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {{ quiz.timeLimit }} Minutes
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Temps limite pour terminer
              </p>
            </div>

            <div class="text-center">
              <div
                class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3"
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {{ quiz.passingScore }}% Minimum
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Score requis pour réussir
              </p>
            </div>
          </div>

          <div
            class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Règles importantes :
            </h4>
            <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>
                • Vous ne pouvez pas revenir en arrière une fois qu'une question
                est répondue
              </li>
              <li>
                • Le quiz se termine automatiquement à la fin du temps imparti
              </li>
              <li>
                • Vous devez obtenir au moins {{ quiz.passingScore }}% pour
                réussir
              </li>
              <li>
                • Une fois terminé, vous pourrez voir vos réponses et obtenir
                votre certificat
              </li>
            </ul>
          </div>

          <div class="flex justify-center pt-4">
            <BaseButton variant="primary" size="lg" @click="startQuiz">
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
              Commencer le Quiz
            </BaseButton>
          </div>
        </div>
      </BaseCard>

      <!-- Quiz Questions -->
      <BaseCard v-if="quizStarted && !quizCompleted">
        <div class="space-y-6">
          <!-- Progress Bar -->
          <div
            class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4"
          >
            <span>Progression</span>
            <span>{{ currentQuestionIndex + 1 }} / {{ questions.length }}</span>
          </div>
          <ProgressBar
            :value="((currentQuestionIndex + 1) / questions.length) * 100"
            :max="100"
          />

          <!-- Question -->
          <div class="space-y-6">
            <div>
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
              >
                {{ currentQuestion.question }}
              </h2>

              <div class="space-y-3">
                <label
                  v-for="(option, index) in currentQuestion.options"
                  :key="index"
                  class="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  :class="{
                    'border-blue-500 bg-blue-50 dark:bg-blue-900/20':
                      selectedAnswer === index,
                  }"
                >
                  <input
                    type="radio"
                    :value="index"
                    v-model="selectedAnswer"
                    class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div class="flex-1">
                    <span class="text-gray-900 dark:text-gray-100">{{
                      option
                    }}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Navigation -->
            <div
              class="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <BaseButton
                variant="outline"
                :disabled="currentQuestionIndex === 0"
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

              <div class="flex space-x-3">
                <BaseButton
                  v-if="currentQuestionIndex < questions.length - 1"
                  variant="primary"
                  :disabled="selectedAnswer === null"
                  @click="nextQuestion"
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
                  v-else
                  variant="success"
                  :disabled="selectedAnswer === null"
                  @click="submitQuiz"
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
                  Terminer le Quiz
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Quiz Results -->
      <BaseCard v-if="quizCompleted">
        <div class="text-center space-y-6">
          <!-- Result Icon -->
          <div
            class="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
            :class="{
              'bg-green-100 dark:bg-green-900': quizResult.passed,
              'bg-red-100 dark:bg-red-900': !quizResult.passed,
            }"
          >
            <svg
              v-if="quizResult.passed"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <!-- Result Message -->
          <div>
            <h2
              class="text-2xl font-bold mb-2"
              :class="{
                'text-green-600 dark:text-green-400': quizResult.passed,
                'text-red-600 dark:text-red-400': !quizResult.passed,
              }"
            >
              {{ quizResult.passed ? "Félicitations !" : "Quiz Échoué" }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{
                quizResult.passed
                  ? "Vous avez réussi le quiz !"
                  : "Vous n'avez pas atteint le score minimum requis."
              }}
            </p>
          </div>

          <!-- Score Details -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div
                  class="text-3xl font-bold text-gray-900 dark:text-gray-100"
                >
                  {{ quizResult.score }}%
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Score Obtenu
                </div>
              </div>

              <div class="text-center">
                <div
                  class="text-3xl font-bold text-gray-900 dark:text-gray-100"
                >
                  {{ quizResult.correctAnswers }} / {{ questions.length }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Bonnes Réponses
                </div>
              </div>

              <div class="text-center">
                <div
                  class="text-3xl font-bold"
                  :class="{
                    'text-green-600 dark:text-green-400': quizResult.passed,
                    'text-red-600 dark:text-red-400': !quizResult.passed,
                  }"
                >
                  {{ quiz.passingScore }}%
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Score Requis
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton variant="outline" @click="reviewAnswers">
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
              Voir les Réponses
            </BaseButton>

            <BaseButton
              v-if="quizResult.passed"
              variant="primary"
              @click="generateCertificate"
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
              Obtenir le Certificat
            </BaseButton>

            <BaseButton variant="outline" @click="retakeQuiz">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </template>
              Reprendre le Quiz
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import ProgressBar from "@/components/atoms/ProgressBar.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const courseId = computed(() => route.params.courseId);
const course = ref(null);
const quiz = ref(null);
const questions = ref([]);
const answers = ref([]);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const quizStarted = ref(false);
const quizCompleted = ref(false);
const timeRemaining = ref(0);
const quizResult = ref(null);
const timer = ref(null);

// Mock data
const mockCourse = {
  id: 1,
  title: "Pharmacovigilance et Sécurité des Médicaments",
  quiz: {
    questionsCount: 15,
    timeLimit: 30,
    passingScore: 70,
  },
};

const mockQuestions = [
  {
    id: 1,
    question: "Qu'est-ce que la pharmacovigilance ?",
    options: [
      "L'étude des effets thérapeutiques des médicaments",
      "La surveillance des effets indésirables des médicaments",
      "La fabrication des médicaments",
      "La prescription des médicaments",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Quel est l'objectif principal de la pharmacovigilance ?",
    options: [
      "Augmenter les ventes de médicaments",
      "Assurer la sécurité des patients",
      "Réduire les coûts des médicaments",
      "Accélérer l'approbation des nouveaux médicaments",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Qui peut signaler un effet indésirable ?",
    options: [
      "Seuls les médecins",
      "Seuls les pharmaciens",
      "Tous les professionnels de santé et les patients",
      "Seuls les laboratoires pharmaceutiques",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Qu'est-ce qu'un effet indésirable grave ?",
    options: [
      "Un effet qui dure plus de 24h",
      "Un effet qui nécessite une hospitalisation",
      "Un effet qui coûte cher à traiter",
      "Un effet qui survient chez plus de 10% des patients",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question:
      "Dans quel délai un effet indésirable grave doit-il être signalé ?",
    options: [
      "Dans les 24h",
      "Dans les 7 jours",
      "Dans les 15 jours",
      "Dans le mois",
    ],
    correctAnswer: 2,
  },
];

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value];
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const startQuiz = () => {
  quizStarted.value = true;
  timeRemaining.value = quiz.value.timeLimit * 60; // Convert to seconds

  // Start timer
  timer.value = setInterval(() => {
    timeRemaining.value--;
    if (timeRemaining.value <= 0) {
      submitQuiz();
    }
  }, 1000);
};

const nextQuestion = () => {
  if (selectedAnswer.value !== null) {
    answers.value[currentQuestionIndex.value] = selectedAnswer.value;
    currentQuestionIndex.value++;
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    answers.value[currentQuestionIndex.value] = selectedAnswer.value;
    currentQuestionIndex.value--;
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null;
  }
};

const submitQuiz = () => {
  // Save current answer
  if (selectedAnswer.value !== null) {
    answers.value[currentQuestionIndex.value] = selectedAnswer.value;
  }

  // Clear timer
  if (timer.value) {
    clearInterval(timer.value);
  }

  // Calculate results
  const correctAnswers = answers.value.filter(
    (answer, index) => answer === questions.value[index].correctAnswer
  ).length;

  const score = Math.round((correctAnswers / questions.value.length) * 100);
  const passed = score >= quiz.value.passingScore;

  quizResult.value = {
    score,
    correctAnswers,
    passed,
    totalQuestions: questions.value.length,
  };

  quizCompleted.value = true;
};

const reviewAnswers = () => {
  // Navigate to review page
  router.push({
    name: "course-quiz-review",
    params: { courseId: courseId.value },
  });
};

const generateCertificate = () => {
  router.push({
    name: "course-certificate",
    params: { courseId: courseId.value },
  });
};

const retakeQuiz = () => {
  // Reset quiz state
  quizStarted.value = false;
  quizCompleted.value = false;
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  answers.value = [];
  quizResult.value = null;
  timeRemaining.value = 0;

  if (timer.value) {
    clearInterval(timer.value);
  }
};

onMounted(async () => {
  try {
    // Simulate API calls
    await new Promise((resolve) => setTimeout(resolve, 1000));
    course.value = mockCourse;
    quiz.value = mockCourse.quiz;
    questions.value = mockQuestions;

    // Initialize answers array
    answers.value = new Array(questions.value.length).fill(null);
  } catch (error) {
    console.error("Error loading quiz:", error);
  }
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>
