let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearCompleted");

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompletedTasks);

renderTasks();

function addTask() {
    if (taskInput.value === "") return;

    let task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks.forEach(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });

    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        let text = document.createElement("span");
        text.textContent = task.text;

        if (task.completed) {
            text.style.textDecoration = "line-through";
        }

        text.addEventListener("dblclick", function() {
            let newText = prompt("Edit task", task.text);
            if (newText) {
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearCompletedTasks() {
    tasks = tasks.filter(function(task) {
        return task.completed === false;
    });

    saveTasks();
    renderTasks();
}