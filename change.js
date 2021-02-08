const change = document.querySelector(".js-change");

const SHOWING_BTN = "showing"
function putButton(){
    
    
    if(currentUser !== null){
        change.classList.add(SHOWING_BTN);
    }
}

function removeUsername(){
    localStorage.removeItem(USERNAME_KEY);
}

function handleClickButton(event){
    event.preventDefault();
    greeting.classList.remove(SHOWING_CN);
    change.classList.remove(SHOWING_BTN);
    removeUsername();
    askForName();
}

function init(){
putButton();
change.addEventListener("click", handleClickButton);
}

init();