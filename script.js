const ROUND_SECONDS = 9;
const NEXT_CARD_DELAY_MS = 350;
const LEADERBOARD_KEY = "flipWizardLeaderboardV5";
const LEADERBOARD_LIMIT = 8;
const CARDS_PER_ROUND = 8;
const DOUBLE_MONEY_MULTIPLIER = 2;
const MIN_DOUBLE_PROFIT = 28;
const HOME_HERO_IMAGE = "images/hero.png";
const PRELOAD_IMAGE_PATHS = [
  HOME_HERO_IMAGE,
  "images/round-op-shop.png",
  "images/round-sunday-market.png",
  "images/round-yard-sale.png",
  "images/round-antique-shop.png",
  "images/round-record-fair.png",
];

const SCREEN = {
  HOME: "home",
  ROUND_ANNOUNCEMENT: "round_announcement",
  GAMEPLAY: "gameplay",
  BETWEEN_ROUND_AD: "between_round_ad",
  END: "end",
};

const ADSENSE_CLIENT_ID = "ca-pub-3839676134418957";
const AD_SLOTS = {
  roundIntro: ["9244967293", "8882138664", "5109713914", "1452740209", "6589516817"],
  gameplayTop: ["8282538710", "9449114870", "8935644405", "1267239073", "5276435140"],
  gameplayBottom: ["3030212035", "6777885356", "1739680669", "7745150966", "1337190136"],
  endOfRound: ["9477035039", "3629811984", "9161340267", "2841843492", "7480592939"],
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
    announcementText: "All records are original presses.\nGoldmine Record/Sleeve grading affects value.\nYour call: can you double your money on these records?",
    imageSrc: "images/round-op-shop.png",
  },
  {
    key: "round-two-sunday-market",
    title: "Round Two Sunday Market",
    eyebrow: "Round Two",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.0,
    variance: 0.14,
    gradeWeights: [0.2, 0.35, 0.29, 0.16],
    announcementText: "All records are original presses, but condition still rules the deal.\nGoldmine Record/Sleeve grades shape what buyers will pay.\nBack your eye only when the numbers can roughly double your money.",
    imageSrc: "images/round-sunday-market.png",
  },
  {
    key: "round-three-garage-sale",
    title: "Round Three Garage Sale",
    eyebrow: "Round Three",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.05,
    variance: 0.15,
    gradeWeights: [0.22, 0.36, 0.27, 0.15],
    announcementText: "Original presses are on the table, but grading can kill value fast.\nWatch Goldmine Record/Sleeve condition closely before saying yes.\nChase records where resale can at least double your buy price.",
    imageSrc: "images/round-yard-sale.png",
  },
  {
    key: "round-four-antique-shop",
    title: "Round Four Antique Shop",
    eyebrow: "Round Four",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.1,
    variance: 0.11,
    gradeWeights: [0.24, 0.37, 0.25, 0.14],
    announcementText: "These are still original presses, priced by confident sellers.\nGoldmine Record/Sleeve grades decide if margin survives.\nOnly strike when condition and demand can double your money.",
    imageSrc: "images/round-antique-shop.png",
  },
  {
    key: "round-five-record-fair",
    title: "Round Five Record Fair",
    eyebrow: "Round Five",
    cardCount: CARDS_PER_ROUND,
    pricePressure: 1.16,
    variance: 0.1,
    gradeWeights: [0.24, 0.39, 0.24, 0.13],
    announcementText: "Final push: original presses with the tightest margins.\nGoldmine Record/Sleeve grading is the difference maker.\nFinal call: pick only records that can realistically double your money.",
    imageSrc: "images/round-record-fair.png",
  },
];

const MARKET_CONFIG = {
  au: { label: "eBay Australia", symbol: "$", saleMultiplier: 1.03, buyMultiplier: 1.2, roundBuyPressure: 0.04 },
  us: { label: "eBay US", symbol: "$", saleMultiplier: 1.1, buyMultiplier: 0.96, roundBuyPressure: -0.01 },
  uk: { label: "eBay UK", symbol: "£", saleMultiplier: 1.07, buyMultiplier: 1.0, roundBuyPressure: 0 },
  eu: { label: "Germany / EU", symbol: "€", saleMultiplier: 1.09, buyMultiplier: 1.05, roundBuyPressure: 0.01 },
};

const gradeMultipliers = {
  record: { "G+": 0.54, VG: 0.71, "VG+": 0.89, EX: 1.03 },
  sleeve: { "G+": 0.87, VG: 0.94, "VG+": 1, EX: 1.05 },
};

const ORIGINAL_PRESS_VALUE_BONUS = 1.16;

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
const roundScoreLine = document.getElementById("roundScoreLine");

