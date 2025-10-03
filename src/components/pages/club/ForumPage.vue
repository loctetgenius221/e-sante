<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Forum du Club Digital"
  >
    <!-- Header Actions -->
    <div class="mb-6">
      <BaseButton variant="primary" @click="showCreateThreadModal = true">
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
        Nouveau sujet
      </BaseButton>
    </div>

    <div class="space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Search -->
          <BaseCard class="mb-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Rechercher
            </h3>
            <SearchInput
              :model-value="forumStore.searchQuery"
              placeholder="Rechercher dans le forum..."
              @update:model-value="handleSearch"
              @search="handleSearchSubmit"
            />
          </BaseCard>

          <!-- Categories -->
          <BaseCard class="mb-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Catégories
            </h3>
            <div class="space-y-2">
              <button
                @click="forumStore.setSelectedCategory('')"
                :class="getCategoryButtonClasses('')"
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              >
                Toutes les catégories
              </button>
              <button
                v-for="category in forumStore.categories"
                :key="category"
                @click="forumStore.setSelectedCategory(category)"
                :class="getCategoryButtonClasses(category)"
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              >
                {{ category }}
              </button>
            </div>
          </BaseCard>

          <!-- Stats -->
          <BaseCard>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Statistiques
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Sujets</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ forumStore.threads.length }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Messages</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ totalMessages }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Membres actifs</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ activeMembers }}
                </span>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Loading State -->
          <div v-if="isLoading" class="space-y-4">
            <div v-for="n in 5" :key="n" class="animate-pulse">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"
                ></div>
              </div>
            </div>
          </div>

          <!-- Pinned Threads -->
          <div v-else-if="forumStore.pinnedThreads.length > 0" class="mb-8">
            <h2
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center"
            >
              <svg
                class="w-5 h-5 mr-2 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              Sujets épinglés
            </h2>
            <div class="space-y-4">
              <ForumThreadCard
                v-for="thread in forumStore.pinnedThreads"
                :key="thread.id"
                :thread="thread"
                :pinned="true"
                @click="goToThread(thread.id)"
              />
            </div>
          </div>

          <!-- Recent Threads -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h2
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Discussions récentes
              </h2>
              <div class="flex items-center space-x-2">
                <button
                  @click="sortBy = 'recent'"
                  :class="getSortButtonClasses('recent')"
                  class="px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  Récent
                </button>
                <button
                  @click="sortBy = 'popular'"
                  :class="getSortButtonClasses('popular')"
                  class="px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  Populaire
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-if="forumStore.filteredThreads.length === 0"
              class="text-center py-12"
            >
              <div
                class="mx-auto h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8"
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
                Aucun sujet trouvé
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{
                  forumStore.searchQuery || forumStore.selectedCategory
                    ? "Essayez de modifier vos critères de recherche"
                    : "Soyez le premier à créer un sujet de discussion"
                }}
              </p>
              <BaseButton
                v-if="!forumStore.searchQuery && !forumStore.selectedCategory"
                variant="primary"
                @click="showCreateThreadModal = true"
              >
                Créer un sujet
              </BaseButton>
              <BaseButton v-else variant="outline" @click="clearFilters">
                Effacer les filtres
              </BaseButton>
            </div>

            <!-- Threads List -->
            <div v-else class="space-y-4">
              <ForumThreadCard
                v-for="thread in sortedThreads"
                :key="thread.id"
                :thread="thread"
                @click="goToThread(thread.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Thread Modal -->
    <BaseModal
      :show="showCreateThreadModal"
      @close="showCreateThreadModal = false"
      size="lg"
    >
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Créer un nouveau sujet
        </h3>

        <form @submit.prevent="handleCreateThread" class="space-y-6">
          <!-- Title -->
          <BaseInput
            v-model="newThread.title"
            label="Titre du sujet"
            placeholder="Donnez un titre clair à votre sujet"
            :error="errors.title"
            required
          />

          <!-- Category -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Catégorie
            </label>
            <select
              v-model="newThread.category"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Réglementation">Réglementation</option>
              <option value="Gestion">Gestion</option>
              <option value="Formation">Formation</option>
              <option value="Technique">Technique</option>
              <option value="Général">Général</option>
            </select>
            <p
              v-if="errors.category"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ errors.category }}
            </p>
          </div>

          <!-- Content -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Contenu
            </label>
            <textarea
              v-model="newThread.content"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Décrivez votre sujet en détail..."
              required
            ></textarea>
            <p
              v-if="errors.content"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ errors.content }}
            </p>
          </div>

          <!-- Tags -->
          <BaseInput
            v-model="newThread.tagsInput"
            label="Tags (séparés par des virgules)"
            placeholder="pharmacie, gestion, conseil"
            :error="errors.tags"
          />

          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <BaseButton
              type="button"
              variant="outline"
              @click="showCreateThreadModal = false"
            >
              Annuler
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              :loading="isCreatingThread"
            >
              Créer le sujet
            </BaseButton>
          </div>
        </form>
      </div>
    </BaseModal>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useForumStore } from "@/stores/forum";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";
