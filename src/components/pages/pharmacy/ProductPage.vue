<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <h1
              class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              Produits en Promotion
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Découvrez les dernières promotions et offres spéciales
            </p>
          </div>
          <div class="flex items-center space-x-3 mt-4 sm:mt-0">
            <SearchInput
              :model-value="searchQuery"
              placeholder="Rechercher un produit..."
              @update:model-value="handleSearch"
              @search="handleSearchSubmit"
              class="w-64"
            />
            <select
              v-model="sortBy"
              @change="applySorting"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="newest">Plus récents</option>
              <option value="discount">Plus de réduction</option>
              <option value="price">Prix croissant</option>
              <option value="name">Nom A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <BaseCard class="sticky top-24">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Filtres
            </h3>

            <!-- Category Filter -->
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Catégorie
              </label>
              <div class="space-y-2">
                <label
                  v-for="category in categories"
                  :key="category.value"
                  class="flex items-center"
                >
                  <input
                    v-model="filters.categories"
                    :value="category.value"
                    type="checkbox"
                    class="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ category.label }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Discount Range -->
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Réduction minimum
              </label>
              <select
                v-model="filters.minDiscount"
                @change="applyFilters"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Toutes les réductions</option>
                <option value="10">10% et plus</option>
                <option value="20">20% et plus</option>
                <option value="30">30% et plus</option>
                <option value="50">50% et plus</option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Prix maximum (FCFA)
              </label>
              <input
                v-model="filters.maxPrice"
                type="number"
                placeholder="Ex: 50000"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                @input="applyFilters"
              />
            </div>

            <!-- Supplier Filter -->
            <div class="mb-4">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Fournisseur
              </label>
              <select
                v-model="filters.supplier"
                @change="applyFilters"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Tous les fournisseurs</option>
                <option
                  v-for="supplier in suppliers"
                  :key="supplier"
                  :value="supplier"
                >
                  {{ supplier }}
                </option>
              </select>
            </div>

            <!-- Clear Filters -->
            <BaseButton
              variant="outline"
              size="sm"
              @click="clearFilters"
              full-width
            >
              Effacer les filtres
            </BaseButton>
          </BaseCard>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div v-for="n in 6" :key="n" class="animate-pulse">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div
                  class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
                ></div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
                ></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="filteredProducts.length === 0"
            class="text-center py-12"
          >
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3
              class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
            >
              Aucun produit trouvé
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <BaseButton variant="outline" @click="clearFilters">
              Effacer les filtres
            </BaseButton>
          </div>

          <!-- Products Grid -->
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <!-- Product Image -->
              <div
                class="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              >
                <svg
                  class="w-16 h-16 text-gray-400"
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

              <!-- Product Info -->
              <div class="p-6">
                <div class="flex items-start justify-between mb-2">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2"
                  >
                    {{ product.name }}
                  </h3>
                  <BaseBadge variant="success" size="sm">
                    -{{ product.discount }}%
                  </BaseBadge>
                </div>

                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {{ product.supplier }}
                </p>

                <div class="flex items-center space-x-2 mb-4">
                  <span
                    class="text-lg font-bold text-gray-900 dark:text-gray-100"
                  >
                    {{ product.price.toLocaleString() }} FCFA
                  </span>
                  <span
                    class="text-sm text-gray-500 dark:text-gray-400 line-through"
                  >
                    {{ product.originalPrice.toLocaleString() }} FCFA
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ product.category }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ product.quantity }} disponibles
                  </div>
                </div>

                <div class="mt-4 flex space-x-2">
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="viewProduct(product)"
                    class="flex-1"
                  >
                    Voir détails
                  </BaseButton>
                  <BaseButton
                    variant="primary"
                    size="sm"
                    @click="requestProduct(product)"
                    class="flex-1"
                  >
                    Demander
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";

const isLoading = ref(true);
const searchQuery = ref("");
const sortBy = ref("newest");

const filters = ref({
  categories: [],
  minDiscount: "",
  maxPrice: "",
  supplier: "",
});

