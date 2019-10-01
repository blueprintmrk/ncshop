(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

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

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticHighlightsBanners; });
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






var StaticHighlightsBanners =
/*#__PURE__*/
function () {
  function StaticHighlightsBanners(section) {
    _classCallCheck(this, StaticHighlightsBanners);

    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.$carousel = this.$el.find('.highlights-banners');
    this.slides = '.highlights-banners-block';
    this.flickity = null;
    this.flickityOptions = null;

    if (this.$carousel.find(this.slides).length > 1) {
      this._initSlider();
    }
  }

  _createClass(StaticHighlightsBanners, [{
    key: "_initSlider",
    value: function _initSlider() {
      this.flickityOptions = {
        autoPlay: 0,
        accessibility: true,
        cellAlign: 'left',
        cellSelector: this.slides,
        pageDots: false,
        prevNextButtons: false,
        contain: true
      };

      this._bindFlickity();
    }
  }, {
    key: "onSectionUnload",
    value: function onSectionUnload() {
      this._destroyFlickity();

      this.$window.off('.twitter');
    }
  }, {
    key: "_bindFlickity",
    value: function _bindFlickity() {
      var _this = this;

      if (_Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isBreakpoint('L') === false && this.flickity === null) {
        this.flickity = new flickity__WEBPACK_IMPORTED_MODULE_2___default.a(this.$carousel[0], this.flickityOptions);
      }

      this.$window.on('resize', just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(function () {
        if (_Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isBreakpoint('L') === false && _this.flickity === null) {
          _this._bindFlickity();
        } else if (_Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].isBreakpoint('L') && _this.flickity) {
          _this._destroyFlickity();
        }
      }));
    }
  }, {
    key: "_destroyFlickity",
    value: function _destroyFlickity() {
      if (!this.flickity) {
        return;
      }

      this.flickity.destroy();
      this.flickity = null;
    }
  }]);

  return StaticHighlightsBanners;
}();



/***/ })

}]);
//# sourceMappingURL=StaticHighlightsBanners.bundle.js.map?1565631014304