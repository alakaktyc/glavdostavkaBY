//calculator
const formCalculate = document.querySelector('.calculator-widget');
let arrayLocation = [];

function getLocal(cb) {
    const oReq = new XMLHttpRequest();
    oReq.open("GET", 'assets/json/loc.json', true);
    oReq.addEventListener('load', () => {
        let locationArr = JSON.parse(oReq.responseText);
        console.log(locationArr);
        cb(locationArr);
    });
    oReq.addEventListener('error', () => {
        console.log('error');
    });
    oReq.send();
}

let cityFrom = document.querySelector('#cityFrom');
let cityTo = document.querySelector('#cityTo');

function replaceCity() {
    this.value = this.value.replace(/[^а-яА-Я., ]/, '');
}

cityFrom.addEventListener('input', replaceCity);
cityTo.addEventListener('input', replaceCity);

ymaps.ready(autocomplete);

function autocomplete() {
    cityFrom = new ymaps.SuggestView('cityFrom', {provider: provider, results: 5});
    cityTo = new ymaps.SuggestView('cityTo', {provider: provider, results: 5});
    cityFrom.events.add('select', function (event) {
        calcCost();
        console.log(event.get('item').value);
    });
    cityTo.events.add('select', function (event) {
        calcCost();
        console.log(event.get('item').value);
    });
}

const swapCity = document.querySelector('.calculator__swap');
swapCity.addEventListener('click', function (event) {
    event.preventDefault();
    let cityFromVal = document.querySelector('#cityFrom');
    let cityToVal = document.querySelector('#cityTo');
    let temp = cityFromVal.value;
    cityFromVal.value = cityToVal.value;
    cityToVal.value = temp;
});


//добавление груза
const cargoBox = document.querySelector('.form__cargo-box');
let numbers = 0;

let switchParameter = document.querySelectorAll('.js-switcher');


let weightInput = document.querySelectorAll('input[name="weight"]');

let inputsNumber = document.querySelectorAll('.js-number');


let inputsFormCalc = formCalculate.querySelectorAll('.js-calculate');



function addCargo() {
    const template = document.querySelector('#sample').content;
    let copyHTML = document.importNode(template, true);
    cargoBox.appendChild(copyHTML);
}

cargoBox.addEventListener('click', function (event) {
    let target = event.target;
    if (target.classList.contains('controls-cargo__btn-plus')) {
        addCargo();
        switchParameter = document.querySelectorAll('.js-switcher');
        quantity = document.querySelectorAll('.quantity');
        quantityNum = document.querySelectorAll('.calculator__dimensions-quantity');
        weightInput = document.querySelectorAll('input[name="weight"]');
        inputsNumber = document.querySelectorAll('.js-number');
        inputsFormCalc = formCalculate.querySelectorAll('.js-calculate');
        getNumbersElement();
    }

    let formCargo = document.querySelectorAll('.form__cargo');
    for (let i = 0; i < formCargo.length; i++) {
        formCargo = document.querySelectorAll('.form__cargo');
        formCargo[i].addEventListener('click', function (event) {
            let target = event.target;
            formCargo = document.querySelectorAll('.form__cargo');
            if (target.classList.contains('controls-cargo__btn-minus') && formCargo.length > 1) {
                this.remove();
                switchParameter = document.querySelectorAll('.js-switcher');
                quantity = document.querySelectorAll('.quantity');
                quantityNum = document.querySelectorAll('.calculator__dimensions-quantity');
                weightInput = document.querySelectorAll('input[name="weight"]');
                inputsNumber = document.querySelectorAll('.js-number');
                inputsFormCalc = formCalculate.querySelectorAll('.js-calculate');
                getNumbersElement();
            }

        })

    }


    if (target.classList.contains('btn-arrow--right')) {
        quantityNum[numbers].value++;
    }

    if (target.classList.contains('btn-arrow--left')) {
        if (quantityNum[numbers].value > 1) {
            quantityNum[numbers].value--;
        }

    }


//переключатель габаритов и объёма

    if (target.textContent === 'Объём') {
        switchToVolume();
        target.click();
    }
    if (target.textContent === 'Габариты') {
        switchToDimensions();
        target.click();
    }

//запись цифрами и замена запятой на точку
    if (target.classList.contains('js-number')) {
        for (let i = 0; i < inputsNumber.length; i++) {
            inputsNumber[i].addEventListener('input', replaceToNum)
        }
    }

//очистка полей
    if (target.classList.contains('js-calculate')) {
        for (let i = 0; i < inputsFormCalc.length; ++i) {
            inputsFormCalc[i].addEventListener('focus', function () {
                this.value = '';
            })
        }
    }


});

for (let i = 0; i < weightInput.length; i++) {
    weightInput[i].addEventListener('input', replaceToNum);
}


