const body = document.querySelector("body");
let percent = 0;
let imgNumber = 0;

function loadPercent(){
    if (numOfToDos !== 0){
        percent = numOfCheckedToDos / numOfToDos;
    } 
    handlePercent();
}

function updatePercent(){
    checkChangedOrNot_numOfCheckedToDos();
    checkChangedOrNot_numOfToDos();
    
    

}

// nums 값 하나라도 변경 시 -> percent값 바꿔주어야 함
// numOfChekedToDos 값 변경 detect
function checkChangedOrNot_numOfCheckedToDos(oldvalue) {
    undefined === oldvalue && (oldvalue = numOfCheckedToDos);
    clearcheck_1 = setInterval(repeatcheck,500,oldvalue);
    
    function repeatcheck(oldvalue) {
        
        if (numOfCheckedToDos !== oldvalue) {
            // do something

            if (numOfToDos !== 0){
                percent = numOfCheckedToDos / numOfToDos;
            } else{
                percent = 0;
            }
            // percent value changed -> action
            handlePercent();
            
            clearInterval(clearcheck_1);
            checkChangedOrNot_numOfCheckedToDos();
            
        }
    
    }
}

// numOfToDos 값 변경 detect
function checkChangedOrNot_numOfToDos(oldvalue) {
    undefined === oldvalue && (oldvalue = numOfToDos);
    clearcheck_2 = setInterval(repeatcheck,500,oldvalue);
    function repeatcheck(oldvalue) {
        
        if (numOfToDos !== oldvalue) {
            // do something
            if (numOfToDos !== 0){
                percent = numOfCheckedToDos / numOfToDos;
            } else{
                percent = 0;
            }
            // percent value changed -> action
            handlePercent();
            
            

            clearInterval(clearcheck_2);
            checkChangedOrNot_numOfToDos();
            
        }
    
    }
}

function handlePercent(){
    const image = body.querySelector("img");
    

    
    
    let imgNumber = 0;
    if (percent < 0.3){

        imgNumber = 1;
    } else if (percent < 0.6){
        imgNumber = 2;
    } else if (percent < 0.8){
        imgNumber = 3;
    } else{
        imgNumber = 4;
    }
    //reload 경우
    if (image === null){
        
        const image = document.createElement("img");
        image.src = `images/exp_${imgNumber}.png`
        body.prepend(image);
        image.classList.add("bgImage");

        // percent 값이 변경된 경우
    } else{
        //source값만 변경
        image.src = `images/exp_${imgNumber}.png`
        
            
        } 
    } 


function init(){
    loadPercent();
    updatePercent();
}

init();