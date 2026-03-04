# CLAUDE.md — Institut Perle Rare By Laura

## Description
Refonte complète du site https://www.perle-rare.net/ — Institut de beauté à Saint-Dizier.
Site statique HTML/CSS/JS, design moderne inspiré de https://goldustspa.com/

## Stack technique
- HTML5 sémantique
- CSS3 pur (variables CSS, grid, flexbox, clamp(), animations)
- JavaScript vanilla (pas de framework)
- Google Fonts : Cormorant Garamond + Jost
- Aucune dépendance externe

## Structure des fichiers
```
/
├── index.html              — Accueil
├── institut.html           — L'Institut (Laura, histoire, valeurs)
├── prestations.html        — Vue d'ensemble de toutes les prestations
├── soins-corps.html        — Soins du corps
├── beaute-mains-pieds.html — Beauté mains et pieds
├── epilation.html          — Épilation
├── maquillage.html         — Maquillage (classique + Styliderm)
├── soins-amincissants.html — Soins amincissants (Cryo 21, LPG)
├── contact.html            — Contact + formulaire + horaires
├── mentions-legales.html   — Mentions légales
├── css/style.css           — CSS principal
├── js/main.js              — JS principal
└── images/                 — À remplir avec les vraies photos
```

## Ce qu'il faut faire après livraison

### 1. Remplacer les images
Les images actuelles sont des placeholders Unsplash. Remplacer par les vraies photos :
- Hero `index.html` : photo principale de l'institut
- Split `index.html` : photo de Laura ou de l'espace
- Chaque page prestation : photo correspondante
- Page `institut.html` : photo de Laura

Dans chaque fichier HTML, rechercher `images.unsplash.com` et remplacer par le chemin local (`images/nom-photo.jpg`).

### 2. Mettre à jour les tarifs
Les pages prestations affichent "Sur devis" car les tarifs exacts ne sont pas connus.
Remplacer dans les fichiers HTML : chercher `Sur devis` et mettre les vrais prix.
Seul tarif connu : Forfait épilation = **189 €** (déjà en place dans `epilation.html`).

### 3. Liens réseaux sociaux
Dans tous les footers, les liens Facebook et Instagram pointent vers `#`.
Remplacer par les vraies URLs des pages sociales de l'institut.

### 4. Formulaire de contact
Le formulaire simule l'envoi. Pour un vrai envoi d'email, deux options :
- **Formspree** (gratuit) : remplacer `<form class="contact-form">` par `<form action="https://formspree.io/f/VOTRE_ID" method="POST">`
- **Backend PHP/Node** : créer un endpoint de traitement

### 5. Google Maps
La carte dans `contact.html` utilise une iframe Google Maps. Vérifier/corriger les coordonnées GPS si nécessaire.

### 6. Logo
Si un logo image existe, le placer dans `images/logo.png` et remplacer dans le header :
```html
<!-- Remplacer .logo-text par : -->
<img src="images/logo.png" alt="Institut Perle Rare By Laura" style="height:50px">
```

## Design system
- **Primary** : `#C09A7E` (taupe rosé doré)
- **Background** : `#FAF7F4` (crème chaud)
- **Background alt** : `#F2EDE6`
- **Dark** : `#1E1B18` (footer)
- **Fonts** : Cormorant Garamond (titres) / Jost (corps)

## Informations du site
- **Adresse** : 3 Rue de la Victoire, 52100 Saint-Dizier
- **Tél** : 03 25 56 02 71
- **Email** : contact@perle-rare.net
- **Horaires** : Lun 14h-19h / Mar-Sam 9h-19h / Dim fermé
- **SIRET** : 90385080800010
