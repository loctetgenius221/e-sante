<template>
  <div class="w-full">
    <div v-if="label" class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </span>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ displayValue }}
      </span>
    </div>

    <div class="relative">
      <div
        :class="trackClasses"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-label="ariaLabel"
      >
        <div
          :class="fillClasses"
          :style="{ width: `${percentage}%` }"
          class="transition-all duration-300 ease-out"
        ></div>
      </div>

      <!-- Animated progress indicator -->
      <div
        v-if="animated"
        :class="indicatorClasses"
        :style="{ left: `${percentage}%` }"
        class="absolute top-0 transform -translate-x-1/2 -translate-y-1"
      ></div>
    </div>

    <div v-if="showSteps && steps" class="flex justify-between mt-2">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex flex-col items-center"
      >
        <div
          :class="getStepClasses(index)"
          class="w-2 h-2 rounded-full mb-1"
        ></div>
        <span class="text-xs text-gray-500 dark:text-gray-400">{{ step }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  label: {
    type: String,
    default: "",
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
  animated: {
    type: Boolean,
    default: false,
  },
  showSteps: {
    type: Boolean,
    default: false,
  },
  steps: {
    type: Array,
    default: null,
  },
  format: {
    type: String,
    default: "percentage",
    validator: (value) => ["percentage", "fraction", "value"].includes(value),
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});

const percentage = computed(() => {
  const range = props.max - props.min;
  const adjustedValue = props.value - props.min;
  return Math.min(Math.max((adjustedValue / range) * 100, 0), 100);
});

const displayValue = computed(() => {
  switch (props.format) {
    case "percentage":
      return `${Math.round(percentage.value)}%`;
    case "fraction":
      return `${props.value}/${props.max}`;
    case "value":
      return props.value.toString();
    default:
      return `${Math.round(percentage.value)}%`;
  }
});

const trackClasses = computed(() => {
  const baseClasses = [
    "w-full",
    "bg-gray-200",
    "dark:bg-gray-700",
    "rounded-full",
    "overflow-hidden",
  ];

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return [...baseClasses, sizeClasses[props.size]];
});

const fillClasses = computed(() => {
  const baseClasses = [
    "h-full",
    "rounded-full",
    "transition-all",
    "duration-300",
    "ease-out",
  ];

  const variantClasses = {
    primary: ["bg-gray-900", "dark:bg-gray-100"],
    success: ["bg-green-500", "dark:bg-green-400"],
    warning: ["bg-yellow-500", "dark:bg-yellow-400"],
    danger: ["bg-red-500", "dark:bg-red-400"],
    info: ["bg-blue-500", "dark:bg-blue-400"],
  };

  return [...baseClasses, ...variantClasses[props.variant]];
});

const indicatorClasses = computed(() => {
  const baseClasses = [
    "w-4",
    "h-4",
    "rounded-full",
    "border-2",
    "border-white",
    "dark:border-gray-900",
    "shadow-sm",
  ];

  const variantClasses = {
    primary: "bg-gray-900 dark:bg-gray-100",
    success: "bg-green-500 dark:bg-green-400",
    warning: "bg-yellow-500 dark:bg-yellow-400",
    danger: "bg-red-500 dark:bg-red-400",
    info: "bg-blue-500 dark:bg-blue-400",
  };

  return [...baseClasses, variantClasses[props.variant]];
});

const getStepClasses = (index) => {
  const stepPercentage = ((index + 1) / props.steps.length) * 100;
  const isCompleted = percentage.value >= stepPercentage;

  return isCompleted
    ? "bg-gray-900 dark:bg-gray-100"
    : "bg-gray-300 dark:bg-gray-600";
};
</script>
