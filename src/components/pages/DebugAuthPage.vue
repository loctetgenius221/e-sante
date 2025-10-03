<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Debug Authentication
        </h1>

        <div class="space-y-4">
          <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              État d'authentification
            </h3>
            <p>
              <strong>Connecté :</strong> {{ isAuthenticated ? "Oui" : "Non" }}
            </p>
            <p><strong>Rôle :</strong> {{ userRole }}</p>
            <p><strong>Est Admin :</strong> {{ isAdmin ? "Oui" : "Non" }}</p>
            <p>
              <strong>Est Professionnel :</strong>
              {{ isProfessional ? "Oui" : "Non" }}
            </p>
            <p>
              <strong>Est Laboratoire :</strong>
              {{ isLaboratory ? "Oui" : "Non" }}
            </p>
          </div>

          <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Données utilisateur
            </h3>
            <pre
              class="text-sm text-gray-600 dark:text-gray-400 overflow-auto"
              >{{ JSON.stringify(user, null, 2) }}</pre
            >
          </div>

          <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Routes admin disponibles
            </h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="/admin/dashboard" class="text-blue-600 hover:underline"
                  >/admin/dashboard</a
                >
              </li>
              <li>
                <a href="/admin/users" class="text-blue-600 hover:underline"
                  >/admin/users</a
                >
              </li>
              <li>
                <a href="/admin/trainings" class="text-blue-600 hover:underline"
                  >/admin/trainings</a
                >
              </li>
              <li>
                <a
                  href="/admin/certificates"
                  class="text-blue-600 hover:underline"
                  >/admin/certificates</a
                >
              </li>
              <li>
                <a
                  href="/admin/laboratories"
                  class="text-blue-600 hover:underline"
                  >/admin/laboratories</a
                >
              </li>
              <li>
                <a href="/admin/analytics" class="text-blue-600 hover:underline"
                  >/admin/analytics</a
                >
              </li>
              <li>
                <a href="/admin/settings" class="text-blue-600 hover:underline"
                  >/admin/settings</a
                >
              </li>
            </ul>
          </div>

          <div class="flex space-x-4">
            <button
              @click="loginAsAdmin"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Se connecter en tant qu'Admin
            </button>
            <button
              @click="logout"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Se déconnecter
            </button>
            <button
              @click="refresh"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Actualiser
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userRole = computed(() => authStore.userRole);
const isAdmin = computed(() => authStore.isAdmin);
const isProfessional = computed(() => authStore.isProfessional);
const isLaboratory = computed(() => authStore.isLaboratory);
const user = computed(() => authStore.user);

const loginAsAdmin = async () => {
  await authStore.login({
    email: "admin@example.com",
    password: "password",
    role: "admin",
  });
};

const logout = () => {
  authStore.logout();
};

const refresh = () => {
  window.location.reload();
};
</script>

