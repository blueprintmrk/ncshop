(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

var eventHandlers = [];
var previousBreakpoint = null;

function getBreakpoint() {
  return window.getComputedStyle(document.documentElement, ':after').getPropertyValue('content').replace(/"/g, '');
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', function (event) {
  var currentBreakpoint = getBreakpoint();

  if (previousBreakpoint !== currentBreakpoint) {
    eventHandlers.forEach(function (eventHandler) {
      eventHandler(event, {
        previous: previousBreakpoint,
        current: currentBreakpoint
      });
    });
  }

  previousBreakpoint = currentBreakpoint;
});

function isBreakpoint(breakpoint) {
  return getBreakpoint() === breakpoint;
}

function onBreakpointChange(eventHandler) {
  if (eventHandlers.indexOf(eventHandler) === -1) {
    eventHandlers.push(eventHandler);
  }
}

function offBreakpointChange(eventHandler) {
  var index = eventHandlers.indexOf(eventHandler);

  if (index !== -1) {
    eventHandlers.splice(index, 1);
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  isBreakpoint: isBreakpoint,
  onBreakpointChange: onBreakpointChange,
  offBreakpointChange: offBreakpointChange
});

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = debounce

function debounce (fn, delay, at_start, guarantee) {
  var timeout
  var args
  var self

  return function debounced () {
    self = this
    args = Array.prototype.slice.call(arguments)

    if (timeout && (at_start || guarantee)) {
      return
    } else if (!at_start) {
      clear()

      timeout = setTimeout(run, delay)
      return timeout
    }

    timeout = setTimeout(clear, delay)
    fn.apply(self, args)

    function run () {
      clear()
      fn.apply(self, args)
    }

    function clear () {
      clearTimeout(timeout)
      timeout = null
    }
  }
}


/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DynamicInstagramFeed; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var DynamicInstagramFeed =
/*#__PURE__*/
function () {
  function DynamicInstagramFeed(section) {
    _classCallCheck(this, DynamicInstagramFeed);

    this.settings = section.data;
    this.onboarding = this.settings.onboarding;
    this.photoCount = this.settings.photo_count;
    this.accessToken = this.settings.access_token;
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);

    this._load();
  }

  _createClass(DynamicInstagramFeed, [{
    key: "_load",
    value: function _load() {
      var _this = this;

      this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
      this.$photoContainer = this.$el.find('[data-instagram-content]');
      this.$photoContainerPlaceholder = this.$el.find('[data-instagram-photo-placeholder]');
      this.$photoTemplate = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<figure class="instagram--photo" data-instagram-photo />'); // Activate flickity on mobile

      this._mobileSlider = this._mobileSlider.bind(this);
      _Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].onBreakpointChange(this._mobileSlider);

      this._mobileSlider();

      if (this.onboarding || !this.accessToken) {
        return;
      }

      this._getPhotos().done(function (photos) {
        return _this._renderPhotos(photos);
      }).fail(function (error) {
        console.warn("Instagram: ".concat(error));
      });
    }
  }, {
    key: "_getPhotos",
    value: function _getPhotos() {
      var url = "https://api.instagram.com/v1/users/self/media/recent?access_token=".concat(this.accessToken, "&count=").concat(this.photoCount, "&callback=");
      var photoPromise = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax(url, {
        dataType: 'jsonp'
      });
      return photoPromise.then(function (response) {
        if (response.meta.code !== 200) {
          var error = "".concat(response.meta.error_message, " (").concat(response.meta.error_type, ")");
          return jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Deferred().reject(error).promise();
        }

        return response.data;
      });
    }
  }, {
    key: "_renderPhotos",
    value: function _renderPhotos(photos) {
      var _this2 = this;

      var photoArray = [];
      var photoIndex = 0;
      photos.forEach(function (photo) {
        photoIndex += 1;

        var $template = _this2.$photoTemplate.clone();

        var lowResolution = photo.images.low_resolution;
        var standardResolution = photo.images.standard_resolution;
        var imageURL = lowResolution.url;

        if (window.devicePixelRatio >= 2) {
          imageURL = standardResolution.url;
        }

        var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()("<a aria-label=\"view photo ".concat(photoIndex, " by ").concat(photo.user.username, " on instagram\" target=\"_blank\" href=\"").concat(photo.link, "\"></a>"));
        var $photo = jquery__WEBPACK_IMPORTED_MODULE_0___default()("\n        <div\n          class=\"instagram--photo-img\"\n          role=\"img\"\n          style=\"background-image: url(".concat(imageURL, ");\"\n          aria-label=\"photo ").concat(photoIndex, " by ").concat(photo.user.username, " on instagram\"\n        >\n      "));
        $link.append($photo);
        $template.append($link);
        photoArray.push($template);
      });
      this.$photoContainerPlaceholder.fadeOut(function () {
        _this2._destroyFlickity();

        _this2.$photoContainer.append(photoArray);

        _this2.$photoContainerPlaceholder.remove();

        _this2._mobileSlider();
      });
    }
  }, {
    key: "_initFlickity",
    value: function _initFlickity() {
      this.flickity = new flickity__WEBPACK_IMPORTED_MODULE_2___default.a(this.$photoContainer[0], {
        cellSelector: '.instagram--photo',
        contain: true,
        freeScroll: true,
        percentPosition: false,
        prevNextButtons: false,
        pageDots: false,
        setGallerySize: false
      });

      this._bindSlider();
    }
  }, {
    key: "_destroyFlickity",
    value: function _destroyFlickity() {
      if (!this.flickity) {
        return;
      }

      this.$window.off('.instagram-feed');
      this.$photoContainer.off('.instagram-feed');
      this.flickity.destroy();
      this.flickity = null;
    }
  }, {
    key: "_mobileSlider",
    value: function _mobileSlider() {
      // If is Large layout, attempt to destroy flickity
      if (_Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isBreakpoint('L') || _Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isBreakpoint('M')) {
        this._destroyFlickity();

        return;
      } // Is XS/S/M, and flickity is init'd -- do nothing


      if (this.flickity) {
        return;
      } // Is XS/S/M, and flickity is not init'd


      this._initFlickity();
    }
  }, {
    key: "_bindSlider",
    value: function _bindSlider() {
      var _this3 = this;

      var $slider = this.$photoContainer.find('.flickity-slider');
      this.$window.on('resize.instagram-feed', just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(function () {
        _this3.$photoContainer.trigger('heightUpdate.instagram-feed');
      }));
      this.flickity.on('cellSelect', function () {
        _this3.$photoContainer.trigger('heightUpdate.instagram-feed');
      });
      this.$photoContainer.on('heightUpdate.instagram-feed', function () {
        if (!_this3.flickity) {
          return;
        }

        $slider.height(Math.ceil(_this3.flickity.maxCellHeight));
      }); // Sets the Slider to the height of the first slide

      this.$photoContainer.trigger('heightUpdate.instagram-feed');
    }
  }]);

  return DynamicInstagramFeed;
}();



/***/ })

}]);
//# sourceMappingURL=DynamicInstagramFeed.bundle.js.map?1565631014304