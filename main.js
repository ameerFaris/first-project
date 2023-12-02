
let todoList = [];

function addNote(event) {

    event.preventDefault();
    const taskBox = document.getElementById("taskBox");
    const timeBox = document.getElementById("timeBox");
    const titleBox = document.getElementById("titleBox");

    task = taskBox.value;
    time = timeBox.value;
    title = titleBox.value;

    taskBox.style.backgroundColor = "";
    timeBox.style.backgroundColor = "";
    titleBox.style.backgroundColor = "";

    if (!task) {
        taskBox.style.backgroundColor = "pink";
        alert("Missing Note!!");
        taskBox.focus();
        return;
    }
    if (!title) {
        titleBox.style.backgroundColor = "pink";
        alert("Missing Title!!");
        titleBox.focus();
        return;
    }
    if (!time) {
        timeBox.style.backgroundColor = "pink";
        alert("Missing Date And Time!!");
        timeBox.focus();
        return;
    }

    const todo = { task, time, title };
    todoList.push(todo);

    saveToStorage();
    displayList(true);

    taskBox.value = "";
    timeBox.value = "";
    titleBox.value = "";
}

function saveToStorage() {
    const json = JSON.stringify(todoList);
    localStorage.setItem("todoList", json)
}

function loadFromStorage() {
    const json = localStorage.getItem("todoList");
    todoList = json ? JSON.parse(json) : [];
}

function displayList(showAnimation = false) {
    const container = document.getElementById("container");

    let html = "";
    for (let i = 0; i < todoList.length; i++) {

        const time = new Date(todoList[i].time);
        html += `
         <div class="note ${showAnimation && i === todoList.length - 1 ? 'newNote' : ''}" >
            <div class="noteTitle">
                 ${todoList[i].title}
            </div>
           <div class="noteData">
               ${todoList[i].task}
           </div>
           <div class="localTime">
               ${time.toLocaleDateString()}
               <br>
               ${time.toLocaleTimeString()}
           </div>
              <button onclick="deleteMe(${i})" class="deleteButton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg></button>
       </div>
         `;
    }
    container.innerHTML = html;
}

function deleteMe(index) {
    setTimeout(() => {
        // delete the note from array
        todoList.splice(index, 1);
        //  save array back to storage
        saveToStorage();
        // display the updated array
        displayList();
    }, 300);
}

function loadTodoList() {
    setValidation();
    loadFromStorage();
    displayList();
}

function setValidation() {
    const timeBox = document.getElementById("timeBox");
    timeBox.setAttribute("min", getMinDate());
    
}

function getMinDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate().toString().padStart(2, 0)} 00:00:00`;
}