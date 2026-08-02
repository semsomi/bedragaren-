"use strict";

/*
 * Skyddsnät för kategoriinläsningen.
 * categories.js ska helst vara helt giltig, men ett felaktigt ordpar får aldrig
 * göra hela startsidan tom. Den här filen normaliserar datan innan app.js körs.
 */
(() => {
  const categories = window.BEDRAGAREN_CATEGORIES;
  if (!categories || typeof categories !== "object") return;

  const explicitHintFixes = {
    Risotto: "Krämig"
  };

  const normalize = value => String(value)
    .normalize("NFC")
    .toLocaleLowerCase("sv-SE")
    .replace(/[\s\-–—_]/g, "");

  for (const category of Object.values(categories)) {
    if (!Array.isArray(category.words)) continue;

    category.words = category.words.map(entry => {
      const word = Array.isArray(entry) ? entry[0] : entry.word;
      let hint = Array.isArray(entry) ? entry[1] : entry.hint;

      if (explicitHintFixes[word]) hint = explicitHintFixes[word];

      if (normalize(word).includes(normalize(hint))) {
        console.warn(`Ogiltig ledtråd ersattes för "${word}".`);
        hint = "Relaterat";
      }

      return { word, hint };
    });
  }
})();
