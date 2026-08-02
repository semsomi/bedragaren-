"use strict";

(() => {
  const playerList = document.getElementById("player-list");
  if (!playerList) return;

  let draggedItem = null;

  function saveCurrentOrder() {
    const names = Array.from(playerList.querySelectorAll(".player-input"))
      .map(input => input.value.trim());

    try {
      localStorage.setItem("bedragaren_players", JSON.stringify(names));
    } catch {
      /* localStorage kan vara avstängt */
    }
  }

  function refreshButtons() {
    const items = Array.from(playerList.children);
    items.forEach((item, index) => {
      const up = item.querySelector('[data-direction="up"]');
      const down = item.querySelector('[data-direction="down"]');
      if (up) up.disabled = index === 0;
      if (down) down.disabled = index === items.length - 1;
    });
  }

  function moveItem(item, direction) {
    if (direction === "up" && item.previousElementSibling) {
      playerList.insertBefore(item, item.previousElementSibling);
    } else if (direction === "down" && item.nextElementSibling) {
      playerList.insertBefore(item.nextElementSibling, item);
    }
    refreshButtons();
    saveCurrentOrder();
    item.querySelector(".player-input")?.focus();
  }

  function decorateItem(item) {
    if (item.dataset.reorderReady === "true") return;
    item.dataset.reorderReady = "true";
    item.draggable = true;

    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = "player-drag-handle";
    handle.textContent = "☰";
    handle.setAttribute("aria-label", "Dra för att flytta spelaren");
    handle.title = "Dra för att ändra ordningen";

    const moveButtons = document.createElement("div");
    moveButtons.className = "player-move-buttons";

    const up = document.createElement("button");
    up.type = "button";
    up.className = "player-order-btn";
    up.dataset.direction = "up";
    up.textContent = "↑";
    up.setAttribute("aria-label", "Flytta spelaren uppåt");

    const down = document.createElement("button");
    down.type = "button";
    down.className = "player-order-btn";
    down.dataset.direction = "down";
    down.textContent = "↓";
    down.setAttribute("aria-label", "Flytta spelaren nedåt");

    moveButtons.append(up, down);
    item.prepend(handle, moveButtons);

    up.addEventListener("click", () => moveItem(item, "up"));
    down.addEventListener("click", () => moveItem(item, "down"));

    handle.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse") return;
      event.preventDefault();
      draggedItem = item;
      item.classList.add("player-dragging");
      document.body.classList.add("reordering-players");
      try { handle.setPointerCapture(event.pointerId); } catch { /* ignore */ }
    });

    handle.addEventListener("pointermove", event => {
      if (draggedItem !== item || event.pointerType === "mouse") return;
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".player-item");
      if (!target || target === item || target.parentElement !== playerList) return;

      const rect = target.getBoundingClientRect();
      const insertAfter = event.clientY > rect.top + rect.height / 2;
      playerList.insertBefore(item, insertAfter ? target.nextElementSibling : target);
      refreshButtons();
    });

    function finishTouchDrag(event) {
      if (draggedItem !== item) return;
      draggedItem = null;
      item.classList.remove("player-dragging");
      document.body.classList.remove("reordering-players");
      try { handle.releasePointerCapture(event.pointerId); } catch { /* ignore */ }
      refreshButtons();
      saveCurrentOrder();
    }

    handle.addEventListener("pointerup", finishTouchDrag);
    handle.addEventListener("pointercancel", finishTouchDrag);

    item.addEventListener("dragstart", event => {
      if (!event.target.closest(".player-drag-handle")) {
        event.preventDefault();
        return;
      }
      draggedItem = item;
      item.classList.add("player-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", "player");
    });

    item.addEventListener("dragend", () => {
      draggedItem = null;
      item.classList.remove("player-dragging");
      refreshButtons();
      saveCurrentOrder();
    });
  }

  playerList.addEventListener("dragover", event => {
    if (!draggedItem) return;
    event.preventDefault();
    const target = event.target.closest(".player-item");
    if (!target || target === draggedItem) return;
    const rect = target.getBoundingClientRect();
    const insertAfter = event.clientY > rect.top + rect.height / 2;
    playerList.insertBefore(draggedItem, insertAfter ? target.nextElementSibling : target);
  });

  function decorateAll() {
    Array.from(playerList.children).forEach(decorateItem);
    refreshButtons();
  }

  const observer = new MutationObserver(decorateAll);
  observer.observe(playerList, { childList: true });
  decorateAll();
})();
