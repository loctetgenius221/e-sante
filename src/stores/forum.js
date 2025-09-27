import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useForumStore = defineStore("forum", () => {
  // State
  const threads = ref([]);
  const currentThread = ref(null);
  const messages = ref([]);
  const isLoading = ref(false);
  const searchQuery = ref("");
  const selectedCategory = ref("");

  // Getters
  const filteredThreads = computed(() => {
    let filtered = threads.value;

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (thread) =>
          thread.title.toLowerCase().includes(query) ||
          thread.content.toLowerCase().includes(query) ||
          thread.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory.value) {
      filtered = filtered.filter(
        (thread) => thread.category === selectedCategory.value
      );
    }

    return filtered.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  });

  const categories = computed(() => [
    ...new Set(threads.value.map((t) => t.category)),
  ]);

  const pinnedThreads = computed(() =>
    threads.value.filter((thread) => thread.pinned)
  );

  const recentThreads = computed(() =>
    threads.value
      .filter((thread) => !thread.pinned)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 10)
  );

  // Actions
  const fetchThreads = async () => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Load from localStorage or create mock data
      const savedThreads = localStorage.getItem("forumThreads");
      if (savedThreads) {
        threads.value = JSON.parse(savedThreads);
      } else {
        // Mock forum threads
        threads.value = [
          {
            id: 1,
            title: "Nouvelle réglementation sur les médicaments génériques",
            content:
              "Bonjour à tous, j'aimerais discuter de la nouvelle réglementation sur les médicaments génériques qui entre en vigueur ce mois-ci. Quels sont vos retours d'expérience ?",
            author: {
              id: 1,
              name: "Dr. Aminata Diop",
              role: "pharmacist",
              avatar: null,
            },
            category: "Réglementation",
            tags: ["génériques", "réglementation", "pharmacie"],
            replies: 12,
            views: 156,
            pinned: true,
            createdAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 2,
            title: "Conseils pour la gestion des stocks en pharmacie",
            content:
              "Je suis nouveau dans le métier et j'aimerais avoir des conseils sur la gestion optimale des stocks en pharmacie. Comment gérez-vous vos commandes ?",
            author: {
              id: 2,
              name: "Moussa Fall",
              role: "pharmacist",
              avatar: null,
            },
            category: "Gestion",
            tags: ["stocks", "gestion", "pharmacie", "débutant"],
            replies: 8,
            views: 89,
            pinned: false,
            createdAt: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
            updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          },
          {
            id: 3,
            title: "Formation continue : pharmacovigilance",
            content:
              "Qui a suivi la formation sur la pharmacovigilance ? J'aimerais échanger sur les points clés à retenir.",
            author: {
              id: 3,
              name: "Fatou Sarr",
              role: "doctor",
              avatar: null,
            },
            category: "Formation",
            tags: ["formation", "pharmacovigilance", "sécurité"],
            replies: 15,
            views: 203,
            pinned: false,
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          },
        ];

        // Save to localStorage
        localStorage.setItem("forumThreads", JSON.stringify(threads.value));
      }

      return { success: true, data: threads.value };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const fetchThread = async (threadId) => {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const thread = threads.value.find((t) => t.id === parseInt(threadId));
      if (thread) {
        currentThread.value = thread;

        // Fetch messages for this thread
        await fetchMessages(threadId);

        return { success: true, data: thread };
      } else {
        return { success: false, error: "Sujet non trouvé" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const fetchMessages = async (threadId) => {
    try {
      // Load from localStorage or create mock data
      const savedMessages = localStorage.getItem(`threadMessages_${threadId}`);
      if (savedMessages) {
        messages.value = JSON.parse(savedMessages);
      } else {
        // Mock messages
        messages.value = [
          {
            id: 1,
            threadId: parseInt(threadId),
            content:
              "Merci pour ce sujet très intéressant. Dans ma pharmacie, nous avons commencé à appliquer les nouvelles règles et c'est assez complexe au début.",
            author: {
              id: 4,
              name: "Ibrahima Ndiaye",
              role: "pharmacist",
              avatar: null,
            },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            likes: 3,
          },
          {
            id: 2,
            threadId: parseInt(threadId),
            content:
              "Je suis d'accord avec Ibrahima. Il faut vraiment bien se former sur ces nouvelles réglementations. Avez-vous des ressources à recommander ?",
            author: {
              id: 5,
              name: "Aïcha Ba",
              role: "pharmacist",
              avatar: null,
            },
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            likes: 1,
          },
        ];

        // Save to localStorage
        localStorage.setItem(
          `threadMessages_${threadId}`,
          JSON.stringify(messages.value)
        );
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const createThread = async (threadData) => {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newThread = {
        id: Date.now(),
        ...threadData,
        author: {
          id: 1, // This would come from auth store
          name: "Utilisateur Actuel",
          role: "pharmacist",
          avatar: null,
        },
        replies: 0,
        views: 0,
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      threads.value.unshift(newThread);

      // Save to localStorage
      const savedThreads = localStorage.getItem("forumThreads");
      const existingThreads = savedThreads ? JSON.parse(savedThreads) : [];
      existingThreads.unshift(newThread);
      localStorage.setItem("forumThreads", JSON.stringify(existingThreads));

      return { success: true, data: newThread };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const addMessage = async (threadId, content) => {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newMessage = {
        id: Date.now(),
        threadId: parseInt(threadId),
        content,
        author: {
          id: 1, // This would come from auth store
          name: "Utilisateur Actuel",
          role: "pharmacist",
          avatar: null,
        },
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      messages.value.push(newMessage);

      // Update thread reply count and last update
      const thread = threads.value.find((t) => t.id === parseInt(threadId));
      if (thread) {
        thread.replies++;
        thread.updatedAt = new Date().toISOString();
      }

      // Save to localStorage
      const savedMessages = localStorage.getItem(`threadMessages_${threadId}`);
      const existingMessages = savedMessages ? JSON.parse(savedMessages) : [];
      existingMessages.push(newMessage);
      localStorage.setItem(
        `threadMessages_${threadId}`,
        JSON.stringify(existingMessages)
      );

      // Update threads in localStorage
      const savedThreads = localStorage.getItem("forumThreads");
      const existingThreads = savedThreads ? JSON.parse(savedThreads) : [];
      const threadIndex = existingThreads.findIndex(
        (t) => t.id === parseInt(threadId)
      );
      if (threadIndex !== -1) {
        existingThreads[threadIndex] = thread;
        localStorage.setItem("forumThreads", JSON.stringify(existingThreads));
      }

      return { success: true, data: newMessage };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const setSelectedCategory = (category) => {
    selectedCategory.value = category;
  };

  const clearFilters = () => {
    searchQuery.value = "";
    selectedCategory.value = "";
  };

  return {
    // State
    threads,
    currentThread,
    messages,
    isLoading,
    searchQuery,
    selectedCategory,

    // Getters
    filteredThreads,
    categories,
    pinnedThreads,
    recentThreads,

    // Actions
    fetchThreads,
    fetchThread,
    fetchMessages,
    createThread,
    addMessage,
    setSearchQuery,
    setSelectedCategory,
    clearFilters,
  };
});
