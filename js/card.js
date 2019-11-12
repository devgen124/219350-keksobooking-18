'use strict';

(function () {
  var map = document.querySelector('.map');

  var getCardElement = function (dataObj) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    var getAvatar = function () {
      if (dataObj.author.avatar) {
        cardElement.querySelector('img').src = dataObj.author.avatar;
      } else {
        cardElement.querySelector('img').remove();
      }
    };
    var getTitle = function () {
      if (dataObj.offer.title) {
        cardElement.querySelector('.popup__title').textContent = dataObj.offer.title;
      } else {
        cardElement.querySelector('.popup__title').remove();
      }
    };

    var getAddress = function () {
      if (dataObj.offer.address) {
        cardElement.querySelector('.popup__text--address').textContent = dataObj.offer.address;
      } else {
        cardElement.querySelector('.popup__text--address').remove();
      }
    };

    var getPrice = function () {
      if (dataObj.offer.price) {
        cardElement.querySelector('.popup__text--price').textContent = dataObj.offer.price + '₽/ночь';
      } else {
        cardElement.querySelector('.popup__text--price').remove();
      }
    };

    var getType = function () {
      var houseTypeMap = {
        'bungalo': 'Бунгало',
        'house': 'Дом',
        'palace': 'Дворец'
      };

      if (dataObj.offer.type) {
        cardElement.querySelector('.popup__type').textContent = houseTypeMap[dataObj.offer.type];
      } else {
        cardElement.querySelector('.popup__type').remove();
      }
    };

    var getCapacity = function () {
      if (dataObj.offer.rooms && dataObj.offer.guests) {
        cardElement.querySelector('.popup__text--capacity').textContent = dataObj.offer.rooms + ' комнаты для ' + dataObj.offer.guests + ' гостей';
      } else {
        cardElement.querySelector('.popup__text--capacity').remove();
      }
    };

    var getCheckTime = function () {
      if (dataObj.offer.checkin && dataObj.offer.checkout) {
        cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObj.offer.checkin + ', выезд до ' + dataObj.offer.checkout;
      } else {
        cardElement.querySelector('.popup__text--time').remove();
      }
    };

    var getFeatures = function () {
      if (dataObj.offer.features.length > 0) {
        dataObj.offer.features.forEach(function (feature) {
          var featuresItem = document.createElement('li');
          featuresItem.className = 'popup__feature popup__feature--' + feature;
          cardElement.querySelector('.popup__features').append(featuresItem);
        });
      } else {
        cardElement.querySelector('.popup__features').remove();
      }
    };

    var getDescription = function () {
      if (dataObj.offer.description) {
        cardElement.querySelector('.popup__description').textContent = dataObj.offer.description;
      } else {
        cardElement.querySelector('.popup__description').remove();
      }
    };

    var getPhotos = function () {
      if (dataObj.offer.photos.length > 0) {
        var image = cardElement.querySelector('.popup__photo');
        image.remove();
        dataObj.offer.photos.forEach(function (pic) {
          var newImage = image.cloneNode(true);
          newImage.src = pic;
          cardElement.querySelector('.popup__photos').append(newImage);
        });
      } else {
        cardElement.querySelector('.popup__photos').remove();
      }
    };

    getAvatar();
    getTitle();
    getAddress();
    getPrice();
    getType();
    getCapacity();
    getCheckTime();
    getFeatures();
    getDescription();
    getPhotos();

    return cardElement;
  };

  var removeActiveClass = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var removeCard = function () {
    var currentCard = map.querySelector('.map__card');

    removeActiveClass();
    if (currentCard) {
      currentCard.remove();
    }
  };

  var renderCard = function (pin, dataObj) {
    var filtersContainer = map.querySelector('.map__filters-container');
    var card = getCardElement(dataObj);

    var showCard = function () {
      var cardClose = card.querySelector('.popup__close');

      removeCard();
      filtersContainer.before(card);
      pin.classList.add('map__pin--active');
      cardClose.addEventListener('click', removeCard);
      cardClose.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, removeCard);
      });
      document.addEventListener('keydown', function (evt) {
        window.utils.isEscEvent(evt, removeCard);
      });

    };

    pin.addEventListener('click', function () {
      showCard();
    });
    pin.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, showCard);
    });
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };

})();
