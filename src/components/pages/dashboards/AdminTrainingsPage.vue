<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Gestion des Formations"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <BaseButton variant="primary" @click="showCreateTrainingModal = true">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </template>
        Nouvelle formation
      </BaseButton>
    </template>

    <!-- Filters -->
    <div class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BaseInput
          v-model="searchQuery"
          placeholder="Rechercher une formation..."
          type="search"
        >
          <template #icon-left>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </template>
        </BaseInput>

        <BaseSelect v-model="selectedStatus" placeholder="Tous les statuts">
          <option value="">Tous les statuts</option>
          <option value="draft">Brouillon</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvée</option>
          <option value="rejected">Rejetée</option>
        </BaseSelect>

        <BaseSelect
          v-model="selectedCategory"
          placeholder="Toutes les catégories"
        >
          <option value="">Toutes les catégories</option>
          <option value="pharmacology">Pharmacologie</option>
          <option value="clinical">Clinique</option>
          <option value="research">Recherche</option>
          <option value="management">Gestion</option>
        </BaseSelect>

        <BaseButton variant="outline" @click="resetFilters">
          Réinitialiser
        </BaseButton>
      </div>
    </div>

    <!-- Trainings Table -->
    <BaseCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Formation
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Créateur
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Catégorie
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Participants
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Créée le
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr
              v-for="training in filteredTrainings"
              :key="training.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-12 w-12 flex-shrink-0">
                    <img
                      :src="training.image || '/images/default-training.jpg'"
                      :alt="training.title"
                      class="h-12 w-12 rounded-lg object-cover"
                    />
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ training.title }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ training.description }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-gray-100">
                  {{ training.creatorName }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ training.creatorRole }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BaseBadge :variant="getCategoryVariant(training.category)">
                  {{ getCategoryLabel(training.category) }}
                </BaseBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BaseBadge :variant="getStatusVariant(training.status)">
                  {{ getStatusLabel(training.status) }}
                </BaseBadge>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
              >
                {{ training.participants }}/{{ training.maxParticipants }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(training.createdAt) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end space-x-2">
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="viewTraining(training)"
                  >
                    Voir
                  </BaseButton>
                  <BaseButton
                    v-if="training.status === 'pending'"
                    variant="success"
                    size="sm"
                    @click="approveTraining(training)"
                  >
                    Approuver
                  </BaseButton>
                  <BaseButton
                    v-if="training.status === 'pending'"
                    variant="danger"
                    size="sm"
                    @click="rejectTraining(training)"
                  >
                    Rejeter
                  </BaseButton>
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="editTraining(training)"
                  >
                    Modifier
                  </BaseButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Affichage de {{ (currentPage - 1) * itemsPerPage + 1 }} à
            {{
              Math.min(currentPage * itemsPerPage, filteredTrainings.length)
            }}
            sur {{ filteredTrainings.length }} formations
          </div>
          <div class="flex items-center space-x-2">
            <BaseButton
              variant="outline"
              size="sm"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              Précédent
            </BaseButton>
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Page {{ currentPage }} sur {{ totalPages }}
            </span>
            <BaseButton
              variant="outline"
              size="sm"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Suivant
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Create Training Modal -->
    <BaseModal
      v-if="showCreateTrainingModal"
      title="Créer une nouvelle formation"
      @close="showCreateTrainingModal = false"
    >
      <form @submit.prevent="createTraining" class="space-y-4">
        <BaseInput
          v-model="newTraining.title"
          label="Titre de la formation"
          placeholder="Titre de la formation"
          required
        />
        <BaseInput
          v-model="newTraining.description"
          label="Description"
          placeholder="Description de la formation"
          type="textarea"
          required
        />
        <BaseSelect v-model="newTraining.category" label="Catégorie" required>
          <option value="">Sélectionner une catégorie</option>
          <option value="pharmacology">Pharmacologie</option>
          <option value="clinical">Clinique</option>
          <option value="research">Recherche</option>
          <option value="management">Gestion</option>
        </BaseSelect>
        <BaseInput
          v-model="newTraining.duration"
          label="Durée (heures)"
          type="number"
          placeholder="Durée en heures"
          required
        />
        <BaseInput
          v-model="newTraining.maxParticipants"
          label="Nombre maximum de participants"
          type="number"
          placeholder="Nombre maximum"
          required
        />
        <div class="flex justify-end space-x-3">
          <BaseButton
            type="button"
            variant="outline"
            @click="showCreateTrainingModal = false"
          >
            Annuler
          </BaseButton>
          <BaseButton type="submit" variant="primary">
            Créer la formation
          </BaseButton>
        </div>
      </form>
    </BaseModal>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseSelect from "@/components/atoms/BaseSelect.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";

// Composables
const router = useRouter();

// Navigation items for sidebar
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/admin/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Utilisateurs",
    href: "/admin/users",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    name: "Formations",
    href: "/admin/trainings",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    name: "Certificats",
    href: "/admin/certificates",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Laboratoires",
    href: "/admin/laboratories",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    iconPath:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
]);

