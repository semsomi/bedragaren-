"use strict";

const CATEGORIES = {
  food: {
    label: "Mat och dryck",
    words: [
      { word: "Pizza", hint: "Italien" }, { word: "Kaffe", hint: "Morgon" },
      { word: "Sushi", hint: "Japan" }, { word: "Tacos", hint: "Mexiko" },
      { word: "Glass", hint: "Sommar" }, { word: "Pannkakor", hint: "Lördag" },
      { word: "Hamburgare", hint: "Bröd" }, { word: "Pasta", hint: "Sås" },
      { word: "Choklad", hint: "Kakao" }, { word: "Te", hint: "Kopp" },
      { word: "Pommes", hint: "Ketchup" }, { word: "Kebab", hint: "Grillat" },
      { word: "Jordgubbar", hint: "Sommar" }, { word: "Lemonad", hint: "Citron" },
      { word: "Popcorn", hint: "Bio" }, { word: "Soppa", hint: "Varm" },
      { word: "Smörgås", hint: "Frukost" }, { word: "Våffla", hint: "Grädde" },
      { word: "Sill", hint: "Midsommar" }, { word: "Köttbullar", hint: "Ikea" },
      { word: "Kanelbulle", hint: "Fika" }, { word: "Lasagne", hint: "Ugn" },
      { word: "Omelett", hint: "Ägg" }, { word: "Risotto", hint: "Ris" },
      { word: "Smoothie", hint: "Frukt" }, { word: "Müsli", hint: "Yoghurt" },
      { word: "Croissant", hint: "Paris" }, { word: "Nachos", hint: "Chips" },
      { word: "Halloumi", hint: "Grillad" }, { word: "Avokado", hint: "Grön" },
      { word: "Mango", hint: "Tropisk" }, { word: "Blåbär", hint: "Skog" }
    ]
  },
  items: {
    label: "Vardagsföremål",
    words: [
      { word: "Tandborste", hint: "Badrum" }, { word: "Paraply", hint: "Regn" },
      { word: "Fjärrkontroll", hint: "Soffa" }, { word: "Nyckel", hint: "Dörr" },
      { word: "Kudde", hint: "Sömn" }, { word: "Sax", hint: "Klippa" },
      { word: "Laddare", hint: "Batteri" }, { word: "Stekpanna", hint: "Spis" },
      { word: "Spegel", hint: "Reflektion" }, { word: "Ryggsäck", hint: "Skola" },
      { word: "Klocka", hint: "Tid" }, { word: "Dammsugare", hint: "Golv" },
      { word: "Glasögon", hint: "Syn" }, { word: "Handduk", hint: "Dusch" },
      { word: "Penna", hint: "Skriva" }, { word: "Bok", hint: "Bibliotek" },
      { word: "Lampa", hint: "Ljus" }, { word: "Tallrik", hint: "Mat" },
      { word: "Gaffel", hint: "Middag" }, { word: "Mugg", hint: "Dryck" },
      { word: "Väska", hint: "Bära" }, { word: "Kamera", hint: "Foto" },
      { word: "Kalender", hint: "Datum" }, { word: "Linjal", hint: "Mäta" },
      { word: "Pennfodral", hint: "Skola" }, { word: "Termos", hint: "Varm" },
      { word: "Kniv", hint: "Kök" }, { word: "Korkskruv", hint: "Flaska" },
      { word: "Skärbräda", hint: "Kök" }, { word: "Bestick", hint: "Dukning" },
      { word: "Tvål", hint: "Händer" }, { word: "Resväska", hint: "Semester" }
    ]
  },
  sport: {
    label: "Sport",
    words: [
      { word: "Fotboll", hint: "Mål" }, { word: "Tennis", hint: "Racket" },
      { word: "Basket", hint: "Korg" }, { word: "Ishockey", hint: "Puck" },
      { word: "Handboll", hint: "Klister" }, { word: "Golf", hint: "Green" },
      { word: "Simning", hint: "Bassäng" }, { word: "Boxning", hint: "Handskar" },
      { word: "Skidåkning", hint: "Snö" }, { word: "Cykling", hint: "Pedal" },
      { word: "Volleyboll", hint: "Nät" }, { word: "Bordtennis", hint: "Pingis" },
      { word: "Friidrott", hint: "Stadion" }, { word: "Löpning", hint: "Tempo" },
      { word: "Gymnastik", hint: "Matta" }, { word: "Ridning", hint: "Häst" },
      { word: "Baseboll", hint: "Slagträ" }, { word: "Rugby", hint: "Tackling" },
      { word: "Badminton", hint: "Fjäderboll" }, { word: "Klättring", hint: "Grepp" },
      { word: "Bowling", hint: "Käglor" }, { word: "Fäktning", hint: "Värja" },
      { word: "Dart", hint: "Tavla" }, { word: "Curling", hint: "Sopning" },
      { word: "Surfing", hint: "Vågor" }, { word: "Segling", hint: "Vind" },
      { word: "Judo", hint: "Kast" }, { word: "Padel", hint: "Glas" },
      { word: "Motorsport", hint: "Bana" }, { word: "Tyngdlyftning", hint: "Skivstång" },
      { word: "Orientering", hint: "Kompass" }, { word: "Triathlon", hint: "Uthållighet" }
    ]
  },
  weather: {
    label: "Väder",
    words: [
      { word: "Regn", hint: "Paraply" }, { word: "Snö", hint: "Vinter" },
      { word: "Sol", hint: "Värme" }, { word: "Åska", hint: "Muller" },
      { word: "Blixt", hint: "Ljus" }, { word: "Dimma", hint: "Sikt" },
      { word: "Hagel", hint: "Is" }, { word: "Storm", hint: "Vind" },
      { word: "Orkan", hint: "Virvel" }, { word: "Duggregn", hint: "Smådroppar" },
      { word: "Skyfall", hint: "Översvämning" }, { word: "Värmebölja", hint: "Hetta" },
      { word: "Frost", hint: "Morgon" }, { word: "Moln", hint: "Himmel" },
      { word: "Regnbåge", hint: "Färger" }, { word: "Tornado", hint: "Tratt" },
      { word: "Vind", hint: "Blåst" }, { word: "Bris", hint: "Svag" },
      { word: "Minusgrader", hint: "Kyla" }, { word: "Luftfuktighet", hint: "Fukt" },
      { word: "Högtryck", hint: "Klart" }, { word: "Lågtryck", hint: "Ostadigt" },
      { word: "Väderprognos", hint: "Morgon" }, { word: "Is", hint: "Halka" },
      { word: "Slask", hint: "Blött" }, { word: "Snöstorm", hint: "Sikt" },
      { word: "Solnedgång", hint: "Kväll" }, { word: "Soluppgång", hint: "Gryning" },
      { word: "Temperatur", hint: "Grader" }, { word: "Väderkvarn", hint: "Vind" },
      { word: "Torka", hint: "Torrt" }, { word: "Norrsken", hint: "Natt" }
    ]
  }
};

(function validateWordData() {
  const MIN_ENTRIES = 30;
  for (const [categoryKey, category] of Object.entries(CATEGORIES)) {
    if (category.words.length < MIN_ENTRIES) throw new Error(`${categoryKey} har för få ord.`);
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
  if (names.length < 3) return setText(setupError, "Du behöver minst 3 spelare för att spela.");

  const categoryInputs = document.querySelectorAll('input[name="category"]:checked');
  const selectedCategories = Array.from(categoryInputs).map(input => input.value);
  if (!selectedCategories.length) return setText(setupError, "Välj minst en kategori.");

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
    const badge = document.createElement("span"); badge.className = "impostor-badge"; badge.textContent = "Bedragaren";
    const label = document.createElement("p"); label.className = "impostor-hint-label"; label.textContent = "Ledtråd";
    const hint = document.createElement("p"); hint.className = "impostor-hint-word"; hint.textContent = gameState.hint;
    cardBackContent.append(badge, label, hint);
  } else {
    const label = document.createElement("p"); label.className = "reveal-label"; label.textContent = "Det hemliga ordet är";
    const word = document.createElement("p"); word.className = "reveal-word"; word.textContent = gameState.secretWord;
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

initSetupScreen();
showScreen("screen-setup");
