import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const darkMode = ref(false);

  // Getters
  const userRole = computed(() => user.value?.role || "guest");
  const isAdmin = computed(() => userRole.value === "admin");
  const isProfessional = computed(() =>
    ["pharmacist", "doctor", "student", "midwife"].includes(userRole.value)
  );
  const isLaboratory = computed(() =>
    ["laboratory", "hospital", "clinic"].includes(userRole.value)
  );

  // Legacy getter for backward compatibility
  const isStructure = computed(() => isLaboratory.value);

  // Fonction pour déterminer le dashboard approprié
  const getDashboardRoute = (role) => {
    if (["pharmacist", "doctor", "student", "midwife"].includes(role)) {
      return "/professional/dashboard";
    } else if (["laboratory", "hospital", "clinic"].includes(role)) {
      return "/laboratory/dashboard";
    } else if (role === "admin") {
      return "/admin/dashboard";
    }
    return "/";
  };

  // Legacy getters for backward compatibility
  const isSponsor = computed(() => userRole.value === "sponsor");
  const isPharmacist = computed(() => userRole.value === "pharmacist");
  const isDoctor = computed(() => userRole.value === "doctor");
  const isStudent = computed(() => userRole.value === "student");

  // Actions
  const login = async (credentials) => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data based on role
      const mockUser = {
        id: 1,
        email: credentials.email,
        name: "Utilisateur Test",
        role: credentials.role,
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      user.value = mockUser;
      isAuthenticated.value = true;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");

      // Déterminer le dashboard approprié
      const dashboardRoute = getDashboardRoute(credentials.role);

      return { success: true, user: mockUser, redirectTo: dashboardRoute };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const signup = async (userData) => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      user.value = newUser;
      isAuthenticated.value = true;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isAuthenticated", "true");

      // Déterminer le dashboard approprié
      const dashboardRoute = getDashboardRoute(userData.role);

      return { success: true, user: newUser, redirectTo: dashboardRoute };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  const initializeAuth = () => {
    const savedUser = localStorage.getItem("user");
    const savedAuth = localStorage.getItem("isAuthenticated");

    if (savedUser && savedAuth === "true") {
      user.value = JSON.parse(savedUser);
      isAuthenticated.value = true;
    }

    // Initialize dark mode
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      darkMode.value = JSON.parse(savedDarkMode);
    } else {
      // Check system preference
      darkMode.value = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }
  };

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    localStorage.setItem("darkMode", JSON.stringify(darkMode.value));

    // Apply to document
    if (darkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const updateProfile = async (profileData) => {
    if (!user.value) return { success: false, error: "Not authenticated" };

    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      user.value = { ...user.value, ...profileData };
      localStorage.setItem("user", JSON.stringify(user.value));

      return { success: true, user: user.value };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const updateUser = (userData) => {
    if (!user.value) return;

    user.value = { ...user.value, ...userData };
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    darkMode,

    // Getters
    userRole,
    isAdmin,
    isProfessional,
    isLaboratory,
    isStructure, // Legacy getter for backward compatibility
    // Legacy getters
    isSponsor,
    isPharmacist,
    isDoctor,
    isStudent,

    // Actions
    login,
    signup,
    logout,
    initializeAuth,
    toggleDarkMode,
    updateProfile,
    updateUser,
    getDashboardRoute,
  };
});
