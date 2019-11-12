'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var title = adForm.querySelector('input#title');
  var houseType = adForm.querySelector('select#type');
  var price = document.querySelector('input#price');
  var address = adForm.querySelector('input#address');
  var timeIn = adForm.querySelector('select#timein');
  var timeOut = adForm.querySelector('select#timeout');
  var roomNumber = adForm.querySelector('select#room_number');
  var capacity = adForm.querySelector('select#capacity');
  var capOptions = capacity.querySelectorAll('option');
  var resetButton = adForm.querySelector('.ad-form__reset');


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

    price.min = minPricesMap[getSelectedOption(houseType)];
    price.placeholder = price.min;
  };

  var onChangeSetMinPrice = function () {
    setMinPrice();
  };

  var onChangeSynchCheckTime = function (evt) {
    if (evt.target === timeIn) {
      timeOut.value = timeIn.value;
    }
    if (evt.target === timeOut) {
      timeIn.value = timeOut.value;
    }
  };

  var synchRoomsToCap = function () {
    var roomsToCapMap = {
      1: [1],
      2: [2, 1],
      3: [3, 2, 1],
      100: [0]
    };

    var removeCurrentOptions = function () {
      var currentOptions = capacity.querySelectorAll('option');
      currentOptions.forEach(function (opt) {
        opt.remove();
      });
    };

    var restrictCapValues = function (optValue) {
      var correctValues = roomsToCapMap[optValue];
      var correctOptions = Array.from(capOptions)
        .filter(function (node) {
          return correctValues.indexOf(Number(node.value)) >= 0;
        });
      var fragment = document.createDocumentFragment();
      correctOptions.forEach(function (node) {
        fragment.append(node);
      });
      removeCurrentOptions();
      capacity.append(fragment);
      capacity.selectedIndex = 0;
    };

    restrictCapValues(roomNumber.value);
  };

  var onChangeSynchRoomsToCap = function () {
    synchRoomsToCap();
  };

  var setAddress = function (coords) {
    address.value = coords.x + ', ' + coords.y;
  };

  var onInvalidSetStyle = function (evt) {
    evt.target.style = 'border: 2px solid red';
  };


  var resetPage = function () {
    adForm.reset();
    window.map.reset();
    window.imageLoader.reset();
    setFormInactive();
  };

  var onSubmitShowSuccess = function () {
    resetPage();
    window.popup.showSuccess();
  };

  var onSubmitShowError = function (errorMessage) {
    window.popup.showError(errorMessage);
  };

  var onSubmitSendData = function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(onSubmitShowSuccess, onSubmitShowError, formData);
  };

  var onClickResetPage = function () {
    resetPage();
    resetButton.removeEventListener('click', onClickResetPage);
  };

  var onEnterResetPage = function (evt) {
    window.utils.isEnterEvent(evt, resetPage);
    resetButton.removeEventListener('keydown', onClickResetPage);
  };

  var addFormEventListeners = function () {
    title.addEventListener('invalid', onInvalidSetStyle);
    houseType.addEventListener('change', onChangeSetMinPrice);
    price.addEventListener('invalid', onInvalidSetStyle);
    timeIn.addEventListener('change', onChangeSynchCheckTime);
    timeOut.addEventListener('change', onChangeSynchCheckTime);
    roomNumber.addEventListener('change', onChangeSynchRoomsToCap);
    resetButton.addEventListener('click', onClickResetPage);
    resetButton.addEventListener('keydown', onEnterResetPage);
  };

  var removeFormEventListeners = function () {
    title.removeEventListener('invalid', onInvalidSetStyle);
    houseType.removeEventListener('change', onChangeSetMinPrice);
    price.removeEventListener('invalid', onInvalidSetStyle);
    timeIn.removeEventListener('change', onChangeSynchCheckTime);
    timeOut.removeEventListener('change', onChangeSynchCheckTime);
    roomNumber.removeEventListener('change', onChangeSynchRoomsToCap);
    adForm.addEventListener('submit', onSubmitSendData);
  };

  var setFormInactive = function () {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    setAddress(window.map.getDefaultCoords());
    window.imageLoader.setInactive();
    removeFormEventListeners();
  };

  setFormInactive();

  window.form = {
    setActive: function () {
      adForm.classList.remove('ad-form--disabled');
      adFormFieldsets.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
      setMinPrice();
      synchRoomsToCap();
      window.imageLoader.setActive();
      addFormEventListeners();
    },
    setAddress: setAddress
  };
})();
