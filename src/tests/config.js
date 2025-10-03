/**
 * Configuration des tests pour l'architecture des rôles
 */

export const testConfig = {
  // Rôles de test
  roles: {
    professional: ["pharmacist", "doctor", "student", "midwife"],
    laboratory: ["laboratory", "hospital", "clinic"],
    admin: ["admin"],
  },

  // Routes de test
  routes: {
    professional: "/professional/dashboard",
    laboratory: "/laboratory/dashboard",
    admin: "/admin/dashboard",
    club: "/club/dashboard",
  },

  // Redirections de test
  redirections: [
    { from: "/club", to: "/club/dashboard" },
    { from: "/professional-dashboard", to: "/professional/dashboard" },
    { from: "/structure-dashboard", to: "/laboratory/dashboard" },
    { from: "/admin", to: "/admin/dashboard" },
  ],

  // Permissions de test
  permissions: {
    pharmacist: {
      canAccess: ["/professional/dashboard", "/club/dashboard"],
      cannotAccess: ["/laboratory/dashboard", "/admin/dashboard"],
    },
    doctor: {
      canAccess: ["/professional/dashboard", "/club/dashboard"],
      cannotAccess: ["/laboratory/dashboard", "/admin/dashboard"],
    },
    student: {
      canAccess: ["/professional/dashboard", "/club/dashboard"],
      cannotAccess: ["/laboratory/dashboard", "/admin/dashboard"],
    },
    midwife: {
      canAccess: ["/professional/dashboard", "/club/dashboard"],
      cannotAccess: ["/laboratory/dashboard", "/admin/dashboard"],
    },
    laboratory: {
      canAccess: ["/laboratory/dashboard", "/club/dashboard"],
      cannotAccess: ["/professional/dashboard", "/admin/dashboard"],
    },
    hospital: {
      canAccess: ["/laboratory/dashboard", "/club/dashboard"],
      cannotAccess: ["/professional/dashboard", "/admin/dashboard"],
    },
    clinic: {
      canAccess: ["/laboratory/dashboard", "/club/dashboard"],
      cannotAccess: ["/professional/dashboard", "/admin/dashboard"],
    },
    admin: {
      canAccess: [
        "/admin/dashboard",
        "/club/dashboard",
        "/professional/dashboard",
        "/laboratory/dashboard",
      ],
      cannotAccess: [],
    },
  },

  // Messages de test
  messages: {
    success: "✅ Test réussi",
    failure: "❌ Test échoué",
    info: "ℹ️ Information",
    warning: "⚠️ Avertissement",
    error: "🚨 Erreur",
  },

  // Couleurs pour la console
  colors: {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
};

// Fonction utilitaire pour colorer les messages
export const colorize = (message, color = "white") => {
  return `${testConfig.colors[color]}${message}${testConfig.colors.reset}`;
};

// Fonction utilitaire pour formater les résultats de test
export const formatTestResult = (testName, passed, details = "") => {
  const status = passed ? "✅" : "❌";
  const color = passed ? "green" : "red";
  const message = `${status} ${testName}`;

  if (details) {
    return `${colorize(message, color)}\n    ${colorize(details, "dim")}`;
  }

  return colorize(message, color);
};

// Fonction utilitaire pour grouper les tests
export const groupTests = (groupName, tests) => {
  console.log(`\n${colorize(`🧪 ${groupName}`, "cyan")}`);
  console.log(`${colorize("─".repeat(50), "dim")}`);

  tests.forEach((test) => {
    if (typeof test === "function") {
      test();
    } else {
      console.log(`  ${test}`);
    }
  });
};

// Export par défaut
export default testConfig;
