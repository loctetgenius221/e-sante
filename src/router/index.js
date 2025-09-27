import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/components/pages/HomePage.vue"),
      meta: { title: "Accueil" },
    },
    {
      path: "/auth",
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/components/pages/auth/LoginPage.vue"),
          meta: { title: "Connexion", guest: true },
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("@/components/pages/auth/SignupPage.vue"),
          meta: { title: "Inscription", guest: true },
        },
      ],
    },
    {
      path: "/catalogue",
      name: "catalogue",
      component: () => import("@/components/pages/CataloguePage.vue"),
      meta: { title: "Catalogue des Formations" },
    },
    {
      path: "/formations/:slug",
      name: "training-detail",
      component: () => import("@/components/pages/TrainingDetailPage.vue"),
      meta: { title: "Détail de la Formation" },
    },
    {
      path: "/formations/:slug/lesson/:id",
      name: "lesson",
      component: () => import("@/components/pages/LessonPage.vue"),
      meta: { title: "Leçon", requiresAuth: true },
    },
    {
      path: "/formations/:slug/quiz",
      name: "quiz",
      component: () => import("@/components/pages/QuizPage.vue"),
      meta: { title: "Quiz", requiresAuth: true },
    },
    {
      path: "/mon-compte",
      name: "account",
      component: () => import("@/components/pages/AccountPage.vue"),
      meta: { title: "Mon Compte", requiresAuth: true },
      children: [
        {
          path: "",
          name: "account-dashboard",
          component: () =>
            import("@/components/pages/account/DashboardPage.vue"),
          meta: { title: "Tableau de Bord" },
        },
        {
          path: "progression",
          name: "account-progress",
          component: () =>
            import("@/components/pages/account/ProgressPage.vue"),
          meta: { title: "Ma Progression" },
        },
        {
          path: "certificats",
          name: "account-certificates",
          component: () => import("@/components/pages/CertificatesPage.vue"),
          meta: { title: "Mes Certificats" },
        },
        {
          path: "parametres",
          name: "account-settings",
          component: () =>
            import("@/components/pages/account/SettingsPage.vue"),
          meta: { title: "Paramètres" },
        },
      ],
    },
    {
      path: "/club",
      name: "club",
      component: () => import("@/components/pages/ClubPage.vue"),
      meta: { title: "Club Digital", requiresAuth: true },
      children: [
        {
          path: "",
          name: "club-home",
          component: () => import("@/components/pages/club/ClubHomePage.vue"),
          meta: { title: "Accueil Club" },
        },
        {
          path: "forum",
          name: "club-forum",
          component: () => import("@/components/pages/club/ForumPage.vue"),
          meta: { title: "Forum" },
        },
        {
          path: "forum/:id",
          name: "forum-thread",
          component: () =>
            import("@/components/pages/club/ForumThreadPage.vue"),
          meta: { title: "Sujet du Forum" },
        },
        {
          path: "messagerie",
          name: "club-messages",
          component: () => import("@/components/pages/club/MessagesPage.vue"),
          meta: { title: "Messagerie" },
        },
        {
          path: "evenements",
          name: "club-events",
          component: () => import("@/components/pages/club/EventsPage.vue"),
          meta: { title: "Événements" },
        },
        {
          path: "opportunites",
          name: "club-opportunities",
          component: () =>
            import("@/components/pages/club/OpportunitiesPage.vue"),
          meta: { title: "Opportunités" },
        },
      ],
    },
    {
      path: "/services-pharmacie",
      name: "pharmacy-services",
      component: () => import("@/components/pages/PharmacyServicesPage.vue"),
      meta: { title: "Services Pharmacie", requiresAuth: true },
      children: [
        {
          path: "",
          name: "pharmacy-dashboard",
          component: () =>
            import("@/components/pages/pharmacy/DashboardPage.vue"),
          meta: { title: "Tableau de Bord Pharmacie" },
        },
        {
          path: "demande",
          name: "pharmacy-requests",
          component: () =>
            import("@/components/pages/pharmacy/RequestsPage.vue"),
          meta: { title: "Demandes de Produits" },
        },
        {
          path: "produits/:id",
          name: "pharmacy-product",
          component: () =>
            import("@/components/pages/pharmacy/ProductPage.vue"),
          meta: { title: "Détail Produit" },
        },
        {
          path: "recrutement",
          name: "pharmacy-recruitment",
          component: () =>
            import("@/components/pages/pharmacy/RecruitmentPage.vue"),
          meta: { title: "Recrutement" },
        },
      ],
    },
    {
      path: "/sponsors",
      name: "sponsors",
      component: () => import("@/components/pages/SponsorsPage.vue"),
      meta: { title: "Partenaires" },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/components/pages/ProductsPage.vue"),
      meta: { title: "Produits Pharmaceutiques" },
    },
    {
      path: "/courses/:id",
      name: "course-detail",
      component: () =>
        import("@/components/pages/courses/CourseDetailPage.vue"),
      meta: {
        title: "Détail du Cours",
        requiresAuth: true,
        requiresRole: ["pharmacist", "doctor", "student", "midwife"],
      },
    },
    {
      path: "/courses/:courseId/quiz",
      name: "course-quiz",
      component: () => import("@/components/pages/courses/CourseQuizPage.vue"),
      meta: {
        title: "Quiz du Cours",
        requiresAuth: true,
        requiresRole: ["pharmacist", "doctor", "student", "midwife"],
      },
    },
    {
      path: "/courses/:courseId/certificate",
      name: "course-certificate",
      component: () =>
        import("@/components/pages/courses/CourseCertificatePage.vue"),
      meta: {
        title: "Certificat du Cours",
        requiresAuth: true,
        requiresRole: ["pharmacist", "doctor", "student", "midwife"],
      },
    },
    {
      path: "/professional-dashboard",
      name: "professional-dashboard",
      component: () =>
        import("@/components/pages/dashboards/ProfessionalDashboardPage.vue"),
      meta: {
        title: "Mon Espace Formation",
        requiresAuth: true,
        requiresRole: ["pharmacist", "doctor", "student", "midwife"],
      },
    },
    {
      path: "/structure-dashboard",
      name: "structure-dashboard",
      component: () =>
        import("@/components/pages/dashboards/StructureDashboardPage.vue"),
      meta: {
        title: "Tableau de Bord Structure",
        requiresAuth: true,
        requiresRole: ["laboratory", "hospital", "clinic"],
      },
    },
    {
      path: "/sponsor",
      name: "sponsor-dashboard",
      component: () => import("@/components/pages/SponsorDashboardPage.vue"),
      meta: {
        title: "Tableau de Bord Partenaire",
        requiresAuth: true,
        requiresRole: "sponsor",
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/components/pages/AdminDashboardPage.vue"),
      meta: {
        title: "Administration",
        requiresAuth: false,
        // requiresRole: "admin",
      },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: () => import("@/components/pages/admin/DashboardPage.vue"),
          meta: { title: "Tableau de Bord Admin" },
        },
        {
          path: "users",
          name: "admin-users",
          component: () => import("@/components/pages/admin/UsersPage.vue"),
          meta: { title: "Gestion des Utilisateurs" },
        },
        {
          path: "content",
          name: "admin-content",
          component: () => import("@/components/pages/admin/ContentPage.vue"),
          meta: { title: "Gestion du Contenu" },
        },
        {
          path: "moderation",
          name: "admin-moderation",
          component: () =>
            import("@/components/pages/admin/ModerationPage.vue"),
          meta: { title: "Modération Forum" },
        },
        {
          path: "reports",
          name: "admin-reports",
          component: () => import("@/components/pages/admin/ReportsPage.vue"),
          meta: { title: "Rapports" },
        },
      ],
    },
    {
      path: "/aide",
      name: "help",
      component: () => import("@/components/pages/HelpPage.vue"),
      meta: { title: "Aide" },
    },
    {
      path: "/legal",
      name: "legal",
      component: () => import("@/components/pages/LegalPage.vue"),
      meta: { title: "Mentions Légales" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/components/pages/NotFoundPage.vue"),
      meta: { title: "Page Non Trouvée" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Initialize auth if not already done
  if (!authStore.isAuthenticated && localStorage.getItem("user")) {
    authStore.initializeAuth();
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login", query: { redirect: to.fullPath } });
    return;
  }

  // Check if route requires specific role
  if (to.meta.requiresRole && authStore.isAuthenticated) {
    const userRole = authStore.userRole;
    const requiredRoles = Array.isArray(to.meta.requiresRole)
      ? to.meta.requiresRole
      : [to.meta.requiresRole];

    if (!requiredRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on user role
      if (authStore.isProfessional) {
        next({ name: "professional-dashboard" });
      } else if (authStore.isStructure) {
        next({ name: "structure-dashboard" });
      } else if (authStore.isAdmin) {
        next({ name: "admin" });
      } else {
        next({ name: "home" });
      }
      return;
    }
  }

  // Redirect authenticated users away from guest-only pages
  if (to.meta.guest && authStore.isAuthenticated) {
    // Redirect to appropriate dashboard based on user role
    if (authStore.isProfessional) {
      next({ name: "professional-dashboard" });
    } else if (authStore.isStructure) {
      next({ name: "structure-dashboard" });
    } else if (authStore.isAdmin) {
      next({ name: "admin" });
    } else {
      next({ name: "home" });
    }
    return;
  }

  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Front E-Santé`;
  }

  next();
});

export default router;
