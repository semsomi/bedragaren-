"use strict";

const CATEGORIES = window.BEDRAGAREN_CATEGORIES;

(function validateWordData() {
  if (!CATEGORIES || typeof CATEGORIES !== "object") {
    throw new Error("Kategorierna kunde inte laddas.");
  }

  for (const [categoryKey, category] of Object.entries(CATEGORIES)) {
    if (!category.label || !Array.isArray(category.words) || category.words.length < 20) {
      throw new Error(`Kategori ${categoryKey} är ofullständig.`);
    }

    const seen = new Set();
    for (const entry of category.words) {
      if (!entry.word || !entry.hint || /\s/.test(entry.hint)) {
        throw new Error(`Ogiltig post i ${categoryKey}: ${entry.word || "okänt ord"}`);
      }
      const normalized = entry.word.toLocaleLowerCase("sv");
      if (seen.has(normalized)) throw new Error(`Duplicerat ord: ${entry.word}`);
      seen.add(normalized);
    }
  }
})();

function randomInt(max) {
  if (max <= 0) return 0;
  const limit = 0x100000000 - (0x100000000 % max);
  const values = new Uint32Array(1);
  do crypto.getRandomValues(values); while (values[0] >= limit);
  return values[0] % max;
}

function shuffle(array) {
  const copy = array.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = randomInt(index + 1);
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

const STORAGE_KEY = "bedragaren_players";
const el = id => document.getElementById(id);
const setText = (element, text) => { element.textContent = text; };

function loadStoredPlayers() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) && value.every(name => typeof name === "string") ? value : null;
  } catch { return null; }
}

function savePlayers(names) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(names)); } catch { /* ignore */ }
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    const active = screen.id === id;
    screen.classList.toggle("active", active);
    screen.toggleAttribute("hidden", !active);
  });
}

const playerList = el("player-list");
const categoryList = el("category-list");
const setupError = el("setup-error");
const nextBtn = el("next-btn");
const card = el("card");
const cardFront = card.querySelector(".card-front");
const cardBack = card.querySelector(".card-back");
const cardBackContent = el("card-back-content");

let gameState = null;
let activePointerId = null;
let keyHeld = false;
let cardRevealed = false;
let currentPlayerHasRevealed = false;
let nextBtnLocked = false;

function createPlayerItem(name) {
  const item = document.createElement("li");
  item.className = "player-item";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "player-input";
  input.placeholder = "Spelarnamn";
  input.maxLength = 40;
  input.value = name;
  input.setAttribute("aria-label", "Spelarnamn");
  input.autocomplete = "off";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "player-remove-btn";
  removeButton.setAttribute("aria-label", "Ta bort spelare");
  removeButton.textContent = "×";
  removeButton.addEventListener("click", () => item.remove());

  item.append(input, removeButton);
  return item;
}

function renderCategories() {
  categoryList.replaceChildren();

  for (const [key, category] of Object.entries(CATEGORIES)) {
    const label = document.createElement("label");
    label.className = "category-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "category";
    checkbox.value = key;
    checkbox.checked = category.selected === true;

    const emoji = document.createElement("span");
    emoji.className = "category-emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = category.emoji || "🎲";

    const text = document.createElement("span");
    text.className = "category-text";
    text.textContent = category.label;

    label.append(checkbox, emoji, text);
    categoryList.appendChild(label);
  }
}

function initSetupScreen() {
  playerList.replaceChildren();
  const names = loadStoredPlayers() || ["", "", ""];
  names.forEach(name => playerList.appendChild(createPlayerItem(name)));
  while (playerList.children.length < 3) playerList.appendChild(createPlayerItem(""));
}

el("add-player-btn").addEventListener("click", () => {
  const item = createPlayerItem("");
  playerList.appendChild(item);
  item.querySelector("input").focus();
});

function startGame() {
  setText(setupError, "");
  const names = Array.from(playerList.querySelectorAll(".player-input"))
    .map(input => input.value.trim()).filter(Boolean);

  if (names.length < 3) {
    setText(setupError, "Du behöver minst 3 spelare för att spela.");
    return;
  }

  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
    .map(input => input.value);

  if (!selectedCategories.length) {
    setText(setupError, "Välj minst en kategori.");
    return;
  }

  savePlayers(names);
  const wordPool = selectedCategories.flatMap(key => CATEGORIES[key].words);
  const secretEntry = wordPool[randomInt(wordPool.length)];
  const impostorIndex = randomInt(names.length);
  const players = shuffle(names.map((name, index) => ({ name, isImpostor: index === impostorIndex })));

  gameState = { secretWord: secretEntry.word, hint: secretEntry.hint, players, currentIndex: 0 };
  showScreen("screen-card");
  loadCurrentPlayer();
}

el("start-btn").addEventListener("click", startGame);

