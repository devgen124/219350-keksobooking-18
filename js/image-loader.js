'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var ImageParams = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesContainer = document.querySelector('.ad-form__photo-container');
  var avatarChooser = document.querySelector('#avatar');
  var imageChooser = document.querySelector('#images');

  var filtrationByCorrectType = function (file) {
    return FILE_TYPES.some(function (type) {
      return file.name.toLowerCase().endsWith(type);
    });
  };

  var changeAvatar = function (src) {
    avatarPreview.src = src;
  };

  var removeEmptyImgWrap = function () {
    var imgWrap = document.querySelector('.ad-form__photo');

    if (!imgWrap.hasChildNodes()) {
      imgWrap.remove();
    }
  };

  var addImages = function (src) {
    var newImageWrap = document.createElement('div');
    var image = document.createElement('img');

    newImageWrap.classList.add('ad-form__photo');
    image.src = src;
    image.style.width = ImageParams.WIDTH;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    newImageWrap.append(image);
    imagesContainer.append(newImageWrap);
    removeEmptyImgWrap();
  };

  var addEmptyImgWrap = function () {
    var emptyImgWrap = document.createElement('div');

    emptyImgWrap.classList.add('ad-form__photo');
    imagesContainer.appendChild(emptyImgWrap);
  };

  var loadFile = function (chooser, action) {
    var files = Array.from(chooser.files).filter(filtrationByCorrectType);
    if (files) {
      files.forEach(function (file) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          action(evt.target.result);
        });
        reader.readAsDataURL(file);
      });
    }
  };

  var removeImages = function () {
    avatarPreview.src = DEFAULT_AVATAR;
    var imgWraps = document.querySelectorAll('.ad-form__photo');
    if (imgWraps) {
      imgWraps.forEach(function (it) {
        it.remove();
      });
    }
    addEmptyImgWrap();
  };

  var onAvatarChange = function (evt) {
    loadFile(evt.target, changeAvatar);
  };

  var onPhotoChange = function (evt) {
    loadFile(evt.target, addImages);
  };

  var setActive = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    imageChooser.addEventListener('change', onPhotoChange);
  };

  var setInactive = function () {
    avatarChooser.removeEventListener('change', onAvatarChange);
    imageChooser.removeEventListener('change', onPhotoChange);
  };

  window.imageLoader = {
    setActive: setActive,
    setInactive: setInactive,
    reset: removeImages
  };
})();
