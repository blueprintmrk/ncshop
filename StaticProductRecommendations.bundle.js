(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductRowScroller; });
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var ProductRowScroller =
/*#__PURE__*/
function () {
  function ProductRowScroller(productRow) {
    _classCallCheck(this, ProductRowScroller);

    this.$window = $(window);
    this.flickity = null;
    this.productRow = productRow;
    this.$productRow = $(this.productRow); // Activate flickity on mobile

    this._mobileSlider = this._mobileSlider.bind(this);
    _Layout__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].onBreakpointChange(this._mobileSlider);

    this._mobileSlider();
  }

  _createClass(ProductRowScroller, [{
    key: "unload",
    value: function unload() {
      _Layout__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].offBreakpointChange(this._mobileSlider);

      this._destroyFlickity();
    }
  }, {
    key: "_initFlickity",
    value: function _initFlickity() {
      this.flickity = new flickity__WEBPACK_IMPORTED_MODULE_1___default.a(this.productRow, {
        cellSelector: '.productgrid--item',
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

      this.$window.off('.product-row');
      this.$productRow.off('.product-row');
      this.flickity.destroy();
      this.flickity = null;
    }
  }, {
    key: "_mobileSlider",
    value: function _mobileSlider() {
      // If is Large layout, attempt to destroy flickity
      if (_Layout__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isBreakpoint('L')) {
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
      var _this = this;

      var $slider = this.$productRow.find('.flickity-slider');
      this.$window.on('resize.product-row', just_debounce__WEBPACK_IMPORTED_MODULE_0___default()(function () {
        _this.$productRow.trigger('heightUpdate.product-row');
      }));
      this.flickity.on('cellSelect', function () {
        _this.$productRow.trigger('heightUpdate.product-row');
      });
      this.$productRow.on('heightUpdate.product-row', function () {
        if (!_this.flickity) {
          return;
        }

        $slider.height(Math.ceil(_this.flickity.maxCellHeight));
      }); // Sets the Slider to the height of the first slide

      this.$productRow.trigger('heightUpdate.product-row');
    }
  }]);

  return ProductRowScroller;
}();



/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticProductRecommendations; });
/* harmony import */ var rimg_shopify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var shopify_asyncview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var shopify_currency_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var shopify_currency_converter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(shopify_currency_converter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);
/* harmony import */ var _components_ProductRowScroller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39);
/* harmony import */ var _helpers_ProductReviews__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // eslint-disable-line







var StaticProductRecommendations =
/*#__PURE__*/
function () {
  function StaticProductRecommendations(section) {
    _classCallCheck(this, StaticProductRecommendations);

    this.section = section;
    this.productId = section.data.productId;
    this.limit = section.data.settings.limit;
    this.recommendedProducts = [];
    this.productsScroller = null;
    this.recommendationContainer = document.querySelector('[data-product-recommendations]');
    this.recommendUrl = "/recommendations/products?section_id=static-product-recommendations&limit=".concat(this.limit, "&product_id=").concat(this.productId);
    this._loadRecommendations = this._loadRecommendations.bind(this);
    this._resizeRowScroller = this._resizeRowScroller.bind(this);

    this._loadRecommendations();
  }

  _createClass(StaticProductRecommendations, [{
    key: "_loadRecommendations",
    value: function _loadRecommendations() {
      var _this = this;

      shopify_asyncview__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].load(this.recommendUrl).done(function (_ref) {
        var html = _ref.html;
        _this.recommendationContainer.innerHTML = html;
        rimg_shopify__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].watch(_this.recommendationContainer);

        var productItems = _this.recommendationContainer.querySelectorAll('[data-product-item]');

        if (productItems.length) {
          productItems.forEach(function (productItem) {
            _this.recommendedProducts.push(new _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]({
              el: productItem,
              id: _this.section.id
            }));
          });
          Object(_helpers_ProductReviews__WEBPACK_IMPORTED_MODULE_5__[/* initShopifyProductReviews */ "a"])();

          var moneyItems = _this.recommendationContainer.querySelectorAll('.money');

          moneyItems.forEach(function (money) {
            return shopify_currency_converter__WEBPACK_IMPORTED_MODULE_2___default.a.update(money);
          });

          if (window.Shopify && Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
          }

          _this.recommendationContainer.addEventListener('rimg:load', _this._resizeRowScroller);

          _this.productsScroller = new _components_ProductRowScroller__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"](_this.section.el.querySelector('[data-product-row]'));
        }
      });
    }
  }, {
    key: "_resizeRowScroller",
    value: function _resizeRowScroller() {
      if (this.productsScroller && this.productsScroller.flickity) {
        this.productsScroller.flickity.resize();
      }
    }
  }, {
    key: "onSectionUnload",
    value: function onSectionUnload() {
      if (this.productsScroller) {
        this.productsScroller.unload();
      }

      this.recommendedProducts.forEach(function (productItem) {
        productItem.unload();
      });
      this.recommendationContainer.removeEventListener('rimg:load', this._resizeRowScroller);
    }
  }]);

  return StaticProductRecommendations;
}();



/***/ })

}]);
//# sourceMappingURL=StaticProductRecommendations.bundle.js.map?1565631014304