const artistText = document.getElementById("artist");
const titleText = document.getElementById("title");
const gradeLineText = document.getElementById("gradeLine");
const buyPriceText = document.getElementById("buyPrice");
const roundLabel = document.getElementById("roundLabel");
const cardCount = document.getElementById("cardCount");
const timerBadge = document.getElementById("timerBadge");
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
const roundIntroAdSlot = document.getElementById("roundIntroAdSlot");
const topBannerAdSlot = document.getElementById("topBannerAdSlot");
const bottomBannerAdSlot = document.getElementById("bottomBannerAdSlot");
const interstitialAdSlot = document.getElementById("interstitialAdSlot");
const resultAdSlot = document.getElementById("resultAdSlot");

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

function preloadImages() {
  PRELOAD_IMAGE_PATHS.forEach((src) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
  });
}

preloadImages();
homeHeroImage.src = HOME_HERO_IMAGE;

function renderScreen(screen) {
  introSection.classList.toggle("hidden", screen !== SCREEN.HOME);
  roundAnnouncementSection.classList.toggle("hidden", screen !== SCREEN.ROUND_ANNOUNCEMENT);
  gameSection.classList.toggle("hidden", screen !== SCREEN.GAMEPLAY);
  resultSection.classList.toggle("hidden", screen !== SCREEN.END);
  interstitialSection.classList.toggle("hidden", screen !== SCREEN.BETWEEN_ROUND_AD);
  document.body.className = document.body.className
    .split(/\s+/)
    .filter((name) => name && !name.startsWith("screen-"))
    .concat(`screen-${screen}`)
    .join(" ");
}

const AD_VARIANTS = {
  top: {
    frameClass: "ad-frame-top",
    sizeClass: "ad-size-gameplay-top",
    mobileWidth: 320,
    mobileHeight: 50,
    tabletWidth: 468,
    tabletHeight: 60
  },
  bottom: {
    frameClass: "ad-frame-bottom",
    sizeClass: "ad-size-gameplay-bottom",
    mobileWidth: 320,
    mobileHeight: 50,
    tabletWidth: 468,
    tabletHeight: 60
  },
  card: {
    frameClass: "ad-frame-card",
    sizeClass: "ad-size-card",
    mobileWidth: 320,
    mobileHeight: 100,
    tabletWidth: 468,
    tabletHeight: 60
  }
};

function getAdVariantConfig(variant = "card") {
  return AD_VARIANTS[variant] || AD_VARIANTS.card;
}

function getAdInlineStyle() {
  return "display:block;width:var(--ad-width);height:var(--ad-height)";
}

function shouldControlAdSize(config) {
  return window.matchMedia("(max-width: 1024px)").matches || Boolean(config.desktopWidth && config.desktopHeight);
}

function createAdMarkup(slotId, variant = "card") {
  const config = getAdVariantConfig(variant);
  const controlledSize = shouldControlAdSize(config);
  const widthStyle = getAdInlineStyle();
  const responsiveValue = controlledSize ? "false" : "true";

  return `<div class="ad-frame ${config.frameClass} ${config.sizeClass}" style="--ad-mobile-width:${config.mobileWidth}px;--ad-mobile-height:${config.mobileHeight}px;--ad-tablet-width:${config.tabletWidth || config.mobileWidth}px;--ad-tablet-height:${config.tabletHeight || config.mobileHeight}px;${config.desktopWidth ? `--ad-desktop-width:${config.desktopWidth}px;` : ""}${config.desktopHeight ? `--ad-desktop-height:${config.desktopHeight}px;` : ""}"><ins class="adsbygoogle ${config.sizeClass}" style="${widthStyle}" data-ad-client="${ADSENSE_CLIENT_ID}" data-ad-slot="${slotId}" data-ad-format="horizontal" data-full-width-responsive="${responsiveValue}"></ins></div>`;
}

function initialiseAdContainer(container) {
  if (!container) {
    return;
  }

  const adElement = container.querySelector(".adsbygoogle");
  if (!adElement || adElement.dataset.adStatus || adElement.dataset.initialised === "true") {
    return;
  }

  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    adElement.dataset.initialised = "true";
  } catch (error) {
    console.warn("AdSense placement failed to initialise.", error);
  }
}

