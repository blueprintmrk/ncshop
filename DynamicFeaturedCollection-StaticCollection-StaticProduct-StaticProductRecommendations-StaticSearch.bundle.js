(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

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

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(2);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// CONCATENATED MODULE: ./source/scripts/helpers/Quantity.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Quantity =
/*#__PURE__*/
function () {
  function Quantity(el) {
    _classCallCheck(this, Quantity);

    this.$el = $(el);
    this.$inputParent = this.$el.find('.form-field--qty-input');
    this.$input = this.$el.find('[data-quantity-input]');
    this.$selectParent = this.$el.find('.form-field--qty-select');
    this.$select = this.$el.find('[data-quantity-select]');
    this._watchSelect = this._watchSelect.bind(this);
    this._watchInput = this._watchInput.bind(this);
    this.$select.on('change.quantity', this._watchSelect);
    this.$input.on('change.quantity', this._watchInput);
  }

  _createClass(Quantity, [{
    key: "unload",
    value: function unload() {
      this.$el.off('.quantity');
    }
  }, {
    key: "_validateValue",
    value: function _validateValue(event) {
      var baseValue = parseInt(event.currentTarget.value, 10);
      return isNaN(baseValue) ? 1 : baseValue;
    }
  }, {
    key: "_watchSelect",
    value: function _watchSelect(event) {
      var value = this._validateValue(event); // Update input to match select


      this.$input.val(value).trigger('change'); // Switch to quantity input when 10 or more

      if (value >= 10) {
        this.$inputParent.removeClass('hidden').addClass('visible');
        this.$input.focus().removeAttr('tabindex').select();
        this.$selectParent.removeClass('visible').addClass('hidden');
        this.$select.attr('tabindex', '-1');
      }
    }
  }, {
    key: "_watchInput",
    value: function _watchInput(event) {
      this.$input.val(this._validateValue(event));
    }
  }]);

  return Quantity;
}();


// CONCATENATED MODULE: ./source/scripts/Forms.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Forms_Forms; });
function Forms_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Forms_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Forms_createClass(Constructor, protoProps, staticProps) { if (protoProps) Forms_defineProperties(Constructor.prototype, protoProps); if (staticProps) Forms_defineProperties(Constructor, staticProps); return Constructor; }




var Forms_Forms =
/*#__PURE__*/
function () {
  function Forms($el) {
    var _this = this;

    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.form-field-input';

    Forms_classCallCheck(this, Forms);

    this.$el = $el;
    this.filledClass = 'form-field-filled';
    this.fieldSelector = selector;
    this.quantityItems = [];
    this.$quantityWrapper = this.$el.find('[data-quantity-wrapper]');
    this._toggleFilled = this._toggleFilled.bind(this);
    this.$el.on('focus.forms', this.fieldSelector, this._toggleFilled);
    this.$el.on('blur.forms', this.fieldSelector, this._toggleFilled);

    this._checkFilled();

    if (this.$quantityWrapper.length) {
      this.$quantityWrapper.each(function (i, el) {
        _this.quantityItems.push(new Quantity(el));
      });
    }
  }

  Forms_createClass(Forms, [{
    key: "unload",
    value: function unload() {
      this.$el.off('.forms');
      this.quantityItems.forEach(function (quantityItem) {
        quantityItem.unload();
      });
    }
  }, {
    key: "_checkFilled",
    value: function _checkFilled() {
      var _this2 = this;

      this.$el.find(this.fieldSelector).each(function (i, el) {
        if (jquery_default()(el).hasClass(_this2.filledClass)) return;

        _this2._toggleFilled(null, el);
      });
    }
  }, {
    key: "_toggleFilled",
    value: function _toggleFilled() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var target = event ? event.currentTarget : el;
      var $target = jquery_default()(target);
      var value = target.value;
      var isFilled = value.length > 0;

      try {
        isFilled = isFilled || $target.is(':-webkit-autofill');
        $target.toggleClass(this.filledClass, isFilled);
      } catch (e) {
        $target.toggleClass(this.filledClass, isFilled);
      }
    }
  }]);

  return Forms;
}();



/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RichText; });
/* harmony import */ var fitvids__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var fitvids__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fitvids__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grouped_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var grouped_content__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grouped_content__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var RichText =
/*#__PURE__*/
function () {
  function RichText($el) {
    _classCallCheck(this, RichText);

    this.$el = $el;

    this._initExternalLinks();

    this.groupedContent = null;

    if (this.$el.length) {
      this.groupedContent = new grouped_content__WEBPACK_IMPORTED_MODULE_1___default.a($el.get(0), {
        layout: 'tabs',
        intelliparse: false
      });
      fitvids__WEBPACK_IMPORTED_MODULE_0___default()('.rte');
    }
  }

  _createClass(RichText, [{
    key: "unload",
    value: function unload() {
      if (this.groupedContent) {
        this.groupedContent.unload();
      }
    }
    /**
     * Open links within an RTE field in a new window if they point to external domains
     *
     * @private
     */

  }, {
    key: "_initExternalLinks",
    value: function _initExternalLinks() {
      var anchors = this.$el.find('a[href^="http"]').filter(function (i, el) {
        return el.href.indexOf(location.hostname) === -1;
      });
      anchors.attr('target', '_blank');
    }
  }]);

  return RichText;
}();



/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return scrollLeft; });
function scrollLeft($el) {
  var $container = $el.parent();
  $container.animate({
    scrollLeft: $el.offset().left - $el.width() / 2 - $container.width() / 2
  });
}

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBanner; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MessageBanner =
/*#__PURE__*/
function () {
  function MessageBanner() {
    var _this = this;

    _classCallCheck(this, MessageBanner);

    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.$document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    this.$bannerTemplate = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-templates] [data-message-banner]');
    this.$banners = [];
    this.header = document.querySelector('[data-site-header]');
    this.events = [];
    this.$document.on('touchstart.message-banner, click.message-banner', function (event) {
      _this._handleDocumentClick(event.target);
    });
    this.$window.on('keydown.message-banner', function (event) {
      return _this._closeEsc(event);
    });
  }

  _createClass(MessageBanner, [{
    key: "unload",
    value: function unload() {
      this.$document.off('touchstart.message-banner, click.message-banner');
      this.$window.off('keydown.message-banner');
    }
  }, {
    key: "message",
    value: function message(_message, type) {
      var $banner = this.$bannerTemplate.clone();
      $banner.addClass("message--".concat(type)).find('[data-message-banner-content]').html(_message);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.header).append($banner);

      this._bindEvents($banner);

      this._show($banner);
    }
  }, {
    key: "dismissBanners",
    value: function dismissBanners() {
      var _this2 = this;

      var $visibleBanners = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-message-banner]:visible');
      $visibleBanners.each(function (index, banner) {
        _this2._hide(jquery__WEBPACK_IMPORTED_MODULE_0___default()(banner), index);
      });
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents($banner) {
      var _this3 = this;

      this.events.push([$banner.on('click.message-banner', '[data-message-banner-close]', function (event) {
        event.preventDefault();

        _this3._hide($banner);
      }), this.$window.on('keydown.message-banner', function (e) {
        if (e.key === 'Escape') {
          _this3._hide($banner);
        }
      })]);
    }
  }, {
    key: "_closeEsc",
    value: function _closeEsc(e) {
      if (e.key === 'Escape') {
        this.dismissBanners();
      }
    }
  }, {
    key: "_show",
    value: function _show($banner) {
      this.$banners.push($banner);
      $banner.addClass('animating animating-in').one('trend', function () {
        $banner.removeClass('animating animating-in').addClass('visible').off('trend');
      });
    }
  }, {
    key: "_hide",
    value: function _hide($banner) {
      var _this4 = this;

      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      $banner.addClass('animating animating-out').one('trend', function () {
        $banner.removeClass('animating animating-out visible').off('trend');

        _this4._removeBanner($banner, index);
      });
    }
  }, {
    key: "_removeBanner",
    value: function _removeBanner($banner, index) {
      if (this.events[index]) {
        this.events[index].forEach(function ($el) {
          return $el.off('.message-banner');
        });
        this.events.splice(index, 1);
      }

      this.$banners.splice(index, 1);
      $banner.remove();
    }
  }, {
    key: "_handleDocumentClick",
    value: function _handleDocumentClick(target) {
      var $parent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).parents('[data-message-banner]');
      if ($parent.length) return;
      this.dismissBanners();
    }
  }]);

  return MessageBanner;
}();



