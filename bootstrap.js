"use strict";

(async () => {
  const VERSION = "13";
  const CATEGORY_STORAGE_KEY = "bedragaren_categories";

  const showFatalError = message => {
    const error = document.getElementById("setup-error");
    if (error) error.textContent = message;
    console.error(message);
  };

  const loadScript = src => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Kunde inte ladda ${src}`));
    document.body.appendChild(script);
  });

  const fetchText = async path => {
    const response = await fetch(`${path}?v=${VERSION}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Kunde inte hämta ${path}`);
    return response.text();
  };

  const restoreCategorySelection = () => {
    const checkboxes = Array.from(document.querySelectorAll('input[name="category"]'));
    const validKeys = new Set(checkboxes.map(input => input.value));

    try {
      const stored = JSON.parse(localStorage.getItem(CATEGORY_STORAGE_KEY));
      if (Array.isArray(stored)) {
        const selected = new Set(stored.filter(key => validKeys.has(key)));
        checkboxes.forEach(input => { input.checked = selected.has(input.value); });
      }
    } catch {
      // Behåll standardvalen om lagrad data är trasig eller otillgänglig.
    }

    const saveSelection = () => {
      const selected = checkboxes.filter(input => input.checked).map(input => input.value);
      try { localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(selected)); } catch { /* ignore */ }
    };

    checkboxes.forEach(input => input.addEventListener("change", saveSelection));
  };

  try {
    let categorySource = await fetchText("./categories.js");

    /* Ledtrådsregler är kvalitetsriktlinjer och får aldrig stoppa spelet. */
    categorySource = categorySource.replaceAll("throw new Error(", "console.warn(");
    (0, eval)(`${categorySource}\n//# sourceURL=categories.js`);

    let appSource = await fetchText("./app.js");

    /* Följ exakt spelarordningen från startsidan. */
    const shuffledPlayers = "const players = shuffle(names.map((name, index) => ({ name, isImpostor: index === impostorIndex })));";
    const orderedPlayers = "const players = names.map((name, index) => ({ name, isImpostor: index === impostorIndex }));";

    if (!appSource.includes(shuffledPlayers)) {
      throw new Error("Kunde inte hitta spellogiken för spelarordningen.");
    }

    appSource = appSource.replace(shuffledPlayers, orderedPlayers);
    (0, eval)(`${appSource}\n//# sourceURL=app.js`);

    restoreCategorySelection();

    await loadScript(`./player-controls-cleanup.js?v=${VERSION}`);
    await loadScript(`./restart-delay.js?v=${VERSION}`);
    await loadScript(`./install.js?v=${VERSION}`);
  } catch (error) {
    showFatalError(`Spelet kunde inte starta: ${error.message}`);
  }
})();
