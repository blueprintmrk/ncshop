(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchForm; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var SearchForm =
/*#__PURE__*/
function () {
  function SearchForm($container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SearchForm);

    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
    this.$container = $container;
    this.$form = this.$container.find('[data-live-search-form]');
    this.isLiveSearch = options.liveSearch ? options.liveSearch : false;
    this.submitHandler = this.submitHandler.bind(this);
    this.events = [this.$form.on('submit.search-form', this.submitHandler)];
  }

  _createClass(SearchForm, [{
    key: "unload",
    value: function unload() {
      this.events.forEach(function ($el) {
        return $el.off('.search-form');
      });
    }
  }, {
    key: "submitHandler",
    value: function submitHandler(event) {
      event.preventDefault();
      var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget).clone();
      var $terms = $form.find('[name=q]');
      $form.css({
        position: 'absolute',
        left: -1000,
        bottom: -1000,
        visibility: 'hidden'
      });
      var terms = $terms.val();

      if (this.isLiveSearch && !terms) {
        return;
      } // Adds `*` after each word in search terms, doesn't add to last word


      if (terms.indexOf(' ') > 0) {
        terms = terms.split(' ').join('* ').trim();
      } // Adds `*` at the end of the search terms


      terms = "".concat(terms, "*"); // Update value

      $terms.val(terms); // Forms must be in the browser context in order to submit

      this.$body.append($form);
      $form.submit();
    }
  }]);

  return SearchForm;
}();



/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticSearch; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var shopify_currency_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var shopify_currency_converter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(shopify_currency_converter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);
/* harmony import */ var _components_search_SearchForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var StaticSearch =
/*#__PURE__*/
function () {
  function StaticSearch(section) {
    var _this = this;

    _classCallCheck(this, StaticSearch);

    this.section = section;
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.$searchField = this.$el.find('[data-live-search]'); // Product items

    this.productItems = [];
    var $productItems = this.$el.find('[data-product-item]');
    $productItems.each(function (i, productItem) {
      _this.productItems.push(new _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]({
        el: productItem,
        id: _this.section.id
      }));
    });

    this._updatePrices();

    this.searchForm = new _components_search_SearchForm__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](this.$searchField);
  }

  _createClass(StaticSearch, [{
    key: "onSectionUnload",
    value: function onSectionUnload() {
      this.searchForm.unload();
      this.productItems.forEach(function (productItem) {
        productItem.unload();
      });
    }
  }, {
    key: "_updatePrices",
    value: function _updatePrices() {
      this.$el.find('.money').each(function (index, el) {
        return shopify_currency_converter__WEBPACK_IMPORTED_MODULE_1___default.a.update(el);
      });
    }
  }]);

  return StaticSearch;
}();



/***/ })

}]);
//# sourceMappingURL=StaticSearch.bundle.js.map?1565631014304