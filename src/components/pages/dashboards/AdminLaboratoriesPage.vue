<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Gestion des Laboratoires"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <BaseButton variant="primary" @click="showCreateLabModal = true">
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
        Nouveau laboratoire
      </BaseButton>
    </template>

    <!-- Filters -->
    <div class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BaseInput
          v-model="searchQuery"
          placeholder="Rechercher un laboratoire..."
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

        <BaseSelect v-model="selectedType" placeholder="Tous les types">
          <option value="">Tous les types</option>
          <option value="laboratory">Laboratoire</option>
          <option value="hospital">Hôpital</option>
          <option value="clinic">Clinique</option>
        </BaseSelect>

        <BaseSelect v-model="selectedStatus" placeholder="Tous les statuts">
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="pending">En attente</option>
          <option value="suspended">Suspendu</option>
        </BaseSelect>

        <BaseButton variant="outline" @click="resetFilters">
          Réinitialiser
        </BaseButton>
      </div>
    </div>

    <!-- Laboratories Table -->
    <BaseCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Laboratoire
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Formations
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Produits
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Inscription
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
              v-for="laboratory in filteredLaboratories"
              :key="laboratory.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="laboratory.logo || '/images/default-lab.jpg'"
                    :alt="laboratory.name"
                    class="h-12 w-12 rounded-lg object-cover"
                  />
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ laboratory.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ laboratory.email }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ laboratory.location }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BaseBadge :variant="getTypeVariant(laboratory.type)">
                  {{ getTypeLabel(laboratory.type) }}
                </BaseBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BaseBadge :variant="getStatusVariant(laboratory.status)">
                  {{ getStatusLabel(laboratory.status) }}
                </BaseBadge>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
              >
                {{ laboratory.trainingsCount }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
              >
                {{ laboratory.productsCount }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(laboratory.createdAt) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end space-x-2">
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="viewLaboratory(laboratory)"
                  >
                    Voir
                  </BaseButton>
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="editLaboratory(laboratory)"
                  >
                    Modifier
                  </BaseButton>
                  <BaseButton
                    v-if="laboratory.status === 'active'"
                    variant="danger"
                    size="sm"
                    @click="suspendLaboratory(laboratory)"
                  >
                    Suspendre
                  </BaseButton>
                  <BaseButton
                    v-else-if="laboratory.status === 'suspended'"
                    variant="success"
                    size="sm"
                    @click="activateLaboratory(laboratory)"
                  >
                    Activer
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
              Math.min(currentPage * itemsPerPage, filteredLaboratories.length)
            }}
            sur {{ filteredLaboratories.length }} laboratoires
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

    <!-- Create Laboratory Modal -->
    <BaseModal
      v-if="showCreateLabModal"
      title="Créer un nouveau laboratoire"
      @close="showCreateLabModal = false"
    >
      <form @submit.prevent="createLaboratory" class="space-y-4">
        <BaseInput
          v-model="newLaboratory.name"
          label="Nom du laboratoire"
          placeholder="Nom du laboratoire"
          required
        />
        <BaseInput
          v-model="newLaboratory.email"
          label="Email"
          type="email"
          placeholder="email@laboratoire.com"
          required
        />
        <BaseInput
          v-model="newLaboratory.location"
          label="Localisation"
          placeholder="Ville, Pays"
          required
        />
        <BaseSelect v-model="newLaboratory.type" label="Type" required>
          <option value="">Sélectionner un type</option>
          <option value="laboratory">Laboratoire</option>
          <option value="hospital">Hôpital</option>
          <option value="clinic">Clinique</option>
        </BaseSelect>
        <BaseInput
          v-model="newLaboratory.phone"
          label="Téléphone"
          placeholder="+221 XX XXX XX XX"
        />
        <div class="flex justify-end space-x-3">
          <BaseButton
            type="button"
            variant="outline"
            @click="showCreateLabModal = false"
          >
            Annuler
          </BaseButton>
          <BaseButton type="submit" variant="primary">
            Créer le laboratoire
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
const laboratories = ref([
  {
    id: 1,
    name: "Laboratoire Alpha",
    email: "contact@labalpha.com",
    location: "Dakar, Sénégal",
    type: "laboratory",
    status: "active",
    logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
    trainingsCount: 5,
    productsCount: 12,
    phone: "+221 33 123 45 67",
    createdAt: new Date("2024-02-26"),
  },
  {
    id: 2,
    name: "Hôpital Central",
    email: "admin@hopital-central.com",
    location: "Dakar, Sénégal",
    type: "hospital",
    status: "active",
    logo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop",
    trainingsCount: 3,
    productsCount: 8,
    phone: "+221 33 234 56 78",
    createdAt: new Date("2024-02-24"),
  },
  {
    id: 3,
    name: "Laboratoire Beta",
    email: "info@labbeta.com",
    location: "Thiès, Sénégal",
    type: "laboratory",
    status: "pending",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop",
    trainingsCount: 2,
    productsCount: 5,
    phone: "+221 33 345 67 89",
    createdAt: new Date("2024-02-23"),
  },
  {
    id: 4,
    name: "Clinique Saint-Louis",
    email: "contact@clinique-sl.com",
    location: "Saint-Louis, Sénégal",
    type: "clinic",
    status: "active",
    logo: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=100&h=100&fit=crop",
    trainingsCount: 1,
    productsCount: 3,
    phone: "+221 33 456 78 90",
    createdAt: new Date("2024-02-22"),
  },
  {
    id: 5,
    name: "Laboratoire Gamma",
    email: "admin@labgamma.com",
    location: "Kaolack, Sénégal",
    type: "laboratory",
    status: "suspended",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop",
    trainingsCount: 0,
    productsCount: 0,
    phone: "+221 33 567 89 01",
    createdAt: new Date("2024-02-21"),
  },
]);