/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/scriptjs/dist/script.js
var script = __webpack_require__(5);
var script_default = /*#__PURE__*/__webpack_require__.n(script);

// CONCATENATED MODULE: ./source/scripts/components/Youtube.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var api = 'https://www.youtube.com/iframe_api';
var apiLoadedCallbacks = [];
var apiLoaded = false;

window.onYouTubeIframeAPIReady = function () {
  apiLoadedCallbacks.forEach(function (apiLoadedCallback) {
    return apiLoadedCallback();
  });
  apiLoadedCallbacks = [];
  apiLoaded = true;
};

var Youtube_Youtube =
/*#__PURE__*/
function () {
  function Youtube(_ref) {
    var el = _ref.el,
        videoUrl = _ref.videoUrl;

    _classCallCheck(this, Youtube);

    var regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i; // eslint-disable-line no-useless-escape

    this.el = el;
    this.id = videoUrl.match(regex)[1] || null;
    this.onApiLoaded = this._onApiLoaded.bind(this);
    this.isReady = false;
    this.onReady = this._onReady.bind(this);
    this.onReadyCallback = null;
    this.onStateChange = this._onStateChange.bind(this);
    this.onPlayCallback = null;

    if (apiLoaded) {
      this._onApiLoaded();
    } else {
      apiLoadedCallbacks.push(this.onApiLoaded);
      script_default()(api);
    }
  }

  _createClass(Youtube, [{
    key: "play",
    value: function play() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.onPlayCallback = resolve;

        if (_this.isReady) {
          _this.player.playVideo();
        } else {
          _this.onReadyCallback = function () {
            _this.player.playVideo();
          };
        }
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.onPlayCallback = resolve;

        if (_this2.isReady) {
          _this2.player.pauseVideo();
        } else {
          _this2.onReadyCallback = function () {
            _this2.player.pauseVideo();
          };
        }
      });
    }
  }, {
    key: "autoplay",
    value: function autoplay() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.onPlayCallback = resolve;

        if (_this3.isReady) {
          _this3.player.playVideo();

          _this3.player.mute();
        } else {
          _this3.onReadyCallback = function () {
            _this3.player.playVideo();

            _this3.player.mute();
          };
        }
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      this.player.destroy();
    }
  }, {
    key: "_onApiLoaded",
    value: function _onApiLoaded() {
      this.player = new YT.Player(this.el, {
        videoId: this.id,
        playerVars: {
          modestbranding: true,
          showinfo: false,
          controls: false,
          rel: 0
        },
        events: {
          onReady: this.onReady,
          onStateChange: this.onStateChange
        }
      });
    }
  }, {
    key: "_onReady",
    value: function _onReady() {
      this.isReady = true;

      if (this.onReadyCallback) {
        this.onReadyCallback();
      }
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange(event) {
      var state = event.data;

      if (this.onPlayCallback && state === YT.PlayerState.BUFFERING) {
        this.onPlayCallback();
        this.onPlayCallback = null;
      }
    }
  }]);

  return Youtube;
}();


// CONCATENATED MODULE: ./source/scripts/components/Vimeo.js
function Vimeo_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Vimeo_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Vimeo_createClass(Constructor, protoProps, staticProps) { if (protoProps) Vimeo_defineProperties(Constructor.prototype, protoProps); if (staticProps) Vimeo_defineProperties(Constructor, staticProps); return Constructor; }


var Vimeo_api = 'https://player.vimeo.com/api/player.js';
var Vimeo_apiLoaded = false;

var Vimeo_VimeoPlayer =
/*#__PURE__*/
function () {
  function VimeoPlayer(_ref) {
    var el = _ref.el,
        videoUrl = _ref.videoUrl;

    Vimeo_classCallCheck(this, VimeoPlayer);

    this.el = el;
    var urlParts = videoUrl.split('/');
    this.id = urlParts[urlParts.length - 1];
    this.onReadyCallback = null;
    this.onApiLoaded = this._onApiLoaded.bind(this);
    this.onProgress = this._onProgress.bind(this);
    this.onProgressCallback = null;

    if (Vimeo_apiLoaded) {
      this._onApiLoaded();
    } else {
      script_default()(Vimeo_api, this.onApiLoaded);
    }
  }

  Vimeo_createClass(VimeoPlayer, [{
    key: "play",
    value: function play() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.onProgressCallback = resolve;

        if (Vimeo_apiLoaded) {
          _this.player.on('play', _this.onProgress);

          _this.player.play();
        } else {
          _this.onReadyCallback = function () {
            _this.player.on('play', _this.onProgress);

            _this.player.play();
          };
        }
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.onProgressCallback = resolve;

        if (Vimeo_apiLoaded) {
          _this2.player.on('pause', _this2.onProgress);

          _this2.player.pause();
        } else {
          _this2.onReadyCallback = function () {
            _this2.player.on('pause', _this2.onProgress);

            _this2.player.pause();
          };
        }
      });
    }
  }, {
    key: "autoplay",
    value: function autoplay() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.onProgressCallback = resolve;

        if (Vimeo_apiLoaded) {
          _this3.player.on('play', _this3.onProgress);

          _this3.player.setVolume(0);

          _this3.player.play();
        } else {
          _this3.onReadyCallback = function () {
            _this3.player.on('play', _this3.onProgress);

            _this3.player.setVolume(0);

            _this3.player.play();
          };
        }
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      this.player.unload().catch();
    }
  }, {
    key: "_onApiLoaded",
    value: function _onApiLoaded() {
      this.player = new window.Vimeo.Player(this.el, {
        id: this.id
      });
      this.player.ready().then().catch();
      Vimeo_apiLoaded = true;

      if (this.onReadyCallback) {
        this.onReadyCallback();
      }
    }
  }, {
    key: "_onProgress",
    value: function _onProgress() {
      this.player.off('play', this.onProgress);
      this.player.off('pause', this.onProgress);

      if (this.onProgressCallback) {
        this.onProgressCallback();
        this.onProgressCallback = null;
      }
    }
  }]);

  return VimeoPlayer;
}();


// CONCATENATED MODULE: ./source/scripts/components/Video.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Video_Video; });
function Video_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Video_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Video_createClass(Constructor, protoProps, staticProps) { if (protoProps) Video_defineProperties(Constructor.prototype, protoProps); if (staticProps) Video_defineProperties(Constructor, staticProps); return Constructor; }




