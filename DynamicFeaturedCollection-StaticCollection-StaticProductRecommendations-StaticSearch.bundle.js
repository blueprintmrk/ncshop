(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

  /*!
   * shopify-asyncview v1.0.2
   * (c) 2019 Pixel Union
  */

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var deferred = {};

var AsyncView = function () {
  function AsyncView() {
    classCallCheck(this, AsyncView);
  }

  createClass(AsyncView, null, [{
    key: 'load',

    /**
     * Load the template given by the provided URL into the provided
     * view
     *
     * @param {string} url - The url to load.
     * @param {string} view - The view to load into.
     * @param {object} options - Config options.
     * @param {string} options.hash - A hash of the current page content.
     */
    value: function load(url, view) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var data = void 0;
      if (url in deferred) {
        return deferred[url];
      }

      var $deferred = $.Deferred();

      deferred[url] = $deferred;

      if (options.hash) {
        data = sessionStorage.getItem(url);

        if (data) {
          var deserialized = JSON.parse(data);

          if (options.hash === deserialized.options.hash) {
            delete deferred[url];
            return $deferred.resolve(deserialized).promise();
          }
        }
      }

      // NOTE The $.ajax request has the cache option set to false.
      // This is to prevent certain browsers from returning cached
      // versions of the url we are requesting.
      // See this PR for more info: https://github.com/pixelunion/shopify-asyncview/pull/4
      $.ajax({
        url: url,
        cache: false,
        data: 'view=' + view,
        dataType: 'html',
        headers: {
          'cache-control': 'no-cache'
        },
        success: function success(response) {
          var el = document.createElement('div');
          el.innerHTML = response;

          var responseOptions = {};
          var optionsEl = el.querySelector('[data-options]');

          if (optionsEl && optionsEl.innerHTML) {
            responseOptions = JSON.parse(el.querySelector('[data-options]').innerHTML);
          }

          var htmls = el.querySelectorAll('[data-html]');

          var html = {};

          if (htmls.length === 1 && htmls[0].getAttribute('data-html') === '') {
            html = htmls[0].innerHTML;
          } else {
            for (var i = 0; i < htmls.length; i++) {
              html[htmls[i].getAttribute('data-html')] = htmls[i].innerHTML;
            }
          }

          if (options.hash) {
            try {
              sessionStorage.setItem(url, JSON.stringify({ options: responseOptions, html: html }));
            } catch (error) {
              console.error(error);
            }
          }

          delete deferred[url];
          return $deferred.resolve({ options: responseOptions, html: html });
        },
        error: function error() {
          delete deferred[url];
          return $deferred.reject();
        }

      });

      return $deferred.promise();
    }
  }]);
  return AsyncView;
}();

/* harmony default export */ __webpack_exports__["a"] = (AsyncView);


