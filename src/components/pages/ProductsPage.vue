<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <HomeHeader />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Catalogue des Produits Pharmaceutiques
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Découvrez notre gamme complète de produits pharmaceutiques de qualité
        </p>
      </div>

      <!-- Filters -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Rechercher
            </label>
            <SearchInput
              :model-value="productsStore.searchQuery"
              placeholder="Nom, fabricant, catégorie..."
              @update:model-value="productsStore.setSearchQuery"
            />
          </div>

          <!-- Category Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Catégorie
            </label>
            <select
              :value="productsStore.selectedCategory"
              @change="productsStore.setSelectedCategory($event.target.value)"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Toutes les catégories</option>
              <option
                v-for="category in productsStore.categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Manufacturer Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Fabricant
            </label>
            <select
              :value="productsStore.selectedManufacturer"
              @change="
                productsStore.setSelectedManufacturer($event.target.value)
              "
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Tous les fabricants</option>
              <option
                v-for="manufacturer in productsStore.manufacturers"
                :key="manufacturer"
                :value="manufacturer"
              >
                {{ manufacturer }}
              </option>
            </select>
          </div>
        </div>

        <!-- Clear Filters -->
        <div class="mt-4 flex justify-end">
          <BaseButton
            variant="outline"
            size="sm"
            @click="productsStore.clearFilters"
          >
            Effacer les filtres
          </BaseButton>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ productsStore.filteredProducts.length }} produit(s) trouvé(s)
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="productsStore.isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div
              class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
            ></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div
        v-else-if="productsStore.filteredProducts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="product in productsStore.filteredProducts"
          :key="product.id"
          :product="product"
          :show-request-button="
            authStore.isAuthenticated && authStore.user?.role === 'pharmacist'
          "
          @request="handleProductRequest"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Aucun produit trouvé
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Essayez de modifier vos critères de recherche
        </p>
        <div class="mt-6">
          <BaseButton variant="outline" @click="productsStore.clearFilters">
            Effacer les filtres
          </BaseButton>
        </div>
      </div>

      <!-- Quick Actions for Pharmacists -->
      <div
        v-if="
          authStore.isAuthenticated && authStore.user?.role === 'pharmacist'
        "
        class="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Actions Rapides
        </h3>
        <div class="flex flex-col sm:flex-row gap-4">
          <BaseButton
            variant="primary"
            @click="$router.push('/services-pharmacie/demande')"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </template>
            Faire une Demande de Produit
          </BaseButton>

          <BaseButton
            variant="outline"
            @click="$router.push('/services-pharmacie/commandes')"
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </template>
            Mes Commandes
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useProductsStore } from "@/stores/products";
import SearchInput from "@/components/molecules/SearchInput.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import ProductCard from "@/components/molecules/ProductCard.vue";
import HomeHeader from "@/components/organisms/HomeHeader.vue";

const router = useRouter();
const authStore = useAuthStore();
const productsStore = useProductsStore();

const handleProductRequest = (product) => {
  console.log("Product request:", product);
  router.push({
    name: "product-request",
    params: { productId: product.id },
  });
};

onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>
