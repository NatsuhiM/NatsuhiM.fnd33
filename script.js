'use strict'
// 1行目に記載している 'use strict' は削除しないでください

document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("task");
    const deadlineInput = document.getElementById("deadline");
    const taskList = document.getElementById("taskList");
    const task = taskInput.value;
    const deadline = new Date(deadlineInput.value);
    const now = new Date();
    if (task && deadline) {
        const taskText = document.createElement("span");
        taskText.textContent = task;
        taskText.classList.add("task-text");
        const deadlineText = document.createElement("span");
        deadlineText.textContent = deadline.toLocaleString();
        deadlineText.classList.add("deadline-text");
        const listItem = document.createElement("li");
        listItem.appendChild(taskText);
        listItem.appendChild(deadlineText);
        const timeDiff = deadline - now;
        const fourDays = 4 * 24 * 60 * 60 * 1000;
        if (timeDiff < 0) {
            listItem.classList.add("red");
        } else if (timeDiff <= fourDays) {
            listItem.classList.add("orange");
        } else {
            listItem.classList.add("black");
        }
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "完了";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", function() {
            taskList.removeChild(listItem);
        });
        listItem.appendChild(completeBtn);
        taskList.appendChild(listItem);
        taskInput.value = "";
        deadlineInput.value = "";
    }
});
document.getElementById("saveTasksBtn").addEventListener("click", function() {
    const taskList = document.getElementById("taskList");
    const tasks = [];
    taskList.querySelectorAll("li").forEach(function(item) {
        const taskText = item.querySelector(".task-text").textContent;
        const deadlineText = item.querySelector(".deadline-text").textContent;
        tasks.push({ task: taskText, deadline: deadlineText });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
});
document.getElementById("loadTasksBtn").addEventListener("click", function() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function(task) {
            const listItem = document.createElement("li");
            const taskText = document.createElement("span");
            taskText.textContent = task.task;
            taskText.classList.add("task-text");
            const deadlineText = document.createElement("span");
            deadlineText.textContent = task.deadline;
            deadlineText.classList.add("deadline-text");
            listItem.appendChild(taskText);
            listItem.appendChild(deadlineText);
            
            // Add color coding based on deadline
            const deadline = new Date(task.deadline);
            const now = new Date();
            const timeDiff = deadline - now;
            const fourDays = 4 * 24 * 60 * 60 * 1000;
            if (timeDiff < 0) {
                listItem.classList.add("red");
            } else if (timeDiff <= fourDays) {
                listItem.classList.add("orange");
            } else {
                listItem.classList.add("black");
            }
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "完了";
            completeBtn.classList.add("complete-btn");
            completeBtn.addEventListener("click", function() {
                taskList.removeChild(listItem);
            });
            listItem.appendChild(completeBtn);
            taskList.appendChild(listItem);
        });
    }
});
document.getElementById("clearTasksBtn").addEventListener("click", function() {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
});
document.getElementById("sortTasksBtn").addEventListener("click", function() {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.querySelectorAll("li"));
    tasks.sort((a, b) => {
        const deadlineA = new Date(a.querySelector(".deadline-text").textContent);
        const deadlineB = new Date(b.querySelector(".deadline-text").textContent);
        return deadlineA - deadlineB;
    });
    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
});
