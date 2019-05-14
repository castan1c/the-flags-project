let NUMBER_OF_FLAGS = 4;
let flagsArr = [];
const flagsContainer = document.querySelector('.quiz-flags');
createFlagsSectioins();
function createFlagsSectioins(){
    for (let i = 0; i < NUMBER_OF_FLAGS; i++) {
        flagsArr.push(document.createElement('div'));
        flagsArr[i].className = 'quiz-flag';
        flagsArr[i].innerHTML = '<img class="flag-img">';
        flagsContainer.appendChild(flagsArr[i]);
    }
}