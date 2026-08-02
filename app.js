/* ============================================================
   BEDRAGAREN – app.js
   A Swedish "Who is the Impostor?" party game.
   Plain HTML/CSS/JS – no frameworks, no backend.
============================================================ */

"use strict";

/* ============================================================
   WORD DATA
   Every entry: { word: "...", hint: "..." }
   hint must be exactly one Swedish word (no spaces).
============================================================ */
const CATEGORIES = {
  food: {
    label: "Mat och dryck",
    words: [
      { word: "Pizza",        hint: "Italien"      },
      { word: "Kaffe",        hint: "Morgon"       },
      { word: "Sushi",        hint: "Japan"        },
      { word: "Tacos",        hint: "Mexiko"       },
      { word: "Glass",        hint: "Sommar"       },
      { word: "Pannkakor",    hint: "Lördag"       },
      { word: "Hamburgare",   hint: "Bröd"         },
      { word: "Pasta",        hint: "Sås"          },
      { word: "Choklad",      hint: "Kakao"        },
      { word: "Te",           hint: "Kopp"         },
      { word: "Pommes",       hint: "Ketchup"      },
      { word: "Kebab",        hint: "Grillat"      },
      { word: "Jordgubbar",   hint: "Sommar"       },
      { word: "Lemonad",      hint: "Citron"       },
      { word: "Popcorn",      hint: "Bio"          },
      { word: "Soppa",        hint: "Varm"         },
      { word: "Smörgås",      hint: "Frukost"      },
      { word: "Waffla",       hint: "Grädde"       },
      { word: "Sill",         hint: "Midsommar"    },
      { word: "Köttbullar",   hint: "Ikea"         },
      { word: "Kanelbulle",   hint: "Fika"         },
      { word: "Lasagne",      hint: "Ugn"          },
      { word: "Omelett",      hint: "Ägg"          },
      { word: "Risotto",      hint: "Ris"          },
      { word: "Smoothie",     hint: "Frukt"        },
      { word: "Müsli",        hint: "Yoghurt"      },
      { word: "Croissant",    hint: "Paris"        },
      { word: "Nachos",       hint: "Chips"        },
      { word: "Halloumi",     hint: "Grillad"      },
      { word: "Avokado",      hint: "Grön"         },
      { word: "Mango",        hint: "Tropisk"      },
      { word: "Blåbär",       hint: "Skog"         }
    ]
  },
  items: {
    label: "Vardagsföremål",
    words: [
      { word: "Tandborste",   hint: "Badrum"       },
      { word: "Paraply",      hint: "Regn"         },
      { word: "Fjärrkontroll",hint: "Soffa"        },
      { word: "Nyckel",       hint: "Dörr"         },
      { word: "Kudde",        hint: "Soffa"        },
      { word: "Sax",          hint: "Klippa"       },
      { word: "Laddare",      hint: "Batteri"      },
      { word: "Stekpanna",    hint: "Spis"         },
      { word: "Spegel",       hint: "Reflektion"   },
      { word: "Ryggsäck",     hint: "Skola"        },
      { word: "Klocka",       hint: "Tid"          },
      { word: "Dammsugare",   hint: "Golv"         },
      { word: "Glasögon",     hint: "Syn"          },
      { word: "Handduk",      hint: "Dusch"        },
      { word: "Penna",        hint: "Skriva"       },
      { word: "Böcker",       hint: "Bibliotek"    },
      { word: "Lampa",        hint: "Ljus"         },
      { word: "Tallrik",      hint: "Mat"          },
      { word: "Gaffel",       hint: "Middag"       },
      { word: "Mugg",         hint: "Dryck"        },
      { word: "Väska",        hint: "Handväska"    },
      { word: "Kamera",       hint: "Foto"         },
      { word: "Kalender",     hint: "Datum"        },
      { word: "Linjal",       hint: "Mäta"         },
      { word: "Pennfodral",   hint: "Skola"        },
      { word: "Termos",       hint: "Kaffe"        },
      { word: "Kniv",         hint: "Kök"          },
      { word: "Korkskruv",    hint: "Flaska"       },
      { word: "Skärbräda",    hint: "Kök"          },
      { word: "Bestick",      hint: "Dukning"      },
      { word: "Tvål",         hint: "Händer"       },
      { word: "Resväska",     hint: "Semester"     }
    ]
  }
};

