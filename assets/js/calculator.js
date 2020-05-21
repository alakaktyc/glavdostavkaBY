$(document).ready(function () {

var cargosBox = document.querySelector('.cargos-box');
var calculatorDateToday = document.querySelector('.calculator__date-download');
var dateToday = new Date();

var options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

calculatorDateToday.value = dateToday.toLocaleString("ru", options);

// Подключение справочника

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

        console.log(event.get('item').value);
    });
    cityTo.events.add('select', function (event) {

        console.log(event.get('item').value);
    });
}

// Переключатель направлений

const swapCity = document.querySelector('.calculator__swap');
swapCity.addEventListener('click', function (event) {
    event.preventDefault();
    let cityFromVal = document.querySelector('#cityFrom');
    let cityToVal = document.querySelector('#cityTo');
    let temp = cityFromVal.value;
    cityFromVal.value = cityToVal.value;
    cityToVal.value = temp;
});

// Изменение количества грузов

function changeQuantity() {

  cargosBox.addEventListener('click', function(evt) {
    evt.preventDefault();
    let x;
    let current = evt.target;
    console.log(current);
    if (current.classList.contains('js-place-add')) {
      listinerAddBtn(current);
    }
    if (current.classList.contains('js-place-reduce')) {
      listinerReduceBtn(current);
    };
  });
}

// Слушаем кнопку увеличить

function listinerAddBtn(current) {
  let placeInputs = cargosBox.querySelectorAll('.calculator__dimensions-quantity');
  let placeAddBtns = cargosBox.querySelectorAll('.js-place-add');
  let n = placeInputs.length;
  while(n--) {
    if(placeAddBtns[n] == current) {
      x = n;
      break;
    }
  }
  placeInputs[x].value = (1 * placeInputs[x].value) + 1;
  console.log(x);
};

// Слушаем кнопку уменьшить

function listinerReduceBtn(current) {
  let placeInputs = cargosBox.querySelectorAll('.calculator__dimensions-quantity');
  let placeReduceBtns = cargosBox.querySelectorAll('.js-place-reduce');
  let n = placeInputs.length;
  while(n--) {
    if(placeReduceBtns[n] == current) {
      x = n;
      break;
    }
  }
  if (placeInputs[x].value > 1) {
    placeInputs[x].value = (1 * placeInputs[x].value)  - 1;
  }
  console.log(x);
};

//переключатель объём/габариты

function switchParameters() {
  let swDimension = cargosBox.querySelectorAll('.js-switch-dimensions');
  let swValue = cargosBox.querySelectorAll('.js-switch-value');
  let fieldDimension = cargosBox.querySelectorAll('.js-input-dimensions');
  let fieldValue = cargosBox.querySelectorAll('.js-input-values');
  let swLenght = swDimension.length;
  let x;
  console.log(swDimension[0], swLenght);

  for (let i = 0; i < swLenght; i++) {
    swDimension[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      let current = evt.currentTarget;
      if (current.classList.contains('js-switch-dimensions')) {
        let n = swLenght;
        while(n--) {
          if(swDimension[n] == current) {
            x = n;
            break;
          }
        }
        if (!(swDimension[x].classList.contains('switch'))) {
          swDimension[x].classList.add('switch');
          fieldDimension[x].classList.remove('hidden');
          swValue[x].classList.remove('switch');
          fieldValue[x].classList.add('hidden');
        }

        console.log('габариты', x);
      };
    });
    swValue[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      let current = evt.currentTarget;
      if (current.classList.contains('js-switch-value')) {
        let n = swLenght;
        while(n--) {
          if(swValue[n] == current) {
            x = n;
            break;
          }
        }
        if (!(swValue[x].classList.contains('switch'))) {
          swValue[x].classList.add('switch');
          fieldValue[x].classList.remove('hidden');
          swDimension[x].classList.remove('switch');
          fieldDimension[x].classList.add('hidden');
        }
        console.log('объем', x);
      };
    });
  }
}

