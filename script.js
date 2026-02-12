// all columns vaiables
/*
let columns = document.querySelectorAll(".taskcolumn");
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
// all tasks variables
let dragelement = null;
let tasksdata = {};
const tasks = document.querySelectorAll(".task");
// create task
//on reloading data is not removed 
if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            const tasktitle = document.querySelector("#task-title").value;
            const taskdescription = document.querySelector("#task-description").value;
            const div = document.createElement("div");
            div.classList.add("task");
            div.setAttribute("draggable", "true");
            div.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.desc}</p>
            <button>Delete</button>`;
            column.appendChild(div);
            div.addEventListener("dragstart", () => {
                dragelement = div;
            });
        })

    }
}
////////moving/dragging logic///////////

// for all task that are added by user
tasks.forEach(task => {
    task.addEventListener("dragstart",() => {
        dragelement = task;
    });
});
// universal counter function
function updatecounts() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        tasksdata[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasksdata));
        count.innerText = tasks.length;
    });
};
// 
function handleDrop(column) {
    return function (e) {
        e.preventDefault();
        if (!dragelement) return; 
        column.appendChild(dragelement);
        column.classList.remove("hoverover");
        updatecounts();
    };
}
// todo 
todo.addEventListener("dragenter", (e) => {
    todo.classList.add("hoverover");
});
todo.addEventListener("dragleave", (e) => {
    todo.classList.remove("hoverover");
});
todo.addEventListener("dragover", (e) => {
    e.preventDefault();
});
todo.addEventListener("drop",handleDrop(todo));

// progress ////////////
progress.addEventListener("dragenter", (e) => {
    progress.classList.add("hoverover");
});
progress.addEventListener("dragleave", (e) => {
    progress.classList.remove("hoverover");
});
progress.addEventListener("dragover", (e) => {
    e.preventDefault();
});
progress.addEventListener("drop",handleDrop(progress));
// 
// done/////////////
done.addEventListener("dragenter", (e) => {
    done.classList.add("hoverover");
});
done.addEventListener("dragleave", (e) => {
    done.classList.remove("hoverover");
});
done.addEventListener("dragover", (e) => {
    e.preventDefault();
});
done.addEventListener("drop",handleDrop(done));
// /////////modal settings/////////////////
const togglemodalbtn = document.querySelector("#togglemodal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
const addtaskbutton = document.querySelector(".add-taskbtn");

// modal active and unactive
togglemodalbtn.addEventListener("click", function () {
    modal.classList.toggle("active");
});
modalbg.addEventListener("click", function () {
    modal.classList.remove("active");
});
// add task buttons
addtaskbutton.addEventListener("click", function () {
    const tasktitle = document.querySelector("#task-title").value;
    const taskdescription = document.querySelector("#task-description").value;
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
    <h2>${tasktitle}</h2>
    <p>${taskdescription}</p>
    <button>Delete</button>`;
    todo.appendChild(div);
    div.addEventListener("dragstart", () => {
        dragelement = div;
    })
    modal.classList.remove("active");
    updatecounts();
});
*/

// new code with same logic conversion of old to new code with chatgpt

// ========== SELECT ELEMENTS ==========
const columns = document.querySelectorAll(".taskcolumn");
const todo = document.querySelector("#todo");
const modal = document.querySelector(".modal");
const togglemodalbtn = document.querySelector("#togglemodal");
const modalbg = document.querySelector(".modal .bg");
const addtaskbutton = document.querySelector(".add-taskbtn");

let dragelement = null;
let tasksdata = {};

// ========== CREATE TASK ==========
function createTask(title, desc) {
    const div = document.createElement("div");
    div.className = "task";
    div.draggable = true;

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `;

    div.addEventListener("dragstart", () => {
        dragelement = div;
    });

    const delBtn = div.querySelector("button");
    delBtn.addEventListener("click", () => {
        div.remove();
        saveTasks();
    });
    return div;
}

// ========== SAVE TASKS ==========
function saveTasks() {
    tasksdata = {};

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksdata[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));

        count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksdata));
}

// ========== LOAD TASKS ==========
function loadTasks() {
    const data = JSON.parse(localStorage.getItem("tasks")) || {};

    for (const col in data) {
        const column = document.getElementById(col);

        data[col].forEach(task => {
            column.appendChild(createTask(task.title, task.desc));
        });
    }

    saveTasks();
}

// ========== DRAG & DROP ==========
columns.forEach(column => {
    column.addEventListener("dragover", e => e.preventDefault());

    column.addEventListener("drop", () => {
        if (!dragelement) return;
        column.appendChild(dragelement);
        saveTasks();
    });
});

// ========== MODAL ==========
togglemodalbtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});
modalbg.addEventListener("click", () => {
    modal.classList.remove("active");
});

// ========== ADD TASK ==========
addtaskbutton.addEventListener("click", () => {
    const title = document.querySelector("#task-title").value;
    const desc = document.querySelector("#task-description").value;

    todo.appendChild(createTask(title, desc));
    modal.classList.remove("active");
    saveTasks();
    document.querySelector("#task-title").value="";
    document.querySelector("#task-description").value="";
});

// ========== START ==========
loadTasks();
