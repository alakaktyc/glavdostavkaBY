//мобильное меню
const btnMenu = document.querySelector('.menu-btn');
btnMenu.addEventListener('click', function () {
    const mobileMenu = document.querySelector('.navigation-box');
    mobileMenu.classList.toggle('active')
});

//переключатель объём/габариты
const switchParameter = document.querySelector('.form__switch');
switchParameter.addEventListener('click', function (event) {
    let parameter = document.querySelectorAll('.form__switch span');
    let formParameters = document.querySelectorAll('.form__parameter');
    let turnParam = event.target;
    if (turnParam.textContent === 'Габариты') {
        parameter[0].classList.add('switch');
        parameter[1].classList.remove('switch');
        formParameters[0].classList.add('form__parameter--visible');
        formParameters[1].classList.remove('form__parameter--visible');
        console.log(turnParam.textContent)
    }
    if (turnParam.textContent === 'Объём') {
        parameter[1].classList.add('switch');
        parameter[0].classList.remove('switch');
        formParameters[1].classList.add('form__parameter--visible');
        formParameters[0].classList.remove('form__parameter--visible');
        console.log(turnParam.textContent)
    }
});

//Виджеты
const widgets = document.querySelector('.widgets-btn');
window.addEventListener('scroll', function () {
    let st = document.documentElement.scrollTop;
    if (window.innerWidth >= 1366) {
        if (st > 300) {
            widgets.classList.add('active')
        } else {
            widgets.classList.remove('active')
        }
    } else {
        widgets.classList.remove('active');
    }
});


//main slider
let slideIndex = 1;
let slideInterval = setInterval(showSlides, 3500);
const slides = document.querySelectorAll('.slide');
const blockControlSlides = document.querySelector('.main-slider__control');

function getListControls() {
    let listControls = [];
    for (let i = 1; i <= slides.length; i++) {
        let li = document.createElement('li');
        li.className = 'circle';
        listControls.push(li);
    }
    return listControls;
}

blockControlSlides.append(...getListControls());

const btnControlsSlider = document.querySelectorAll('.main-slider__control li');
for (let i = 0; i < btnControlsSlider.length; ++i) {
    btnControlsSlider[i].addEventListener('click', function () {
        clearInterval(slideInterval);
        currentSlide(slideIndex = i + 1);
        slideInterval = setInterval(showSlides, 3500);
    });
}

function showSlides(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].className = 'slide';
    }
    for (let i = 0; i < btnControlsSlider.length; i++) {
        btnControlsSlider[i].className = btnControlsSlider[i].className = 'circle';
    }
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].className = 'slide active';
    btnControlsSlider[slideIndex - 1].className = 'circle show';
    slideIndex++
}

for (let i = 0; i < slides.length; ++i) {
    slides[i].addEventListener('mouseenter', function () {
        clearInterval(slideInterval);
    });
    slides[i].addEventListener('mouseleave', function () {
        slideInterval = setInterval(showSlides, 3500);
    });
}

//swiper
const getUseZone = document.querySelector('.main-slider');
let touchstartX = 0;
let touchendX = 0;
getUseZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

getUseZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    handleMove();
}, false);

function handleMove() {
    if (touchendX <= touchstartX) {
        clearInterval(slideInterval);
        showSlides(slideIndex + 1);
        slideInterval = setInterval(showSlides, 3500);
    }
    if (touchendX >= touchstartX) {
        if (slideIndex === 2) {
            clearInterval(slideInterval);
            currentSlide(slides.length);
            slideInterval = setInterval(showSlides, 3500);
        } else {
            clearInterval(slideInterval);
            currentSlide(slideIndex - 2);
            slideInterval = setInterval(showSlides, 3500);
        }
    }
}

showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}


$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
            loop: true,
            responsiveClass: true,
            navText: [" ", " "],
            margin: 20,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                768: {
                    items: 2,
                },
                920: {
                    items: 3,
                },
                1280: {
                    items: 3,
                    nav: true
                }
            }
        }
    );

});



