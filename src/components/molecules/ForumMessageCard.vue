<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
  >
    <div class="flex items-start space-x-4">
      <!-- Avatar -->
      <div
        class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0"
      >
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ getInitials(message.author.name) }}
        </span>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Header -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              {{ message.author.name }}
            </h4>
            <BaseBadge :variant="getRoleVariant(message.author.role)" size="sm">
              {{ getRoleLabel(message.author.role) }}
            </BaseBadge>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(message.createdAt) }}
          </div>
        </div>

        <!-- Message Content -->
        <div class="prose dark:prose-invert max-w-none mb-4">
          <p
            class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
          >
            {{ message.content }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="toggleLike"
              class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg
                class="w-4 h-4"
                :class="{ 'text-red-500': isLiked }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{{ message.likes + (isLiked ? 1 : 0) }}</span>
            </button>

            <button
              class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>Répondre</span>
            </button>
          </div>

          <!-- More Actions -->
          <div class="relative">
            <button
              @click="showActions = !showActions"
              class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>

            <!-- Actions Dropdown -->
            <div
              v-if="showActions"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
            >
              <div class="py-1">
                <button
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="reportMessage"
                >
                  Signaler
                </button>
                <button
                  v-if="canEdit"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="editMessage"
                >
                  Modifier
                </button>
                <button
                  v-if="canDelete"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  @click="deleteMessage"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const authStore = useAuthStore();

const showActions = ref(false);
const isLiked = ref(false);

const canEdit = computed(() => {
  return authStore.user && authStore.user.id === props.message.author.id;
});

const canDelete = computed(() => {
  return (
    authStore.isAdmin ||
    (authStore.user && authStore.user.id === props.message.author.id)
  );
});

const getRoleVariant = (role) => {
  const variants = {
    pharmacist: "primary",
    doctor: "success",
    student: "secondary",
    sponsor: "warning",
    admin: "danger",
  };
  return variants[role] || "secondary";
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
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  // Here you would typically make an API call to update the like status
};

const reportMessage = () => {
  showActions.value = false;
  // Here you would typically open a report modal or make an API call
  console.log("Report message:", props.message.id);
};

const editMessage = () => {
  showActions.value = false;
  // Here you would typically open an edit modal
  console.log("Edit message:", props.message.id);
};

const deleteMessage = () => {
  showActions.value = false;
  // Here you would typically show a confirmation dialog and make an API call
  console.log("Delete message:", props.message.id);
};
</script>
