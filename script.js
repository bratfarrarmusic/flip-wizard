const ROUND_SECONDS = 10;
const NEXT_CARD_DELAY_MS = 460;
const FEEDBACK_HIDE_DELAY_MS = 650;
const LEADERBOARD_KEY = "flipWizardLeaderboardV3";
const LEADERBOARD_LIMIT = 5;
const CARDS_PER_ROUND = 10;
const GENERIC_RECORD_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%232f4858'/%3E%3Cstop offset='100%25' stop-color='%2333658a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='600' fill='url(%23g)'/%3E%3Ccircle cx='300' cy='300' r='180' fill='none' stroke='rgba(255,255,255,0.38)' stroke-width='8'/%3E%3Ccircle cx='300' cy='300' r='28' fill='rgba(255,255,255,0.55)'/%3E%3C/svg%3E";
const TARGET_PROFIT = 20;

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
    announcementText: "Records are graded using Goldmine Record/Sleeve condition.\nCondition affects value and is built into the pricing.\nCan you flip them and make at least $20 profit?\n3–2–1 GO!",
    cardCount: CARDS_PER_ROUND,
    difficultyBand: "easy",
  },
  {
    key: "sunday-market",
    title: "Round Two: Sunday Market",
    eyebrow: "Round Two",
    announcementText: "Fresh crates, mixed sellers, more price chaos.\nCondition still matters.\nCan you still spot the records with at least a $20 margin?\n3–2–1 GO!",
    cardCount: CARDS_PER_ROUND,
    difficultyBand: "mixed",
  },
  {
    key: "garage-sale",
    title: "Round Three: Garage Sale",
    eyebrow: "Round Three",
    announcementText: "Loose prices, mixed quality, occasional sleepers.\nTrust your eye.\nCan you find the records with at least a $20 profit in them?\n3–2–1 GO!",
    cardCount: CARDS_PER_ROUND,
    difficultyBand: "swing",
  },
  {
    key: "record-fair",
    title: "Round Four: Record Fair",
    eyebrow: "Round Four",
    announcementText: "Sharper sellers. Tougher buys.\nMargins get thinner and the pressure goes up.\nCan you still pick the records with $20+ profit?\n3–2–1 GO!",
    cardCount: CARDS_PER_ROUND,
    difficultyBand: "hard",
  },
  {
    key: "late-night-marketplace",
    title: "Round Five: Late-Night Marketplace",
    eyebrow: "Round Five",
    announcementText: "Fast listings. Risky grades. Last-minute chances.\nOne final round to prove you are a Flip Wizard.\nCan you spot the $20+ flips before time runs out?\n3–2–1 GO!",
    cardCount: CARDS_PER_ROUND,
    difficultyBand: "expert",
  },
];