function replaceToNum() {
    this.value = this.value.replace(/,/, '.').replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, '$1');
}

function switchToVolume() {
    for (let i = 0; i < switchParameter.length; i++) {
        switchParameter[i].addEventListener('click', function () {
            let parameter = this.querySelectorAll('.form__switch span');
            let formParameters = this.querySelectorAll('.form__sizes');
            parameter[1].classList.add('switch');
            parameter[0].classList.remove('switch');
            formParameters[1].classList.add('form__sizes--visible');
            formParameters[0].classList.remove('form__sizes--visible');
        });
    }
}

function switchToDimensions() {
    for (let i = 0; i < switchParameter.length; i++) {
        switchParameter[i].addEventListener('click', function () {
            let parameter = this.querySelectorAll('.form__switch span');
            let formParameters = this.querySelectorAll('.form__sizes');
            parameter[0].classList.add('switch');
            parameter[1].classList.remove('switch');
            formParameters[0].classList.add('form__sizes--visible');
            formParameters[1].classList.remove('form__sizes--visible');
        });
    }
}


let quantity = document.querySelectorAll('.quantity');
let quantityNum = document.querySelectorAll('.calculator__dimensions-quantity');

function getNumbersElement() {
    for (let i = 0; i < quantity.length; i++) {
        quantity[i].addEventListener('click', function (event) {
            quantity = document.querySelectorAll('.quantity');
            let current = event.currentTarget;
            let n = quantity.length;
            while (n--) {
                if (quantity[n] === current) {
                    numbers = n;
                    break
                }
            }
        });
    }
}


const dimensions = document.querySelectorAll('input[name="dimensions"]');
const volumeInput = document.querySelector('input[name="volume"]');
for (let i = 0; i < dimensions.length; i++) {
    dimensions[i].addEventListener('focus', function () {
    });
    dimensions[i].addEventListener('focus', function () {
        volumeInput.value = dimensions[0].value * dimensions[1].value * dimensions[2].value;
    });
    dimensions[i].addEventListener('blur', function () {
        volumeInput.value = dimensions[0].value * dimensions[1].value * dimensions[2].value;
    });
    dimensions[i].addEventListener('input', function () {
        volumeInput.value = dimensions[0].value * dimensions[1].value * dimensions[2].value;
    });
}


const volumeDimInputs = document.querySelectorAll('.module__data--switching input');
for (let i = 0; i < volumeDimInputs.length; ++i) {
    volumeDimInputs[i].addEventListener('input', replaceToNum)
}


//правильный формат даты
function getDates(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month
    }
    let year = date.getFullYear();
    return date = year + "-" + month + "-" + day;
}


let cost = document.querySelector('.price-box__total');
let message = document.querySelector('.price-box__message');
let customerDelivery = document.querySelector('.calculator__сustomer-delivery');

let dateDownload = document.querySelector('.calculator__date-download');
let dateDelivery = document.querySelector('.calculator__date-delivery');

let enabledDays = [];
dates();
let myDatepicker = $('.datepicker-here').datepicker().data('datepicker');

function dates() {
    $('.datepicker-here').datepicker({
        minDate: new Date(),
        position: "top left",
        dateFormat: 'dd-mm-yyyy',
        onRenderCell: function (date, cellType) {
            if (cellType == 'day') {
                let cd = getDates(date),
                    isDisabled = enabledDays.indexOf(cd) == -1;
                //console.log(isDisabled);
                return {
                    disabled: isDisabled
                }
            }
        },
        onSelect: function (formattedDate) {
            console.log(formattedDate);
            myDatepicker.hide();
            parseCost(array);
        }
    });
}


