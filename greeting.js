const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greeting");

const USERNAME_KEY = "currentUser",
    SHOWING_CN = "showing";
    const currentUser = localStorage.getItem(USERNAME_KEY);

function handleSubmit(event){
    event.preventDefault();
    const currentName = input.value;
    
    setUsername(currentName);
    paintGreeting(currentName);
    change.classList.add(SHOWING_BTN);
    
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);

}

function setUsername(text){
    localStorage.setItem(USERNAME_KEY, text);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    
    if (currentUser === null){
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();