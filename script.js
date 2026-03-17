const ROUND_SECONDS = 9;
const NEXT_CARD_DELAY_MS = 350;
const LEADERBOARD_KEY = "flipWizardLeaderboardV4";
const LEADERBOARD_LIMIT = 8;
const CARDS_PER_ROUND = 8;
const TARGET_PROFIT = 20;
const GENERIC_RECORD_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%232f4858'/%3E%3Cstop offset='100%25' stop-color='%2333658a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='600' fill='url(%23g)'/%3E%3Ccircle cx='300' cy='300' r='180' fill='none' stroke='rgba(255,255,255,0.36)' stroke-width='8'/%3E%3Ccircle cx='300' cy='300' r='28' fill='rgba(255,255,255,0.55)'/%3E%3C/svg%3E";

const SCREEN = {
  HOME: "home",
  ROUND_ANNOUNCEMENT: "round_announcement",
  GAMEPLAY: "gameplay",
  BETWEEN_ROUND_AD: "between_round_ad",
  END: "end",
};

const ROUND_CONFIG = [
  {
    key: "round-one-op-shop",
    title: "Round One Op Shop",
    eyebrow: "Round One",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 0.94,
    variance: 0.13,
    gradeWeights: [0.17, 0.34, 0.31, 0.18],
    announcementText: "Goldmine Record/Sleeve grading drives value.\nCondition changes what the market will really pay.\nYour call: flip only if you can clear at least $20 profit.",
  },
  {
    key: "round-two-sunday-market",
    title: "Round Two Sunday Market",
    eyebrow: "Round Two",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.0,
    variance: 0.14,
    gradeWeights: [0.2, 0.35, 0.29, 0.16],
    announcementText: "Mixed crates, mixed sellers, mixed pricing.\nThe obvious calls get rarer. Stay sharp.",
  },
  {
    key: "round-three-garage-sale",
    title: "Round Three Garage Sale",
    eyebrow: "Round Three",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.05,
    variance: 0.15,
    gradeWeights: [0.22, 0.36, 0.27, 0.15],
    announcementText: "Loose grading meets opportunistic sellers.\nSome gems, plenty of traps.",
  },
  {
    key: "round-four-antique-shop",
    title: "Round Four Antique Shop",
    eyebrow: "Round Four",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.1,
    variance: 0.11,
    gradeWeights: [0.24, 0.37, 0.25, 0.14],
    announcementText: "Sticker shock and thinner margins.\nDefensive NO calls can save your run.",
  },
  {
    key: "round-five-record-fair",
    title: "Round Five Record Fair",
    eyebrow: "Round Five",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.16,
    variance: 0.1,
    gradeWeights: [0.24, 0.39, 0.24, 0.13],
    announcementText: "Final round. Fast calls. Tight margins.\nPick the true $20+ flips only.",
  },
];

const MARKET_CONFIG = {
  au: { label: "eBay Australia", saleMultiplier: 1.08, buyMultiplier: 1.19, roundBuyPressure: 0.03 },
  us: { label: "eBay US", saleMultiplier: 0.99, buyMultiplier: 0.94, roundBuyPressure: -0.01 },
  uk: { label: "eBay UK", saleMultiplier: 1.01, buyMultiplier: 0.99, roundBuyPressure: 0 },
  eu: { label: "Germany / EU", saleMultiplier: 1.06, buyMultiplier: 1.04, roundBuyPressure: 0.01 },
};

const gradeMultipliers = {
  record: { "G+": 0.58, VG: 0.73, "VG+": 0.88, EX: 1 },
  sleeve: { "G+": 0.9, VG: 0.95, "VG+": 1, EX: 1.04 },
};

