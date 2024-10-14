let clickCount = 0;
let gameStarted = false;
let score = 0;
let isJumping = false;
let gravity = 0.9;
let position = 0;
let upTime;
let downTime;
let gameSpeed = 5;

const profileImage = document.querySelector('.profile-image');
const easterEggGame = document.getElementById('easter-egg-game');
const gameContainer = document.getElementById('game-container');
let deku = document.getElementById('deku');
const scoreValue = document.getElementById('score-value');
const gameOver = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

profileImage.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 10 && !gameStarted) {
        startGame();
    }
});

function startGame() {
    gameStarted = true;
    easterEggGame.style.display = 'block';
    score = 0;
    updateScore();
    createObstacles();
    document.addEventListener('keydown', control);
    restartButton.addEventListener('click', restartGame);
}

function control(e) {
    if (e.keyCode === 32) {
        e.preventDefault();
        if (!isJumping) {
            isJumping = true;
            jump();
        }
    }
}

function jump() {
    deku.style.backgroundImage = "url('Easter/Deku_jump.gif')";
    let jumpCount = 0;
    let jumpHeight = 20;
    clearInterval(upTime);
    clearInterval(downTime);
    upTime = setInterval(() => {
        if (jumpCount === 10) {
            clearInterval(upTime);
            down();
        }
        position += jumpHeight;
        jumpHeight -= 1;
        jumpCount++;
        deku.style.bottom = position + 'px';
    }, 30);
}

function down() {
    deku.style.backgroundImage = "url('Easter/Deku_dash.gif')";
    downTime = setInterval(() => {
        if (position <= 0) {
            clearInterval(downTime);
            isJumping = false;
            deku.style.backgroundImage = "url('Easter/Deku_idle.gif')";
            position = 0;
        }
        position -= 5;
        position = Math.max(0, position);
        deku.style.bottom = position + 'px';
    }, 30);
}

function createObstacles() {
    let randomTime = Math.random() * 2000 + 1000;
    let obstaclePosition = 1000;
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    gameContainer.appendChild(obstacle);

    let timerId = setInterval(() => {
        if (obstaclePosition > 0 && obstaclePosition < 150 && position < 100) {
            clearInterval(timerId);
            gameOver.style.display = 'block';
            gameContainer.innerHTML = '<div id="deku"></div>';
            deku = document.getElementById('deku');
        }

        obstaclePosition -= gameSpeed;
        obstacle.style.left = obstaclePosition + 'px';

        if (obstaclePosition < -100) {
            clearInterval(timerId);
            gameContainer.removeChild(obstacle);
            score++;
            updateScore();
            if (score % 5 === 0) {
                gameSpeed += 0.5;
            }
        }
    }, 20);

    if (!gameOver.style.display || gameOver.style.display === 'none') {
        setTimeout(createObstacles, randomTime);
    }
}

function updateScore() {
    scoreValue.textContent = score;
}

function restartGame() {
    gameContainer.innerHTML = '<div id="deku"></div>';
    deku = document.getElementById('deku');
    gameOver.style.display = 'none';
    score = 0;
    position = 0;
    isJumping = false;
    gameSpeed = 5;
    deku.style.bottom = '0px';
    deku.style.backgroundImage = "url('Easter/Deku_idle.gif')";
    updateScore();
    createObstacles();
}

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
});
