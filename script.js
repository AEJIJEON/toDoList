
function handleMouseEnter(){
  const CLICKED_CLASS = "clicked";
  clockTitle.classList.toggle(CLICKED_CLASS);
  // if (title.classList.contains(CLICKED_CLASS)){
  //   title.classList.remove(CLICKED_CLASS)
  // } else{
  //   title.classList.add(CLICKED_CLASS)
  // }
}
function handleOnline(){
  console.log("connected.")
}

function handleOffline(){
  console.log("not connected.")
}

function init(){
clockTitle.addEventListener("mouseenter", handleMouseEnter);
}
init(); 



window.addEventListener("online", handleOnline);
window.addEventListener("offline", handleOffline);
