'use strict'
window.addEventListener('scroll', () => {
    document.querySelector('.modalWrapper').style.top = `${scrollY}` + 'px';
});


function openModal() {
    document.body.style.overflow = "hidden";

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
        document.body.style.overflow = "visible";
    })

    let backBlack = modalWindow.querySelector('.backBlack');

    backBlack.addEventListener('click', function () {
        modalWindow.classList.remove('active');
        document.body.style.overflow = "visible";
    })

}

// export default openModal;