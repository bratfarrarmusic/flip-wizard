const ROUND_SECONDS = 10;
const NEXT_CARD_DELAY_MS = 120;
const LEADERBOARD_KEY = "flipWizardLeaderboardV2";
const LEADERBOARD_LIMIT = 5;
const CARDS_PER_ROUND = 10;
const GENERIC_RECORD_IMAGE = "images/record-placeholder.jpg";

const SCREEN = {
  HOME: "home",
  ROUND_ANNOUNCEMENT: "round_announcement",
  GAMEPLAY: "gameplay",
  BETWEEN_ROUND_AD: "between_round_ad",
  END: "end",
};

const ROUND_CONFIG = [
  {
    key: "local-op-shop",
    title: "Round One: Local Op-Shop",
    eyebrow: "Round One",
    announcementText: "These are all records in VG+/VG+.\nCan you flip them?\n3–2–1 GO!",
    cardCount: CARDS_PER_ROUND,
  },
  {
    key: "sunday-market",
    title: "Round Two: Sunday Market",
    eyebrow: "Round Two",
    announcementText: "Fresh crates, mixed sellers, more price chaos.\nCan you still spot the flips?\n3–2–1 GO!",
    cardCount: CARDS_PER_ROUND,
  },
];

const recordPool = [
  { artist: "Nirvana", title: "In Utero", imageLabel: "Nirvana\nIn Utero", rounds: ["local-op-shop"], minPrice: 8, maxPrice: 26, flipThreshold: 15 },
  { artist: "The Beatles", title: "Abbey Road", imageLabel: "The Beatles\nAbbey Road", rounds: ["local-op-shop"], minPrice: 12, maxPrice: 40, flipThreshold: 24 },
  { artist: "David Bowie", title: "Heroes", imageLabel: "David Bowie\nHeroes", rounds: ["local-op-shop"], minPrice: 6, maxPrice: 24, flipThreshold: 14 },
  { artist: "Fleetwood Mac", title: "Rumours", imageLabel: "Fleetwood Mac\nRumours", rounds: ["local-op-shop", "sunday-market"], minPrice: 5, maxPrice: 28, flipThreshold: 15 },
  { artist: "Pink Floyd", title: "The Wall", imageLabel: "Pink Floyd\nThe Wall", rounds: ["local-op-shop", "sunday-market"], minPrice: 12, maxPrice: 38, flipThreshold: 21 },
  { artist: "Radiohead", title: "OK Computer", imageLabel: "Radiohead\nOK Computer", rounds: ["local-op-shop"], minPrice: 9, maxPrice: 30, flipThreshold: 18 },
  { artist: "Queen", title: "Greatest Hits", imageLabel: "Queen\nGreatest Hits", rounds: ["local-op-shop"], minPrice: 10, maxPrice: 34, flipThreshold: 19 },
  { artist: "Joy Division", title: "Unknown Pleasures", imageLabel: "Joy Division\nUnknown Pleasures", rounds: ["local-op-shop"], minPrice: 7, maxPrice: 29, flipThreshold: 17 },
  { artist: "Bob Dylan", title: "Highway 61 Revisited", imageLabel: "Bob Dylan\nHighway 61", rounds: ["local-op-shop"], minPrice: 8, maxPrice: 27, flipThreshold: 16 },
  { artist: "Eagles", title: "Hotel California", imageLabel: "Eagles\nHotel California", rounds: ["local-op-shop"], minPrice: 9, maxPrice: 32, flipThreshold: 17 },
  { artist: "The Rolling Stones", title: "Sticky Fingers", imageLabel: "Rolling Stones\nSticky Fingers", rounds: ["local-op-shop"], minPrice: 10, maxPrice: 35, flipThreshold: 19 },
  { artist: "Michael Jackson", title: "Thriller", imageLabel: "Michael Jackson\nThriller", rounds: ["local-op-shop", "sunday-market"], minPrice: 7, maxPrice: 31, flipThreshold: 16 },

  { artist: "Bruce Springsteen", title: "Born to Run", imageLabel: "Bruce Springsteen\nBorn to Run", rounds: ["sunday-market"], minPrice: 8, maxPrice: 30, flipThreshold: 17 },
  { artist: "Talking Heads", title: "Remain in Light", imageLabel: "Talking Heads\nRemain in Light", rounds: ["sunday-market"], minPrice: 9, maxPrice: 32, flipThreshold: 18 },
  { artist: "The Clash", title: "London Calling", imageLabel: "The Clash\nLondon Calling", rounds: ["sunday-market"], minPrice: 10, maxPrice: 36, flipThreshold: 20 },
  { artist: "Prince", title: "Purple Rain", imageLabel: "Prince\nPurple Rain", rounds: ["sunday-market"], minPrice: 7, maxPrice: 30, flipThreshold: 17 },
  { artist: "Lou Reed", title: "Transformer", imageLabel: "Lou Reed\nTransformer", rounds: ["sunday-market"], minPrice: 8, maxPrice: 28, flipThreshold: 16 },
  { artist: "Patti Smith", title: "Horses", imageLabel: "Patti Smith\nHorses", rounds: ["sunday-market"], minPrice: 8, maxPrice: 31, flipThreshold: 17 },
  { artist: "AC/DC", title: "Back in Black", imageLabel: "AC/DC\nBack in Black", rounds: ["sunday-market"], minPrice: 7, maxPrice: 29, flipThreshold: 15 },
  { artist: "Led Zeppelin", title: "IV", imageLabel: "Led Zeppelin\nIV", rounds: ["sunday-market"], minPrice: 9, maxPrice: 34, flipThreshold: 18 },
  { artist: "Neil Young", title: "Harvest", imageLabel: "Neil Young\nHarvest", rounds: ["sunday-market"], minPrice: 8, maxPrice: 30, flipThreshold: 16 },
  { artist: "Simon & Garfunkel", title: "Bridge Over Troubled Water", imageLabel: "Simon & Garfunkel\nBridge Over Troubled Water", rounds: ["sunday-market"], minPrice: 8, maxPrice: 27, flipThreshold: 15 },
  { artist: "U2", title: "The Joshua Tree", imageLabel: "U2\nThe Joshua Tree", rounds: ["sunday-market"], minPrice: 9, maxPrice: 31, flipThreshold: 18 },
  { artist: "The Cure", title: "Disintegration", imageLabel: "The Cure\nDisintegration", rounds: ["sunday-market"], minPrice: 10, maxPrice: 33, flipThreshold: 19 },
];

