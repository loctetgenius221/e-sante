<template>
  <BaseCard
    :clickable="true"
    :variant="variant"
    class="group p-0"
    @click="handleClick"
  >
    <template #header>
      <div class="relative">
        <img
          :src="training.image"
          :alt="training.title"
          class="w-full h-48 object-cover rounded-lg"
          loading="lazy"
        />
        <div class="absolute top-3 left-3">
          <BaseBadge :variant="getDifficultyVariant(training.difficulty)">
            {{ getDifficultyLabel(training.difficulty) }}
          </BaseBadge>
        </div>
        <div class="absolute top-3 right-3">
          <BaseBadge v-if="training.featured" variant="warning">
            <template #icon>
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </template>
            À la une
          </BaseBadge>
        </div>
      </div>
    </template>

    <div class="space-y-3">
      <div>
        <h3
          class="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
        >
          {{ training.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
          {{ training.shortDescription }}
        </p>
      </div>

      <div
        class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
      >
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <svg
              class="w-4 h-4 mr-1"
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
            {{ training.duration }}
          </div>
          <div class="flex items-center">
            <svg
              class="w-4 h-4 mr-1"
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
            {{ training.studentsCount.toLocaleString() }}
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex items-center">
            <svg
              class="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            {{ training.rating }}
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-1">
        <BaseBadge
          v-for="tag in training.tags.slice(0, 3)"
          :key="tag"
          size="sm"
          variant="secondary"
        >
          {{ tag }}
        </BaseBadge>
        <BaseBadge
          v-if="training.tags.length > 3"
          size="sm"
          variant="secondary"
        >
          +{{ training.tags.length - 3 }}
        </BaseBadge>
      </div>

      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <img
            :src="training.instructor.avatar"
            :alt="training.instructor.name"
            class="w-6 h-6 rounded-full mr-2"
          />
          <span>{{ training.instructor.name }}</span>
        </div>
        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ training.price === 0 ? "Gratuit" : `${training.price} FCFA` }}
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const props = defineProps({
  training: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: "default",
  },
});

const emit = defineEmits(["click"]);

const router = useRouter();

const getDifficultyVariant = (difficulty) => {
  const variants = {
    débutant: "success",
    intermédiaire: "warning",
    avancé: "danger",
  };
  return variants[difficulty] || "default";
};

const getDifficultyLabel = (difficulty) => {
  const labels = {
    débutant: "Débutant",
    intermédiaire: "Intermédiaire",
    avancé: "Avancé",
  };
  return labels[difficulty] || difficulty;
};

const handleClick = () => {
  emit("click", props.training);
  router.push({
    name: "training-detail",
    params: { slug: props.training.slug },
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
