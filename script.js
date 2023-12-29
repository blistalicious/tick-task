const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {

    const dueDate = document.getElementById("due-date").value;
    const taskText = inputBox.value.trim();
    const maxTasks = 10;
    const currentTasks = listContainer.getElementsByTagName("li").length;


    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    const characterLimit = 50;

    if (taskText.length > characterLimit) {
        alert(
            "Character limit exceeded! Please keep it within " +
                characterLimit +
                " characters."
        );
        return;
    }

    if (currentTasks >= maxTasks) {
        alert("Task limit of 10 reached. You cannot add more tasks.");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = taskText + (dueDate ? ` (Due: ${dueDate})` : "");
    listContainer.appendChild(li);
    document.getElementById("addSound").play();

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

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
            document.getElementById("deleteSound").play();
            saveData();
        }
    }
}, false);

inputBox.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

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