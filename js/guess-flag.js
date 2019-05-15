let NUMBER_OF_FLAGS = 4;
let NUMBER_OF_COUNTRIES = 250;
let flagsRenderArr = [];
let flagsArr = [];
let flagToGuess = 0;
let answers = [];
let round = 0;
const MAX_ROUNDS = 10;
const flagsContainer = document.querySelector('.quiz-flags');
const url = 'https://restcountries.eu/rest/v2/all?fields=name;flag;alpha3Code'
let randomArr = [];
getFlagsInfo();
document.querySelector('.start-quiz').addEventListener('click', startQuiz);
function startQuiz() {
    document.querySelector('.start-quiz').hidden=true;
    document.querySelector('.quiz-flags').focus();
    createFlagsSectioins();
    getRandomFlags();
    document.querySelector('.quiz-flag-to-pick')
        .innerText = flagsArr[flagToGuess].name;
    document.querySelector('.quiz-title').innerText = 'Choose the correct flag:';
    renderFlags();
}
function renderFlags() {
    for (let i = 0; i < NUMBER_OF_FLAGS; i++) {
        flagsRenderArr[i].querySelector('.flag-name')
             .innerText = flagsArr[randomArr[i]].name;
        flagsRenderArr[i].querySelector('.flag-img')
            .classList.remove('red');
        flagsRenderArr[i].querySelector('.flag-img')
            .classList.remove('green');
        flagsRenderArr[i].querySelector('.flag-img')
            .src = flagsArr[randomArr[i]].flag;
        flagsRenderArr[i].querySelector('.flag-img')
            .alt = "flag";
        flagsRenderArr[i].querySelector('.flag-img')
            .addEventListener('click',flagClicked);
    }
}
function flagClicked(e) {
    console.log(e.target.parentNode.querySelector('.flag-name').innerText);
    if (e.target.parentNode.querySelector('.flag-name').innerText
                === flagsArr[flagToGuess].name) {
                    e.target.classList.add('green');
                    answers[round] = true;
    }
    else {
        e.target.classList.add('red');
        answers[round] = false;
    }
    for (let i = 0; i < NUMBER_OF_FLAGS; i++) {
    flagsRenderArr[i].querySelector('.flag-img')
            .removeEventListener('click',flagClicked);
    }
    setTimeout(changeFlags, 1500);
    }
 
function changeFlags () {
    round++;
    if (round < MAX_ROUNDS) {
    getRandomFlags();
    document.querySelector('.quiz-flag-to-pick')
        .innerText = flagsArr[flagToGuess].name;
    renderFlags();
    }
    else {
        console.log(answers);
        console.log(answers.reduce((acc, val) => val?1:0));
        alert('Game over');
        document.querySelector('.quiz-title').innerText='';
        document.querySelector('.results').innerText 
            = `Congratualions!
            You completed a quiz.
            Your result is ${answers.reduce((acc, val) => val?1:0)} correct answers from ${MAX_ROUNDS} possible`;
        removeFlagsSections();
        document.querySelector('.quiz-flag-to-pick').innerText='';
    }
}
function getRandomFlags() {
    for (let i = 0; i < NUMBER_OF_FLAGS; i++) {
        randomArr[i] = Math.floor(Math.random() * Math.floor(NUMBER_OF_COUNTRIES));
    }
    flagToGuess = randomArr[Math.floor(Math.random() * Math.floor(4))];
}
function removeFlagsSections() {
    for (let i = 0; i < NUMBER_OF_FLAGS; i++) {
        flagsContainer.removeChild(flagsRenderArr[i]);
    }
}
function createFlagsSectioins() {
    for (let i = 0; i < NUMBER_OF_FLAGS; i++) {
        flagsRenderArr.push(document.createElement('div'));
        flagsRenderArr[i].className = 'quiz-flag';
        flagsRenderArr[i].innerHTML = `
                                    <img class="flag-img">
                                    <div class="flag-name"></div>
                                    `;
        flagsContainer.appendChild(flagsRenderArr[i]);
    }
}

function getFlagsInfo() {
    fetch(url)
        .then(response => response.json())
        .then(flagsData => {
            for (let i = 0; i < NUMBER_OF_COUNTRIES; i++) {
                flagsArr[i] = flagsData[i];
            }
        });
}