var Video_Video =
/*#__PURE__*/
function () {
  function Video(el, options) {
    Video_classCallCheck(this, Video);

    this.el = el;
    this.options = options;
    this.platform = el.getAttribute('data-video').trim();
    this.playButton = el.querySelector('[data-video-play-button]');
    this.videoEl = el.querySelector('[data-video-element]');
    this.onPlayClick = this._onPlayClick.bind(this);
    this.onPauseClick = this._onPauseClick.bind(this);
    this.autoplay = this._autoplay.bind(this);
    this.video = null;
    this.videoData = {
      el: this.videoEl.childNodes[0],
      videoUrl: this.videoEl.getAttribute('data-video-url')
    };

    switch (this.platform) {
      case 'youtube':
        this.video = new Youtube_Youtube(this.videoData);
        break;

      case 'vimeo':
        this.video = new Vimeo_VimeoPlayer(this.videoData);
        break;

      default:
        this.video = null;
        break;
    }

    if (this.playButton) {
      if (this.options && this.options.autoplay) {
        this.autoplay();
      }

      this.playButton.addEventListener('click', this.onPlayClick);
    }
  }

  Video_createClass(Video, [{
    key: "_onPlayClick",
    value: function _onPlayClick() {
      var _this = this;

      this.el.classList.add('video-loading');
      this.video.play().then(function () {
        _this.el.classList.add('video-transitioning');

        setTimeout(function () {
          _this.el.classList.remove('video-loading');

          _this.el.classList.remove('video-transitioning');

          _this.el.classList.add('video-playing');
        }, 200);
      });
    }
  }, {
    key: "_onPauseClick",
    value: function _onPauseClick() {
      this.video.pause();
    }
  }, {
    key: "_autoplay",
    value: function _autoplay() {
      var _this2 = this;

      this.el.classList.add('video-loading');
      this.video.autoplay().then(function () {
        _this2.el.classList.add('video-transitioning');

        setTimeout(function () {
          _this2.el.classList.remove('video-loading');

          _this2.el.classList.remove('video-transitioning');

          _this2.el.classList.add('video-playing');
        }, 200);
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.playButton) {
        this.playButton.removeEventListener('click', this.onPlayClick);
      }

      if (this.video) {
        this.video.unload();
      }
    }
  }]);

  return Video;
}();



/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(2);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// EXTERNAL MODULE: ./node_modules/shopify-currency-converter/dist/index.js
var dist = __webpack_require__(26);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./source/scripts/Forms.js + 1 modules
var Forms = __webpack_require__(25);

// CONCATENATED MODULE: ./source/scripts/ProductOptions.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node =
/*#__PURE__*/
function () {
  function Node(variant) {
    _classCallCheck(this, Node);

    this.variant = variant;
    this.optionsCount = this.variant.options.length;
    this.neighbors = [];

    for (var i = 0; i < this.optionsCount; i++) {
      this.neighbors.push([]);
    }
  }

  _createClass(Node, [{
    key: "addNeighbor",
    value: function addNeighbor(variant) {
      for (var i = 0; i < this.optionsCount; i++) {
        if (this.variant.options[i] !== variant.options[i]) {
          this.neighbors[i].push(variant);
          break;
        }
      }
    }
  }, {
    key: "getValidOptions",
    value: function getValidOptions() {
      var _this = this;

      var options = [];

      var _loop = function _loop(i) {
        var variants = [_this.variant].concat(_toConsumableArray(_this.neighbors[i]));
        options[i] = {};
        variants.forEach(function (item) {
          var variant = item;
          var option = variant.options[i];
          options[i][option] = {
            available: options[i][option] && options[i][option].available || variant.available
          };
        });
      };

      for (var i = 0; i < this.optionsCount; i++) {
        _loop(i);
      }

      return options;
    }
  }]);

  return Node;
}();

var ProductOptions =
/*#__PURE__*/
function () {
  function ProductOptions(product) {
    _classCallCheck(this, ProductOptions);

    this.productHandle = product.handle;
    this.optionsCount = product.options.length;
    this.variants = product.variants;
    this.nodeMap = {};

    this._generateNodeMap(product);
  }

  _createClass(ProductOptions, [{
    key: "_generateNodeMap",
    value: function _generateNodeMap() {
      var _this2 = this;

      this.variants.forEach(function (variant) {
        _this2.nodeMap[variant.id] = new Node(variant);

        _this2.variants.forEach(function (variant2) {
          _this2.nodeMap[variant.id].addNeighbor(variant2);
        });
      });
    }
  }, {
    key: "getVariantFromOptions",
    value: function getVariantFromOptions(options) {
      var foundVariant = false;
      this.variants.forEach(function (variant) {
        var found = true;

        for (var i = 0; i < variant.options.length; i++) {
          if (options[i] !== variant.options[i]) {
            found = false;
          }
        }

        if (found) {
          foundVariant = variant;
        }
      });
      return foundVariant;
    }
  }, {
    key: "getClosestVariantFromOptions",
    value: function getClosestVariantFromOptions(options) {
      var closestVariant = null;
      var matchingValues = 0;
      this.variants.forEach(function (variant) {
        var tempMatchingValues = 0;

        for (var i = 0; i < variant.options.length; i++) {
          if (options[i] === variant.options[i]) {
            tempMatchingValues++;
          } else {
            break;
          }
        }

        if (tempMatchingValues >= matchingValues) {
          closestVariant = variant;
          matchingValues = tempMatchingValues;
        }
      });
      return closestVariant || false;
    }
  }, {
    key: "getVariantOrClosestFromOptions",
    value: function getVariantOrClosestFromOptions(options) {
      return this.getVariantFromOptions(options) || this.getClosestVariantFromOptions(options);
    }
  }, {
    key: "getAvailableOptionsFromVariant",
    value: function getAvailableOptionsFromVariant(variant) {
      return this.nodeMap[variant.id].getValidOptions();
    }
  }]);

  return ProductOptions;
}();


// CONCATENATED MODULE: ./source/scripts/VariantHelper.js
function VariantHelper_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function VariantHelper_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function VariantHelper_createClass(Constructor, protoProps, staticProps) { if (protoProps) VariantHelper_defineProperties(Constructor.prototype, protoProps); if (staticProps) VariantHelper_defineProperties(Constructor, staticProps); return Constructor; }




var VariantHelper_VariantHelper =
/*#__PURE__*/
function () {
  function VariantHelper(product, $variants, $options) {
    VariantHelper_classCallCheck(this, VariantHelper);

    this.product = product;
    this.optionsCount = this.product.options.length;
    this.$variants = $variants;
    this.$options = $options;
    this.productOptions = new ProductOptions(this.product);
    this.optionsTypes = {
      select: 'select',
      radio: 'input[type="radio"]'
    };

    this._bindEvents();

    if (this.$options.is(this.optionsTypes.select)) {
      this.optionsType = this.optionsTypes.select;
    } else if (this.$options.is(this.optionsTypes.radio)) {
      this.optionsType = this.optionsTypes.radio;
    } else {
      console.warn('Variant helper: Option set is not a valid type');

      this._unbindEvents();
    }

    this._switchVariant(null, true);
  }

  VariantHelper_createClass(VariantHelper, [{
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this = this;

      this.$options.on('change.variant-helper', function (event) {
        return _this._switchVariant(event);
      });
    }
  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      this.$options.off('change.variant-helper');
    }
  }, {
    key: "_switchVariant",
    value: function _switchVariant(event) {
      var firstLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var options = [];
      var $selected = event ? jquery_default()(event.target) : null;
      var variant = null;
      var availableOptions = null;

      if (this.optionsType === this.optionsTypes.select) {
        this.$options.each(function (i, option) {
          options.push(option.value);
        });
      } else if (this.optionsType === this.optionsTypes.radio) {
        this.$options.filter(':checked').each(function (i, option) {
          options.push(option.value);
        });
      } else {
        return;
      }

      variant = this.productOptions.getVariantOrClosestFromOptions(options);

      if (variant) {
        availableOptions = this.productOptions.getAvailableOptionsFromVariant(variant);
      } else {
        return;
      }

      if (this.optionsType === this.optionsTypes.select) {
        this._switchVariantSelect(variant, availableOptions);
      } else if (this.optionsType === this.optionsTypes.radio) {
        this._switchVariantRadio(variant, availableOptions);

        if ($selected) {
          $selected.focus();
        }
      } else {
        return;
      }

      this.$variants.val(variant.id);
      jquery_default()(window).trigger('product-variant-switch', {
        product: this.product,
        variant: variant,
        firstLoad: firstLoad
      });
    }
  }, {
    key: "_switchVariantSelect",
    value: function _switchVariantSelect(variant, availableOptions) {
      var _this2 = this;

      var _loop = function _loop(i) {
        // Corresponding select dropdown
        var $select = jquery_default()(_this2.$options[i]);
        var $optionEls = $select.find('option'); // Iterate over each option on dropdown

        $optionEls.each(function (index, option) {
          var $option = jquery_default()(option);
          var value = option.value; // Not an available option

          $option.prop('disabled', !availableOptions[i][value] || !availableOptions[i][value].available).prop('selected', false); // Dropdown option matches variant option

          if (variant.options[i] === value) {
            $option.prop('disabled', false).prop('selected', true);
          }
        });
      };

      // Iterate over each option type
      for (var i = 0; i < this.product.options.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "_switchVariantRadio",
    value: function _switchVariantRadio(variant, availableOptions) {
      var _this3 = this;

      this.$options.attr('disabled', true).prop('checked', false).attr('data-soldout', false);

      var _loop2 = function _loop2(i) {
        var selector = encodeURIComponent(_this3.product.options[i]).replace(/%20/g, '+').replace(/[!'()*]/g, function (char) {
          return "%".concat(char.charCodeAt(0).toString(16).toUpperCase());
        });

        var $options = _this3.$options.filter("[name=\"".concat(selector, "\"]"));

        $options.each(function (index, option) {
          var $option = jquery_default()(option);

          if (variant.options[i] === $option.val()) {
            $option.prop('checked', true);
          }

          if (availableOptions[i][$option.val()]) {
            $option.attr('disabled', false);

            if (!availableOptions[i][$option.val()].available) {
              $option.attr('disabled', true);
              $option.attr('data-soldout', true);
            }
          }
        });
      };

      for (var i = 0; i < this.product.options.length; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "isDefault",
    value: function isDefault() {
      if (this.product.variants[0].title === 'Default Title' && this.product.variants[0].option1 === 'Default Title') {
        return true;
      }

      return false;
    }
  }, {
    key: "hasSingleOption",
    value: function hasSingleOption() {
      return this.optionsCount === 1;
    }
  }, {
    key: "getSelectedVariant",
    value: function getSelectedVariant() {
      var options = [];

      if (this.optionsType === this.optionsTypes.select) {
        this.$options.each(function (i, option) {
          options.push(option.value);
        });
      } else if (this.optionsType === this.optionsTypes.radio) {
        this.$options.filter(':checked').each(function (i, option) {
          options.push(option.value);
        });
      } else {
        return null;
      }

      return this.productOptions.getVariantFromOptions(options);
    }
  }, {
    key: "unload",
    value: function unload() {
      this._unbindEvents();
    }
  }]);

  return VariantHelper;
}();


// EXTERNAL MODULE: ./source/scripts/components/AddToCartFlyout.js + 1 modules
var AddToCartFlyout = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/flickity/js/index.js
var js = __webpack_require__(6);
var js_default = /*#__PURE__*/__webpack_require__.n(js);

// EXTERNAL MODULE: ./source/scripts/Layout.js
var Layout = __webpack_require__(23);

// EXTERNAL MODULE: ./source/scripts/helpers/scrollLeft.js
var scrollLeft = __webpack_require__(36);

// CONCATENATED MODULE: ./source/scripts/helpers/flickityHelper.js
/**
 * Determines if flickity needs to be resized based on the selected image height
 *
 * @param {object} flickity - the flickity instance
 */
function resizeFlickityIfNeeded(flickity) {
  if (!flickity) {
    return;
  }

  var activeHeight = flickity.selectedElement.offsetHeight;
  var flickityHeight = flickity.viewport.offsetHeight; // If flickity height is greater than slide height, ignore

  if (activeHeight < flickityHeight) {
    return;
  }

  flickity.resize();
}
// EXTERNAL MODULE: ./source/scripts/components/Video.js + 2 modules
var Video = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/pixelzoom/dist/index.es.js
var index_es = __webpack_require__(48);

// CONCATENATED MODULE: ./source/scripts/components/ProductZoom.js
function ProductZoom_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProductZoom_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProductZoom_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProductZoom_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProductZoom_defineProperties(Constructor, staticProps); return Constructor; }





var ProductZoom_ProductZoom =
/*#__PURE__*/
function () {
  function ProductZoom(options) {
    ProductZoom_classCallCheck(this, ProductZoom);

    this.$gallery = options.$gallery;
    this.settings = options.settings;
    this.$slider = this.$gallery.find('[data-product-slider]');
    this.$pixelzoomOverlay = this.$gallery.find('[data-pixelzoom-overlay]');
    this.$pixelzoomOverlayContainer = this.$pixelzoomOverlay.find('[data-pixelzoom-overlay-container]');
    this.imageZoom = {};
    this.zoomOverlay = null;
    this.index = 0;
    this._beforeOpen = this._beforeOpen.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._showZoomInstructions = this._showZoomInstructions.bind(this);
    this.modalOpen = false;
    this.swipping = false;
    this.touched = false;

    this._bindEvents();

    this.enableZoom();
  }

  ProductZoom_createClass(ProductZoom, [{
    key: "unload",
    value: function unload() {
      var _this = this;

      if (Object.keys(this.imageZoom).length !== 0) {
        Object.keys(this.imageZoom).forEach(function (image) {
          _this.imageZoom[image].unload();
        });
        this.imageZoom = {};
      }

      if (this.zoomOverlay) {
        this.zoomOverlay.unload();
        this.zoomOverlay = null;
      }

      document.body.removeEventListener('touchmove', function (event) {
        event.preventDefault();
      }, {
        passive: false
      });
      this.$pixelzoomOverlayContainer.off('pixelzoom:pan');
      this.$pixelzoomOverlayContainer.off('pixelzoom:release');
      this.$slider.off('.product-zoom');
    }
  }, {
    key: "enableZoom",
    value: function enableZoom(index) {
      var _this2 = this;

      if (Layout["a" /* default */].isBreakpoint('XS')) {
        this.unload();
        return;
      }

      if (index !== -1 && index || index === 0) {
        this.index = index;
      }

      var $newSlide = this.$slider.find("[data-product-image-index=".concat(this.index, "] .product-galley--image-background"));
      var inObject = !this.imageZoom[this.index];
      var slideExists = this.$gallery.find("[data-product-image-index=".concat(this.index, "][data-product-image-zoom]")).length;

      if (inObject && slideExists) {
        this.imageZoom[this.index] = new index_es["a" /* default */]($newSlide[0], {
          imageSource: $newSlide[0].dataset.image,
          initialZoom: this.settings.image_zoom_level === 'min' ? 1 : 9999,
          zoomSensitivity: 10,
          maxZoom: 9999,
          zoomSteps: 9999,
          naturalPan: true
        });
        $newSlide.on('pixelzoom:loaded', function () {
          _this2._showZoomInstructions($newSlide);

          jquery_default()(window).on('resize', function () {
            _this2._showZoomInstructions($newSlide);
          });
        });
        $newSlide.on('pixelzoom:touch', function () {
          var imageWidth = $newSlide.find('.pixelzoom--image').get(0).naturalWidth;
          var imageHeight = $newSlide.find('.pixelzoom--image').get(0).naturalHeight;

          if (!Layout["a" /* default */].isBreakpoint('XS') && (imageWidth / $newSlide.width() >= 2 || imageHeight / $newSlide.height() >= 2)) {
            _this2._toggleClass(jquery_default()('body'), 'pixelzoom--active');
          }

          _this2.touched = true;
        });
        $newSlide.on('pixelzoom:release', function () {
          _this2._toggleClass(jquery_default()('body'), 'pixelzoom--active', true);

          _this2.touched = false;
        });
      }
    }
  }, {
    key: "_showZoomInstructions",
    value: function _showZoomInstructions($newSlide) {
      setTimeout(function () {
        if ($newSlide.css('cursor') !== 'default') {
          $newSlide.find('.product-galley--zoom-instructions').css('display', 'block');
        }
      }, 200);
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this3 = this;

      this.$slider.on('dragStart.flickity', function () {
        _this3._preventClick();
      });
      this.$slider.on('settle.flickity', function () {
        _this3._resolveClick();
      });
      document.body.addEventListener('touchmove', function (event) {
        _this3._preventScroll(event);
      }, {
        passive: false
      });
    }
  }, {
    key: "_toggleClass",
    value: function _toggleClass(element, className, remove) {
      if (remove) {
        element.removeClass(className);
      } else {
        element.addClass(className);
      }
    }
  }, {
    key: "_beforeOpen",
    value: function _beforeOpen() {
      var $newSlide = this.$slider.find("[data-product-image-index=".concat(this.index, "] .product-galley--image-background"));
      this.$pixelzoomOverlayContainer.find('[data-rimg]').replaceWith($newSlide.find('[data-rimg]').clone());
    }
  }, {
    key: "_onOpen",
    value: function _onOpen() {
      var _this4 = this;

      var $newSlide = this.$slider.find("[data-product-image-index=".concat(this.index, "] .product-galley--image-background"));
      this.modalOpen = true;
      setTimeout(function () {
        _this4.zoomOverlay = new index_es["a" /* default */](document.querySelector('[data-modal-content]'), {
          imageSource: $newSlide[0].dataset.image,
          naturalPan: true,
          dragPan: true,
          initialZoom: _this4.settings.image_zoom_level === 'min' ? 1 : 9999,
          maxZoom: 9999,
          zoomSensitivity: 10,
          zoomSteps: 9999,
          overflowContainer: document.querySelector('.modal--pixelzoom')
        });
        jquery_default()('[data-modal-content]').on('pixelzoom:loaded', function () {
          jquery_default()('[data-modal-content]').addClass('loaded');
        });
        jquery_default()('[data-modal-content]').on('pixelzoom:touch', function () {
          _this4._toggleClass(jquery_default()('body'), 'pixelzoom--active');
        });
        jquery_default()('[data-modal-content]').on('pixelzoom:release', function () {
          _this4._toggleClass(jquery_default()('body'), 'pixelzoom--active', true);
        });
      }, 500);
    }
  }, {
    key: "_onClose",
    value: function _onClose() {
      jquery_default()('[data-modal-content]').removeClass('loaded');
      this.zoomOverlay.unload();
      this.zoomOverlay = null;
      this.modalOpen = false;
    }
  }, {
    key: "_preventScroll",
    value: function _preventScroll(event) {
      if (this.modalOpen || this.touched && !Layout["a" /* default */].isBreakpoint('XS')) {
        event.preventDefault();
      }
    }
  }, {
    key: "_preventClick",
    value: function _preventClick() {
      this.swipping = true;
    }
  }, {
    key: "_resolveClick",
    value: function _resolveClick() {
      this.swipping = false;
    }
  }]);

  return ProductZoom;
}();


// CONCATENATED MODULE: ./source/scripts/components/ProductGallery.js
function ProductGallery_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProductGallery_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProductGallery_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProductGallery_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProductGallery_defineProperties(Constructor, staticProps); return Constructor; }









var ProductGallery_ProductGallery =
/*#__PURE__*/
function () {
  function ProductGallery(options) {
    ProductGallery_classCallCheck(this, ProductGallery);

    this.$gallery = options.$gallery;
    this.settings = options.settings;
    this.isQuickshop = options.isQuickshop || false; // Gallery

    this.flickity = null;
    this.slider = '[data-product-slider]';
    this.$slider = this.$gallery.find(this.slider);
    this.slides = '[data-product-image]';
    this.$slides = this.$gallery.find(this.slides);
    this.$sliderPagination = this.$gallery.find('[data-product-slider-pagination]');
    this.$paginationTrigger = this.$gallery.find('[data-product-thumbnail]');
    this.productZoom = null;

    if (this.settings.enable_image_zoom) {
      this.productZoom = new ProductZoom_ProductZoom(options);
    }

    this.videos = {};
    this.videoSlides = this.$slider[0].querySelectorAll('[data-product-image-video]'); // Re-initialise gallery when crossing breakpoints if needed

    this._onUpdateGallery = this._onUpdateGallery.bind(this);
    Layout["a" /* default */].onBreakpointChange(this._onUpdateGallery);
    this.slideImageLoaded = this._onSlideImageLoaded.bind(this);
    this.variantChange = this._onVariantChange.bind(this);

    if (this.isQuickshop) {
      this.$gallery.trigger('theme:rimg:watch');
    }

    this._init();
  }

  ProductGallery_createClass(ProductGallery, [{
    key: "unload",
    value: function unload() {
      this.$slider[0].removeEventListener('rimg:load', this.slideImageLoaded);

      if (this.productZoom) {
        this.productZoom.unload();
      }

      if (this.isQuickshop) {
        this.$gallery.trigger('theme:rimg:unwatch');
      }

      if (this.isQuickshop) {
        this._onUpdateGallery();
      }

      Layout["a" /* default */].offBreakpointChange(this._onUpdateGallery);

      this._unloadGallery();
    }
  }, {
    key: "_init",
    value: function _init() {
      this.$slider[0].addEventListener('rimg:load', this.slideImageLoaded);

      if (this.videoSlides.length) {
        for (var i = 0; i < this.videoSlides.length; i += 1) {
          var videoSlide = this.videoSlides[i];
          var slideId = videoSlide.getAttribute('data-product-image');
          var videoEl = videoSlide.querySelector('[data-video]');
          this.videos[slideId] = new Video["a" /* default */](videoEl);
        }
      }

      if (this.$slides.length) {
        this._initGallery();
      }
    }
    /**
     * Make sure Flickity updates viewport height when images load in
     * @private
     */

  }, {
    key: "_onSlideImageLoaded",
    value: function _onSlideImageLoaded() {
      resizeFlickityIfNeeded(this.flickity);
    }
  }, {
    key: "_unloadGallery",
    value: function _unloadGallery() {
      if (this.flickity) {
        for (var i = 0; i < this.videos.length; i += 1) {
          this.videos[i].unload();
        }

        this.$paginationTrigger.off('.gallery');
        this.flickity.destroy();
        this.flickity = null;
        this.$slider.find(this.slides).attr('style', '');
      }
    }
  }, {
    key: "_onUpdateGallery",
    value: function _onUpdateGallery() {
      /**
        Do not reset the gallery if we are taking an element full-screen.
        This function is called by layout.onBreakpointChange, a side effect
        of going full-screen with a video. If there is a full-screen element
        just return out of this function.
      */
      if (document.fullscreenElement !== null) {
        return;
      }

      this._unloadGallery();

      this._initGallery();
    }
    /**
     * Update gallery on variant change
     *
     * @param variant
     * @property {Object} options.featured_image - Featured image information
     * @private
     */

  }, {
    key: "_onVariantChange",
    value: function _onVariantChange(variant) {
      if (!variant.featured_image || !this.flickity) {
        return;
      }

      var index = this.$slider.find("[data-product-image=".concat(variant.featured_image.id, "]")).attr('data-product-image-index');
      this.flickity.select(index, false, false);
    }
  }, {
    key: "_initGallery",
    value: function _initGallery() {
      var $selectedImage = this.$slider.find('.image--selected'); // Options shared on Desktop and Mobile

      var flickityOptions = {
        autoPlay: 0,
        accessibility: true,
        adaptiveHeight: true,
        cellAlign: 'left',
        cellSelector: this.slides,
        pageDots: false,
        prevNextButtons: false,
        wrapAround: true
      }; // Mobile only options

      var optionsMobile = {
        draggable: true,
        friction: 0.8,
        selectedAttraction: 0.2
      }; // Desktop only options

      var optionsDesktop = {
        draggable: false
      };

      if (Layout["a" /* default */].isBreakpoint('XS')) {
        flickityOptions = jquery_default.a.extend({}, optionsMobile, flickityOptions);
      } else {
        flickityOptions = jquery_default.a.extend({}, optionsDesktop, flickityOptions);
      } // If a variant has an image pre-selected, start the slideshow at that image
      // If the slideshow has been re-initalised across a break point, slideshow
      // restarts at same slide


      if ($selectedImage.length) {
        var initialIndex = parseInt($selectedImage.attr('data-product-image-index'), 10);
        flickityOptions = jquery_default.a.extend({}, {
          initialIndex: initialIndex
        }, flickityOptions);
      }

      this.flickity = new js_default.a(this.$slider[0], flickityOptions);

      this._bindGallery();

      this._handleGalleryVideos();
    }
  }, {
    key: "_bindGallery",
    value: function _bindGallery() {
      var _this = this;

      this.flickity.on('select', function () {
        _this._updateActiveSlide(_this.flickity.selectedIndex);

        _this._handleGalleryVideos();
      });
      this.$paginationTrigger.on('click.gallery', function (event) {
        event.preventDefault();
        var $target = jquery_default()(event.currentTarget);

        _this.flickity.select($target.attr('data-product-thumbnail'), false, false);
      });
    }
    /**
     * Handle gallery videos
     * - Pause video if is not active slide
     * - Play video if is active slide, and is autoplay
     *
     * @private
     */

  }, {
    key: "_handleGalleryVideos",
    value: function _handleGalleryVideos() {
      var _this2 = this;

      var slideId = parseInt(this.flickity.selectedElement.getAttribute('data-product-image'), 10);
      Object.keys(this.videos).forEach(function (key) {
        var videoKey = parseInt(key, 10); // Pause inactive slide videos

        if (slideId !== videoKey) {
          _this2.videos[videoKey].onPauseClick();
        } // Play video if is selected, and auto play enabled


        if (slideId === videoKey && _this2.settings.enable_video_autoplay) {
          _this2.videos[videoKey].autoplay();
        }
      });
    }
    /**
     * Adds a non-flickity active class to thumbnails, and main slideshow
     *  - Is used on re-init across breakpoints
     *  - Is used to show the active thumbnail in the pagination
     *
     * @param index
     * @private
     */

  }, {
    key: "_updateActiveSlide",
    value: function _updateActiveSlide(index) {
      var $newSlide = this.$slider.find("[data-product-image-index=".concat(index, "]"));
      var $newThumbnail = this.$sliderPagination.find("[data-product-thumbnail=".concat(index, "]"));
      $newSlide.addClass('image--selected').attr('aria-hidden', 'false').siblings('.image--selected').removeClass('image--selected').attr('aria-hidden', 'true');
      $newThumbnail.addClass('thumbnail--selected').siblings('.thumbnail--selected').removeClass('thumbnail--selected');

      if (Layout["a" /* default */].isBreakpoint('XS')) {
        Object(scrollLeft["a" /* default */])($newThumbnail);
      }

      if (this.settings.enable_image_zoom) {
        this.productZoom.enableZoom(index);
      }
    }
  }]);

  return ProductGallery;
}();


// CONCATENATED MODULE: ./source/scripts/components/ProductDetails.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetails_ProductDetails; });
function ProductDetails_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProductDetails_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProductDetails_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProductDetails_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProductDetails_defineProperties(Constructor, staticProps); return Constructor; }








