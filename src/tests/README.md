# Tests Front E-Santé

## Tests d'Architecture des Rôles

### Description

Ce dossier contient les tests pour valider le bon fonctionnement de l'architecture des rôles dans l'application Front E-Santé.

### Fichiers de Test

#### `role-architecture.test.js`

Tests pour valider l'architecture des rôles :

- Getters du store d'authentification
- Redirections du router
- Permissions d'accès
- Catégories de rôles

### Utilisation

#### Exécution des Tests

```javascript
import { runAllTests } from "@/tests/role-architecture.test.js";

// Exécuter tous les tests
runAllTests();
```

#### Tests Individuels

```javascript
import {
  testAuthStoreGetters,
  testRouterRedirections,
  testAccessPermissions,
  testRoleCategories,
} from "@/tests/role-architecture.test.js";

// Exécuter un test spécifique
testAuthStoreGetters();
```

### Résultats Attendus

#### Test des Getters

```
🧪 Test des getters du store d'authentification
  ✓ Test du rôle: pharmacist
    - isProfessional: true
    - isLaboratory: false
    - isAdmin: false
  ...
```

#### Test des Redirections

```
🧪 Test des redirections du router
  ✓ /club → /club/dashboard
  ✓ /professional-dashboard → /professional/dashboard
  ✓ /structure-dashboard → /laboratory/dashboard
  ✓ /admin → /admin/dashboard
```

#### Test des Permissions

```
🧪 Test des permissions d'accès
  ✓ Rôle: pharmacist
    - Peut accéder: /professional/dashboard, /club/dashboard
    - Ne peut pas accéder: /laboratory/dashboard, /admin/dashboard
  ...
```

### Checklist de Validation

#### ✅ Tests Automatiques

- [x] Getters du store d'authentification
- [x] Redirections du router
- [x] Permissions d'accès
- [x] Catégories de rôles

#### 🔄 Tests Manuels

- [ ] Connexion avec chaque rôle
- [ ] Redirections après connexion
- [ ] Accès au Club Digital
- [ ] Permissions de chaque dashboard
- [ ] Navigation entre les sections

### Développement

#### Ajout de Nouveaux Tests

1. Créer une nouvelle fonction de test
2. Ajouter la fonction à `runAllTests()`
3. Documenter le test dans ce README

#### Exemple de Test

```javascript
export const testNewFeature = () => {
  console.log("🧪 Test de la nouvelle fonctionnalité");

  // Logique de test
  const result = testFunction();

  if (result) {
    console.log("  ✓ Test réussi");
  } else {
    console.log("  ✗ Test échoué");
  }
};
```

### Support

#### En cas de problème

1. Vérifier que les imports sont corrects
2. S'assurer que les fonctions de test sont exportées
3. Vérifier la console pour les erreurs

#### Contact

- Documentation : `src/docs/`
- Tests : `src/tests/`
- Store : `src/stores/auth.js`
- Router : `src/router/index.js`