// Filters
const searchQuery = ref("");
const selectedType = ref("");
const selectedStatus = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Modal
const showCreateLabModal = ref(false);
const newLaboratory = ref({
  name: "",
  email: "",
  location: "",
  type: "",
  phone: "",
});

// Computed
const filteredLaboratories = computed(() => {
  let filtered = laboratories.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (laboratory) =>
        laboratory.name.toLowerCase().includes(query) ||
        laboratory.email.toLowerCase().includes(query) ||
        laboratory.location.toLowerCase().includes(query)
    );
  }

  if (selectedType.value) {
    filtered = filtered.filter(
      (laboratory) => laboratory.type === selectedType.value
    );
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(
      (laboratory) => laboratory.status === selectedStatus.value
    );
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredLaboratories.value.length / itemsPerPage.value);
});

// Methods
const getTypeLabel = (type) => {
  const labels = {
    laboratory: "Laboratoire",
    hospital: "Hôpital",
    clinic: "Clinique",
  };
  return labels[type] || type;
};

const getStatusLabel = (status) => {
  const labels = {
    active: "Actif",
    pending: "En attente",
    suspended: "Suspendu",
  };
  return labels[status] || status;
};

const getTypeVariant = (type) => {
  const variants = {
    laboratory: "primary",
    hospital: "success",
    clinic: "info",
  };
  return variants[type] || "default";
};

const getStatusVariant = (status) => {
  const variants = {
    active: "success",
    pending: "warning",
    suspended: "danger",
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
  selectedType.value = "";
  selectedStatus.value = "";
  currentPage.value = 1;
};

const viewLaboratory = (laboratory) => {
  router.push(`/admin/laboratories/${laboratory.id}`);
};

const editLaboratory = (laboratory) => {
  console.log("Edit laboratory:", laboratory);
  // Implement edit logic
};

const suspendLaboratory = (laboratory) => {
  laboratory.status = "suspended";
  console.log("Laboratory suspended:", laboratory);
};

const activateLaboratory = (laboratory) => {
  laboratory.status = "active";
  console.log("Laboratory activated:", laboratory);
};

const createLaboratory = () => {
  const laboratory = {
    id: laboratories.value.length + 1,
    name: newLaboratory.value.name,
    email: newLaboratory.value.email,
    location: newLaboratory.value.location,
    type: newLaboratory.value.type,
    status: "active",
    logo: "/images/default-lab.jpg",
    trainingsCount: 0,
    productsCount: 0,
    phone: newLaboratory.value.phone,
    createdAt: new Date(),
  };

  laboratories.value.push(laboratory);
  showCreateLabModal.value = false;

  // Reset form
  newLaboratory.value = {
    name: "",
    email: "",
    location: "",
    type: "",
    phone: "",
  };
};

onMounted(() => {
  // Load laboratories data
});
</script>
