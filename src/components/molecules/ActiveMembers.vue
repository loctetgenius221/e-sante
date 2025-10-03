<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6"
  >
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
        Membres actifs
      </h3>
      <BaseButton
        variant="outline"
        size="sm"
        @click="$router.push('/club/membres')"
      >
        Voir tout
        <svg
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </BaseButton>
    </div>

    <!-- Online Status -->
    <div class="flex items-center mb-6">
      <div class="flex -space-x-2">
        <div
          v-for="member in onlineMembers.slice(0, 5)"
          :key="member.id"
          class="relative"
        >
          <img
            :src="member.avatar"
            :alt="member.name"
            class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
          />
          <div
            class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"
          ></div>
        </div>
        <div
          v-if="onlineMembers.length > 5"
          class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400"
        >
          +{{ onlineMembers.length - 5 }}
        </div>
      </div>
      <div class="ml-4">
        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ onlineMembers.length }} membres en ligne
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ totalMembers }} membres au total
        </div>
      </div>
    </div>

    <!-- Members List -->
    <div class="space-y-3">
      <div
        v-for="member in activeMembers"
        :key="member.id"
        class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div class="flex items-center space-x-3">
          <div class="relative">
            <img
              :src="member.avatar"
              :alt="member.name"
              class="w-10 h-10 rounded-full"
            />
            <div
              :class="getStatusClasses(member.status)"
              class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"
            ></div>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ member.name }}
              </h4>
              <BaseBadge :variant="getRoleVariant(member.role)" size="xs">
                {{ getRoleLabel(member.role) }}
              </BaseBadge>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ getLastActivityText(member.lastActivity) }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Envoyer un message"
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
          </button>
          <button
            class="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            title="Voir le profil"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- View All Button -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <BaseButton
        variant="outline"
        full-width
        @click="$router.push('/club/membres')"
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </template>
        Voir tous les membres ({{ totalMembers }})
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const totalMembers = ref(1247);

const members = ref([
  {
    id: 1,
    name: "Dr. Aminata Diop",
    role: "pharmacist",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
    status: "online",
    lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: 2,
    name: "Dr. Ibrahima Ba",
    role: "doctor",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    status: "online",
    lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: 3,
    name: "Fatou Sarr",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    status: "away",
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 4,
    name: "Moussa Fall",
    role: "pharmacist",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    status: "online",
    lastActivity: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: 5,
    name: "Aïcha Diallo",
    role: "midwife",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    status: "offline",
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: 6,
    name: "Dr. Cheikh Ndiaye",
    role: "doctor",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    status: "online",
    lastActivity: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  },
]);

const onlineMembers = computed(() =>
  members.value.filter((member) => member.status === "online")
);

const activeMembers = computed(
  () => members.value.slice(0, 6) // Show first 6 members
);

const getStatusClasses = (status) => {
  const classes = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-400",
  };
  return classes[status] || "bg-gray-400";
};

const getRoleVariant = (role) => {
  const variants = {
    pharmacist: "primary",
    doctor: "success",
    student: "info",
    midwife: "warning",
    admin: "danger",
  };
  return variants[role] || "secondary";
};

const getRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    midwife: "Sage-femme",
    admin: "Admin",
  };
  return labels[role] || role;
};

const getLastActivityText = (lastActivity) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now - lastActivity) / (1000 * 60));

  if (diffInMinutes < 1) {
    return "En ligne maintenant";
  } else if (diffInMinutes < 60) {
    return `En ligne il y a ${diffInMinutes} min`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `En ligne il y a ${hours}h`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `En ligne il y a ${days}j`;
  }
};
</script>
