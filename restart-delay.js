"use strict";

const RESTART_DELAY_SECONDS = 5;
const finalScreen = document.getElementById("screen-final");
const playAgainButton = document.getElementById("play-again-btn");

let countdownTimer = null;

function clearRestartCountdown() {
  if (countdownTimer !== null) {
    window.clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

function startRestartCountdown() {
  clearRestartCountdown();

  let secondsLeft = RESTART_DELAY_SECONDS;
  playAgainButton.disabled = true;
  playAgainButton.setAttribute("aria-disabled", "true");
  playAgainButton.textContent = `Spela igen (${secondsLeft})`;

  countdownTimer = window.setInterval(() => {
    secondsLeft -= 1;

    if (secondsLeft <= 0) {
      clearRestartCountdown();
      playAgainButton.disabled = false;
      playAgainButton.setAttribute("aria-disabled", "false");
      playAgainButton.textContent = "Spela igen";
      return;
    }

    playAgainButton.textContent = `Spela igen (${secondsLeft})`;
  }, 1000);
}

const finalScreenObserver = new MutationObserver(() => {
  const isVisible = !finalScreen.hasAttribute("hidden");

  if (isVisible) {
    startRestartCountdown();
  } else {
    clearRestartCountdown();
    playAgainButton.disabled = true;
    playAgainButton.setAttribute("aria-disabled", "true");
    playAgainButton.textContent = "Spela igen";
  }
});

playAgainButton.disabled = true;
playAgainButton.setAttribute("aria-disabled", "true");

finalScreenObserver.observe(finalScreen, {
  attributes: true,
  attributeFilter: ["hidden"]
});
