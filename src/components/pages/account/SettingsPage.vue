<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Paramètres du Compte
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Gérez vos informations personnelles et préférences
        </p>
      </div>

      <div class="space-y-8">
        <!-- Profile Information -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Informations Personnelles
            </h3>
          </template>

          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="flex items-center space-x-6">
              <div class="flex-shrink-0">
                <img
                  :src="profileForm.avatar || '/images/default-avatar.jpg'"
                  :alt="profileForm.name"
                  class="h-20 w-20 rounded-full object-cover"
                />
              </div>
              <div class="flex-1">
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="triggerFileUpload"
                >
                  Changer la photo
                </BaseButton>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileUpload"
                />
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  JPG, PNG ou GIF. Taille max : 2MB
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BaseInput
                v-model="profileForm.name"
                label="Nom complet"
                placeholder="Votre nom complet"
                required
              />
              <BaseInput
                v-model="profileForm.email"
                label="Adresse email"
                type="email"
                placeholder="votre@email.com"
                required
              />
              <BaseInput
                v-model="profileForm.phone"
                label="Téléphone"
                placeholder="+225 XX XX XX XX"
              />
              <BaseInput
                v-model="profileForm.profession"
                label="Profession"
                placeholder="Pharmacien, Médecin, etc."
              />
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Bio
              </label>
              <textarea
                v-model="profileForm.bio"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Parlez-nous de vous..."
              />
            </div>

            <div class="flex justify-end">
              <BaseButton
                type="submit"
                variant="primary"
                :loading="isUpdatingProfile"
              >
                Sauvegarder les modifications
              </BaseButton>
            </div>
          </form>
        </BaseCard>

        <!-- Account Settings -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Paramètres du Compte
            </h3>
          </template>

          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Mode Sombre
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Activer le thème sombre pour l'interface
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="settings.darkMode"
                  type="checkbox"
                  class="sr-only peer"
                  @change="toggleDarkMode"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Notifications Email
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Recevoir des notifications par email
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="settings.emailNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Notifications Push
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Recevoir des notifications push dans le navigateur
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="settings.pushNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Langue
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Choisir la langue de l'interface
                </p>
              </div>
              <select
                v-model="settings.language"
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </BaseCard>

        <!-- Security Settings -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Sécurité
            </h3>
          </template>

          <div class="space-y-6">
            <div>
              <h4
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Changer le mot de passe
              </h4>
              <form @submit.prevent="changePassword" class="space-y-4">
                <BaseInput
                  v-model="passwordForm.currentPassword"
                  label="Mot de passe actuel"
                  type="password"
                  placeholder="Votre mot de passe actuel"
                  required
                />
                <BaseInput
                  v-model="passwordForm.newPassword"
                  label="Nouveau mot de passe"
                  type="password"
                  placeholder="Votre nouveau mot de passe"
                  required
                />
                <BaseInput
                  v-model="passwordForm.confirmPassword"
                  label="Confirmer le nouveau mot de passe"
                  type="password"
                  placeholder="Confirmez votre nouveau mot de passe"
                  required
                />
                <div class="flex justify-end">
                  <BaseButton
                    type="submit"
                    variant="primary"
                    :loading="isChangingPassword"
                  >
                    Changer le mot de passe
                  </BaseButton>
                </div>
              </form>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Sessions actives
              </h4>
              <div class="space-y-3">
                <div
                  v-for="session in activeSessions"
                  :key="session.id"
                  class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {{ session.device }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ session.location }} • {{ session.lastActive }}
                    </p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span
                      v-if="session.current"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Session actuelle
                    </span>
                    <BaseButton
                      v-else
                      variant="danger"
                      size="sm"
                      @click="revokeSession(session.id)"
                    >
                      Révoquer
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Danger Zone -->
        <BaseCard>
          <template #header>
            <h3 class="text-lg font-semibold text-red-600 dark:text-red-400">
              Zone de Danger
            </h3>
          </template>

          <div class="space-y-4">
            <div
              class="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20"
            >
              <div>
                <h4 class="text-sm font-medium text-red-800 dark:text-red-200">
                  Supprimer le compte
                </h4>
                <p class="text-sm text-red-600 dark:text-red-400 mt-1">
                  Cette action est irréversible. Toutes vos données seront
                  supprimées.
                </p>
              </div>
              <BaseButton
                variant="danger"
                @click="showDeleteAccountModal = true"
              >
                Supprimer le compte
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <BaseModal
      :show="showDeleteAccountModal"
      @close="showDeleteAccountModal = false"
    >
      <template #title> Supprimer le compte </template>

      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible et toutes vos données seront définitivement supprimées.
        </p>

        <BaseInput
          v-model="deleteConfirmation"
          label="Tapez 'SUPPRIMER' pour confirmer"
          placeholder="SUPPRIMER"
          required
        />

        <div class="flex justify-end space-x-3">
          <BaseButton variant="outline" @click="showDeleteAccountModal = false">
            Annuler
          </BaseButton>
          <BaseButton
            variant="danger"
            :disabled="deleteConfirmation !== 'SUPPRIMER'"
            :loading="isDeletingAccount"
            @click="deleteAccount"
          >
            Supprimer définitivement
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import BaseModal from "@/components/atoms/BaseModal.vue";

