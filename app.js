// to fix: edge case with veggie eating
// to add: scoring and reset Button
// to add: different type of veggies / one that slows down, one that speeds up

const $grid = document.getElementById('grid');
const snakeArr = [175, 176, 177, 178, 179, 199, 219, 239];
const gridArr = [];
let lastInput = 'LEFT';
let direction = -1;

function initGame() {
  // draw divs
  for (let i = 0; i < 400; i++) {
    const $field = document.createElement('div');
    $grid.appendChild($field);
    gridArr.push($field);
  }

  // draw initial snake
  snakeArr.forEach((snake) => gridArr[snake].classList.add('snake'));

  // draw first veggie
  renderVeggie();

  // init cursor eventlistener
  document.addEventListener('keyup', function (event) {
    lastInput = setLastInput(event);
  });
}

const gameLoop = setInterval(() => {
  renderSnake();
}, 150);

function renderSnake() {
  getNewDirection();
  checkforVeggie();
  checkGameOver();
  snakeArr.forEach((snake) => gridArr[snake].classList.remove('snake'));
  moveSnake();
  snakeArr.forEach((snake) => gridArr[snake].classList.add('snake'));
}

function getNewDirection() {
  switch (lastInput) {
    case 'LEFT':
      direction = -1;
      break;
    case 'RIGHT':
      direction = 1;
      break;
    case 'UP':
      direction = -20;
      break;
    case 'DOWN':
      direction = 20;
      break;
  }
}

function setLastInput(event) {
  switch (event.code) {
    case 'ArrowLeft':
      return lastInput === 'RIGHT' ? lastInput : 'LEFT';
    case 'ArrowRight':
      return lastInput === 'LEFT' ? lastInput : 'RIGHT';
    case 'ArrowUp':
      return lastInput === 'DOWN' ? lastInput : 'UP';
    case 'ArrowDown':
      return lastInput === 'UP' ? lastInput : 'DOWN';
    default:
      return lastInput;
  }
}

function checkGameOver() {
  if (
    (lastInput === 'LEFT' && snakeArr[0] % 20 === 0) ||
    (lastInput === 'RIGHT' && (snakeArr[0] + direction) % 20 === 0) ||
    (lastInput === 'UP' && snakeArr[0] + direction < 0) ||
    (lastInput === 'DOWN' && snakeArr[0] + direction > 399) ||
    gridArr[snakeArr[0] + direction].classList.contains('snake')
  ) {
    clearInterval(gameLoop);
    alert('GameOver');
  }
}

function moveSnake() {
  snakeArr.unshift(snakeArr[0] + direction);
  snakeArr.pop(snakeArr[snakeArr.length - 1]);
}

function getNewVeggie() {
  const veggie = Math.floor(Math.random() * 400);
  return gridArr[veggie].classList.contains('snake') ? getNewVeggie() : veggie;
}

function renderVeggie() {
  gridArr[getNewVeggie()].classList.add('veggie');
}

function checkforVeggie() {
  if (gridArr[snakeArr[0] + direction].classList.contains('veggie')) {
    gridArr[snakeArr[0] + direction].classList.remove('veggie');
    gridArr[snakeArr[0] + direction].classList.add('snake');
    snakeArr.unshift(snakeArr[0] + direction);
    renderVeggie();
  }
}

initGame();
