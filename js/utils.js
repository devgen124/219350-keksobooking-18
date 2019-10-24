'use strict';

(function () {
  window.utils = {
    getRandomItem: function (arr) {
      return arr[Math.round(Math.random() * (arr.length - 1))];
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    randomizeArray: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var randomIndex = Math.floor(Math.random() * i);
        var swap = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = swap;
      }
      return arr;
    }
  };
})();
