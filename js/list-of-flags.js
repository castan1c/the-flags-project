const countryListSection = document.querySelector('.countries-and-flags');
let NUMBER_OF_COUNTRIES = 5;
const countryArr = [];
const urlParameters = ['name', 'nativeName', 'capital', 'region', 'subregion', 'population', 'languages', 'flag'];
//const url = 'https://restcountries.eu/rest/v2/all?fields=name;nativeName;capital;region;subregion;population;languages;flag'
const url = `https://restcountries.eu/rest/v2/all?fields=${urlParameters[0]};${urlParameters[1]};${urlParameters[2]};${urlParameters[3]};${urlParameters[4]};${urlParameters[5]};${urlParameters[6]};${urlParameters[7]}`;
createSectionsForCountries(0, NUMBER_OF_COUNTRIES);
getCountryInfo();
const number = document.querySelector('.number-of-countries');
const changeNumberButton = document.querySelector('.change-number');
changeNumberButton.addEventListener('click', changeNumberOnCLick);

function changeNumberOnCLick(e) {
    e.preventDefault();
    console.log(number.value);
    if (isNaN(number.value)) alert('Input should be a number');
    else if (number.value > 250 || number.value < 0) alert('Input should be a number between 0 and 250');
    else {
        if (NUMBER_OF_COUNTRIES > number.value) {
            clearSections(NUMBER_OF_COUNTRIES - number.value);
        }
        else createSectionsForCountries(NUMBER_OF_COUNTRIES, number.value - NUMBER_OF_COUNTRIES);
        NUMBER_OF_COUNTRIES = Number(number.value);
        getCountryInfo();
    }
}

function clearSections(count) {
    for (let i = NUMBER_OF_COUNTRIES - 1; count > 0; i--) {
        countryListSection.removeChild(countryArr[i]);
        countryArr.pop();
        count--;
    }
}

function createSectionsForCountries(i, count) {
    for (; count > 0; count--) {
        countryArr.push(document.createElement('section'));
        countryArr[i].className = 'country-info';
        countryArr[i].innerHTML = `<br>
            <div class="country-name"> </div>
            <div class="country-native-name">Native name: </div>
            <img class="country-flag"/>
            <div class="country-capital">Capital: </div>
            <div class="country-region">Region: </div>
            <div class="country-subregion">Subregion: </div>
            <div class="country-population">Population: </div>
            <div class="country-languages">Languages: </div>
            <br>`;
        countryListSection.appendChild(countryArr[i]);
        countryArr[i].appendChild(document.createElement('p'));
        i++;
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
                    .innerText = "Country name: " + countryData[i].name;
                countryArr[i].querySelector('.country-native-name')
                    .innerText = "Native name: " + countryData[i].nativeName;
                countryArr[i].querySelector('.country-capital')
                    .innerText = "Capital: " + countryData[i].capital;
                countryArr[i].querySelector('.country-region')
                    .innerText = "Region: " + countryData[i].region;
                countryArr[i].querySelector('.country-subregion')
                    .innerText = "Subregion: " + countryData[i].subregion;
                countryArr[i].querySelector('.country-population')
                    .innerText = "Population: " + countryData[i].population;
                countryArr[i].querySelector('.country-languages')
                    .innerText = "Language: " + countryData[i].languages.map(item => item['name']).join(', ');
                countryArr[i].querySelector('.country-flag')
                    .src = countryData[i].flag;
            }
        });
}
