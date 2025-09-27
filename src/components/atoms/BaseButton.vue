<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
    :aria-label="ariaLabel"
  >
    <div
      v-if="loading"
      class="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"
    ></div>
    <slot v-if="!loading" name="icon-left"></slot>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <slot v-if="!loading" name="icon-right"></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "danger",
        "success",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xl"].includes(value),
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ];

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: [
      "bg-gray-900",
      "text-white",
      "hover:bg-gray-800",
      "focus:ring-gray-500",
      "dark:bg-gray-100",
      "dark:text-gray-900",
      "dark:hover:bg-gray-200",
    ],
    secondary: [
      "bg-gray-100",
      "text-gray-900",
      "hover:bg-gray-200",
      "focus:ring-gray-500",
      "dark:bg-gray-800",
      "dark:text-gray-100",
      "dark:hover:bg-gray-700",
    ],
    outline: [
      "border",
      "border-gray-300",
      "bg-transparent",
      "text-gray-700",
      "hover:bg-gray-50",
      "focus:ring-gray-500",
      "dark:border-gray-600",
      "dark:text-gray-300",
      "dark:hover:bg-gray-800",
    ],
    ghost: [
      "bg-transparent",
      "text-gray-700",
      "hover:bg-gray-100",
      "focus:ring-gray-500",
      "dark:text-gray-300",
      "dark:hover:bg-gray-800",
    ],
    danger: [
      "bg-red-600",
      "text-white",
      "hover:bg-red-700",
      "focus:ring-red-500",
      "dark:bg-red-500",
      "dark:hover:bg-red-600",
    ],
    success: [
      "bg-green-600",
      "text-white",
      "hover:bg-green-700",
      "focus:ring-green-500",
      "dark:bg-green-500",
      "dark:hover:bg-green-600",
    ],
  };

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[props.variant],
    props.fullWidth ? "w-full" : "",
  ];
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>