const router = useRouter();
const authStore = useAuthStore();

const fileInput = ref(null);
const isUpdatingProfile = ref(false);
const isChangingPassword = ref(false);
const isDeletingAccount = ref(false);
const showDeleteAccountModal = ref(false);
const deleteConfirmation = ref("");

const profileForm = reactive({
  name: "",
  email: "",
  phone: "",
  profession: "",
  bio: "",
  avatar: "",
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const settings = reactive({
  darkMode: false,
  emailNotifications: true,
  pushNotifications: true,
  language: "fr",
});

const activeSessions = ref([
  {
    id: 1,
    device: "Chrome sur Windows",
    location: "Abidjan, Côte d'Ivoire",
    lastActive: "Maintenant",
    current: true,
  },
  {
    id: 2,
    device: "Safari sur iPhone",
    location: "Abidjan, Côte d'Ivoire",
    lastActive: "Il y a 2 heures",
    current: false,
  },
]);

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // In a real app, you would upload the file to a server
    const reader = new FileReader();
    reader.onload = (e) => {
      profileForm.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const updateProfile = async () => {
  isUpdatingProfile.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user in auth store
    authStore.updateUser({
      ...authStore.user,
      ...profileForm,
    });

    // Show success message
    alert("Profil mis à jour avec succès !");
  } catch (error) {
    alert("Erreur lors de la mise à jour du profil");
  } finally {
    isUpdatingProfile.value = false;
  }
};

const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  isChangingPassword.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    Object.assign(passwordForm, {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Mot de passe changé avec succès !");
  } catch (error) {
    alert("Erreur lors du changement de mot de passe");
  } finally {
    isChangingPassword.value = false;
  }
};

const toggleDarkMode = () => {
  authStore.toggleDarkMode();
};

const revokeSession = async (sessionId) => {
  if (confirm("Êtes-vous sûr de vouloir révoquer cette session ?")) {
    activeSessions.value = activeSessions.value.filter(
      (s) => s.id !== sessionId
    );
  }
};

const deleteAccount = async () => {
  if (deleteConfirmation.value !== "SUPPRIMER") {
    return;
  }

  isDeletingAccount.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Logout and redirect
    authStore.logout();
    router.push("/");
  } catch (error) {
    alert("Erreur lors de la suppression du compte");
  } finally {
    isDeletingAccount.value = false;
  }
};

onMounted(() => {
  // Initialize form with current user data
  if (authStore.user) {
    Object.assign(profileForm, {
      name: authStore.user.name || "",
      email: authStore.user.email || "",
      phone: authStore.user.phone || "",
      profession: authStore.user.profession || "",
      bio: authStore.user.bio || "",
      avatar: authStore.user.avatar || "",
    });
  }

  // Initialize settings
  settings.darkMode = authStore.darkMode;
});
</script>
