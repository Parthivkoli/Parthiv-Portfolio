let clickCount = 0;
let gameStarted = false;
let score = 0;
let currentQuestion = 0;
let timerInterval;
let timeLeft;

// Predefined character IDs from Jikan API (to avoid random fetching issues)
const characters = [
    { id: 1, name: "Naruto Uzumaki" },      // Naruto
    { id: 40, name: "Luffy Monkey D." },   // One Piece
    { id: 417, name: "Goku" },             // Dragon Ball
    { id: 71, name: "Ichigo Kurosaki" },   // Bleach
    { id: 121, name: "Sailor Moon" }       // Sailor Moon
];

const profileImage = document.querySelector('.profile-image');
const easterEggGame = document.getElementById('easter-egg-game');
const gameContainer = document.getElementById('game-container');
const questionElement = document.getElementById('question');
const imageElement = document.getElementById('image');
const timerElement = document.getElementById('timer');
const optionsElement = document.getElementById('options');
const scoreDisplay = document.getElementById('score');
const gameOver = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

profileImage.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 10 && !gameStarted) {
        startGame();
    }
});

async function fetchCharacter(id) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/characters/${id}`);
        const data = await response.json();
        return {
            name: data.data.name,
            image: data.data.images.jpg.image_url
        };
    } catch (error) {
        console.error('Error fetching character:', error);
        return null;
    }
}

async function startGame() {
    gameStarted = true;
    easterEggGame.style.display = 'block';
    score = 0;
    currentQuestion = 0;
    updateScore();
    await loadQuestion();
}

async function loadQuestion() {
    if (currentQuestion >= 5) {
        endGame();
        return;
    }

    // Adjust difficulty based on score
    let timeLimit = 10;
    let numOptions = 4;
    if (score >= 10) {
        timeLimit = 6;
        numOptions = 6;
    } else if (score >= 5) {
        timeLimit = 8;
        numOptions = 5;
    }

    timeLeft = timeLimit;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    const currentChar = characters[currentQuestion];
    const characterData = await fetchCharacter(currentChar.id);
    if (!characterData) {
        currentQuestion++;
        loadQuestion();
        return;
    }

    questionElement.textContent = 'Who is this character?';
    imageElement.style.backgroundImage = `url(${characterData.image})`;

    // Generate options
    const options = [characterData.name];
    const allNames = characters.map(c => c.name).filter(n => n !== characterData.name);
    while (options.length < numOptions) {
        const randomName = allNames[Math.floor(Math.random() * allNames.length)];
        if (!options.includes(randomName)) options.push(randomName);
    }
    shuffleArray(options);

    optionsElement.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, characterData.name));
        optionsElement.appendChild(button);
    });
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        currentQuestion++;
        loadQuestion();
    }
}

function checkAnswer(selected, correct) {
    clearInterval(timerInterval);
    if (selected === correct) {
        score++;
        updateScore();
    }
    currentQuestion++;
    loadQuestion();
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function endGame() {
    clearInterval(timerInterval);
    gameOver.style.display = 'block';
    gameOver.innerHTML = `Game Over!<br>Your score: ${score}<br><button id="restart-button">Restart</button>`;
    const restartBtn = document.getElementById('restart-button');
    restartBtn.addEventListener('click', restartGame);
}

function restartGame() {
    gameOver.style.display = 'none';
    startGame();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Close game by clicking outside
easterEggGame.addEventListener('click', (e) => {
    if (e.target === easterEggGame) {
        easterEggGame.style.display = 'none';
        gameStarted = false;
        clearInterval(timerInterval);
    }
});