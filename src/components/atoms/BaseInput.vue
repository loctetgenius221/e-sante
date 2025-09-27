<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <div
        v-if="$slots.prefix"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="prefix"></slot>
      </div>

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        :aria-invalid="error ? 'true' : 'false'"
      />

      <div
        v-if="$slots.suffix"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <slot name="suffix"></slot>
      </div>
    </div>

    <div
      v-if="helpText && !error"
      class="mt-1 text-sm text-gray-500 dark:text-gray-400"
    >
      {{ helpText }}
    </div>

    <div
      v-if="error"
      :id="`${inputId}-error`"
      class="mt-1 text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  helpText: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);

const inputClasses = computed(() => {
  const baseClasses = [
    "block",
    "w-full",
    "border",
    "rounded-lg",
    "transition-colors",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-0",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:bg-gray-50",
    "dark:disabled:bg-gray-800",
  ];

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  // State classes
  const stateClasses = props.error
    ? [
        "border-red-300",
        "focus:border-red-500",
        "focus:ring-red-500",
        "dark:border-red-600",
        "dark:focus:border-red-400",
      ]
    : [
        "border-gray-300",
        "focus:border-gray-500",
        "focus:ring-gray-500",
        "dark:border-gray-600",
        "dark:focus:border-gray-400",
      ];

  // Background classes
  const backgroundClasses = props.readonly
    ? ["bg-gray-50", "dark:bg-gray-800"]
    : ["bg-white", "dark:bg-gray-900"];

  // Padding adjustments for prefix/suffix
  const paddingClasses = [];
  if (props.$slots?.prefix) {
    paddingClasses.push("pl-10");
  }
  if (props.$slots?.suffix) {
    paddingClasses.push("pr-10");
  }

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...stateClasses,
    ...backgroundClasses,
    ...paddingClasses,
  ];
});

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleBlur = (event) => {
  emit("blur", event);
};

const handleFocus = (event) => {
  emit("focus", event);
};
</script>
