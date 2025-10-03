<template>
  <DashboardLayout
    :navigation-items="navigationItems"
    page-title="Tableau de Bord Laboratoire"
  >
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
              Formations Créées
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ createdTrainings.length }}
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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

      <BaseCard>
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-orange-600 dark:text-orange-400"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Demandes
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ pendingRequests }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Mes Formations -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Mes Formations
              </h3>
              <BaseButton
                variant="primary"
                size="sm"
                @click="$router.push('/laboratory/trainings/create')"
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
                Créer une formation
              </BaseButton>
            </div>
          </template>

          <div v-if="createdTrainings.length === 0" class="text-center py-12">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3
              class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Aucune formation créée
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Créez votre première formation pour commencer à former les
              professionnels
            </p>
            <div class="mt-6">
              <BaseButton
                variant="primary"
                @click="$router.push('/laboratory/trainings/create')"
              >
                Créer ma première formation
              </BaseButton>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="training in createdTrainings.slice(0, 5)"
              :key="training.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex-1">
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ training.title }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ training.participants }} participants
                </p>
                <div class="flex items-center space-x-4 mt-2">
                  <BaseBadge
                    :variant="getTrainingStatusVariant(training.status)"
                    size="sm"
                  >
                    {{ getTrainingStatusLabel(training.status) }}
                  </BaseBadge>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    Créé le {{ formatDate(training.createdAt) }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2 ml-4">
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="editTraining(training)"
                >
                  Modifier
                </BaseButton>
                <BaseButton
                  variant="primary"
                  size="sm"
                  @click="viewTraining(training)"
                >
                  Voir
                </BaseButton>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Mes Produits -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Mes Produits
              </h3>
              <BaseButton
                variant="primary"
                size="sm"
                @click="$router.push('/laboratory/products/create')"
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
                Ajouter un produit
              </BaseButton>
            </div>
          </template>

          <div v-if="products.length === 0" class="text-center py-12">
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
            <h3
              class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Aucun produit ajouté
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ajoutez vos produits pour les promouvoir auprès des professionnels
            </p>
            <div class="mt-6">
              <BaseButton
                variant="primary"
                @click="$router.push('/laboratory/products/create')"
              >
                Ajouter mon premier produit
              </BaseButton>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="product in products.slice(0, 5)"
              :key="product.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex-1">
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ product.name }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ product.category }}
                </p>
                <div class="flex items-center space-x-4 mt-2">
                  <BaseBadge
                    :variant="getProductStatusVariant(product.status)"
                    size="sm"
                  >
                    {{ getProductStatusLabel(product.status) }}
                  </BaseBadge>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ product.requests }} demandes
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2 ml-4">
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="editProduct(product)"
                >
                  Modifier
                </BaseButton>
                <BaseButton
                  variant="primary"
                  size="sm"
                  @click="viewProduct(product)"
                >
                  Voir
                </BaseButton>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Demandes Récentes -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Demandes Récentes
              </h3>
              <BaseButton
                variant="outline"
                size="sm"
                @click="$router.push('/laboratory/requests')"
              >
                Voir toutes
              </BaseButton>
            </div>
          </template>

          <div v-if="recentRequests.length === 0" class="text-center py-8">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3
              class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Aucune demande
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Les demandes de vos produits apparaîtront ici
            </p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="request in recentRequests"
              :key="request.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                </div>
                <div>
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ request.professionalName }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ request.productName }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(request.createdAt) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <BaseBadge
                  :variant="getRequestStatusVariant(request.status)"
                  size="sm"
                >
                  {{ getRequestStatusLabel(request.status) }}
                </BaseBadge>
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
        </BaseCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Club Digital -->
        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Club Digital
              </h3>
              <BaseBadge variant="info" size="sm">Accès</BaseBadge>
            </div>
          </template>
          <div class="text-center py-6">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-white"
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
            <h4
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              Accès au Club Digital
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Rejoignez la communauté des professionnels de santé
            </p>
            <BaseButton
              variant="primary"
              @click="$router.push('/club/dashboard')"
              full-width
            >
              Accéder au Club Digital
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Statistiques Rapides -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Statistiques
            </h3>
          </template>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Formations actives</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >{{ activeTrainings }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Produits publiés</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >{{ publishedProducts }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >Demandes ce mois</span
              >
              <span
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                >{{ monthlyRequests }}</span
              >
            </div>
          </div>
        </BaseCard>

        <!-- Actions Rapides -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Actions Rapides
            </h3>
          </template>
          <div class="space-y-3">
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/laboratory/trainings/create')"
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
              Créer une formation
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              full-width
              @click="$router.push('/laboratory/products/create')"
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
              Ajouter un produit
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
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
              Voir les analytics
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

// Composables
const router = useRouter();
const authStore = useAuthStore();

// Navigation items for sidebar
const navigationItems = ref([
  {
    name: "Tableau de bord",
    href: "/laboratory/dashboard",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Mes formations",
    href: "/laboratory/trainings",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    name: "Mes produits",
    href: "/laboratory/products",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    name: "Demandes",
    href: "/laboratory/requests",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    name: "Analytics",
    href: "/laboratory/analytics",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "Club Digital",
    href: "/club/dashboard",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    name: "Profil",
    href: "/laboratory/profile",
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
]);

// Data
const products = ref([
  {
    id: 1,
    name: "Vaccin COVID-19",
    category: "Vaccin",
    status: "published",
    requests: 15,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    name: "Antibiotique X",
    category: "Antibiotique",
    status: "draft",
    requests: 8,
    createdAt: new Date("2024-02-01"),
  },
]);

const createdTrainings = ref([
  {
    id: 1,
    title: "Formation sur les nouveaux vaccins",
    participants: 45,
    status: "active",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: 2,
    title: "Gestion des effets secondaires",
    participants: 32,
    status: "completed",
    createdAt: new Date("2024-01-20"),
  },
]);

const recentRequests = ref([
  {
    id: 1,
    professionalName: "Dr. Fatou Sarr",
    productName: "Vaccin COVID-19",
    status: "pending",
    createdAt: new Date("2024-02-28"),
  },
  {
    id: 2,
    professionalName: "Dr. Ibrahima Ba",
    productName: "Antibiotique X",
    status: "approved",
    createdAt: new Date("2024-02-27"),
  },
]);

// Computed
const totalParticipants = computed(() =>
  createdTrainings.value.reduce(
    (sum, training) => sum + training.participants,
    0
  )
);

const pendingRequests = computed(
  () =>
    recentRequests.value.filter((request) => request.status === "pending")
      .length
);

const activeTrainings = computed(
  () =>
    createdTrainings.value.filter((training) => training.status === "active")
      .length
);

const publishedProducts = computed(
  () =>
    products.value.filter((product) => product.status === "published").length
);

const monthlyRequests = computed(
  () =>
    recentRequests.value.filter((request) => {
      const now = new Date();
      const requestDate = new Date(request.createdAt);
      return (
        requestDate.getMonth() === now.getMonth() &&
        requestDate.getFullYear() === now.getFullYear()
      );
    }).length
);

// Methods
const getTrainingStatusVariant = (status) => {
  const variants = {
    draft: "default",
    active: "info",
    completed: "success",
    paused: "warning",
  };
  return variants[status] || "default";
};

const getTrainingStatusLabel = (status) => {
  const labels = {
    draft: "Brouillon",
    active: "Actif",
    completed: "Terminé",
    paused: "En pause",
  };
  return labels[status] || status;
};

const getProductStatusVariant = (status) => {
  const variants = {
    draft: "default",
    published: "success",
    archived: "secondary",
  };
  return variants[status] || "default";
};

const getProductStatusLabel = (status) => {
  const labels = {
    draft: "Brouillon",
    published: "Publié",
    archived: "Archivé",
  };
  return labels[status] || status;
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

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const editTraining = (training) => {
  router.push(`/laboratory/trainings/${training.id}/edit`);
};

const viewTraining = (training) => {
  router.push(`/laboratory/trainings/${training.id}`);
};

const editProduct = (product) => {
  router.push(`/laboratory/products/${product.id}/edit`);
};

const viewProduct = (product) => {
  router.push(`/laboratory/products/${product.id}`);
};

const viewRequest = (request) => {
  router.push(`/laboratory/requests/${request.id}`);
};

onMounted(() => {
  // Load data
});
</script>
