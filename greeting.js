const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greetings = document.querySelector(".js-greetings");
const USER_LS = "currentUserName";
const SHOWING_CN = "showing";

function saveUserName(text) {
  localStorage.setItem(USER_LS, text);
}

function submitHandler(event) {
  event.preventDefault();

  const inputValue = input.value;

  showGreeting(inputValue);

  saveUserName(inputValue);
}

function showGreeting(text) {
  greetings.innerText = `Привет, ${text}`;
  greetings.classList.add(SHOWING_CN);
  form.classList.remove(SHOWING_CN);
}

function askForUserName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", submitHandler);
}

function loadUserName() {
  const currentUserName = localStorage.getItem(USER_LS);
  if (currentUserName === null) {
    askForUserName();
  } else {
    showGreeting(currentUserName);
  }
}

function init() {
  loadUserName();
}

init();
