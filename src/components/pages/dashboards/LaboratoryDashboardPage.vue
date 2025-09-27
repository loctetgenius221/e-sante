<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Tableau de Bord Laboratoire
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Bienvenue, {{ authStore.user?.name }} - Gérez vos produits
              pharmaceutiques
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <img
              :src="authStore.user?.avatar || '/images/default-avatar.jpg'"
              :alt="authStore.user?.name"
              class="h-12 w-12 rounded-full"
            />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ authStore.user?.name }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Laboratoire
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-blue-600 dark:text-blue-400"
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
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Produits Actifs
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ productsStore.products.length }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-green-600 dark:text-green-400"
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
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Commandes Récentes
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ recentOrders }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
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
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Stock Faible
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ productsStore.lowStockProducts.length }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-red-600 dark:text-red-400"
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
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Expiration Proche
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ productsStore.expiringProducts.length }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Product Management -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Gestion des Produits
                </h3>
                <BaseButton
                  variant="primary"
                  size="sm"
                  @click="showAddProductModal = true"
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
                  Ajouter un Produit
                </BaseButton>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="product in productsStore.products.slice(0, 5)"
                :key="product.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img
                      :src="product.image || '/images/products/default.jpg'"
                      :alt="product.name"
                      class="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4
                        class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                      >
                        {{ product.name }}
                      </h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ product.manufacturer }} • {{ product.category }}
                      </p>
                      <div class="flex items-center space-x-4 mt-1">
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          Stock: {{ product.stock }}
                        </span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          Prix: {{ formatPrice(product.price) }} FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <BaseBadge
                      :variant="
                        getStockVariant(product.stock, product.minStock)
                      "
                      size="sm"
                    >
                      {{ getStockText(product.stock, product.minStock) }}
                    </BaseBadge>
                    <BaseButton
                      variant="outline"
                      size="sm"
                      @click="editProduct(product)"
                    >
                      Modifier
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 text-center">
              <BaseButton variant="outline" @click="$router.push('/products')">
                Voir Tous les Produits
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Recent Orders -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Commandes Récentes
              </h3>
            </template>

            <div class="space-y-4">
              <div
                v-for="order in recentOrdersList"
                :key="order.id"
                class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div>
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Commande #{{ order.id }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ order.pharmacy }} • {{ order.product }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(order.date) }}
                  </p>
                </div>
                <div class="text-right">
                  <BaseBadge
                    :variant="getOrderStatusVariant(order.status)"
                    size="sm"
                  >
                    {{ order.status }}
                  </BaseBadge>
                  <p
                    class="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1"
                  >
                    {{ order.quantity }} unités
                  </p>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Actions Rapides
              </h3>
            </template>

            <div class="space-y-3">
              <BaseButton
                variant="outline"
                full-width
                @click="showAddProductModal = true"
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
                Ajouter un Produit
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/products')"
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
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </template>
                Gérer les Produits
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/laboratory/orders')"
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
                Voir les Commandes
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/laboratory/analytics')"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </template>
                Analytics
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Stock Alerts -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Alertes Stock
              </h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="product in productsStore.lowStockProducts.slice(0, 3)"
                :key="product.id"
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
              >
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ product.name }}
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  Stock: {{ product.stock }} / {{ product.minStock }} minimum
                </p>
              </div>

              <div
                v-if="productsStore.lowStockProducts.length === 0"
                class="text-center py-4"
              >
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Aucune alerte de stock
                </p>
              </div>
            </div>
          </BaseCard>

          <!-- Expiry Alerts -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Alertes Expiration
              </h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="product in productsStore.expiringProducts.slice(0, 3)"
                :key="product.id"
                class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
              >
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ product.name }}
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  Expire le {{ formatDate(product.expiryDate) }}
                </p>
              </div>

              <div
                v-if="productsStore.expiringProducts.length === 0"
                class="text-center py-4"
              >
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Aucune alerte d'expiration
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Add Product Modal -->
    <BaseModal
      v-if="showAddProductModal"
      title="Ajouter un Produit"
      @close="showAddProductModal = false"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Nom du produit
            </label>
            <BaseInput v-model="newProduct.name" placeholder="Nom du produit" />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Fabricant
            </label>
            <BaseInput
              v-model="newProduct.manufacturer"
              placeholder="Fabricant"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Catégorie
            </label>
            <BaseInput v-model="newProduct.category" placeholder="Catégorie" />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Prix (FCFA)
            </label>
            <BaseInput
              v-model="newProduct.price"
              type="number"
              placeholder="Prix"
            />
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            v-model="newProduct.description"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            rows="3"
            placeholder="Description du produit"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <BaseButton variant="outline" @click="showAddProductModal = false">
            Annuler
          </BaseButton>
          <BaseButton variant="primary" @click="addProduct">
            Ajouter
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useProductsStore } from "@/stores/products";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";

const router = useRouter();
const authStore = useAuthStore();
const productsStore = useProductsStore();

const showAddProductModal = ref(false);
const newProduct = ref({
  name: "",
  manufacturer: "",
  category: "",
  description: "",
  price: "",
  unit: "boîte",
  stock: 0,
  minStock: 5,
  prescription: false,
  expiryDate: "",
});

const recentOrders = 12;

const recentOrdersList = ref([
  {
    id: "ORD001",
    pharmacy: "Pharmacie du Plateau",
    product: "Paracétamol 500mg",
    quantity: 50,
    status: "En cours",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ORD002",
    pharmacy: "Pharmacie Centrale",
    product: "Amoxicilline 1g",
    quantity: 30,
    status: "Livré",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ORD003",
    pharmacy: "Pharmacie de la Liberté",
    product: "Ibuprofène 400mg",
    quantity: 25,
    status: "En attente",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]);

const getStockVariant = (stock, minStock) => {
  if (stock === 0) return "danger";
  if (stock <= minStock) return "warning";
  return "success";
};

const getStockText = (stock, minStock) => {
  if (stock === 0) return "Rupture";
  if (stock <= minStock) return "Stock faible";
  return "En stock";
};

const getOrderStatusVariant = (status) => {
  const variants = {
    "En attente": "warning",
    "En cours": "info",
    Livré: "success",
    Annulé: "danger",
  };
  return variants[status] || "default";
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const editProduct = (product) => {
  // Implement edit product functionality
  console.log("Edit product:", product);
};

const addProduct = async () => {
  try {
    const result = await productsStore.addProduct(newProduct.value);
    if (result.success) {
      showAddProductModal.value = false;
      newProduct.value = {
        name: "",
        manufacturer: "",
        category: "",
        description: "",
        price: "",
        unit: "boîte",
        stock: 0,
        minStock: 5,
        prescription: false,
        expiryDate: "",
      };
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>
