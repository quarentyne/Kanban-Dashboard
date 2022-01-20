'use strict'

function renderGetTime(minutes) {
    let hours = 0;
    while (minutes > 60) {
        hours++;
        minutes = minutes - 60;
    }
    return `Выполнено за ${hours} ч. ${minutes} мин.`
}

function getTime(time1, time2) {
    time1 = new Date(Date.parse(time1));
    time2 = new Date(Date.parse(time2));
    return renderGetTime(Math.round((time2 - time1) / 1000 / 60));
}
