"use strict";

(() => {
  const categories = window.BEDRAGAREN_CATEGORIES;
  if (!categories || typeof categories !== "object") return;

  const hintOverrides = {
    "risotto": "Krämig",
    "saganomringen": "Äventyr",
    "metallica": "Hårdrock",
    "rymdraket": "Uppskjutning"
  };

  const normalize = value => String(value || "")
    .normalize("NFC")
    .toLocaleLowerCase("sv-SE")
    .replace(/[\s\-–—_]/g, "");

  for (const category of Object.values(categories)) {
    if (!Array.isArray(category.words)) continue;

    category.words = category.words.map(entry => {
      const word = Array.isArray(entry) ? entry[0] : entry.word;
      let hint = Array.isArray(entry) ? entry[1] : entry.hint;

      const normalizedWord = normalize(word);
      const normalizedHint = normalize(hint);

      if (normalizedWord && normalizedHint && normalizedWord.includes(normalizedHint)) {
        hint = hintOverrides[normalizedWord] || "Association";
      }

      return { word, hint };
    });
  }
})();
