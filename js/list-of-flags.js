const countryListSection = document.querySelector('.countries-and-flags');
let NUMBER_OF_COUNTRIES = 5;
const countryArr = [];
const urlParameters = ['name','nativeName','capital','region','subregion', 'population','languages','flag'];
//const url = 'https://restcountries.eu/rest/v2/all?fields=name;nativeName;capital;region;subregion;population;languages;flag'
const url = `https://restcountries.eu/rest/v2/all?fields=${urlParameters[0]};${urlParameters[1]};${urlParameters[2]};${urlParameters[3]};${urlParameters[4]};${urlParameters[5]};${urlParameters[6]};${urlParameters[7]}`
//const countryDisplayParameters = document.querySelectorAll('.country-option');

createSectionsForCountries();
getCountryInfo();
const number = document.querySelector('.number-of-countries');
const changeNumberButton = document.querySelector('.change-number');
changeNumberButton.addEventListener('click', changeNumberOnCLick);
function changeNumberOnCLick(e){
    e.preventDefault();
    clearSections();
    NUMBER_OF_COUNTRIES = number.value;
    createSectionsForCountries();
    getCountryInfo();
}
function clearSections () {
    for (let i = NUMBER_OF_COUNTRIES - 1; i >= 0 ; i--) {
        countryListSection.removeChild(countryArr[i]);
        countryArr.pop();
    }
}
function createSectionsForCountries () {
    for (let i = 0; i < NUMBER_OF_COUNTRIES; i++) {
        countryArr.push(document.createElement('section'));
        countryArr[i].classList.add('.country-info');
        countryArr[i].innerHTML = `<br>
            <div class="country-name"><h2>Country name: </h2></div>
            <div class="country-native-name">Native name: </div>
            <img class="country-flag" width="40%"/>
            <div class="country-capital">Capital: </div>
            <div class="country-region">Region: </div>
            <div class="country-subregion">Subregion: </div>
            <div class="country-population">Population: </div>
            <div class="country-languages">Languages: </div>
            <br>`;
        countryListSection.appendChild(countryArr[i]);
        countryArr[i].appendChild(document.createElement('p'));
    }
}

// const XHR_DONE = 4;
// const HTTP_OK = 200;
//const url = 'https://restcountries.eu/rest/v2/alpha/col';
// function getJson() {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === XHR_DONE && xhr.status === HTTP_OK) {
//             const countryData = JSON.parse(xhr.responseText);
//             for (let i = 0; i < NUMBER_OF_COUNTIES; i++) {
//             countryArr[i].querySelector('.country-name').innerText += countryData[i].name;
//             countryArr[i].querySelector('.country-native-name').innerText += countryData[i].nativeName;
//             countryArr[i].querySelector('.country-capital').innerText += countryData[i].capital;
//             countryArr[i].querySelector('.country-region').innerText += countryData[i].region;
//             countryArr[i].querySelector('.country-subregion').innerText += countryData[i].subregion;
//             countryArr[i].querySelector('.country-population').innerText += countryData[i].population;
//             countryArr[i].querySelector('.country-languages').innerText += countryData[i].languages.map( item => item['name']);
//             countryArr[i].querySelector('.country-flag').src = countryData[i].flag;
//             }       
//         } 
//     }
//     xhr.open('GET', url, true);
//     xhr.send();
// }
//getJson();

function getCountryInfo() {
    fetch(url)
        .then(response => response.json())
        .then(countryData => {
            for (let i = 0; i < NUMBER_OF_COUNTRIES; i++) {
                countryArr[i].querySelector('.country-name')
                    .innerText += countryData[i].name;
                countryArr[i].querySelector('.country-native-name')
                    .innerText += countryData[i].nativeName;
                countryArr[i].querySelector('.country-capital')
                    .innerText += countryData[i].capital;
                countryArr[i].querySelector('.country-region')
                    .innerText += countryData[i].region;
                countryArr[i].querySelector('.country-subregion')
                    .innerText += countryData[i].subregion;
                countryArr[i].querySelector('.country-population')
                    .innerText += countryData[i].population;
                countryArr[i].querySelector('.country-languages')
                    .innerText += countryData[i].languages.map(item => item['name']);
                countryArr[i].querySelector('.country-flag')
                    .src = countryData[i].flag;
            }
        });
}
