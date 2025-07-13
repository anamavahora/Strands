const board = document.getElementById('gameBoard');
const selectedDisplay = document.getElementById('selectedWord');
const wordListEl = document.getElementById('wordList');
const spangramStatus = document.getElementById('spangramStatus');
const darkModeToggle = document.getElementById('darkModeToggle');

// Categories of words
const wordCategories = {
  fruits: {
    board: [
      ['A','P','P','L','E','S'],
      ['G','R','A','P','E','S'],
      ['M','A','N','G','O','S'],
      ['P','E','A','R','S','T'],
      ['O','R','A','N','G','E'],
      ['L','E','M','O','N','S']
    ],
    words: ['apple', 'grape', 'orange', 'pear', 'lemon', 'mango'],
    spangram: 'fruits'
  },
  animals: {
    board: [
      ['T','I','G','E','R','S'],
      ['L','I','O','N','S','H'],
      ['B','E','A','R','S','W'],
      ['S','N','A','K','E','S'],
      ['E','A','G','L','E','S'],
      ['Z','E','B','R','A','S']
    ],
    words: ['tiger', 'lion', 'bear', 'snake', 'eagle', 'zebra'],
    spangram: 'animals'
  }
};

let selectedLetters = [];
let foundWords = [];
let selectedCells = [];
let currentSet = {};
let spangramFound = false;

function loadRandomCategory() {
  const keys = Object.keys(wordCategories);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  currentSet = wordCategories[rand];
  buildBoard(currentSet.board);
  foundWords = [];
  wordListEl.innerHTML = '';
  spangramFound = false;
  spangramStatus.textContent = 'Not found';
}

function buildBoard(letterGrid) {
  board.innerHTML = '';
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      const div = document.createElement('div');
      div.classList.add('letter');
      div.textContent = letterGrid[y][x];
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
    selectedCells.push(cell);
    cell.classList.add('selected');
    updateSelectedDisplay();
  }
}

function updateSelectedDisplay() {
  selectedDisplay.textContent = selectedLetters.join('');
}

function submitWord() {
  const word = selectedLetters.join('').toLowerCase();
  if (currentSet.words.includes(word) && !foundWords.includes(word)) {
    foundWords.push(word);
    const li = document.createElement('li');
    li.textContent = word;
    wordListEl.appendChild(li);

    if (word === currentSet.spangram) {
      spangramFound = true;
      selectedCells.forEach(c => c.classList.add('spangram'));
      spangramStatus.textContent = '✔ Found!';
    }
  }
  clearSelection();
}

function clearSelection() {
  selectedLetters = [];
  selectedCells.forEach(cell => cell.classList.remove('selected'));
  selectedCells = [];
  updateSelectedDisplay();
}

function shuffleBoard() {
  currentSet.board.sort(() => Math.random() - 0.5);
  buildBoard(currentSet.board);
  clearSelection();
}

function giveHint() {
  const remaining = currentSet.words.filter(w => !foundWords.includes(w));
  if (remaining.length) {
    alert("Hint: One word is ➡ " + remaining[0].toUpperCase());
  } else {
    alert("You found them all!");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// Event Listeners
document.getElementById('submitWord').addEventListener('click', submitWord);
document.getElementById('clearWord').addEventListener('click', clearSelection);
document.getElementById('shuffleBoard').addEventListener('click', shuffleBoard);
document.getElementById('hintButton').addEventListener('click', giveHint);
darkModeToggle.addEventListener('change', toggleDarkMode);

// Start game
loadRandomCategory();
