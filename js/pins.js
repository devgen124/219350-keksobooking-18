'use strict';

(function () {
  var getPinElement = function (dataObj) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;

    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = dataObj.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = dataObj.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = dataObj.author.avatar;
    pinElement.querySelector('img').alt = dataObj.offer.title;

    return pinElement;
  };

  window.pins = {
    render: function (data) {
      var pins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      data.forEach(function (dataObj) {
        if (dataObj.offer) {
          var pin = getPinElement(dataObj);
          fragment.appendChild(pin);
          window.card.render(pin, dataObj);
        } else {
          return;
        }
      });
      pins.appendChild(fragment);
    }
  };
})();
