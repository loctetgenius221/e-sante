# Documentation Front E-Santé

## Architecture des Rôles

### Vue d'ensemble

L'application utilise une architecture de rôles basée sur trois catégories principales d'utilisateurs, chacune avec ses propres fonctionnalités et tableaux de bord.

### Catégories d'Utilisateurs

#### 1. Professionnels de Santé

- **Rôles** : Pharmacien, Médecin, Étudiant, Sage-femme
- **Accès** : Formation, certificats, Club Digital
- **Dashboard** : `/professional/dashboard`

#### 2. Laboratoires/Partenaires

- **Rôles** : Laboratoire, Hôpital, Clinique
- **Accès** : Gestion des formations, produits, demandes, Club Digital
- **Dashboard** : `/laboratory/dashboard`

#### 3. Administration

- **Rôle** : Administrateur
- **Accès** : Gestion complète de la plateforme
- **Dashboard** : `/admin/dashboard`

## Fichiers de Documentation

### 📁 Architecture

- `ROLE_ARCHITECTURE.md` - Documentation complète de l'architecture des rôles
- `MIGRATION_GUIDE.md` - Guide de migration et changements apportés

### 📁 Tests

- `role-architecture.test.js` - Tests pour valider l'architecture des rôles

## Utilisation

### Démarrage des Tests

```javascript
import { runAllTests } from "@/tests/role-architecture.test.js";

// Exécuter tous les tests
runAllTests();
```

### Vérification des Rôles

```javascript
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();

// Vérifier le type d'utilisateur
if (authStore.isProfessional) {
  // Logique pour les professionnels de santé
} else if (authStore.isLaboratory) {
  // Logique pour les laboratoires
} else if (authStore.isAdmin) {
  // Logique pour les administrateurs
}
```

## Développement

### Ajout de Nouveaux Rôles

1. Ajouter le rôle dans `src/stores/auth.js`
2. Mettre à jour les getters si nécessaire
3. Ajouter les routes et permissions dans `src/router/index.js`
4. Mettre à jour l'interface de sélection dans `LoginPage.vue` et `SignupPage.vue`

### Tests

- Exécuter les tests d'architecture : `runAllTests()`
- Tester chaque catégorie de rôle
- Vérifier les redirections
- Valider les permissions d'accès

## Support

### En cas de problème

1. Vérifier la documentation dans `ROLE_ARCHITECTURE.md`
2. Consulter le guide de migration dans `MIGRATION_GUIDE.md`
3. Exécuter les tests dans `role-architecture.test.js`

### Contact

- Documentation : `src/docs/`
- Tests : `src/tests/`
- Store : `src/stores/auth.js`
- Router : `src/router/index.js`
