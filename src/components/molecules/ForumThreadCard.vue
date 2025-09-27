<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
    :class="{
      'border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20':
        pinned,
    }"
    @click="$emit('click')"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <!-- Header -->
        <div class="flex items-center space-x-2 mb-2">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate"
          >
            {{ thread.title }}
          </h3>
          <BaseBadge v-if="pinned" variant="warning" size="sm">
            <template #icon-left>
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </template>
            Épinglé
          </BaseBadge>
          <BaseBadge :variant="getCategoryVariant(thread.category)" size="sm">
            {{ thread.category }}
          </BaseBadge>
        </div>

        <!-- Content Preview -->
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {{ thread.content }}
        </p>

        <!-- Tags -->
        <div
          v-if="thread.tags && thread.tags.length > 0"
          class="flex flex-wrap gap-2 mb-4"
        >
          <BaseBadge
            v-for="tag in thread.tags.slice(0, 3)"
            :key="tag"
            variant="secondary"
            size="sm"
          >
            #{{ tag }}
          </BaseBadge>
          <span
            v-if="thread.tags.length > 3"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            +{{ thread.tags.length - 3 }} autres
          </span>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <div
            class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
          >
            <!-- Author -->
            <div class="flex items-center">
              <div
                class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-2"
              >
                <span
                  class="text-xs font-medium text-gray-600 dark:text-gray-400"
                >
                  {{ getInitials(thread.author.name) }}
                </span>
              </div>
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  {{ thread.author.name }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ getRoleLabel(thread.author.role) }}
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex items-center space-x-4">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {{ thread.replies }}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {{ thread.views }}
              </div>
            </div>
          </div>

          <!-- Date -->
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(thread.updatedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const props = defineProps({
  thread: {
    type: Object,
    required: true,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const getCategoryVariant = (category) => {
  const variants = {
    Réglementation: "danger",
    Gestion: "primary",
    Formation: "success",
    Technique: "warning",
    Général: "secondary",
  };
  return variants[category] || "secondary";
};

const getRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    sponsor: "Partenaire",
    admin: "Administrateur",
  };
  return labels[role] || role;
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
