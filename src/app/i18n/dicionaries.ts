const dictionaries = {
  "en-US": () =>
    import("./en/dictionary.json").then((module) => module.default),
  "fr-FR": () =>
    import("./fr/dictionary.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  switch (locale) {
    case "fr-fr": {
      return dictionaries["fr-FR"]();
    }
    default: {
      return dictionaries["en-US"]();
    }
  }
};
