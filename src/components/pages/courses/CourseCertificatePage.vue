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
              <span class="text-gray-700 dark:text-gray-300">Certificat</span>
            </nav>

            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Certificat de Formation
            </h1>
          </div>

          <div class="flex space-x-3">
            <BaseButton variant="outline" @click="downloadCertificate">
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
              Télécharger PDF
            </BaseButton>

            <BaseButton variant="outline" @click="shareCertificate">
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </template>
              Partager
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Certificate -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <!-- Certificate Header -->
        <div
          class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 text-center"
        >
          <div class="mb-4">
            <svg
              class="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h1 class="text-3xl font-bold mb-2">CERTIFICAT DE FORMATION</h1>
          <p class="text-blue-100">
            Front E-Santé - Plateforme de Formation Continue
          </p>
        </div>

        <!-- Certificate Body -->
        <div class="p-8">
          <div class="text-center mb-8">
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Ce certificat atteste que
            </p>
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ authStore.user?.name }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              {{ getRoleLabel(authStore.user?.role) }}
            </p>
          </div>

          <div class="text-center mb-8">
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
              a suivi avec succès la formation
            </p>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              {{ course?.title }}
            </h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div
                    class="text-2xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    {{ course?.duration }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Durée de Formation
                  </div>
                </div>
                <div>
                  <div
                    class="text-2xl font-bold text-green-600 dark:text-green-400"
                  >
                    {{ certificate?.quizScore }}%
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Score au Quiz
                  </div>
                </div>
                <div>
                  <div
                    class="text-2xl font-bold text-purple-600 dark:text-purple-400"
                  >
                    {{ formatDate(certificate?.issuedAt) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Date d'Obtention
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mb-8">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Cette formation couvre les compétences suivantes :
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="skill in course?.learningObjectives"
                :key="skill"
                class="flex items-center space-x-2"
              >
                <svg
                  class="w-5 h-5 text-green-500"
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
                <span class="text-gray-700 dark:text-gray-300">{{
                  skill
                }}</span>
              </div>
            </div>
          </div>

          <!-- Certificate Footer -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="text-center">
                <div class="mb-4">
                  <div
                    class="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-12 h-12 text-gray-400"
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
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Dr. Marie Diallo
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Directrice de la Formation
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Front E-Santé
                </p>
              </div>

              <div class="text-center">
                <div class="mb-4">
                  <div
                    class="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-12 h-12 text-gray-400"
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
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Prof. Amadou Ba
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Expert en Pharmacovigilance
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Université Cheikh Anta Diop
                </p>
              </div>
            </div>
          </div>

          <!-- Certificate ID -->
          <div class="mt-8 text-center">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Certificat ID: {{ certificate?.id }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Vérifiez ce certificat sur: https://frontesante.sn/verify/{{
                certificate?.id
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton variant="primary" @click="downloadCertificate">
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
          Télécharger en PDF
        </BaseButton>

        <BaseButton variant="outline" @click="shareCertificate">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </template>
          Partager sur LinkedIn
        </BaseButton>

        <BaseButton variant="outline" @click="goToDashboard">
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
              />
            </svg>
          </template>
          Retour au Dashboard
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseButton from "@/components/atoms/BaseButton.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const courseId = computed(() => route.params.courseId);
const course = ref(null);
const certificate = ref(null);

// Mock data
const mockCourse = {
  id: 1,
  title: "Pharmacovigilance et Sécurité des Médicaments",
  duration: "4h 30min",
  learningObjectives: [
    "Comprendre les principes de la pharmacovigilance",
    "Identifier les effets indésirables des médicaments",
    "Mettre en place des procédures de surveillance",
    "Utiliser les outils de signalement appropriés",
  ],
};

const mockCertificate = {
  id: "CERT-2024-001234",
  courseId: 1,
  userId: 1,
  quizScore: 85,
  issuedAt: new Date().toISOString(),
  validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
};

const getRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    midwife: "Sage-femme",
  };
  return labels[role] || role;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const downloadCertificate = () => {
  // In a real app, this would generate and download a PDF
  console.log("Downloading certificate PDF...");

  // Simulate PDF generation
  const link = document.createElement("a");
  link.href = "#"; // In real app, this would be the PDF URL
  link.download = `certificat-${course.value?.title
    .replace(/\s+/g, "-")
    .toLowerCase()}.pdf`;
  link.click();

  // Show success message
  alert("Certificat téléchargé avec succès !");
};

const shareCertificate = () => {
  // In a real app, this would open LinkedIn sharing or copy link
  const shareText = `J'ai obtenu mon certificat de formation "${course.value?.title}" sur Front E-Santé ! 🎓`;
  const shareUrl = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: "Mon Certificat de Formation",
      text: shareText,
      url: shareUrl,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    alert("Lien copié dans le presse-papiers !");
  }
};

const goToDashboard = () => {
  router.push("/professional-dashboard");
};

onMounted(async () => {
  try {
    // Simulate API calls
    await new Promise((resolve) => setTimeout(resolve, 1000));
    course.value = mockCourse;
    certificate.value = mockCertificate;
  } catch (error) {
    console.error("Error loading certificate:", error);
  }
});
</script>
