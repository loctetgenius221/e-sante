<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <StructureHeader />

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
                {{ products.length }}
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Formations Publiées
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ publishedTrainings.length }}
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Demandes Produits
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ productRequests.length }}
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-purple-600 dark:text-purple-400"
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
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Participants
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {{ totalParticipants }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Gestion des Produits -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Gestion des Produits
                </h3>
                <div class="flex space-x-2">
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="$router.push('/products')"
                  >
                    Voir Tous
                  </BaseButton>
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
                    Ajouter
                  </BaseButton>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="product in products.slice(0, 3)"
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
          </BaseCard>

          <!-- Formations Publiées -->
          <BaseCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  Mes Formations
                </h3>
                <div class="flex space-x-2">
                  <BaseButton
                    variant="outline"
                    size="sm"
                    @click="$router.push('/structure/trainings')"
                  >
                    Voir Toutes
                  </BaseButton>
                  <BaseButton
                    variant="primary"
                    size="sm"
                    @click="$router.push('/structure/trainings/create')"
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
                    Créer
                  </BaseButton>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="training in publishedTrainings.slice(0, 3)"
                :key="training.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {{ training.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {{ training.shortDescription }}
                    </p>
                    <div
                      class="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <span>{{ training.duration }}</span>
                      <span>{{ training.lessonsCount }} leçons</span>
                      <span>{{ training.participantsCount }} participants</span>
                    </div>
                  </div>
                  <div class="ml-4 flex items-center space-x-2">
                    <BaseBadge
                      :variant="
                        training.status === 'published' ? 'success' : 'warning'
                      "
                      size="sm"
                    >
                      {{
                        training.status === "published" ? "Publié" : "Brouillon"
                      }}
                    </BaseBadge>
                    <BaseButton
                      variant="outline"
                      size="sm"
                      @click="editTraining(training)"
                    >
                      Modifier
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Demandes de Produits -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Demandes de Produits Récentes
              </h3>
            </template>

            <div class="space-y-4">
              <div
                v-for="request in productRequests.slice(0, 3)"
                :key="request.id"
                class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div>
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ request.productName }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ request.pharmacyName }} • {{ request.quantity }} unités
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(request.requestedAt) }}
                  </p>
                </div>
                <div class="text-right">
                  <BaseBadge
                    :variant="getRequestStatusVariant(request.status)"
                    size="sm"
                  >
                    {{ getRequestStatusLabel(request.status) }}
                  </BaseBadge>
                  <div class="mt-2">
                    <BaseButton
                      variant="outline"
                      size="sm"
                      @click="viewRequest(request)"
                    >
                      Voir
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Actions Rapides -->
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
                @click="$router.push('/structure/trainings/create')"
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </template>
                Créer une Formation
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/structure/requests')"
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
                Gérer les Demandes
              </BaseButton>

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/structure/analytics')"
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

              <BaseButton
                variant="outline"
                full-width
                @click="$router.push('/club')"
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
                Club Digital
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Statistiques Rapides -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Statistiques Rapides
              </h3>
            </template>

            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Produits en stock faible</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ lowStockProducts.length }}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Formations en brouillon</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ draftTrainings.length }}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Demandes en attente</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ pendingRequests.length }}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Taux de satisfaction</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ satisfactionRate }}%
                </span>
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
import StructureHeader from "@/components/organisms/StructureHeader.vue";

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

// Mock data
const products = ref([
  {
    id: 1,
    name: "Paracétamol 500mg",
    manufacturer: "Sanofi",
    category: "Antalgique",
    price: 1500,
    stock: 45,
    minStock: 10,
    image: "/images/products/paracetamol.jpg",
  },
  {
    id: 2,
    name: "Amoxicilline 1g",
    manufacturer: "GSK",
    category: "Antibiotique",
    price: 2500,
    stock: 23,
    minStock: 5,
    image: "/images/products/amoxicilline.jpg",
  },
]);

const publishedTrainings = ref([
  {
    id: 1,
    title: "Formation Produit X",
    shortDescription: "Formation sur l'utilisation du produit X",
    duration: "2h 30min",
    lessonsCount: 5,
    participantsCount: 45,
    status: "published",
  },
  {
    id: 2,
    title: "Formation Produit Y",
    shortDescription: "Formation sur l'utilisation du produit Y",
    duration: "1h 45min",
    lessonsCount: 3,
    participantsCount: 23,
    status: "published",
  },
]);

const productRequests = ref([
  {
    id: 1,
    productName: "Paracétamol 500mg",
    pharmacyName: "Pharmacie du Plateau",
    quantity: 50,
    status: "pending",
    requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    productName: "Amoxicilline 1g",
    pharmacyName: "Pharmacie Centrale",
    quantity: 30,
    status: "approved",
    requestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]);

const totalParticipants = computed(() =>
  publishedTrainings.value.reduce(
    (sum, training) => sum + training.participantsCount,
    0
  )
);

const lowStockProducts = computed(() =>
  products.value.filter((product) => product.stock <= product.minStock)
);

const draftTrainings = computed(() =>
  publishedTrainings.value.filter((training) => training.status === "draft")
);

const pendingRequests = computed(() =>
  productRequests.value.filter((request) => request.status === "pending")
);

const satisfactionRate = 94;

const getRoleLabel = (role) => {
  const labels = {
    laboratory: "Laboratoire",
    hospital: "Hôpital",
    clinic: "Clinique",
  };
  return labels[role] || role;
};

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

const getRequestStatusVariant = (status) => {
  const variants = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
  };
  return variants[status] || "default";
};

const getRequestStatusLabel = (status) => {
  const labels = {
    pending: "En attente",
    approved: "Approuvé",
    rejected: "Rejeté",
  };
  return labels[status] || status;
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
  console.log("Edit product:", product);
};

const editTraining = (training) => {
  router.push({
    name: "structure-training-edit",
    params: { id: training.id },
  });
};

const viewRequest = (request) => {
  router.push({
    name: "structure-request-detail",
    params: { id: request.id },
  });
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
