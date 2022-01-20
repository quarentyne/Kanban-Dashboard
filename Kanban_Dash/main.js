'use strict'

// import openModal from './modal/modal.js';

const btn = document.querySelector('#add-btn');
const input = document.querySelector('#input-form');
const todo = document.querySelector('#main-todo');
const done = document.querySelector('#main-done');
const inprocess = document.querySelector('#main-inprocess');
const go = document.getElementsByClassName('go');
const cancel = document.querySelector('.cancel');



let tasksTodo;
let tasksInprocess;
let tasksDone;

if (!localStorage.tasksTodo) {
    tasksTodo = [];
} else {
    tasksTodo = JSON.parse(localStorage.getItem('tasksTodo'));
}
if (!localStorage.tasksInprocess) {
    tasksInprocess = [];
} else {
    tasksInprocess = JSON.parse(localStorage.getItem('tasksInprocess'));
}
if (!localStorage.tasksDone) {
    tasksDone = [];
} else {
    tasksDone = JSON.parse(localStorage.getItem('tasksDone'));
}

function render(item) {
    if (item < 10) {
        return '0' + item;
    } else {
        return item;
    }
}

function timeVisible(date) {
    date = new Date(Date.parse(date));
    let h = date.getHours();
    let m = date.getMinutes();
    return (render(h) + ':' + render(m));
}

function time() {
    return new Date();
}

function Task(description, time) {
    this.description = description;
    this.time = time;
    this.status = 'todo';
}
function Inprocess(description) {
    this.description = description;
    this.time = time();
    this.status = 'inprocess';
}
function Done(description, timeBefore) {
    this.description = description;
    this.startTime = timeBefore;
    this.time = time();
    this.status = 'done';
}
const todoTemplate = (task, index) => {
    return `
    <div class="main-content__inside">
        <div class="inside__block">
            <div class="inside__text">
                ${task.description}
            </div>
            <div class="inside__time todo title-white">${timeVisible(task.time)}</div>
            </div>                   
            <div class="navigation">
                <img class="go" onclick="startTask(${index})" src="img/checkbox-svgrepo-com 1.svg" alt="" title="Приступить к выполнению">
                <img class="cancel" onclick="deleteTask('${task.status}', ${index})" src="img/x-circle-close-delete-svgrepo-com.svg" alt="" title="Удалить">
        </div>       
    </div>
    `
}

const inprocessTemplate = (task, index) => {
    return `
    <div class="main-content__inside">
        <div class="inside__block">
            <div class="inside__text">
                ${task.description}
            </div>
            <div class="inside__time inprocess title-white">${timeVisible(task.time)}</div>
            </div>                   
            <div class="navigation">
                <img class="go" onclick="endTask(${index})" src="img/checkbox-svgrepo-com 1.svg" alt="" title="Выполнено!">
                <img class="cancel" onclick="deleteTask('${task.status}', ${index})" src="img/x-circle-close-delete-svgrepo-com.svg" alt="" title="Удалить">
        </div>       
    </div>
    `
}
const doneTemplate = (task, index) => {
    return `
    <div class="main-content__inside">
        <div class="inside__block">
            <div class="inside__text">
                ${task.description}
            </div>
            <div class="inside__time done title-black">${timeVisible(task.time)}</div>
            <div class="inside__time done title-black">${getTime(task.startTime, task.time)}</div>
            </div>                   
            <div class="navigation">
                <img class="cancel" onclick="deleteTask('${task.status}', ${index})" src="img/x-circle-close-delete-svgrepo-com.svg" alt="" title="Удалить">
        </div>       
    </div>
    `
}
// const newTodo = () => {
//     console.log(todo.innerHTML);
//     todo.innerHTML += todoTemplate(tasksTodo[tasksTodo.length - 1], tasksTodo.length - 1, true);
// }
const fillTodo = () => {
    todo.innerHTML = '';
    if (tasksTodo.length > 0) {
        tasksTodo.forEach((item, index) => {
            todo.innerHTML += todoTemplate(item, index);
        })
    }
    // setTimeout(() => {
    //     const animation = document.getElementsByClassName('new');
    //     animation[0].classList.remove('new');
    // }, 500)
}

const fillInprocess = () => {
    inprocess.innerHTML = '';
    if (tasksInprocess.length > 0) {
        tasksInprocess.forEach((item, index) => {
            inprocess.innerHTML += inprocessTemplate(item, index);
        })
    }
}

const fillDone = () => {
    done.innerHTML = '';
    if (tasksDone.length > 0) {
        tasksDone.forEach((item, index) => {
            done.innerHTML += doneTemplate(item, index);
        })
    }
}

const updateLocal = () => {
    localStorage.setItem('tasksTodo', JSON.stringify(tasksTodo));
    localStorage.setItem('tasksInprocess', JSON.stringify(tasksInprocess));
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
}

btn.addEventListener('click', () => {
    if (input.value.trim()) {
        tasksTodo.push(new Task(input.value, time()));
        updateLocal();
        fillTodo();
        // newTodo();
    }
    input.value = "";
})

input.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        btn.click();
    }
});

function startTask(index) {
    if (tasksInprocess.length < 3) {
        let item = tasksTodo.splice(index, 1)
        tasksInprocess.push(new Inprocess(item[0].description))
        updateLocal();
        fillTodo();
        fillInprocess();
    } else {
        openModal();
    }
}
function endTask(index) {
    let item = tasksInprocess.splice(index, 1)
    tasksDone.push(new Done(item[0].description, item[0].time))
    updateLocal();
    fillInprocess();
    fillDone();
}

function deleteTask(status, index) {
    if (status === 'todo') {
        tasksTodo.splice(index, 1);
        updateLocal();
        fillTodo();
    } else if (status === 'inprocess') {
        tasksInprocess.splice(index, 1);
        updateLocal();
        fillInprocess();
    } else if (status === "done") {
        tasksDone.splice(index, 1);
        updateLocal();
        fillDone();
    }
}
fillTodo();
fillInprocess();
fillDone();