const BASE_RECORD_POOL = [
  ["Nirvana", "In Utero", 79], ["The Beatles", "Abbey Road", 98], ["David Bowie", "Heroes", 71], ["Fleetwood Mac", "Rumours", 70], ["Pink Floyd", "The Wall", 92],
  ["Radiohead", "OK Computer", 87], ["Queen", "Greatest Hits", 73], ["Joy Division", "Unknown Pleasures", 81], ["Bob Dylan", "Highway 61 Revisited", 75], ["Eagles", "Hotel California", 72],
  ["The Rolling Stones", "Sticky Fingers", 84], ["Michael Jackson", "Thriller", 69], ["Bruce Springsteen", "Born to Run", 77], ["Talking Heads", "Remain in Light", 83], ["The Clash", "London Calling", 88],
  ["Prince", "Purple Rain", 72], ["Lou Reed", "Transformer", 69], ["Patti Smith", "Horses", 81], ["AC/DC", "Back in Black", 71], ["Led Zeppelin", "IV", 85],
  ["Neil Young", "Harvest", 72], ["U2", "The Joshua Tree", 78], ["The Cure", "Disintegration", 86], ["Marvin Gaye", "What's Going On", 80], ["Sade", "Diamond Life", 66],
  ["Stevie Wonder", "Innervisions", 82], ["The Smiths", "The Queen Is Dead", 92], ["Pixies", "Doolittle", 86], ["Metallica", "Ride the Lightning", 98], ["Daft Punk", "Discovery", 103],
  ["OutKast", "Aquemini", 89], ["Kendrick Lamar", "good kid, m.A.A.d city", 95], ["Amy Winehouse", "Back to Black", 72], ["Massive Attack", "Mezzanine", 86], ["Portishead", "Dummy", 84],
  ["The Strokes", "Is This It", 90], ["Arctic Monkeys", "AM", 73], ["Tame Impala", "Currents", 76], ["Kate Bush", "Hounds of Love", 94], ["Sonic Youth", "Daydream Nation", 90],
  ["The Police", "Synchronicity", 67], ["R.E.M.", "Automatic for the People", 76], ["A Tribe Called Quest", "The Low End Theory", 95], ["Nas", "Illmatic", 102], ["Erykah Badu", "Baduizm", 81],
  ["D'Angelo", "Voodoo", 90], ["The National", "Boxer", 73], ["The xx", "xx", 66], ["Björk", "Post", 86], ["Beastie Boys", "Paul's Boutique", 91],
  ["The Doors", "L.A. Woman", 76], ["Joni Mitchell", "Blue", 83], ["The Velvet Underground", "Loaded", 84], ["Can", "Ege Bamyasi", 101], ["Aphex Twin", "Selected Ambient Works 85-92", 100],
  ["The War on Drugs", "Lost in the Dream", 72], ["LCD Soundsystem", "Sound of Silver", 85], ["The Weeknd", "After Hours", 67], ["Frank Ocean", "Channel Orange", 102], ["Fiona Apple", "When the Pawn...", 90],
  ["The Kinks", "Lola Versus Powerman", 75], ["Madvillain", "Madvillainy", 104], ["Interpol", "Turn on the Bright Lights", 83], ["My Bloody Valentine", "Loveless", 106], ["The Cranberries", "No Need to Argue", 69],
];

const introSection = document.getElementById("intro");
const roundAnnouncementSection = document.getElementById("roundAnnouncement");
const gameSection = document.getElementById("game");
const resultSection = document.getElementById("result");
const interstitialSection = document.getElementById("betweenRoundInterstitial");

