const records = [
  {
    artist: "Nirvana",
    title: "In Utero",
    buyPrice: "$8",
    imageLabel: "Nirvana\nIn Utero",
    correctAnswer: "Yes",
    reason: "Strong resale margin after fees and shipping.",
    tileStyle: "linear-gradient(135deg, #2f4858, #33658a)",
  },
  {
    artist: "The Beatles",
    title: "Abbey Road",
    buyPrice: "$35",
    imageLabel: "The Beatles\nAbbey Road",
    correctAnswer: "No",
    reason: "Buy price is too high for a worthwhile flip.",
    tileStyle: "linear-gradient(135deg, #5b3a29, #8f5e40)",
  },
  {
    artist: "David Bowie",
    title: "Heroes",
    buyPrice: "$12",
    imageLabel: "David Bowie\nHeroes",
    correctAnswer: "Yes",
    reason: "Healthy enough resale margin to justify the buy.",
    tileStyle: "linear-gradient(135deg, #4b2e83, #815ac0)",
  },
];

const introSection = document.getElementById("intro");
const gameSection = document.getElementById("game");
const resultSection = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const nextBtn = document.getElementById("nextBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const cardCount = document.getElementById("cardCount");
const scoreText = document.getElementById("score");
const artistText = document.getElementById("artist");
const titleText = document.getElementById("title");
const buyPriceText = document.getElementById("buyPrice");
const tileArtist = document.getElementById("tileArtist");
const tileTitle = document.getElementById("tileTitle");
const albumTile = document.getElementById("albumTile");

const feedbackBox = document.getElementById("feedback");
const feedbackText = document.getElementById("feedbackText");
const reasonText = document.getElementById("reasonText");

const finalScore = document.getElementById("finalScore");
const rating = document.getElementById("rating");

let currentCard = 0;
let score = 0;

function renderCard() {
  const record = records[currentCard];

  cardCount.textContent = `Card ${currentCard + 1} of ${records.length}`;
  scoreText.textContent = `Score: ${score}`;

  artistText.textContent = record.artist;
  titleText.textContent = record.title;
  buyPriceText.textContent = record.buyPrice;

  const [artistLabel, titleLabel] = record.imageLabel.split("\n");
  tileArtist.textContent = artistLabel;
  tileTitle.textContent = titleLabel;
  albumTile.style.background = record.tileStyle;

  feedbackBox.classList.add("hidden");
  nextBtn.classList.add("hidden");
  yesBtn.disabled = false;
  noBtn.disabled = false;
}

function startGame() {
  currentCard = 0;
  score = 0;

  introSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  gameSection.classList.remove("hidden");

  renderCard();
}

function getRatingLine(points) {
  if (points <= 1) {
    return "Needs More Crate Digging";
  }

  if (points === 2) {
    return "Sharp Flipper";
  }

  return "Flip Wizard";
}

function checkAnswer(playerAnswer) {
  const record = records[currentCard];
  const isCorrect = playerAnswer === record.correctAnswer;

  if (isCorrect) {
    score += 1;
    feedbackText.textContent = "Correct — profitable flip";
  } else {
    feedbackText.textContent = "Wrong — not a worthwhile flip";
  }

  reasonText.textContent = record.reason;
  scoreText.textContent = `Score: ${score}`;

  feedbackBox.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  yesBtn.disabled = true;
  noBtn.disabled = true;
}

function goToNextCard() {
  currentCard += 1;

  if (currentCard < records.length) {
    renderCard();
    return;
  }

  gameSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  finalScore.textContent = `Final Score: ${score} / ${records.length}`;
  rating.textContent = getRatingLine(score);
}

startBtn.addEventListener("click", startGame);
yesBtn.addEventListener("click", () => checkAnswer("Yes"));
noBtn.addEventListener("click", () => checkAnswer("No"));
nextBtn.addEventListener("click", goToNextCard);
playAgainBtn.addEventListener("click", startGame);
