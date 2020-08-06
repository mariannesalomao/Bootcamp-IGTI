/**
 * Abaixo as variáveis de estado da aplicação:
 * Estado da Aplicação (state)
 */

let tabCountries = null
let tabFavorites = null

let allCountries = []
let favoriteCountries = []

let countCountries = 0
let countFavorites = 0

let totalPopulationList = 0
let totalPopulationFavorites = 0

let numberFormat = null

/**
 * Construção do HTML com template string
 */
const renderCountryList = () => {
  let countriesHTML = '<div>'

  // Vc já extraiu todos os dados que deseja, agora vou percorrer esses dados, forEach()!
  allCountries.forEach(country => {
    const { name, flag, id, population, formattedPopulation } = country

    const countryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>

        <div>
          <img src="${flag}" alt="${name}"
        </div>

        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `
    countriesHTML += countryHTML
  })
  countriesHTML += '</div>'
  tabCountries.innerHTML = countriesHTML
}

/**
 * Implementação dos favoritos
 */
const renderFavorites = () => {
  let favoritesHTML = '<div>'

  favoriteCountries.forEach(country => {
    const { name, flag, id, population, formattedPopulation } = country

    const favoriteCountryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>

        <div>
          <img src="${flag}" alt="${name}"
        </div>

        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `

    favoritesHTML += favoriteCountryHTML

  })

  favoritesHTML += '</div>'
  tabFavorites.innerHTML = favoritesHTML
}

const renderSummary = () => {
  countCountries.textContent = allCountries.length
  countFavorites.textContent = favoriteCountries.length

  const totalPopulation = allCountries.reduce((acc, curr) => {
    return acc + curr.population
  }, 0)

  const totalFavorite = favoriteCountries.reduce((acc, curr) => {
    return acc + curr.population
  }, 0)

  totalPopulationList.textContent = formatNum(totalPopulation)
  totalPopulationFavorites.textContent = formatNum(totalFavorite)
}

const addToFavorites = (id) => {
  const countryToAdd = allCountries.find(button => button.id === id)
  favoriteCountries = [...favoriteCountries, countryToAdd] // Ele traz todo mundo e concatena com os q vc adicionar
  favoriteCountries.sort((a, b) => a.name.localeCompare(b.name))

  allCountries = allCountries.filter(country => country.id !== id)
  render()
}

const removeFromFavorites = (id) => {
  const countryToRemove = favoriteCountries.find(button => button.id === id)
  allCountries = [...allCountries, countryToRemove] // Ele traz todo mundo e concatena com os q vc adicionar
  allCountries.sort((a, b) => a.name.localeCompare(b.name))

  favoriteCountries = favoriteCountries.filter(country => country.id !== id)
  render()
}

const formatNum = (number) => {
  return numberFormat.format(number)
}

/**
 * Implementação com querySelectorAll e forEach, adicionando listener nos botões passando button.id
 */
const handleCountryButtons = () => {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'))
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'))

  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id))
  })

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id))
  })
}

/**
 * Implementação da função render(), com invocação a funções menores:
 * renderCountryList();
 * renderFavorites();
 * renderSummary();
 * handleCountryButtons().
 */
const render = () => {
  renderCountryList()
  renderFavorites()
  renderSummary()
  handleCountryButtons()
}

/**
 * Implementação da função que vai buscar na API https://restcountries.eu/rest/v2/all e transformar para obtenção de
 * id, name, population e flag.
 * Ao final invoca render()
 * Precisa pegar e depois transformar para obter id, name, population e flag = MAP()!
 * Transformar para obter = map()!
 */
const fetchCountries = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const json = await res.json()

  // allCountries = json.map(country => {
  //   return {
  //     id: country.numericCode, // country tá repetitivo, faz por destructuring
  //     name: country.translations.br,
  //     population: country.population,
  //     flag: country.flag
  //   }
  // })

  // No destructuring, vc coloca no objeto os atributos que vc quer extrair, tem que ser iguais a API q vc tá extraindo
  allCountries = json.map(country => {
    const { numericCode: id, translations, population, flag } = country
    return {
      id,
      name: translations.br,
      population,
      formattedPopulation: formatNum(population), // Máscara
      flag
    }
  })
  render()
}

/**
 * Implementação do método start(), como função anônima, com mapeamento de elementos do DOM e invocação â função
 * fetchCountries()
 */
window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries')
  tabFavorites = document.querySelector('#tabFavorites')

  countCountries = document.querySelector('#countCountries')
  countFavorites = document.querySelector('#countFavorites')

  totalPopulationList = document.querySelector('#totalPopulationList')
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites')

  numberFormat = Intl.NumberFormat('pt-BR')

  fetchCountries()
})