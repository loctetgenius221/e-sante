import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAdminStore = defineStore("admin", () => {
  // State
  const users = ref([]);
  const trainings = ref([]);
  const certificates = ref([]);
  const forumThreads = ref([]);
  const analytics = ref({
    totalUsers: 0,
    activeUsers: 0,
    totalTrainings: 0,
    totalCertificates: 0,
    totalForumPosts: 0,
    userGrowth: [],
    trainingCompletions: [],
    certificateIssued: [],
  });
  const isLoading = ref(false);

  // Getters
  const activeUsers = computed(() =>
    users.value.filter((user) => user.status === "active")
  );

  const inactiveUsers = computed(() =>
    users.value.filter((user) => user.status === "inactive")
  );

  const userCount = computed(() => users.value.length);

  const trainingCount = computed(() => trainings.value.length);

  const certificateCount = computed(() => certificates.value.length);

  const forumThreadCount = computed(() => forumThreads.value.length);

  const usersByRole = computed(() => {
    const roles = {};
    users.value.forEach((user) => {
      roles[user.role] = (roles[user.role] || 0) + 1;
    });
    return roles;
  });

  // Actions
  const fetchUsers = async () => {
    isLoading.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Load from localStorage or use mock data
      const storedUsers = localStorage.getItem("admin-users");
      if (storedUsers) {
        users.value = JSON.parse(storedUsers);
      } else {
        // Initialize with mock data
        users.value = [
          {
            id: 1,
            name: "Dr. Aminata Diop",
            email: "aminata.diop@example.com",
            role: "pharmacist",
            status: "active",
            avatar: "/images/avatars/aminata-diop.jpg",
            joinedAt: new Date(
              Date.now() - 120 * 24 * 60 * 60 * 1000
            ).toISOString(),
            lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            completedTrainings: 8,
            certificates: 6,
            forumPosts: 23,
            location: "Dakar, Sénégal",
            phone: "+221 77 123 45 67",
            verified: true,
          },
          {
            id: 2,
            name: "Dr. Moussa Fall",
            email: "moussa.fall@example.com",
            role: "doctor",
            status: "active",
            avatar: "/images/avatars/moussa-fall.jpg",
            joinedAt: new Date(
              Date.now() - 90 * 24 * 60 * 60 * 1000
            ).toISOString(),
            lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            completedTrainings: 12,
            certificates: 10,
            forumPosts: 45,
            location: "Thiès, Sénégal",
            phone: "+221 77 234 56 78",
            verified: true,
          },
          {
            id: 3,
            name: "Fatou Sarr",
            email: "fatou.sarr@example.com",
            role: "student",
            status: "active",
            avatar: "/images/avatars/fatou-sarr.jpg",
            joinedAt: new Date(
              Date.now() - 60 * 24 * 60 * 60 * 1000
            ).toISOString(),
            lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            completedTrainings: 4,
            certificates: 3,
            forumPosts: 12,
            location: "Saint-Louis, Sénégal",
            phone: "+221 77 345 67 89",
            verified: false,
          },
          {
            id: 4,
            name: "Ibrahima Ndiaye",
            email: "ibrahima.ndiaye@example.com",
            role: "pharmacist",
            status: "inactive",
            avatar: "/images/avatars/ibrahima-ndiaye.jpg",
            joinedAt: new Date(
              Date.now() - 180 * 24 * 60 * 60 * 1000
            ).toISOString(),
            lastLogin: new Date(
              Date.now() - 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            completedTrainings: 15,
            certificates: 12,
            forumPosts: 8,
            location: "Kaolack, Sénégal",
            phone: "+221 77 456 78 90",
            verified: true,
          },
          {
            id: 5,
            name: "Aïcha Ba",
            email: "aicha.ba@example.com",
            role: "doctor",
            status: "active",
            avatar: "/images/avatars/aicha-ba.jpg",
            joinedAt: new Date(
              Date.now() - 45 * 24 * 60 * 60 * 1000
            ).toISOString(),
            lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            completedTrainings: 6,
            certificates: 5,
            forumPosts: 18,
            location: "Ziguinchor, Sénégal",
            phone: "+221 77 567 89 01",
            verified: true,
          },
        ];
        localStorage.setItem("admin-users", JSON.stringify(users.value));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Calculate analytics
      analytics.value = {
        totalUsers: users.value.length,
        activeUsers: activeUsers.value.length,
        totalTrainings: trainings.value.length,
        totalCertificates: certificates.value.length,
        totalForumPosts: forumThreads.value.length,
        userGrowth: [
          { month: "Jan", users: 120 },
          { month: "Fév", users: 145 },
          { month: "Mar", users: 167 },
          { month: "Avr", users: 189 },
          { month: "Mai", users: 210 },
          { month: "Juin", users: 234 },
        ],
        trainingCompletions: [
          { month: "Jan", completions: 45 },
          { month: "Fév", completions: 52 },
          { month: "Mar", completions: 61 },
          { month: "Avr", completions: 58 },
          { month: "Mai", completions: 67 },
          { month: "Juin", completions: 73 },
        ],
        certificateIssued: [
          { month: "Jan", certificates: 38 },
          { month: "Fév", certificates: 44 },
          { month: "Mar", certificates: 51 },
          { month: "Avr", certificates: 47 },
          { month: "Mai", certificates: 55 },
          { month: "Juin", certificates: 62 },
        ],
      };
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const updateUserStatus = async (userId, status) => {
    isLoading.value = true;
    try {
      const user = users.value.find((u) => u.id === userId);
      if (user) {
        user.status = status;
        user.updatedAt = new Date().toISOString();
        localStorage.setItem("admin-users", JSON.stringify(users.value));
        return { success: true, data: user };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      console.error("Error updating user status:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const updateUserRole = async (userId, role) => {
    isLoading.value = true;
    try {
      const user = users.value.find((u) => u.id === userId);
      if (user) {
        user.role = role;
        user.updatedAt = new Date().toISOString();
        localStorage.setItem("admin-users", JSON.stringify(users.value));
        return { success: true, data: user };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      console.error("Error updating user role:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const deleteUser = async (userId) => {
    isLoading.value = true;
    try {
      const index = users.value.findIndex((u) => u.id === userId);
      if (index !== -1) {
        users.value.splice(index, 1);
        localStorage.setItem("admin-users", JSON.stringify(users.value));
        return { success: true };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      console.error("Error deleting user:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const verifyUser = async (userId) => {
    isLoading.value = true;
    try {
      const user = users.value.find((u) => u.id === userId);
      if (user) {
        user.verified = true;
        user.updatedAt = new Date().toISOString();
        localStorage.setItem("admin-users", JSON.stringify(users.value));
        return { success: true, data: user };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      console.error("Error verifying user:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const getUserById = (userId) => {
    return users.value.find((user) => user.id === userId);
  };

  const getUsersByRole = (role) => {
    return users.value.filter((user) => user.role === role);
  };

  const getUsersByStatus = (status) => {
    return users.value.filter((user) => user.status === status);
  };

  const searchUsers = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return users.value.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.location.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    // State
    users,
    trainings,
    certificates,
    forumThreads,
    analytics,
    isLoading,

    // Getters
    activeUsers,
    inactiveUsers,
    userCount,
    trainingCount,
    certificateCount,
    forumThreadCount,
    usersByRole,

    // Actions
    fetchUsers,
    fetchAnalytics,
    updateUserStatus,
    updateUserRole,
    deleteUser,
    verifyUser,
    getUserById,
    getUsersByRole,
    getUsersByStatus,
    searchUsers,
  };
});
