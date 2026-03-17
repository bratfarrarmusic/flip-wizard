const ROUND_SECONDS = 10;
const INTERSTITIAL_DELAY_MS = 650;
const NEXT_CARD_DELAY_MS = 220;

const records = [
  {
    artist: "Nirvana",
    title: "In Utero",
    buyPrice: "$8",
    imageLabel: "Nirvana\nIn Utero",
    correctAnswer: "Yes",
    tileStyle: "linear-gradient(135deg, #2f4858, #33658a)",
  },
  {
    artist: "The Beatles",
    title: "Abbey Road",
    buyPrice: "$35",
    imageLabel: "The Beatles\nAbbey Road",
    correctAnswer: "No",
    tileStyle: "linear-gradient(135deg, #5b3a29, #8f5e40)",
  },
  {
    artist: "David Bowie",
    title: "Heroes",
    buyPrice: "$12",
    imageLabel: "David Bowie\nHeroes",
    correctAnswer: "Yes",
    tileStyle: "linear-gradient(135deg, #4b2e83, #815ac0)",
  },
];

const introSection = document.getElementById("intro");
const gameSection = document.getElementById("game");
const resultSection = document.getElementById("result");
const interstitial = document.getElementById("interstitial");

const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const cardCount = document.getElementById("cardCount");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const artistText = document.getElementById("artist");
const titleText = document.getElementById("title");
const buyPriceText = document.getElementById("buyPrice");
const tileArtist = document.getElementById("tileArtist");
const tileTitle = document.getElementById("tileTitle");
const albumTile = document.getElementById("albumTile");

const finalScore = document.getElementById("finalScore");
const summary = document.getElementById("summary");
const rating = document.getElementById("rating");

let currentCard = 0;
let score = 0;
let answerLocked = false;
let timeRemaining = ROUND_SECONDS;
let cardStartedAt = 0;
let timerInterval = null;
let pendingTransitionTimeout = null;

function startGame() {
  resetGameState();
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
  artistText.textContent = record.artist;
  titleText.textContent = record.title;
  buyPriceText.textContent = record.buyPrice;
  tileArtist.textContent = artistLabel;
  tileTitle.textContent = titleLabel;
  albumTile.style.background = record.tileStyle;

  answerLocked = false;
  yesBtn.disabled = false;
  noBtn.disabled = false;

  startCountdown();
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
    const points = 100 + timeRemaining * 10;
    score += points;
    scoreText.textContent = `Score ${Math.round(score)}`;
  }

  pendingTransitionTimeout = window.setTimeout(() => {
    moveToNextCard();
  }, NEXT_CARD_DELAY_MS);
}

function handleTimeout() {
  if (answerLocked) {
    return;
  }

  answerLocked = true;
  yesBtn.disabled = true;
  noBtn.disabled = true;

  pendingTransitionTimeout = window.setTimeout(() => {
    moveToNextCard();
  }, NEXT_CARD_DELAY_MS);
}

function showInterstitial(onDone) {
  interstitial.classList.remove("hidden");
  pendingTransitionTimeout = window.setTimeout(() => {
    interstitial.classList.add("hidden");
    onDone();
  }, INTERSTITIAL_DELAY_MS);
}

function moveToNextCard() {
  currentCard += 1;

  if (currentCard >= records.length) {
    endGame();
    return;
  }

  showInterstitial(() => {
    renderCard();
  });
}

function endGame() {
  stopCountdown();
  interstitial.classList.add("hidden");
  gameSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const roundedScore = Math.round(score);
  finalScore.textContent = `Final Score: ${roundedScore}`;
  summary.textContent = `You scored ${roundedScore} points.`;
  rating.textContent = getRatingLine(roundedScore);
}

function getRatingLine(points) {
  if (points <= 119) {
    return "Bargain Amateur";
  }

  if (points <= 249) {
    return "Sharp Flipper";
  }

  return "Flip Wizard";
}

function resetGame() {
  stopCountdown();
  clearPendingTransition();
  interstitial.classList.add("hidden");
  introSection.classList.remove("hidden");
  gameSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  resetGameState();
}

function resetGameState() {
  currentCard = 0;
  score = 0;
  answerLocked = false;
  timeRemaining = ROUND_SECONDS;
  scoreText.textContent = "Score 0";
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
