<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeAuth();

  // Apply dark mode on mount
  if (authStore.darkMode) {
    document.documentElement.classList.add("dark");
  }
});
</script>

<template>
  <div
    id="app"
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <!-- Main Content -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
