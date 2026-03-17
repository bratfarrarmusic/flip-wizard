const ROUND_SECONDS = 10;
const INTERSTITIAL_DELAY_MS = 220;
const NEXT_CARD_DELAY_MS = 90;
const LEADERBOARD_KEY = "flipWizardLeaderboardV1";
const LEADERBOARD_LIMIT = 5;

const records = [
  {
    artist: "Nirvana",
    title: "In Utero",
    buyPrice: "$8",
    correctAnswer: "Yes",
    reason: "Strong demand and low buy-in leaves margin.",
    imageSrc: "images/in-utero.jpg",
    imageLabel: "Nirvana\nIn Utero",
  },
  {
    artist: "The Beatles",
    title: "Abbey Road",
    buyPrice: "$35",
    correctAnswer: "No",
    reason: "Too high to leave enough resale margin.",
    imageSrc: "images/abbey-road.jpg",
    imageLabel: "The Beatles\nAbbey Road",
  },
  {
    artist: "David Bowie",
    title: "Heroes",
    buyPrice: "$12",
    correctAnswer: "Yes",
    reason: "Reasonable cost with room for profit.",
    imageSrc: "images/heroes.jpg",
    imageLabel: "David Bowie\nHeroes",
  },
];

const introSection = document.getElementById("intro");
const gameSection = document.getElementById("game");
const resultSection = document.getElementById("result");
const interstitial = document.getElementById("interstitial");
const recordCard = document.getElementById("recordCard");

const playerNameInput = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");

const cardCount = document.getElementById("cardCount");
const scoreText = document.getElementById("score");
const streakText = document.getElementById("streak");
const timerText = document.getElementById("timer");
const artistText = document.getElementById("artist");
const titleText = document.getElementById("title");
const buyPriceText = document.getElementById("buyPrice");
const tileArtist = document.getElementById("tileArtist");
const tileTitle = document.getElementById("tileTitle");
const albumTile = document.getElementById("albumTile");
const coverImage = document.getElementById("coverImage");
const coverFallback = document.getElementById("coverFallback");

const finalScore = document.getElementById("finalScore");
const finalPlayer = document.getElementById("finalPlayer");
const summary = document.getElementById("summary");
const rating = document.getElementById("rating");
const introLeaderboard = document.getElementById("introLeaderboard");
const resultLeaderboard = document.getElementById("resultLeaderboard");

let currentCard = 0;
let score = 0;
let streak = 0;
let playerName = "Anonymous";
let answerLocked = false;
let timeRemaining = ROUND_SECONDS;
let cardStartedAt = 0;
let timerInterval = null;
let pendingTransitionTimeout = null;

function startGame() {
  resetGameState();
  playerName = getPlayerName();
  introSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  gameSection.classList.remove("hidden");
  renderCard();
}

function renderCard() {
  const record = records[currentCard];
  const [artistLabel, titleLabel] = record.imageLabel.split("\n");

  cardCount.textContent = `Card ${currentCard + 1} / ${records.length}`;
  scoreText.textContent = `Score ${Math.round(score)}`;
  streakText.textContent = `Streak ${streak}`;
  artistText.textContent = record.artist;
  titleText.textContent = record.title;
  buyPriceText.textContent = record.buyPrice;
  tileArtist.textContent = artistLabel || record.artist;
  tileTitle.textContent = titleLabel || record.title;

  setCoverImage(record);

  answerLocked = false;
  yesBtn.disabled = false;
  noBtn.disabled = false;

  preloadRecordImage(records[currentCard + 1]);
  startCountdown();
}

function setCoverImage(record) {
  coverImage.src = "";
  coverImage.alt = `${record.artist} — ${record.title} cover`;
  coverFallback.classList.remove("hidden");
  albumTile.setAttribute("aria-label", `${record.artist} ${record.title} cover`);

  if (!record.imageSrc) {
    return;
  }

  coverImage.onload = () => {
    coverFallback.classList.add("hidden");
  };

  coverImage.onerror = () => {
    coverFallback.classList.remove("hidden");
  };

  coverImage.src = record.imageSrc;
}

function preloadRecordImage(record) {
  if (!record || !record.imageSrc) {
    return;
  }

  const image = new Image();
  image.src = record.imageSrc;
}

function startCountdown() {
  stopCountdown();
  timeRemaining = ROUND_SECONDS;
  cardStartedAt = performance.now();
  updateTimerDisplay();

  timerInterval = window.setInterval(() => {
    const elapsedSeconds = (performance.now() - cardStartedAt) / 1000;
    timeRemaining = Math.max(0, ROUND_SECONDS - elapsedSeconds);
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      stopCountdown();
      handleTimeout();
    }
  }, 50);
}

function stopCountdown() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  timerText.textContent = `Time ${timeRemaining.toFixed(1)}s`;
}