var ProductDetails_ProductDetails =
/*#__PURE__*/
function () {
  function ProductDetails(options) {
    ProductDetails_classCallCheck(this, ProductDetails);

    this.$window = jquery_default()(window);
    this.$formArea = options.$formArea;
    this.$gallery = options.$gallery;
    this.$details = options.$details;
    this.context = options.context;
    this.settings = options.settings;
    this.product = options.product;
    this.useHistory = options.useHistory;
    this.variantHelper = null;
    this.atcCallbacks = options.atcCallbacks; // Form

    this.$form = this.$formArea.find('[data-product-form]');
    this.$productAtcButton = this.$formArea.find('[data-product-atc]');
    this.$productVariants = this.$form.find('[data-variants]');
    this.$productOptions = this.$form.find('[data-product-option]');
    this.variantFields = {
      $price: this.$details.find('[data-price]'),
      $priceMoney: this.$details.find('[data-price] .money'),
      $compareAtPrice: this.$details.find('[data-price-compare-at]'),
      $compareAtPriceMoney: this.$details.find('[data-price-compare-at] .money'),
      $badge: this.$details.find('[data-badge-sales]'),
      $badgeMoneySaved: this.$details.find('[data-price-money-saved]'),
      $badgePercentSaved: this.$details.find('[data-price-percent-saved]'),
      $sku: this.$details.find('[data-product-sku]')
    };
    this.forms = new Forms["a" /* default */](this.$form);
    this.gallery = new ProductGallery_ProductGallery(options);

    this._bindEvents();

    this._initOptions();
  }

  ProductDetails_createClass(ProductDetails, [{
    key: "unload",
    value: function unload() {
      this.$form.off('.product-details');
      this.forms.unload();

      if (this.variantHelper) {
        this.variantHelper.unload();
      }

      this.gallery.unload();
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this = this;

      this.$window.on('product-variant-switch.product-details', function (event, data) {
        return _this._switchVariant(event, data);
      });
      this.$form.on('submit.product-details', function (event) {
        return _this._AddToCartFlyout(event);
      });
    }
  }, {
    key: "_initOptions",
    value: function _initOptions() {
      if (!this.$productVariants.length) return;
      this.variantHelper = new VariantHelper_VariantHelper(this.product, this.$productVariants, this.$productOptions);
    }
  }, {
    key: "_switchVariant",
    value: function _switchVariant(event, data) {
      if (data.product !== this.product) return;
      var variant = data.variant,
          firstLoad = data.firstLoad;

      if (firstLoad) {
        return;
      } // Update main select


      this.$productVariants.val(data.variant.id);
      this.gallery.variantChange(variant); // Update Variant information

      this._updatePrice(variant);

      this._updateSKU(variant);

      this._updateBadge(variant);

      this._updateButton(variant);

      if (this.useHistory) {
        var url = "".concat(this.product.handle, "?").concat(jquery_default.a.param({
          variant: variant.id
        }));
        history.replaceState({}, 'variant', url);
      }
    }
  }, {
    key: "_updatePrice",
    value: function _updatePrice(variant) {
      // Update compare at price
      var hasComparePrice = !!variant.compare_at_price && variant.compare_at_price > variant.price;
      this.variantFields.$compareAtPrice.toggleClass('visible', hasComparePrice);
      this.variantFields.$compareAtPriceMoney.text(Shopify.formatMoney(variant.compare_at_price, this.settings.money_format));
      dist_default.a.update(this.variantFields.$compareAtPriceMoney[0]); // Update price

      this.variantFields.$priceMoney.text(Shopify.formatMoney(variant.price, this.settings.money_format));
      dist_default.a.update(this.variantFields.$priceMoney[0]);
    }
  }, {
    key: "_updateSKU",
    value: function _updateSKU(variant) {
      if (variant.sku === '') {
        this.variantFields.$sku.parent().addClass('product-sku--empty');
      } else {
        this.variantFields.$sku.parent().removeClass('product-sku--empty');
      }

      this.variantFields.$sku.text(variant.sku);
    }
  }, {
    key: "_updateBadge",
    value: function _updateBadge(variant) {
      var priceSaved = variant.compare_at_price ? variant.compare_at_price - variant.price : 0;
      this.variantFields.$badge.toggle(!!priceSaved);

      if (this.variantFields.$badgeMoneySaved.length) {
        // Update badge if it shows money saved
        this.variantFields.$badgeMoneySaved.text(Shopify.formatMoney(priceSaved, this.settings.money_format));
        dist_default.a.update(this.variantFields.$badgeMoneySaved[0]);
      }

      if (this.variantFields.$badgePercentSaved.length) {
        // Update badge if it shows percentiles
        var percentileSaved = Math.round(priceSaved * 100 / variant.compare_at_price);
        this.variantFields.$badgePercentSaved.text(percentileSaved);
      }
    }
  }, {
    key: "_updateButton",
    value: function _updateButton(variant) {
      if (variant.available) {
        this.$productAtcButton.text(this.context.product_available);
        this.$productAtcButton.removeClass('disabled').prop('disabled', false);
      } else {
        this.$productAtcButton.text(this.context.product_unavailable);
        this.$productAtcButton.addClass('disabled').prop('disabled', true);
      }
    }
  }, {
    key: "_AddToCartFlyout",
    value: function _AddToCartFlyout(event) {
      event.preventDefault();
      var formData = this.$form.serializeArray();
      var options = {
        $atcButton: this.$productAtcButton,
        settings: {
          moneyFormat: this.settings.money_format,
          cartRedirection: this.settings.cart_redirection
        }
      };
      AddToCartFlyout["a" /* default */].init(formData, options, this.atcCallbacks);
    }
  }]);

  return ProductDetails;
}();



