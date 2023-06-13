# Prismic Typescript TailwindCSS

## Start

`npm i`
`npm run dev` starts dev server + slice-machine

Goal: navigate to one page, then use filters:
/thematic/mountain + search filters: city => result-page

## Migrate to clientV7 (from V6)

[Changes: predicate -> filter, query -> get, ](https://prismic.io/docs/prismicio-client-v7-migration-guide#migrate-from-removed-deprecated-apis)

## TODO

- Finish updating URLs (/destination & /inspiration + add Typologie) + check how to have same route with different type (/inspiration/:typology & /inspiration/:thematic)
- Add multi-lang
- Setup relationships Area -> Region -> City -> Hotel / Arrondissement -> Hotel
- Start creating custom-components (w/ asText(data.title...))
- Start creating slices ?

## Get Data from Content relationships

### Get details

```javascript
client.getByType("hotel", { fetchLinks: "city.name" });
```

### Get with filter

```javascript
const hotels = await client.getAllByType("hotel", {
  filters: filter.at("my.hotel.thematics.thematic", thematic.id),
});
```

Question sur les URL
J'ai du mal à voir comment je vais devoir gérer les URL pour ce projet. Pour les URL fixes, pas de problème mais d'après la maquette on a pas mal de parties dynamiques et je suis un peu perdu de ce côté-là, par rapport aux fonctionnement de Next (structure de dossier) et Primsic (gestion des url).
Par exemple, comment on gère qu'une page Thématique doit apparaitre dans plusieurs URLs comme `/inspiration/:thematic`, `destination/:region/:thematic`, `destination/:city/:thematic` ?
(et du coup, on a la question avec city & region qui peuvent être au même niveau dans l'url)