const BASE_RECORD_POOL = [
  ["Nirvana", "In Utero", 55], ["The Beatles", "Abbey Road", 72], ["David Bowie", "Heroes", 47], ["Fleetwood Mac", "Rumours", 48], ["Pink Floyd", "The Wall", 62],
  ["Radiohead", "OK Computer", 59], ["Queen", "Greatest Hits", 54], ["Joy Division", "Unknown Pleasures", 57], ["Bob Dylan", "Highway 61 Revisited", 52], ["Eagles", "Hotel California", 49],
  ["The Rolling Stones", "Sticky Fingers", 58], ["Michael Jackson", "Thriller", 51], ["Bruce Springsteen", "Born to Run", 53], ["Talking Heads", "Remain in Light", 56], ["The Clash", "London Calling", 61],
  ["Prince", "Purple Rain", 50], ["Lou Reed", "Transformer", 46], ["Patti Smith", "Horses", 54], ["AC/DC", "Back in Black", 47], ["Led Zeppelin", "IV", 58],
  ["Neil Young", "Harvest", 49], ["U2", "The Joshua Tree", 53], ["The Cure", "Disintegration", 57], ["Marvin Gaye", "What's Going On", 52], ["Sade", "Diamond Life", 44],
  ["Stevie Wonder", "Innervisions", 55], ["The Smiths", "The Queen Is Dead", 63], ["Pixies", "Doolittle", 58], ["Metallica", "Ride the Lightning", 66], ["Daft Punk", "Discovery", 70],
  ["OutKast", "Aquemini", 60], ["Kendrick Lamar", "good kid, m.A.A.d city", 64], ["Amy Winehouse", "Back to Black", 48], ["Massive Attack", "Mezzanine", 57], ["Portishead", "Dummy", 56],
  ["The Strokes", "Is This It", 62], ["Arctic Monkeys", "AM", 50], ["Tame Impala", "Currents", 54], ["Kate Bush", "Hounds of Love", 61], ["Sonic Youth", "Daydream Nation", 59],
  ["The Police", "Synchronicity", 45], ["R.E.M.", "Automatic for the People", 52], ["A Tribe Called Quest", "The Low End Theory", 63], ["Nas", "Illmatic", 68], ["Erykah Badu", "Baduizm", 55],
  ["D'Angelo", "Voodoo", 60], ["The National", "Boxer", 51], ["The xx", "xx", 46], ["Björk", "Post", 58], ["Beastie Boys", "Paul's Boutique", 62],
  ["The Doors", "L.A. Woman", 52], ["Joni Mitchell", "Blue", 56], ["The Velvet Underground", "Loaded", 57], ["Can", "Ege Bamyasi", 65], ["Aphex Twin", "Selected Ambient Works 85-92", 66],
  ["The War on Drugs", "Lost in the Dream", 49], ["LCD Soundsystem", "Sound of Silver", 58], ["The Weeknd", "After Hours", 45], ["Frank Ocean", "Channel Orange", 67], ["Fiona Apple", "When the Pawn...", 60],
  ["The Kinks", "Lola Versus Powerman", 51], ["Madvillain", "Madvillainy", 70], ["Interpol", "Turn on the Bright Lights", 56], ["My Bloody Valentine", "Loveless", 72], ["The Cranberries", "No Need to Argue", 47],
];

const roundDifficultyProfiles = {
  easy: { buyLow: 0.34, buyHigh: 0.74, gradeWeights: [0.12, 0.34, 0.36, 0.18] },
  mixed: { buyLow: 0.42, buyHigh: 0.84, gradeWeights: [0.18, 0.35, 0.31, 0.16] },
  swing: { buyLow: 0.4, buyHigh: 0.95, gradeWeights: [0.22, 0.34, 0.3, 0.14] },
  hard: { buyLow: 0.55, buyHigh: 1.02, gradeWeights: [0.2, 0.38, 0.29, 0.13] },
  expert: { buyLow: 0.62, buyHigh: 1.08, gradeWeights: [0.24, 0.39, 0.26, 0.11] },
};

const gradeMultipliers = {
  record: { "G+": 0.55, VG: 0.72, "VG+": 0.88, EX: 0.97 },
  sleeve: { "G+": 0.9, VG: 0.96, "VG+": 1, EX: 1.04 },
};

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
const speedScoreText = document.getElementById("speedScore");
const profitScoreText = document.getElementById("profitScore");
const streakText = document.getElementById("streak");
const timerText = document.getElementById("timer");
const artistText = document.getElementById("artist");
const titleText = document.getElementById("title");
const gradeLineText = document.getElementById("gradeLine");
const buyPriceText = document.getElementById("buyPrice");
const coverImage = document.getElementById("coverImage");
const coverFallback = document.getElementById("coverFallback");
const albumTile = document.getElementById("albumTile");
const tileArtist = document.getElementById("tileArtist");
const tileTitle = document.getElementById("tileTitle");
const scoreFeedback = document.getElementById("scoreFeedback");

