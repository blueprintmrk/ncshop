(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticProduct; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scriptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _components_RichText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony import */ var _components_ProductDetails__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var StaticProduct =
/*#__PURE__*/
function () {
  function StaticProduct(section) {
    var _this = this;

    _classCallCheck(this, StaticProduct);

    this.section = section;
    this.postMessage = section.postMessage;
    this.context = section.data.context;
    this.settings = section.data.settings;
    this.product = section.data.product;
    this.richText = null;
    this.reviewForm = null;
    this.flickity = null;
    this.flickityOptions = null;
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.$product = this.$el.find('[data-product-wrapper]');

    if (this.settings) {
      this.isThreeColumn = this.settings.layout === 'layout--three-col';
    } // History


    this.isThemeEditor = window.Shopify && window.Shopify.designMode;
    this.useHistory = !this.isThemeEditor && history.replaceState;
    this.$gallery = this.$product.find('[data-product-gallery]'); // Product details

    this.$details = this.$product.find('[data-product-details]'); // Product description

    this.$description = this.$product.find('[data-product-description]'); // Product form containers

    this.$formRegular = this.$product.find('[data-product-form-regular]');
    this.$formAlt = this.$product.find('[data-product-form-alt]'); // Product form area

    this.$formArea = this.$product.find('[data-product-form-area]'); // Move product form and information on breakpoint change

    this.layoutHandler = this.onBreakpointChange.bind(this);
    _Layout__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].onBreakpointChange(this.layoutHandler); // Product reviews

    this.$productReviews = this.$el.find('[data-product-reviews]');

    this._moveForm();

    if (this.$description.length) {
      this.richText = new _components_RichText__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"](this.$description);
    }

    if (this.$productReviews.length) {
      this.reviewForm = new _Forms__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](this.$productReviews, '.spr-form-input');
    } // Instantiate ProductDetails after Shopify API is loaded


    scriptjs__WEBPACK_IMPORTED_MODULE_1___default()(jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-scripts]').data('shopify-api-url'), function () {
      var options = {
        $formArea: _this.$formArea,
        $gallery: _this.$gallery,
        $details: _this.$details,
        context: _this.context,
        settings: _this.settings,
        product: _this.product,
        useHistory: _this.useHistory
      };
      _this.productDetails = new _components_ProductDetails__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"](options);
    });
  }

  _createClass(StaticProduct, [{
    key: "onSectionUnload",
    value: function onSectionUnload() {
      _Layout__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].offBreakpointChange(this.layoutHandler);
      this.productDetails.unload();

      if (this.richText) {
        this.richText.unload();
      }

      if (this.reviewForm) {
        this.reviewForm.unload();
      }
    }
  }, {
    key: "onBreakpointChange",
    value: function onBreakpointChange() {
      this._moveForm();
    }
    /**
     * Move product form if is a three column layout
     * @private
     */

  }, {
    key: "_moveForm",
    value: function _moveForm() {
      if (!this.isThreeColumn) return;

      if (_Layout__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isBreakpoint('L')) {
        if (!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(this.$formAlt[0], this.$formArea[0])) {
          var $form = this.$formArea.detach();
          this.$formAlt.append($form);
        }
      } else if (!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(this.$formRegular[0], this.$formArea[0])) {
        var _$form = this.$formArea.detach();

        this.$formRegular.append(_$form);
      }
    }
  }]);

  return StaticProduct;
}();



/***/ })

}]);
//# sourceMappingURL=StaticProduct.bundle.js.map?1565631014304