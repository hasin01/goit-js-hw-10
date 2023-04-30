import './css/styles.css';
import { fetchCountries } from '/src/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';



const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const onCountryFormInput = event => {
  const countryName = searchBox.value.trim();
  if (!countryName) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        countryListFoo(data);
      } else if (data.length === 1) {
        countryInfoFoo(data);
      }
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
};

function countryListFoo(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
        <b>${country.name.official}</p>
      </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}

function countryInfoFoo(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
        <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
      </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
  countryList.innerHTML = '';
}

searchBox.addEventListener(
  'input',
  debounce(() => {
    onCountryFormInput();
  }, DEBOUNCE_DELAY)
);