const finalPlayer = document.getElementById("finalPlayer");
const finalSpeed = document.getElementById("finalSpeed");
const finalProfit = document.getElementById("finalProfit");
const finalScore = document.getElementById("finalScore");
const rating = document.getElementById("rating");
const summary = document.getElementById("summary");

const introLeaderboard = document.getElementById("introLeaderboard");
const resultLeaderboard = document.getElementById("resultLeaderboard");

const interstitialEyebrow = document.getElementById("interstitialEyebrow");
const roundSummaryLine = document.getElementById("roundSummaryLine");
const homeHeroImage = document.getElementById("homeHeroImage");
const homeHeroFallback = document.getElementById("homeHeroFallback");

let currentScreen = SCREEN.HOME;
let playerName = "Anonymous";
let rounds = [];
let currentRoundIndex = 0;
let pendingAnnouncementRoundIndex = 0;
let currentCard = 0;
let totalCardIndex = 0;
let speedScore = 0;
let profitScore = 0;
let streak = 0;
let answerLocked = false;
let timeRemaining = ROUND_SECONDS;
let cardStartedAt = 0;
let timerInterval = null;
let pendingTransitionTimeout = null;
let pendingFeedbackTimeout = null;

function renderScreen(screen) {
  currentScreen = screen;
  introSection.classList.toggle("hidden", screen !== SCREEN.HOME);
  roundAnnouncementSection.classList.toggle("hidden", screen !== SCREEN.ROUND_ANNOUNCEMENT);
  gameSection.classList.toggle("hidden", screen !== SCREEN.GAMEPLAY);
  betweenRoundInterstitial.classList.toggle("hidden", screen !== SCREEN.BETWEEN_ROUND_AD);
  resultSection.classList.toggle("hidden", screen !== SCREEN.END);
}

function startingNewGame() {
  resetGameState();
  playerName = getPlayerName();
  rounds = prepareAllRounds();
  showRoundAnnouncement(0);
}

function prepareAllRounds() {
  const usedIds = new Set();
  return ROUND_CONFIG.map((round) => {
    const selected = selectingRandomCards(round, usedIds);
    return { ...round, cards: selected };
  });
}

function selectingRandomCards(round, usedIds) {
  const source = BASE_RECORD_POOL.map((record, idx) => ({
    id: `${record[0]}__${record[1]}`,
    artist: record[0],
    title: record[1],
    imageSrc: GENERIC_RECORD_IMAGE,
    imageLabel: `${record[0]}\n${record[1]}`,
    baseReferenceValue: record[2],
    eligibleRounds: ROUND_CONFIG.map((entry) => entry.key),
    difficultyBand: ROUND_CONFIG[Math.min(idx % ROUND_CONFIG.length, ROUND_CONFIG.length - 1)].difficultyBand,
  })).filter((record) => !usedIds.has(record.id));

  const sorted = source.sort((a, b) => Math.abs(a.baseReferenceValue - targetReference(round.difficultyBand)) - Math.abs(b.baseReferenceValue - targetReference(round.difficultyBand)));
  const pool = shuffled(sorted.slice(0, 24));
  const chosen = pool.slice(0, round.cardCount).map((card) => buildRuntimeCard(card, round));
  chosen.forEach((card) => usedIds.add(card.id));
  return chosen;
}

function targetReference(difficultyBand) {
  return { easy: 48, mixed: 54, swing: 58, hard: 60, expert: 63 }[difficultyBand] || 55;
}

