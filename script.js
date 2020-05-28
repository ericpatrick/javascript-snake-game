const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  "snake"
));
const context = canvas.getContext("2d");
const box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
const directions = {
  RIGHT: "right",
  LEFT: "left",
  UP: "up",
  DOWN: "down",
};
let currentDirection = directions.RIGHT;
const randomPosition = () => Math.floor(Math.random() * 15 + 1) * box;
const food = {
  x: randomPosition(),
  y: randomPosition(),
};

function buildBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function buildSnake() {
  for (const rect of snake) {
    context.fillStyle = "green";
    context.fillRect(rect.x, rect.y, box, box);
  }
}

function limitBounds() {
  if (snake[0].x > 15 * box && currentDirection === directions.RIGHT)
    snake[0].x = 0;
  if (snake[0].x < 0 && currentDirection === directions.LEFT)
    snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && currentDirection === directions.DOWN)
    snake[0].y = 0;
  if (snake[0].y < 0 && currentDirection === directions.UP)
    snake[0].y = 16 * box;
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

function checkColision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game);
      alert("Game Over :(");
    }
  }
}

addEventListener("keydown", (event) => {
  if (event.keyCode === 37 && currentDirection !== directions.RIGHT)
    currentDirection = directions.LEFT;
  if (event.keyCode === 38 && currentDirection !== directions.DOWN)
    currentDirection = directions.UP;
  if (event.keyCode === 39 && currentDirection !== directions.LEFT)
    currentDirection = directions.RIGHT;
  if (event.keyCode === 40 && currentDirection !== directions.UP)
    currentDirection = directions.DOWN;
});

function startGame() {
  buildBG();
  buildSnake();
  limitBounds();
  drawFood();
  checkColision();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (currentDirection === directions.RIGHT) snakeX += box;
  if (currentDirection === directions.LEFT) snakeX -= box;
  if (currentDirection === directions.UP) snakeY -= box;
  if (currentDirection === directions.DOWN) snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = randomPosition();
    food.y = randomPosition();
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let game = setInterval(startGame, 300);