/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Modal; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vanilla_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var vanilla_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vanilla_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var Modal =
/*#__PURE__*/
function () {
  function Modal() {
    var callbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Modal);

    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.modal = null;
    this.$modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-modal-container]');
    this.$modalInner = this.$modal.find('[data-modal-inner]');
    this.trigger = null; // Extend default vanilla-modal callbacks back to instantiator of Modal

    this.defaultCallbacks = {
      onOpen: function onOpen() {},
      onClose: function onClose() {},
      onBeforeOpen: function onBeforeOpen() {},
      onBeforeClose: function onBeforeClose() {}
    };
    this.callbacks = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, this.defaultCallbacks, callbacks);
    this.finishedLoading = this.finishedLoading.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onBeforeOpen = this._onBeforeOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onBeforeClose = this._onBeforeClose.bind(this);
    this._closeEsc = this._closeEsc.bind(this);
    this.position = this.position.bind(this);
    this.modalOptions = {
      loadClass: '',
      class: 'modal-loaded',
      onOpen: this._onOpen,
      onClose: this._onClose,
      onBeforeOpen: this._onBeforeOpen,
      onBeforeClose: this._onBeforeClose,
      transitions: false
    };
  }

  _createClass(Modal, [{
    key: "unload",
    value: function unload() {
      if (!this.modal || !this.modal.isOpen) return;
      this.modal.destroy();
    }
    /**
     * Open a modal with contents from selector
     *
     * @param selector
     * @param handle
     */

  }, {
    key: "open",
    value: function open(selector) {
      var handle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'general';
      var trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this._addModalClass(handle);

      this.modal = new vanilla_modal__WEBPACK_IMPORTED_MODULE_2___default.a(this.modalOptions);
      this.modal.open(selector);
      this.trigger = trigger;
      window.addEventListener('keydown', this.closeEsc);
    }
  }, {
    key: "close",
    value: function close() {
      this.modal.close();
      window.removeEventListener('keydown', this.closeEsc);
    }
  }, {
    key: "finishedLoading",
    value: function finishedLoading() {
      Object(_shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__[/* trapFocus */ "b"])(this.$modal[0]);
    }
  }, {
    key: "_closeEsc",
    value: function _closeEsc(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.modal && this.modal.isOpen;
    }
    /**
     * Update the vertical positioning of modal
     */

  }, {
    key: "position",
    value: function position() {
      var windowHeight = window.innerHeight;
      var modalHeight = this.$modalInner.outerHeight();
      var modalPadding = parseInt(this.$modal.css('padding-top'), 10) * 2;
      var offset = (windowHeight - modalPadding - modalHeight) / 2;
      var marginTop = offset > 0 ? offset : 0;
      this.$modalInner.css({
        marginTop: marginTop
      });
    }
    /**
     * Add a class to the modal for individual styling
     * @param handle
     * @private
     */

  }, {
    key: "_addModalClass",
    value: function _addModalClass(handle) {
      this.$modal.addClass("modal--".concat(handle));
    }
    /**
     * Remove modal class based on the handle
     * @private
     */

  }, {
    key: "_removeModalClass",
    value: function _removeModalClass() {
      var modalClass = this.$modal.attr('class').match(/modal--[\w-]*\b/);

      if (!modalClass) {
        return;
      }

      this.$modal.removeClass(modalClass[0]);
    }
  }, {
    key: "_onClose",
    value: function _onClose() {
      this._removeModalClass();

      this.$body.removeClass('scroll-lock').removeClass('modal-visible');
      this.$window.off('resize.modal');
      this.$modalInner.css({
        marginTop: ''
      });
      this.callbacks.onClose();
      Object(_shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__[/* removeTrapFocus */ "a"])(this.$modal[0]);

      if (this.activeElement) {
        this.activeElement.focus();
      }
    }
  }, {
    key: "_onOpen",
    value: function _onOpen() {
      var _this = this;

      this.activeElement = document.activeElement;
      this.position();
      this.$body.addClass('scroll-lock').addClass('modal-visible');
      this.$window.on('resize.modal', just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(function () {
        return _this.position();
      }, 16, true, true));
      this.callbacks.onOpen();
      Object(_shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__[/* trapFocus */ "b"])(this.$modal[0]);
    }
  }, {
    key: "_onBeforeClose",
    value: function _onBeforeClose() {
      this.callbacks.onBeforeClose();
    }
  }, {
    key: "_onBeforeOpen",
    value: function _onBeforeOpen() {
      this.callbacks.onBeforeOpen();
    }
  }]);

  return Modal;
}();



/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(2);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// EXTERNAL MODULE: ./node_modules/scriptjs/dist/script.js
var script = __webpack_require__(5);
var script_default = /*#__PURE__*/__webpack_require__.n(script);

// EXTERNAL MODULE: ./source/scripts/Layout.js
var Layout = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/shopify-currency-converter/dist/index.js
var dist = __webpack_require__(26);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./node_modules/shopify-asyncview/dist/index.es.js
var index_es = __webpack_require__(32);

// EXTERNAL MODULE: ./source/scripts/components/Modal.js
var Modal = __webpack_require__(33);

// EXTERNAL MODULE: ./source/scripts/components/ProductDetails.js + 5 modules
var ProductDetails = __webpack_require__(42);