function shuffled(arr) {
  const clone = [...arr];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function assigningGrades(profile) {
  const grades = ["G+", "VG", "VG+", "EX"];
  const pick = () => {
    const r = Math.random();
    let cumulative = 0;
    for (let i = 0; i < grades.length; i += 1) {
      cumulative += profile.gradeWeights[i];
      if (r <= cumulative) {
        return grades[i];
      }
    }
    return "VG";
  };
  return { recordGrade: pick(), sleeveGrade: pick() };
}

function generatingBuyPrice(baseReferenceValue, profile) {
  const low = Math.round(baseReferenceValue * profile.buyLow);
  const high = Math.round(baseReferenceValue * profile.buyHigh);
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function calculatingHiddenSalePrice(baseReferenceValue, recordGrade, sleeveGrade, roundBand) {
  const gradeFactor = gradeMultipliers.record[recordGrade] * gradeMultipliers.sleeve[sleeveGrade];
  const roundVariance = { easy: 1.03, mixed: 1, swing: 0.99, hard: 0.97, expert: 0.95 }[roundBand] || 1;
  return Math.max(10, Math.round(baseReferenceValue * gradeFactor * roundVariance));
}

function calculatingHiddenProfit(hiddenSalePrice, displayedBuyPrice) {
  return hiddenSalePrice - displayedBuyPrice;
}

function determiningCorrectAnswer(hiddenProfit) {
  return hiddenProfit >= TARGET_PROFIT ? "Yes" : "No";
}

function buildRuntimeCard(card, round) {
  const profile = roundDifficultyProfiles[round.difficultyBand];
  const { recordGrade, sleeveGrade } = assigningGrades(profile);
  const displayedBuyPrice = generatingBuyPrice(card.baseReferenceValue, profile);
  const hiddenSalePrice = calculatingHiddenSalePrice(card.baseReferenceValue, recordGrade, sleeveGrade, round.difficultyBand);
  const hiddenProfit = calculatingHiddenProfit(hiddenSalePrice, displayedBuyPrice);
  const correctAnswer = determiningCorrectAnswer(hiddenProfit);

  return {
    ...card,
    recordGrade,
    sleeveGrade,
    displayedBuyPrice,
    hiddenSalePrice,
    hiddenProfit,
    correctAnswer,
  };
}

function showRoundAnnouncement(roundIndex) {
  pendingAnnouncementRoundIndex = roundIndex;
  const round = ROUND_CONFIG[roundIndex];
  announcementEyebrow.textContent = round.eyebrow;
  announcementTitle.textContent = round.title;
  announcementBody.textContent = round.announcementText;
  renderScreen(SCREEN.ROUND_ANNOUNCEMENT);
}

function beginAnnouncedRound() {
  startRound(pendingAnnouncementRoundIndex);
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
  const card = round.cards[currentCard];
  if (!card) {
    advancingRounds();
    return;
  }

  const [artistLabel, titleLabel] = card.imageLabel.split("\n");
  roundLabel.textContent = round.title;
  cardCount.textContent = `Card ${currentCard + 1}/${round.cards.length}`;
  totalProgress.textContent = `Total ${totalCardIndex + 1}/${ROUND_CONFIG.length * CARDS_PER_ROUND}`;
  timerText.textContent = `Timer ${ROUND_SECONDS.toFixed(1)}s`;
  streakText.textContent = `Streak x${streak}`;
  speedScoreText.textContent = `Speed ${Math.round(speedScore)}`;
  profitScoreText.textContent = `Profit ${Math.round(profitScore)}`;
  scoreText.textContent = `Total ${Math.round(speedScore + profitScore)}`;

  artistText.textContent = card.artist;
  titleText.textContent = card.title;
  gradeLineText.textContent = `${card.recordGrade}/${card.sleeveGrade}`;
  buyPriceText.textContent = `$${card.displayedBuyPrice}`;
  tileArtist.textContent = artistLabel || card.artist;
  tileTitle.textContent = titleLabel || card.title;

  setCoverImage(card);
  answerLocked = false;
  yesBtn.disabled = false;
  noBtn.disabled = false;
  startCountdown();
}

function setCoverImage(card) {
  coverImage.src = "";
  coverImage.alt = `${card.artist} — ${card.title} cover`;
  coverFallback.classList.remove("hidden");
  albumTile.setAttribute("aria-label", `${card.artist} ${card.title} cover`);
  coverImage.onload = () => coverFallback.classList.add("hidden");
  coverImage.onerror = () => coverFallback.classList.remove("hidden");
  coverImage.src = card.imageSrc;
}

function startCountdown() {
  stopCountdown();
  timeRemaining = ROUND_SECONDS;
  cardStartedAt = performance.now();
  updateTimerDisplay();
  timerInterval = window.setInterval(() => {
    const elapsed = (performance.now() - cardStartedAt) / 1000;
    timeRemaining = Math.max(0, ROUND_SECONDS - elapsed);
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
  timerText.textContent = `Timer ${timeRemaining.toFixed(1)}s`;
}

function awardingSpeedScore(timeLeft, activeStreak) {
  const base = 75;
  const timerBonus = Math.round(timeLeft * 18);
  const streakBonus = activeStreak >= 2 ? activeStreak * 14 : 0;
  return base + timerBonus + streakBonus;
}

function awardingProfitScore(card, answer) {
  if (answer === "Yes") {
    return Math.max(0, card.hiddenProfit);
  }
  return card.hiddenProfit < 0 ? Math.min(24, Math.abs(card.hiddenProfit)) : 10;
}

function renderingFastScoreFeedback(speedGain, profitGain, activeStreak, wasCorrect, timedOut = false) {
  if (pendingFeedbackTimeout) {
    clearTimeout(pendingFeedbackTimeout);
  }

  if (timedOut) {
    scoreFeedback.textContent = "Time up. No score this card.";
  } else if (!wasCorrect) {
    scoreFeedback.textContent = "Missed call. Streak reset.";
  } else {
    scoreFeedback.textContent = `+${speedGain} Speed • +${profitGain} Profit • Streak x${activeStreak}`;
  }

  scoreFeedback.classList.remove("hidden");
  pendingFeedbackTimeout = window.setTimeout(() => {
    scoreFeedback.classList.add("hidden");
  }, FEEDBACK_HIDE_DELAY_MS);
}

function handleAnswer(playerAnswer) {
  if (answerLocked) {
    return;
  }

  answerLocked = true;
  yesBtn.disabled = true;
  noBtn.disabled = true;
  stopCountdown();

  const card = getCurrentRound().cards[currentCard];
  const isCorrect = playerAnswer === card.correctAnswer;

  if (isCorrect) {
    streak += 1;
    const speedGain = awardingSpeedScore(timeRemaining, streak);
    const profitGain = awardingProfitScore(card, playerAnswer);
    speedScore += speedGain;
    profitScore += profitGain;
    renderingFastScoreFeedback(speedGain, profitGain, streak, true);
  } else {
    streak = 0;
    renderingFastScoreFeedback(0, 0, streak, false);
  }

  renderScoreStrip();
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
  renderScoreStrip();
  renderingFastScoreFeedback(0, 0, streak, false, true);
  pendingTransitionTimeout = window.setTimeout(moveToNextCard, NEXT_CARD_DELAY_MS);
}

function renderScoreStrip() {
  streakText.textContent = `Streak x${streak}`;
  speedScoreText.textContent = `Speed ${Math.round(speedScore)}`;
  profitScoreText.textContent = `Profit ${Math.round(profitScore)}`;
  scoreText.textContent = `Total ${Math.round(speedScore + profitScore)}`;
}

function moveToNextCard() {
  totalCardIndex += 1;
  currentCard += 1;
  if (currentCard >= getCurrentRound().cards.length) {
    advancingRounds();
    return;
  }
  renderCurrentCard();
}

function showingBetweenRoundAds(round) {
  interstitialEyebrow.textContent = `${round.title} complete`;
  roundSummaryLine.textContent = `Speed ${Math.round(speedScore)} • Profit ${Math.round(profitScore)} • Total ${Math.round(speedScore + profitScore)}`;
  renderScreen(SCREEN.BETWEEN_ROUND_AD);
}

function advancingRounds() {
  stopCountdown();
  const isFinalRound = currentRoundIndex >= ROUND_CONFIG.length - 1;
  if (isFinalRound) {
    endingGame();
    return;
  }
  showingBetweenRoundAds(ROUND_CONFIG[currentRoundIndex]);
}

function continueAfterInterstitial() {
  showRoundAnnouncement(currentRoundIndex + 1);
}

function endingGame() {
  stopCountdown();
  const totalScore = Math.round(speedScore + profitScore);
  saveLeaderboard({ name: playerName, score: totalScore, speedScore: Math.round(speedScore), profitScore: Math.round(profitScore), date: Date.now() });

  finalPlayer.textContent = `Player: ${playerName}`;
  finalSpeed.textContent = `Speed Score: ${Math.round(speedScore)}`;
  finalProfit.textContent = `Profit Score: ${Math.round(profitScore)}`;
  finalScore.textContent = `Total Score: ${totalScore}`;
  rating.textContent = finalRatingTitle(totalScore);
  summary.textContent = finalFlavorLine(totalScore, Math.round(profitScore));

  renderLeaderboards();
  renderScreen(SCREEN.END);
}

function finalRatingTitle(total) {
  if (total < 1500) return "Crate Scout";
  if (total < 2600) return "Margin Hunter";
  if (total < 3600) return "Flip Commander";
  return "Flip Wizard Supreme";
}

function finalFlavorLine(total, profit) {
  if (total < 1500) return `You cleared $${profit} in flips. Keep sharpening your reads.`;
  if (total < 2600) return `Fast hands. Sharp margins. You cleared $${profit}.`;
  if (total < 3600) return `You spotted the money others missed and banked $${profit}.`;
  return `Five rounds conquered. You stacked $${profit} and ruled the market.`;
}

function saveLeaderboard(entry) {
  const leaderboard = readLeaderboard();
  leaderboard.push(entry);
  const best = leaderboard.sort((a, b) => b.score - a.score).slice(0, LEADERBOARD_LIMIT);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(best));
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

function renderLeaderboardList(target, entries) {
  target.innerHTML = "";
  if (!entries.length) {
    const li = document.createElement("li");
    li.textContent = "No scores yet. Set the pace.";
    target.appendChild(li);
    return;
  }

  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} — ${entry.score}`;
    target.appendChild(li);
  });
}

function renderLeaderboards() {
  const board = readLeaderboard();
  renderLeaderboardList(introLeaderboard, board);
  renderLeaderboardList(resultLeaderboard, board);
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
  speedScore = 0;
  profitScore = 0;
  streak = 0;
  answerLocked = false;
  timeRemaining = ROUND_SECONDS;
  renderScoreStrip();
  timerText.textContent = `Timer ${ROUND_SECONDS.toFixed(1)}s`;
  scoreFeedback.classList.add("hidden");
}

function clearPendingTransition() {
  if (pendingTransitionTimeout) {
    clearTimeout(pendingTransitionTimeout);
    pendingTransitionTimeout = null;
  }
}

function getPlayerName() {
  return playerNameInput.value.trim() || "Anonymous";
}

function setupHomeHeroFallback() {
  homeHeroImage.onload = () => homeHeroFallback.classList.add("hidden");
  homeHeroImage.onerror = () => homeHeroFallback.classList.remove("hidden");
}

startBtn.addEventListener("click", startingNewGame);
startRoundBtn.addEventListener("click", beginAnnouncedRound);
yesBtn.addEventListener("click", () => handleAnswer("Yes"));
noBtn.addEventListener("click", () => handleAnswer("No"));
playAgainBtn.addEventListener("click", resetGame);
clearLeaderboardBtn.addEventListener("click", clearLeaderboard);
continueRoundBtn.addEventListener("click", continueAfterInterstitial);

setupHomeHeroFallback();
renderScreen(SCREEN.HOME);
resetGameState();
renderLeaderboards();
