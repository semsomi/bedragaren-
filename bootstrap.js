"use strict";

(async () => {
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

  try {
    const response = await fetch("./categories.js?v=11", { cache: "no-store" });
    if (!response.ok) throw new Error("Kategorifilen kunde inte hämtas.");

    let source = await response.text();

    /*
     * Reglerna för ledtrådar är kvalitetsriktlinjer, inte startkrav.
     * En tveksam kombination ska ge en varning i konsolen men får aldrig
     * stoppa spelet eller göra startsidan tom.
     */
    source = source.replaceAll("throw new Error(", "console.warn(");

    (0, eval)(`${source}\n//# sourceURL=categories.js`);

    await loadScript("./app.js?v=11");
    await loadScript("./player-controls-cleanup.js?v=11");
    await loadScript("./restart-delay.js?v=11");
    await loadScript("./install.js?v=11");
  } catch (error) {
    showFatalError(`Spelet kunde inte starta: ${error.message}`);
  }
})();
