<template>
  <div class="relative">
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :class="[
        'block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white',
        size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
        size === 'sm' ? 'py-1.5' : size === 'lg' ? 'py-3' : 'py-2',
        disabled
          ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
          : 'bg-white dark:bg-gray-700',
        error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
        variant === 'outline'
          ? 'border-gray-300 dark:border-gray-600'
          : 'border-transparent bg-gray-100 dark:bg-gray-600',
        'appearance-none pr-8',
      ]"
      @change="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- Dropdown arrow icon -->
    <div
      class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <!-- Error message -->
    <p
      v-if="error && errorMessage"
      class="mt-1 text-sm text-red-600 dark:text-red-400"
    >
      {{ errorMessage }}
    </p>

    <!-- Help text -->
    <p
      v-if="help && !error"
      class="mt-1 text-sm text-gray-500 dark:text-gray-400"
    >
      {{ help }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  id: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  help: {
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
    default: "default",
    validator: (value) => ["default", "outline"].includes(value),
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "blur", "focus", "change"]);

// Computed
const computedId = computed(() => {
  return props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
});
</script>

