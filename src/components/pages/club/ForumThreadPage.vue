<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
        <div class="space-y-4">
          <div
            v-for="n in 3"
            :key="n"
            class="bg-white dark:bg-gray-800 rounded-lg p-6"
          >
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Thread Content -->
    <div
      v-else-if="forumStore.currentThread"
      class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <router-link
              to="/club"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Club Digital
            </router-link>
          </li>
          <li>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
          <li>
            <router-link
              to="/club/forum"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Forum
            </router-link>
          </li>
          <li>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
          <li>
            <span class="text-gray-900 dark:text-gray-100 font-medium">
              {{ forumStore.currentThread.title }}
            </span>
          </li>
        </ol>
      </nav>

      <!-- Thread Header -->
      <BaseCard class="mb-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-2">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ forumStore.currentThread.title }}
              </h1>
              <BaseBadge
                v-if="forumStore.currentThread.pinned"
                variant="warning"
                size="sm"
              >
                <template #icon-left>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </template>
                Épinglé
              </BaseBadge>
              <BaseBadge
                :variant="getCategoryVariant(forumStore.currentThread.category)"
                size="sm"
              >
                {{ forumStore.currentThread.category }}
              </BaseBadge>
            </div>

            <!-- Tags -->
            <div
              v-if="
                forumStore.currentThread.tags &&
                forumStore.currentThread.tags.length > 0
              "
              class="flex flex-wrap gap-2 mb-4"
            >
              <BaseBadge
                v-for="tag in forumStore.currentThread.tags"
                :key="tag"
                variant="secondary"
                size="sm"
              >
                #{{ tag }}
              </BaseBadge>
            </div>
          </div>
        </div>

        <!-- Author Info -->
        <div
          class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
        >
          <div class="flex items-center">
            <div
              class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3"
            >
              <span
                class="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                {{ getInitials(forumStore.currentThread.author.name) }}
              </span>
            </div>
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                {{ forumStore.currentThread.author.name }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ getRoleLabel(forumStore.currentThread.author.role) }} •
                {{ formatDate(forumStore.currentThread.createdAt) }}
              </div>
            </div>
          </div>
          <div
            class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
          >
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
              {{ forumStore.currentThread.replies }} réponses
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
              {{ forumStore.currentThread.views }} vues
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Thread Content -->
      <BaseCard class="mb-6">
        <div class="prose dark:prose-invert max-w-none">
          <p
            class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
          >
            {{ forumStore.currentThread.content }}
          </p>
        </div>
      </BaseCard>

      <!-- Messages -->
      <div class="space-y-4 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Réponses ({{ forumStore.messages.length }})
        </h2>

        <div v-if="forumStore.messages.length === 0" class="text-center py-8">
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
            Aucune réponse pour le moment. Soyez le premier à répondre !
          </p>
        </div>

        <div v-else class="space-y-4">
          <ForumMessageCard
            v-for="message in forumStore.messages"
            :key="message.id"
            :message="message"
          />
        </div>
      </div>

      <!-- Reply Form -->
      <BaseCard>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Répondre au sujet
        </h3>

        <form @submit.prevent="handleReply" class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Votre réponse
            </label>
            <textarea
              v-model="replyContent"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Partagez votre point de vue..."
              required
            ></textarea>
            <p
              v-if="replyError"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ replyError }}
            </p>
          </div>

          <div class="flex justify-end">
            <BaseButton
              type="submit"
              variant="primary"
              :loading="isSubmittingReply"
            >
              Publier la réponse
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Sujet non trouvé
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Le sujet que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <BaseButton variant="primary" @click="$router.push('/club/forum')">
          Retour au forum
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForumStore } from "@/stores/forum";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import ForumMessageCard from "@/components/molecules/ForumMessageCard.vue";

const route = useRoute();
const router = useRouter();
const forumStore = useForumStore();

const isLoading = ref(true);
const isSubmittingReply = ref(false);
const replyContent = ref("");
const replyError = ref("");

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
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleReply = async () => {
  if (!replyContent.value.trim()) {
    replyError.value = "Veuillez saisir une réponse";
    return;
  }

  isSubmittingReply.value = true;
  replyError.value = "";

  try {
    const result = await forumStore.addMessage(
      route.params.id,
      replyContent.value.trim()
    );

    if (result.success) {
      replyContent.value = "";
    } else {
      replyError.value = "Erreur lors de l'envoi de la réponse";
    }
  } catch (error) {
    replyError.value = "Erreur lors de l'envoi de la réponse";
  } finally {
    isSubmittingReply.value = false;
  }
};

onMounted(async () => {
  try {
    await forumStore.fetchThread(route.params.id);
  } finally {
    isLoading.value = false;
  }
});
</script>
