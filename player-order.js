"use strict";

(() => {
  const playerList = document.getElementById("player-list");
  if (!playerList) return;

  let draggedItem = null;
  let activePointerId = null;

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
  }

  function moveDraggedItem(clientY) {
    if (!draggedItem) return;

    const otherItems = Array.from(playerList.querySelectorAll(".player-item"))
      .filter(item => item !== draggedItem);

    const itemBelow = otherItems.find(item => {
      const rect = item.getBoundingClientRect();
      return clientY < rect.top + rect.height / 2;
    });

    if (itemBelow) {
      playerList.insertBefore(draggedItem, itemBelow);
    } else {
      playerList.appendChild(draggedItem);
    }

    refreshButtons();
  }

  function finishPointerDrag(event) {
    if (!draggedItem) return;
    if (event && activePointerId !== null && event.pointerId !== activePointerId) return;

    draggedItem.classList.remove("player-dragging");
    document.body.classList.remove("reordering-players");
    draggedItem = null;
    activePointerId = null;
    refreshButtons();
    saveCurrentOrder();
  }

  function decorateItem(item) {
    if (item.dataset.reorderReady === "true") return;
    item.dataset.reorderReady = "true";

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
      if (draggedItem) return;
      event.preventDefault();
      event.stopPropagation();

      draggedItem = item;
      activePointerId = event.pointerId;
      item.classList.add("player-dragging");
      document.body.classList.add("reordering-players");
    });
  }

  document.addEventListener("pointermove", event => {
    if (!draggedItem || event.pointerId !== activePointerId) return;
    event.preventDefault();
    moveDraggedItem(event.clientY);
  }, { passive: false });

  document.addEventListener("pointerup", finishPointerDrag);
  document.addEventListener("pointercancel", finishPointerDrag);
  window.addEventListener("blur", () => finishPointerDrag());

  function decorateAll() {
    Array.from(playerList.children).forEach(decorateItem);
    refreshButtons();
  }

  const observer = new MutationObserver(decorateAll);
  observer.observe(playerList, { childList: true });
  decorateAll();
})();