function renderAdPlacement(container, slotId, variant = "card") {
  if (!container || !slotId) {
    return;
  }

  const currentSlotId = container.dataset.currentAdSlot;
  const currentVariant = container.dataset.currentAdVariant;
  const currentControlledState = container.dataset.currentControlledState;
  const nextControlledState = String(shouldControlAdSize(getAdVariantConfig(variant)));
  const existingAd = container.querySelector(".adsbygoogle");

  if (currentSlotId !== slotId || currentVariant !== variant || currentControlledState != nextControlledState || !existingAd) {
    container.innerHTML = createAdMarkup(slotId, variant);
    container.dataset.currentAdSlot = slotId;
    container.dataset.currentAdVariant = variant;
    container.dataset.currentControlledState = nextControlledState;
  }

  initialiseAdContainer(container);
}

function renderRoundAnnouncementAd(roundIndex) {
  renderAdPlacement(roundIntroAdSlot, AD_SLOTS.roundIntro[roundIndex], "card");
}

function renderGameplayAds(roundIndex) {
  renderAdPlacement(topBannerAdSlot, AD_SLOTS.gameplayTop[roundIndex], "top");
  renderAdPlacement(bottomBannerAdSlot, AD_SLOTS.gameplayBottom[roundIndex], "bottom");
}

function renderEndOfRoundAd(roundIndex) {
  renderAdPlacement(interstitialAdSlot, AD_SLOTS.endOfRound[roundIndex], "card");
}