/* ============================================================
   DEVELOPMENT-TIME VALIDATION
   Runs once on load; throws on any data error.
============================================================ */
(function validateWordData() {
  const MIN_ENTRIES = 30;
  for (const [catKey, cat] of Object.entries(CATEGORIES)) {
    if (cat.words.length < MIN_ENTRIES) {
      throw new Error(`Kategori "${catKey}" har bara ${cat.words.length} ord (minst ${MIN_ENTRIES} krävs).`);
    }
    const seen = new Set();
    for (const entry of cat.words) {
      if (!entry.word || typeof entry.word !== "string") {
        throw new Error(`Felaktig post i "${catKey}": saknar ord.`);
      }
      if (!entry.hint || typeof entry.hint !== "string") {
        throw new Error(`"${entry.word}" i "${catKey}": saknar ledtråd.`);
      }
      if (/\s/.test(entry.hint)) {
        throw new Error(`"${entry.word}" i "${catKey}": ledtråden "${entry.hint}" innehåller mellanslag.`);
      }
      if (seen.has(entry.word.toLowerCase())) {
        throw new Error(`Duplicerat ord "${entry.word}" i "${catKey}".`);
      }
      seen.add(entry.word.toLowerCase());
    }
  }
})();

/* ============================================================
   SECURE RANDOM HELPERS
   Using crypto.getRandomValues for unbiased, unpredictable randomness.
============================================================ */

/** Returns a uniformly distributed random integer in [0, max). */
function randomInt(max) {
  if (max <= 0) return 0;
  const limit = 0x100000000 - (0x100000000 % max);
  const buf = new Uint32Array(1);
  let value;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);
  return value % max;
}

/* ============================================================
   FISHER–YATES SHUFFLE
============================================================ */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================
   LOCAL STORAGE HELPERS
============================================================ */
const STORAGE_KEY = "bedragaren_players";

function loadStoredPlayers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.every(n => typeof n === "string")) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

function savePlayers(names) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  } catch {
    /* Storage unavailable – silently ignore */
  }
}

/* ============================================================
   DOM HELPERS
============================================================ */
function el(id) {
  return document.getElementById(id);
}

/** Safely set text content (never innerHTML with user data). */
function setText(element, text) {
  element.textContent = text;
}

/** Show a screen, hide all others. */
function showScreen(id) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(s => {
    const isTarget = s.id === id;
    s.classList.toggle("active", isTarget);
    if (isTarget) {
      s.removeAttribute("hidden");
    } else {
      s.setAttribute("hidden", "");
    }
  });
}

/* ============================================================
   SETUP SCREEN
============================================================ */
const playerList = el("player-list");
const addPlayerBtn = el("add-player-btn");
const startBtn = el("start-btn");
const setupError = el("setup-error");

const DEFAULT_PLAYERS = ["", "", ""];

function createPlayerItem(name) {
  const li = document.createElement("li");
  li.className = "player-item";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "player-input";
  input.placeholder = "Spelarnamn";
  input.maxLength = 40;
  input.value = name;
  input.setAttribute("aria-label", "Spelarnamn");
  input.autocomplete = "off";
  input.autocorrect = "off";
  input.autocapitalize = "words";
  input.spellcheck = false;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "player-remove-btn";
  removeBtn.setAttribute("aria-label", "Ta bort spelare");
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(input);
  li.appendChild(removeBtn);
  return li;
}

function initSetupScreen() {
  playerList.innerHTML = "";

  const stored = loadStoredPlayers();
  const initialNames = (stored && stored.length >= 1) ? stored : DEFAULT_PLAYERS;

  initialNames.forEach(name => {
    playerList.appendChild(createPlayerItem(name));
  });

  // Ensure at least 3 rows
  while (playerList.children.length < 3) {
    playerList.appendChild(createPlayerItem(""));
  }
}

addPlayerBtn.addEventListener("click", () => {
  const item = createPlayerItem("");
  playerList.appendChild(item);
  const input = item.querySelector("input");
  input.focus();
});

startBtn.addEventListener("click", startGame);

