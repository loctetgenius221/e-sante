/**
 * Démonstration de l'architecture des rôles
 *
 * Ce fichier montre comment utiliser la nouvelle architecture des rôles
 * dans l'application Front E-Santé.
 */

import { useAuthStore } from "@/stores/auth.js";
import { runAllTests } from "@/tests/role-architecture.test.js";

// Démonstration des getters du store d'authentification
export const demonstrateAuthStore = () => {
  console.log("🔐 Démonstration du Store d'Authentification");
  console.log("─".repeat(50));

  const authStore = useAuthStore();

  // Simuler différents rôles
  const testRoles = [
    { role: "pharmacist", name: "Pharmacien" },
    { role: "doctor", name: "Médecin" },
    { role: "student", name: "Étudiant" },
    { role: "midwife", name: "Sage-femme" },
    { role: "laboratory", name: "Laboratoire" },
    { role: "hospital", name: "Hôpital" },
    { role: "clinic", name: "Clinique" },
    { role: "admin", name: "Administrateur" },
  ];

  testRoles.forEach(({ role, name }) => {
    console.log(`\n👤 Rôle: ${name} (${role})`);

    // Simuler la connexion avec ce rôle
    authStore.login({ role, name: `Test ${name}` });

    // Afficher les getters
    console.log(`  - isProfessional: ${authStore.isProfessional}`);
    console.log(`  - isLaboratory: ${authStore.isLaboratory}`);
    console.log(`  - isAdmin: ${authStore.isAdmin}`);
    console.log(`  - isStructure (legacy): ${authStore.isStructure}`);

    // Déterminer le dashboard approprié
    let dashboard = "";
    if (authStore.isProfessional) {
      dashboard = "/professional/dashboard";
    } else if (authStore.isLaboratory) {
      dashboard = "/laboratory/dashboard";
    } else if (authStore.isAdmin) {
      dashboard = "/admin/dashboard";
    }

    console.log(`  - Dashboard: ${dashboard}`);
  });

  // Déconnexion
  authStore.logout();
  console.log("\n🔓 Déconnexion effectuée");
};

// Démonstration des redirections
export const demonstrateRedirections = () => {
  console.log("\n🔄 Démonstration des Redirections");
  console.log("─".repeat(50));

  const redirections = [
    { from: "/club", to: "/club/dashboard", description: "Club Digital" },
    {
      from: "/professional-dashboard",
      to: "/professional/dashboard",
      description: "Professionnels",
    },
    {
      from: "/structure-dashboard",
      to: "/laboratory/dashboard",
      description: "Laboratoires",
    },
    { from: "/admin", to: "/admin/dashboard", description: "Administrateurs" },
  ];

  redirections.forEach(({ from, to, description }) => {
    console.log(`  ✓ ${from} → ${to} (${description})`);
  });
};

// Démonstration des permissions
export const demonstratePermissions = () => {
  console.log("\n🔒 Démonstration des Permissions");
  console.log("─".repeat(50));

  const permissions = {
    "Professionnels de Santé": {
      roles: ["pharmacist", "doctor", "student", "midwife"],
      canAccess: ["Formations", "Certificats", "Club Digital"],
      dashboard: "/professional/dashboard",
    },
    "Laboratoires/Partenaires": {
      roles: ["laboratory", "hospital", "clinic"],
      canAccess: ["Gestion Formations", "Produits", "Demandes", "Club Digital"],
      dashboard: "/laboratory/dashboard",
    },
    Administrateurs: {
      roles: ["admin"],
      canAccess: [
        "Gestion Utilisateurs",
        "Modération",
        "Configuration",
        "Club Digital",
      ],
      dashboard: "/admin/dashboard",
    },
  };

  Object.entries(permissions).forEach(([category, info]) => {
    console.log(`\n📁 ${category}`);
    console.log(`  - Rôles: ${info.roles.join(", ")}`);
    console.log(`  - Accès: ${info.canAccess.join(", ")}`);
    console.log(`  - Dashboard: ${info.dashboard}`);
  });
};

// Démonstration de l'utilisation pratique
export const demonstratePracticalUsage = () => {
  console.log("\n💡 Utilisation Pratique");
  console.log("─".repeat(50));

  console.log("// Exemple d'utilisation dans un composant Vue");
  console.log(`
<template>
  <div v-if="authStore.isProfessional">
    <h2>Tableau de Bord Professionnel</h2>
    <p>Bienvenue dans votre espace professionnel</p>
  </div>
  
  <div v-else-if="authStore.isLaboratory">
    <h2>Tableau de Bord Laboratoire</h2>
    <p>Gérez vos formations et produits</p>
  </div>
  
  <div v-else-if="authStore.isAdmin">
    <h2>Tableau de Bord Administrateur</h2>
    <p>Gérez la plateforme</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore();
</script>
  `);

  console.log("\n// Exemple d'utilisation dans le router");
  console.log(`
// Dans router/index.js
if (authStore.isProfessional) {
  next({ name: "professional-dashboard-new" });
} else if (authStore.isLaboratory) {
  next({ name: "laboratory-dashboard" });
} else if (authStore.isAdmin) {
  next({ name: "admin-dashboard" });
}
  `);
};

// Fonction principale de démonstration
export const runDemo = () => {
  console.log("🎯 Démonstration de l'Architecture des Rôles");
  console.log("═".repeat(60));

  demonstrateAuthStore();
  demonstrateRedirections();
  demonstratePermissions();
  demonstratePracticalUsage();

  console.log("\n🧪 Exécution des Tests");
  console.log("─".repeat(50));
  runAllTests();

  console.log("\n✨ Démonstration terminée !");
  console.log("\n📚 Pour plus d'informations:");
  console.log("  - Documentation: src/docs/ROLE_ARCHITECTURE.md");
  console.log("  - Guide de migration: src/docs/MIGRATION_GUIDE.md");
  console.log("  - Tests: src/tests/role-architecture.test.js");
};

// Export par défaut
export default {
  demonstrateAuthStore,
  demonstrateRedirections,
  demonstratePermissions,
  demonstratePracticalUsage,
  runDemo,
};
