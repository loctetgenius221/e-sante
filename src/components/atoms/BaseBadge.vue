<template>
  <span :class="badgeClasses">
    <slot name="icon"></slot>
    <span v-if="$slots.default" class="ml-1">
      <slot></slot>
    </span>
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  rounded: {
    type: Boolean,
    default: true,
  },
});

const badgeClasses = computed(() => {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "font-medium",
    "transition-colors",
    "duration-200",
  ];

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  // Rounded classes
  const roundedClasses = props.rounded ? "rounded-full" : "rounded";

  // Variant classes
  const variantClasses = {
    default: [
      "bg-gray-100",
      "text-gray-800",
      "dark:bg-gray-700",
      "dark:text-gray-200",
    ],
    primary: [
      "bg-blue-100",
      "text-blue-800",
      "dark:bg-blue-900",
      "dark:text-blue-200",
    ],
    secondary: [
      "bg-gray-100",
      "text-gray-800",
      "dark:bg-gray-700",
      "dark:text-gray-200",
    ],
    success: [
      "bg-green-100",
      "text-green-800",
      "dark:bg-green-900",
      "dark:text-green-200",
    ],
    warning: [
      "bg-yellow-100",
      "text-yellow-800",
      "dark:bg-yellow-900",
      "dark:text-yellow-200",
    ],
    danger: [
      "bg-red-100",
      "text-red-800",
      "dark:bg-red-900",
      "dark:text-red-200",
    ],
    info: [
      "bg-blue-100",
      "text-blue-800",
      "dark:bg-blue-900",
      "dark:text-blue-200",
    ],
  };

  return [
    ...baseClasses,
    sizeClasses[props.size],
    roundedClasses,
    ...variantClasses[props.variant],
  ];
});
</script>
