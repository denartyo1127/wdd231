
const WEATHER_API_KEY = '44f7260244a7d4c8714c0a7bf4769cfa';
const CITY_NAME = 'Bergenfield';
const LATITUDE = '40.925';
const LONGITUDE = '-74.004';

const weatherDisplay = document.getElementById('weather-display');

/**
 * Fetches current weather and a 3-day forecast from OpenWeatherMap API.
 * Uses latitude and longitude for more precise location.
 */
async function getWeatherData() {
    if (!weatherDisplay) {
        console.warn("Weather display element not found. Skipping weather data fetch.");
        return;
    }

    if (WEATHER_API_KEY === 'API KEY' || !WEATHER_API_KEY) {
        weatherDisplay.innerHTML = '<p>Please get an OpenWeatherMap API key and replace "YOUR_API_KEY" in weather.js to see weather data.</p>';
        console.error("OpenWeatherMap API key is missing or not replaced in weather.js.");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=imperial&appid=${WEATHER_API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=imperial&appid=${WEATHER_API_KEY}`;

    try {
        // Fetch current weather
        const currentResponse = await fetch(currentWeatherUrl);
        if (!currentResponse.ok) {
            throw new Error(`HTTP error! status: ${currentResponse.status} for current weather`);
        }
        const currentData = await currentResponse.json();

        // Fetch 3-day forecast
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error(`HTTP error! status: ${forecastResponse.status} for forecast`);
        }
        const forecastData = await forecastResponse.json();

        displayWeather(currentData, forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDisplay.innerHTML = '<p>Failed to load weather data. Please try again later.</p>';
    }
}

/**
 * Displays the current weather and a 3-day forecast.
 * @param {object} currentData - Current weather data from OpenWeatherMap.
 * @param {object} forecastData - Forecast data from OpenWeatherMap.
 */
function displayWeather(currentData, forecastData) {
    if (!weatherDisplay) return; // Exit if element doesn't exist

    const cityName = currentData.name;
    const currentTemp = Math.round(currentData.main.temp);
    const weatherDescription = currentData.weather[0].description;
    const weatherIcon = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;

    let forecastHtml = '';
    // Filter forecast data for 3 distinct days (around noon for better representation)
    const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));

    for (let i = 0; i < Math.min(3, dailyForecasts.length); i++) {
        const forecast = dailyForecasts[i];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const desc = forecast.weather[0].description;
        const icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

        forecastHtml += `
            <div class="forecast-day">
                <p>${day}</p>
                <img src="${icon}" alt="${desc}" width="40" height="40">
                <p>${temp}&deg;F</p>
            </div>
        `;
    }

    weatherDisplay.innerHTML = `
        <div class="current-weather">
            <h4>${cityName}</h4>
            <img src="${weatherIcon}" alt="${weatherDescription}" width="50" height="50">
            <p>${currentTemp}&deg;F - ${weatherDescription}</p>
        </div>
        <div class="forecast-container">
            ${forecastHtml}
        </div>
    `;
}

// Call the function to get weather data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getWeatherData);

