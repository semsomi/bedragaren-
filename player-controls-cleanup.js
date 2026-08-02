"use strict";

(() => {
  const playerList = document.getElementById("player-list");
  if (!playerList) return;

  function cleanPlayerControls() {
    for (const item of playerList.querySelectorAll(".player-item")) {
      const handles = item.querySelectorAll(".player-drag-handle");
      handles.forEach((handle, index) => {
        if (index > 0) handle.remove();
      });

      // Dragning är den enda ordningskontrollen i gränssnittet.
      // Äldre upp-/nedknappar kunde se ut som ett andra handtag på mobil.
      item.querySelectorAll(".player-move-buttons").forEach(element => element.remove());
    }
  }

  cleanPlayerControls();
  new MutationObserver(cleanPlayerControls).observe(playerList, {
    childList: true,
    subtree: true
  });
})();