function getStreakBonus(currentStreak) {
  if (currentStreak < 2) {
    return 0;
  }

  return (currentStreak - 1) * 25;
}

function handleAnswer(playerAnswer) {
  if (answerLocked) {
    return;
  }

  answerLocked = true;
  yesBtn.disabled = true;
  noBtn.disabled = true;
  stopCountdown();

  const record = records[currentCard];
  const isCorrect = playerAnswer === record.correctAnswer;

  if (isCorrect) {
    streak += 1;
    const points = 100 + Math.round(timeRemaining * 10) + getStreakBonus(streak);
    score += points;
    scoreText.textContent = `Score ${Math.round(score)}`;
  } else {
    streak = 0;
  }

  streakText.textContent = `Streak ${streak}`;

  pendingTransitionTimeout = window.setTimeout(moveToNextCard, NEXT_CARD_DELAY_MS);
}

function handleTimeout() {
  if (answerLocked) {
    return;
  }

  answerLocked = true;
  yesBtn.disabled = true;
  noBtn.disabled = true;
  streak = 0;
  streakText.textContent = `Streak ${streak}`;

  pendingTransitionTimeout = window.setTimeout(moveToNextCard, NEXT_CARD_DELAY_MS);
}

function showInterstitial(onDone) {
  interstitial.classList.remove("hidden");
  recordCard.classList.add("transitioning");

  pendingTransitionTimeout = window.setTimeout(() => {
    interstitial.classList.add("hidden");
    recordCard.classList.remove("transitioning");
    onDone();
  }, INTERSTITIAL_DELAY_MS);
}

function moveToNextCard() {
  currentCard += 1;

  if (currentCard >= records.length) {
    endGame();
    return;
  }

  showInterstitial(renderCard);
}

function endGame() {
  stopCountdown();
  interstitial.classList.add("hidden");
  gameSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const roundedScore = Math.round(score);
  saveLeaderboardEntry({ name: playerName, score: roundedScore, date: Date.now() });

  finalScore.textContent = `Final Score: ${roundedScore}`;
  finalPlayer.textContent = `Player: ${playerName}`;
  rating.textContent = getRatingLine(roundedScore);
  summary.textContent = getSummaryLine(roundedScore);

  renderLeaderboards();
}

function getRatingLine(points) {
  if (points <= 159) {
    return "Back to the bargain bins.";
  }

  if (points <= 319) {
    return "Fast eye. Solid instincts.";
  }

  return "You know your margins.";
}

function getSummaryLine(points) {
  if (points <= 159) {
    return "Shake it off and run it back. The next crate has your name on it.";
  }

  if (points <= 319) {
    return "Great pace and solid reads. One hotter streak away from elite.";
  }

  return "Outstanding run. You flipped like a pro dealer today.";
}

function getPlayerName() {
  const entered = playerNameInput.value.trim();
  return entered || "Anonymous";
}

function readLeaderboard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLeaderboardEntry(entry) {
  const leaderboard = readLeaderboard();
  leaderboard.push(entry);

  const best = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, LEADERBOARD_LIMIT);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(best));
}

function renderLeaderboardList(target, leaderboard) {
  target.innerHTML = "";

  if (!leaderboard.length) {
    const empty = document.createElement("li");
    empty.textContent = "No scores yet. Set the pace.";
    target.appendChild(empty);
    return;
  }

  leaderboard.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${entry.name} — ${entry.score}`;
    target.appendChild(item);
  });
}

function renderLeaderboards() {
  const leaderboard = readLeaderboard();
  renderLeaderboardList(introLeaderboard, leaderboard);
  renderLeaderboardList(resultLeaderboard, leaderboard);
}

function clearLeaderboard() {
  localStorage.removeItem(LEADERBOARD_KEY);
  renderLeaderboards();
}

function resetGame() {
  stopCountdown();
  clearPendingTransition();
  interstitial.classList.add("hidden");
  introSection.classList.remove("hidden");
  gameSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  resetGameState();
  renderLeaderboards();
}

function resetGameState() {
  currentCard = 0;
  score = 0;
  streak = 0;
  answerLocked = false;
  timeRemaining = ROUND_SECONDS;
  scoreText.textContent = "Score 0";
  streakText.textContent = "Streak 0";
  timerText.textContent = `Time ${ROUND_SECONDS.toFixed(1)}s`;
}

function clearPendingTransition() {
  if (pendingTransitionTimeout) {
    clearTimeout(pendingTransitionTimeout);
    pendingTransitionTimeout = null;
  }
}

startBtn.addEventListener("click", startGame);
yesBtn.addEventListener("click", () => handleAnswer("Yes"));
noBtn.addEventListener("click", () => handleAnswer("No"));
playAgainBtn.addEventListener("click", resetGame);
clearLeaderboardBtn.addEventListener("click", clearLeaderboard);

renderLeaderboards();
