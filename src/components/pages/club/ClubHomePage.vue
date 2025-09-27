<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Club Digital
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Communauté exclusive des professionnels de santé
            </p>
          </div>
          <BaseButton variant="primary" @click="$router.push('/club/forum')">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </template>
            Participer au forum
          </BaseButton>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Actualités -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Actualités
              </h3>
            </template>

            <div class="space-y-6">
              <div
                v-for="news in newsFeed"
                :key="news.id"
                class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
              >
                <div class="flex items-start space-x-4">
                  <img
                    :src="news.author.avatar"
                    :alt="news.author.name"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h4 class="font-medium text-gray-900 dark:text-gray-100">
                        {{ news.author.name }}
                      </h4>
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {{ formatDate(news.createdAt) }}
                      </span>
                    </div>
                    <h5
                      class="font-semibold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      {{ news.title }}
                    </h5>
                    <p class="text-gray-600 dark:text-gray-400 mb-3">
                      {{ news.excerpt }}
                    </p>
                    <div
                      class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <button
                        class="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
                      >
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
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        {{ news.likes }}
                      </button>
                      <button
                        class="flex items-center hover:text-gray-700 dark:hover:text-gray-300"
                      >
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
                        {{ news.comments }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Ressources récentes -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Ressources récentes
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/club/ressources')"
                >
                  Voir tout
                </BaseButton>
              </div>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="resource in recentResources"
                :key="resource.id"
                class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div class="flex items-start space-x-3">
                  <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <svg
                      class="w-5 h-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4
                      class="font-medium text-gray-900 dark:text-gray-100 mb-1"
                    >
                      {{ resource.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {{ resource.description }}
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ resource.type }}
                      </span>
                      <BaseButton variant="outline" size="xs">
                        Télécharger
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Événements à venir -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Événements à venir
                </h3>
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push('/club/evenements')"
                >
                  Voir tout
                </BaseButton>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="event in upcomingEvents"
                :key="event.id"
                class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div class="flex items-start space-x-3">
                  <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg
                      class="w-5 h-5 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4
                      class="font-medium text-gray-900 dark:text-gray-100 mb-1"
                    >
                      {{ event.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {{ event.description }}
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatDate(event.date) }}
                      </span>
                      <BaseButton variant="primary" size="xs">
                        S'inscrire
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Membres actifs -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Membres actifs
              </h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="member in activeMembers"
                :key="member.id"
                class="flex items-center space-x-3"
              >
                <img
                  :src="member.avatar"
                  :alt="member.name"
                  class="w-8 h-8 rounded-full"
                />
                <div class="flex-1">
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ member.name }}
                  </h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ member.role }}
                  </p>
                </div>
                <BaseBadge
                  :variant="
                    member.status === 'online' ? 'success' : 'secondary'
                  "
                  size="sm"
                >
                  {{ member.status === "online" ? "En ligne" : "Hors ligne" }}
                </BaseBadge>
              </div>
            </div>
          </BaseCard>

          <!-- Actions rapides -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Actions rapides
              </h3>
            </template>

            <div class="space-y-3">
              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/club/forum')"
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </template>
                Forum de discussion
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/club/messagerie')"
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </template>
                Messagerie privée
              </BaseButton>

              <BaseButton
                variant="outline"
                size="sm"
                full-width
                @click="$router.push('/club/opportunites')"
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </template>
                Opportunités
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useForumStore } from "@/stores/forum";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const forumStore = useForumStore();

const newsFeed = ref([
  {
    id: 1,
    title: "Nouvelle réglementation sur les médicaments génériques",
    excerpt:
      "Le ministère de la Santé a publié de nouvelles directives concernant la prescription et la délivrance des médicaments génériques...",
    author: {
      name: "Dr. Aminata Diop",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
    },
    createdAt: new Date("2024-01-20"),
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "Formation continue : Pharmacovigilance 2024",
    excerpt:
      "Une nouvelle session de formation sur la pharmacovigilance sera organisée le mois prochain. Inscriptions ouvertes...",
    author: {
      name: "Pr. Mamadou Fall",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    },
    createdAt: new Date("2024-01-18"),
    likes: 18,
    comments: 12,
  },
]);

const recentResources = ref([
  {
    id: 1,
    title: "Guide des interactions médicamenteuses 2024",
    description:
      "Document complet sur les principales interactions à connaître",
    type: "PDF",
  },
  {
    id: 2,
    title: "Checklist pharmacovigilance",
    description: "Liste de vérification pour signaler les effets indésirables",
    type: "Excel",
  },
]);

const upcomingEvents = ref([
  {
    id: 1,
    title: "Webinaire : Nouvelles thérapies",
    description: "Présentation des dernières avancées thérapeutiques",
    date: new Date("2024-02-15"),
  },
  {
    id: 2,
    title: "Formation : Gestion des stocks",
    description: "Optimisation de la gestion des stocks pharmaceutiques",
    date: new Date("2024-02-20"),
  },
]);

const activeMembers = ref([
  {
    id: 1,
    name: "Dr. Fatou Sarr",
    role: "Pharmacienne",
    avatar:
      "https://images.unsplash.com/photo-1594824388852-8a5b4b5b5b5b?w=32&h=32&fit=crop&crop=face",
    status: "online",
  },
  {
    id: 2,
    name: "Dr. Ibrahima Ba",
    role: "Médecin",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop&crop=face",
    status: "online",
  },
  {
    id: 3,
    name: "Dr. Aïcha Diallo",
    role: "Pharmacienne",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=32&h=32&fit=crop&crop=face",
    status: "offline",
  },
]);

const formatDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

onMounted(async () => {
  await forumStore.fetchForumData();
});
</script>
