const toDoForm = document.querySelector(".js-toDoForm"),

toDoInput = toDoForm.querySelector("input"),

toDoList = document.querySelector(".js-toDoList");
const deleteAll = toDoForm.children[1];
const TODO_LS = "toDos";


const CHECK_LS = "checkedIds";
let toDos = []
// 새로 들어온 todo id에 사용가능한 숫자들 담는 list
let deletedToDoId = []
// 리로드 하기 위해
let checkedIds = []

// 전체 todo 개수랑 checkbox 표시된 todo 수 
let numOfToDos = 0
let numOfCheckedToDos = 0

// filtering checkedIds when being unchecked or checked todo is deleted  
const cleanCheckedIds = checkedIds.filter(function(checkedIds){
    return checkedIds !== chkId;
});



function saveToDos(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function saveCheckedIds(){
    localStorage.setItem(CHECK_LS, JSON.stringify(checkedIds));
}

function deleteToDo(event){
    

    const btn = event.target;
    
    const li = btn.parentNode;
    
    // deliting checked todo list -> numOfcheckedToDos is decreased by 1
    const checkB = li.childNodes[1];
    const chkId = parseInt(li.id)

    if (checkB.checked){
        numOfCheckedToDos -= 1
        const cleanCheckedIds = checkedIds.filter(function(checkedIds){
            return checkedIds !== chkId;
        });

        checkedIds = cleanCheckedIds;

        saveCheckedIds();
    }
    
    // 삭제될 li id 담기
    deletedToDoId.push(chkId);
    
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDos){
        return toDos.id !== chkId;
    });
    toDos = cleanToDos;
        saveToDos();
    
    numOfToDos -= 1;

}
// 체크박스 클릭 시 호출되는 함수
function handleCheckBox(event){
    event.preventDefault();
    const checkParent = this.parentNode;
    
    const chkId = parseInt(checkParent.id);
    
    
      
    

    if (this.checked){
        numOfCheckedToDos += 1;
        checkedIds.push(chkId);
    } else{
        numOfCheckedToDos -= 1;

        const cleanCheckedIds = checkedIds.filter(function(checkedIds){
            return checkedIds !== chkId;
        });
        checkedIds = cleanCheckedIds;

    }
    
    saveCheckedIds();  
}

function paintToDo(text, originalId){

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    // checkbox 추가
    const checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("addMargin");

    // listener 추가
    checkBox.addEventListener("change", handleCheckBox);

    const span = document.createElement("span");
    let newId = 0
    delBtn.innerText = "delete";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(checkBox)
    li.appendChild(delBtn);
    toDoList.append(li);
    toDoList.appendChild(li);

    // reload의 경우
    if (originalId !== -1){
        li.id = originalId;

    }
    // 다순히 todo 추가하는 경우 -> li 에 new id 부여
    else{
        if (deletedToDoId.length === 0){
            newId = toDos.length + 1;
            
        } else{
            newId = deletedToDoId.shift();
        }

        li.id = newId;
    
        const toDoObj = {
            text: text,
            id: newId
        }
        toDos.push(toDoObj);
        saveToDos();
    
        numOfToDos += 1;
    }
    





}

function handleSubmit(event){
    
    event.preventDefault();
    const currentValue = toDoInput.value;

    // username 변경 시 empty string이 todo list에 추가되지 않도록 조건문 추가
    if (currentValue !== ""){
        toDoInput.value = "";
        paintToDo(currentValue, -1);
    }
    
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODO_LS);
   
    const loadCheck = localStorage.getItem(CHECK_LS);
    
    if (loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        
        numOfToDos = parsedToDos.length;
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text, toDo.id);
        });
    }
    if (loadCheck !== null){
        const parsedCheck = JSON.parse(loadCheck);
        
        
        numOfCheckedToDos = parsedCheck.length;
        parsedCheck.forEach(function(chkId){
            const chkIdNode = document.getElementById(chkId);
            const chkNode = chkIdNode.childNodes[1];
            chkNode.checked = true;
            checkedIds.push(chkId);

            
        });
    }
}

function handleDeleteAll(event){
    event.preventDefault();
    //reference
    const itemList = toDoList.children;
    
    const leng = itemList.length;
    for (var i = 0; i < leng; i++){
        
        //삭제되면 두번째 child가 맨 앞으로 위치 -> 0번 제거
        const li = itemList[0]
        
        toDoList.removeChild(li);
        deletedToDoId.push(li.id);
    }
    
    numOfToDos = 0
    numOfCheckedToDos = 0
    toDos = []
    checkedIds = []

    //local storage 비우기
    localStorage.setItem(TODO_LS, JSON.stringify([]));
    localStorage.setItem(CHECK_LS, JSON.stringify([]));


    
}



function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    
    deleteAll.addEventListener("click", handleDeleteAll);
}

init();
