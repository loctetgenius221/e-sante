<template>
  <svg
    :class="classes"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :d="path"
    />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  return props.class || "w-5 h-5";
});
</script>