function getPlayerNames() {
  return Array.from(playerList.querySelectorAll(".player-input"))
    .map(i => i.value.trim())
    .filter(n => n.length > 0);
}

function showSetupError(msg) {
  setText(setupError, msg);
}

function clearSetupError() {
  setText(setupError, "");
}

/* ============================================================
   GAME STATE
============================================================ */
let gameState = null;

function startGame() {
  clearSetupError();

  const names = getPlayerNames();

  if (names.length < 3) {
    showSetupError("Du behöver minst 3 spelare för att spela.");
    return;
  }

  const selectedCats = [];
  if (el("cat-food").checked) selectedCats.push("food");
  if (el("cat-items").checked) selectedCats.push("items");

  if (selectedCats.length === 0) {
    showSetupError("Välj minst en kategori.");
    return;
  }

  // Save names
  savePlayers(names);

  // Build combined word pool
  const wordPool = [];
  selectedCats.forEach(catKey => {
    wordPool.push(...CATEGORIES[catKey].words);
  });

  // Pick secret word
  const secretEntry = wordPool[randomInt(wordPool.length)];

  // Pick impostor
  const impostorIndex = randomInt(names.length);

  // Randomize viewing order
  const playerOrder = shuffle(names.map((name, i) => ({ name, isImpostor: i === impostorIndex })));

  gameState = {
    secretWord: secretEntry.word,
    hint: secretEntry.hint,
    players: playerOrder,
    currentIndex: 0,
    revealedCount: 0
  };

  showCardScreen();
}

/* ============================================================
   CARD SCREEN
============================================================ */
const cardScreen = el("screen-card");
const progressLabel = el("player-progress");
const card = el("card");
const cardFront = card.querySelector(".card-front");
const cardBack = card.querySelector(".card-back");
const cardPlayerName = el("card-player-name");
const cardBackContent = el("card-back-content");
const nextBtn = el("next-btn");

// Hold-to-reveal state
let activePointerId = null;
let cardRevealed = false;
let currentPlayerHasRevealed = false;
let nextBtnLocked = false;

function showCardScreen() {
  showScreen("screen-card");
  loadCurrentPlayer();
}

function loadCurrentPlayer() {
  const { players, currentIndex } = gameState;

  cardRevealed = false;
  currentPlayerHasRevealed = false;
  nextBtnLocked = false;
  activePointerId = null;

  card.classList.remove("revealed", "impostor-card");
  cardBackContent.innerHTML = ""; // Clear back content – never shown until hold
  cardFront.setAttribute("aria-hidden", "false");
  cardBack.setAttribute("aria-hidden", "true");

  const player = players[currentIndex];

  // Update progress
  setText(progressLabel, `Spelare ${currentIndex + 1} av ${players.length}`);

  // Show player name
  setText(cardPlayerName, player.name);

  // Disable next button
  nextBtn.disabled = true;
  nextBtn.setAttribute("aria-disabled", "true");

  // Update card aria-label
  card.setAttribute("aria-label", `${player.name} – håll ned för att visa ditt kort`);
}

function buildCardContent(player) {
  // Build DOM safely – never innerHTML with user/secret data exposed before reveal
  cardBackContent.innerHTML = "";

  if (player.isImpostor) {
    const badge = document.createElement("span");
    badge.className = "impostor-badge";
    badge.textContent = "Bedragaren";

    const hintLabel = document.createElement("p");
    hintLabel.className = "impostor-hint-label";
    hintLabel.textContent = "Ledtråd";

    const hintWord = document.createElement("p");
    hintWord.className = "impostor-hint-word";
    hintWord.textContent = gameState.hint;

    cardBackContent.appendChild(badge);
    cardBackContent.appendChild(hintLabel);
    cardBackContent.appendChild(hintWord);
  } else {
    const label = document.createElement("p");
    label.className = "reveal-label";
    label.textContent = "Det hemliga ordet är";

    const word = document.createElement("p");
    word.className = "reveal-word";
    word.textContent = gameState.secretWord;

    cardBackContent.appendChild(label);
    cardBackContent.appendChild(word);
  }
}

