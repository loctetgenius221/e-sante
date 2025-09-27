<template>
  <nav
    class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50"
  >
    <div class="flex items-center justify-around py-2">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.name"
        :to="item.href"
        class="flex flex-col items-center py-2 px-3 text-xs font-medium transition-colors"
        :class="getNavItemClasses(item.href)"
        @click="handleNavClick"
      >
        <component :is="item.icon" class="w-6 h-6 mb-1" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Icons as components
const HomeIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  `,
};

const CatalogueIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  `,
};

const ClubIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  `,
};

const AccountIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  `,
};

const MenuIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  `,
};

const route = useRoute();
const authStore = useAuthStore();

const navigationItems = computed(() => {
  const items = [
    { name: "Accueil", href: "/", icon: HomeIcon },
    { name: "Catalogue", href: "/catalogue", icon: CatalogueIcon },
  ];

  if (authStore.isAuthenticated) {
    items.push(
      { name: "Club", href: "/club", icon: ClubIcon },
      { name: "Compte", href: "/mon-compte", icon: AccountIcon }
    );
  } else {
    items.push({ name: "Connexion", href: "/auth/login", icon: AccountIcon });
  }

  return items;
});

const getNavItemClasses = (href) => {
  const isActive =
    route.path === href || (href !== "/" && route.path.startsWith(href));

  return isActive
    ? "text-gray-900 dark:text-gray-100"
    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200";
};

const handleNavClick = () => {
  // Add any additional logic for navigation clicks
};
</script>
