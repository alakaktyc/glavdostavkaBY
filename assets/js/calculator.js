$(document).ready(function () {

var locationArr = arr;
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

// Очитска габаритов при вводе только объема

function cleanDimensions(current) {
  let fieldLength = cargosBox.querySelectorAll('.js-input-length');
  let fieldWidth = cargosBox.querySelectorAll('.js-input-width');
  let fieldHeight = cargosBox.querySelectorAll('.js-input-height');
  let fieldValue = cargosBox.querySelectorAll('.js-cargo-value');
  let x;
  let n = fieldValue.length;
  while(n--) {
    if(fieldValue[n] == current) {
      x = n;
      break;
    }
  }
  fieldLength[x].value = 0.0;
  fieldWidth[x].value = 0.0;
  fieldHeight[x].value = 0.0;
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
    let inputValue = fieldValue[x].querySelector('.js-cargo-value');
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

// Добавление грузов через шаблон

let templateCargo = document.querySelector('#cargo-calc');
let elementToCloneCargo;
let cargos = 1;

if ('content' in templateCargo) {
  elementToCloneCargo = templateCargo.content.querySelector('.form__cargo');
} else {
  elementToCloneCargo = templateCargo.querySelector('.form__cargo');
}

function cloneCargo() {
  if (cargos < 5) {
    let formCargo = elementToCloneCargo.cloneNode(true);
    cargosBox.append(formCargo);
    cleanInput();
    switchParameters();
    calculateVolumes();
    entryWeight();
    cargos++;
  }
}

// отправка формы

var form = document.querySelector('#calculator-widget');
var formCities = form.querySelector('.form__cities');
var spinner = document.querySelector('.spinner');
var fieldDateDownload = form.querySelector('.calculator__date-download');
var fieldDateDelivery = form.querySelector('.calculator__date-delivery');
var messageCalculator = document.querySelector('.price-box__message');
var priceCalculator = document.querySelector('.js-price');

function sendToCalculator() {

  //let responseCalculator;
  spinner.classList.remove('hidden');
  //let currentForm = document.querySelector('#calculator-widget');
  var formData = $('#calculator-widget').serialize();
  $.ajax({
    'method': "POST",
    'dataType': 'json',
    'url': 'https://glavdostavka.by/newsitegd/glavdostavkaBY/calc-new.php',
    'data':  formData,
    complete: function(result) {
      //debugger;
      spinner.classList.add('hidden');
      console.log(result);
      let responseCalculator = result.responseJSON;
      if (responseCalculator.ErrorMesage) {
        console.log('ошибка!');
      } else {
        callCalendar(responseCalculator);
        fieldDateDownload.value = responseCalculator.DeliverySchedule[0].Date_delivery;
        fieldDateDelivery.innerText = responseCalculator.Date_delivery;
        messageCalculator.innerText = responseCalculator.Warning_Customer;
        priceCalculator.innerText = 1 * responseCalculator.Cost_Delivery + 1 * responseCalculator.Cost_OversizedCargo;
      }
    }
  });
}

function callCalendar(response) {
  let enabledDays = [];
  for (let i = 0; i < response.DeliverySchedule.length; ++i) {
      enabledDays.push(response.DeliverySchedule[i].Date_delivery)
  }
  console.log(enabledDays);
  let myDatepicker = $('.datepicker-here').datepicker().data('datepicker');
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
          sendToCalculator();
      }
  });
}

// убрать груз

function removeCargo(current) {
  let formsCargo = cargosBox.querySelectorAll('.form__cargo');
  let cargoRemoveBtns = cargosBox.querySelectorAll('.js-cargo-remove');
  let n = formsCargo.length;
  while(n--) {
    if(cargoRemoveBtns[n] == current) {
      x = n;
      break;
    }
  }
  if (cargos > 1) {
    formsCargo[x].remove();
    cargos--;
  }
}

// слушаем блок с грузами

cargosBox.addEventListener('click', function(evt) {
  evt.preventDefault();
  let current = evt.target;
  if (current.classList.contains('js-place-add')) {
    listinerAddBtn(current);
  }
  if (current.classList.contains('js-place-reduce')) {
    listinerReduceBtn(current);
  };
  if (current.classList.contains('js-cargo-add')) {
    cloneCargo();
  };
  if (current.classList.contains('js-cargo-remove')) {
    removeCargo(current);
  }
  if (current.classList.contains('js-cargo-value')) {
    cleanDimensions(current);
  }
});

// слушаем форму и проверяем перед отправкой

cargosBox.addEventListener('input', function(evt) {
  evt.preventDefault();
  let inputWeight = cargosBox.querySelector('.js-input-weight');
  let cargoValue = cargosBox.querySelector('.js-cargo-value');
  if ((inputWeight.value != 0)&&(cargoValue.value != 0)) {
    setTimeout(sendToCalculator, 500);
  }
});

formCities.addEventListener('change', function(evt) {
  evt.preventDefault();
  let cityFrom = formCities.querySelector('#cityFrom');
  let cityTo = formCities.querySelector('#cityTo');
  function searchСity() {
    let cityFromKey = false;
    let cityToKey = false;
    if ((cityFrom.value)&&(cityTo.value)) {
      for (var i = 0; i < locationArr.length; i++) {
        if (cityFrom.value === locationArr[i]) {
          cityFromKey = true;
          console.log(locationArr[0]);
        }
        if (cityTo.value === locationArr[i]) {
          cityToKey = true;
          console.log(locationArr[1]);
        }
      }
      if ((cityFromKey)&&(cityToKey)) {
        sendToCalculator();
      }
    }
  };
  setTimeout(searchСity, 500);
});


form.addEventListener('click', function(evt) {
  let current = evt.target;
  let inputWeight = cargosBox.querySelector('.js-input-weight');
  let cargoValue = cargosBox.querySelector('.js-cargo-value');
  let cityFrom = formCities.querySelector('#cityFrom');
  let cityTo = formCities.querySelector('#cityTo');
  if ((inputWeight.value != 0)&&(cargoValue.value != 0)) {
    if ((cityFrom.value)&&(cityTo.value)) {
      if (current.classList.contains('btn-arrow')) {
        setTimeout(sendToCalculator, 500);
      }
      if (current.classList.contains('form-main__checkbox')) {
        setTimeout(sendToCalculator, 500);
      }
      if (current.classList.contains('btn-reverse')) {
        setTimeout(sendToCalculator, 500);
      }
      if (current.classList.contains('js-cargo-remove')) {
        setTimeout(sendToCalculator, 500);
      }
    }
  }
});


cleanInput();
switchParameters();
calculateVolumes();
entryWeight();
});