import ForumThreadCard from "@/components/molecules/ForumThreadCard.vue";

const router = useRouter();
const forumStore = useForumStore();

// Navigation items pour le Club Digital
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/club/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Forum",
    href: "/club/forum",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    name: "Messagerie",
    href: "/club/messagerie",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    badge: { text: "3", variant: "danger" },
  },
  {
    name: "Événements",
    href: "/club/evenements",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    name: "Opportunités",
    href: "/club/opportunites",
    iconPath:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6",
  },
  {
    name: "Retour au Dashboard",
    href: "/professional/dashboard",
    iconPath: "M10 19l-7-7m0 0l7-7m-7 7h18",
  },
]);

const isLoading = ref(true);
const isCreatingThread = ref(false);
const showCreateThreadModal = ref(false);
const sortBy = ref("recent");

const newThread = reactive({
  title: "",
  category: "",
  content: "",
  tagsInput: "",
});

const errors = reactive({
  title: "",
  category: "",
  content: "",
  tags: "",
});

const totalMessages = computed(() => {
  return forumStore.threads.reduce(
    (total, thread) => total + thread.replies,
    0
  );
});

const activeMembers = computed(() => {
  const uniqueAuthors = new Set(
    forumStore.threads.map((thread) => thread.author.id)
  );
  return uniqueAuthors.size;
});

const sortedThreads = computed(() => {
  const threads = forumStore.filteredThreads.filter((thread) => !thread.pinned);

  if (sortBy.value === "popular") {
    return threads.sort((a, b) => b.replies + b.views - (a.replies + a.views));
  }

  return threads.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
});

const getCategoryButtonClasses = (category) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const selectedClasses =
    "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
  const unselectedClasses = "text-gray-600 dark:text-gray-400";

  return forumStore.selectedCategory === category
    ? `${baseClasses} ${selectedClasses}`
    : `${baseClasses} ${unselectedClasses}`;
};

const getSortButtonClasses = (sort) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const selectedClasses =
    "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
  const unselectedClasses = "text-gray-600 dark:text-gray-400";

  return sortBy.value === sort
    ? `${baseClasses} ${selectedClasses}`
    : `${baseClasses} ${unselectedClasses}`;
};

const handleSearch = (value) => {
  forumStore.setSearchQuery(value);
};

const handleSearchSubmit = (value) => {
  forumStore.setSearchQuery(value);
};

const clearFilters = () => {
  forumStore.clearFilters();
  sortBy.value = "recent";
};

const goToThread = (threadId) => {
  router.push({ name: "forum-thread", params: { id: threadId } });
};

const validateForm = () => {
  errors.title = "";
  errors.category = "";
  errors.content = "";
  errors.tags = "";

  if (!newThread.title.trim()) {
    errors.title = "Le titre est requis";
  }

  if (!newThread.category) {
    errors.category = "La catégorie est requise";
  }

  if (!newThread.content.trim()) {
    errors.content = "Le contenu est requis";
  }

  return !errors.title && !errors.category && !errors.content;
};

const handleCreateThread = async () => {
  if (!validateForm()) return;

  isCreatingThread.value = true;

  try {
    const threadData = {
      title: newThread.title.trim(),
      content: newThread.content.trim(),
      category: newThread.category,
      tags: newThread.tagsInput
        ? newThread.tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
    };

    const result = await forumStore.createThread(threadData);

    if (result.success) {
      showCreateThreadModal.value = false;

      // Reset form
      newThread.title = "";
      newThread.category = "";
      newThread.content = "";
      newThread.tagsInput = "";

      // Navigate to the new thread
      goToThread(result.data.id);
    }
  } catch (error) {
    console.error("Error creating thread:", error);
  } finally {
    isCreatingThread.value = false;
  }
};

onMounted(async () => {
  try {
    await forumStore.fetchThreads();
  } finally {
    isLoading.value = false;
  }
});
</script>
