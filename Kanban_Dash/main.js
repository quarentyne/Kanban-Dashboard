'use strict'

// import openModal from './modal/modal.js';

const btn = document.querySelector('#add-btn');
const input = document.querySelector('#input-form');
const todo = document.querySelector('#main-todo');
const done = document.querySelector('#main-done');
const inprocess = document.querySelector('#main-inprocess');
const go = document.getElementsByClassName('go');
const cancel = document.querySelector('.cancel');
const changer = document.querySelector('.pencil');
const GOSVG = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66667 3.5H23.3333C23.6428 3.5 23.9395 3.62292 24.1583 3.84171C24.3771 4.0605 24.5 4.35725 24.5 4.66667V23.3333C24.5 23.6428 24.3771 23.9395 24.1583 24.1583C23.9395 24.3771 23.6428 24.5 23.3333 24.5H4.66667C4.35725 24.5 4.0605 24.3771 3.84171 24.1583C3.62292 23.9395 3.5 23.6428 3.5 23.3333V4.66667C3.5 4.35725 3.62292 4.0605 3.84171 3.84171C4.0605 3.62292 4.35725 3.5 4.66667 3.5ZM5.83333 5.83333V22.1667H22.1667V5.83333H5.83333ZM12.8368 18.6667L7.88667 13.7165L9.53633 12.0668L12.8368 15.3673L19.4355 8.7675L21.0863 10.4172L12.8368 18.6667Z" fill="#008000"/>
</svg>`;
const CANCELSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12L16 16M16 8L12 12L16 8ZM12 12L8 16L12 12ZM12 12L8 8L12 12Z" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const PENCIL = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,61.568627%,28.627451%);fill-opacity:1;" d="M 18.433594 10.015625 L 6.675781 21.773438 L 4.082031 19.917969 L 16.210938 7.046875 Z M 18.433594 10.015625 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,80%,45.882353%);fill-opacity:1;" d="M 16.582031 7.417969 L 4.082031 19.917969 L 2.226562 17.324219 L 13.984375 5.5625 Z M 16.582031 7.417969 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(74.117647%,8.235294%,8.235294%);fill-opacity:1;" d="M 24 4.453125 L 20.660156 7.789062 L 17.695312 5.5625 L 21.773438 2.226562 Z M 24 4.453125 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(94.901961%,28.235294%,29.411765%);fill-opacity:1;" d="M 21.773438 2.226562 L 18.066406 5.933594 L 16.210938 3.339844 L 19.546875 0 Z M 21.773438 2.226562 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(3.137255%,16.078431%,27.843137%);fill-opacity:1;" d="M 20.660156 7.789062 L 18.433594 10.015625 L 13.984375 5.5625 L 16.210938 3.339844 Z M 20.660156 7.789062 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(3.137255%,16.078431%,27.843137%);fill-opacity:1;" d="M 3.339844 22.886719 L 0 24 L 1.113281 20.660156 L 2.96875 21.03125 Z M 3.339844 22.886719 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(94.901961%,92.156863%,85.098039%);fill-opacity:1;" d="M 2.226562 17.324219 L 1.113281 20.660156 L 3.339844 22.886719 L 6.675781 21.773438 Z M 2.226562 17.324219 "/>
</g>
</svg>`;


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
                <button class="pencil" onclick="changeTask('${task.description}','${task.status}', ${index})" title="Редактировать">${PENCIL}</button>
                <button class="go" onclick="startTask(${index})" title="Приступить к выполнению">${GOSVG}</button>
                <button class="cancel" onclick="deleteTask('${task.status}', ${index})" title="Удалить">${CANCELSVG}</button>
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
                <button class="pencil" onclick="changeTask('${task.description}','${task.status}', ${index})" title="Редактировать">${PENCIL}</button>
                <button class="go" onclick="endTask(${index})" title="Выполнено!">${GOSVG}</button>
                <button class="cancel" onclick="deleteTask('${task.status}', ${index})" title="Удалить">${CANCELSVG}</button>
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
                <button class="cancel" onclick="deleteTask('${task.status}', ${index})" title="Удалить">${CANCELSVG}</button>
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
function changeTask(text, status, index) {
    let localArray;
    if (status === 'todo') {
        status = todo;
        localArray = tasksTodo;
    } else if (status === 'inprocess') {
        status = inprocess;
        localArray = tasksInprocess;
    }
    let textInside = status.querySelectorAll('.inside__text');
    textInside[index].innerHTML = `<textarea id="textarea">${text}</textarea><p class="textarea__help">Нажмите <span>ESC</span> для отмены</p>`;
    const element = document.getElementById('textarea');
    element.focus();
    element.selectionStart = element.value.length;
    element.addEventListener('blur', () => {
        while (element.value.endsWith('\n')) {
            let lastIndex = element.value.lastIndexOf('\n');
            element.value = element.value.slice(0, lastIndex);

        } while (element.value.startsWith('\n')) {
            let first = element.value.indexOf('\n');
            element.value = element.value.slice(first + 1);
            console.log(element.value);
        }
        localArray[index].description = element.value;
        updateLocal();
        fillTodo();
        fillInprocess();
    })
    element.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
            element.value = localArray[index].description;
            element.blur();
        }
    })
}
fillTodo();
fillInprocess();
fillDone();