const introSection = document.getElementById("intro");
const roundAnnouncementSection = document.getElementById("roundAnnouncement");
const gameSection = document.getElementById("game");
const resultSection = document.getElementById("result");
const betweenRoundInterstitial = document.getElementById("betweenRoundInterstitial");

const playerNameInput = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const startRoundBtn = document.getElementById("startRoundBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");
const continueRoundBtn = document.getElementById("continueRoundBtn");

const announcementEyebrow = document.getElementById("announcementEyebrow");
const announcementTitle = document.getElementById("announcementTitle");
const announcementBody = document.getElementById("announcementBody");
const roundLabel = document.getElementById("roundLabel");
const cardCount = document.getElementById("cardCount");
const totalProgress = document.getElementById("totalProgress");
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
const homeHeroImage = document.getElementById("homeHeroImage");
const homeHeroFallback = document.getElementById("homeHeroFallback");

const finalScore = document.getElementById("finalScore");
const finalPlayer = document.getElementById("finalPlayer");
const summary = document.getElementById("summary");
const rating = document.getElementById("rating");
const introLeaderboard = document.getElementById("introLeaderboard");
const resultLeaderboard = document.getElementById("resultLeaderboard");

let currentScreen = SCREEN.HOME;
let rounds = [];
let currentRoundIndex = 0;
let pendingAnnouncementRoundIndex = 0;
let currentCard = 0;
let totalCardIndex = 0;
let score = 0;
let streak = 0;
let playerName = "Anonymous";
let answerLocked = false;
let timeRemaining = ROUND_SECONDS;
let cardStartedAt = 0;
let timerInterval = null;
let pendingTransitionTimeout = null;

