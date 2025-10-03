<template>
  <nav
    class="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/club/dashboard" class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
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
            <div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                Club Digital
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Communauté professionnelle
              </p>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            :class="getNavLinkClasses(item.href)"
            class="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <component :is="item.icon" class="w-4 h-4 mr-2" />
            {{ item.name }}
            <BaseBadge
              v-if="item.badge"
              :variant="item.badge.variant"
              size="sm"
              class="ml-2"
            >
              {{ item.badge.text }}
            </BaseBadge>
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button
            class="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-5 5v-5zM4.5 19.5L9 15l4.5 4.5M9 15v5l-4.5-4.5"
              />
            </svg>
            <div
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              3
            </div>
          </button>

          <!-- User Avatar -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-medium text-white">JD</span>
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Dr. Jean Dupont
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Pharmacien
                </p>
              </div>
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
            >
              <router-link
                to="/mon-compte"
                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  class="w-4 h-4 mr-3"
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
                Mon profil
              </router-link>
              <router-link
                to="/mon-compte/parametres"
                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  class="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Paramètres
              </router-link>
              <div
                class="border-t border-gray-200 dark:border-gray-700 my-2"
              ></div>
              <button
                @click="logout"
                class="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <svg
                  class="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="showMobileMenu"
        class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
      >
        <div class="space-y-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            :class="getMobileNavLinkClasses(item.href)"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors"
            @click="showMobileMenu = false"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
            <BaseBadge
              v-if="item.badge"
              :variant="item.badge.variant"
              size="sm"
              class="ml-auto"
            >
              {{ item.badge.text }}
            </BaseBadge>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const route = useRoute();
const router = useRouter();

const showUserMenu = ref(false);
const showMobileMenu = ref(false);

const navigationItems = [
  {
    name: "Tableau de bord",
    href: "/club/dashboard",
    icon: "svg",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Forum",
    href: "/club/forum",
    icon: "svg",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    badge: {
      text: "12",
      variant: "primary",
    },
  },
  {
    name: "Messages",
    href: "/club/messagerie",
    icon: "svg",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    badge: {
      text: "3",
      variant: "danger",
    },
  },
  {
    name: "Événements",
    href: "/club/evenements",
    icon: "svg",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    name: "Opportunités",
    href: "/club/opportunites",
    icon: "svg",
    iconPath:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6",
  },
];

const getNavLinkClasses = (href) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeClasses =
    "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400";
  const inactiveClasses = "text-gray-700 dark:text-gray-300";

  return route.path === href
    ? `${baseClasses} ${activeClasses}`
    : `${baseClasses} ${inactiveClasses}`;
};

const getMobileNavLinkClasses = (href) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeClasses =
    "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400";
  const inactiveClasses = "text-gray-700 dark:text-gray-300";

  return route.path === href
    ? `${baseClasses} ${activeClasses}`
    : `${baseClasses} ${inactiveClasses}`;
};

const logout = () => {
  // Implement logout logic
  router.push("/");
  showUserMenu.value = false;
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showUserMenu.value = false;
  }
};

// Add event listener for outside clicks
if (typeof window !== "undefined") {
  document.addEventListener("click", handleClickOutside);
}
</script>
