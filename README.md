# Front E-Santé - Plateforme E-Learning pour Professionnels de Santé

Une plateforme moderne de formation continue pour les professionnels de santé au Sénégal, construite avec Vue 3, TailwindCSS et les meilleures pratiques de développement frontend.

## 🚀 Fonctionnalités

### ✅ Implémentées

- **Architecture moderne** : Vue 3 Composition API + Pinia + Vue Router
- **Design responsive** : Mobile-first avec TailwindCSS v4
- **Mode sombre** : Toggle automatique avec persistance
- **Authentification** : Système de connexion/inscription avec sélection de rôle
- **Navigation adaptative** : Header desktop + navigation mobile en bas
- **Catalogue de formations** : Recherche, filtres et affichage des formations
- **Pages de détail** : Informations complètes sur chaque formation
- **Composants réutilisables** : Architecture atomique (atoms, molecules, organisms)
- **Accessibilité** : Support ARIA, navigation clavier, contraste optimisé
- **Performance** : Lazy-loading des routes, optimisations mobiles

### 🔄 En développement

- Lecteur de leçons (vidéo/audio)
- Système de quiz et certification
- Tableau de bord utilisateur
- Club Digital (forum, messagerie, événements)
- Services pharmacie
- Interface administrateur
- Dashboard partenaires

## 🛠️ Technologies

- **Frontend** : Vue 3.5+ (Composition API)
- **Styling** : TailwindCSS v4
- **State Management** : Pinia
- **Routing** : Vue Router 4
- **Build Tool** : Vite
- **Icons** : Heroicons (SVG)
- **Fonts** : Inter (Google Fonts)

## 📁 Structure du Projet

```
src/
├── components/
│   ├── atoms/           # Composants de base (Button, Input, Card, etc.)
│   ├── molecules/       # Composants composés (SearchInput, TrainingCard, etc.)
│   ├── organisms/       # Composants complexes (Header, Navigation, etc.)
│   └── pages/           # Pages de l'application
├── stores/              # Stores Pinia (auth, trainings, quiz, etc.)
├── router/              # Configuration Vue Router
├── data/                # Données mockées
├── utils/               # Utilitaires
├── composables/         # Composables Vue
└── assets/              # Assets statiques
```

## 🎨 Design System

### Couleurs

- **Primaire** : Nuances de gris (neutre, professionnel)
- **Accent** : Bleu pour les actions importantes
- **États** : Vert (succès), Jaune (attention), Rouge (erreur)
- **Mode sombre** : Support complet avec transition fluide

### Typographie

- **Police** : Inter (lisible, moderne)
- **Hiérarchie** : 6 niveaux de titres + texte de base
- **Responsive** : Tailles adaptatives selon l'écran

### Composants

- **Boutons** : 6 variantes, 4 tailles, états de chargement
- **Inputs** : Validation, états d'erreur, préfixes/suffixes
- **Cards** : 4 variantes, padding adaptatif
- **Badges** : 7 variantes, 3 tailles
- **Modals** : Accessibles, fermeture par backdrop/ESC

## 🔐 Authentification

### Rôles supportés

- **Pharmacien** : Accès complet aux formations et services
- **Médecin** : Formations médicales et Club Digital
- **Étudiant** : Formations de base et communauté
- **Partenaire** : Dashboard sponsor et métriques
- **Admin** : Interface d'administration complète

### Comptes de démonstration

```
Pharmacien: pharma@demo.com / demo123
Médecin: medecin@demo.com / demo123
Étudiant: etudiant@demo.com / demo123
Sponsor: sponsor@demo.com / demo123
Admin: admin@demo.com / demo123
```

## 📱 Responsive Design

### Breakpoints

- **Mobile** : < 640px (navigation en bas)
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px (navigation en haut)

### Optimisations mobiles

- Navigation tactile optimisée
- Boutons de taille appropriée (44px minimum)
- Chargement rapide sur connexions lentes
- Interface adaptée aux écrans tactiles

## ♿ Accessibilité

### Standards respectés

- **WCAG 2.1** : Niveau AA
- **ARIA** : Labels et descriptions appropriés
- **Navigation clavier** : Support complet
- **Contraste** : Ratios conformes aux standards
- **Focus visible** : Indicateurs clairs

### Fonctionnalités

- Navigation au clavier
- Lecteurs d'écran compatibles
- Contraste élevé
- Textes alternatifs
- Structure sémantique

## 🚀 Installation et Développement

### Prérequis

- Node.js 20.19.0+ ou 22.12.0+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd front-e-sante

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
```

## 📊 Données Mockées

Le projet inclut des données de démonstration pour :

- **Formations** : 4 formations complètes avec leçons et ressources
- **Utilisateurs** : Profils de différents rôles
- **Forum** : Sujets et messages d'exemple
- **Partenaires** : Données de sponsors
- **Événements** : Conférences et formations

## 🔄 État de Développement

### Phase 1 - ✅ Terminée

- Architecture et structure de base
- Authentification et navigation
- Pages principales (accueil, catalogue, détail)
- Composants UI de base
- Mode sombre et accessibilité

### Phase 2 - 🔄 En cours

- Lecteur de leçons
- Système de quiz
- Tableau de bord utilisateur
- Club Digital

### Phase 3 - 📋 Planifiée

- Services pharmacie
- Interface administrateur
- Dashboard partenaires
- Intégration API backend

## 🎯 Objectifs

### Technique

- **Performance** : Score Lighthouse > 90
- **Accessibilité** : Conformité WCAG 2.1 AA
- **SEO** : Optimisation pour les moteurs de recherche
- **PWA** : Application web progressive

### Utilisateur

- **UX** : Interface intuitive et moderne
- **Mobile** : Expérience optimale sur tous les appareils
- **Performance** : Chargement rapide même sur connexions lentes
- **Accessibilité** : Utilisable par tous les utilisateurs

## 🤝 Contribution

### Guidelines

1. Respecter l'architecture atomique
2. Utiliser TypeScript pour la typage
3. Tester sur mobile et desktop
4. Vérifier l'accessibilité
5. Documenter les composants

### Workflow

1. Fork du projet
2. Création d'une branche feature
3. Développement avec tests
4. Pull request avec description détaillée

## 📄 Licence

Ce projet est développé pour l'amélioration de la formation des professionnels de santé au Sénégal.

## 📞 Support

Pour toute question ou suggestion :

- **Email** : support@front-e-sante.sn
- **WhatsApp** : +221 XX XXX XX XX
- **Forum** : [Club Digital](/club)

---

**Front E-Santé** - Formation continue pour les professionnels de santé au Sénégal 🇸🇳
