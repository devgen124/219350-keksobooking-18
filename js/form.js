'use strict';

(function () {
  var apartmentsType = document.querySelector('#type');
  var arrivalTime = document.querySelector('#timein');
  var departureTime = document.querySelector('#timeout');

  var getSelectedOption = function (select) {
    var currentOption = select.options[select.selectedIndex].value;

    return currentOption;
  };

  var setMinPrice = function () {
    var minPricesMap = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    var priceInput = document.querySelector('#price');

    priceInput.min = minPricesMap[getSelectedOption(apartmentsType)];
    priceInput.placeholder = priceInput.min;
  };

  setMinPrice();
  apartmentsType.addEventListener('change', function () {
    setMinPrice();
  });

  var onChangeWriteOutToIn = function () {
    departureTime.selectedIndex = arrivalTime.selectedIndex;
  };
  var onChangeWriteInToOut = function () {
    arrivalTime.selectedIndex = departureTime.selectedIndex;
  };

  arrivalTime.addEventListener('change', onChangeWriteOutToIn);
  departureTime.addEventListener('change', onChangeWriteInToOut);
})();
