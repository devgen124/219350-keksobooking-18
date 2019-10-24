'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var ads = [];

  var updatePins = function () {
    var FIXED_QUANTITY = 5;
    var sum = null;
    var filteredAds = ads
    .filter(function (ad) {
      return ad.offer.type === 'bungalo';
    })
    .filter(function () {
      sum++;
      return sum <= FIXED_QUANTITY;
    });
    window.renderPins(filteredAds);
  };

  var onSuccessRenderPins = function (data) {
    ads = data;
    updatePins();
  };

  var onErrorShowPopup = function (errorMessage) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('button');
    error.querySelector('p').textContent = errorMessage;
    main.appendChild(error);

    var onClickReload = function () {
      window.load(onSuccessRenderPins, onErrorShowPopup);
      main.removeChild(error);
      errorButton.removeEventListener('click', onClickReload);
    };

    errorButton.addEventListener('click', onClickReload);
  };

  var setInputsDisabled = function (collection, boolean) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = boolean;
    }
  };

  var setFormsDisabled = function (boolean) {
    var mapForm = document.querySelector('.map__filters');
    var mapFormSelects = mapForm.querySelectorAll('select');
    var adForm = document.querySelector('.ad-form');
    var adFormFieldsets = adForm.querySelectorAll('fieldset');

    setInputsDisabled(mapFormSelects, boolean);
    setInputsDisabled(adFormFieldsets, boolean);
  };

  setFormsDisabled(true);

  var viewPinPosition = function () {
    var mainPinX = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
    var mainPinY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
    var addressInput = document.querySelector('input#address');

    addressInput.value = mainPinX + ', ' + mainPinY;
  };

  viewPinPosition();

  var onMouseDownActivateSite = function () {
    var mapIsFaded = document.querySelector('.map').classList.contains('map--faded');

    window.load(onSuccessRenderPins, onErrorShowPopup);
    setFormsDisabled(false);

    map.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    if (mapIsFaded) {
      mainPin.removeEventListener('mousedown', onMouseDownActivateSite);
    }
  };

  var onMouseDownCatchPin = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMoveDragPin = function (moveEvt) {
      moveEvt.preventDefault();
      var TOP_LIMIT = 130;
      var BOTTOM_LIMIT = 630;
      var LEFT_LIMIT = 0;
      var RIGHT_LIMIT = 1200;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (pinCoords.y >= TOP_LIMIT - MAIN_PIN_HEIGHT && pinCoords.y <= BOTTOM_LIMIT - MAIN_PIN_HEIGHT) {
        mainPin.style.top = pinCoords.y + 'px';
      }
      if (pinCoords.x >= (LEFT_LIMIT - MAIN_PIN_WIDTH / 2) && pinCoords.x <= (RIGHT_LIMIT - MAIN_PIN_WIDTH / 2)) {
        mainPin.style.left = pinCoords.x + 'px';
      }
      viewPinPosition();
    };

    var onMouseUpDropPin = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMoveDragPin);
      map.removeEventListener('mouseup', onMouseUpDropPin);
      viewPinPosition();
    };

    map.addEventListener('mousemove', onMouseMoveDragPin);
    map.addEventListener('mouseup', onMouseUpDropPin);
  };

  mainPin.addEventListener('mousedown', onMouseDownActivateSite);
  mainPin.addEventListener('mousedown', onMouseDownCatchPin);
})();
