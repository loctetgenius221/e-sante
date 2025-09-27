<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <h1
              class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              Messagerie Privée
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Communiquez en privé avec les membres du Club Digital
            </p>
          </div>
          <BaseButton
            variant="primary"
            @click="showNewMessageModal = true"
            class="mt-4 sm:mt-0"
          >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </template>
            Nouveau message
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Conversations List -->
        <div class="lg:col-span-1">
          <BaseCard>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Conversations
            </h3>

            <!-- Search -->
            <div class="mb-4">
              <SearchInput
                :model-value="searchQuery"
                placeholder="Rechercher une conversation..."
                @update:model-value="handleSearch"
                @search="handleSearchSubmit"
              />
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="space-y-3">
              <div v-for="n in 5" :key="n" class="animate-pulse">
                <div class="flex items-center space-x-3 p-3">
                  <div
                    class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"
                  ></div>
                  <div class="flex-1">
                    <div
                      class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"
                    ></div>
                    <div
                      class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-else-if="filteredConversations.length === 0"
              class="text-center py-8"
            >
              <div
                class="mx-auto h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4"
              >
                <svg
                  class="h-8 w-8 text-gray-400"
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
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                {{
                  searchQuery
                    ? "Aucune conversation trouvée"
                    : "Aucune conversation pour le moment"
                }}
              </p>
            </div>

            <!-- Conversations List -->
            <div v-else class="space-y-1">
              <button
                v-for="conversation in filteredConversations"
                :key="conversation.id"
                @click="selectConversation(conversation)"
                :class="getConversationClasses(conversation)"
                class="w-full text-left p-3 rounded-lg transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <div
                      class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
                    >
                      <span
                        class="text-sm font-medium text-gray-600 dark:text-gray-400"
                      >
                        {{ getInitials(conversation.participant.name) }}
                      </span>
                    </div>
                    <div
                      v-if="conversation.unreadCount > 0"
                      class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {{
                        conversation.unreadCount > 9
                          ? "9+"
                          : conversation.unreadCount
                      }}
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h4
                        class="font-medium text-gray-900 dark:text-gray-100 truncate"
                      >
                        {{ conversation.participant.name }}
                      </h4>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatDate(conversation.lastMessage.createdAt) }}
                      </span>
                    </div>
                    <p
                      class="text-sm text-gray-600 dark:text-gray-400 truncate"
                    >
                      {{ conversation.lastMessage.content }}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </BaseCard>
        </div>

        <!-- Chat Area -->
        <div class="lg:col-span-2">
          <div v-if="selectedConversation" class="h-[600px] flex flex-col">
            <!-- Chat Header -->
            <BaseCard class="rounded-b-none border-b-0">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
                  >
                    <span
                      class="text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      {{ getInitials(selectedConversation.participant.name) }}
                    </span>
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ selectedConversation.participant.name }}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ getRoleLabel(selectedConversation.participant.role) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Appel vidéo"
                  >
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Plus d'options"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </BaseCard>

            <!-- Messages -->
            <div
              class="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-y-auto p-4 space-y-4"
            >
              <div
                v-for="message in selectedConversation.messages"
                :key="message.id"
                :class="getMessageClasses(message)"
                class="flex"
              >
                <div class="max-w-xs lg:max-w-md">
                  <div
                    class="px-4 py-2 rounded-lg"
                    :class="
                      message.senderId === authStore.user?.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    "
                  >
                    <p class="text-sm">{{ message.content }}</p>
                    <p class="text-xs mt-1 opacity-70">
                      {{ formatTime(message.createdAt) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <BaseCard class="rounded-t-none border-t-0">
              <form @submit.prevent="sendMessage" class="flex space-x-3">
                <div class="flex-1">
                  <textarea
                    v-model="newMessage"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                    placeholder="Tapez votre message..."
                    @keydown.enter.exact.prevent="sendMessage"
                    @keydown.enter.shift.exact="newMessage += '\n'"
                  ></textarea>
                </div>
                <BaseButton
                  type="submit"
                  variant="primary"
                  :disabled="!newMessage.trim()"
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </BaseButton>
              </form>
            </BaseCard>
          </div>

          <!-- No Conversation Selected -->
          <div v-else class="h-[600px] flex items-center justify-center">
            <div class="text-center">
              <div
                class="mx-auto h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6"
              >
                <svg
                  class="h-12 w-12 text-gray-400"
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
              </div>
              <h3
                class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Sélectionnez une conversation
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Choisissez une conversation dans la liste pour commencer à
                échanger
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";

const authStore = useAuthStore();

const isLoading = ref(true);
const showNewMessageModal = ref(false);
const searchQuery = ref("");
const selectedConversation = ref(null);
const newMessage = ref("");

// Mock data - in a real app, this would come from a store or API
const conversations = ref([
  {
    id: 1,
    participant: {
      id: 2,
      name: "Dr. Aminata Diop",
      role: "pharmacist",
    },
    lastMessage: {
      content: "Merci pour votre aide sur la question des génériques",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    unreadCount: 2,
    messages: [
      {
        id: 1,
        content: "Bonjour, j'ai une question sur les médicaments génériques",
        senderId: 2,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        content: "Bien sûr, je peux vous aider. Quelle est votre question ?",
        senderId: 1,
        createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        content: "Merci pour votre aide sur la question des génériques",
        senderId: 2,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 2,
    participant: {
      id: 3,
      name: "Moussa Fall",
      role: "pharmacist",
    },
    lastMessage: {
      content: "Parfait, à bientôt !",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    unreadCount: 0,
    messages: [
      {
        id: 4,
        content: "Salut, comment ça va ?",
        senderId: 3,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 5,
        content: "Ça va bien, merci ! Et toi ?",
        senderId: 1,
        createdAt: new Date(
          Date.now() - 1.5 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: 6,
        content: "Parfait, à bientôt !",
        senderId: 3,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
]);

const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value;

  const query = searchQuery.value.toLowerCase();
  return conversations.value.filter((conversation) =>
    conversation.participant.name.toLowerCase().includes(query)
  );
});

const getConversationClasses = (conversation) => {
  const baseClasses = "hover:bg-gray-50 dark:hover:bg-gray-700";
  const selectedClasses = "bg-gray-100 dark:bg-gray-700";

  return selectedConversation.value?.id === conversation.id
    ? `${baseClasses} ${selectedClasses}`
    : baseClasses;
};

const getMessageClasses = (message) => {
  return message.senderId === authStore.user?.id
    ? "justify-end"
    : "justify-start";
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

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleSearch = (value) => {
  searchQuery.value = value;
};

const handleSearchSubmit = (value) => {
  searchQuery.value = value;
};

const selectConversation = (conversation) => {
  selectedConversation.value = conversation;
  // Mark messages as read
  conversation.unreadCount = 0;
};

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedConversation.value) return;

  const message = {
    id: Date.now(),
    content: newMessage.value.trim(),
    senderId: authStore.user?.id || 1,
    createdAt: new Date().toISOString(),
  };

  selectedConversation.value.messages.push(message);
  selectedConversation.value.lastMessage = {
    content: message.content,
    createdAt: message.createdAt,
  };

  newMessage.value = "";
};

onMounted(async () => {
  // Simulate loading conversations
  await new Promise((resolve) => setTimeout(resolve, 500));
  isLoading.value = false;
});
</script>