/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(2);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// EXTERNAL MODULE: ./node_modules/shopify-currency-converter/dist/index.js
var dist = __webpack_require__(26);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./node_modules/@shopify/theme-a11y/theme-a11y.js
var theme_a11y = __webpack_require__(34);

// EXTERNAL MODULE: ./source/scripts/components/MessageBanner.js
var MessageBanner = __webpack_require__(37);

// CONCATENATED MODULE: ./source/scripts/helpers/Images.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Images =
/*#__PURE__*/
function () {
  function Images() {
    _classCallCheck(this, Images);
  }

  _createClass(Images, [{
    key: "preload",

    /**
     * Preloads an image in memory and uses the browsers cache to store it until needed.
     *
     * @param {Array} images - A list of image urls
     * @param {String} size - A shopify image size attribute
     */
    value: function preload(images, size) {
      var imageArray = images;

      if (typeof images === 'string') {
        imageArray = [images];
      }

      for (var i = 0; i < imageArray.length; i++) {
        this.loadImage(this.getSizedImageUrl(imageArray[i], size));
      }
    }
    /**
     * Loads and caches an image in the browsers cache.
     *
     * @param {string} path - An image url
     */

  }, {
    key: "loadImage",
    value: function loadImage(path) {
      var image = new Image();
      image.src = path;
      return image;
    }
    /**
     * Adds a Shopify size attribute to a URL
     *
     * @param src
     * @param size
     * @returns {*}
     */

  }, {
    key: "getSizedImageUrl",
    value: function getSizedImageUrl() {
      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var size = arguments.length > 1 ? arguments[1] : undefined;

      if (!size) {
        return null;
      }

      if (size === 'master') {
        return this.removeProtocol(src);
      }

      var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

      if (match) {
        var prefix = src.split(match[0]);
        var suffix = match[0];
        return this.removeProtocol("".concat(prefix[0], "_").concat(size).concat(suffix));
      }

      console.warn("No ".concat(size, " found for '").concat(src));
      return null;
    }
  }, {
    key: "removeProtocol",
    value: function removeProtocol(path) {
      return path.replace(/http(s)?:/, '');
    }
  }]);

  return Images;
}();


