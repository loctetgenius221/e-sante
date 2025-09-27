import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCoursesStore = defineStore("courses", () => {
  // State
  const courses = ref([]);
  const userProgress = ref({});
  const certificates = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const enrolledCourses = computed(() => {
    return courses.value.filter((course) => userProgress.value[course.id]);
  });

  const completedCourses = computed(() => {
    return courses.value.filter((course) => {
      const progress = userProgress.value[course.id];
      return progress && progress.status === "completed";
    });
  });

  const inProgressCourses = computed(() => {
    return courses.value.filter((course) => {
      const progress = userProgress.value[course.id];
      return progress && progress.status === "in_progress";
    });
  });

  const userCertificates = computed(() => {
    return certificates.value;
  });

  // Actions
  const fetchCourses = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      const mockCourses = [
        {
          id: 1,
          title: "Pharmacovigilance et Sécurité des Médicaments",
          description:
            "Maîtrisez la pharmacovigilance et la sécurité des médicaments",
          fullDescription:
            "Ce cours complet vous permettra de comprendre les enjeux de la pharmacovigilance, d'identifier les effets indésirables des médicaments et de mettre en place des procédures de surveillance adaptées à votre pratique professionnelle.",
          duration: "4h 30min",
          lessonsCount: 3,
          category: "Pharmacie",
          level: "Intermédiaire",
          instructor: "Dr. Marie Diallo",
          image: "/images/courses/pharmacovigilance.jpg",
          featured: true,
          learningObjectives: [
            "Comprendre les principes de la pharmacovigilance",
            "Identifier les effets indésirables des médicaments",
            "Mettre en place des procédures de surveillance",
            "Utiliser les outils de signalement appropriés",
          ],
          prerequisites: [
            "Connaissances de base en pharmacologie",
            "Expérience en pratique pharmaceutique",
          ],
          lessons: [
            {
              id: 1,
              title: "Introduction à la Pharmacovigilance",
              duration: "1h 30min",
              status: "completed",
              objectives: [
                "Définir la pharmacovigilance",
                "Comprendre son importance dans la pratique pharmaceutique",
              ],
              content:
                "La pharmacovigilance est la science et les activités relatives à la détection, l'évaluation, la compréhension et la prévention des effets indésirables ou de tout autre problème lié aux médicaments.",
            },
            {
              id: 2,
              title: "Identification des Effets Indésirables",
              duration: "1h 45min",
              status: "in_progress",
              objectives: [
                "Reconnaître les différents types d'effets indésirables",
                "Appliquer les critères d'imputabilité",
              ],
              content:
                "Les effets indésirables peuvent être classés selon leur gravité, leur fréquence et leur relation de causalité avec le médicament. Il est essentiel de savoir les identifier et les évaluer correctement.",
            },
            {
              id: 3,
              title: "Signalement et Procédures",
              duration: "1h 15min",
              status: "not_started",
              objectives: [
                "Connaître les procédures de signalement",
                "Utiliser les outils de pharmacovigilance",
              ],
              content:
                "Le signalement des effets indésirables est une obligation légale et éthique. Cette leçon vous apprendra les procédures à suivre et les outils disponibles.",
            },
          ],
          quiz: {
            questionsCount: 15,
            timeLimit: 30,
            passingScore: 70,
          },
        },
        {
          id: 2,
          title: "Gestion des Interactions Médicamenteuses",
          description: "Prévenez et gérez les interactions médicamenteuses",
          fullDescription:
            "Apprenez à identifier, prévenir et gérer les interactions médicamenteuses pour assurer la sécurité de vos patients.",
          duration: "3h 15min",
          lessonsCount: 3,
          category: "Pharmacie",
          level: "Avancé",
          instructor: "Prof. Amadou Ba",
          image: "/images/courses/interactions.jpg",
          featured: true,
          learningObjectives: [
            "Identifier les interactions médicamenteuses",
            "Évaluer leur impact clinique",
            "Proposer des alternatives thérapeutiques",
          ],
          prerequisites: [
            "Connaissances en pharmacologie",
            "Expérience en conseil pharmaceutique",
          ],
          lessons: [
            {
              id: 1,
              title: "Types d'Interactions",
              duration: "1h 15min",
              status: "completed",
              objectives: [
                "Classifier les interactions médicamenteuses",
                "Comprendre leurs mécanismes",
              ],
              content:
                "Les interactions médicamenteuses peuvent être pharmacocinétiques ou pharmacodynamiques, et leur impact varie selon leur gravité.",
            },
            {
              id: 2,
              title: "Évaluation Clinique",
              duration: "1h 30min",
              status: "completed",
              objectives: [
                "Évaluer la pertinence clinique",
                "Identifier les facteurs de risque",
              ],
              content:
                "L'évaluation clinique des interactions nécessite une analyse approfondie du profil du patient et des médicaments concernés.",
            },
            {
              id: 3,
              title: "Gestion et Prévention",
              duration: "30min",
              status: "completed",
              objectives: [
                "Mettre en place des stratégies de prévention",
                "Gérer les interactions détectées",
              ],
              content:
                "La prévention et la gestion des interactions passent par une surveillance active et des conseils adaptés.",
            },
          ],
          quiz: {
            questionsCount: 12,
            timeLimit: 25,
            passingScore: 75,
          },
        },
        {
          id: 3,
          title: "Dermatologie en Pharmacie",
          description: "Maîtrisez la dermatologie en pharmacie",
          fullDescription:
            "Formation complète sur les affections dermatologiques courantes et leur prise en charge en officine.",
          duration: "2h 45min",
          lessonsCount: 2,
          category: "Dermatologie",
          level: "Débutant",
          instructor: "Dr. Fatou Sarr",
          image: "/images/courses/dermatologie.jpg",
          featured: false,
          learningObjectives: [
            "Reconnaître les affections dermatologiques courantes",
            "Conseiller les traitements appropriés",
            "Orienter vers le médecin si nécessaire",
          ],
          prerequisites: [
            "Connaissances de base en anatomie",
            "Expérience en conseil pharmaceutique",
          ],
          lessons: [
            {
              id: 1,
              title: "Affections Courantes",
              duration: "1h 30min",
              status: "not_started",
              objectives: [
                "Identifier les dermatoses courantes",
                "Différencier les types de lésions",
              ],
              content:
                "Les affections dermatologiques courantes en officine incluent l'eczéma, le psoriasis, l'acné et les mycoses.",
            },
            {
              id: 2,
              title: "Traitements et Conseils",
              duration: "1h 15min",
              status: "not_started",
              objectives: [
                "Connaître les traitements disponibles",
                "Donner des conseils d'hygiène",
              ],
              content:
                "Le traitement des affections dermatologiques nécessite une approche globale incluant soins locaux et conseils d'hygiène.",
            },
          ],
          quiz: {
            questionsCount: 10,
            timeLimit: 20,
            passingScore: 70,
          },
        },
      ];

      courses.value = mockCourses;

      // Mock user progress
      userProgress.value = {
        1: {
          status: "in_progress",
          progress: 65,
          currentLesson: 2,
          completedLessons: [1],
          quizCompleted: false,
          certificateEarned: false,
        },
        2: {
          status: "completed",
          progress: 100,
          currentLesson: 3,
          completedLessons: [1, 2, 3],
          quizCompleted: true,
          certificateEarned: true,
        },
        3: {
          status: "not_started",
          progress: 0,
          currentLesson: 1,
          completedLessons: [],
          quizCompleted: false,
          certificateEarned: false,
        },
      };
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!userProgress.value[courseId]) {
        userProgress.value[courseId] = {
          status: "not_started",
          progress: 0,
          currentLesson: 1,
          completedLessons: [],
          quizCompleted: false,
          certificateEarned: false,
        };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateLessonProgress = async (courseId, lessonId, status) => {
    try {
      const progress = userProgress.value[courseId];
      if (!progress) return { success: false, error: "Course not enrolled" };

      // Update lesson status in course data
      const course = courses.value.find((c) => c.id === courseId);
      if (course) {
        const lesson = course.lessons.find((l) => l.id === lessonId);
        if (lesson) {
          lesson.status = status;
        }
      }

      // Update user progress
      if (
        status === "completed" &&
        !progress.completedLessons.includes(lessonId)
      ) {
        progress.completedLessons.push(lessonId);
        progress.progress = Math.round(
          (progress.completedLessons.length / course.lessonsCount) * 100
        );

        // Check if all lessons completed
        if (progress.completedLessons.length === course.lessonsCount) {
          progress.status = "completed";
        } else {
          progress.status = "in_progress";
        }
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const completeQuiz = async (courseId, score) => {
    try {
      const progress = userProgress.value[courseId];
      if (!progress) return { success: false, error: "Course not enrolled" };

      const course = courses.value.find((c) => c.id === courseId);
      if (!course) return { success: false, error: "Course not found" };

      progress.quizCompleted = true;
      progress.quizScore = score;

      // Check if quiz passed
      if (score >= course.quiz.passingScore) {
        progress.certificateEarned = true;

        // Generate certificate
        const certificate = {
          id: `CERT-${Date.now()}`,
          courseId: courseId,
          userId: 1, // In real app, get from auth store
          courseTitle: course.title,
          score: score,
          issuedAt: new Date().toISOString(),
          validUntil: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000
          ).toISOString(),
        };

        certificates.value.push(certificate);
      }

      return { success: true, passed: score >= course.quiz.passingScore };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getCourseById = (id) => {
    return courses.value.find((course) => course.id === parseInt(id));
  };

  const getUserProgress = (courseId) => {
    return userProgress.value[courseId] || null;
  };

  const getCertificateByCourseId = (courseId) => {
    return certificates.value.find(
      (cert) => cert.courseId === parseInt(courseId)
    );
  };

  return {
    // State
    courses,
    userProgress,
    certificates,
    isLoading,
    error,

    // Getters
    enrolledCourses,
    completedCourses,
    inProgressCourses,
    userCertificates,

    // Actions
    fetchCourses,
    enrollInCourse,
    updateLessonProgress,
    completeQuiz,
    getCourseById,
    getUserProgress,
    getCertificateByCourseId,
  };
});
