<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <AdminHeader />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Analytics Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Utilisateurs Total
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ adminStore.analytics.totalUsers }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Utilisateurs Actifs
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ adminStore.analytics.activeUsers }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Formations
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ adminStore.analytics.totalTrainings }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-orange-600 dark:text-orange-400"
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
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Certificats
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ adminStore.analytics.totalCertificates }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Users by Role -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <BaseCard>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Utilisateurs par Rôle
          </h3>
          <div class="space-y-3">
            <div
              v-for="(count, role) in adminStore.usersByRole"
              :key="role"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-3"
                  :class="getRoleColor(role)"
                ></div>
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {{ getRoleLabel(role) }}
                </span>
              </div>
              <span class="text-sm font-bold text-gray-900 dark:text-gray-100">
                {{ count }}
              </span>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Statut des Utilisateurs
          </h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Actifs
                </span>
              </div>
              <span class="text-sm font-bold text-gray-900 dark:text-gray-100">
                {{ adminStore.activeUsers.length }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Inactifs
                </span>
              </div>
              <span class="text-sm font-bold text-gray-900 dark:text-gray-100">
                {{ adminStore.inactiveUsers.length }}
              </span>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            Actions Rapides
          </h3>
          <div class="space-y-2">
            <BaseButton variant="outline" size="sm" full-width>
              Gérer les Formations
            </BaseButton>
            <BaseButton variant="outline" size="sm" full-width>
              Modérer le Forum
            </BaseButton>
            <BaseButton variant="outline" size="sm" full-width>
              Voir les Rapports
            </BaseButton>
            <BaseButton variant="outline" size="sm" full-width>
              Paramètres Système
            </BaseButton>
          </div>
        </BaseCard>
      </div>

      <!-- Users Management -->
      <BaseCard>
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Gestion des Utilisateurs
          </h3>
          <div class="flex items-center space-x-3">
            <SearchInput
              :model-value="searchQuery"
              placeholder="Rechercher un utilisateur..."
              @update:model-value="handleSearch"
              class="w-64"
            />
            <select
              v-model="statusFilter"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
            <select
              v-model="roleFilter"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Tous les rôles</option>
              <option value="pharmacist">Pharmaciens</option>
              <option value="doctor">Médecins</option>
              <option value="student">Étudiants</option>
              <option value="sponsor">Sponsors</option>
              <option value="admin">Administrateurs</option>
            </select>
          </div>
        </div>

        <!-- Users Table -->
        <div v-if="adminStore.isLoading" class="space-y-4">
          <div v-for="n in 5" :key="n" class="animate-pulse">
            <div class="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        <div v-else-if="filteredUsers.length > 0" class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
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
                  Activité
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Inscription
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
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
                      :src="user.avatar"
                      :alt="user.name"
                      class="h-10 w-10 rounded-full"
                    />
                    <div class="ml-4">
                      <div
                        class="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        {{ user.name }}
                        <span v-if="user.verified" class="ml-1">
                          <svg
                            class="w-4 h-4 text-blue-500 inline"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <BaseBadge :variant="getRoleVariant(user.role)">
                    {{ getRoleLabel(user.role) }}
                  </BaseBadge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <BaseBadge
                    :variant="user.status === 'active' ? 'success' : 'danger'"
                  >
                    {{ user.status === "active" ? "Actif" : "Inactif" }}
                  </BaseBadge>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  <div>{{ user.completedTrainings }} formations</div>
                  <div>{{ user.certificates }} certificats</div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ formatDate(user.joinedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <BaseButton
                      variant="outline"
                      size="sm"
                      @click="viewUser(user)"
                    >
                      Voir
                    </BaseButton>
                    <BaseButton
                      v-if="user.status === 'active'"
                      variant="outline"
                      size="sm"
                      @click="toggleUserStatus(user.id, 'inactive')"
                    >
                      Désactiver
                    </BaseButton>
                    <BaseButton
                      v-else
                      variant="primary"
                      size="sm"
                      @click="toggleUserStatus(user.id, 'active')"
                    >
                      Activer
                    </BaseButton>
                    <BaseButton
                      v-if="!user.verified"
                      variant="outline"
                      size="sm"
                      @click="verifyUser(user.id)"
                    >
                      Vérifier
                    </BaseButton>
                    <BaseButton
                      variant="danger"
                      size="sm"
                      @click="deleteUser(user.id)"
                    >
                      Supprimer
                    </BaseButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-12">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            Aucun utilisateur trouvé
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Aucun utilisateur ne correspond à vos critères de recherche.
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAdminStore } from "@/stores/admin";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";
import AdminHeader from "@/components/organisms/AdminHeader.vue";

const adminStore = useAdminStore();

const searchQuery = ref("");
const statusFilter = ref("");
const roleFilter = ref("");

const filteredUsers = computed(() => {
  let users = adminStore.users;

  // Filter by search query
  if (searchQuery.value) {
    users = adminStore.searchUsers(searchQuery.value);
  }

  // Filter by status
  if (statusFilter.value) {
    users = users.filter((user) => user.status === statusFilter.value);
  }

  // Filter by role
  if (roleFilter.value) {
    users = users.filter((user) => user.role === roleFilter.value);
  }

  return users;
});

const getRoleColor = (role) => {
  const colors = {
    pharmacist: "bg-blue-500",
    doctor: "bg-green-500",
    student: "bg-purple-500",
    sponsor: "bg-orange-500",
    admin: "bg-red-500",
  };
  return colors[role] || "bg-gray-500";
};

const getRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    sponsor: "Sponsor",
    admin: "Administrateur",
  };
  return labels[role] || role;
};

const getRoleVariant = (role) => {
  const variants = {
    pharmacist: "info",
    doctor: "success",
    student: "secondary",
    sponsor: "warning",
    admin: "danger",
  };
  return variants[role] || "default";
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const handleSearch = (value) => {
  searchQuery.value = value;
};

const viewUser = (user) => {
  // TODO: Implement user detail view
  console.log("View user:", user);
};

const toggleUserStatus = async (userId, newStatus) => {
  await adminStore.updateUserStatus(userId, newStatus);
  await adminStore.fetchAnalytics();
};

const verifyUser = async (userId) => {
  await adminStore.verifyUser(userId);
};

const deleteUser = async (userId) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    await adminStore.deleteUser(userId);
    await adminStore.fetchAnalytics();
  }
};

onMounted(async () => {
  await adminStore.fetchUsers();
  await adminStore.fetchAnalytics();
});
</script>
