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
const bigText = document.querySelectorAll('.big');
const smallText = document.querySelectorAll('.small');

const setTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let twelvehour = hours % 12;

    // Set Hours
    if (hours > 12) {
        hour.innerHTML = twelvehour;
    }
    else if (hours === 0) {
        hour.innerHTML = 12;
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
    if (hours >= 0 && hours <= 11) {
        greetingText.innerHTML = "good morning, ";
    }
    else if (hours >= 12 && hours < 16) {
        greetingText.innerHTML = "good afternoon, ";
    }
    else if (hours >= 16 && hours <= 21) {
        greetingText.innerHTML = "good evening, ";
    }
    else {
        greetingText.innerHTML = "good night, ";
    }

    // Set background
    if (hours >= 6 && hours <= 18) {
        greetingIcon.src = "images/icon-sun.svg";
        container.style.backgroundImage = "url('images/daytime.jpg')";
        details.style.background = "rgba(255, 255, 255, 0.8)";
        smallText.forEach(text => {
            text.classList.remove('smoke');
            text.classList.add('gray');
        });
        bigText.forEach(text => text.classList.add('black'));
    }
    else {
        greetingIcon.src = "images/icon-moon.svg";
        container.style.backgroundImage = "url('images/night.jpg')";
        details.style.background = "rgba(0, 0, 0, 0.6)";
        smallText.forEach(text => {
            text.classList.remove('gray');
            text.classList.add('smoke');
        });
        bigText.forEach(text => text.classList.remove('black'));
    }
}

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

const getWeek = (day) => {
    if (day.getDay() === 0) {
        weekDay.innerHTML = 7;
    }
    else {
        weekDay.innerHTML = day.getDay();
    }
}

const getLocation = async () => {
    try {
        const response = await fetch('https://ipapi.co/json');
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

window.onload = () => {
    getLocation();
    setTime();
}
setInterval(setTime, 1000);
setInterval(getLocation, 30000);
setInterval(() => { getDayAndWeekOfYear(new Date) }, 1000);
setInterval(() => { getWeek(new Date) }, 1000);
