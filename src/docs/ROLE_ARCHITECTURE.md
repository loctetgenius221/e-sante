# Architecture des Rôles - Front E-Santé

## Vue d'ensemble

L'application Front E-Santé utilise une architecture de rôles basée sur trois catégories principales d'utilisateurs, chacune avec ses propres fonctionnalités et tableaux de bord.

## Catégories d'Utilisateurs

### 1. Professionnels de Santé

- **Rôles** : Pharmacien, Médecin, Étudiant, Sage-femme
- **Accès** : Formation, certificats, Club Digital
- **Dashboard** : `/professional/dashboard`

### 2. Laboratoires/Partenaires

- **Rôles** : Laboratoire, Hôpital, Clinique
- **Accès** : Gestion des formations, produits, demandes, Club Digital
- **Dashboard** : `/laboratory/dashboard`

### 3. Administration

- **Rôle** : Administrateur
- **Accès** : Gestion complète de la plateforme
- **Dashboard** : `/admin/dashboard`

## Architecture Technique

### Store d'Authentification (`src/stores/auth.js`)

```javascript
// Getters principaux
const isProfessional = computed(() =>
  ["pharmacist", "doctor", "student", "midwife"].includes(userRole.value)
);
const isLaboratory = computed(() =>
  ["laboratory", "hospital", "clinic"].includes(userRole.value)
);
const isAdmin = computed(() => userRole.value === "admin");

// Getter de compatibilité
const isStructure = computed(() => isLaboratory.value);
```

### Router (`src/router/index.js`)

```javascript
// Redirections basées sur le rôle
if (authStore.isProfessional) {
  next({ name: "professional-dashboard-new" });
} else if (authStore.isLaboratory) {
  next({ name: "laboratory-dashboard" });
} else if (authStore.isAdmin) {
  next({ name: "admin-dashboard" });
}
```

### Pages d'Authentification

#### LoginPage.vue

- Interface organisée par catégories
- Sélection de rôle avec icônes et descriptions
- Comptes de démonstration par catégorie

#### SignupPage.vue

- Même structure que LoginPage
- Validation des rôles par catégorie

## Navigation et Accès

### Professionnels de Santé

- **Formations** : Inscription et suivi
- **Certificats** : Gestion des certificats obtenus
- **Club Digital** : Accès au forum, messagerie, événements
- **Profil** : Gestion du profil personnel

### Laboratoires/Partenaires

- **Formations** : Création et gestion
- **Produits** : Ajout et promotion
- **Demandes** : Gestion des demandes produits
- **Club Digital** : Accès complet
- **Analytics** : Statistiques et rapports

### Administrateurs

- **Utilisateurs** : Gestion complète
- **Formations** : Validation et gestion
- **Contenu** : Modération du forum
- **Système** : Configuration et maintenance

## Sécurité et Permissions

### Guards de Route

```javascript
// Vérification des rôles requis
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

### Accès au Club Digital

- **Professionnels** : Accès complet après formation
- **Laboratoires** : Accès complet
- **Administrateurs** : Accès complet

## Migration et Compatibilité

### Changements Apportés

1. **Nouveau getter** : `isLaboratory` remplace `isStructure`
2. **Compatibilité** : `isStructure` maintenu pour la rétrocompatibilité
3. **Router** : Mise à jour des redirections
4. **UI** : Interface de sélection de rôle réorganisée

### Points d'Attention

- Les anciens composants utilisant `isStructure` continuent de fonctionner
- Les nouvelles fonctionnalités utilisent `isLaboratory`
- Migration progressive recommandée

## Développement

### Ajout de Nouveaux Rôles

1. Ajouter le rôle dans `auth.js`
2. Mettre à jour les getters si nécessaire
3. Ajouter les routes et permissions
4. Mettre à jour l'interface de sélection

### Tests

- Tester chaque catégorie de rôle
- Vérifier les redirections
- Valider les permissions d'accès
- Tester la navigation entre dashboards

## Conclusion

Cette architecture permet une séparation claire des responsabilités tout en maintenant la flexibilité nécessaire pour l'évolution future de la plateforme.
