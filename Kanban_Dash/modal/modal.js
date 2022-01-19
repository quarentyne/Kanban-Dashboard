'use strict'

function openModal() {

    let modalWindow = document.querySelector('.modalWrapper');

    if (modalWindow.classList.contains("active")) {
        modalWindow.classList.remove('active');
    }
    else {
        modalWindow.classList.add('active');
    }

    let butAgree = modalWindow.querySelector('#agree');

    butAgree.addEventListener('click', function () {
        modalWindow.classList.remove('active');
    })

    let backBlack = modalWindow.querySelector('.backBlack');

    backBlack.addEventListener('click', function () {
        modalWindow.classList.remove('active');
    })

}
export { openModal };