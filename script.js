const words = [
    'singh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

let randomWord;

// Init score
let score = 0;

//Init time
let time = 10;

//Set difficulty to value in ls else use medium
let difficulty = localStorage.getItem('difficulty') !=
    null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !==
    null ? localStorage.getItem('difficulty') : 'medium';

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// generate a random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = getRandomWord();
    word.innerHTML = randomWord;
}
function updateScore() {
    score++;
    scoreEl.innerHTML = score;

}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML =
        `<h1>Time  run out </h1>
    <p>Your final score is ${score} </p>
    <button onclick = "location.reload()">Reload </button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// event listeners

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty == 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});


settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});