// Data
const trainings = ref([
  {
    id: 1,
    title: "Pharmacovigilance 2024",
    description:
      "Formation complète sur la pharmacovigilance et la sécurité des médicaments",
    category: "pharmacology",
    status: "approved",
    creatorName: "Dr. Marie Diallo",
    creatorRole: "Pharmacien",
    participants: 45,
    maxParticipants: 50,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    createdAt: new Date("2024-02-28"),
  },
  {
    id: 2,
    title: "Gestion des urgences cliniques",
    description:
      "Formation sur la gestion des situations d'urgence en milieu hospitalier",
    category: "clinical",
    status: "pending",
    creatorName: "Hôpital Central",
    creatorRole: "Hôpital",
    participants: 0,
    maxParticipants: 30,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
    createdAt: new Date("2024-02-27"),
  },
  {
    id: 3,
    title: "Recherche clinique avancée",
    description: "Méthodologie et bonnes pratiques en recherche clinique",
    category: "research",
    status: "approved",
    creatorName: "Laboratoire Beta",
    creatorRole: "Laboratoire",
    participants: 23,
    maxParticipants: 25,
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop",
    createdAt: new Date("2024-02-26"),
  },
  {
    id: 4,
    title: "Gestion de la pharmacie",
    description:
      "Formation sur la gestion administrative et financière d'une pharmacie",
    category: "management",
    status: "draft",
    creatorName: "Dr. Fatou Sarr",
    creatorRole: "Pharmacien",
    participants: 0,
    maxParticipants: 20,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    createdAt: new Date("2024-02-25"),
  },
]);

// Filters
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedCategory = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Modal
const showCreateTrainingModal = ref(false);
const newTraining = ref({
  title: "",
  description: "",
  category: "",
  duration: "",
  maxParticipants: "",
});

// Computed
const filteredTrainings = computed(() => {
  let filtered = trainings.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (training) =>
        training.title.toLowerCase().includes(query) ||
        training.description.toLowerCase().includes(query)
    );
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(
      (training) => training.status === selectedStatus.value
    );
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (training) => training.category === selectedCategory.value
    );
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredTrainings.value.length / itemsPerPage.value);
});

// Methods
const getCategoryLabel = (category) => {
  const labels = {
    pharmacology: "Pharmacologie",
    clinical: "Clinique",
    research: "Recherche",
    management: "Gestion",
  };
  return labels[category] || category;
};

const getStatusLabel = (status) => {
  const labels = {
    draft: "Brouillon",
    pending: "En attente",
    approved: "Approuvée",
    rejected: "Rejetée",
  };
  return labels[status] || status;
};

const getCategoryVariant = (category) => {
  const variants = {
    pharmacology: "primary",
    clinical: "success",
    research: "info",
    management: "warning",
  };
  return variants[category] || "default";
};

const getStatusVariant = (status) => {
  const variants = {
    draft: "secondary",
    pending: "warning",
    approved: "success",
    rejected: "danger",
  };
  return variants[status] || "default";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = "";
  selectedCategory.value = "";
  currentPage.value = 1;
};

const viewTraining = (training) => {
  router.push(`/admin/trainings/${training.id}`);
};

const editTraining = (training) => {
  console.log("Edit training:", training);
  // Implement edit logic
};

const approveTraining = (training) => {
  training.status = "approved";
  console.log("Training approved:", training);
};

const rejectTraining = (training) => {
  training.status = "rejected";
  console.log("Training rejected:", training);
};

const createTraining = () => {
  const training = {
    id: trainings.value.length + 1,
    title: newTraining.value.title,
    description: newTraining.value.description,
    category: newTraining.value.category,
    status: "draft",
    creatorName: "Admin",
    creatorRole: "Administrateur",
    participants: 0,
    maxParticipants: parseInt(newTraining.value.maxParticipants),
    image: "/images/default-training.jpg",
    createdAt: new Date(),
  };

  trainings.value.push(training);
  showCreateTrainingModal.value = false;

  // Reset form
  newTraining.value = {
    title: "",
    description: "",
    category: "",
    duration: "",
    maxParticipants: "",
  };
};

onMounted(() => {
  // Load trainings data
});
</script>
