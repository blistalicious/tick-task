const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask () {

    const dueDate = document.getElementById("due-date").value;

    if(inputBox.value === '') {
        alert('You must write something!');
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value + (dueDate ? ` (Due: ${dueDate})` : "");
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    document.getElementById("due-date").value = "";
    saveData();
}    

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        let confirmation = confirm("Do you really want to remove this task?");
        
        if (confirmation) {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

function saveData () {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask () {
    listContainer.innerHTML = localStorage.getItem("data");
}

function removeTasks () {

    if (listContainer.children.length === 0) {
        alert("There are no tasks to be cleared!")
        return;
    }

    let confirmation = confirm("Do you really want to remove all the tasks?");

    if (confirmation) {
        listContainer.innerHTML = ""
        saveData();
    }
}


showTask();