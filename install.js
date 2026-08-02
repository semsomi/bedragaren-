"use strict";

const installPanel = document.getElementById("install-panel");
const installButton = document.getElementById("install-button");
const installDismiss = document.getElementById("install-dismiss");
const installText = document.getElementById("install-text");

let deferredInstallPrompt = null;

const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const wasDismissed = localStorage.getItem("bedragaren_install_dismissed") === "true";

function hideInstallPanel() {
  installPanel.hidden = true;
}

function showInstallPanel() {
  if (!isStandalone && !wasDismissed) installPanel.hidden = false;
}

if (isStandalone) {
  hideInstallPanel();
} else if (isIOS) {
  installText.textContent = "Installera spelet på hemskärmen så fungerar det mer som en vanlig app.";
  installButton.textContent = "Visa hur";
  showInstallPanel();
} else {
  showInstallPanel();
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installText.textContent = "Installera Bedragaren på hemskärmen för snabbare åtkomst och spel utan internet.";
  installButton.textContent = "Installera appen";
  showInstallPanel();
});

installButton.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    hideInstallPanel();
    return;
  }

  if (isIOS) {
    window.alert("Tryck på Dela-knappen i Safari och välj sedan ‘Lägg till på hemskärmen’. Öppna sidan i Safari om du använder en annan webbläsare.");
    return;
  }

  window.alert("Öppna webbläsarens meny och välj ‘Installera app’ eller ‘Lägg till på startskärmen’. Alternativet kan heta lite olika beroende på webbläsare.");
});

installDismiss.addEventListener("click", () => {
  localStorage.setItem("bedragaren_install_dismissed", "true");
  hideInstallPanel();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  hideInstallPanel();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // Spelet fungerar fortfarande online om service worker inte kan registreras.
    });
  });
}