// EXTERNAL MODULE: ./source/scripts/components/RichText.js
var RichText = __webpack_require__(27);

// EXTERNAL MODULE: ./source/scripts/helpers/ProductReviews.js
var ProductReviews = __webpack_require__(41);

// CONCATENATED MODULE: ./source/scripts/components/ProductQuickshop.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var ProductQuickshop_ProductQuickshop =
/*#__PURE__*/
function () {
  function ProductQuickshop(options) {
    _classCallCheck(this, ProductQuickshop);

    this.$el = options.$el;
    this.id = options.id;
    this.quickShopSelector = "#shopify-section-".concat(this.id, " [data-product-quickshop]");
    this.$quickShop = jquery_default()(this.quickShopSelector);
    this.quickshopSpinner = this.$quickShop[0].querySelector('.quickshop-spinner');
    this.modalClass = options.modalClass;
    this.loaded = false;
    this.richText = null;
    this.productDetails = null;
    this.trigger = options.trigger;
    this.isOpen = false;
    this.openingAddToCart = false;
    this.url = this.$el.data('product-quickshop-url');
    this.settingsSha256 = this.$el.data('quickshop-settings-sha256');
    this.productSha256 = this.$el.data('quickshop-product-sha256');
    this.modalCallbacks = {
      onOpen: this._open.bind(this),
      onClose: this._close.bind(this)
    };
    this.atcCallbacks = {
      onInit: this._onATCInit.bind(this),
      onError: this._onATCError.bind(this),
      onSuccess: this._onATCSuccess.bind(this),
      onClose: this._onATCClose.bind(this)
    };

    this._initialize();
  }

  _createClass(ProductQuickshop, [{
    key: "_initialize",
    value: function _initialize() {
      var _this = this;

      this.modal = new Modal["a" /* default */](this.modalCallbacks);
      this.modal.open(this.quickShopSelector, this.modalClass, this.trigger);
      this.isOpen = true;
      var $quickShopModalContent = this.modal.$modalInner.find('[data-modal-content]');
      index_es["a" /* default */].load(this.url, '_quickshop', {
        hash: "".concat(this.productSha256).concat(this.settingsSha256)
      }).done(function (_ref) {
        var html = _ref.html,
            options = _ref.options;

        // Stop populating the modal if it was closed before the content was loaded
        if (!_this.isOpen) {
          return;
        }

        $quickShopModalContent.html(html.content);
        Object(ProductReviews["a" /* initShopifyProductReviews */])();
        $quickShopModalContent.find('.money').each(function (index, el) {
          return dist_default.a.update(el);
        });

        if (window.Shopify && Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }

        _this.$message = $quickShopModalContent.find('[data-product-quickshop-message]');
        _this.$formArea = $quickShopModalContent.find('[data-product-form-area]');
        _this.$gallery = $quickShopModalContent.find('[data-product-gallery]');
        _this.$details = $quickShopModalContent.find('[data-product-details]');
        _this.$description = $quickShopModalContent.find('[data-product-description]');
        _this.context = options.context;
        _this.settings = options.settings;
        _this.product = options.product;

        _this._onQuickshopLoaded();
      }).fail();
    }
  }, {
    key: "_onQuickshopLoaded",
    value: function _onQuickshopLoaded() {
      if (this.loaded) {
        return;
      }

      if (this.$description && this.$description.length) {
        this.richText = new RichText["a" /* default */](this.$description);
      }

      var options = {
        $formArea: this.$formArea,
        $gallery: this.$gallery,
        $details: this.$details,
        atcCallbacks: this.atcCallbacks,
        context: this.context,
        settings: this.settings,
        product: this.product,
        useHistory: false,
        isQuickshop: true
      };
      this.modal.position();
      this.modal.finishedLoading();
      this.loaded = true;
      this.productDetails = new ProductDetails["a" /* default */](options);
    }
  }, {
    key: "_open",
    value: function _open() {// do nothing
    }
  }, {
    key: "_close",
    value: function _close() {
      if (this.productDetails) {
        this.productDetails.unload();
      }

      if (this.richText) {
        this.richText.unload();
      }

      if (!this.openingAddToCart) {
        this.trigger.focus();
      }

      this.loaded = false;
      this.isOpen = false;
      this.$quickShop.empty();
      this.$quickShop.html(this.quickshopSpinner);

      this._toggleMessage('', false);

      this.modal.unload();
    }
  }, {
    key: "_toggleMessage",
    value: function _toggleMessage(message, isVisible) {
      if (this.$message) {
        this.$message.html(message).toggleClass('visible', isVisible);
      }
    }
  }, {
    key: "_onATCInit",
    value: function _onATCInit() {
      this.openingAddToCart = true;
      this.$message.removeClass('visible');
    }
  }, {
    key: "_onATCError",
    value: function _onATCError(error) {
      var $content = jquery_default()("<div class=\"product-message--error\" tabindex=\"-1\">".concat(error, "</div>"));

      this._toggleMessage($content, true);

      $content.focus();
    }
  }, {
    key: "_onATCSuccess",
    value: function _onATCSuccess() {
      this._close();
    }
  }, {
    key: "_onATCClose",
    value: function _onATCClose() {
      this.trigger.focus();
    }
  }, {
    key: "unload",
    value: function unload() {
      this._close();
    }
  }]);

  return ProductQuickshop;
}();


