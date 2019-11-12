'use strict';

(function () {
  var main = document.querySelector('main');


  window.popup = {
    showError: function (message) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var error = errorTemplate.cloneNode(true);
      error.querySelector('p').textContent = message;
      var currentError = main.querySelector('.error');
      var errorMessage = error.querySelector('.error__message');
      var errorButton = error.querySelector('.error__button');

      var removeError = function () {
        error.remove();
      };
      var onKeydownRemoveError = function (evt) {
        if (evt.target === errorButton) {
          window.utils.isEnterEvent(evt, removeError);
        }
        window.utils.isEscEvent(evt, removeError);
        error.removeEventListener('keydown', onKeydownRemoveError);
      };

      var onClickRemoveError = function (evt) {
        if (evt.target === errorButton || evt.target !== errorMessage) {
          error.remove();
        }
        document.removeEventListener('click', onClickRemoveError);
      };

      document.addEventListener('keydown', onKeydownRemoveError);
      error.addEventListener('click', onClickRemoveError);

      if (!currentError) {
        main.append(error);
      }
      errorButton.focus();

      return error;
    },
    showSuccess: function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var success = successTemplate.cloneNode(true);
      var currentSuccess = main.querySelector('.success');

      var removeSuccess = function () {
        success.remove();
      };

      var onClickRemoveSuccess = function (evt) {
        var successMessage = success.querySelector('.success__message');
        if (evt.target !== successMessage) {
          removeSuccess();
          success.removeEventListener('click', onClickRemoveSuccess);
        }
      };

      var onEscRemoveSuccess = function (evt) {
        window.utils.isEscEvent(evt, removeSuccess);
        document.removeEventListener('keydown', onEscRemoveSuccess);
      };

      success.addEventListener('click', onClickRemoveSuccess);
      document.addEventListener('keydown', onEscRemoveSuccess);

      if (!currentSuccess) {
        main.append(success);
      }

      return success;
    }
  };
})();
