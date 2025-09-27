<template>
  <div class="w-full">
    <div class="flex justify-between text-sm mb-1" v-if="showLabel">
      <span class="text-gray-600 dark:text-gray-400">{{ label }}</span>
      <span class="text-gray-900 dark:text-gray-100">{{ percentage }}%</span>
    </div>
    <div
      class="bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      :class="containerClasses"
    >
      <div
        class="h-full transition-all duration-300 ease-in-out"
        :class="progressClasses"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "success", "warning", "danger", "info"].includes(value),
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});

const percentage = computed(() => {
  const percent = (props.value / props.max) * 100;
  return Math.min(Math.max(percent, 0), 100);
});

const containerClasses = computed(() => {
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };
  return sizes[props.size];
});

const progressClasses = computed(() => {
  const variants = {
    primary: "bg-blue-600 dark:bg-blue-500",
    success: "bg-green-600 dark:bg-green-500",
    warning: "bg-yellow-600 dark:bg-yellow-500",
    danger: "bg-red-600 dark:bg-red-500",
    info: "bg-cyan-600 dark:bg-cyan-500",
  };
  return variants[props.variant];
});
</script>
