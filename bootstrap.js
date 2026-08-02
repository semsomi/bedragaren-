"use strict";

(async () => {
  const VERSION = "12";

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

  try {
    let categorySource = await fetchText("./categories.js");

    /*
     * Reglerna för ledtrådar är kvalitetsriktlinjer, inte startkrav.
     * En tveksam kombination ska ge en varning i konsolen men får aldrig
     * stoppa spelet eller göra startsidan tom.
     */
    categorySource = categorySource.replaceAll("throw new Error(", "console.warn(");
    (0, eval)(`${categorySource}\n//# sourceURL=categories.js`);

    let appSource = await fetchText("./app.js");

    /*
     * Spelarna ska visas i exakt den ordning som användaren har lagt dem i.
     * Bedragaren slumpas fortfarande, men spelarlistan får inte blandas.
     */
    const shuffledPlayers = "const players = shuffle(names.map((name, index) => ({ name, isImpostor: index === impostorIndex })));";
    const orderedPlayers = "const players = names.map((name, index) => ({ name, isImpostor: index === impostorIndex }));";

    if (!appSource.includes(shuffledPlayers)) {
      throw new Error("Kunde inte hitta spellogiken för spelarordningen.");
    }

    appSource = appSource.replace(shuffledPlayers, orderedPlayers);
    (0, eval)(`${appSource}\n//# sourceURL=app.js`);

    await loadScript(`./player-controls-cleanup.js?v=${VERSION}`);
    await loadScript(`./restart-delay.js?v=${VERSION}`);
    await loadScript(`./install.js?v=${VERSION}`);
  } catch (error) {
    showFatalError(`Spelet kunde inte starta: ${error.message}`);
  }
})();
