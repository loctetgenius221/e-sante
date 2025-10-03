<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 lg:w-64',
      ]"
    >
      <!-- Sidebar Header -->
      <div
        class="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-gray-100"
            >E-Santé</span
          >
        </div>
        <button
          @click="toggleSidebar"
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Fermer le menu"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <div v-for="item in navigationItems" :key="item.name">
            <!-- Menu item with submenu -->
            <div v-if="item.submenu" class="mb-2">
              <button
                @click="toggleSubmenu(item.name)"
                :class="[
                  'group flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
                ]"
              >
                <div class="flex items-center">
                  <SvgIcon
                    :path="item.iconPath"
                    class="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  />
                  {{ item.name }}
                </div>
                <svg
                  :class="[
                    'h-4 w-4 transition-transform duration-200',
                    openSubmenus[item.name] ? 'rotate-90' : '',
                  ]"
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
              </button>

              <!-- Submenu -->
              <div v-if="openSubmenus[item.name]" class="ml-6 mt-1 space-y-1">
                <router-link
                  v-for="subItem in item.submenu"
                  :key="subItem.name"
                  :to="subItem.href"
                  :class="[
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    $route.path === subItem.href
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
                  ]"
                >
                  <SvgIcon
                    :path="subItem.iconPath"
                    :class="[
                      'mr-3 h-4 w-4 flex-shrink-0',
                      $route.path === subItem.href
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                    ]"
                  />
                  {{ subItem.name }}
                  <BaseBadge
                    v-if="subItem.badge"
                    :variant="subItem.badge.variant"
                    size="sm"
                    class="ml-auto"
                  >
                    {{ subItem.badge.text }}
                  </BaseBadge>
                </router-link>
              </div>
            </div>

            <!-- Regular menu item -->
            <router-link
              v-else
              :to="item.href"
              :class="[
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                $route.path === item.href
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
              ]"
            >
              <SvgIcon
                :path="item.iconPath"
                :class="[
                  'mr-3 h-5 w-5 flex-shrink-0',
                  $route.path === item.href
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                ]"
              />
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

        <!-- User Section -->
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center px-3 py-2">
            <div
              class="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center"
            >
              <span class="text-white text-sm font-medium">
                {{ authStore.user?.name?.charAt(0) || "U" }}
              </span>
            </div>
            <div class="ml-3 min-w-0 flex-1">
              <p
                class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
              >
                {{ authStore.user?.name || "Utilisateur Test" }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                {{ getUserRoleLabel(authStore.user?.role) || "Pharmacien" }}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 min-w-0">
      <!-- Top Bar -->
      <div
        class="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div
          class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
        >
          <div class="flex items-center">
            <button
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Ouvrir le menu"
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
            <h1
              class="text-2xl font-semibold text-gray-900 dark:text-gray-100 ml-4"
            >
              {{ pageTitle }}
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              class="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                v-if="notificationsCount > 0"
                class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ notificationsCount }}
              </span>
            </button>

            <!-- User Menu -->
            <div class="relative">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  :src="authStore.user?.avatar || '/images/default-avatar.jpg'"
                  :alt="authStore.user?.name"
                  class="h-8 w-8 rounded-full"
                />
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
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
              >
                <router-link
                  to="/profile"
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
                  to="/settings"
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
                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <main
        class="p-6 max-w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900"
      >
        <slot />
      </main>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="sidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import SvgIcon from "@/components/atoms/SvgIcon.vue";

// Props
const props = defineProps({
  navigationItems: {
    type: Array,
    required: true,
  },
  pageTitle: {
    type: String,
    default: "Dashboard",
  },
});

// Composables
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// State
const sidebarOpen = ref(false);
const userMenuOpen = ref(false);
const notificationsCount = ref(3);
const openSubmenus = ref({});

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

const toggleSubmenu = (menuName) => {
  openSubmenus.value[menuName] = !openSubmenus.value[menuName];
};

// Close sidebar on route change (mobile)
const handleRouteChange = () => {
  if (window.innerWidth < 1024) {
    closeSidebar();
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};

const getUserRoleLabel = (role) => {
  const labels = {
    pharmacist: "Pharmacien",
    doctor: "Médecin",
    student: "Étudiant",
    midwife: "Sage-femme",
    laboratory: "Laboratoire",
    hospital: "Hôpital",
    clinic: "Clinique",
    admin: "Administrateur",
  };
  return labels[role] || role;
};

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    userMenuOpen.value = false;
  }
};

// Watchers
watch(route, () => {
  handleRouteChange();
});

// Handle window resize
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    sidebarOpen.value = true; // Always open on desktop
  } else {
    sidebarOpen.value = false; // Close on mobile
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", handleResize);
  handleResize(); // Initial call
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", handleResize);
});
</script>
