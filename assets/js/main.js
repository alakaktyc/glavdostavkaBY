const btnMenu = document.querySelector('.menu-btn');
btnMenu.addEventListener('click', function () {
    const mobileMenu = document.querySelector('.navigation-box');
    mobileMenu.classList.toggle('active')
});

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


const widgets = document.querySelector('.widgets-btn');
window.addEventListener('scroll', function () {
    let st = document.documentElement.scrollTop;
    if (window.innerWidth >= 720) {
        if (st > 300) {
            widgets.classList.add('active')
        } else {
            widgets.classList.remove('active')
        }
    } else {
        widgets.classList.remove('active');
    }
});


$(document).ready(function(){
    $('.news__slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        initialSlide: 3,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});


