<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Gestion des Utilisateurs"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <BaseButton variant="primary" @click="showCreateUserModal = true">
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
        Nouvel utilisateur
      </BaseButton>
    </template>

    <!-- Filters -->
    <div class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BaseInput
          v-model="searchQuery"
          placeholder="Rechercher un utilisateur..."
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

        <BaseSelect v-model="selectedRole" placeholder="Tous les rôles">
          <option value="">Tous les rôles</option>
          <option value="pharmacist">Pharmacien</option>
          <option value="doctor">Médecin</option>
          <option value="student">Étudiant</option>
          <option value="midwife">Sage-femme</option>
          <option value="laboratory">Laboratoire</option>
          <option value="hospital">Hôpital</option>
          <option value="clinic">Clinique</option>
          <option value="admin">Administrateur</option>
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

    <!-- Users Table -->
    <BaseCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Utilisateur
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Rôle
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Inscription
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Dernière activité
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
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="user.avatar || '/images/default-avatar.jpg'"
                    :alt="user.name"
                    class="h-10 w-10 rounded-full"
                  />
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BaseBadge :variant="getRoleVariant(user.role)">
                  {{ getUserRoleLabel(user.role) }}
                </BaseBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BaseBadge :variant="getStatusVariant(user.status)">
                  {{ getUserStatusLabel(user.status) }}
                </BaseBadge>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(user.createdAt) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              >
                {{ formatDate(user.lastActivity) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end space-x-2">
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="viewUser(user)"
                  >
                    Voir
                  </BaseButton>
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="editUser(user)"
                  >
                    Modifier
                  </BaseButton>
                  <BaseButton
                    v-if="user.status === 'active'"
                    variant="danger"
                    size="sm"
                    @click="suspendUser(user)"
                  >
                    Suspendre
                  </BaseButton>
                  <BaseButton
                    v-else-if="user.status === 'suspended'"
                    variant="success"
                    size="sm"
                    @click="activateUser(user)"
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
            {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} sur
            {{ filteredUsers.length }} utilisateurs
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

    <!-- Create User Modal -->
    <BaseModal
      v-if="showCreateUserModal"
      title="Créer un nouvel utilisateur"
      @close="showCreateUserModal = false"
    >
      <form @submit.prevent="createUser" class="space-y-4">
        <BaseInput
          v-model="newUser.name"
          label="Nom complet"
          placeholder="Nom complet"
          required
        />
        <BaseInput
          v-model="newUser.email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
        />
        <BaseSelect v-model="newUser.role" label="Rôle" required>
          <option value="">Sélectionner un rôle</option>
          <option value="pharmacist">Pharmacien</option>
          <option value="doctor">Médecin</option>
          <option value="student">Étudiant</option>
          <option value="midwife">Sage-femme</option>
          <option value="laboratory">Laboratoire</option>
          <option value="hospital">Hôpital</option>
          <option value="clinic">Clinique</option>
          <option value="admin">Administrateur</option>
        </BaseSelect>
        <BaseInput
          v-model="newUser.password"
          label="Mot de passe"
          type="password"
          placeholder="Mot de passe"
          required
        />
        <div class="flex justify-end space-x-3">
          <BaseButton
            type="button"
            variant="outline"
            @click="showCreateUserModal = false"
          >
            Annuler
          </BaseButton>
          <BaseButton type="submit" variant="primary">
            Créer l'utilisateur
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
const users = ref([
  {
    id: 1,
    name: "Dr. Fatou Sarr",
    email: "fatou.sarr@example.com",
    role: "pharmacist",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-28"),
    lastActivity: new Date("2024-03-01"),
  },
  {
    id: 2,
    name: "Dr. Ibrahima Ba",
    email: "ibrahima.ba@example.com",
    role: "doctor",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-27"),
    lastActivity: new Date("2024-03-01"),
  },
  {
    id: 3,
    name: "Laboratoire Alpha",
    email: "contact@labalpha.com",
    role: "laboratory",
    status: "pending",
    avatar:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-26"),
    lastActivity: new Date("2024-02-28"),
  },
  {
    id: 4,
    name: "Marie Diallo",
    email: "marie.diallo@example.com",
    role: "student",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-25"),
    lastActivity: new Date("2024-03-01"),
  },
  {
    id: 5,
    name: "Hôpital Central",
    email: "admin@hopital-central.com",
    role: "hospital",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face",
    createdAt: new Date("2024-02-24"),
    lastActivity: new Date("2024-02-28"),
  },
]);

// Filters
const searchQuery = ref("");
const selectedRole = ref("");
const selectedStatus = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Modal
const showCreateUserModal = ref(false);
const newUser = ref({
  name: "",
  email: "",
  role: "",
  password: "",
});

// Computed
const filteredUsers = computed(() => {
  let filtered = users.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  if (selectedRole.value) {
    filtered = filtered.filter((user) => user.role === selectedRole.value);
  }

  if (selectedStatus.value) {
    filtered = filtered.filter((user) => user.status === selectedStatus.value);
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
});

// Methods
const getUserRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    midwife: "Sage-femme",
    laboratory: "Laboratoire",
    hospital: "Hôpital",
    clinic: "Clinique",
    admin: "Administrateur",
  };
  return labels[role] || role;
};

const getUserStatusLabel = (status) => {
  const labels = {
    active: "Actif",
    pending: "En attente",
    suspended: "Suspendu",
  };
  return labels[status] || status;
};

const getRoleVariant = (role) => {
  const variants = {
    pharmacist: "primary",
    doctor: "success",
    student: "info",
    midwife: "warning",
    laboratory: "secondary",
    hospital: "danger",
    clinic: "info",
    admin: "dark",
  };
  return variants[role] || "default";
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
  selectedRole.value = "";
  selectedStatus.value = "";
  currentPage.value = 1;
};

const viewUser = (user) => {
  router.push(`/admin/users/${user.id}`);
};

const editUser = (user) => {
  console.log("Edit user:", user);
  // Implement edit logic
};

const suspendUser = (user) => {
  user.status = "suspended";
  console.log("User suspended:", user);
};

const activateUser = (user) => {
  user.status = "active";
  console.log("User activated:", user);
};

const createUser = () => {
  const user = {
    id: users.value.length + 1,
    name: newUser.value.name,
    email: newUser.value.email,
    role: newUser.value.role,
    status: "active",
    avatar: "/images/default-avatar.jpg",
    createdAt: new Date(),
    lastActivity: new Date(),
  };

  users.value.push(user);
  showCreateUserModal.value = false;

  // Reset form
  newUser.value = {
    name: "",
    email: "",
    role: "",
    password: "",
  };
};

onMounted(() => {
  // Load users data
});
</script>