// EXTERNAL MODULE: ./source/scripts/components/AddToCartFlyout.js + 1 modules
var AddToCartFlyout = __webpack_require__(44);

// CONCATENATED MODULE: ./source/scripts/components/ProductGridItem.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductGridItem_ProductGridItem; });
function ProductGridItem_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProductGridItem_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProductGridItem_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProductGridItem_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProductGridItem_defineProperties(Constructor, staticProps); return Constructor; }







var ProductGridItem_ProductGridItem =
/*#__PURE__*/
function () {
  function ProductGridItem(options) {
    var _this = this;

    ProductGridItem_classCallCheck(this, ProductGridItem);

    this.$el = jquery_default()(options.el);
    this.id = options.id;
    this.productQuickshop = null;
    this.quickBuySettings = null;
    this.events = [];
    this.actionsOpen = false;
    this.$window = jquery_default()(window);
    this.$html = jquery_default()('html');
    this.$content = this.$el.find('[data-product-item-content]');
    this.$actions = this.$el.find('[data-product-actions]');
    this.hasProductActions = this.$actions.length;
    this._addToCart = this._addToCart.bind(this);
    this._actionsToggle = this._actionsToggle.bind(this);
    this._openQuickShop = this._openQuickShop.bind(this);

    if (this.hasProductActions) {
      this._setSortByQueryParameters();

      if (this.$html.hasClass('no-touch') && Shopify.queryParams.grid_list !== 'list-view') {
        this.events.push(this.$el.on('mouseenter.product-item', this._actionsToggle));
        this.events.push(this.$el.on('mouseleave.product-item', this._actionsToggle));
        this.events.push(this.$el.on('focusin.product-item', this._actionsToggle));
      } // $scripts checks existence of script in header before attempting to inject


      script_default()(jquery_default()('[data-scripts]').data('shopify-api-url'), function () {
        _this.events.push(_this.$el.on('click.product-item', '[data-quick-buy]', _this._addToCart));

        _this.events.push(_this.$el.on('click.product-item', '[data-quickshop-slim]', _this._openQuickShop));

        _this.events.push(_this.$el.on('click.product-item', '[data-quickshop-full]', _this._openQuickShop));
      });
    }

    if (this.$el.find('[data-quick-buy]').length) {
      this._initQuickBuy();
    }

    this._objectFitPolyfill();
  }
  /**
   * Make Shopify aware of releavent collection search info
   *  - tag
   *  - vendor
   *  - pagination
   *  - sorting criteria
   *
   * @private
   */


  ProductGridItem_createClass(ProductGridItem, [{
    key: "_setSortByQueryParameters",
    value: function _setSortByQueryParameters() {
      Shopify.queryParams = {};

      if (location.search.length) {
        for (var i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
          var aKeyValue = aCouples[i].split('='); // Reset the page number when we apply (i.e. don't add it to params)

          if (aKeyValue.length > 1 && aKeyValue[0] !== 'page') {
            Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
          }
        }
      }
    }
  }, {
    key: "_initQuickBuy",
    value: function _initQuickBuy() {
      try {
        this.quickBuySettings = JSON.parse(this.$el.find('[data-quick-buy-settings]').text());
      } catch (error) {
        console.warn("Quick buy: invalid QuickBuy data found. ".concat(error.message));
      }
    }
  }, {
    key: "_openQuickShop",
    value: function _openQuickShop(event) {
      event.preventDefault();
      var modalClass = event.currentTarget.hasAttribute('data-quickshop-full') ? 'quickshop-full' : 'quickshop-slim';

      if (this.productQuickshop) {
        this.productQuickshop.unload();
      }

      this.productQuickshop = new ProductQuickshop_ProductQuickshop({
        $el: this.$el,
        id: this.id,
        modalClass: modalClass,
        trigger: this.$el.find('.productitem--title a')
      });
    }
  }, {
    key: "_isObjectFitAvailable",
    value: function _isObjectFitAvailable() {
      return 'objectFit' in document.documentElement.style;
    }
  }, {
    key: "_objectFitPolyfill",
    value: function _objectFitPolyfill() {
      if (this._isObjectFitAvailable()) {
        return;
      }

      var $figure = jquery_default()('[data-product-item-image]', this.$el);
      var featuredSrc = jquery_default()('img:not(.productitem--image-alternate)', $figure).attr('src');
      var alternateSrc = jquery_default()('.productitem--image-alternate', $figure).attr('src');
      $figure.addClass('product-item-image-no-objectfit');
      $figure.css('background-image', "url(\"".concat(featuredSrc, "\")"));

      if (alternateSrc) {
        this.$el.on('mouseover', function () {
          $figure.css('background-image', "url(\"".concat(alternateSrc, "\")"));
        });
        this.$el.on('mouseleave', function () {
          $figure.css('background-image', "url(\"".concat(featuredSrc, "\")"));
        });
      }
    }
    /**
     * Get height of element, and combined height of element + actions
     *
     * @returns {{heightBase, heightExpanded: *}}
     * @private
     */

  }, {
    key: "_getHeights",
    value: function _getHeights() {
      var height = this.$el.height();
      var actionsHeight = this.$el.find('[data-product-actions]').outerHeight(true);
      return {
        heightBase: height,
        heightExpanded: height + actionsHeight
      };
    }
  }, {
    key: "_actionsToggle",
    value: function _actionsToggle(event) {
      if (!Layout["a" /* default */].isBreakpoint('L')) return;
      var $currentTarget = jquery_default()(event.currentTarget);
      var $target = jquery_default()(event.target);
      var openProductItem = false; // This function gets called on the element as well as the document focusin, so we want to
      // be extra careful that we are inside the product card in question. We want the product card
      // to close if another product card has received focus.

      var productHasFocus = this.$el.is($currentTarget) || this.$el.is($target) || this.$el.is($target.parents('.productgrid--item').first());

      if (event.type === 'mouseenter' || event.type === 'mouseleave') {
        openProductItem = event.type === 'mouseenter';
      } else if (productHasFocus) {
        openProductItem = true;
      }

      if (openProductItem) {
        this._showActions();
      } else {
        this._hideActions();
      }
    }
  }, {
    key: "_showActions",
    value: function _showActions() {
      var _this2 = this;

      if (this.actionsOpen) {
        return;
      }

      var _this$_getHeights = this._getHeights(),
          heightBase = _this$_getHeights.heightBase,
          heightExpanded = _this$_getHeights.heightExpanded; // Lock heights to prevent jumping


      this.$el.css('height', heightBase);
      this.$content.css('height', heightBase); // Store height for when hovering out

      this.$el.data('base-height', heightBase); // Start animation, and transition height to expanded height

      this.$el.revealer('show').one('revealer-animating.product-item', function () {
        _this2.$content.css('height', heightExpanded);
      });
      document.addEventListener('focusin', this._actionsToggle);
      this.actionsOpen = true;
    }
  }, {
    key: "_hideActions",
    value: function _hideActions() {
      var _this3 = this;

      var height = this.$el.data('base-height');
      /*
        - Transition buttons up, using base height for animation
        - Remove heights after animation is complete in case of resize
       */

      this.$el.revealer('hide').one('revealer-animating', function () {
        _this3.$el.off('revealer-animating.product-item');

        _this3.$el.css({
          height: height
        });

        _this3.$content.css({
          height: height
        });
      }).one('revealer-hide', function () {
        _this3.$el.off('revealer-hide.product-item').css('height', '');

        _this3.$content.css('height', '');
      });
      document.removeEventListener('focusin', this._actionsToggle);
      this.actionsOpen = false;
    }
  }, {
    key: "_addToCart",
    value: function _addToCart(event) {
      event.preventDefault();
      var $atcButton = jquery_default()(event.currentTarget);
      var variantID = $atcButton.attr('data-variant-id');
      var formData = [{
        name: 'id',
        value: variantID
      }, {
        name: 'quantity',
        value: 1
      }];
      var options = {
        $atcButton: $atcButton,
        settings: {
          moneyFormat: this.quickBuySettings.money_format,
          cartRedirection: this.quickBuySettings.cart_redirection
        }
      };
      AddToCartFlyout["a" /* default */].init(formData, options);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.events.forEach(function ($el) {
        return $el.off('.product-item');
      });

      if (this.productQuickshop) {
        this.productQuickshop.unload();
      }

      document.removeEventListener('focusin', this._actionsToggle);
    }
  }]);

  return ProductGridItem;
}();



