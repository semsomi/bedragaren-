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
    const response = await fetch("./categories.js?v=8", { cache: "no-store" });
    if (!response.ok) throw new Error("Kategorifilen kunde inte hämtas.");

    let source = await response.text();

    // Säkerhetslagning för äldre kategoriinnehåll som fortfarande kan finnas i GitHub Pages-cache.
    source = source
      .replace('["Risotto","Ris"]', '["Risotto","Krämig"]')
      .replace('["Saganomringen","Ring"]', '["Saganomringen","Äventyr"]')
      .replace('["Metallica","Metal"]', '["Metallica","Hårdrock"]')
      .replace('["Rymdraket","Rymd"]', '["Rymdraket","Uppskjutning"]');

    // Kör kategorifilen först. Den sätter window.BEDRAGAREN_CATEGORIES.
    (0, eval)(`${source}\n//# sourceURL=categories.js`);

    await loadScript("./app.js?v=8");
    await loadScript("./player-order.js?v=8");
    await loadScript("./restart-delay.js?v=8");
    await loadScript("./install.js?v=8");
  } catch (error) {
    showFatalError(`Spelet kunde inte starta: ${error.message}`);
  }
})();