// Вычисление объема

function calculateVolumes() {
  function calculateVolume() {
    let inputsDimension = fieldDimension[x].querySelectorAll('.js-calculate');
    let inputValue = fieldValue[x].querySelector('.js-calculate');
    for (let i = 0; i < inputsDimension.length; i++) {
      replaceToNum(inputsDimension[i]);
    }
    let curValue = inputsDimension[0].value * inputsDimension[1].value * inputsDimension[2].value;
    inputValue.value = + curValue.toFixed(2);
    console.log('рассчитаем объем', inputValue.value);
  }
  let fieldDimension = cargosBox.querySelectorAll('.js-input-dimensions');
  let fieldValue = cargosBox.querySelectorAll('.js-input-values');
  let swLenght = fieldDimension.length;
  let x;
  for (let i = 0; i < swLenght; i++) {
    fieldDimension[i].addEventListener('input', function(evt) {
      evt.preventDefault();
      let current = evt.currentTarget;
      if (current.classList.contains('js-input-dimensions')) {
        let n = swLenght;
        while(n--) {
          if(fieldDimension[n] == current) {
            x = n;
            break;
          }
        }
        calculateVolume();
      };
    });
  }
}

function replaceToNum(input) {
    input.value = input.value.replace(/,/, '.').replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, '$1');
}

// Ввод веса

function entryWeight() {
  let inputsWeight = cargosBox.querySelectorAll('.js-input-weight');
  let swLenght = inputsWeight.length;
  let x;
  for (let i = 0; i < swLenght; i++) {
    inputsWeight[i].addEventListener('input', function(evt) {
      evt.preventDefault();
      let current = evt.currentTarget;
      if (current.classList.contains('js-input-weight')) {
        let n = swLenght;
        while(n--) {
          if(inputsWeight[n] == current) {
            x = n;
            break;
          }
        }
        replaceToNum(inputsWeight[x]);
      };
    });
  }
}

//очистка полей

function cleanInput() {
  const inputsFormCalc = formCalculate.querySelectorAll('.js-calculate');
  for (let i = 0; i < inputsFormCalc.length; ++i) {
      inputsFormCalc[i].addEventListener('focus', function () {
          this.value = '';
      })
  }
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

// Добавление/удаление грузов

// Подлючени шаблона груза

var templateCargo = document.querySelector('#cargo-calc');
var elementToCloneCargo;

if ('content' in templateCargo) {
  elementToCloneCargo = templateCargo.content.querySelector('.form__cargo');
} else {
  elementToCloneCargo = templateCargo.querySelector('.form__cargo');
}

let formCargo = elementToCloneCargo.cloneNode(true);

var cargos = 1;

$('.js-cargo-add').click(function() {
  if (cargos < 5) {
    let formCargo = elementToCloneCargo.cloneNode(true);
    cargosBox.append(formCargo);
    cargos++;
    cleanInput();
    switchParameters();
    calculateVolumes();
    entryWeight();
  }
});

$('.js-cargo-remove').click(function() {
if(cargos > 1) {
  $('.form__cargo:last').remove();
  cargos--;
}
});

cleanInput();
switchParameters();
calculateVolumes();
entryWeight();
changeQuantity();


// отправка формы

var form = document.querySelector('#calculator-widget');

var spinner = document.querySelector('.spinner');

var listiner = function(evt) {
  evt.preventDefault();
  spinner.classList.remove('hidden');
  var formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    'method': "POST",
    'dataType': 'json',
    'url': 'https://glavdostavka.by/newsitegd/glavdostavkaBY/calc-new.php',
    'data':  formData,
    complete: function() {
      //form.reset();
      //removePopup();
      setTimeout(alert('Спасибо!'), 2000);
      //alert('Спасибо!');
      spinner.classList.add('hidden');
      //setTimeout(window.location.reload(), 1000);
    }
  })
};

form.addEventListener( 'submit', listiner);

});
