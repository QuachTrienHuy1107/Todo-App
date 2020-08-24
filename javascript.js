//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById('date');
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes Name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Show todays date
const options = {weekday: "long", month: "short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//variables
let LIST , id;

//get items from localStorage
let data = localStorage.getItem("TODO");

//Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user's interface
}else{
    //if data is empty
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addTodo(item.name, item.id, item.DONE, item.trash);
    });
}

//clear localStorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Add todo function
function addTodo(toDo, id, done, trash){
    if(trash) {return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
                <li class="item"> 
                    <i class="fa ${DONE} complete " job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p> 
                    <i class="de fa fa-trash-o delete " job="delete" id="${id}"></i>
                </li>            
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//Add an item to the list that user press the enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        //If the input isn't empty
        if(toDo) {
            addTodo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //Add item to localstorage (this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//complete to do
function completeTodo (element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to do
function removeTodo (element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeTodo(element);
    }
    else if(elementJob == "delete"){
        removeTodo(element);
    }
    //Add item to localStorage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