function parseCost(array) {


    let cityFromVal = document.querySelector('#cityFrom').value;
    let cityToVal = document.querySelector('#cityTo').value;

    let codeFrom;
    let codeTo;

    for (let item of array) {
        if (cityFromVal.trim() === item.location) {
            codeFrom = item.code;
        }
        if (cityToVal.trim() === item.location) {
            codeTo = item.code
        }
    }

    let request = new XMLHttpRequest();
    let formData = new FormData;

    if (typeof codeTo === 'number' && typeof codeFrom === 'number') {


        formData.append('Date_download', dateDownload.value.split('-').reverse().join('-'));

        formData.append('Description', '');
        formData.append('Departure', codeFrom);
        formData.append('Destination', codeTo);
        formData.append('Dimensions_one_place', true);
        formData.append('Oversized', false);
        formData.append('Customer_delivery', customerDelivery.checked);

        
        formData.append('Number_Packages', quantityPlace.value);



        if (weightInput.value === '') {
            formData.append('Weight', 0);
        } else {
            formData.append('Weight', weightInput.value);
        }

        if (volumeInput.value === '') {
            formData.append('Volume', 0);
        } else {
            formData.append('Volume', volumeInput.value);
        }

        if (dimensions[0].value === '') {
            formData.append('Length', 0);
        } else {
            formData.append('Length', dimensions[0].value);
        }

        if (dimensions[1].value === '') {
            formData.append('Width', 0);
        } else {
            formData.append('Width', dimensions[1].value);
        }

        if (dimensions[2].value === '') {
            formData.append('Height', 0);
        } else {
            formData.append('Height', dimensions[2].value);
        }


        request.open('POST', 'https://glavdostavka.by/belarus/assets/php/calc.php', true);
        request.addEventListener('readystatechange', function () {
            if ((request.readyState === 4) && (request.status === 200)) {
                let parseRequest = JSON.parse(request.responseText);
                console.log(parseRequest);
                enabledDays = [];
                for (let i = 0; i < parseRequest.DeliverySchedule.length; ++i) {
                    //console.log(JSON.parse(request.responseText).DeliverySchedule[i].Date_delivery);
                    enabledDays.push(parseRequest.DeliverySchedule[i].Date_delivery)
                    //console.log(enabledDays);
                }
                dates();

                if (typeof parseRequest.Warning_Customer === "object" && parseRequest.Cost_Delivery !== undefined) {
                    cost.classList.remove('hidden');
                    message.classList.add('hidden');
                    cost.innerHTML = `${parseRequest.Cost_Delivery} BYN с НДС`;
                    dateDownload.value = parseRequest.Date_download.split('-').reverse().join('-');
                    dateDelivery.innerHTML = `${parseRequest.Date_delivery.split('-').reverse().join('-')}`;
                } else if (parseRequest.Cost_Delivery !== undefined && parseRequest.Cost_Delivery != 0) {
                    cost.classList.remove('hidden');
                    message.classList.remove('hidden');
                    cost.innerHTML = `${(Number(parseRequest.Cost_Delivery) + Number(parseRequest.Cost_OversizedCargo)).toFixed(2)}  BYN с НДС`;
                    message.innerHTML = `${parseRequest.Warning_Customer}`;
                    dateDownload.value = parseRequest.Date_download.split('-').reverse().join('-');
                    dateDelivery.innerHTML = `${parseRequest.Date_delivery.split('-').reverse().join('-')}`;

                } else if (parseRequest.Cost_Delivery !== undefined) {
                    cost.classList.add('hidden');
                    message.classList.remove('hidden');
                    message.innerHTML = `${parseRequest.Warning_Customer}`;
                    dateDownload.value = parseRequest.Date_download.split('-').reverse().join('-');
                    dateDelivery.innerHTML = `${parseRequest.Date_delivery.split('-').reverse().join('-')}`;
                } else {
                    cost.classList.add('hidden');
                    message.classList.remove('hidden');
                    message.innerHTML = 'Выбранная услуга рассчитывается индивидуально. Рекомендуем связаться с менеджером по телефону +375173362323, либо заполнить форму обратной связи.';
                }
            }
        });
        request.send(formData);

    }
}


function calcCost() {
    startPreloader();
    if (arrayLocation.length === 0) {
        getLocal(locationArr => {
            arrayLocation = locationArr;
            parseCost(arrayLocation);
            setTimeout(closePreloader, 1000);
        });
    } else {
        parseCost(arrayLocation);
        closePreloader();
    }

}


//autocalculate
formCalculate.addEventListener('submit', function (event) {
    event.preventDefault();
    calcCost();
});


volumeInput.addEventListener('input', calcCost);
for (let i = 0; i < dimensions.length; ++i) {
    dimensions[i].addEventListener('input', calcCost)
}
//weightInput.addEventListener('input', calcCost);

volumeInput.addEventListener('click', calcCost);
for (let i = 0; i < dimensions.length; ++i) {
    dimensions[i].addEventListener('click', calcCost)
}
//weightInput.addEventListener('click', calcCost);


customerDelivery.addEventListener('click', calcCost);
//plusPlace.addEventListener('click', calcCost);
//minusPlace.addEventListener('click', calcCost);


//preloader
let preloaderEl = document.querySelector('.preloader');

function startPreloader() {
    preloaderEl.classList.add('preloader--active');
}

function closePreloader() {
    preloaderEl.classList.remove('preloader--active');
}

