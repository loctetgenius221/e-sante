<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Page non trouvée
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
      </div>

      <div class="space-y-4">
        <BaseButton variant="primary" size="lg" @click="$router.push('/')">
          <template #icon-left>
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </template>
          Retour à l'accueil
        </BaseButton>

        <BaseButton variant="outline" size="lg" @click="$router.back()">
          <template #icon-left>
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </template>
          Page précédente
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/atoms/BaseButton.vue";
</script>
