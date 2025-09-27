import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCertificatesStore = defineStore("certificates", () => {
  // State
  const certificates = ref([]);
  const isLoading = ref(false);

  // Getters
  const earnedCertificates = computed(() =>
    certificates.value.filter((cert) => cert.status === "earned")
  );

  const pendingCertificates = computed(() =>
    certificates.value.filter((cert) => cert.status === "pending")
  );

  const certificateCount = computed(() => certificates.value.length);

  const completedTrainings = computed(
    () => certificates.value.filter((cert) => cert.status === "earned").length
  );

  const averageScore = computed(() => {
    const earnedCerts = certificates.value.filter(
      (cert) => cert.status === "earned"
    );
    if (earnedCerts.length === 0) return 0;
    const totalScore = earnedCerts.reduce((sum, cert) => sum + cert.score, 0);
    return Math.round(totalScore / earnedCerts.length);
  });

  // Actions
  const fetchCertificates = async () => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Load from localStorage or create mock data
      const savedCertificates = localStorage.getItem("certificates");
      if (savedCertificates) {
        certificates.value = JSON.parse(savedCertificates);
      } else {
        // Mock certificates data
        certificates.value = [
          {
            id: 1,
            trainingId: 1,
            trainingTitle: "Pharmacovigilance et Sécurité des Médicaments",
            score: 85,
            duration: "2h 30min",
            completedAt: new Date(
              Date.now() - 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
            issuedAt: new Date(
              Date.now() - 6 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "earned",
            certificateNumber: "CERT-2024-001",
            downloadUrl: "/certificates/cert-001.pdf",
            verificationCode: "ABC123XYZ",
          },
          {
            id: 2,
            trainingId: 2,
            trainingTitle: "Gestion des Interactions Médicamenteuses",
            score: 92,
            duration: "3h 15min",
            completedAt: new Date(
              Date.now() - 3 * 24 * 60 * 60 * 1000
            ).toISOString(),
            issuedAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "earned",
            certificateNumber: "CERT-2024-002",
            downloadUrl: "/certificates/cert-002.pdf",
            verificationCode: "DEF456UVW",
          },
        ];

        // Save to localStorage
        localStorage.setItem(
          "certificates",
          JSON.stringify(certificates.value)
        );
      }

      return { success: true, data: certificates.value };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const generateCertificate = async (trainingId, score) => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get training title from training data
      const trainingTitle = getTrainingTitle(trainingId);

      const newCertificate = {
        id: Date.now(),
        trainingId,
        trainingTitle,
        score,
        duration: "2h 30min", // This would come from training data
        completedAt: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        status: "earned",
        certificateNumber: `CERT-2024-${String(Date.now()).slice(-3)}`,
        downloadUrl: `/certificates/cert-${Date.now()}.pdf`,
        verificationCode: Math.random()
          .toString(36)
          .substring(2, 11)
          .toUpperCase(),
      };

      certificates.value.push(newCertificate);

      // Save to localStorage
      const savedCertificates = localStorage.getItem("certificates");
      const existingCertificates = savedCertificates
        ? JSON.parse(savedCertificates)
        : [];
      existingCertificates.push(newCertificate);
      localStorage.setItem(
        "certificates",
        JSON.stringify(existingCertificates)
      );

      return { success: true, data: newCertificate };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const getTrainingTitle = (trainingId) => {
    // This would typically come from the trainings store
    const trainingTitles = {
      1: "Pharmacovigilance et Sécurité des Médicaments",
      2: "Gestion des Interactions Médicamenteuses",
      3: "Dermatologie et Soins de la Peau",
      4: "Cardiologie et Maladies Cardiovasculaires",
      5: "Diabétologie et Gestion du Diabète",
    };
    return trainingTitles[trainingId] || "Formation Complétée";
  };

  const downloadCertificate = async (certificateId) => {
    const certificate = certificates.value.find(
      (cert) => cert.id === certificateId
    );
    if (!certificate) {
      return { success: false, error: "Certificat non trouvé" };
    }

    try {
      // Generate certificate using canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions (A4 ratio)
      canvas.width = 800;
      canvas.height = 600;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header gradient background
      const headerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      headerGradient.addColorStop(0, "#2563eb");
      headerGradient.addColorStop(1, "#4f46e5");

      ctx.fillStyle = headerGradient;
      ctx.fillRect(0, 0, canvas.width, 120);

      // Header text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.fillText("CERTIFICAT DE FORMATION", canvas.width / 2, 50);

      ctx.font = "16px Arial";
      ctx.fillText("Front E-Santé - Sénégal", canvas.width / 2, 80);

      // Main content
      ctx.fillStyle = "#374151";
      ctx.font = "18px Arial";
      ctx.fillText("Ce certificat atteste que", canvas.width / 2, 180);

      ctx.font = "bold 24px Arial";
      ctx.fillText("Étudiant Front E-Santé", canvas.width / 2, 220);

      ctx.font = "18px Arial";
      ctx.fillText("a terminé avec succès la formation", canvas.width / 2, 250);

      ctx.fillStyle = "#2563eb";
      ctx.font = "bold 20px Arial";
      ctx.fillText(certificate.trainingTitle, canvas.width / 2, 290);

      // Score and duration
      ctx.fillStyle = "#374151";
      ctx.font = "bold 28px Arial";
      ctx.fillText(`${certificate.score}/100`, canvas.width / 2 - 100, 350);
      ctx.fillText("2h 30min", canvas.width / 2 + 100, 350);

      ctx.font = "14px Arial";
      ctx.fillText("Score obtenu", canvas.width / 2 - 100, 380);
      ctx.fillText("Durée", canvas.width / 2 + 100, 380);

      // Date
      ctx.font = "14px Arial";
      const issuedDate = new Date(certificate.issuedAt).toLocaleDateString(
        "fr-FR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      ctx.fillText(`Délivré le ${issuedDate}`, canvas.width / 2, 420);

      // Signatures
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 150, 480);
      ctx.lineTo(canvas.width / 2 - 50, 480);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + 50, 480);
      ctx.lineTo(canvas.width / 2 + 150, 480);
      ctx.stroke();

      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.fillText("Formateur", canvas.width / 2 - 100, 500);
      ctx.fillText("Directeur", canvas.width / 2 + 100, 500);

      // Footer
      ctx.fillStyle = "#f9fafb";
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

      ctx.fillStyle = "#6b7280";
      ctx.font = "10px Arial";
      ctx.fillText(
        "Certificat délivré par Front E-Santé - Plateforme de formation continue",
        canvas.width / 2,
        canvas.height - 35
      );
      ctx.fillText(
        `ID du certificat: ${certificate.certificateNumber}`,
        canvas.width / 2,
        canvas.height - 15
      );

      // Convert to blob and download
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `certificat-${certificate.certificateNumber}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          resolve({ success: true, data: certificate });
        }, "image/png");
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifyCertificate = async (verificationCode) => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const certificate = certificates.value.find(
        (cert) => cert.verificationCode === verificationCode
      );
      if (certificate) {
        return {
          success: true,
          data: {
            valid: true,
            certificate: {
              ...certificate,
              // Don't expose sensitive data
              verificationCode: undefined,
            },
          },
        };
      } else {
        return {
          success: true,
          data: { valid: false },
        };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const getCertificateById = (certificateId) => {
    return certificates.value.find((cert) => cert.id === certificateId);
  };

  const getCertificatesByTraining = (trainingId) => {
    return certificates.value.filter((cert) => cert.trainingId === trainingId);
  };

  const getCertificateStats = () => {
    const total = certificates.value.length;
    const earned = earnedCertificates.value.length;
    const pending = pendingCertificates.value.length;
    const averageScore =
      earned > 0
        ? Math.round(
            earnedCertificates.value.reduce(
              (sum, cert) => sum + cert.score,
              0
            ) / earned
          )
        : 0;

    return {
      total,
      earned,
      pending,
      averageScore,
    };
  };

  return {
    // State
    certificates,
    isLoading,

    // Getters
    earnedCertificates,
    pendingCertificates,
    certificateCount,
    completedTrainings,
    averageScore,

    // Actions
    fetchCertificates,
    generateCertificate,
    downloadCertificate,
    verifyCertificate,
    getCertificateById,
    getCertificatesByTraining,
    getCertificateStats,
  };
});