const playerNameInput = document.getElementById("playerName");
const marketSelect = document.getElementById("marketSelect");
const startBtn = document.getElementById("startBtn");
const startRoundBtn = document.getElementById("startRoundBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const continueRoundBtn = document.getElementById("continueRoundBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");

const announcementEyebrow = document.getElementById("announcementEyebrow");
const announcementTitle = document.getElementById("announcementTitle");
const announcementBody = document.getElementById("announcementBody");
const interstitialEyebrow = document.getElementById("interstitialEyebrow");
const roundSummaryLine = document.getElementById("roundSummaryLine");

const artistText = document.getElementById("artist");
const titleText = document.getElementById("title");
const gradeLineText = document.getElementById("gradeLine");
const buyPriceText = document.getElementById("buyPrice");
const roundLabel = document.getElementById("roundLabel");
const cardCount = document.getElementById("cardCount");
const coverImage = document.getElementById("coverImage");
const coverFallback = document.getElementById("coverFallback");
const tileArtist = document.getElementById("tileArtist");
const tileTitle = document.getElementById("tileTitle");

const finalPlayer = document.getElementById("finalPlayer");
const finalMarket = document.getElementById("finalMarket");
const finalScore = document.getElementById("finalScore");
const finalProfit = document.getElementById("finalProfit");
const rating = document.getElementById("rating");
const summary = document.getElementById("summary");
const introLeaderboard = document.getElementById("introLeaderboard");
const resultLeaderboard = document.getElementById("resultLeaderboard");

const homeHeroImage = document.getElementById("homeHeroImage");
const homeHeroFallback = document.getElementById("homeHeroFallback");

let rounds = [];
let selectedMarket = "au";
let currentRoundIndex = 0;
let pendingAnnouncementRoundIndex = 0;
let currentCard = 0;
let answerLocked = false;
let timerInterval = null;
let cardStartedAt = 0;
let timeRemaining = ROUND_SECONDS;
let pendingTransitionTimeout = null;
let playerName = "Anonymous";
let score = 0;
let totalProfit = 0;
let streak = 0;

function renderScreen(screen) {
  introSection.classList.toggle("hidden", screen !== SCREEN.HOME);
  roundAnnouncementSection.classList.toggle("hidden", screen !== SCREEN.ROUND_ANNOUNCEMENT);
  gameSection.classList.toggle("hidden", screen !== SCREEN.GAMEPLAY);
  resultSection.classList.toggle("hidden", screen !== SCREEN.END);
  interstitialSection.classList.toggle("hidden", screen !== SCREEN.BETWEEN_ROUND_AD);
}

function getPlayerName() {
  return playerNameInput.value.trim() || "Anonymous";
}

function selectingMarket() {
  selectedMarket = marketSelect.value in MARKET_CONFIG ? marketSelect.value : "au";
}

function startingNewGame() {
  selectingMarket();
  playerName = getPlayerName();
  resetRunState();
  prepareRounds();
  showRoundAnnouncement(0);
}

function prepareRounds() {
  const usedIds = new Set();
  rounds = ROUND_CONFIG.map((round) => ({
    ...round,
    cards: generatingCardsForRound(round, usedIds),
    roundProfit: 0,
  }));
}

function generatingCardsForRound(round, usedIds) {
  const source = BASE_RECORD_POOL.map((record) => ({
    id: `${record[0]}__${record[1]}`,
    artist: record[0],
    title: record[1],
    imageSrc: GENERIC_RECORD_IMAGE,
    imageLabel: `${record[0]}\n${record[1]}`,
    eligibleRounds: ROUND_CONFIG.map((entry) => entry.key),
    baseMedianValue: record[2],
    marketAdjustments: MARKET_CONFIG,
  })).filter((record) => !usedIds.has(record.id));

  const chosen = shuffled(source).slice(0, round.cardCount).map((card) => buildRuntimeCard(card, round));
  chosen.forEach((card) => usedIds.add(card.id));
  return chosen;
}

function assigningGrades(round) {
  const grades = ["G+", "VG", "VG+", "EX"];
  const pick = () => {
    const roll = Math.random();
    let sum = 0;
    for (let i = 0; i < grades.length; i += 1) {
      sum += round.gradeWeights[i];
      if (roll <= sum) return grades[i];
    }
    return "VG";
  };
  return { recordGrade: pick(), sleeveGrade: pick() };
}

function calculatingMarketAdjustedLikelySaleValue(baseMedianValue, marketKey, recordGrade, sleeveGrade) {
  const market = MARKET_CONFIG[marketKey];
  const gradeFactor = gradeMultipliers.record[recordGrade] * gradeMultipliers.sleeve[sleeveGrade];
  const drift = 0.94 + Math.random() * 0.15;
  return Math.max(16, Math.round(baseMedianValue * market.saleMultiplier * gradeFactor * drift));
}

function generatingDisplayedBuyPrice(hiddenLikelySalePrice, round, marketKey) {
  const market = MARKET_CONFIG[marketKey];
  const spread = round.variance;
  const under = hiddenLikelySalePrice * (0.56 - spread);
  const over = hiddenLikelySalePrice * (1.13 + spread);
  const floor = Math.max(8, Math.round(under * market.buyMultiplier * round.pricePressure));
  const ceiling = Math.max(floor + 6, Math.round(over * market.buyMultiplier * (round.pricePressure + market.roundBuyPressure)));
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function computingHiddenProfit(hiddenLikelySalePrice, displayedBuyPrice) {
  return hiddenLikelySalePrice - displayedBuyPrice;
}

function determiningCorrectAnswer(hiddenProfit) {
  return hiddenProfit >= TARGET_PROFIT ? "Yes" : "No";
}

function buildRuntimeCard(card, round) {
  const { recordGrade, sleeveGrade } = assigningGrades(round);
  const hiddenLikelySalePrice = calculatingMarketAdjustedLikelySaleValue(card.baseMedianValue, selectedMarket, recordGrade, sleeveGrade);
  const displayedBuyPrice = generatingDisplayedBuyPrice(hiddenLikelySalePrice, round, selectedMarket);
  const hiddenProfit = computingHiddenProfit(hiddenLikelySalePrice, displayedBuyPrice);
  const correctAnswer = determiningCorrectAnswer(hiddenProfit);

  return {
    ...card,
    recordGrade,
    sleeveGrade,
    displayedBuyPrice,
    hiddenLikelySalePrice,
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

function renderingStrippedBackCardView(card) {
  const [artistLabel, titleLabel] = card.imageLabel.split("\n");
  artistText.textContent = card.artist;
  titleText.textContent = card.title;
  gradeLineText.textContent = `${card.recordGrade}/${card.sleeveGrade}`;
  buyPriceText.textContent = `Buy Price: $${card.displayedBuyPrice}`;
  tileArtist.textContent = artistLabel || card.artist;
  tileTitle.textContent = titleLabel || card.title;
  roundLabel.textContent = getCurrentRound().title;
  cardCount.textContent = `${currentCard + 1}/${getCurrentRound().cards.length}`;
  setCoverImage(card);
}

function renderCurrentCard() {
  const round = getCurrentRound();
  const card = round.cards[currentCard];
  if (!card) {
    advancingRounds();
    return;
  }

  answerLocked = false;
  yesBtn.disabled = false;
  noBtn.disabled = false;
  renderingStrippedBackCardView(card);
  startCountdown();
}

function setCoverImage(card) {
  coverImage.src = "";
  coverImage.alt = `${card.artist} — ${card.title} cover`;
  coverFallback.classList.remove("hidden");
  coverImage.onload = () => coverFallback.classList.add("hidden");
  coverImage.onerror = () => coverFallback.classList.remove("hidden");
  coverImage.src = card.imageSrc;
}

function startCountdown() {
  stopCountdown();
  timeRemaining = ROUND_SECONDS;
  cardStartedAt = performance.now();
  timerInterval = window.setInterval(() => {
    const elapsed = (performance.now() - cardStartedAt) / 1000;
    timeRemaining = Math.max(0, ROUND_SECONDS - elapsed);
    if (timeRemaining <= 0) {
      stopCountdown();
      handleTimeout();
    }
  }, 80);
}

function stopCountdown() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function computingScore(card, playerAnswer) {
  const profitable = card.hiddenProfit >= TARGET_PROFIT;
  const speedBonus = Math.round(timeRemaining * 10);

  if (playerAnswer === "Yes") {
    if (profitable) {
      streak += 1;
      return 120 + speedBonus + (streak >= 2 ? streak * 8 : 0);
    }
    streak = 0;
    return card.hiddenProfit < 0 ? -60 : -25;
  }

  if (!profitable) {
    streak += 1;
    return 85 + (card.hiddenProfit < 0 ? 18 : 0) + (streak >= 3 ? 10 : 0);
  }

  streak = 0;
  return -20;
}

function applyingProfitAndLoss(card, playerAnswer) {
  let delta = 0;
  if (playerAnswer === "Yes") {
    delta = card.hiddenProfit;
  } else if (card.hiddenProfit >= TARGET_PROFIT) {
    delta = -5;
  }

  totalProfit += delta;
  getCurrentRound().roundProfit += delta;
}

function handleAnswer(playerAnswer) {
  if (answerLocked) return;

  answerLocked = true;
  yesBtn.disabled = true;
  noBtn.disabled = true;
  stopCountdown();

  const card = getCurrentRound().cards[currentCard];
  score += computingScore(card, playerAnswer);
  applyingProfitAndLoss(card, playerAnswer);
  pendingTransitionTimeout = window.setTimeout(moveToNextCard, NEXT_CARD_DELAY_MS);
}

function handleTimeout() {
  if (answerLocked) return;

  answerLocked = true;
  yesBtn.disabled = true;
  noBtn.disabled = true;
  streak = 0;
  score -= 15;
  pendingTransitionTimeout = window.setTimeout(moveToNextCard, NEXT_CARD_DELAY_MS);
}

function moveToNextCard() {
  currentCard += 1;
  if (currentCard >= getCurrentRound().cards.length) {
    advancingRounds();
    return;
  }
  renderCurrentCard();
}

function renderingRoundEndProfitSummary(round) {
  interstitialEyebrow.textContent = `${round.title} complete`;
  const sign = round.roundProfit >= 0 ? "+" : "-";
  roundSummaryLine.textContent = `Round Profit: ${sign}$${Math.abs(round.roundProfit)}`;
}

function showingBetweenRoundAds(round) {
  renderingRoundEndProfitSummary(round);
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
  const safeScore = Math.max(0, Math.round(score));
  const safeProfit = Math.round(totalProfit);
  saveLeaderboard({ name: playerName, score: safeScore, profit: safeProfit, market: MARKET_CONFIG[selectedMarket].label, date: Date.now() });

  finalPlayer.textContent = `Player: ${playerName}`;
  finalMarket.textContent = `Market: ${MARKET_CONFIG[selectedMarket].label}`;
  finalScore.textContent = `Score: ${safeScore}`;
  finalProfit.textContent = `Profit: ${safeProfit >= 0 ? "+" : "-"}$${Math.abs(safeProfit)}`;

  const endingText = performanceMessage(safeScore, safeProfit);
  rating.textContent = endingText.rating;
  summary.textContent = endingText.summary;

  renderLeaderboards();
  renderScreen(SCREEN.END);
}

function performanceMessage(finalScoreValue, finalProfitValue) {
  const blend = finalScoreValue + finalProfitValue * 4;
  if (blend >= 2500 && finalProfitValue >= 240) {
    return { rating: "Master Flipper", summary: "You are a master flipper. You could open a record store." };
  }
  if (blend >= 1650 && finalProfitValue >= 120) {
    return { rating: "Crate Cash Operator", summary: "You made beer money and 7-inch money." };
  }
  if (blend >= 900 && finalProfitValue >= 20) {
    return { rating: "Collector Energy", summary: "Maybe you are better off buying and listening." };
  }
  if (blend >= 350 && finalProfitValue > -80) {
    return { rating: "Needs Regrading", summary: "Better start reading your copies of Goldmine again." };
  }
  return { rating: "Day Job Locked In", summary: "You are not a flipper. Stick to your day job." };
}

function saveLeaderboard(entry) {
  const leaderboard = readLeaderboard();
  leaderboard.push(entry);
  const best = leaderboard.sort((a, b) => b.score - a.score).slice(0, LEADERBOARD_LIMIT);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(best));
}

function readLeaderboard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  if (!raw) return [];
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
    const signedProfit = `${entry.profit >= 0 ? "+" : "-"}$${Math.abs(entry.profit || 0)}`;
    li.textContent = `${entry.name} — ${entry.score} — ${signedProfit}`;
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

function resetRunState() {
  rounds = [];
  currentRoundIndex = 0;
  pendingAnnouncementRoundIndex = 0;
  currentCard = 0;
  answerLocked = false;
  score = 0;
  totalProfit = 0;
  streak = 0;
  timeRemaining = ROUND_SECONDS;
  clearPendingTransition();
  stopCountdown();
}

function resetGame() {
  resetRunState();
  renderLeaderboards();
  renderScreen(SCREEN.HOME);
}

function clearPendingTransition() {
  if (pendingTransitionTimeout) {
    clearTimeout(pendingTransitionTimeout);
    pendingTransitionTimeout = null;
  }
}

function shuffled(arr) {
  const clone = [...arr];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function setupHomeHeroFallback() {
  homeHeroImage.onload = () => homeHeroFallback.classList.add("hidden");
  homeHeroImage.onerror = () => homeHeroFallback.classList.remove("hidden");
}

startBtn.addEventListener("click", startingNewGame);
startRoundBtn.addEventListener("click", beginAnnouncedRound);
yesBtn.addEventListener("click", () => handleAnswer("Yes"));
noBtn.addEventListener("click", () => handleAnswer("No"));
continueRoundBtn.addEventListener("click", continueAfterInterstitial);
playAgainBtn.addEventListener("click", resetGame);
clearLeaderboardBtn.addEventListener("click", clearLeaderboard);

setupHomeHeroFallback();
renderScreen(SCREEN.HOME);
renderLeaderboards();
