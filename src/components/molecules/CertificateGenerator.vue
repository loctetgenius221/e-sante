<template>
  <div class="certificate-generator">
    <!-- Certificate Canvas -->
    <canvas
      ref="certificateCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
      class="hidden"
    ></canvas>

    <!-- Certificate Preview -->
    <div
      v-if="showPreview"
      class="certificate-preview bg-white rounded-lg shadow-lg overflow-hidden"
      :style="{ width: previewWidth + 'px', height: previewHeight + 'px' }"
    >
      <div class="certificate-content h-full flex flex-col">
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center"
        >
          <div class="mb-4">
            <svg
              class="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
          <h1 class="text-3xl font-bold mb-2">CERTIFICAT DE FORMATION</h1>
          <p class="text-blue-100">Front E-Santé - Sénégal</p>
        </div>

        <!-- Content -->
        <div class="flex-1 p-8 text-center">
          <div class="mb-6">
            <p class="text-gray-600 mb-4">Ce certificat atteste que</p>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {{ studentName }}
            </h2>
            <p class="text-gray-600 mb-6">a terminé avec succès la formation</p>
            <h3 class="text-xl font-semibold text-blue-600 mb-4">
              {{ trainingTitle }}
            </h3>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">
                {{ score }}/100
              </div>
              <div class="text-sm text-gray-600">Score obtenu</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600">{{ duration }}</div>
              <div class="text-sm text-gray-600">Durée</div>
            </div>
          </div>

          <div class="text-sm text-gray-500 mb-6">
            Délivré le {{ formatDate(issuedAt) }}
          </div>

          <!-- Signatures -->
          <div class="flex justify-between items-end mt-8">
            <div class="text-center">
              <div class="border-t-2 border-gray-300 w-32 mb-2"></div>
              <div class="text-sm text-gray-600">Formateur</div>
            </div>
            <div class="text-center">
              <div class="border-t-2 border-gray-300 w-32 mb-2"></div>
              <div class="text-sm text-gray-600">Directeur</div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 p-4 text-center text-xs text-gray-500">
          <p>
            Certificat délivré par Front E-Santé - Plateforme de formation
            continue pour les professionnels de santé
          </p>
          <p>ID du certificat: {{ certificateId }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

const props = defineProps({
  studentName: {
    type: String,
    required: true,
  },
  trainingTitle: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  issuedAt: {
    type: String,
    required: true,
  },
  certificateId: {
    type: String,
    required: true,
  },
  showPreview: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["generated"]);

const certificateCanvas = ref(null);

// Canvas dimensions (A4 ratio)
const canvasWidth = 800;
const canvasHeight = 600;

// Preview dimensions
const previewWidth = 400;
const previewHeight = 300;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const generateCertificate = async () => {
  if (!certificateCanvas.value) return null;

  const canvas = certificateCanvas.value;
  const ctx = canvas.getContext("2d");

  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Header gradient background
  const headerGradient = ctx.createLinearGradient(0, 0, canvasWidth, 0);
  headerGradient.addColorStop(0, "#2563eb");
  headerGradient.addColorStop(1, "#4f46e5");

  ctx.fillStyle = headerGradient;
  ctx.fillRect(0, 0, canvasWidth, 120);

  // Header text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText("CERTIFICAT DE FORMATION", canvasWidth / 2, 50);

  ctx.font = "16px Arial";
  ctx.fillText("Front E-Santé - Sénégal", canvasWidth / 2, 80);

  // Main content
  ctx.fillStyle = "#374151";
  ctx.font = "18px Arial";
  ctx.fillText("Ce certificat atteste que", canvasWidth / 2, 180);

  ctx.font = "bold 24px Arial";
  ctx.fillText(props.studentName, canvasWidth / 2, 220);

  ctx.font = "18px Arial";
  ctx.fillText("a terminé avec succès la formation", canvasWidth / 2, 250);

  ctx.fillStyle = "#2563eb";
  ctx.font = "bold 20px Arial";
  ctx.fillText(props.trainingTitle, canvasWidth / 2, 290);

  // Score and duration
  ctx.fillStyle = "#374151";
  ctx.font = "bold 28px Arial";
  ctx.fillText(`${props.score}/100`, canvasWidth / 2 - 100, 350);
  ctx.fillText(props.duration, canvasWidth / 2 + 100, 350);

  ctx.font = "14px Arial";
  ctx.fillText("Score obtenu", canvasWidth / 2 - 100, 380);
  ctx.fillText("Durée", canvasWidth / 2 + 100, 380);

  // Date
  ctx.font = "14px Arial";
  ctx.fillText(
    `Délivré le ${formatDate(props.issuedAt)}`,
    canvasWidth / 2,
    420
  );

  // Signatures
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2 - 150, 480);
  ctx.lineTo(canvasWidth / 2 - 50, 480);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2 + 50, 480);
  ctx.lineTo(canvasWidth / 2 + 150, 480);
  ctx.stroke();

  ctx.fillStyle = "#6b7280";
  ctx.font = "12px Arial";
  ctx.fillText("Formateur", canvasWidth / 2 - 100, 500);
  ctx.fillText("Directeur", canvasWidth / 2 + 100, 500);

  // Footer
  ctx.fillStyle = "#f9fafb";
  ctx.fillRect(0, canvasHeight - 60, canvasWidth, 60);

  ctx.fillStyle = "#6b7280";
  ctx.font = "10px Arial";
  ctx.fillText(
    "Certificat délivré par Front E-Santé - Plateforme de formation continue",
    canvasWidth / 2,
    canvasHeight - 35
  );
  ctx.fillText(
    `ID du certificat: ${props.certificateId}`,
    canvasWidth / 2,
    canvasHeight - 15
  );

  // Convert to blob and emit
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      emit("generated", blob);
      resolve(blob);
    }, "image/png");
  });
};

const downloadCertificate = async () => {
  const blob = await generateCertificate();
  if (blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `certificat-${props.certificateId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Expose methods
defineExpose({
  generateCertificate,
  downloadCertificate,
});

onMounted(() => {
  nextTick(() => {
    generateCertificate();
  });
});
</script>

<style scoped>
.certificate-preview {
  transform: scale(0.8);
  transform-origin: top center;
}

@media (max-width: 640px) {
  .certificate-preview {
    transform: scale(0.6);
  }
}
</style>
