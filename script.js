const questions = [
  { image: "C1.jpg", coordinates: { x: 472, y: 635 } },
  { image: "C2.jpg", coordinates: { x: 600, y: 651 } },
  { image: "C3.jpg", coordinates: { x: 565, y: 620 } },
  { image: "C4.jpg", coordinates: { x: 517, y: 645 } },
  { image: "L1.jpg", coordinates: { x: 398, y: 763 } },
  { image: "L2.jpg", coordinates: { x: 387, y: 710 } },
  { image: "L3.jpg", coordinates: { x: 350, y: 688 } },
  { image: "L4.jpg", coordinates: { x: 371, y: 665 } },
  { image: "LotL1.jpg", coordinates: { x: 160, y: 500 } },
  { image: "LotL2.jpg", coordinates: { x: 208, y: 440 } },
  { image: "LotL3.jpg", coordinates: { x: 228, y: 569 } },
  { image: "LotL4.jpg", coordinates: { x: 210, y: 520 } },
  { image: "P1.jpg", coordinates: { x: 463, y: 333 } },
  { image: "P2.jpg", coordinates: { x: 310, y: 350 } },
  { image: "P3.jpg", coordinates: { x: 272, y: 378 } },
  { image: "P4.jpg", coordinates: { x: 452, y: 342 } },
  { image: "S1.jpg", coordinates: { x: 586, y: 281 } },
  { image: "S2.jpg", coordinates: { x: 620, y: 210 } },
  { image: "S3.jpg", coordinates: { x: 652, y: 192 } },
  { image: "S4.jpg", coordinates: { x: 640, y: 230 } },
];

const firstClickThreshold = 25;
const secondClickThreshold = 50;

let currentQuestionIndex = 0;
let score = 0;

const timerText = document.getElementById("timer-text");
const timerProgress = document.getElementById("timer-progress");
let timeLeft = 10;
let timerInterval;

function startGame() {
  shuffleArray(questions);
  document.getElementById("start-screen").style.display = "none";
  loadQuestion();
  setTimeout(() => {
    showMap();
  }, 12000);
}

function loadQuestion() {
  startTimer();
  const mapContainer = document.getElementById("map-container");
  mapContainer.style.display = "none";

  const question = questions[currentQuestionIndex];
  const questionContainer = document.getElementById("question-container");
  questionContainer.style.display = "block";
  const questionImg = document.getElementById("question-img");
  questionImg.src = question.image;
}

function showMap() {
  const questionImg = document.getElementById("question-container");
  questionImg.style.display = "none";

  const mapContainer = document.getElementById("map-container");
  mapContainer.style.display = "block";
}

function checkLocation(event) {
  resetTimer();
  const question = questions[currentQuestionIndex];
  const xClicked = event.offsetX;
  const yClicked = event.offsetY;

  const distanceX = Math.abs(xClicked - question.coordinates.x);
  const distanceY = Math.abs(yClicked - question.coordinates.y);

  let color;
  if (distanceX <= firstClickThreshold && distanceY <= firstClickThreshold) {
    color = "green";
    score += 2;
  } else if (
    distanceX <= secondClickThreshold &&
    distanceY <= secondClickThreshold
  ) {
    color = "yellow";
    score += 1;
  } else {
    color = "red";
  }

  showAnswer(question.coordinates.x, question.coordinates.y, color);

  currentQuestionIndex++;

  if (currentQuestionIndex < 5) {
    setTimeout(() => {
      loadQuestion();
      setTimeout(() => {
        showMap();
      }, 12000);
    }, 3000);
  } else {
    setTimeout(() => {
      endGame();
    }, 3000);
  }
}

function showAnswer(x, y, color) {
  const Dot = document.createElement("div");
  Dot.className = "dot";
  Dot.style.left = x + "px";
  Dot.style.top = y + "px";
  Dot.style.backgroundColor = color;
  document.getElementById("map-container").appendChild(Dot);
}

function endGame() {
  const mapContainer = document.getElementById("map-container");
  mapContainer.style.display = "none";

  const scoreContainer = document.getElementById("score-container");
  scoreContainer.style.display = "block";
  const finalMessage = document.getElementById("final-message");

  if (score >= 0 && score <= 2) {
    finalMessage.innerHTML = "Game over!";
  } else if (score >= 3 && score <= 6) {
    finalMessage.innerHTML = "Good job!";
  } else if (score >= 7 && score <= 9) {
    finalMessage.innerHTML = "Excellent!";
  } else {
    finalMessage.innerHTML = "Perfect score! You're amazing!";
  }
  const scoreValue = document.getElementById("score-value");
  scoreValue.innerHTML = score;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  timeLeft = 10;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function resetTimer() {
  timeLeft = 10;
  updateTimer();
}

function updateTimer() {
  timerText.textContent = timeLeft;
  const percentage = (timeLeft / 10) * 100;
  timerProgress.style.width = percentage + "%";
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timerInterval);
  }
}
