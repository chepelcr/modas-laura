export const pagePaths = {
  es: {
    home: "",
    corporate: "regalos-corporativos",
    designs: "disenos-personalizados",
    collection: "coleccion",
    contact: "contacto",
    history: "historia",
    archive: "archivo",
    privacy: "privacidad",
    notfound: "404.html",
  },
  en: {
    home: "en",
    corporate: "en/corporate-gifts",
    designs: "en/personalized-designs",
    collection: "en/collection",
    contact: "en/contact",
    history: "en/history",
    archive: "en/archive",
    privacy: "en/privacy",
    notfound: "en/404.html",
  },
};

export const pageEntries = Object.fromEntries(
  Object.entries(pagePaths).flatMap(([locale, pages]) =>
    Object.entries(pages).map(([page, path]) => [
      path
        ? path.endsWith(".html")
          ? path
          : `${path}/index.html`
        : "index.html",
      [page, locale],
    ]),
  ),
);