function renderScreen(screen) {
  currentScreen = screen;
  introSection.classList.toggle("hidden", screen !== SCREEN.HOME);
  roundAnnouncementSection.classList.toggle("hidden", screen !== SCREEN.ROUND_ANNOUNCEMENT);
  gameSection.classList.toggle("hidden", screen !== SCREEN.GAMEPLAY);
  betweenRoundInterstitial.classList.toggle("hidden", screen !== SCREEN.BETWEEN_ROUND_AD);
  resultSection.classList.toggle("hidden", screen !== SCREEN.END);
}

function startNewGame() {
  resetGameState();
  playerName = getPlayerName();
  rounds = prepareRoundPools();
  showRoundAnnouncement(0);
}

function showRoundAnnouncement(roundIndex) {
  const round = ROUND_CONFIG[roundIndex];
  pendingAnnouncementRoundIndex = roundIndex;
  announcementEyebrow.textContent = round.eyebrow;
  announcementTitle.textContent = round.title;
  announcementBody.textContent = round.announcementText;
  startRoundBtn.textContent = "Start Round";
  renderScreen(SCREEN.ROUND_ANNOUNCEMENT);
}

function beginAnnouncedRound() {
  startRound(pendingAnnouncementRoundIndex);
}

function prepareRoundPools() {
  const usedIds = new Set();

  return ROUND_CONFIG.map((round) => {
    const candidates = recordPool.filter((record) => record.rounds.includes(round.key) && !usedIds.has(getRecordId(record)));

    if (candidates.length < round.cardCount) {
      throw new Error(`Not enough records configured for ${round.key}.`);
    }

    const selected = selectRandomRecords(candidates, round.cardCount).map((record) => createRuntimeCard(record));

    selected.forEach((record) => {
      usedIds.add(getRecordId(record));
    });

    return {
      ...round,
      cards: selected,
    };
  });
}

function getRecordId(record) {
  return `${record.artist}__${record.title}`;
}