function loadCurrentPlayer() {
  const player = gameState.players[gameState.currentIndex];
  activePointerId = null;
  keyHeld = false;
  cardRevealed = false;
  currentPlayerHasRevealed = false;
  nextBtnLocked = false;
  card.classList.remove("revealed", "impostor-card");
  cardBackContent.replaceChildren();
  cardFront.setAttribute("aria-hidden", "false");
  cardBack.setAttribute("aria-hidden", "true");
  setText(el("player-progress"), `Spelare ${gameState.currentIndex + 1} av ${gameState.players.length}`);
  setText(el("card-player-name"), player.name);
  nextBtn.disabled = true;
  nextBtn.setAttribute("aria-disabled", "true");
  card.setAttribute("aria-label", `${player.name} – håll ned för att visa ditt kort`);
}

function buildCardContent(player) {
  cardBackContent.replaceChildren();

  if (player.isImpostor) {
    const badge = document.createElement("span");
    badge.className = "impostor-badge";
    badge.textContent = "Bedragaren";

    const label = document.createElement("p");
    label.className = "impostor-hint-label";
    label.textContent = "Ledtråd";

    const hint = document.createElement("p");
    hint.className = "impostor-hint-word";
    hint.textContent = gameState.hint;

    cardBackContent.append(badge, label, hint);
  } else {
    const label = document.createElement("p");
    label.className = "reveal-label";
    label.textContent = "Det hemliga ordet är";

    const word = document.createElement("p");
    word.className = "reveal-word";
    word.textContent = gameState.secretWord;

    cardBackContent.append(label, word);
  }
}

function revealCard() {
  if (cardRevealed || !gameState) return;
  const player = gameState.players[gameState.currentIndex];
  buildCardContent(player);
  cardRevealed = true;
  currentPlayerHasRevealed = true;
  card.classList.add("revealed");
  if (player.isImpostor) card.classList.add("impostor-card");
  cardFront.setAttribute("aria-hidden", "true");
  cardBack.setAttribute("aria-hidden", "false");
  card.setAttribute("aria-label", `Kort avslöjat för ${player.name} – släpp för att dölja`);
}

function hideCard() {
  if (!cardRevealed || !gameState) return;
  cardRevealed = false;
  card.classList.remove("revealed", "impostor-card");
  cardBackContent.replaceChildren();
  cardFront.setAttribute("aria-hidden", "false");
  cardBack.setAttribute("aria-hidden", "true");
  const player = gameState.players[gameState.currentIndex];
  card.setAttribute("aria-label", `${player.name} – håll ned för att visa ditt kort`);
  if (currentPlayerHasRevealed) {
    nextBtn.disabled = false;
    nextBtn.setAttribute("aria-disabled", "false");
  }
}

card.addEventListener("pointerdown", event => {
  if (activePointerId !== null) return;
  activePointerId = event.pointerId;
  try { card.setPointerCapture(event.pointerId); } catch { /* ignore */ }
  revealCard();
});

card.addEventListener("pointerup", event => {
  if (event.pointerId !== activePointerId) return;
  activePointerId = null;
  try { card.releasePointerCapture(event.pointerId); } catch { /* ignore */ }
  hideCard();
});

card.addEventListener("pointercancel", event => {
  if (event.pointerId !== activePointerId) return;
  activePointerId = null;
  hideCard();
});

card.addEventListener("lostpointercapture", event => {
  if (event.pointerId !== activePointerId) return;
  activePointerId = null;
  hideCard();
});

card.addEventListener("pointerleave", event => {
  if (event.pointerId === activePointerId && !card.hasPointerCapture(event.pointerId)) {
    activePointerId = null;
    hideCard();
  }
});

card.addEventListener("keydown", event => {
  if ((event.key === " " || event.key === "Enter") && !keyHeld) {
    keyHeld = true;
    event.preventDefault();
    revealCard();
  }
});

card.addEventListener("keyup", event => {
  if (event.key === " " || event.key === "Enter") {
    keyHeld = false;
    hideCard();
  }
});

function forceHideCard() {
  activePointerId = null;
  keyHeld = false;
  hideCard();
}

window.addEventListener("blur", forceHideCard);
document.addEventListener("visibilitychange", () => { if (document.hidden) forceHideCard(); });
card.addEventListener("contextmenu", event => event.preventDefault());
card.addEventListener("dragstart", event => event.preventDefault());
card.addEventListener("selectstart", event => event.preventDefault());

nextBtn.addEventListener("click", () => {
  if (nextBtnLocked || nextBtn.disabled) return;
  nextBtnLocked = true;
  forceHideCard();
  gameState.currentIndex += 1;

  if (gameState.currentIndex >= gameState.players.length) {
    const names = gameState.players.map(player => player.name);
    setText(el("starter-name"), names[randomInt(names.length)]);
    showScreen("screen-final");
  } else {
    loadCurrentPlayer();
  }
});

el("play-again-btn").addEventListener("click", () => {
  gameState = null;
  setText(setupError, "");
  initSetupScreen();
  showScreen("screen-setup");
});

renderCategories();
initSetupScreen();
showScreen("screen-setup");
