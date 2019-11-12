'use strict';

(function () {
  var PINS_LIMIT = 5;
  var filtersForm = document.querySelector('.map__filters');
  var filtersSelects = filtersForm.querySelectorAll('select');
  var filterFeatures = filtersForm.querySelector('fieldset#housing-features');
  var adsData = [];

  var filtrate = function (option, dataValue) {
    return option.value === 'any' ? true : option.value === dataValue.toString();
  };

  var filtrateByType = function (dataObj) {
    var houseTypeFilter = filtersForm.querySelector('#housing-type');

    return filtrate(houseTypeFilter, dataObj.offer.type);
  };

  var filtrateByPrice = function (dataObj) {
    var PriceMap = {
      'low': {
        MIN: 0,
        MAX: 10000
      },
      'middle': {
        MIN: 10000,
        MAX: 50000
      },
      'high': {
        MIN: 50000,
        MAX: Infinity
      }
    };
    var priceFilter = filtersForm.querySelector('#housing-price');
    var priceRange = PriceMap[priceFilter.value];

    if (priceFilter.value === 'any') {
      return true;
    } else {
      return dataObj.offer.price >= priceRange.MIN && dataObj.offer.price < priceRange.MAX;
    }
  };

  var filtrateByRooms = function (item) {
    var roomsFilter = filtersForm.querySelector('#housing-rooms');

    return filtrate(roomsFilter, item.offer.rooms);
  };

  var filtrateByGuests = function (item) {
    var guestsFilter = filtersForm.querySelector('#housing-guests');

    return filtrate(guestsFilter, item.offer.guests);
  };

  var filtrateByFeatures = function (item) {
    var featuresFilter = filtersForm.querySelector('#housing-features');
    var checkedFeatures = featuresFilter.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (input) {
      return item.offer.features.includes(input.value);
    });
  };

  var filtrateData = function (dataArr) {
    var filteredData = dataArr
      .filter(filtrateByType)
      .filter(filtrateByPrice)
      .filter(filtrateByRooms)
      .filter(filtrateByGuests)
      .filter(filtrateByFeatures)
      .slice(0, PINS_LIMIT);

    return filteredData;
  };

  var onChangeFiltrateData = window.utils.debounce(function () {
    window.map.removePins();
    window.card.remove();
    window.pins.render(filtrateData(adsData));
  });

  var setInactiveFilter = function () {
    filtersSelects.forEach(function (select) {
      select.disabled = true;
    });
    filterFeatures.disabled = true;
    filtersForm.removeEventListener('change', onChangeFiltrateData);
  };

  var setActiveFilter = function (dataArr) {
    adsData = dataArr;
    filtersSelects.forEach(function (select) {
      select.disabled = false;
    });
    filterFeatures.disabled = false;
    filtersForm.reset();
    window.pins.render(adsData.slice(0, PINS_LIMIT));
    filtersForm.addEventListener('change', onChangeFiltrateData);
  };

  setInactiveFilter();

  window.filter = {
    setInactive: setInactiveFilter,
    setActive: setActiveFilter
  };
})();