function revealCard() {
  if (cardRevealed) return;
  const player = gameState.players[gameState.currentIndex];

  // Build content only at reveal time
  buildCardContent(player);

  cardRevealed = true;
  currentPlayerHasRevealed = true;
  card.classList.add("revealed");
  if (player.isImpostor) {
    card.classList.add("impostor-card");
  }
  cardFront.setAttribute("aria-hidden", "true");
  cardBack.setAttribute("aria-hidden", "false");
  card.setAttribute("aria-label", `Kort avslöjat för ${player.name} – släpp för att dölja`);
}

function hideCard() {
  if (!cardRevealed) return;
  cardRevealed = false;
  card.classList.remove("revealed", "impostor-card");
  cardBackContent.innerHTML = ""; // Remove secret content from DOM
  cardFront.setAttribute("aria-hidden", "false");
  cardBack.setAttribute("aria-hidden", "true");
  const player = gameState.players[gameState.currentIndex];
  card.setAttribute("aria-label", `${player.name} – håll ned för att visa ditt kort`);

  // Enable next button only after at least one reveal
  if (currentPlayerHasRevealed) {
    nextBtn.disabled = false;
    nextBtn.setAttribute("aria-disabled", "false");
  }
}

/* ---- Pointer Events ---- */
card.addEventListener("pointerdown", (e) => {
  if (activePointerId !== null) return; // Ignore second pointer
  activePointerId = e.pointerId;
  try {
    card.setPointerCapture(e.pointerId);
  } catch {
    /* ignore – not all environments support this */
  }
  revealCard();
});

card.addEventListener("pointerup", (e) => {
  if (e.pointerId !== activePointerId) return;
  activePointerId = null;
  try {
    card.releasePointerCapture(e.pointerId);
  } catch { /* ignore */ }
  hideCard();
});

card.addEventListener("pointercancel", (e) => {
  if (e.pointerId !== activePointerId) return;
  activePointerId = null;
  hideCard();
});

card.addEventListener("pointerleave", (e) => {
  if (e.pointerId !== activePointerId) return;
  // Only hide if pointer leaves and it hasn't been captured
  if (!card.hasPointerCapture(e.pointerId)) {
    activePointerId = null;
    hideCard();
  }
});

card.addEventListener("lostpointercapture", (e) => {
  if (e.pointerId !== activePointerId) return;
  activePointerId = null;
  hideCard();
});

/* ---- Keyboard Support ---- */
let keyHeld = false;
card.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    if (keyHeld) return; // Prevent repeat
    keyHeld = true;
    e.preventDefault();
    revealCard();
  }
});
card.addEventListener("keyup", (e) => {
  if (e.key === " " || e.key === "Enter") {
    keyHeld = false;
    hideCard();
  }
});

/* ---- Hide on window blur / visibility change ---- */
window.addEventListener("blur", () => {
  activePointerId = null;
  keyHeld = false;
  hideCard();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    activePointerId = null;
    keyHeld = false;
    hideCard();
  }
});

/* ---- Prevent context menu, text selection, image drag on card ---- */
card.addEventListener("contextmenu", (e) => e.preventDefault());
card.addEventListener("dragstart", (e) => e.preventDefault());
card.addEventListener("selectstart", (e) => e.preventDefault());

/* ---- Next player button ---- */
nextBtn.addEventListener("click", () => {
  if (nextBtnLocked) return;
  if (nextBtn.disabled) return;

  nextBtnLocked = true;

  // Ensure card is hidden first
  activePointerId = null;
  keyHeld = false;
  hideCard();

  gameState.currentIndex++;

  if (gameState.currentIndex >= gameState.players.length) {
    showFinalScreen();
  } else {
    loadCurrentPlayer();
    nextBtnLocked = false;
  }
});

/* ============================================================
   FINAL SCREEN
============================================================ */
const starterName = el("starter-name");
const playAgainBtn = el("play-again-btn");

function showFinalScreen() {
  // Pick a random conversation starter from original player order
  const allNames = gameState.players.map(p => p.name);
  const starter = allNames[randomInt(allNames.length)];

  setText(starterName, starter);
  showScreen("screen-final");
}

playAgainBtn.addEventListener("click", () => {
  gameState = null;
  clearSetupError();
  initSetupScreen();
  showScreen("screen-setup");
});

/* ============================================================
   INIT
============================================================ */
(function init() {
  initSetupScreen();
  showScreen("screen-setup");
})();
