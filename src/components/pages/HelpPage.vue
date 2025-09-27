<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Centre d'Aide
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trouvez des réponses à vos questions et obtenez de l'aide pour
            utiliser la plateforme
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <BaseCard class="sticky top-24">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Navigation
            </h3>
            <nav class="space-y-2">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="activeSection = section.id"
                :class="getSectionClasses(section.id)"
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              >
                {{ section.title }}
              </button>
            </nav>
          </BaseCard>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Search -->
          <div class="mb-8">
            <SearchInput
              :model-value="searchQuery"
              placeholder="Rechercher dans l'aide..."
              @update:model-value="handleSearch"
              @search="handleSearchSubmit"
              size="lg"
            />
          </div>

          <!-- FAQ Section -->
          <div v-if="activeSection === 'faq'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Questions Fréquentes
            </h2>
            <div class="space-y-4">
              <div
                v-for="faq in filteredFAQs"
                :key="faq.id"
                class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <button
                  @click="toggleFAQ(faq.id)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 class="font-medium text-gray-900 dark:text-gray-100">
                    {{ faq.question }}
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform"
                    :class="{ 'rotate-180': openFAQs.includes(faq.id) }"
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
                </button>
                <div v-if="openFAQs.includes(faq.id)" class="px-6 pb-4">
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Getting Started Section -->
          <div v-else-if="activeSection === 'getting-started'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Premiers Pas
            </h2>
            <div class="space-y-6">
              <div
                v-for="step in gettingStartedSteps"
                :key="step.id"
                class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div class="flex items-start space-x-4">
                  <div
                    class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <span
                      class="text-sm font-bold text-blue-600 dark:text-blue-400"
                    >
                      {{ step.id }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <h3
                      class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      {{ step.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                      {{ step.description }}
                    </p>
                    <div v-if="step.steps" class="space-y-2">
                      <div
                        v-for="subStep in step.steps"
                        :key="subStep"
                        class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <svg
                          class="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {{ subStep }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Section -->
          <div v-else-if="activeSection === 'contact'">
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Nous Contacter
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Contact Methods -->
              <div class="space-y-6">
                <div
                  class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-5 h-5 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        class="font-semibold text-gray-900 dark:text-gray-100"
                      >
                        Téléphone
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Support technique
                      </p>
                    </div>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300">
                    <a
                      href="tel:+221338123456"
                      class="hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      +221 33 812 34 56
                    </a>
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Lun - Ven: 8h00 - 18h00
                  </p>
                </div>

                <div
                  class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-5 h-5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        class="font-semibold text-gray-900 dark:text-gray-100"
                      >
                        Email
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Support par email
                      </p>
                    </div>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300">
                    <a
                      href="mailto:support@frontesante.sn"
                      class="hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      support@frontesante.sn
                    </a>
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Réponse sous 24h
                  </p>
                </div>

                <div
                  class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-5 h-5 text-green-600 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        class="font-semibold text-gray-900 dark:text-gray-100"
                      >
                        WhatsApp
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Support instantané
                      </p>
                    </div>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300">
                    <a
                      href="https://wa.me/221338123456"
                      target="_blank"
                      class="hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      +221 33 812 34 56
                    </a>
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Disponible 24h/24
                  </p>
                </div>
              </div>

              <!-- Contact Form -->
              <div
                class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
                >
                  Envoyer un message
                </h3>
                <form @submit.prevent="handleContactForm" class="space-y-4">
                  <BaseInput
                    v-model="contactForm.name"
                    label="Nom complet"
                    placeholder="Votre nom"
                    required
                  />
                  <BaseInput
                    v-model="contactForm.email"
                    label="Email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                  />
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Sujet
                    </label>
                    <select
                      v-model="contactForm.subject"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="technical">Problème technique</option>
                      <option value="account">Problème de compte</option>
                      <option value="billing">Facturation</option>
                      <option value="feature">Demande de fonctionnalité</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      v-model="contactForm.message"
                      rows="4"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                      placeholder="Décrivez votre problème ou votre question..."
                      required
                    ></textarea>
                  </div>
                  <BaseButton
                    type="submit"
                    variant="primary"
                    :loading="isSubmittingContact"
                    full-width
                  >
                    Envoyer le message
                  </BaseButton>
                </form>
              </div>
            </div>
          </div>

          <!-- Other sections would go here -->
          <div v-else>
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              {{ getSectionTitle(activeSection) }}
            </h2>
            <div class="text-center py-12">
              <div
                class="mx-auto h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8"
              >
                <svg
                  class="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3
                class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Section en développement
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Cette section sera bientôt disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";

const activeSection = ref("faq");
const searchQuery = ref("");
const openFAQs = ref([]);
const isSubmittingContact = ref(false);

const contactForm = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const sections = ref([
  { id: "faq", title: "Questions Fréquentes" },
  { id: "getting-started", title: "Premiers Pas" },
  { id: "contact", title: "Nous Contacter" },
  { id: "technical", title: "Support Technique" },
  { id: "account", title: "Gestion de Compte" },
  { id: "billing", title: "Facturation" },
]);

const faqs = ref([
  {
    id: 1,
    question: "Comment créer un compte sur la plateforme ?",
    answer:
      "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite de la page. Remplissez le formulaire avec vos informations personnelles et professionnelles, puis sélectionnez votre rôle (pharmacien, médecin, étudiant, etc.). Vous recevrez un email de confirmation pour activer votre compte.",
    category: "account",
  },
  {
    id: 2,
    question: "Comment accéder aux formations ?",
    answer:
      "Une fois connecté, vous pouvez accéder au catalogue des formations depuis le menu principal. Les formations sont organisées par catégories et niveaux. Cliquez sur une formation pour voir les détails et commencer l'apprentissage.",
    category: "training",
  },
  {
    id: 3,
    question: "Comment obtenir un certificat ?",
    answer:
      "Pour obtenir un certificat, vous devez compléter toutes les leçons d'une formation et réussir le quiz final avec un score minimum de 70%. Le certificat sera automatiquement généré et disponible dans votre espace personnel.",
    category: "certificate",
  },
  {
    id: 4,
    question: "Que faire si j'oublie mon mot de passe ?",
    answer:
      "Sur la page de connexion, cliquez sur 'Mot de passe oublié ?'. Entrez votre adresse email et vous recevrez un lien pour réinitialiser votre mot de passe. Vérifiez également votre dossier spam.",
    category: "account",
  },
  {
    id: 5,
    question: "Comment contacter le support technique ?",
    answer:
      "Vous pouvez nous contacter par téléphone au +221 33 812 34 56, par email à support@frontesante.sn, ou via WhatsApp. Notre équipe est disponible du lundi au vendredi de 8h à 18h.",
    category: "support",
  },
  {
    id: 6,
    question: "Les formations sont-elles gratuites ?",
    answer:
      "La plupart de nos formations sont gratuites pour les professionnels de santé inscrits. Certaines formations spécialisées peuvent être payantes. Les prix sont indiqués sur chaque page de formation.",
    category: "billing",
  },
]);

const gettingStartedSteps = ref([
  {
    id: 1,
    title: "Créer votre compte",
    description: "Inscrivez-vous sur la plateforme en quelques minutes",
    steps: [
      "Cliquez sur 'S'inscrire'",
      "Remplissez le formulaire d'inscription",
      "Sélectionnez votre rôle professionnel",
      "Confirmez votre email",
    ],
  },
  {
    id: 2,
    title: "Compléter votre profil",
    description:
      "Ajoutez vos informations professionnelles pour personnaliser votre expérience",
    steps: [
      "Accédez à votre profil",
      "Ajoutez vos informations professionnelles",
      "Téléchargez vos documents de certification",
      "Configurez vos préférences",
    ],
  },
  {
    id: 3,
    title: "Explorer les formations",
    description:
      "Découvrez notre catalogue de formations adaptées à votre profession",
    steps: [
      "Parcourez le catalogue",
      "Utilisez les filtres pour trouver des formations pertinentes",
      "Lisez les descriptions et prérequis",
      "Ajoutez des formations à vos favoris",
    ],
  },
  {
    id: 4,
    title: "Commencer une formation",
    description:
      "Suivez les leçons à votre rythme et progressez dans votre apprentissage",
    steps: [
      "Cliquez sur 'Commencer la formation'",
      "Suivez les leçons dans l'ordre",
      "Prenez des notes personnelles",
      "Marquez les leçons comme terminées",
    ],
  },
  {
    id: 5,
    title: "Passer le quiz et obtenir votre certificat",
    description: "Validez vos connaissances et obtenez votre certification",
    steps: [
      "Terminez toutes les leçons",
      "Passez le quiz final",
      "Obtenez un score minimum de 70%",
      "Téléchargez votre certificat",
    ],
  },
]);

const filteredFAQs = computed(() => {
  if (!searchQuery.value) return faqs.value;

  const query = searchQuery.value.toLowerCase();
  return faqs.value.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
  );
});

const getSectionClasses = (sectionId) => {
  const baseClasses = "hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeClasses =
    "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
  const inactiveClasses = "text-gray-600 dark:text-gray-400";

  return activeSection.value === sectionId
    ? `${baseClasses} ${activeClasses}`
    : `${baseClasses} ${inactiveClasses}`;
};

const getSectionTitle = (sectionId) => {
  const section = sections.value.find((s) => s.id === sectionId);
  return section ? section.title : "Section";
};

const toggleFAQ = (faqId) => {
  const index = openFAQs.value.indexOf(faqId);
  if (index > -1) {
    openFAQs.value.splice(index, 1);
  } else {
    openFAQs.value.push(faqId);
  }
};

const handleSearch = (value) => {
  searchQuery.value = value;
};

const handleSearchSubmit = (value) => {
  searchQuery.value = value;
};

const handleContactForm = async () => {
  isSubmittingContact.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    Object.keys(contactForm).forEach((key) => {
      contactForm[key] = "";
    });

    // Show success message (you could use a toast notification here)
    alert("Votre message a été envoyé avec succès !");
  } catch (error) {
    console.error("Error sending contact form:", error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  } finally {
    isSubmittingContact.value = false;
  }
};

onMounted(() => {
  // Initialize help page
});
</script>
