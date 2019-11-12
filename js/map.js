'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 65,
    SHORT_HEIGHT: 65,
    LONG_HEIGHT: 84
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onSuccessRenderPins = function (data) {
    window.filter.setActive(data);
  };

  var onErrorShowPopup = function (errorMessage) {
    window.popup.showError(errorMessage);
  };

  var defaultPinPosition = {
    x: parseInt(mainPin.style.left, 10),
    y: parseInt(mainPin.style.top, 10)
  };

  var getDefaultCoords = function () {
    var defaultPinCoords = {
      x: Math.floor(defaultPinPosition.x + MainPinSize.WIDTH / 2),
      y: Math.floor(defaultPinPosition.y + MainPinSize.LONG_HEIGHT / 2)
    };
    return defaultPinCoords;
  };

  var resetPinPosition = function () {
    mainPin.style.left = defaultPinPosition.x + 'px';
    mainPin.style.top = defaultPinPosition.y + 'px';
  };

  var sendCoords = function () {
    var mainPinCoords = {
      x: Math.floor(parseInt(mainPin.style.left, 10) + MainPinSize.WIDTH / 2),
      y: Math.floor(parseInt(mainPin.style.top, 10) + MainPinSize.LONG_HEIGHT)
    };
    return mainPinCoords;
  };

  var resetMap = function () {
    map.classList.add('map--faded');
    resetPinPosition();
    removePins();
    window.card.remove();
    window.filter.setInactive();
    mainPin.addEventListener('mousedown', onMouseDownActivatePage);
    mainPin.addEventListener('mousedown', onMouseDownGrabPin);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    window.backend.download(onSuccessRenderPins, onErrorShowPopup);
  };

  var onMouseDownActivatePage = function () {
    activateMap();
    window.form.setActive();
    mainPin.removeEventListener('mousedown', onMouseDownActivatePage);
  };

  var onMouseDownGrabPin = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMoveDragPin = function (moveEvt) {
      moveEvt.preventDefault();
      var Limit = {
        TOP: 130,
        LEFT: 0,
        RIGHT: 1200,
        BOTTOM: 630
      };

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

      if (pinCoords.y >= Limit.TOP - MainPinSize.LONG_HEIGHT && pinCoords.y <= Limit.BOTTOM - MainPinSize.LONG_HEIGHT) {
        mainPin.style.top = pinCoords.y + 'px';
      }
      if (pinCoords.x >= (Limit.LEFT - MainPinSize.WIDTH / 2) && pinCoords.x <= (Limit.RIGHT - MainPinSize.WIDTH / 2)) {
        mainPin.style.left = pinCoords.x + 'px';
      }
      window.form.setAddress(pinCoords);
    };

    var onMouseUpDropPin = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMoveDragPin);
      map.removeEventListener('mouseup', onMouseUpDropPin);
    };

    map.addEventListener('mousemove', onMouseMoveDragPin);
    map.addEventListener('mouseup', onMouseUpDropPin);
  };
  mainPin.addEventListener('mousedown', onMouseDownActivatePage);
  mainPin.addEventListener('mousedown', onMouseDownGrabPin);

  window.map = {
    getDefaultCoords: getDefaultCoords,
    sendActualCoords: sendCoords,
    removePins: removePins,
    reset: resetMap
  };
})();