/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var defaults = {
    modal: '.modal',
    modalInner: '.modal-inner',
    modalContent: '.modal-content',
    open: '[data-modal-open]',
    close: '[data-modal-close]',
    page: 'body',
    class: 'modal-visible',
    loadClass: 'vanilla-modal',
    clickOutside: true,
    closeKeys: [27],
    transitions: true,
    transitionEnd: null,
    onBeforeOpen: null,
    onBeforeClose: null,
    onOpen: null,
    onClose: null
  };

  function throwError(message) {
    // eslint-disable-next-line no-console
    console.error('VanillaModal: ' + message);
  }

  function find(arr, callback) {
    return function (key) {
      var filteredArray = arr.filter(callback);
      return filteredArray[0] ? filteredArray[0][key] : undefined;
    };
  }

  function transitionEndVendorSniff() {
    var el = document.createElement('div');
    var transitions = [{ key: 'transition', value: 'transitionend' }, { key: 'OTransition', value: 'otransitionend' }, { key: 'MozTransition', value: 'transitionend' }, { key: 'WebkitTransition', value: 'webkitTransitionEnd' }];
    return find(transitions, function (_ref) {
      var key = _ref.key;
      return typeof el.style[key] !== 'undefined';
    })('value');
  }

  function isPopulatedArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]' && arr.length;
  }

  function getNode(selector, parent) {
    var targetNode = parent || document;
    var node = targetNode.querySelector(selector);
    if (!node) {
      throwError(selector + ' not found in document.');
    }
    return node;
  }

  function addClass(el, className) {
    if (!(el instanceof HTMLElement)) {
      throwError('Not a valid HTML element.');
    }
    el.setAttribute('class', el.className.split(' ').filter(function (cn) {
      return cn !== className;
    }).concat(className).join(' '));
  }

  function removeClass(el, className) {
    if (!(el instanceof HTMLElement)) {
      throwError('Not a valid HTML element.');
    }
    el.setAttribute('class', el.className.split(' ').filter(function (cn) {
      return cn !== className;
    }).join(' '));
  }

  function getElementContext(e) {
    if (e && typeof e.hash === 'string') {
      return document.querySelector(e.hash);
    } else if (typeof e === 'string') {
      return document.querySelector(e);
    }
    throwError('No selector supplied to open()');
    return null;
  }

  function applyUserSettings(settings) {
    return _extends({}, defaults, settings, {
      transitionEnd: transitionEndVendorSniff()
    });
  }

  function matches(e, selector) {
    var allMatches = (e.target.document || e.target.ownerDocument).querySelectorAll(selector);
    for (var i = 0; i < allMatches.length; i += 1) {
      var node = e.target;
      while (node && node !== document.body) {
        if (node === allMatches[i]) {
          return node;
        }
        node = node.parentNode;
      }
    }
    return null;
  }

  var VanillaModal = function () {
    function VanillaModal(settings) {
      _classCallCheck(this, VanillaModal);

      this.isOpen = false;
      this.current = null;
      this.isListening = false;

      this.settings = applyUserSettings(settings);
      this.dom = this.getDomNodes();

      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.closeKeyHandler = this.closeKeyHandler.bind(this);
      this.outsideClickHandler = this.outsideClickHandler.bind(this);
      this.delegateOpen = this.delegateOpen.bind(this);
      this.delegateClose = this.delegateClose.bind(this);
      this.listen = this.listen.bind(this);
      this.destroy = this.destroy.bind(this);

      this.addLoadedCssClass();
      this.listen();
    }

    _createClass(VanillaModal, [{
      key: 'getDomNodes',
      value: function getDomNodes() {
        var _settings = this.settings,
            modal = _settings.modal,
            page = _settings.page,
            modalInner = _settings.modalInner,
            modalContent = _settings.modalContent;

        return {
          modal: getNode(modal),
          page: getNode(page),
          modalInner: getNode(modalInner, getNode(modal)),
          modalContent: getNode(modalContent, getNode(modal))
        };
      }
    }, {
      key: 'addLoadedCssClass',
      value: function addLoadedCssClass() {
        addClass(this.dom.page, this.settings.loadClass);
      }
    }, {
      key: 'setOpenId',
      value: function setOpenId(id) {
        var page = this.dom.page;

        page.setAttribute('data-current-modal', id || 'anonymous');
      }
    }, {
      key: 'removeOpenId',
      value: function removeOpenId() {
        var page = this.dom.page;

        page.removeAttribute('data-current-modal');
      }
    }, {
      key: 'open',
      value: function open(allMatches, e) {
        var page = this.dom.page;
        var _settings2 = this.settings,
            onBeforeOpen = _settings2.onBeforeOpen,
            onOpen = _settings2.onOpen;

        if (!(this.current instanceof HTMLElement === false)) {
          throwError('VanillaModal target must exist on page.');
          return;
        }
        this.releaseNode(this.current);
        this.current = getElementContext(allMatches);
        if (typeof onBeforeOpen === 'function') {
          onBeforeOpen.call(this, e);
        }
        this.captureNode(this.current);
        addClass(page, this.settings.class);
        this.setOpenId(this.current.id);
        this.isOpen = true;
        if (typeof onOpen === 'function') {
          onOpen.call(this, e);
        }
      }
    }, {
      key: 'detectTransition',
      value: function detectTransition() {
        var modal = this.dom.modal;

        var css = window.getComputedStyle(modal, null);
        return Boolean(['transitionDuration', 'oTransitionDuration', 'MozTransitionDuration', 'webkitTransitionDuration'].filter(function (i) {
          return typeof css[i] === 'string' && parseFloat(css[i]) > 0;
        }).length);
      }
    }, {
      key: 'close',
      value: function close(e) {
        var _settings3 = this.settings,
            transitions = _settings3.transitions,
            transitionEnd = _settings3.transitionEnd,
            onBeforeClose = _settings3.onBeforeClose;

        var hasTransition = this.detectTransition();
        if (this.isOpen) {
          this.isOpen = false;
          if (typeof onBeforeClose === 'function') {
            onBeforeClose.call(this, e);
          }
          removeClass(this.dom.page, this.settings.class);
          if (transitions && transitionEnd && hasTransition) {
            this.closeModalWithTransition(e);
          } else {
            this.closeModal(e);
          }
        }
      }
    }, {
      key: 'closeModal',
      value: function closeModal(e) {
        var onClose = this.settings.onClose;

        this.removeOpenId(this.dom.page);
        this.releaseNode(this.current);
        this.isOpen = false;
        this.current = null;
        if (typeof onClose === 'function') {
          onClose.call(this, e);
        }
      }
    }, {
      key: 'closeModalWithTransition',
      value: function closeModalWithTransition(e) {
        var _this = this;

        var modal = this.dom.modal;
        var transitionEnd = this.settings.transitionEnd;

        var closeTransitionHandler = function closeTransitionHandler() {
          modal.removeEventListener(transitionEnd, closeTransitionHandler);
          _this.closeModal(e);
        };
        modal.addEventListener(transitionEnd, closeTransitionHandler);
      }
    }, {
      key: 'captureNode',
      value: function captureNode(node) {
        var modalContent = this.dom.modalContent;

        while (node.childNodes.length) {
          modalContent.appendChild(node.childNodes[0]);
        }
      }
    }, {
      key: 'releaseNode',
      value: function releaseNode(node) {
        var modalContent = this.dom.modalContent;

        while (modalContent.childNodes.length) {
          node.appendChild(modalContent.childNodes[0]);
        }
      }
    }, {
      key: 'closeKeyHandler',
      value: function closeKeyHandler(e) {
        var closeKeys = this.settings.closeKeys;

        if (isPopulatedArray(closeKeys) && closeKeys.indexOf(e.which) > -1 && this.isOpen === true) {
          e.preventDefault();
          this.close(e);
        }
      }
    }, {
      key: 'outsideClickHandler',
      value: function outsideClickHandler(e) {
        var clickOutside = this.settings.clickOutside;
        var modalInner = this.dom.modalInner;

        if (clickOutside) {
          var node = e.target;
          while (node && node !== document.body) {
            if (node === modalInner) {
              return;
            }
            node = node.parentNode;
          }
          this.close(e);
        }
      }
    }, {
      key: 'delegateOpen',
      value: function delegateOpen(e) {
        var open = this.settings.open;

        var matchedNode = matches(e, open);
        if (matchedNode) {
          e.preventDefault();
          this.open(matchedNode, e);
        }
      }
    }, {
      key: 'delegateClose',
      value: function delegateClose(e) {
        var close = this.settings.close;

        if (matches(e, close)) {
          e.preventDefault();
          this.close(e);
        }
      }
    }, {
      key: 'listen',
      value: function listen() {
        var modal = this.dom.modal;

        if (!this.isListening) {
          modal.addEventListener('click', this.outsideClickHandler, false);
          document.addEventListener('keydown', this.closeKeyHandler, false);
          document.addEventListener('click', this.delegateOpen, false);
          document.addEventListener('click', this.delegateClose, false);
          this.isListening = true;
        } else {
          throwError('Event listeners already applied.');
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var modal = this.dom.modal;

        if (this.isListening) {
          this.close();
          modal.removeEventListener('click', this.outsideClickHandler);
          document.removeEventListener('keydown', this.closeKeyHandler);
          document.removeEventListener('click', this.delegateOpen);
          document.removeEventListener('click', this.delegateClose);
          this.isListening = false;
        } else {
          throwError('Event listeners already removed.');
        }
      }
    }]);

    return VanillaModal;
  }();

  exports.default = VanillaModal;
});


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initShopifyProductReviews; });
var initShopifyProductReviews = function initShopifyProductReviews() {
  if (!window.SPR) {
    return;
  }

  window.SPR.registerCallbacks();
  window.SPR.initRatingHandler();
  window.SPR.initDomEls();
  window.SPR.loadProducts();
  window.SPR.loadBadges();
};
/* unused harmony default export */ var _unused_webpack_default_export = ({
  initShopifyProductReviews: initShopifyProductReviews
});

/***/ })

}]);
//# sourceMappingURL=DynamicFeaturedCollection-StaticCollection-StaticProductRecommendations-StaticSearch.bundle.js.map?1565631014304