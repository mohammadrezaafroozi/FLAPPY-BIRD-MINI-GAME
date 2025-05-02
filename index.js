document.addEventListener('DOMContentLoaded', () => {
    const gameDisplay = document.querySelector('.game-container');
    const bird = document.querySelector('.bird');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let score = 0; 

    /// time element in game-container
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    timerDisplay.textContent = `Time: ${score}s`;
    gameDisplay.appendChild(timerDisplay);

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let timerId = setInterval(startGame, 20);

    ///timer////
    let gameTimer = setInterval(() => {
        if (!isGameOver) {
            score++;
            timerDisplay.textContent = `Time: ${score}s`;
        }
    }, 1000);

    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if (birdBottom < 212) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }

    document.addEventListener('keyup', control);

    function generateObsticle() {
        let obsLeft = 500;
        let randomHeight = Math.random() * 90;
        let obsBottom = randomHeight;
        const obsticle = document.createElement('div');
        if (!isGameOver) obsticle.classList.add('obsticle');
        gameDisplay.appendChild(obsticle);
        obsticle.style.left = obsLeft + 'px';
        obsticle.style.bottom = obsBottom + 'px';

        function moveObsticle() {
            obsLeft -= 2;
            obsticle.style.left = obsLeft + 'px';
            if (obsLeft === -60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obsticle);
            }
            if (
                (obsLeft > 200 && obsLeft < 280 && birdLeft === 220 && birdBottom < obsBottom + 150) ||
                birdBottom === 0
            ) {
                gameOver();
                clearInterval(timerId);
            }
        }
        let timerId = setInterval(moveObsticle, 20);
        if (!isGameOver) setTimeout(generateObsticle, 3000);
    }
    generateObsticle();

    function gameOver() {
        clearInterval(timerId);
        clearInterval(gameTimer); 
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }
});