'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    },
    debounce: function (fun) {
      var DEBOUNCE_INTERVAL = 500;
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
