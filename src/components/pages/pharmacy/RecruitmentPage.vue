<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <h1
              class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              Recrutement
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Trouvez des opportunités d'emploi ou publiez vos offres
            </p>
          </div>
          <BaseButton
            variant="primary"
            @click="showNewJobModal = true"
            class="mt-4 sm:mt-0"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </template>
            Publier une offre
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Jobs List -->
      <div class="space-y-4">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ job.title }}
                </h3>
                <BaseBadge :variant="getJobTypeVariant(job.type)">
                  {{ getJobTypeLabel(job.type) }}
                </BaseBadge>
                <BaseBadge v-if="job.urgent" variant="danger" size="sm">
                  Urgent
                </BaseBadge>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-3">
                {{ job.company }} • {{ getLocationLabel(job.location) }}
              </p>

              <p class="text-gray-700 dark:text-gray-300 mb-4">
                {{ job.description }}
              </p>

              <div class="flex items-center justify-between">
                <div
                  class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ formatDate(job.createdAt) }}
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {{ job.experience }}
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    {{ job.salary }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <BaseButton variant="outline" size="sm" @click="viewJob(job)">
                Voir détails
              </BaseButton>
              <BaseButton variant="primary" size="sm" @click="applyToJob(job)">
                Postuler
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Job Modal -->
    <BaseModal
      :show="showNewJobModal"
      @close="showNewJobModal = false"
      size="lg"
    >
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Publier une offre d'emploi
        </h3>

        <form @submit.prevent="handleCreateJob" class="space-y-6">
          <BaseInput
            v-model="newJob.title"
            label="Titre du poste"
            placeholder="Ex: Pharmacien adjoint"
            required
          />

          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="newJob.company"
              label="Entreprise"
              placeholder="Nom de votre pharmacie"
              required
            />
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Localisation
              </label>
              <select
                v-model="newJob.location"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Sélectionner une ville</option>
                <option value="dakar">Dakar</option>
                <option value="thies">Thiès</option>
                <option value="kaolack">Kaolack</option>
                <option value="saint-louis">Saint-Louis</option>
                <option value="ziguinchor">Ziguinchor</option>
              </select>
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description du poste
            </label>
            <textarea
              v-model="newJob.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Décrivez les responsabilités et exigences du poste..."
              required
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Type de contrat
              </label>
              <select
                v-model="newJob.type"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="full-time">Temps plein</option>
                <option value="part-time">Temps partiel</option>
                <option value="contract">Contrat</option>
                <option value="internship">Stage</option>
              </select>
            </div>
            <BaseInput
              v-model="newJob.experience"
              label="Expérience requise"
              placeholder="Ex: 2-5 ans"
              required
            />
          </div>

          <BaseInput
            v-model="newJob.salary"
            label="Salaire proposé"
            placeholder="Ex: 150 000 - 200 000 FCFA"
            required
          />

          <div class="flex justify-end space-x-3">
            <BaseButton
              type="button"
              variant="outline"
              @click="showNewJobModal = false"
            >
              Annuler
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              :loading="isCreatingJob"
            >
              Publier l'offre
            </BaseButton>
          </div>
        </form>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const isCreatingJob = ref(false);
const showNewJobModal = ref(false);

const newJob = reactive({
  title: "",
  company: "",
  location: "",
  description: "",
  type: "",
  experience: "",
  salary: "",
});

// Mock data
const jobs = ref([
  {
    id: 1,
    title: "Pharmacien adjoint",
    company: "Pharmacie du Centre",
    location: "dakar",
    type: "full-time",
    experience: "2-5 ans",
    salary: "150 000 - 200 000 FCFA",
    description:
      "Nous recherchons un pharmacien adjoint pour rejoindre notre équipe. Responsabilités: conseil client, gestion des stocks, délivrance des ordonnances.",
    urgent: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: "Préparateur en pharmacie",
    company: "Pharmacie de la Paix",
    location: "thies",
    type: "full-time",
    experience: "0-2 ans",
    salary: "80 000 - 120 000 FCFA",
    description:
      "Poste de préparateur en pharmacie pour débutant. Formation fournie. Travail en équipe dans une pharmacie moderne.",
    urgent: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: "Stagiaire pharmacien",
    company: "Pharmacie de l'Espoir",
    location: "kaolack",
    type: "internship",
    experience: "Étudiant",
    salary: "Gratification",
    description:
      "Stage de fin d'études pour étudiant en pharmacie. Encadrement par des pharmaciens expérimentés.",
    urgent: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]);

const getJobTypeVariant = (type) => {
  const variants = {
    "full-time": "primary",
    "part-time": "secondary",
    contract: "warning",
    internship: "success",
  };
  return variants[type] || "secondary";
};

const getJobTypeLabel = (type) => {
  const labels = {
    "full-time": "Temps plein",
    "part-time": "Temps partiel",
    contract: "Contrat",
    internship: "Stage",
  };
  return labels[type] || type;
};

const getLocationLabel = (location) => {
  const labels = {
    dakar: "Dakar",
    thies: "Thiès",
    kaolack: "Kaolack",
    "saint-louis": "Saint-Louis",
    ziguinchor: "Ziguinchor",
  };
  return labels[location] || location;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return "À l'instant";
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`;
  } else if (diffInHours < 48) {
    return "Hier";
  } else {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  }
};

const viewJob = (job) => {
  console.log("View job:", job.id);
};

const applyToJob = (job) => {
  console.log("Apply to job:", job.id);
};

const handleCreateJob = async () => {
  isCreatingJob.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const job = {
      id: Date.now(),
      ...newJob,
      urgent: false,
      createdAt: new Date().toISOString(),
    };

    jobs.value.unshift(job);
    showNewJobModal.value = false;

    // Reset form
    Object.keys(newJob).forEach((key) => {
      newJob[key] = "";
    });
  } catch (error) {
    console.error("Error creating job:", error);
  } finally {
    isCreatingJob.value = false;
  }
};

onMounted(() => {
  // Load data
});
</script>
