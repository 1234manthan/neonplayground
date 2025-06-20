const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100);
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
    return;
  }

  // Check for self collision
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  // Check for food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ffcc';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  ctx.fillStyle = '#ff0066';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  ctx.fillStyle = '#00ffcc';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  placeFood();
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -1 }; break;
    case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 1 }; break;
    case 'ArrowLeft': if (direction.x === 0) direction = { x: -1, y: 0 }; break;
    case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
  }
});

placeFood();
gameLoop();