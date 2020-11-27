const container = document.querySelector('.container');
const greetingIcon = document.querySelector('.icon-greeting img');
const greetingText = document.querySelector('.greeting-text');
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const timeOfDay = document.querySelector('.time-of-day');
const presentLocation = document.querySelector('.location');
const timeZone = document.querySelector('#timezone');
const dayOfYear = document.querySelector('#day-of-year');
const weekDay = document.querySelector('#day-of-week');
const week = document.querySelector('#week');
const button = document.querySelector('.button');
const details = document.querySelector('.date-container');
const clock = document.querySelector('.clock-container');
const moreText = document.querySelector('.more');
const lessText = document.querySelector('.less');
const arrowIcon = document.querySelector('.icon-arrow');

const setTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let twelvehour = hours % 12;

    // Set Hours
    if (hours > 12) {
        hour.innerHTML = twelvehour;
    }
    else {
        hour.innerHTML = hours;
    }

    // Set Minutes
    if (minutes < 10) {
        minute.innerHTML = `0${minutes}`;
    }
    else {
        minute.innerHTML = minutes;
    }

    // Set Time of Day
    hours >= 12 ? timeOfDay.innerHTML = "pm" : timeOfDay.innerHTML = "am";

    // Set Greeting 
    if (timeOfDay.innerHTML === "am") {
        greetingText.innerHTML = "good morning";
        greetingIcon.src = "images/icon-sun.svg";
        container.style.backgroundImage = "url('images/daytime.jpg')";
    }
    else {
        greetingText.innerHTML = "good evening";
        greetingIcon.src = "images/icon-moon.svg";
        container.style.backgroundImage = "url('images/night.jpg')";
    }
}

window.onload = () => setTime();

setInterval(setTime, 1000);

const transitionData = () => {
    moreText.classList.toggle('hide-text');
    lessText.classList.toggle('show-text');
    arrowIcon.classList.toggle('rotate');
    clock.classList.toggle('slide-up');
    details.classList.toggle('show');
}

button.addEventListener('click', transitionData);

const getDayAndWeekOfYear = day => {
    let currentTime = new Date(day.getTime());
    let firstDay = new Date(day.getFullYear(), 0, 1);

    // Set day number of the year
    const presentDay = Math.ceil((currentTime - firstDay + 1) / 86400000);
    dayOfYear.innerHTML = presentDay;

    // Set week number of the year
    const weekNumber = Math.ceil(presentDay / 7);
    week.innerHTML = weekNumber;
}

setInterval(() => { getDayAndWeekOfYear(new Date) }, 1000);

const getWeek = (day) => {
    if (day.getDay() === 0) {
        weekDay.innerHTML = 7;
    }
    else {
        weekDay.innerHTML = day.getDay();
    }
}

setInterval(() => { getWeek(new Date) }, 1000);

const getLocation = async () => {
    try {
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();

        // Set location and timezone
        const { city, country, timezone } = data;
        presentLocation.innerHTML = `In ${city}, ${country}`;
        timeZone.innerHTML = timezone;
    }
    catch (error) {
        presentLocation.innerHTML = "Location Data is Not Available";
        timeZone.innerHTML = "Data Not Available";
    }
}

window.onload = () => getLocation();