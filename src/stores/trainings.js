import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { mockTrainings } from "@/data/mockData";

export const useTrainingsStore = defineStore("trainings", () => {
  // State
  const trainings = ref(mockTrainings);
  const currentTraining = ref(null);
  const currentLesson = ref(null);
  const userProgress = ref({});
  const isLoading = ref(false);
  const searchQuery = ref("");
  const filters = ref({
    theme: "",
    format: "",
    language: "fr",
    difficulty: "",
  });

  // Getters
  const filteredTrainings = computed(() => {
    let filtered = trainings.value;

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (training) =>
          training.title.toLowerCase().includes(query) ||
          training.description.toLowerCase().includes(query) ||
          training.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Theme filter
    if (filters.value.theme) {
      filtered = filtered.filter(
        (training) => training.theme === filters.value.theme
      );
    }

    // Format filter
    if (filters.value.format) {
      filtered = filtered.filter(
        (training) => training.format === filters.value.format
      );
    }

    // Language filter
    if (filters.value.language) {
      filtered = filtered.filter(
        (training) => training.language === filters.value.language
      );
    }

    // Difficulty filter
    if (filters.value.difficulty) {
      filtered = filtered.filter(
        (training) => training.difficulty === filters.value.difficulty
      );
    }

    return filtered;
  });

  const featuredTrainings = computed(() =>
    trainings.value.filter((training) => training.featured)
  );

  const themes = computed(() => [
    ...new Set(trainings.value.map((t) => t.theme)),
  ]);

  const formats = computed(() => [
    ...new Set(trainings.value.map((t) => t.format)),
  ]);

  const languages = computed(() => [
    ...new Set(trainings.value.map((t) => t.language)),
  ]);

  const difficulties = computed(() => [
    ...new Set(trainings.value.map((t) => t.difficulty)),
  ]);

  // Actions
  const fetchTrainings = async () => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Data is already loaded from mockData
      return { success: true, data: trainings.value };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const fetchTrainingBySlug = async (slug) => {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const training = trainings.value.find((t) => t.slug === slug);
      if (training) {
        currentTraining.value = training;
        return { success: true, data: training };
      } else {
        return { success: false, error: "Formation non trouvée" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const fetchLesson = async (trainingSlug, lessonId) => {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const training = trainings.value.find((t) => t.slug === trainingSlug);
      if (training) {
        const lesson = training.lessons.find(
          (l) => l.id === parseInt(lessonId)
        );
        if (lesson) {
          currentLesson.value = lesson;
          return { success: true, data: lesson };
        }
      }
      return { success: false, error: "Leçon non trouvée" };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const updateProgress = (trainingId, lessonId, progress) => {
    if (!userProgress.value[trainingId]) {
      userProgress.value[trainingId] = {
        lessons: {},
        completed: false,
        quizCompleted: false,
        certificateGenerated: false,
        startedAt: new Date().toISOString(),
        completedAt: null,
      };
    }

    userProgress.value[trainingId].lessons[lessonId] = {
      progress,
      completed: progress >= 100,
      completedAt: progress >= 100 ? new Date().toISOString() : null,
    };

    // Check if all lessons are completed
    const training = trainings.value.find((t) => t.id === trainingId);
    if (training) {
      const allLessonsCompleted = training.lessons.every(
        (lesson) => userProgress.value[trainingId].lessons[lesson.id]?.completed
      );

      if (allLessonsCompleted && !userProgress.value[trainingId].completed) {
        userProgress.value[trainingId].completed = true;
        userProgress.value[trainingId].completedAt = new Date().toISOString();
      }
    }

    // Save to localStorage
    localStorage.setItem(
      "trainingProgress",
      JSON.stringify(userProgress.value)
    );
  };

  const markLessonAsCompleted = (trainingId, lessonId) => {
    updateProgress(trainingId, lessonId, 100);
  };

  const getProgress = (trainingId, lessonId) => {
    return userProgress.value[trainingId]?.lessons?.[lessonId]?.progress || 0;
  };

  const isLessonCompleted = (trainingId, lessonId) => {
    return (
      userProgress.value[trainingId]?.lessons?.[lessonId]?.completed || false
    );
  };

  const getTrainingProgress = (trainingId) => {
    const training = trainings.value.find((t) => t.id === trainingId);
    if (!training) return 0;

    const totalLessons = training.lessons.length;
    const completedLessons = training.lessons.filter((lesson) =>
      isLessonCompleted(trainingId, lesson.id)
    ).length;

    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  const isTrainingCompleted = (trainingId) => {
    return userProgress.value[trainingId]?.completed || false;
  };

  const getNextLesson = (trainingId, currentLessonId) => {
    const training = trainings.value.find((t) => t.id === trainingId);
    if (!training) return null;

    const currentIndex = training.lessons.findIndex(
      (l) => l.id === currentLessonId
    );
    if (currentIndex === -1 || currentIndex === training.lessons.length - 1) {
      return null; // No next lesson
    }

    return training.lessons[currentIndex + 1];
  };

  const getPreviousLesson = (trainingId, currentLessonId) => {
    const training = trainings.value.find((t) => t.id === trainingId);
    if (!training) return null;

    const currentIndex = training.lessons.findIndex(
      (l) => l.id === currentLessonId
    );
    if (currentIndex <= 0) {
      return null; // No previous lesson
    }

    return training.lessons[currentIndex - 1];
  };

  const canAccessLesson = (trainingId, lessonId) => {
    const training = trainings.value.find((t) => t.id === trainingId);
    if (!training) return false;

    const lessonIndex = training.lessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === 0) return true; // First lesson is always accessible

    // Check if previous lesson is completed
    const previousLesson = training.lessons[lessonIndex - 1];
    return isLessonCompleted(trainingId, previousLesson.id);
  };

  const markQuizCompleted = (trainingId, score) => {
    if (!userProgress.value[trainingId]) {
      userProgress.value[trainingId] = {
        lessons: {},
        completed: false,
        quizCompleted: false,
        certificateGenerated: false,
        startedAt: new Date().toISOString(),
        completedAt: null,
      };
    }

    userProgress.value[trainingId].quizCompleted = true;
    userProgress.value[trainingId].quizScore = score;
    userProgress.value[trainingId].quizCompletedAt = new Date().toISOString();

    // Save to localStorage
    localStorage.setItem(
      "trainingProgress",
      JSON.stringify(userProgress.value)
    );
  };

  const markCertificateGenerated = (trainingId) => {
    if (userProgress.value[trainingId]) {
      userProgress.value[trainingId].certificateGenerated = true;
      userProgress.value[trainingId].certificateGeneratedAt =
        new Date().toISOString();

      // Save to localStorage
      localStorage.setItem(
        "trainingProgress",
        JSON.stringify(userProgress.value)
      );
    }
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = () => {
    filters.value = {
      theme: "",
      format: "",
      language: "fr",
      difficulty: "",
    };
    searchQuery.value = "";
  };

  const initializeProgress = () => {
    const savedProgress = localStorage.getItem("trainingProgress");
    if (savedProgress) {
      userProgress.value = JSON.parse(savedProgress);
    }
  };

  return {
    // State
    trainings,
    currentTraining,
    currentLesson,
    userProgress,
    isLoading,
    searchQuery,
    filters,

    // Getters
    filteredTrainings,
    featuredTrainings,
    themes,
    formats,
    languages,
    difficulties,

    // Actions
    fetchTrainings,
    fetchTrainingBySlug,
    fetchLesson,
    updateProgress,
    markLessonAsCompleted,
    getProgress,
    isLessonCompleted,
    getTrainingProgress,
    isTrainingCompleted,
    getNextLesson,
    getPreviousLesson,
    canAccessLesson,
    markQuizCompleted,
    markCertificateGenerated,
    setSearchQuery,
    setFilters,
    clearFilters,
    initializeProgress,
  };
});
