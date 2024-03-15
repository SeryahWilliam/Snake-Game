// let snake;
// let food;
// let canvas;
// let resetButton;
// let messageElement;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playAgainButton = document.getElementById('playAgainButton');

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
const snakeSize = 20;
let dx = snakeSize;
let dy = 0;
let food = getRandomFoodPosition();
let speed = 5; // Slower speed
let gameRunning = false;

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lime';
    ctx.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(drawSnakePart);
    drawFood();
}

function checkCollision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function getRandomFoodPosition() {
    let foodPosition;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
            y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize,
        };
    } while (snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y));
    return foodPosition;
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (!gameRunning) return;

    const keyPressed = event.keyCode;
    const goingUp = dy === -snakeSize;
    const goingDown = dy === snakeSize;
    const goingRight = dx === snakeSize;
    const goingLeft = dx === -snakeSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -snakeSize;
        dy = 0;
    } else if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -snakeSize;
    } else if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = snakeSize;
        dy = 0;
    } else if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = snakeSize;
    }
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    dx = snakeSize;
    dy = 0;
    food = getRandomFoodPosition();
    gameRunning = true;
    playAgainButton.style.display = 'none';
    main();
}

function main() {
    if (checkCollision()) {
        playAgainButton.style.display = 'block';
        gameRunning = false;
        return;
    }

    moveSnake();
    drawSnake();
    if (gameRunning) {
        setTimeout(main, 1000 / speed);
    }
}

playAgainButton.addEventListener('click', resetGame);

resetGame(); // Start the game for the first time
