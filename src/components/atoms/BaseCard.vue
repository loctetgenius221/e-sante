<template>
  <div :class="cardClasses">
    <div
      v-if="$slots.header || title"
      class="px-4 py-3 border-b border-gray-200 dark:border-gray-700"
    >
      <slot name="header">
        <h3
          v-if="title"
          class="text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
          {{ title }}
        </h3>
        <p
          v-if="subtitle"
          class="mt-1 text-sm text-gray-600 dark:text-gray-400"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <div class="px-4 py-3">
      <slot></slot>
    </div>

    <div
      v-if="$slots.footer"
      class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "elevated", "outlined", "flat"].includes(value),
  },
  padding: {
    type: String,
    default: "normal",
    validator: (value) => ["none", "sm", "normal", "lg"].includes(value),
  },
  clickable: {
    type: Boolean,
    default: false,
  },
});

const cardClasses = computed(() => {
  const baseClasses = [
    "bg-white",
    "dark:bg-gray-900",
    "rounded-lg",
    "overflow-hidden",
    "transition-all",
    "duration-200",
  ];

  // Variant classes
  const variantClasses = {
    default: ["border", "border-gray-200", "dark:border-gray-700"],
    elevated: ["shadow-lg", "border-0"],
    outlined: ["border-2", "border-gray-300", "dark:border-gray-600"],
    flat: ["border-0", "shadow-none"],
  };

  // Padding classes (slightly reduced scale)
  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    normal: "p-4",
    lg: "p-6",
  };

  // Interactive classes
  const interactiveClasses = props.clickable
    ? [
        "cursor-pointer",
        "hover:shadow-md",
        "hover:scale-[1.02]",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-gray-500",
        "focus:ring-offset-2",
      ]
    : [];

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    paddingClasses[props.padding],
    ...interactiveClasses,
  ];
});
</script>
