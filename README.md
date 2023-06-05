# Prismic Typescript TailwindCSS

## Start

`npm i`
`npm run dev` starts dev server + slice-machine

## Feat: fetch by tag

- pages/experience/[uid]
- pages/thematique/[uid]

## Feat: Content relationship

- pages/experience/[uid]: fetchLinks

## Idea:

Pour Esprit de France, donc NextJs et Prismic.

Le but : on a besoin de "tagguer" des pages Expérience avec une ou plusieurs thématiques et une localisation. La localisation doit etre découpée en 2 niveaux : région et ville.

Voilà ce que j'ai pensé faire :

- Utiliser le système de **tags** de Prismic pour les **thématiques** en tagant chaque thématique avec son propre tag et ensuite les expériences avec un ou plusieurs tags. Ca permet de récupérer la liste des expériences depuis une page Thématique. Par contre quels sont les impacts et est-ce que c'est simple derrière de récupérer les pages thématiques associées à une expérience ?

  - 1 thématique = 1 tag
  - 1 thématique = N expériences (pour une thématique, récupérer toutes les expériences)
  - 1 expérience = N thématiques (récupérer toutes les thématiques d'une expérience)

- Utiliser un champ de relation de document pour la localisation en créant des pages Localisation (à voir si c'est 2 types de pages différentes pour les régions et villes) et donc sur chaque expérience, sélectionner la localisation "liée", puis faire une requete en se basant sur le champ de relation (cf Airelles).
  - 1 expérience = N localisations: région(s) (+ ville(s))

## Solution:

- Page region
- Page City: related to 1 region
- Page Thematique: has its own tag
- Page Experience: has thematique tag(s) and region(s) + city(ies)

## (bonus) Researches

Goal: Each navigation adds a search-filter:  
Show Regions -> show Thematiques of selected Region -> show Experiences in Thematique of selected Region -> etc.

### Issues

- Cannot be done manually (too many possibilities)

### Possible solutions

- Get data by tag
- Get data by page-type
- Use params to filter & show pages ?
- Go to page-type [:id] & add url-params from previously selected [:id] to filter search ?
- path: '/:lang/:section/:category/:uid' with page-types ?
