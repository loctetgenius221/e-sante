<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        ></div>

        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isOpen"
              :class="modalClasses"
              @click.stop
              role="dialog"
              :aria-modal="true"
              :aria-labelledby="titleId"
              :aria-describedby="descriptionId"
            >
              <!-- Header -->
              <div
                v-if="title || $slots.header"
                class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <div class="flex items-center">
                  <slot name="icon"></slot>
                  <h3
                    v-if="title"
                    :id="titleId"
                    class="text-lg font-semibold text-gray-900 dark:text-gray-100 ml-3"
                  >
                    {{ title }}
                  </h3>
                  <slot name="header"></slot>
                </div>
                <button
                  v-if="closable"
                  @click="close"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  :aria-label="closeLabel"
                >
                  <svg
                    class="w-6 h-6"
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
              </div>

              <!-- Body -->
              <div class="p-6">
                <p
                  v-if="description"
                  :id="descriptionId"
                  class="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  {{ description }}
                </p>
                <slot></slot>
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg"
              >
                <slot name="footer"></slot>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xl", "full"].includes(value),
  },
  closable: {
    type: Boolean,
    default: true,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  closeLabel: {
    type: String,
    default: "Fermer",
  },
});

const emit = defineEmits(["close", "open"]);

const titleId = ref(`modal-title-${Math.random().toString(36).substr(2, 9)}`);
const descriptionId = ref(
  `modal-description-${Math.random().toString(36).substr(2, 9)}`
);

const modalClasses = computed(() => {
  const baseClasses = [
    "relative",
    "bg-white",
    "dark:bg-gray-900",
    "rounded-lg",
    "shadow-xl",
    "transform",
    "transition-all",
    "w-full",
    "max-h-[90vh]",
    "overflow-hidden",
  ];

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  };

  return [...baseClasses, sizeClasses[props.size]];
});

const close = () => {
  emit("close");
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close();
  }
};

const handleEscape = (event) => {
  if (event.key === "Escape" && props.isOpen && props.closable) {
    close();
  }
};

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      emit("open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = "";
});
</script>
