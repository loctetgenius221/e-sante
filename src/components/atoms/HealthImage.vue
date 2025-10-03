<template>
  <div class="relative">
    <img
      :src="src"
      :alt="alt"
      :class="imageClass"
      :loading="loading"
      @error="handleImageError"
      @load="handleImageLoad"
    />

    <!-- Loading state -->
    <div
      v-if="isLoading"
      :class="fallbackClass"
      class="flex flex-col items-center justify-center text-center"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"
      ></div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Chargement...</div>
    </div>

    <!-- Fallback content when image fails to load -->
    <div
      v-if="showFallback"
      :class="fallbackClass"
      class="flex flex-col items-center justify-center text-center"
    >
      <div
        class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4"
      >
        <HealthIcon :name="fallbackIcon" class="w-8 h-8 text-gray-400" />
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ fallbackText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HealthIcon from "./HealthIcon.vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  imageClass: {
    type: String,
    default: "w-full h-full object-cover",
  },
  loading: {
    type: String,
    default: "lazy",
  },
  fallbackIcon: {
    type: String,
    default: "health-cross",
  },
  fallbackText: {
    type: String,
    default: "Image en cours de chargement...",
  },
  fallbackClass: {
    type: String,
    default:
      "absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center",
  },
});

const showFallback = ref(false);
const isLoading = ref(true);

const handleImageError = () => {
  showFallback.value = true;
  isLoading.value = false;
};

const handleImageLoad = () => {
  isLoading.value = false;
  showFallback.value = false;
};
</script>
