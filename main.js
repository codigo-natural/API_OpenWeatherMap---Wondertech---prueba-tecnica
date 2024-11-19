const API_KEY = '473f00b7b109224c4299df6a47f240c4'
const API_URL = 'https://api.openweathermap.org'

// Utilities
const $ = (selector) => document.querySelector(selector)

// Elements
const $searchBtn = $('#searchButton')
const $cityInput = $('#cityInput')
const $cityName = $('#cityName')
const $weather = $('#weather')
const $temperature = $('#temperature')
const $error = $('#error')

$searchBtn.addEventListener('click', () => {
  const city = $cityInput.value
  if (city) {
    getWather(city)
  } else {
    showError('Please enter a city name')
  }
})

async function getWather(city) {
  const url = `${API_URL}/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`
  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      displayWeather(data)
    } else if (response.status === 404) {
      showError('City not found. Please try again.')
    } else {
      showError('An error occurred while fetching the weather data.')
    }
  } catch (error) {
    showError(
      'Failed to connect to the API. Please check your network connection.'
    )
  }
}

function displayWeather(data) {
  $cityName.textContent = data.name
  $weather.textContent = `Weather: ${data.weather[0].description}`
  $temperature.textContent = `Temperature: ${data.main.temp} °C`
  clearErr()
}

function showError(message) {
  $error.textContent = message
  $cityName.textContent = ''
  $weather.textContent = ''
  $temperature.textContent = ''
}

function clearErr() {
  $error.textContent = ''
}