function selectRandomRecords(pool, count) {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function createRuntimeCard(record) {
  const generatedPrice = generateDisplayedPrice(record.minPrice, record.maxPrice);
  const correctAnswer = computeCorrectAnswer(generatedPrice, record.flipThreshold);

  return {
    ...record,
    generatedPrice,
    buyPriceText: `$${generatedPrice}`,
    correctAnswer,
    coverImageSrc: GENERIC_RECORD_IMAGE,
  };
}

function generateDisplayedPrice(minPrice, maxPrice) {
  const low = Math.min(minPrice, maxPrice);
  const high = Math.max(minPrice, maxPrice);
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function computeCorrectAnswer(generatedPrice, flipThreshold) {
  return generatedPrice <= flipThreshold ? "Yes" : "No";
}

function startRound(roundIndex) {
  currentRoundIndex = roundIndex;
  currentCard = 0;
  renderScreen(SCREEN.GAMEPLAY);
  renderCurrentCard();
}

function getCurrentRound() {
  return rounds[currentRoundIndex];
}

function renderCurrentCard() {
  const round = getCurrentRound();
  const record = round.cards[currentCard];

  if (!record) {
    handleRoundComplete();
    return;
  }

  const [artistLabel, titleLabel] = record.imageLabel.split("\n");
  roundLabel.textContent = round.title;
  cardCount.textContent = `Round ${currentCard + 1}/${round.cards.length}`;
  totalProgress.textContent = `Total ${totalCardIndex + 1}/${ROUND_CONFIG.length * CARDS_PER_ROUND}`;
  scoreText.textContent = `Score ${Math.round(score)}`;
  streakText.textContent = `Streak ${streak}`;
  artistText.textContent = record.artist;
  titleText.textContent = record.title;
  buyPriceText.textContent = record.buyPriceText;
  tileArtist.textContent = artistLabel || record.artist;
  tileTitle.textContent = titleLabel || record.title;

  setCoverImage(record);
  preloadRecordImage(round.cards[currentCard + 1]);

  answerLocked = false;
  yesBtn.disabled = false;
  noBtn.disabled = false;

  startCountdown();
}

function setCoverImage(record) {
  coverImage.src = "";
  coverImage.alt = `${record.artist} — ${record.title} cover`;
  coverFallback.classList.remove("hidden");
  albumTile.setAttribute("aria-label", `${record.artist} ${record.title} cover`);

  if (!record.coverImageSrc) {
    return;
  }

  coverImage.onload = () => {
    coverFallback.classList.add("hidden");
  };

  coverImage.onerror = () => {
    coverFallback.classList.remove("hidden");
  };

  coverImage.src = record.coverImageSrc;
}

function preloadRecordImage(record) {
  if (!record || !record.coverImageSrc) {
    return;
  }

  const image = new Image();
  image.src = record.coverImageSrc;
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

  const record = getCurrentRound().cards[currentCard];
  const isCorrect = playerAnswer === record.correctAnswer;

  if (isCorrect) {
    streak += 1;
    const points = 100 + Math.round(timeRemaining * 10) + getStreakBonus(streak);
    score += points;
  } else {
    streak = 0;
  }

  scoreText.textContent = `Score ${Math.round(score)}`;
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

function moveToNextCard() {
  totalCardIndex += 1;
  currentCard += 1;

  if (currentCard >= getCurrentRound().cards.length) {
    handleRoundComplete();
    return;
  }

  renderCurrentCard();
}

function handleRoundComplete() {
  stopCountdown();

  if (currentRoundIndex === 0) {
    renderScreen(SCREEN.BETWEEN_ROUND_AD);
    return;
  }

  endGame();
}

function continueAfterInterstitial() {
  showRoundAnnouncement(1);
}

function endGame() {
  stopCountdown();
  renderScreen(SCREEN.END);

  const roundedScore = Math.round(score);
  saveLeaderboardEntry({ name: playerName, score: roundedScore, date: Date.now() });

  finalScore.textContent = `Final Score: ${roundedScore}`;
  finalPlayer.textContent = `Player: ${playerName}`;
  rating.textContent = getRatingLine(roundedScore);
  summary.textContent = getSummaryLine(roundedScore);

  renderLeaderboards();
}

function getRatingLine(points) {
  if (points <= 350) {
    return "Crate Digger in Training";
  }

  if (points <= 900) {
    return "Weekend Flip Specialist";
  }

  return "Market Wizard";
}

function getSummaryLine(points) {
  if (points <= 350) {
    return "You survived both rounds. Next run, trust your gut on borderline prices.";
  }

  if (points <= 900) {
    return "Great pace and sharp calls. You found strong flips across both spots.";
  }

  return "Outstanding two-round run. You read the market like a veteran flipper.";
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

  const best = leaderboard.sort((a, b) => b.score - a.score).slice(0, LEADERBOARD_LIMIT);
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
  resetGameState();
  renderScreen(SCREEN.HOME);
  renderLeaderboards();
}

function resetGameState() {
  rounds = [];
  currentRoundIndex = 0;
  pendingAnnouncementRoundIndex = 0;
  currentCard = 0;
  totalCardIndex = 0;
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

function setupHomeHeroFallback() {
  homeHeroImage.onload = () => {
    homeHeroFallback.classList.add("hidden");
  };

  homeHeroImage.onerror = () => {
    homeHeroFallback.classList.remove("hidden");
  };
}

startBtn.addEventListener("click", startNewGame);
startRoundBtn.addEventListener("click", beginAnnouncedRound);
yesBtn.addEventListener("click", () => handleAnswer("Yes"));
noBtn.addEventListener("click", () => handleAnswer("No"));
playAgainBtn.addEventListener("click", resetGame);
clearLeaderboardBtn.addEventListener("click", clearLeaderboard);
continueRoundBtn.addEventListener("click", continueAfterInterstitial);

setupHomeHeroFallback();
renderScreen(SCREEN.HOME);
renderLeaderboards();