function renderFinalResultAd(roundIndex) {
  renderAdPlacement(resultAdSlot, AD_SLOTS.endOfRound[roundIndex], "card");
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
    imageSrc: round.imageSrc,
    imageLabel: `${record[0]}\n${record[1]}`,
    eligibleRounds: ROUND_CONFIG.map((entry) => entry.key),
    baseMedianValue: Math.round(record[2] * ORIGINAL_PRESS_VALUE_BONUS),
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
  const under = hiddenLikelySalePrice * (0.47 - spread * 0.32);
  const over = hiddenLikelySalePrice * (0.9 + spread * 0.22);
  const floor = Math.max(8, Math.round(under * market.buyMultiplier * round.pricePressure));
  const ceiling = Math.max(floor + 6, Math.round(over * market.buyMultiplier * (round.pricePressure + market.roundBuyPressure)));
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function computingHiddenProfit(hiddenLikelySalePrice, displayedBuyPrice) {
  return hiddenLikelySalePrice - displayedBuyPrice;
}

function canDoubleMoney(hiddenLikelySalePrice, displayedBuyPrice, hiddenProfit) {
  return hiddenLikelySalePrice >= displayedBuyPrice * DOUBLE_MONEY_MULTIPLIER && hiddenProfit >= MIN_DOUBLE_PROFIT;
}

function determiningCorrectAnswer(hiddenLikelySalePrice, displayedBuyPrice, hiddenProfit) {
  return canDoubleMoney(hiddenLikelySalePrice, displayedBuyPrice, hiddenProfit) ? "Yes" : "No";
}

function buildRuntimeCard(card, round) {
  const { recordGrade, sleeveGrade } = assigningGrades(round);
  const hiddenLikelySalePrice = calculatingMarketAdjustedLikelySaleValue(card.baseMedianValue, selectedMarket, recordGrade, sleeveGrade);
  const displayedBuyPrice = generatingDisplayedBuyPrice(hiddenLikelySalePrice, round, selectedMarket);
  const hiddenProfit = computingHiddenProfit(hiddenLikelySalePrice, displayedBuyPrice);
  const correctAnswer = determiningCorrectAnswer(hiddenLikelySalePrice, displayedBuyPrice, hiddenProfit);
  const isDoubleFlip = correctAnswer === "Yes";

  return {
    ...card,
    recordGrade,
    sleeveGrade,
    displayedBuyPrice,
    hiddenLikelySalePrice,
    hiddenProfit,
    correctAnswer,
    isDoubleFlip,
  };
}

function showRoundAnnouncement(roundIndex) {
  pendingAnnouncementRoundIndex = roundIndex;
  const round = ROUND_CONFIG[roundIndex];
  announcementEyebrow.textContent = round.eyebrow;
  announcementTitle.textContent = round.title;
  announcementBody.textContent = round.announcementText;
  renderScreen(SCREEN.ROUND_ANNOUNCEMENT);
  renderRoundAnnouncementAd(roundIndex);
}

function beginAnnouncedRound() {
  startRound(pendingAnnouncementRoundIndex);
}

function startRound(roundIndex) {
  currentRoundIndex = roundIndex;
  currentCard = 0;
  renderScreen(SCREEN.GAMEPLAY);
  renderGameplayAds(roundIndex);
  renderCurrentCard();
}

function getCurrentRound() {
  return rounds[currentRoundIndex];
}

function currencySymbol() {
  return MARKET_CONFIG[selectedMarket]?.symbol || "$";
}

function formatMoney(value) {
  return `${currencySymbol()}${Math.abs(Math.round(value))}`;
}

function formatSignedMoney(value) {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}${formatMoney(value)}`;
}

function renderingStrippedBackCardView(card) {
  const [artistLabel, titleLabel] = card.imageLabel.split("\n");
  artistText.textContent = card.artist;
  titleText.textContent = card.title;
  gradeLineText.textContent = `${card.recordGrade}/${card.sleeveGrade}`;
  buyPriceText.textContent = `Buy Price: ${currencySymbol()}${card.displayedBuyPrice}`;
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
  coverImage.onload = () => coverFallback.classList.add("hidden");
  coverImage.onerror = () => coverFallback.classList.remove("hidden");
  coverImage.alt = "";
  coverImage.src = card.imageSrc;

  if (coverImage.complete && coverImage.naturalWidth > 0) {
    coverFallback.classList.add("hidden");
  } else {
    coverFallback.classList.remove("hidden");
  }
}

function updatingTimerBadge() {
  timerBadge.textContent = `${timeRemaining.toFixed(1)}s`;
}

function startCountdown() {
  stopCountdown();
  timeRemaining = ROUND_SECONDS;
  updatingTimerBadge();
  cardStartedAt = performance.now();
  timerInterval = window.setInterval(() => {
    const elapsed = (performance.now() - cardStartedAt) / 1000;
    timeRemaining = Math.max(0, ROUND_SECONDS - elapsed);
    updatingTimerBadge();
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
  const profitable = card.isDoubleFlip;
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
  } else if (card.isDoubleFlip) {
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
  const scoreDelta = computingScore(card, playerAnswer);
  score += scoreDelta;
  card.choice = playerAnswer;
  card.scoreDelta = scoreDelta;
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
  const card = getCurrentRound().cards[currentCard];
  if (card) {
    card.choice = "Timeout";
    card.scoreDelta = -15;
  }
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

function calculatingRoundScore(round) {
  return round.cards.reduce((sum, card) => sum + (Number.isFinite(card.scoreDelta) ? card.scoreDelta : 0), 0);
}

function renderingRoundEndProfitSummary(round) {
  interstitialEyebrow.textContent = `${round.title} complete`;
  const roundScore = Math.max(0, Math.round(calculatingRoundScore(round)));
  roundScoreLine.textContent = `Round Score: ${roundScore}`;
  roundSummaryLine.textContent = `Round Profit: ${formatSignedMoney(round.roundProfit)}`;
}

function showingBetweenRoundAds(round) {
  renderingRoundEndProfitSummary(round);
  renderEndOfRoundAd(currentRoundIndex);
  renderScreen(SCREEN.BETWEEN_ROUND_AD);
}

function advancingRounds() {
  stopCountdown();
  const isFinalRound = currentRoundIndex >= ROUND_CONFIG.length - 1;
  if (isFinalRound) {
    endingGame();
    return;
  }
  showingBetweenRoundAds(getCurrentRound());
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
  finalProfit.textContent = `Profit: ${formatSignedMoney(safeProfit)}`;

  const endingText = performanceMessage(safeScore, safeProfit);
  rating.textContent = endingText.rating;
  summary.textContent = endingText.summary;

  renderLeaderboards();
  renderFinalResultAd(currentRoundIndex);
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
    const marketKey = Object.keys(MARKET_CONFIG).find((key) => MARKET_CONFIG[key].label === entry.market) || selectedMarket;
    const symbol = MARKET_CONFIG[marketKey]?.symbol || "$";
    const signedProfit = `${entry.profit >= 0 ? "+" : "-"}${symbol}${Math.abs(entry.profit || 0)}`;
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
  updatingTimerBadge();
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

  if (homeHeroImage.complete && homeHeroImage.naturalWidth > 0) {
    homeHeroFallback.classList.add("hidden");
  }
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


window.addEventListener("resize", () => {
  const activeRoundIndex = Math.max(0, currentRoundIndex - 1);

  if (!gameSection.classList.contains("hidden") && AD_SLOTS.gameplayTop[activeRoundIndex] && AD_SLOTS.gameplayBottom[activeRoundIndex]) {
    renderGameplayAds(activeRoundIndex);
  }

  if (!roundAnnouncementSection.classList.contains("hidden") && AD_SLOTS.roundIntro[activeRoundIndex]) {
    renderRoundAnnouncementAd(activeRoundIndex);
  }

  if (!interstitialSection.classList.contains("hidden") && AD_SLOTS.endOfRound[activeRoundIndex]) {
    renderEndOfRoundAd(activeRoundIndex);
  }

  if (!resultSection.classList.contains("hidden") && AD_SLOTS.endOfRound[activeRoundIndex]) {
    renderFinalResultAd(activeRoundIndex);
  }
});
