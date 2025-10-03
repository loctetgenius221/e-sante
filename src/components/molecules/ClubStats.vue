<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6"
  >
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
        Statistiques de la communauté
      </h3>
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span class="text-sm text-gray-500 dark:text-gray-400"
          >En temps réel</span
        >
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Members -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {{ stats.totalMembers.toLocaleString() }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Membres</div>
        <div
          class="flex items-center justify-center text-green-600 dark:text-green-400 text-sm"
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
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
          +{{ stats.newMembersThisWeek }} cette semaine
        </div>
      </div>

      <!-- Active Discussions -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-white"
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
        <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {{ stats.activeDiscussions.toLocaleString() }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Discussions
        </div>
        <div
          class="flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm"
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          +{{ stats.newDiscussionsToday }} aujourd'hui
        </div>
      </div>

      <!-- Events -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-white"
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
        <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {{ stats.upcomingEvents.toLocaleString() }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Événements
        </div>
        <div
          class="flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ stats.eventsThisWeek }} cette semaine
        </div>
      </div>

      <!-- Opportunities -->
      <div class="text-center">
        <div
          class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-white"
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
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {{ stats.activeOpportunities.toLocaleString() }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Opportunités
        </div>
        <div
          class="flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ stats.newOpportunitiesToday }} nouvelles
        </div>
      </div>
    </div>

    <!-- Activity Chart -->
    <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Activité des 7 derniers jours
        </h4>
        <div
          class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            Discussions
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Événements
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            Opportunités
          </div>
        </div>
      </div>

      <!-- Simple Bar Chart -->
      <div class="flex items-end space-x-2 h-32">
        <div
          v-for="(day, index) in activityData"
          :key="index"
          class="flex-1 flex flex-col items-center"
        >
          <div class="w-full flex flex-col items-center space-y-1 mb-2">
            <div
              class="w-full bg-blue-500 rounded-t"
              :style="{ height: `${(day.discussions / 20) * 100}%` }"
            ></div>
            <div
              class="w-full bg-green-500"
              :style="{ height: `${(day.events / 10) * 100}%` }"
            ></div>
            <div
              class="w-full bg-orange-500 rounded-b"
              :style="{ height: `${(day.opportunities / 15) * 100}%` }"
            ></div>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ day.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const stats = ref({
  totalMembers: 1247,
  newMembersThisWeek: 23,
  activeDiscussions: 342,
  newDiscussionsToday: 8,
  upcomingEvents: 89,
  eventsThisWeek: 5,
  activeOpportunities: 156,
  newOpportunitiesToday: 3,
});

const activityData = ref([
  { label: "Lun", discussions: 12, events: 3, opportunities: 8 },
  { label: "Mar", discussions: 18, events: 2, opportunities: 12 },
  { label: "Mer", discussions: 15, events: 4, opportunities: 9 },
  { label: "Jeu", discussions: 22, events: 1, opportunities: 15 },
  { label: "Ven", discussions: 16, events: 3, opportunities: 11 },
  { label: "Sam", discussions: 8, events: 2, opportunities: 6 },
  { label: "Dim", discussions: 5, events: 1, opportunities: 4 },
]);

onMounted(() => {
  // Simulate real-time updates
  setInterval(() => {
    // Randomly update some stats
    if (Math.random() > 0.7) {
      stats.value.newDiscussionsToday += Math.floor(Math.random() * 2);
    }
    if (Math.random() > 0.8) {
      stats.value.newMembersThisWeek += 1;
    }
  }, 30000); // Update every 30 seconds
});
</script>
