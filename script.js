const container = document.querySelector('.container');
const greetingIcon = document.querySelector('.icon-greeting img');
const greetingText = document.querySelector('.greeting-text');
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const timeOfDay = document.querySelector('.time-of-day');
const presentLocation = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const dayOfYear = document.querySelector('#day-of-year');
const weekDay = document.querySelector('#day-of-week');
const week = document.querySelector('#week');
const button = document.querySelector('.button');
const details = document.querySelector('.date-container');
const clock = document.querySelector('.clock-container');

const setTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let twelvehour = hours % 12;

    // Set Hours
    if (hours > 12) {
        hour.innerHTML = twelvehour;
    }
    hour.innerHTML = hours;

    // Set Minutes
    if (minutes < 10) {
        minute.innerHTML = `0${minutes}`;
    }
    else {
        minute.innerHTML = minutes;
    }

    // Set Time of Day
    hour.innerHTML >= 12 ? timeOfDay.innerHTML = "pm" : timeOfDay.innerHTML = "am";

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
    clock.classList.toggle('slide-up');
    details.classList.toggle('show');
}

button.addEventListener('click', transitionData);
