const board = document.getElementById('gameBoard');
const selectedDisplay = document.getElementById('selectedWord');
const wordListEl = document.getElementById('wordList');

const wordsToFind = ["strand", "drag", "sand", "rant", "stand"];
const boardLetters = [
  ['S','T','R','A','N','D'],
  ['G','A','M','E','S','T'],
  ['D','R','A','G','S','N'],
  ['A','N','D','R','A','T'],
  ['N','T','S','T','A','N'],
  ['S','A','N','D','R','A']
];

let selectedLetters = [];
let foundWords = [];

function buildBoard() {
  board.innerHTML = '';
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      const div = document.createElement('div');
      div.classList.add('letter');
      div.textContent = boardLetters[y][x];
      div.dataset.x = x;
      div.dataset.y = y;
      div.addEventListener('click', () => selectLetter(div));
      board.appendChild(div);
    }
  }
}

function selectLetter(cell) {
  const letter = cell.textContent;
  if (!cell.classList.contains('selected')) {
    selectedLetters.push(letter);
    cell.classList.add('selected');
    updateSelectedDisplay();
  }
}

function updateSelectedDisplay() {
  selectedDisplay.textContent = selectedLetters.join('');
}

function submitWord() {
  const word = selectedLetters.join('').toLowerCase();
  if (wordsToFind.includes(word) && !foundWords.includes(word)) {
    foundWords.push(word);
    const li = document.createElement('li');
    li.textContent = word;
    wordListEl.appendChild(li);
  }
  clearSelection();
}

function clearSelection() {
  selectedLetters = [];
  document.querySelectorAll('.letter').forEach(cell => cell.classList.remove('selected'));
  updateSelectedDisplay();
}

function shuffleBoard() {
  // Simple shuffle: randomly swap rows
  boardLetters.sort(() => Math.random() - 0.5);
  buildBoard();
}

document.getElementById('submitWord').addEventListener('click', submitWord);
document.getElementById('clearWord').addEventListener('click', clearSelection);
document.getElementById('shuffleBoard').addEventListener('click', shuffleBoard);

buildBoard();
