import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCertificatesStore } from "./certificates";

export const useQuizStore = defineStore("quiz", () => {
  // State
  const currentQuiz = ref(null);
  const currentQuestion = ref(0);
  const answers = ref({});
  const attempts = ref(0);
  const maxAttempts = ref(2);
  const isCompleted = ref(false);
  const score = ref(0);
  const isLoading = ref(false);
  const timeRemaining = ref(0);
  const isTimerActive = ref(false);

  // Getters
  const totalQuestions = computed(
    () => currentQuiz.value?.questions?.length || 0
  );
  const currentQuestionData = computed(
    () => currentQuiz.value?.questions?.[currentQuestion.value] || null
  );
  const progress = computed(() =>
    totalQuestions.value > 0
      ? ((currentQuestion.value + 1) / totalQuestions.value) * 100
      : 0
  );
  const canSubmit = computed(
    () => Object.keys(answers.value).length === totalQuestions.value
  );
  const hasAttemptsLeft = computed(() => attempts.value < maxAttempts.value);
  const isPassed = computed(() => score.value >= 70); // 70% to pass

  // Actions
  const startQuiz = async (trainingId) => {
    isLoading.value = true;
    try {
      // Simulate API call to fetch quiz
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock quiz data
      const mockQuiz = {
        id: `quiz-${trainingId}`,
        trainingId,
        title: "Quiz de validation",
        description: "Testez vos connaissances acquises",
        questions: [
          {
            id: 1,
            question: "Quelle est la définition de la pharmacovigilance ?",
            type: "multiple-choice",
            options: [
              "Surveillance des médicaments après commercialisation",
              "Contrôle qualité des médicaments",
              "Recherche de nouveaux médicaments",
              "Distribution des médicaments",
            ],
            correctAnswer: 0,
            explanation:
              "La pharmacovigilance est la surveillance des médicaments après leur mise sur le marché.",
          },
          {
            id: 2,
            question:
              "Quels sont les principaux objectifs de la pharmacovigilance ?",
            type: "multiple-choice",
            options: [
              "Identifier les effets indésirables",
              "Évaluer le rapport bénéfice/risque",
              "Améliorer l'utilisation des médicaments",
              "Toutes les réponses ci-dessus",
            ],
            correctAnswer: 3,
            explanation:
              "La pharmacovigilance vise à identifier les effets indésirables, évaluer le rapport bénéfice/risque et améliorer l'utilisation des médicaments.",
          },
          {
            id: 3,
            question:
              "Quelle est la durée de conservation d'un médicament après ouverture ?",
            type: "multiple-choice",
            options: [
              "6 mois",
              "3 mois",
              "Selon la notice du médicament",
              "1 an",
            ],
            correctAnswer: 2,
            explanation:
              "La durée de conservation après ouverture varie selon le médicament et est indiquée sur la notice.",
          },
        ],
        timeLimit: 1800, // 30 minutes
        passingScore: 70,
      };

      currentQuiz.value = mockQuiz;
      currentQuestion.value = 0;
      answers.value = {};
      attempts.value = 0;
      isCompleted.value = false;
      score.value = 0;
      timeRemaining.value = mockQuiz.timeLimit;

      return { success: true, data: mockQuiz };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const answerQuestion = (questionId, answer) => {
    answers.value[questionId] = answer;
  };

  const nextQuestion = () => {
    if (currentQuestion.value < totalQuestions.value - 1) {
      currentQuestion.value++;
    }
  };

  const previousQuestion = () => {
    if (currentQuestion.value > 0) {
      currentQuestion.value--;
    }
  };

  const goToQuestion = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < totalQuestions.value) {
      currentQuestion.value = questionIndex;
    }
  };

  const submitQuiz = async () => {
    if (!canSubmit.value) {
      return {
        success: false,
        error: "Veuillez répondre à toutes les questions",
      };
    }

    isLoading.value = true;
    attempts.value++;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate score
      let correctAnswers = 0;
      currentQuiz.value.questions.forEach((question) => {
        if (answers.value[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });

      score.value = Math.round((correctAnswers / totalQuestions.value) * 100);
      isCompleted.value = true;

      // Save results
      const results = {
        quizId: currentQuiz.value.id,
        trainingId: currentQuiz.value.trainingId,
        score: score.value,
        attempts: attempts.value,
        answers: answers.value,
        completedAt: new Date().toISOString(),
        passed: isPassed.value,
      };

      // Save to localStorage
      const savedResults = JSON.parse(
        localStorage.getItem("quizResults") || "[]"
      );
      savedResults.push(results);
      localStorage.setItem("quizResults", JSON.stringify(savedResults));

      // Generate certificate if quiz is passed
      if (isPassed.value && currentQuiz.value) {
        const certificatesStore = useCertificatesStore();
        await certificatesStore.generateCertificate(
          currentQuiz.value.trainingId,
          score.value
        );
      }

      return {
        success: true,
        data: {
          score: score.value,
          passed: isPassed.value,
          correctAnswers,
          totalQuestions: totalQuestions.value,
          results,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const retakeQuiz = () => {
    if (hasAttemptsLeft.value) {
      currentQuestion.value = 0;
      answers.value = {};
      isCompleted.value = false;
      score.value = 0;
      timeRemaining.value = currentQuiz.value.timeLimit;
    }
  };

  const startTimer = () => {
    if (timeRemaining.value > 0) {
      isTimerActive.value = true;
      const timer = setInterval(() => {
        timeRemaining.value--;
        if (timeRemaining.value <= 0) {
          clearInterval(timer);
          isTimerActive.value = false;
          // Auto-submit when time runs out
          submitQuiz();
        }
      }, 1000);
    }
  };

  const stopTimer = () => {
    isTimerActive.value = false;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetQuiz = () => {
    currentQuiz.value = null;
    currentQuestion.value = 0;
    answers.value = {};
    attempts.value = 0;
    isCompleted.value = false;
    score.value = 0;
    timeRemaining.value = 0;
    isTimerActive.value = false;
  };

  const getQuizResults = (trainingId) => {
    const savedResults = JSON.parse(
      localStorage.getItem("quizResults") || "[]"
    );
    return savedResults.filter((result) => result.trainingId === trainingId);
  };

  return {
    // State
    currentQuiz,
    currentQuestion,
    answers,
    attempts,
    maxAttempts,
    isCompleted,
    score,
    isLoading,
    timeRemaining,
    isTimerActive,

    // Getters
    totalQuestions,
    currentQuestionData,
    progress,
    canSubmit,
    hasAttemptsLeft,
    isPassed,

    // Actions
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
    retakeQuiz,
    startTimer,
    stopTimer,
    formatTime,
    resetQuiz,
    getQuizResults,
  };
});
