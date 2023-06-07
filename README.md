# Prismic Typescript TailwindCSS

## Start

`npm i`
`npm run dev` starts dev server + slice-machine

Goal: navigate to one page, then use filters:
/thematic/mountain + search filters: city => result-page

## Migrate to clientV7 (from V6)

[Changes: predicate -> filter, query -> get, ](https://prismic.io/docs/prismicio-client-v7-migration-guide#migrate-from-removed-deprecated-apis)

## TODO

- Add multi-lang
- Update url from '/thematic/:uid/city/:uid' -> '/:thematic/:city
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