const categories = ref([
  { value: "medicament", label: "Médicaments" },
  { value: "vitamine", label: "Vitamines" },
  { value: "equipement", label: "Équipements" },
  { value: "cosmetique", label: "Cosmétiques" },
  { value: "hygiene", label: "Hygiène" },
]);

const suppliers = ref([
  "Laboratoire Sanofi",
  "Laboratoire Pfizer",
  "Laboratoire Novartis",
  "Laboratoire Roche",
  "Laboratoire GSK",
  "Laboratoire Merck",
]);

// Mock data
const products = ref([
  {
    id: 1,
    name: "Aspirine 500mg - Boîte de 20 comprimés",
    category: "medicament",
    supplier: "Laboratoire Sanofi",
    price: 4250,
    originalPrice: 5000,
    discount: 15,
    quantity: 150,
    description: "Anti-inflammatoire et antalgique efficace",
    image: null,
  },
  {
    id: 2,
    name: "Oméprazole 20mg - Boîte de 14 gélules",
    category: "medicament",
    supplier: "Laboratoire Pfizer",
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    quantity: 80,
    description: "Inhibiteur de la pompe à protons",
    image: null,
  },
  {
    id: 3,
    name: "Vitamine D3 1000 UI - Flacon de 60 gélules",
    category: "vitamine",
    supplier: "Laboratoire Novartis",
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    quantity: 45,
    description: "Complément alimentaire pour la santé osseuse",
    image: null,
  },
  {
    id: 4,
    name: "Métformine 850mg - Boîte de 30 comprimés",
    category: "medicament",
    supplier: "Laboratoire Roche",
    price: 6000,
    originalPrice: 7500,
    discount: 20,
    quantity: 120,
    description: "Antidiabétique oral de première intention",
    image: null,
  },
  {
    id: 5,
    name: "Tensiomètre électronique bras",
    category: "equipement",
    supplier: "Laboratoire GSK",
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    quantity: 25,
    description: "Appareil de mesure de la tension artérielle",
    image: null,
  },
  {
    id: 6,
    name: "Crème hydratante visage 50ml",
    category: "cosmetique",
    supplier: "Laboratoire Merck",
    price: 3500,
    originalPrice: 5000,
    discount: 30,
    quantity: 60,
    description: "Crème hydratante pour tous types de peau",
    image: null,
  },
]);

const filteredProducts = computed(() => {
  let filtered = products.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.supplier.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (filters.value.categories.length > 0) {
    filtered = filtered.filter((product) =>
      filters.value.categories.includes(product.category)
    );
  }

  // Discount filter
  if (filters.value.minDiscount) {
    const minDiscount = parseInt(filters.value.minDiscount);
    filtered = filtered.filter((product) => product.discount >= minDiscount);
  }

  // Price filter
  if (filters.value.maxPrice) {
    const maxPrice = parseInt(filters.value.maxPrice);
    filtered = filtered.filter((product) => product.price <= maxPrice);
  }

  // Supplier filter
  if (filters.value.supplier) {
    filtered = filtered.filter(
      (product) => product.supplier === filters.value.supplier
    );
  }

  // Sorting
  switch (sortBy.value) {
    case "discount":
      filtered.sort((a, b) => b.discount - a.discount);
      break;
    case "price":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
    default:
      filtered.sort((a, b) => b.id - a.id);
      break;
  }

  return filtered;
});

const handleSearch = (value) => {
  searchQuery.value = value;
};

const handleSearchSubmit = (value) => {
  searchQuery.value = value;
};

const applyFilters = () => {
  // Filters are applied automatically through computed property
};

const applySorting = () => {
  // Sorting is applied automatically through computed property
};

const clearFilters = () => {
  filters.value = {
    categories: [],
    minDiscount: "",
    maxPrice: "",
    supplier: "",
  };
  searchQuery.value = "";
  sortBy.value = "newest";
};

const viewProduct = (product) => {
  console.log("View product:", product.id);
  // Navigate to product detail page
};

const requestProduct = (product) => {
  console.log("Request product:", product.id);
  // Open request modal or navigate to request page
};

onMounted(async () => {
  // Simulate loading data
  await new Promise((resolve) => setTimeout(resolve, 500));
  isLoading.value = false;
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
