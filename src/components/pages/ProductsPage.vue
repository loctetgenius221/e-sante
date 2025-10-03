<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <HomeHeader />

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-white dark:bg-gray-900">
      <!-- Background Pattern -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      ></div>
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-gray-100/50 dark:bg-gray-800/50 rounded-full -translate-y-48 translate-x-48"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-80 h-80 bg-gray-200/50 dark:bg-gray-700/50 rounded-full translate-y-40 -translate-x-40"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div class="text-center">
          <!-- Badge -->
          <div
            class="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <span>Produits pharmaceutiques</span>
          </div>

          <h1
            class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight"
          >
            Catalogue des
            <span class="text-gray-600 dark:text-gray-400">Produits</span>
          </h1>

          <p
            class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez notre gamme complète de produits pharmaceutiques de
            qualité pour les professionnels de santé
          </p>

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <SearchInput
              :model-value="productsStore.searchQuery"
              placeholder="Rechercher un produit..."
              @update:model-value="productsStore.setSearchQuery"
              class="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Modern Filters Sidebar -->
        <div class="lg:w-80 flex-shrink-0">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24 overflow-hidden"
          >
            <!-- Filter Header -->
            <div
              class="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-lg font-bold text-gray-900 dark:text-gray-100"
                  >
                    Filtres
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Affinez votre recherche
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 space-y-6">
              <!-- Search -->
              <div>
                <label
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Recherche
                </label>
                <SearchInput
                  :model-value="productsStore.searchQuery"
                  placeholder="Nom, fabricant, catégorie..."
                  @update:model-value="productsStore.setSearchQuery"
                  class="w-full"
                />
              </div>

              <!-- Category Filter -->
              <div>
                <label
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Catégorie
                </label>
                <div class="space-y-2">
                  <button
                    v-for="category in productsStore.categories"
                    :key="category"
                    @click="toggleCategoryFilter(category)"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-xl transition-all duration-200',
                      productsStore.selectedCategory === category
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{{ category }}</span>
                      <svg
                        v-if="productsStore.selectedCategory === category"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Manufacturer Filter -->
              <div>
                <label
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  Fabricant
                </label>
                <div class="space-y-2">
                  <button
                    v-for="manufacturer in productsStore.manufacturers"
                    :key="manufacturer"
                    @click="toggleManufacturerFilter(manufacturer)"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-xl transition-all duration-200',
                      productsStore.selectedManufacturer === manufacturer
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{{ manufacturer }}</span>
                      <svg
                        v-if="
                          productsStore.selectedManufacturer === manufacturer
                        "
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Clear Filters -->
              <div class="pt-4 border-t border-gray-200 dark:border-gray-600">
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="productsStore.clearFilters"
                  full-width
                  class="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </template>
                  Effacer les filtres
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Modern Results Header -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div class="flex-1">
                <div class="flex items-center space-x-4 mb-2">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-gray-600 dark:text-gray-400"
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
                    </div>
                    <h2
                      class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                    >
                      {{ productsStore.filteredProducts.length }} produit{{
                        productsStore.filteredProducts.length > 1 ? "s" : ""
                      }}
                    </h2>
                  </div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ getActiveFiltersText() }}
                </p>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div
            v-if="productsStore.isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div v-for="n in 6" :key="n" class="animate-pulse">
              <div
                class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div
                  class="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"
                ></div>
                <div
                  class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"
                ></div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"
                ></div>
                <div class="flex space-x-2">
                  <div
                    class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"
                  ></div>
                  <div
                    class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div
            v-else-if="productsStore.filteredProducts.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <ProductCard
              v-for="product in productsStore.filteredProducts"
              :key="product.id"
              :product="product"
              :show-request-button="
                authStore.isAuthenticated &&
                authStore.user?.role === 'pharmacist'
              "
              @request="handleProductRequest"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-16">
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12"
            >
              <div
                class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-12 h-12 text-gray-400"
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
              </div>
              <h3
                class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
              >
                Aucun produit trouvé
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Essayez de modifier vos critères de recherche ou d'effacer les
                filtres
              </p>
              <BaseButton
                variant="outline"
                @click="productsStore.clearFilters"
                class="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </template>
                Effacer les filtres
              </BaseButton>
            </div>
          </div>
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

const toggleCategoryFilter = (category) => {
  productsStore.setSelectedCategory(
    productsStore.selectedCategory === category ? "" : category
  );
};

const toggleManufacturerFilter = (manufacturer) => {
  productsStore.setSelectedManufacturer(
    productsStore.selectedManufacturer === manufacturer ? "" : manufacturer
  );
};

const getActiveFiltersText = () => {
  const filters = [];
  if (productsStore.selectedCategory) {
    filters.push(`Catégorie: ${productsStore.selectedCategory}`);
  }
  if (productsStore.selectedManufacturer) {
    filters.push(`Fabricant: ${productsStore.selectedManufacturer}`);
  }
  if (productsStore.searchQuery) {
    filters.push(`Recherche: "${productsStore.searchQuery}"`);
  }
  return filters.length > 0 ? filters.join(" • ") : "Tous les produits";
};

onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>
