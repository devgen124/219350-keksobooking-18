'use strict';

(function () {
  var getPinElement = function (adObj) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;

    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = adObj.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = adObj.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = adObj.author.avatar;
    pinElement.querySelector('img').alt = adObj.offer.title;

    return pinElement;
  };

  window.renderPins = function (ads) {
    var pins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(getPinElement(ads[i]));
    }
    pins.appendChild(fragment);
  };
})();
