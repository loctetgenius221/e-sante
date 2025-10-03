# Sources des Images - Front E-Santé

## Images utilisées dans l'application

### Images Hero

- **Image principale** : `https://images.unsplash.com/photo-1559757148-5c350d0d3c56`
  - Description : Professionnels de santé en formation
  - Source : Unsplash (libre de droits)
  - Auteur : [Unsplash](https://unsplash.com)

### Images des Formations

- **Pharmacovigilance** : `https://images.unsplash.com/photo-1559757148-5c350d0d3c56`

  - Description : Formation médicale et pharmacovigilance
  - Source : Unsplash

- **Interactions médicamenteuses** : `https://images.unsplash.com/photo-1576091160399-112ba8d25d1f`

  - Description : Analyse des interactions médicamenteuses
  - Source : Unsplash

- **Dermatologie** : `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d`

  - Description : Consultation dermatologique
  - Source : Unsplash

- **Gestion des stocks** : `https://images.unsplash.com/photo-1587854692152-cbe660dbde88`
  - Description : Gestion de pharmacie et stocks
  - Source : Unsplash

### Avatars des Instructeurs

- **Dr. Fatou Sarr** : `https://images.unsplash.com/photo-1559839734-2b71ea197ec2`

  - Description : Femme professionnelle de santé
  - Source : Unsplash

- **Dr. Moussa Diagne** : `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d`

  - Description : Homme professionnel de santé
  - Source : Unsplash

- **Dr. Aïcha Ba** : `https://images.unsplash.com/photo-1594824374891-8b5b0b5b5b5b`

  - Description : Femme médecin
  - Source : Unsplash

- **Ibrahima Ndiaye** : `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d`
  - Description : Homme professionnel
  - Source : Unsplash

### Avatars des Utilisateurs

- **Dr. Aminata Diop** : `https://images.unsplash.com/photo-1594824374891-8b5b0b5b5b5b`

  - Description : Pharmacienne
  - Source : Unsplash

- **Dr. Moussa Fall** : `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d`

  - Description : Médecin
  - Source : Unsplash

- **Fatou Sarr** : `https://images.unsplash.com/photo-1559839734-2b71ea197ec2`
  - Description : Étudiante
  - Source : Unsplash

### Images des Produits

- **Médicaments** : `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae`
  - Description : Médicaments et produits pharmaceutiques
  - Source : Unsplash

## Licences et Droits d'Usage

### Unsplash

- **Licence** : Unsplash License (libre de droits)
- **Usage commercial** : Autorisé
- **Attribution** : Non requise mais appréciée
- **Modification** : Autorisée

### Conditions d'utilisation

- Toutes les images sont libres de droits pour usage commercial
- Aucune attribution n'est requise mais recommandée
- Les images peuvent être modifiées selon les besoins
- Usage conforme aux conditions d'Unsplash

## Remplacement des Images

Pour remplacer les images par des versions locales :

1. **Télécharger les images** depuis les URLs fournies
2. **Optimiser les images** pour le web (compression, redimensionnement)
3. **Placer dans le dossier** `public/images/`
4. **Mettre à jour les chemins** dans `src/data/mockData.js`
5. **Tester l'affichage** dans l'application

## Optimisation des Images

### Formats recommandés

- **WebP** : Format moderne, meilleure compression
- **JPEG** : Compatible universellement
- **PNG** : Pour les images avec transparence

### Tailles recommandées

- **Images hero** : 1200x800px
- **Images formations** : 800x600px
- **Avatars** : 400x400px
- **Images produits** : 400x400px

### Compression

- **Qualité JPEG** : 80-85%
- **Optimisation** : Utiliser des outils comme TinyPNG, ImageOptim
- **Responsive** : Générer plusieurs tailles pour différentes résolutions

## Fallbacks et Gestion d'Erreurs

L'application inclut un système de fallback pour les images :

- **État de chargement** : Spinner animé
- **Erreur de chargement** : Icône de remplacement
- **Composant HealthImage** : Gestion automatique des erreurs

## Performance

### Optimisations implémentées

- **Lazy loading** : Chargement différé des images
- **Fallbacks** : Gestion des erreurs de chargement
- **CDN** : Utilisation d'Unsplash comme CDN
- **Cache** : Mise en cache des images par le navigateur

### Recommandations

- **Préchargement** : Pour les images critiques
- **Compression** : Optimiser la taille des fichiers
- **Formats modernes** : Utiliser WebP quand possible
- **Responsive** : Adapter la taille selon l'écran
