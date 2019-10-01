(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticRecentlyViewed; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rimg_shopify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var StaticRecentlyViewed =
/*#__PURE__*/
function () {
  function StaticRecentlyViewed(section) {
    var _this = this;

    _classCallCheck(this, StaticRecentlyViewed);

    this.namespace = 'pxu';
    this.maxRecentlyViewed = 30; // Store a max of 30 items

    this.maxStorageTime = 30 * 24 * 3600; // Store items for 30 days only

    this.version = 1; // Version key is used to update localstorage when format changes

    this.storageKey = "".concat(this.namespace, "-recentlyViewed-").concat(this.version);
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.time = section.data.time;
    this.flickity = null;
    this.recentlyViewed = section.data.recently_viewed_info;
    this.cardSettings = section.data.product_card_settings;

    if (this.recentlyViewed && this.time) {
      this.recentlyViewed.timestamp = Math.round(new Date().getTime() / 1000);
    }

    this.slideImageLoaded = this._onSlideImageLoaded.bind(this);
    var recentlyViewed = [];

    if (this.time) {
      recentlyViewed = this._getRecentlyViewed();

      if (this.recentlyViewed) {
        this.removeRecentlyViewed(this.recentlyViewed.handle, recentlyViewed);
        recentlyViewed.push(this.recentlyViewed);
      }

      var promises = this._setRecentlyViewed(recentlyViewed); // Wait until promises are resolved before inserting markup into the DOM


      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.when.apply(jquery__WEBPACK_IMPORTED_MODULE_0___default.a, _toConsumableArray(promises)).done(function () {
        if (recentlyViewed.length) {
          var cardsMarkup = _this._getRecentlyViewedCards();

          var cardsData = _this._getRecentlyViewed();

          _this.$el.find('[data-recently-viewed-container]').append(cardsMarkup);

          cardsData.forEach(function (productData) {
            var timestamp = _this.timeSince(productData.timestamp);

            jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-product-handle=".concat(productData.handle, "]")).prepend(timestamp);
          });
          rimg_shopify__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].watch(_this.$el[0]);
          _this.$carousel = _this.$el.find('.product-recently-viewed--content');
          _this.slides = '.product-recently-viewed-card';

          if (_this.$carousel.find(_this.slides).length > 1) {
            _this._initSlider();
          }
        } else {
          _this.$el.find('.product-recently-viewed--section').addClass('hide');
        }
      });
    } else {
      if (this.recentlyViewed) {
        recentlyViewed.push(this.recentlyViewed);

        this._setRecentlyViewed(recentlyViewed);
      }

      this.$el.find('.product-recently-viewed--section').addClass('hide');
    }

    this.bindEvents();
  }

  _createClass(StaticRecentlyViewed, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this2 = this;

      this.$el.on('click', '[data-remove-recently-viewed]', function (event) {
        var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
        var handle = $target.closest('[data-product-handle]').data('product-handle');

        var recentlyViewed = _this2._getRecentlyViewed();

        _this2.removeRecentlyViewed(handle, recentlyViewed);

        _this2._setRecentlyViewed(recentlyViewed);

        $target.parents('[data-recently-viewed-card]').addClass('hide-card');
        $target.parents('[data-recently-viewed-card]').nextAll().addClass('move-card');
        setTimeout(function () {
          var index = $target.parents('[data-recently-viewed-card]').index();

          if (index !== 0) {
            index--;
          }

          $target.parents('[data-recently-viewed-card]').nextAll().removeClass('move-card');

          if ($target.parents('[data-recently-viewed-card]').length) {
            _this2.flickity.remove($target.parents('[data-recently-viewed-card]'));
          }

          _this2.flickity.selectCell(index);
        }, 500);
      });
      this.$el.on('click', '[data-clear-recently-viewed]', function () {
        _this2.clearRecentlyViewed();
      });
    }
  }, {
    key: "timeSince",
    value: function timeSince(timestamp) {
      var now = Math.round(new Date().getTime() / 1000);
      var secondsPast = now - timestamp;

      if (secondsPast < 60) {
        var secondsAgo = parseInt(secondsPast, 10);
        return secondsAgo === 1 ? "".concat(secondsAgo, " ").concat(this.time.second, " ").concat(this.time.ago) : "".concat(secondsAgo, " ").concat(this.time.seconds, " ").concat(this.time.ago);
      }

      if (secondsPast < 3600) {
        var minutesAgo = parseInt(secondsPast / 60, 10);
        return minutesAgo === 1 ? "".concat(minutesAgo, " ").concat(this.time.minute, " ").concat(this.time.ago) : "".concat(minutesAgo, " ").concat(this.time.minutes, " ").concat(this.time.ago);
      }

      if (secondsPast <= 86400) {
        var hoursAgo = parseInt(secondsPast / 3600, 10);
        return hoursAgo === 1 ? "".concat(hoursAgo, " ").concat(this.time.hour, " ").concat(this.time.ago) : "".concat(hoursAgo, " ").concat(this.time.hours, " ").concat(this.time.ago);
      }

      var date = new Date(timestamp * 1000);
      var currentDate = new Date(now * 1000);
      var day = date.getDate();
      var month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(' ', '');
      var year = date.getFullYear() === currentDate.getFullYear() ? '' : ", ".concat(date.getFullYear());
      return "".concat(month, " ").concat(day, " ").concat(year);
    }
  }, {
    key: "removeRecentlyViewed",
    value: function removeRecentlyViewed(handle, recentlyViewed) {
      for (var i = 0; i < recentlyViewed.length; i++) {
        if (recentlyViewed[i].handle === handle) {
          recentlyViewed.splice(i, 1);
        }
      }

      this._setRecentlyViewed(recentlyViewed);

      var cards = sessionStorage.getItem(this.storageKey) ? JSON.parse(sessionStorage.getItem(this.storageKey)) : {};
      delete cards[handle];
      sessionStorage.setItem(this.storageKey, JSON.stringify(cards));

      if (recentlyViewed.length === 0) {
        this.$el.find('.product-recently-viewed--section').addClass('hide');
      }

      if (this.$carousel) {
        this.$carousel[0].removeEventListener('rimg:load', this.slideImageLoaded);
      }
    }
  }, {
    key: "clearRecentlyViewed",
    value: function clearRecentlyViewed() {
      localStorage.removeItem(this.storageKey);
      sessionStorage.removeItem(this.storageKey);
      this.$el.find('[data-recently-viewed-card]').remove();
      this.$el.find('.product-recently-viewed--section').addClass('hide');
    }
  }, {
    key: "_onSlideImageLoaded",
    value: function _onSlideImageLoaded() {
      this.flickity.resize();
    }
  }, {
    key: "_initSlider",
    value: function _initSlider() {
      this.flickityOptions = {
        autoPlay: 0,
        accessibility: true,
        cellAlign: 'left',
        cellSelector: this.slides,
        groupCells: true,
        pageDots: false,
        contain: true,
        arrowShape: {
          x0: 10,
          x1: 60,
          y1: 50,
          x2: 65,
          y2: 45,
          x3: 20
        }
      };
      this.flickity = new flickity__WEBPACK_IMPORTED_MODULE_1___default.a(this.$carousel[0], this.flickityOptions);
      this.$carousel[0].addEventListener('rimg:load', this.slideImageLoaded);
    }
    /**
     * Store recently viewed products
     *
     * @param {Object[]} productData - recently viewed products
     * @param {number} productData[].timestamp - indicating when product was added to productData
     * @param {string} productData[].handle - Shopify product handle
     * @private
     */

  }, {
    key: "_setRecentlyViewed",
    value: function _setRecentlyViewed(productData) {
      var _this3 = this;

      var now = Math.floor(Date.now() / 1000); // Unix timestamp for current date

      var minStorageTimestamp = now - this.maxStorageTime;
      var filteredData = productData.filter(function (item) {
        return item.timestamp > minStorageTimestamp;
      });

      if (filteredData.length > this.maxRecentlyViewed) {
        var removeCount = filteredData.length - this.maxRecentlyViewed;
        filteredData.splice(0, removeCount); // Remove oldest if more than max number have been stored
      }

      try {
        localStorage.setItem(this.storageKey, JSON.stringify(filteredData));
      } catch (error) {
        console.warn(error);
      } // Retrieve markup for recently viewed cards and store in session


      try {
        var handles = filteredData ? filteredData.map(function (x) {
          return x.handle;
        }) : [];
        var storedCards = sessionStorage.getItem(this.storageKey) ? JSON.parse(sessionStorage.getItem(this.storageKey)) : {};

        if (storedCards.cardSettings) {
          Object.keys(storedCards.cardSettings).forEach(function (key) {
            if (storedCards.cardSettings[key] !== _this3.cardSettings[key]) {
              storedCards = {};
              sessionStorage.removeItem(_this3.storageKey);
            }
          });
        }

        storedCards.cardSettings = this.cardSettings;
        var promises = handles.map(function (handle) {
          if (storedCards[handle]) {
            return null;
          }

          var fetchUrl = "/products/".concat(handle, "?view=_recently-viewed");
          return jquery__WEBPACK_IMPORTED_MODULE_0___default.a.get(fetchUrl).catch(function (error) {
            return console.error('Error:', error);
          }).then(function (response) {
            if (response) {
              storedCards[handle] = response;

              try {
                sessionStorage.setItem(_this3.storageKey, JSON.stringify(storedCards));
              } catch (error) {
                console.warn(error);
              }
            }
          });
        });
        return promises;
      } catch (error) {
        console.warn(error);
        return false;
      }
    }
    /**
     * Get stored recently viewed products
     *
     * @returns {Array}
     * @private
     */

  }, {
    key: "_getRecentlyViewed",
    value: function _getRecentlyViewed() {
      try {
        var recentlyViewed = localStorage.getItem(this.storageKey) ? JSON.parse(localStorage.getItem(this.storageKey)) : [];
        return recentlyViewed;
      } catch (error) {
        console.warn(error);
        return [];
      }
    }
  }, {
    key: "_getRecentlyViewedCards",
    value: function _getRecentlyViewedCards() {
      var cards = sessionStorage.getItem(this.storageKey) ? JSON.parse(sessionStorage.getItem(this.storageKey)) : {};
      var orderedItems = localStorage.getItem(this.storageKey) ? JSON.parse(localStorage.getItem(this.storageKey)) : {};
      var markup = [];

      for (var i = orderedItems.length - 1; i >= 0; i--) {
        var cardKey = orderedItems[i].handle; // When store password is enabled and viewing the product page in preview
        // mode, product cards for products which have been deleted from the admin
        // will return the password page. Before inserting the card markup, we
        // need to check that it contains a product.

        var domParser = new DOMParser();
        var card = domParser.parseFromString(cards[cardKey], 'text/html');

        if (card.querySelector('.productgrid--item')) {
          markup.push(cards[cardKey]);
        }
      }

      return markup.join('');
    }
  }]);

  return StaticRecentlyViewed;
}();



/***/ })

}]);
//# sourceMappingURL=StaticRecentlyViewed.bundle.js.map?1565631014304