// CONCATENATED MODULE: ./source/scripts/components/AddToCartFlyout.js
function AddToCartFlyout_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AddToCartFlyout_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AddToCartFlyout_createClass(Constructor, protoProps, staticProps) { if (protoProps) AddToCartFlyout_defineProperties(Constructor.prototype, protoProps); if (staticProps) AddToCartFlyout_defineProperties(Constructor, staticProps); return Constructor; }







var AddToCartFlyout_AddToCartFlyout =
/*#__PURE__*/
function () {
  function AddToCartFlyout() {
    AddToCartFlyout_classCallCheck(this, AddToCartFlyout);

    this.formData = {};
    this.settings = {};
    this.events = [];
    this.Images = new Images();
    this.flyOutSelector = '[data-atc-banner]';
    this.$atcTemplate = jquery_default()("[data-templates] ".concat(this.flyOutSelector));
    this.activeElement = null;
    this.itemId = null;
    this.atcFlyOut = document.querySelector(this.flyOutSelector);
    this._onInit = this._onInit.bind(this);
    this._onError = this._onError.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
    this._onCloseAll = this._onCloseAll.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._closeEsc = this._closeEsc.bind(this);
    this.messageBanner = new MessageBanner["a" /* default */]();
    this.header = document.querySelector('[data-site-header]');
    this.headerAnnouncement = document.querySelector('[data-site-header-announcement]');
    this.$header = jquery_default()(this.header);
    this.$body = jquery_default()(document.body);
  }

  AddToCartFlyout_createClass(AddToCartFlyout, [{
    key: "init",
    value: function init(formData, options) {
      var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.formData = formData; // Allows ATC Flow to be overridden

      this.callbacks = jquery_default.a.extend({
        onInit: this._onInit,
        onError: this._onError,
        onSuccess: this._onSuccess,
        onClose: this._onCloseAll
      }, callbacks);
      var $atcButton = options.$atcButton;
      this.settings = jquery_default.a.extend({
        moneyFormat: null,
        cartRedirection: false
      }, options.settings); // If any FlyOuts are fully open, close them

      this._closeFlyOuts();

      this.callbacks.onInit();
      this.activeElement = document.activeElement;

      this._disableButton($atcButton);

      this._updateCart($atcButton);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.messageBanner.dismissBanners();

      this._removeFlyOuts();

      delete this.Images;
    }
  }, {
    key: "_updateCart",
    value: function _updateCart($atcButton) {
      var _this = this;

      var $flyOut = this.$atcTemplate.clone();
      var quantityField = this.formData.filter(function (data) {
        return data.name === 'quantity';
      });
      var quantity = quantityField[0].value;
      jquery_default.a.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: jquery_default.a.param(this.formData),
        dataType: 'json'
      }).done(function (response) {
        _this.itemId = response.id;

        if (response.image) {
          var imageUrl = _this.Images.getSizedImageUrl(response.image, '200x');

          _this.Images.loadImage(imageUrl);

          $flyOut.find('[data-atc-banner-product-image]').html("<img src=\"".concat(imageUrl, "\" alt=\"").concat(response.product_title, "\">"));
        }

        $flyOut.find('[data-atc-banner-product-title]').text(response.product_title);
        /*
          TODO: Bring in `variant.options`, iterate through to get option
            name for: <strong>Option name:</strong> Option
        */

        if (response.variant_options[0] !== 'Title' && response.variant_options[0] !== 'Default Title') {
          $flyOut.find('[data-atc-banner-product-options]').text(response.variant_options.join(', '));
        }
        /*
          TODO: Bring in variant, and use that to check compare_at_price
            to see if the item is on sale
        */


        var $productPriceQuantity = $flyOut.find('[data-atc-banner-product-price-quantity]');
        $productPriceQuantity.text("".concat(quantity, " \xD7 "));
        jquery_default.a.ajax({
          type: 'GET',
          url: '/cart.js',
          dataType: 'json'
        }).done(function (secondResponse) {
          if (_this.settings.cartRedirection) {
            location.href = '/cart';
            return;
          }

          _this.callbacks.onSuccess(); // Reset formData in case instance is never cleared


          _this.formData = {};
          var lineItem = null;
          secondResponse.items.forEach(function (item) {
            if (item.id === _this.itemId) {
              if (!lineItem) {
                lineItem = item;
              } else {
                // If there are 2 lineItems with the same id, it means that there is
                // likely a BOGO offer on the product. We need to grab the highest discounted
                // price (BOGO will be 0) while also combining with the different discounts on
                // the product in the discounts array.
                lineItem.line_level_discount_allocations = lineItem.line_level_discount_allocations.concat(item.line_level_discount_allocations);
                lineItem.final_price = lineItem.final_price > item.final_price ? lineItem.final_price : item.final_price;
                lineItem.quantity += item.quantity;
              }
            }
          });
          var $productPriceValue = $flyOut.find('[data-atc-banner-product-price-value]');
          $productPriceValue.text(Shopify.formatMoney(lineItem.original_price, _this.settings.moneyFormat)); // Update price to local currency

          dist_default.a.update($productPriceValue[0]);
          var $productPriceDiscounted = $flyOut.find('[data-atc-banner-product-price-discounted]');

          if (lineItem.final_price < lineItem.original_price) {
            $productPriceDiscounted.text(Shopify.formatMoney(lineItem.final_price, _this.settings.moneyFormat)); // Update price to local currency

            dist_default.a.update($productPriceDiscounted[0]);
            $productPriceDiscounted.show();
            $productPriceValue.addClass('original-price');
          } else {
            $productPriceDiscounted.hide();
            $productPriceValue.removeClass('original-price');
          }

          var $productDiscounts = $flyOut.find('[data-atc-banner-product-discounts]');

          if (lineItem.line_level_discount_allocations.length > 0) {
            var discountItemTemplate = $productDiscounts.children().first();
            $productDiscounts.empty();
            lineItem.line_level_discount_allocations.forEach(function (discount) {
              var $listItem = discountItemTemplate.clone();
              $listItem.find('.discount-title').html(discount.discount_application.title);
              var $amount = $listItem.find('.discount-amount');
              $amount.html(discount.amount);
              $productDiscounts.append($listItem);
              dist_default.a.update($amount[0]);
            });
            $productDiscounts.show();
          } else {
            $productDiscounts.hide();
          }

          var $subTotal = $flyOut.find('[data-atc-banner-cart-subtotal]');
          $subTotal.text(Shopify.formatMoney(secondResponse.total_price, _this.settings.moneyFormat));
          dist_default.a.update($subTotal[0]);
          $flyOut.find('[data-atc-banner-cart-button]').find('span').text(secondResponse.item_count);

          _this.$header.append($flyOut); // Notifiy Header of new cart count


          _this.$header.trigger('cartcount:update', {
            response: secondResponse
          });

          _this._bindEvents($flyOut);

          _this._openFlyOut($flyOut, $atcButton);
        });
      }).fail(function (response) {
        var errorText;

        try {
          var responseText = JSON.parse(response.responseText);
          errorText = responseText.description;
        } catch (error) {
          errorText = "".concat(response.status, " ").concat(response.statusText);

          if (response.status === 401) {
            errorText = "".concat(errorText, ". Try refreshing and logging in.");
          }
        }

        _this._enableButton($atcButton);

        _this.callbacks.onError(errorText);
      });
    }
  }, {
    key: "_onError",
    value: function _onError(error) {
      this.messageBanner.message(error, 'error');
    }
  }, {
    key: "_onInit",
    value: function _onInit() {
      this.messageBanner.dismissBanners();
    }
  }, {
    key: "_onSuccess",
    value: function _onSuccess() {
      /*
        By default, the ATC Flyout doesn't need any additional success callbacks
         The `this.callbacks.onSuccess` is used to allow other views to initiate
        behaviour when a product has been added to the cart
       */
    }
  }, {
    key: "_onCloseAll",
    value: function _onCloseAll() {
      /*
        By default, the ATC Flyout doesn't need any additional close callbacks
         The `this.callbacks.onClose` is used to allow other views to initiate
        behaviour when the atc banner has been closed
       */
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents($flyOut) {
      var _this2 = this;

      this.events.push([$flyOut.on('click.atc-banner', '[data-atc-banner-close]', function (event) {
        event.preventDefault();

        _this2._closeFlyOut($flyOut);
      }), jquery_default()(document).on('touchstart.atc-banner, click.atc-banner', this._handleDocumentClick)]);
    }
    /**
     * Trigger any existing open FlyOuts to close
     *
     * @private
     */

  }, {
    key: "_closeFlyOuts",
    value: function _closeFlyOuts() {
      var _this3 = this;

      var $excludeFlyOut = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      jquery_default()(this.flyOutSelector).filter('[data-flyout-active]').each(function (index, el) {
        var $flyOut = jquery_default()(el);

        if ($excludeFlyOut && $flyOut.is($excludeFlyOut)) {
          return;
        }

        _this3._closeFlyOut($flyOut, index);
      });

      if (!$excludeFlyOut) {
        this.callbacks.onClose();
      }

      window.removeEventListener('keydown', this._closeEsc);
    }
  }, {
    key: "_openFlyOut",
    value: function _openFlyOut($flyOut, $atcButton) {
      var _this4 = this;

      /*
       If user has initiated a new ATC Flow before the first has finished,
       the first FlyOut could have opened after the first attempt to close open flyouts
      */
      this._closeFlyOuts($flyOut);

      $flyOut.addClass('animating animating-in').one('trend', function () {
        $flyOut.removeClass('animating animating-in').addClass('visible').off('trend');
        $flyOut.attr('data-flyout-active', true);
        Object(theme_a11y["b" /* trapFocus */])($flyOut[0]);
        window.addEventListener('keydown', _this4._closeEsc);

        _this4._enableButton($atcButton);
      });
    }
  }, {
    key: "_closeEsc",
    value: function _closeEsc(e) {
      if (e.key === 'Escape') {
        this._closeFlyOuts();
      }
    }
    /**
     * Close an open FlyOut
     *
     * @param $flyOut
     * @param index
     * @private
     */

  }, {
    key: "_closeFlyOut",
    value: function _closeFlyOut() {
      var _this5 = this;

      var $flyOut = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!$flyOut) {
        return;
      }

      $flyOut.addClass('animating animating-out').one('trend', function () {
        $flyOut.removeClass('animating animating-out visible').one('trend', function () {
          $flyOut.off('trend');

          _this5._removeFlyOut($flyOut, index); // if the user clicked onto the search box, close the atc flyout and move focus
          // to the search instead of going to the previous active element.


          if (_this5.documentClickEventTarget && 'liveSearchInput' in _this5.documentClickEventTarget.dataset) {
            _this5.documentClickEventTarget.focus();
          } else if (_this5.activeElement) {
            _this5.activeElement.focus();
          }

          Object(theme_a11y["a" /* removeTrapFocus */])($flyOut[0]);

          _this5.callbacks.onClose();
        });
      });
    }
  }, {
    key: "_removeFlyOuts",
    value: function _removeFlyOuts() {
      var _this6 = this;

      jquery_default()(this.flyOutSelector).filter('[data-flyout-active]').each(function (index, el) {
        _this6._removeFlyOut(jquery_default()(el), index);
      });
    }
    /**
     * Remove the Flyout from the DOM, and clean up listeners
     *
     * @param $flyOut
     * @param index
     * @private
     */

  }, {
    key: "_removeFlyOut",
    value: function _removeFlyOut($flyOut, index) {
      if (this.events[index]) {
        this.events[index].forEach(function ($el) {
          return $el.off('.atc-banner');
        });
        this.events.splice(index, 1);
      }

      if ($flyOut) {
        $flyOut.remove();
      }
    }
  }, {
    key: "_disableButton",
    value: function _disableButton($atcButton) {
      $atcButton.addClass('processing').prop('disabled', true);
    }
  }, {
    key: "_enableButton",
    value: function _enableButton($atcButton) {
      $atcButton.prop('disabled', false).removeClass('processing');
    }
  }, {
    key: "_handleDocumentClick",
    value: function _handleDocumentClick(event) {
      var target = event.target;
      var $parent = jquery_default()(target).parents('[data-atc-banner]');

      if ($parent.length) {
        return;
      }

      this.documentClickEventTarget = target;

      this._closeFlyOuts();
    }
  }]);

  return AddToCartFlyout;
}();

/* harmony default export */ var components_AddToCartFlyout = __webpack_exports__["a"] = (new AddToCartFlyout_AddToCartFlyout());

/***/ })

}]);
//# sourceMappingURL=DynamicFeaturedCollection-StaticCollection-StaticProduct-StaticProductRecommendations-StaticSearch.bundle.js.map?1565631014304