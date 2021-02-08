const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber){
    const image = document.createElement("img");
    // image.src = `images/${imgNumber + 1}.jpg`
    image.src = `images/exp_${imgNumber + 1}.png`
    body.prepend(image);
    image.classList.add("bgImage");
}

function getRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);

    return number
}
function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();