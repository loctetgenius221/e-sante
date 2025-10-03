<template>
  <BaseCard
    :variant="variant"
    class="group hover:shadow-lg transition-all duration-300 cursor-pointer"
    @click="handleClick"
  >
    <!-- Product Image -->
    <div class="relative">
      <img
        :src="product.image || '/images/products/default.jpg'"
        :alt="product.name"
        class="w-full h-48 object-cover rounded-t-lg"
        loading="lazy"
      />

      <!-- Stock Status Badge -->
      <div class="absolute top-2 right-2">
        <BaseBadge
          :variant="getStockVariant(product.stock, product.minStock)"
          size="sm"
        >
          {{ getStockText(product.stock, product.minStock) }}
        </BaseBadge>
      </div>

      <!-- Prescription Badge -->
      <div v-if="product.prescription" class="absolute top-2 left-2">
        <BaseBadge variant="warning" size="sm"> Sur ordonnance </BaseBadge>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Manufacturer -->
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {{ product.manufacturer }}
      </p>

      <!-- Product Name -->
      <h3
        class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2"
      >
        {{ product.name }}
      </h3>

      <!-- Category -->
      <BaseBadge
        :variant="getCategoryVariant(product.category)"
        size="sm"
        class="mb-3"
      >
        {{ product.category }}
      </BaseBadge>

      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
        {{ product.description }}
      </p>

      <!-- Key Info -->
      <div class="space-y-1 mb-4">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">Prix:</span>
          <span class="font-medium text-gray-900 dark:text-gray-100">
            {{ formatPrice(product.price) }} FCFA
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">Stock:</span>
          <span class="text-gray-900 dark:text-gray-100"
            >{{ product.stock }} unités</span
          >
        </div>
      </div>

      <!-- Actions -->
      <div class="flex space-x-2">
        <BaseButton
          v-if="showRequestButton"
          variant="primary"
          size="sm"
          class="flex-1"
          @click.stop="handleRequest"
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
          Demander
        </BaseButton>

        <BaseButton variant="outline" size="sm" @click.stop="handleViewDetails">
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </template>
          Détails
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: "default",
  },
  showRequestButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["request", "view-details"]);

const router = useRouter();
const authStore = useAuthStore();

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

const getCategoryVariant = (category) => {
  const variants = {
    Antalgique: "info",
    Antibiotique: "warning",
    Antihypertenseur: "danger",
    Antidiabétique: "success",
    Vitamine: "secondary",
  };
  return variants[category] || "default";
};

const getExpiryDateClass = (expiryDate) => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  if (expiry <= now) {
    return "text-red-600 dark:text-red-400";
  } else if (expiry <= thirtyDaysFromNow) {
    return "text-yellow-600 dark:text-yellow-400";
  }
  return "text-green-600 dark:text-green-400";
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

const handleClick = () => {
  router.push({
    name: "product-detail",
    params: { id: props.product.id },
  });
};

const handleRequest = () => {
  if (!authStore.isAuthenticated) {
    router.push("/auth/login");
    return;
  }

  emit("request", props.product);
};

const handleViewDetails = () => {
  emit("view-details", props.product);
  router.push({
    name: "product-detail",
    params: { id: props.product.id },
  });
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
