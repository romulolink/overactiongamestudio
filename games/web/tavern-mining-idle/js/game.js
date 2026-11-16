// User interface elements
const modal = document.getElementById("myModal");
const gear = document.getElementById("gear");
const span = document.querySelector(".close");
const volumeSlider = document.getElementById("volumeSlider");
const soundIcon = document.querySelector(".sound");
const fullscreenIcon = document.querySelector(".fullscreen");
const coinNumber = document.querySelector(".coin-number");
const diamondNumber = document.querySelector(".diamond-number");
const audio = document.getElementById("myAudio");
const button = document.querySelector(
  ".icon24[src='./image/power-button.svg']"
);
const time = document.getElementById("time");
const progressBarElement = document.getElementById("progressBar");

// Assume you have an element with an ID of "progressBar"
const progressBar = new ProgressBar.Line("#progress-bar", {
  strokeWidth: 2,
  color: "#4CAF50",
  trailColor: "#eee",
  trailWidth: 8,
  svgStyle: { width: "100%", height: "100%" },
  from: { color: "#4CAF50" },
  to: { color: "#4CAF50" },
  step: (state, bar) => {
    bar.path.setAttribute("stroke", state.color);
  },
});

let coins = inventory.coin.total;
let diamonds = inventory.diamond.total;
coinNumber.textContent = coins;
diamondNumber.textContent = diamonds;
let coinDurationTime = 500; // 0.5 seconds

let elapsed = localStorage.getItem("elapsed")
  ? parseInt(localStorage.getItem("elapsed"))
  : 0;
time.textContent = formatTime(elapsed);

volumeSlider.addEventListener("input", function () {
  const newVolume = volumeSlider.value / 100;
  audio.volume = newVolume;
});

function adjustVolume(volumeChange) {
  const newVolume = audio.volume + volumeChange;
  audio.volume = Math.max(0, Math.min(newVolume, 1));
  volumeSlider.value = audio.volume * 100;
}

function toggleSound() {
  audio.volume = audio.volume ? 0 : 0.5;
  volumeSlider.value = audio.volume * 100;
}

function toggleModal() {
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function toggleFullScreen() {
  if (
    !document.fullscreenElement &&
    document.documentElement.requestFullscreen
  ) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function closeWindow() {
  window.close();
}

gear.onclick = toggleModal;
span.onclick = toggleModal;
window.onclick = (event) => {
  if (event.target === modal) {
    toggleModal();
  }
};
soundIcon.onclick = toggleSound;
fullscreenIcon.onclick = toggleFullScreen;
button.onclick = closeWindow;

window.addEventListener("keydown", function (event) {
  switch (event.key.toLowerCase()) {
    case "v":
      adjustVolume(0.1);
      break;
    case "c":
      adjustVolume(-0.1);
      break;
    case "z":
      toggleFullScreen();
      break;
    case "d":
      decreaseResourceAmount();
      break;
    case "a":
      increaseResourceAmount();
      break;
  }
});

function startProgress(duration) {
  console.log("startProgress");
  progressBar.set(0);
  progressBar.animate(1, { duration: duration });
}

setInterval(function () {
  increaseCoins();
  startProgress(coinDurationTime);
}, coinDurationTime);

setInterval(function () {
  if (Math.random() < 0.001) {
    increaseDiamonds();
  }
}, 6000);

setInterval(function () {
  elapsed += 1;
  time.textContent = formatTime(elapsed);
  localStorage.setItem("elapsed", elapsed.toString());
}, 1000);

window.onload = function () {
  loadGame();
  audio.play();
};

audio.onended = function () {
  this.play();
};

function updateUI() {
  coinNumber.textContent = inventory.coin.total;
  diamondNumber.textContent = inventory.diamond.total;
  time.textContent = formatTime(elapsed);
}

function loadGame() {
  const savedInventory = localStorage.getItem("inventory");
  if (savedInventory) {
    inventory = JSON.parse(savedInventory);
  }

  elapsed = localStorage.getItem("elapsed")
    ? parseInt(localStorage.getItem("elapsed"))
    : 0;
  time.textContent = formatTime(elapsed);

  updateUI();
}

function increaseCoins() {
  inventory.coin.total++;
  saveGame();
  updateUI();
}

function increaseDiamonds() {
  inventory.diamond.total++;
  saveGame();
  updateUI();
}

function decreaseResourceAmount() {
  if (resource.total > 0) {
    resource.total--;
    saveGame();
    updateUI();
  }
}

function saveGame() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
  localStorage.setItem("elapsed", elapsed.toString());
}

const coinButton = document.getElementById("coinButton");

coinButton.addEventListener("click", increaseCoins);

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

// função usada para teste
function increaseResourceAmount() {
  resource.total++;
  saveGame();
  updateUI();
}

// Função para incrementar o campo inventory.coinSpeedUpgrade.total
function increaseCoinSpeedUpgrade() {
  if (inventory.coin.total > 0) {
    inventory.coin.total--;
    inventory.coinSpeedUpgrade.total++;
    coinDurationTime = coinDurationTime * 0.9; // Diminui a velocidade em 10%
    saveGame();
    updateUI();
  }
}

// Adicione um ouvinte de evento ao botão para chamar a função increaseCoinSpeedUpgrade quando o botão for clicado
upgradeButton.addEventListener("click", increaseCoinSpeedUpgrade);
