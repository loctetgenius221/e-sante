<template>
  <div class="relative">
    <BaseInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      @update:model-value="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="pr-10"
    >
      <template #prefix>
        <svg
          class="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </template>
      <template #suffix>
        <button
          v-if="modelValue && clearable"
          @click="clear"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          :aria-label="clearLabel"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </template>
    </BaseInput>

    <!-- Search suggestions dropdown -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        :class="{ 'bg-gray-50 dark:bg-gray-700': selectedIndex === index }"
      >
        <div class="flex items-center">
          <svg
            class="w-4 h-4 text-gray-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span class="text-sm text-gray-900 dark:text-gray-100">{{
            suggestion
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import BaseInput from "@/components/atoms/BaseInput.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Rechercher...",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  clearLabel: {
    type: String,
    default: "Effacer",
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
  debounceMs: {
    type: Number,
    default: 300,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "search",
  "focus",
  "blur",
  "clear",
]);

const showSuggestions = ref(false);
const selectedIndex = ref(-1);
const debounceTimer = ref(null);

const handleInput = (value) => {
  emit("update:modelValue", value);

  // Debounce search
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }

  debounceTimer.value = setTimeout(() => {
    emit("search", value);
  }, props.debounceMs);

  // Show suggestions if there are any
  showSuggestions.value = value.length > 0 && props.suggestions.length > 0;
  selectedIndex.value = -1;
};

const handleFocus = (event) => {
  emit("focus", event);
  if (props.modelValue.length > 0 && props.suggestions.length > 0) {
    showSuggestions.value = true;
  }
};

const handleBlur = (event) => {
  emit("blur", event);
  // Delay hiding suggestions to allow clicking on them
  setTimeout(() => {
    showSuggestions.value = false;
    selectedIndex.value = -1;
  }, 200);
};

const clear = () => {
  emit("update:modelValue", "");
  emit("clear");
  showSuggestions.value = false;
  selectedIndex.value = -1;
};

const selectSuggestion = (suggestion) => {
  emit("update:modelValue", suggestion);
  emit("search", suggestion);
  showSuggestions.value = false;
  selectedIndex.value = -1;
};

const handleKeydown = (event) => {
  if (!showSuggestions.value || props.suggestions.length === 0) return;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      selectedIndex.value = Math.min(
        selectedIndex.value + 1,
        props.suggestions.length - 1
      );
      break;
    case "ArrowUp":
      event.preventDefault();
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1);
      break;
    case "Enter":
      event.preventDefault();
      if (selectedIndex.value >= 0) {
        selectSuggestion(props.suggestions[selectedIndex.value]);
      }
      break;
    case "Escape":
      showSuggestions.value = false;
      selectedIndex.value = -1;
      break;
  }
};

watch(
  () => props.suggestions,
  (newSuggestions) => {
    if (newSuggestions.length === 0) {
      showSuggestions.value = false;
      selectedIndex.value = -1;
    }
  }
);

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
});
</script>
