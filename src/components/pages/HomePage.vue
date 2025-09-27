<template>
  <div class="min-h-screen">
    <!-- Header -->
    <HomeHeader />

    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Formation Continue pour les
            <span class="text-gray-600 dark:text-gray-300"
              >Professionnels de Santé</span
            >
          </h1>
          <p
            class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            Développez vos compétences avec nos formations certifiantes en
            pharmacovigilance, interactions médicamenteuses et gestion
            pharmaceutique au Sénégal.
          </p>

          

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              variant="primary"
              size="lg"
              @click="$router.push('/catalogue')"
            >
              <template #icon-left>
                <svg
                  class="w-5 h-5"
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
              Explorer le Catalogue
            </BaseButton>
            <BaseButton
              v-if="!authStore.isAuthenticated"
              variant="outline"
              size="lg"
              @click="$router.push('/auth/signup')"
            >
              <template #icon-left>
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </template>
              S'inscrire Gratuitement
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.trainings }}+
            </div>
            <div class="text-gray-600 dark:text-gray-400">Formations</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.students }}+
            </div>
            <div class="text-gray-600 dark:text-gray-400">Professionnels</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.certificates }}+
            </div>
            <div class="text-gray-600 dark:text-gray-400">Certificats</div>
          </div>
          <div class="text-center">
            <div
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ stats.satisfaction }}%
            </div>
            <div class="text-gray-600 dark:text-gray-400">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Trainings -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Formations à la Une
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez nos formations les plus populaires et les mieux notées par
            la communauté
          </p>
        </div>

        <div
          v-if="isLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div v-for="n in 3" :key="n" class="animate-pulse">
            <div class="bg-white dark:bg-gray-900 rounded-lg p-4">
              <div
                class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
              ></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <TrainingCard
            v-for="training in featuredTrainings"
            :key="training.id"
            :training="training"
            variant="elevated"
          />
        </div>

        <div class="text-center mt-12">
          <BaseButton
            variant="outline"
            size="lg"
            @click="$router.push('/catalogue')"
          >
            Voir Toutes les Formations
            <template #icon-right>
              <svg
                class="w-5 h-5"
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
            </template>
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Produits Pharmaceutiques
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez notre catalogue de produits pharmaceutiques de qualité,
            disponibles pour les professionnels de santé
          </p>
        </div>

        <div
          v-if="productsStore.isLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div v-for="n in 3" :key="n" class="animate-pulse">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div
                class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
              ></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
            variant="elevated"
            :show-request-button="
              authStore.isAuthenticated && authStore.user?.role === 'pharmacist'
            "
            @request="handleProductRequest"
          />
        </div>

        <div class="text-center mt-12">
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              variant="outline"
              size="lg"
              @click="$router.push('/products')"
            >
              Voir Tous les Produits
              <template #icon-right>
                <svg
                  class="w-5 h-5"
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
              </template>
            </BaseButton>

            <BaseButton
              v-if="
                authStore.isAuthenticated &&
                authStore.user?.role === 'pharmacist'
              "
              variant="primary"
              size="lg"
              @click="$router.push('/services-pharmacie/demande')"
            >
              <template #icon-left>
                <svg
                  class="w-5 h-5"
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
              Faire une Demande
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Club Digital Highlight -->
    <section
      v-if="authStore.isAuthenticated"
      class="py-16 bg-white dark:bg-gray-900"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Rejoignez le Club Digital
          </h2>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Accédez à une communauté exclusive de professionnels de santé,
            participez aux forums, échangez avec vos pairs et découvrez les
            dernières opportunités.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              variant="secondary"
              size="lg"
              @click="$router.push('/club')"
            >
              <template #icon-left>
                <svg
                  class="w-5 h-5"
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
              Accéder au Club
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Pourquoi Choisir Front E-Santé ?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une plateforme conçue spécialement pour les professionnels de santé
            au Sénégal
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center"
          >
            <div
              class="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <component
                :is="feature.icon"
                class="w-8 h-8 text-white dark:text-gray-900"
              />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
        >
          Prêt à Commencer ?
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Rejoignez des milliers de professionnels de santé qui développent
          leurs compétences avec nous
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton
            v-if="!authStore.isAuthenticated"
            variant="primary"
            size="lg"
            @click="$router.push('/auth/signup')"
          >
            <template #icon-left>
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </template>
            Créer un Compte Gratuit
          </BaseButton>
          <BaseButton
            variant="outline"
            size="lg"
            @click="$router.push('/catalogue')"
          >
            <template #icon-left>
              <svg
                class="w-5 h-5"
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
            Explorer les Formations
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Simple Footer -->
    <SimpleFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useTrainingsStore } from "@/stores/trainings";
import { useProductsStore } from "@/stores/products";
import SearchInput from "@/components/molecules/SearchInput.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import TrainingCard from "@/components/molecules/TrainingCard.vue";
import ProductCard from "@/components/molecules/ProductCard.vue";
import HomeHeader from "@/components/organisms/HomeHeader.vue";
import SimpleFooter from "@/components/organisms/SimpleFooter.vue";

const router = useRouter();
const authStore = useAuthStore();
const trainingsStore = useTrainingsStore();
const productsStore = useProductsStore();

const searchQuery = ref("");
const isLoading = ref(true);

const stats = ref({
  trainings: 50,
  students: 2500,
  certificates: 1800,
  satisfaction: 98,
});

const featuredTrainings = computed(() => trainingsStore.featuredTrainings);
const featuredProducts = computed(() => productsStore.featuredProducts);

const features = ref([
  {
    title: "Certificats reconnus",
    description: "Certifications validées par les instances professionnelles.",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      `,
    },
  },
  {
    title: "Contenu localisé",
    description: "Programmes pensés pour le contexte sénégalais et africain.",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    },
  },
  {
    title: "Communauté active",
    description: "Échanges entre pairs, entraide et opportunités concrètes.",
    icon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      `,
    },
  },
]);

const handleSearch = (value) => {
  searchQuery.value = value;
};

const handleSearchSubmit = (value) => {
  if (value.trim()) {
    router.push({ name: "catalogue", query: { search: value } });
  }
};

const handleProductRequest = (product) => {
  // Handle product request logic
  console.log("Product request:", product);
  // You can implement a modal or redirect to request form
  router.push({
    name: "product-request",
    params: { productId: product.id },
  });
};

onMounted(async () => {
  try {
    await Promise.all([
      trainingsStore.fetchTrainings(),
      productsStore.fetchProducts(),
    ]);
  } finally {
    isLoading.value = false;
  }
});
</script>