//мобильное меню
const btnMenu = document.querySelector('.menu-btn');
btnMenu.addEventListener('click', function () {
    const mobileMenu = document.querySelector('.navigation-box');
    mobileMenu.classList.toggle('active')
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

let changeDownloadCity = '';
let changeDeliveryCity = '';
let changeTariffsType = '';
$(document).ready(function () {

    $(".tariffs__select").chosen({
        width: '100%',
        no_results_text: "Ничего не найдено!"
    });

    $(".tariffs-download").chosen().change(function () {
        changeDownloadCity = $(this).val();
        console.log(changeDownloadCity);
    });


    $(".tariffs-delivery").chosen().change(function () {
        changeDeliveryCity = $(this).val();
        console.log(changeDeliveryCity);
    });

    $(".tariffs-type").chosen().change(function () {
        changeTariffsType = $(this).val();
        console.log(changeTariffsType);
    });
});

function getPrices(foo) {
    const oReq = new XMLHttpRequest();
    oReq.open("GET", 'assets/xlsx/pr.xlsx', true);
    oReq.responseType = "arraybuffer";
    oReq.addEventListener('load', () => {
        let arraybuffer = oReq.response;
        /* convert data to binary string */
        let data = new Uint8Array(arraybuffer);
        let arr = [];
        for (let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        let bstr = arr.join("");
        /* Call XLSX */
        let workbook = XLSX.read(bstr, {type: "binary"});
        /* DO SOMETHING WITH workbook HERE */
        let first_sheet_name = workbook.SheetNames[0];
        let palletSheet = workbook.SheetNames[2];
        let packSheet = workbook.SheetNames[1];
        /* Get worksheet */
        let cargo = workbook.Sheets[first_sheet_name];
        let pallet = workbook.Sheets[palletSheet];
        let pack = workbook.Sheets[packSheet];
        //let locationArr = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        let pricesArr = [XLSX.utils.sheet_to_json(cargo, {
            header: ['Departure', 'Destination', 'price_1',
                'price_2', 'price_3', 'price_4', 'price_5', 'price_6', 'price_7', 'price_8', 'price_9', 'price_10',
                'price_11', 'price_12', 'price_13', 'price_14', 'price_15', 'price_16',
                'price_17', 'price_18', 'price_19', 'price_20', 'price_21', 'price_22'], raw: false
        }),
            XLSX.utils.sheet_to_json(pallet, {
                header: ['city', 'pallet_1',
                    'pallet_2', 'pallet_3', 'pallet_4', 'pallet_5'], raw: false
            }),
            XLSX.utils.sheet_to_json(pack, {
                header: ['city', 'pallet_1',
                    'pallet_2', 'pallet_3', 'pallet_4', 'pallet_5'], raw: false
            })];

        foo(pricesArr);
    });
    oReq.addEventListener('error', () => {
        console.log('error');
    });

    oReq.send();
}

function parseXlsxToTable(array) {
    const rowPrice = array[0];
    const rowPallet = array[1];

    const tableCargo = document.querySelector('.tariffs__cargo');
    const tablePallet = document.querySelector('.tariffs__pallet');
    const tablePack = document.querySelector('.tariffs__pack');


    const tdCargo = document.querySelectorAll('.tariffs__price');
    const tdPallet = document.querySelectorAll('.tariffs__pallet-price');


    const selectedDeparture = changeDownloadCity;
    const selectedDestination = changeDeliveryCity;
    const selectedServiceType = changeTariffsType;


    if (selectedServiceType === 'Сборный груз') {
        tableCargo.classList.add('visible');
        tablePack.classList.remove('visible');
        tablePallet.classList.remove('visible');
        for (let i = 3; i < rowPrice.length; ++i) {
            if (rowPrice[i].Departure === selectedDeparture && rowPrice[i].Destination === selectedDestination) {
                let priceLine = Object.values(rowPrice[i]);
                for (let j = 0; j < tdCargo.length; j++) {
                    tdCargo[j].textContent = priceLine[j + 2]
                }
            }
        }
    } else if (selectedServiceType === 'Палетная доставка') {
        tableCargo.classList.remove('visible');
        tablePack.classList.remove('visible');
        tablePallet.classList.add('visible');
        for (let i = 0; i < rowPallet.length; ++i) {
            if (rowPallet[i].city === selectedDeparture) {
                //console.log(rowPallet[i].city === selectedDeparture);
                let priceLine = Object.values(rowPallet[i]);
                for (let j = 0; j < tdPallet.length; j++) {
                    tdPallet[j].textContent = priceLine[j + 1]
                }
            }
        }
    } else if (selectedServiceType === 'Упаковка') {
        tableCargo.classList.remove('visible');
        tablePack.classList.add('visible');
        tablePallet.classList.remove('visible');
    }
}


let arrayPrices = [];
const calcTable = document.querySelector('.tariffs__btn');
calcTable.addEventListener('click', function (event) {
    event.preventDefault();
    startPreloader();

    if (arrayPrices.length === 0) {
        getPrices(pricesArr => {
            closePreloader();
            arrayPrices = pricesArr;
            parseXlsxToTable(arrayPrices)
        });
    } else {
        setTimeout(closePreloader, 1000);
        setTimeout(parseXlsxToTable(arrayPrices), 500);
        //closePreloader();
    }

});
