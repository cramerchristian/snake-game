// init game
// - create Divs -> Array
// - create Snake -> Array
// div classes of snake & veggies
// create Movement of Snake -> lastInput Variable
// check if Snake hits Snake
// create new Veggies
// check if Veggies are Eaten

const $grid = document.getElementById('grid');
const snakeArr = [175, 176, 177, 178, 179, 199, 219, 239];
const gridArr = [];
const veggie = 72;
let lastInput = 'UP';
let direction = -1;

function initGame() {
  for (let i = 0; i < 400; i++) {
    const $field = document.createElement('div');
    $grid.appendChild($field);
    gridArr.push($field);
  }
  snakeArr.forEach((snake) => gridArr[snake].classList.add('snake'));
}

function renderSnake() {
  snakeArr.forEach((snake) => gridArr[snake].classList.remove('snake'));
  moveSnake();
  snakeArr.forEach((snake) => gridArr[snake].classList.add('snake'));
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

function moveSnake() {
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

  checkGameOver();

  snakeArr.unshift(snakeArr[0] + direction);
  snakeArr.pop(snakeArr[snakeArr.length - 1]);
}

const gameLoop = setInterval(() => {
  renderSnake();
}, 500);

function checkGameOver() {
  if (
    (lastInput === 'LEFT' && snakeArr[0] % 20 === 0) ||
    (lastInput === 'RIGHT' && (snakeArr[0] + direction) % 20 === 0) ||
    (lastInput === 'UP' && snakeArr[0] + direction < 0) ||
    (lastInput === 'DOWN' && snakeArr[0] + direction > 399)
  ) {
    clearInterval(gameLoop);
    alert('GameOver');
  }
}

initGame();
document.addEventListener('keyup', function (event) {
  lastInput = setLastInput(event);
});
