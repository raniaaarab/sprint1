# spi-base-stencil
Base Stencil/bulma du projet SPI pour les DOSI

## Composants graphiques / UI 

Le socle est configuré pour utiliser le framework css Bulma : https://bulma.io/  
Cette bibliothèque offre beaucoup d'élément graphique (carte, bouton, menu, etc ...).  
Il n'y a donc pas besoin de rajouter bootstrap !!  
Les scripts de base de Bulma sont déjà inclus dans global/app.scss (ils seront donc ajouté automatiquement à tous vos composant à la compilation).    
Bulma étant lui même modularisé, il faudra, dans le scss de vos composants, importer le fichier sass de l'élément Bulma que vous voulez utiliser (disponible dans node_modules/bulma/sass).  

## Getting Started

To start a new project using Stencil, clone this repo to a new directory:

```bash
npm init stencil app
```

and run:

```bash
npm start-dev
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```

