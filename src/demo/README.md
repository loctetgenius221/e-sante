# Démonstrations Front E-Santé

## Démonstration de l'Architecture des Rôles

### Description

Ce dossier contient des démonstrations pour illustrer l'utilisation de la nouvelle architecture des rôles dans l'application Front E-Santé.

### Fichiers de Démonstration

#### `role-architecture-demo.js`

Démonstration complète de l'architecture des rôles :

- Getters du store d'authentification
- Redirections du router
- Permissions d'accès
- Utilisation pratique dans les composants

### Utilisation

#### Exécution de la Démonstration

```javascript
import { runDemo } from "@/demo/role-architecture-demo.js";

// Exécuter la démonstration complète
runDemo();
```

#### Démonstrations Individuelles

```javascript
import {
  demonstrateAuthStore,
  demonstrateRedirections,
  demonstratePermissions,
  demonstratePracticalUsage,
} from "@/demo/role-architecture-demo.js";

// Exécuter une démonstration spécifique
demonstrateAuthStore();
```

### Résultats Attendus

#### Démonstration du Store

```
🔐 Démonstration du Store d'Authentification
──────────────────────────────────────────────────

👤 Rôle: Pharmacien (pharmacist)
  - isProfessional: true
  - isLaboratory: false
  - isAdmin: false
  - isStructure (legacy): false
  - Dashboard: /professional/dashboard
```

#### Démonstration des Redirections

```
🔄 Démonstration des Redirections
──────────────────────────────────────────────────
  ✓ /club → /club/dashboard (Club Digital)
  ✓ /professional-dashboard → /professional/dashboard (Professionnels)
  ✓ /structure-dashboard → /laboratory/dashboard (Laboratoires)
  ✓ /admin → /admin/dashboard (Administrateurs)
```

#### Démonstration des Permissions

```
🔒 Démonstration des Permissions
──────────────────────────────────────────────────

📁 Professionnels de Santé
  - Rôles: pharmacist, doctor, student, midwife
  - Accès: Formations, Certificats, Club Digital
  - Dashboard: /professional/dashboard

📁 Laboratoires/Partenaires
  - Rôles: laboratory, hospital, clinic
  - Accès: Gestion Formations, Produits, Demandes, Club Digital
  - Dashboard: /laboratory/dashboard

📁 Administrateurs
  - Rôles: admin
  - Accès: Gestion Utilisateurs, Modération, Configuration, Club Digital
  - Dashboard: /admin/dashboard
```

### Cas d'Usage Pratiques

#### 1. Composant Vue avec Rôles

```vue
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
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
</script>
```

#### 2. Router avec Redirections

```javascript
// Dans router/index.js
if (authStore.isProfessional) {
  next({ name: "professional-dashboard-new" });
} else if (authStore.isLaboratory) {
  next({ name: "laboratory-dashboard" });
} else if (authStore.isAdmin) {
  next({ name: "admin-dashboard" });
}
```

#### 3. Guards de Route

```javascript
// Vérification des permissions
if (to.meta.requiresRole && authStore.isAuthenticated) {
  const userRole = authStore.userRole;
  const requiredRoles = Array.isArray(to.meta.requiresRole)
    ? to.meta.requiresRole
    : [to.meta.requiresRole];

  if (!requiredRoles.includes(userRole)) {
    // Redirection vers le dashboard approprié
  }
}
```

### Tests Intégrés

La démonstration inclut automatiquement l'exécution des tests d'architecture :

- Tests des getters du store
- Tests des redirections
- Tests des permissions
- Tests des catégories de rôles

### Support

#### En cas de problème

1. Vérifier que les imports sont corrects
2. S'assurer que le store d'authentification est initialisé
3. Vérifier la console pour les erreurs

#### Contact

- Documentation : `src/docs/`
- Tests : `src/tests/`
- Store : `src/stores/auth.js`
- Router : `src/router/index.js`
