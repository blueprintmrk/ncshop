(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Accordion; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Accordion =
/*#__PURE__*/
function () {
  function Accordion($el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Accordion);

    this.$el = $el;
    this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, {
      activeClass: 'accordion--active',
      autoCollapse: false,
      content: '[data-accordion-content]',
      eligibleClass: 'has-accordion'
    }, options);
  }

  _createClass(Accordion, [{
    key: "toggle",
    value: function toggle($block) {
      var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (open || !$block.hasClass(this.options.activeClass)) {
        if (this.options.autoCollapse) this.closeOpen();

        this._open($block);
      } else {
        this._close($block);
      }
    }
  }, {
    key: "closeOpen",
    value: function closeOpen() {
      var _this = this;

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$el.find(".".concat(this.options.activeClass))).each(function (i, block) {
        var $block = jquery__WEBPACK_IMPORTED_MODULE_0___default()(block);

        if ($block.hasClass(_this.options.activeClass)) {
          _this._close($block);
        }
      });
    }
  }, {
    key: "openAll",
    value: function openAll() {
      var _this2 = this;

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$el.find(".".concat(this.options.eligibleClass))).each(function (i, block) {
        _this2._open(jquery__WEBPACK_IMPORTED_MODULE_0___default()(block), 0);
      });
    }
  }, {
    key: "_open",
    value: function _open($block) {
      $block.addClass(this.options.activeClass);
    }
  }, {
    key: "_close",
    value: function _close($block) {
      $block.removeClass(this.options.activeClass);
    }
  }]);

  return Accordion;
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

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(2);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// EXTERNAL MODULE: ./node_modules/shopify-currency-converter/dist/index.js
var dist = __webpack_require__(26);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./node_modules/scriptjs/dist/script.js
var script = __webpack_require__(5);
var script_default = /*#__PURE__*/__webpack_require__.n(script);

// EXTERNAL MODULE: ./source/scripts/Forms.js + 1 modules
var Forms = __webpack_require__(25);

// EXTERNAL MODULE: ./source/scripts/Layout.js
var Layout = __webpack_require__(23);

// CONCATENATED MODULE: ./source/scripts/components/StickyHeader.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var StickyHeader_StickyHeader =
/*#__PURE__*/
function () {
  function StickyHeader(options, settings) {
    var _this = this;

    _classCallCheck(this, StickyHeader);

    this.body = document.querySelector('body');
    this.header = document.querySelector('[data-site-header]');
    this.menu = this.header.querySelector('[data-site-navigation]');
    this.menuToggle = options.menuToggle;
    this.postMessage = options.postMessage;
    this.settings = settings;
    this.transitioning = false;
    this.lastToggle = Date.now() - 1000;
    this.stickyClass = 'site-header-sticky';
    this.scrolledClass = 'site-header-sticky--scrolled';
    this.navOpenClass = 'site-header-nav--open';
    this._toggleStickyHeader = this._toggleStickyHeader.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);

    if (this.settings.sticky_header) {
      this.body.classList.add(this.stickyClass);
      window.requestAnimationFrame(function () {
        // If browser doesn't support sticky, we don't want any of the sticky functionality.
        if (window.getComputedStyle(_this.header).position.indexOf('sticky') > -1) {
          _this.observer = new IntersectionObserver(function (entries) {
            return _this._toggleStickyHeader(entries);
          });

          _this.observer.observe(document.querySelector('[data-header-intersection-target]'));

          _this.toggleClick = function (event) {
            event.preventDefault();
            if (Layout["a" /* default */].isBreakpoint('L')) _this._toggleMenu();
          };

          _this.menuToggle.addEventListener('click', _this.toggleClick);
        }
      });
    }
  }

  _createClass(StickyHeader, [{
    key: "closeNavigation",
    value: function closeNavigation() {
      var _this2 = this;

      if (this.transitioning) {
        return;
      }

      this.menuToggle.classList.remove('active');

      this.navTransitionOutEvent = function () {
        _this2.header.classList.remove(_this2.navOpenClass);

        _this2.transitioning = false;

        _this2.menu.removeEventListener('transitionend', _this2.navTransitionOutEvent);
      };

      this.menu.addEventListener('transitionend', this.navTransitionOutEvent);
      this.transitioning = true;
      this.menu.setAttribute('style', "margin-top: -".concat(this.menu.getBoundingClientRect().height, "px;"));
      this.postMessage('nav:close-all');
    }
  }, {
    key: "openNavigation",
    value: function openNavigation() {
      var _this3 = this;

      if (this.transitioning || this.header.classList.contains(this.navOpenClass)) {
        return;
      }

      this.menuToggle.classList.add('active');

      this.navTransitionInEvent = function () {
        _this3.transitioning = false;

        _this3.menu.removeEventListener('transitionend', _this3.navTransitionInEvent);
      };

      this.menu.addEventListener('transitionend', this.navTransitionInEvent);
      this.transitioning = true; // We need to wait for the browser to set the display to 'block' before we set the margin
      // This will help with ensuring the different animations/transitions happen in sequence
      // and not at the same time.

      window.requestAnimationFrame(function () {
        _this3.header.classList.add(_this3.navOpenClass);

        window.requestAnimationFrame(function () {
          _this3.menu.setAttribute('style', 'margin-top: 0;');
        });
      });
    }
  }, {
    key: "_toggleMenu",
    value: function _toggleMenu() {
      if (this.header.classList.contains(this.navOpenClass)) {
        this.closeNavigation();
      } else {
        this.openNavigation();
      }
    }
    /**
     * Sticky header only shows as sticky after scroll
     *
     * @private
     */

  }, {
    key: "_toggleStickyHeader",
    value: function _toggleStickyHeader(entries) {
      if (this.body.classList.contains('scroll-lock') || !Layout["a" /* default */].isBreakpoint('L')) {
        return;
      }

      var shouldShrink = !entries[0].isIntersecting; // Sticky header is scrolled, is and is visible -- nothing more to do!

      if (shouldShrink && this.header.classList.contains(this.scrolledClass)) {
        return;
      } // We also check to make sure the toggle hasnt activated recently to stop jerky transitions


      if (this.lastToggle + 500 > Date.now()) {
        return;
      }

      this.lastToggle = Date.now();

      if (shouldShrink) {
        this._shrink();
      } else {
        this._expand();
      }
    }
  }, {
    key: "_shrink",
    value: function _shrink() {
      this.closeNavigation();
      this.header.classList.add(this.scrolledClass);
    }
  }, {
    key: "_expand",
    value: function _expand() {
      this.openNavigation();
      this.header.classList.remove(this.scrolledClass);
      this.menuToggle.classList.remove('active');
    }
  }, {
    key: "unload",
    value: function unload() {
      this.body.classList.remove(this.stickyClass);
      this.body.classList.remove(this.scrolledClass);

      if (this.observer) {
        this.observer.disconnect();
      }

      this.menuToggle.removeEventListener('click', this.toggleClick);
    }
  }]);

  return StickyHeader;
}();


// EXTERNAL MODULE: ./source/scripts/Accordion.js
var Accordion = __webpack_require__(30);

// CONCATENATED MODULE: ./source/scripts/components/navigation/NavMobileSubMenus.js
function NavMobileSubMenus_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NavMobileSubMenus_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NavMobileSubMenus_createClass(Constructor, protoProps, staticProps) { if (protoProps) NavMobileSubMenus_defineProperties(Constructor.prototype, protoProps); if (staticProps) NavMobileSubMenus_defineProperties(Constructor, staticProps); return Constructor; }




var NavMobileSubMenus_NavMobileSubMenus =
/*#__PURE__*/
function () {
  function NavMobileSubMenus($el) {
    NavMobileSubMenus_classCallCheck(this, NavMobileSubMenus);

    this.$el = $el;
    this.Accordion = new Accordion["a" /* default */](this.$el, {
      activeClass: 'visible',
      content: '[data-accordion-content]'
    }); // Sub menu selectors

    this.activeMenuClass = 'navmenu-link-parent-active';
    this.activeMenu = ".".concat(this.activeMenuClass);
    this.linkClass = 'navmenu-link-parent';
    this.linkSelector = ".".concat(this.linkClass);
    this.navTrigger = '[data-navmenu-parent]';
    this.subMenu = '[data-navmenu-submenu]';
    this.buttonClass = 'navmenu-button';
    this.buttonSelector = ".".concat(this.buttonClass);

    this._bindEvents();
  }

  NavMobileSubMenus_createClass(NavMobileSubMenus, [{
    key: "unload",
    value: function unload() {
      this.$el.off('.mobile-nav');
      delete this.Accordion;
    }
  }, {
    key: "closeSubMenus",
    value: function closeSubMenus($current) {
      var _this = this;

      $current.find(this.activeMenu).each(function (index, el) {
        _this._closeSubmenu(jquery_default()(el));
      });
    }
  }, {
    key: "closeAllSubmenus",
    value: function closeAllSubmenus() {
      this.Accordion.closeOpen();
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this2 = this;

      // Prevent focus state from applying on mouse click
      this.$el.on('mousedown.mobile-nav', '.navmenu-link', function (event) {
        event.preventDefault();
      });
      this.$el.on('click.mobile-nav', "".concat(this.navTrigger, " > .navmenu-link-parent"), this._linkClicked.bind(this));
      this.$el.on('click.mobile-nav', "".concat(this.navTrigger, " > .navmenu-button"), function (event) {
        event.preventDefault();

        _this2._toggleSubmenu(event);
      });
    }
  }, {
    key: "_linkClicked",
    value: function _linkClicked(event) {
      var $target = jquery_default()(event.currentTarget);

      if (!$target.hasClass(this.activeMenuClass)) {
        event.preventDefault();

        this._openSubmenu($target);
      }
    }
  }, {
    key: "_toggleSubmenu",
    value: function _toggleSubmenu(event) {
      var $target = jquery_default()(event.currentTarget);
      var $link = $target.hasClass(this.linkClass) ? $target : $target.siblings(this.linkSelector).first();

      if ($link.hasClass(this.activeMenuClass)) {
        this._closeSubmenu($target);
      } else {
        this._openSubmenu($target);
      }
    }
  }, {
    key: "_openSubmenu",
    value: function _openSubmenu($target) {
      var $menu = $target.siblings(this.subMenu).first();
      var $link = $target.hasClass(this.linkClass) ? $target : $target.siblings(this.linkSelector).first();
      var $button = $target.hasClass(this.buttonClass) ? $target : $target.siblings(this.buttonSelector).first();
      $menu.css('display', 'flex');
      $link.addClass(this.activeMenuClass).attr('aria-expanded', true);
      $button.attr('aria-expanded', true);
      this.Accordion.toggle($menu);
    }
  }, {
    key: "_closeSubmenu",
    value: function _closeSubmenu($target) {
      var $menu = $target.siblings(this.subMenu).first();
      var $link = $target.hasClass(this.linkClass) ? $target : $target.siblings(this.linkSelector).first();
      var $button = $target.hasClass(this.buttonClass) ? $target : $target.siblings(this.buttonSelector).first();
      $menu.one('transitionend', function () {
        return $menu.css('display', '');
      });
      $link.removeClass(this.activeMenuClass).attr('aria-expanded', false);
      $button.attr('aria-expanded', false);
      this.Accordion.toggle($menu);
      this.closeSubMenus($menu);
    }
  }]);

  return NavMobileSubMenus;
}();


// CONCATENATED MODULE: ./source/scripts/components/navigation/NavMobile.js
function NavMobile_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NavMobile_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NavMobile_createClass(Constructor, protoProps, staticProps) { if (protoProps) NavMobile_defineProperties(Constructor.prototype, protoProps); if (staticProps) NavMobile_defineProperties(Constructor, staticProps); return Constructor; }





var NavMobile_NavMobile =
/*#__PURE__*/
function () {
  function NavMobile(elements) {
    NavMobile_classCallCheck(this, NavMobile);

    this.$body = jquery_default()(document.body);
    this.$window = jquery_default()(window);
    this.$el = elements.$el;
    this.$toggleOpen = elements.$toggleOpen;
    this.isOpen = false;
    this.subMenus = null;
    this.$mobileNav = this.$el.find('[data-mobile-nav]');
    this.$panel = this.$el.find('[data-mobile-nav-panel]');
    this.$overlay = this.$el.find('[data-mobile-nav-overlay]');
    this.$toggleClose = this.$el.find('[data-mobile-nav-close]'); // Revert navigation to original state on breakpoint change

    this.layoutHandler = this.onBreakpointChange.bind(this);
    Layout["a" /* default */].onBreakpointChange(this.layoutHandler);

    this._bindEvents();
  }

  NavMobile_createClass(NavMobile, [{
    key: "unload",
    value: function unload() {
      this._close();

      this.$window.off('resize.mobile-nav');
      Layout["a" /* default */].offBreakpointChange(this.layoutHandler);
    }
  }, {
    key: "onBreakpointChange",
    value: function onBreakpointChange() {
      if (Layout["a" /* default */].isBreakpoint('L') && this.isOpen) {
        this._close();
      }
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this = this;

      this.$toggleOpen.on('click.mobile-nav', function (event) {
        event.preventDefault();
        if (!Layout["a" /* default */].isBreakpoint('L')) _this._open();
      });
      this.$window.on('resize.mobile-nav', function () {
        _this.$el.find('[data-menu-toggle]').removeClass('active');

        if (_this.isOpen) {
          _this._setPanelHeight();
        }
      });
    }
  }, {
    key: "_setPanelHeight",
    value: function _setPanelHeight() {
      this.$panel.height(window.innerHeight);
    }
  }, {
    key: "_open",
    value: function _open() {
      var _this2 = this;

      this.$body.addClass('scroll-lock');
      this.isOpen = true; // Activate Submenu handler

      this.subMenus = new NavMobileSubMenus_NavMobileSubMenus(this.$panel);

      this._setPanelHeight(); // Animate in elements


      this.$mobileNav.addClass('animating animating-in').one('trend', function () {
        _this2.$mobileNav.removeClass('animating animating-in').addClass('visible').off('trend');
      });
      this.$mobileNav.focus(); // Event handlers

      this.events = [// Close menu when clicking on the overlay
      this.$overlay.on('click.mobile-nav', function (event) {
        return _this2._close(event);
      }), this.$toggleClose.on('click.mobile-nav', function (event) {
        return _this2._close(event);
      }), // Disable scrolling on overlay and contactbar
      this.$overlay.on('touchmove.mobile-nav', function (event) {
        return event.preventDefault();
      })];
    }
  }, {
    key: "_close",
    value: function _close() {
      var _this3 = this;

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (event) event.preventDefault();
      this.$mobileNav.addClass('animating animating-out').one('trend', function () {
        _this3.$mobileNav.removeClass('animating animating-out').removeClass('visible').off('trend');
      });
      this.$body.removeClass('scroll-lock');
      this.isOpen = false; // Close any open drop down menus

      if (this.subMenus) {
        this.subMenus.closeSubMenus(this.$el);
        this.subMenus.closeAllSubmenus(); // Unbind Mobile sub menus

        this.subMenus.unload();
      } // Unbind events


      if (this.events) {
        this.events.forEach(function ($el) {
          return $el.off('.mobile-nav');
        });
        this.events = [];
      }
    }
  }]);

  return NavMobile;
}();


// EXTERNAL MODULE: ./source/scripts/helpers/scrollLeft.js
var scrollLeft = __webpack_require__(36);

// CONCATENATED MODULE: ./source/scripts/components/navigation/MegaNavScroller.js
function MegaNavScroller_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MegaNavScroller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MegaNavScroller_createClass(Constructor, protoProps, staticProps) { if (protoProps) MegaNavScroller_defineProperties(Constructor.prototype, protoProps); if (staticProps) MegaNavScroller_defineProperties(Constructor, staticProps); return Constructor; }




var MegaNavScroller_MegaNavScroller =
/*#__PURE__*/
function () {
  function MegaNavScroller($el) {
    var block = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    MegaNavScroller_classCallCheck(this, MegaNavScroller);

    this.$el = $el;
    this.$menuList = this.$el.find('.navmenu-meganav-items');

    this._bindEvents();

    this._addScrollClasses();

    if (block) {
      Object(scrollLeft["a" /* default */])(jquery_default()(block.el));
    }
  }

  MegaNavScroller_createClass(MegaNavScroller, [{
    key: "unload",
    value: function unload() {
      this.$menuList.off('.meganav');
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this = this;

      this.$menuList.on('scroll.meganav', function () {
        return _this._addScrollClasses();
      });
    }
  }, {
    key: "_addScrollClasses",
    value: function _addScrollClasses() {
      var scrollLeftPosition = this.$menuList.scrollLeft();
      var scrollWidth = this.$menuList[0].scrollWidth;
      var width = this.$menuList.width();
      this.$el.toggleClass('meganav--overflows-left', scrollLeftPosition > 0);
      this.$el.toggleClass('meganav--overflows-right', scrollLeftPosition < scrollWidth - width);
    }
  }]);

  return MegaNavScroller;
}();


// CONCATENATED MODULE: ./source/scripts/components/navigation/NavDesktopParent.js
function NavDesktopParent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NavDesktopParent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NavDesktopParent_createClass(Constructor, protoProps, staticProps) { if (protoProps) NavDesktopParent_defineProperties(Constructor.prototype, protoProps); if (staticProps) NavDesktopParent_defineProperties(Constructor, staticProps); return Constructor; }

 // eslint-disable-line import/no-cycle

var NavDesktopParent_NavDesktopParent =
/*#__PURE__*/
function () {
  function NavDesktopParent(el, options) {
    var _this = this;

    NavDesktopParent_classCallCheck(this, NavDesktopParent);

    this.listitem = el;
    this.link = null;
    this.submenu = null;
    this.isOpen = false;
    this.menu = null;
    this.closeSiblings = options.closeSiblings;
    var children = this.listitem.children;

    for (var i = 0; i < children.length; i++) {
      if (children[i].classList.contains('navmenu-link')) {
        this.link = children[i];
      } else if (children[i].classList.contains('navmenu-submenu')) {
        this.submenu = children[i];
      }
    }

    this.open = function () {
      _this._open();
    };

    this.close = function () {
      _this._close();
    };

    this.closeEsc = function (e) {
      if (e.key === 'Escape') {
        _this.link.focus();

        _this.close();
      }
    };

    this.timer = null;

    this.mouseover = function () {
      _this.open();

      clearTimeout(_this.timer);
    };

    this.mouseout = function () {
      _this.timer = setTimeout(_this.close, 400);
    };

    this.click = function (e) {
      e.stopPropagation(); // if already open, continue to link destination

      if (!e.target.classList.contains('navmenu-link-parent') || _this.isOpen) {
        return;
      }

      e.preventDefault();

      _this.open();
    };

    this.focusin = function (e) {
      e.stopPropagation();

      if (e.target.classList.contains('navmenu-link-parent')) {
        _this.closeSiblings(_this);
      }
    };

    this.listitem.addEventListener('mouseover', this.mouseover);
    this.listitem.addEventListener('mouseout', this.mouseout);
    this.listitem.addEventListener('touchend', this.click);
    this.listitem.addEventListener('click', this.click);
    this.listitem.addEventListener('focusin', this.focusin);
    document.body.addEventListener('click', this.close);
    document.body.addEventListener('focusin', this.close);
  }

  NavDesktopParent_createClass(NavDesktopParent, [{
    key: "_open",
    value: function _open() {
      var _this2 = this;

      this.closeSiblings(this);
      window.addEventListener('keydown', this.closeEsc);

      if (!this.listitem.classList.contains('open')) {
        this.listitem.classList.add('open');
        this.link.setAttribute('aria-expanded', true);

        this.submenuEndInAnimation = function () {
          _this2.submenu.classList.remove('animating-in');

          _this2.submenu.removeEventListener('animationend', _this2.submenuEndInAnimation);
        };

        this.submenu.addEventListener('animationend', this.submenuEndInAnimation);
        this.submenu.classList.add('animating-in');
      }

      if (!this.menu) {
        this.menu = new NavDesktopMenu_NavDesktopMenu(this.submenu);
      } // Determine if submenu needs to use alternate side for dropdown
      // Only applicable for regular drop down menus, not meganav


      if (!this.submenu.classList.contains('navmenu-meganav')) {
        var bounds = this.submenu.getBoundingClientRect();

        if (bounds.right > document.documentElement.clientWidth) {
          this.listitem.classList.add('alternate-drop');
        }
      }

      this.isOpen = true;
    }
  }, {
    key: "_close",
    value: function _close() {
      var _this3 = this;

      if (this.listitem.classList.contains('open') && !this.submenu.classList.contains('animating-out')) {
        this.submenuEndOutAnimation = function () {
          _this3.listitem.classList.remove('open');

          _this3.listitem.classList.remove('alternate-drop');

          _this3.link.setAttribute('aria-expanded', false);

          _this3.submenu.classList.remove('animating-out');

          _this3.submenu.removeEventListener('animationend', _this3.submenuEndOutAnimation);
        };

        this.submenu.addEventListener('animationend', this.submenuEndOutAnimation);
        this.submenu.classList.add('animating-out');
      }

      if (this.menu) {
        this.menu.unload();
        this.menu = null;
      }

      window.removeEventListener('keydown', this.closeEsc);
      this.isOpen = false;
    }
  }, {
    key: "unload",
    value: function unload() {
      this.close();
      this.listitem.removeEventListener('mouseover', this.mouseover);
      this.listitem.removeEventListener('mouseout', this.mouseout);
      this.listitem.removeEventListener('touchend', this.click);
      this.listitem.removeEventListener('click', this.click);
      this.listitem.removeEventListener('focusin', this.focusin);
      window.removeEventListener('keydown', this.closeEsc);
      document.body.removeEventListener('click', this.bodyClose);
      document.body.removeEventListener('focusin', this.focusInClose);
    }
  }]);

  return NavDesktopParent;
}();


// CONCATENATED MODULE: ./source/scripts/components/navigation/NavDesktopMenu.js
function NavDesktopMenu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NavDesktopMenu_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NavDesktopMenu_createClass(Constructor, protoProps, staticProps) { if (protoProps) NavDesktopMenu_defineProperties(Constructor.prototype, protoProps); if (staticProps) NavDesktopMenu_defineProperties(Constructor, staticProps); return Constructor; }

 // eslint-disable-line import/no-cycle

var NavDesktopMenu_NavDesktopMenu =
/*#__PURE__*/
function () {
  function NavDesktopMenu(_ref) {
    var _this = this;

    var children = _ref.children;

    NavDesktopMenu_classCallCheck(this, NavDesktopMenu);

    this.parents = [];
    this.children = children;

    this.closeSiblings = function (current) {
      _this.parents.forEach(function (parent) {
        if (parent !== current) {
          parent.close();
        }
      });
    };

    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].dataset.navmenuParent !== undefined) {
        this.parents.push(new NavDesktopParent_NavDesktopParent(this.children[i], {
          closeSiblings: this.closeSiblings
        }));
      } else if (children[i].classList.contains('navmenu-item')) {
        this.children[i].addEventListener('focusin', this.closeSiblings);
      }
    }
  }

  NavDesktopMenu_createClass(NavDesktopMenu, [{
    key: "unload",
    value: function unload() {
      this.parents.forEach(function (parent) {
        parent.unload();
      });

      for (var i = 0; i < this.children.length; i++) {
        this.children[i].removeEventListener('focusin', this.closeSiblings);
      }
    }
  }]);

  return NavDesktopMenu;
}();


// EXTERNAL MODULE: ./source/scripts/components/search/LiveSearch.js + 2 modules
var LiveSearch = __webpack_require__(43);

// EXTERNAL MODULE: ./source/scripts/components/search/SearchForm.js
var SearchForm = __webpack_require__(31);

// CONCATENATED MODULE: ./source/scripts/sections/StaticSectionHeader.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticSectionHeader_StaticSectionHeader; });
function StaticSectionHeader_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function StaticSectionHeader_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function StaticSectionHeader_createClass(Constructor, protoProps, staticProps) { if (protoProps) StaticSectionHeader_defineProperties(Constructor.prototype, protoProps); if (staticProps) StaticSectionHeader_defineProperties(Constructor, staticProps); return Constructor; }













var StaticSectionHeader_StaticSectionHeader =
/*#__PURE__*/
function () {
  function StaticSectionHeader(section) {
    var _this = this;

    StaticSectionHeader_classCallCheck(this, StaticSectionHeader);

    this.$el = jquery_default()(section.el);
    this.settings = section.data.settings;
    this.currency = section.data.currency;
    this.postMessage = section.postMessage;
    this.headerSearch = null;
    this.$scripts = jquery_default()('[data-scripts]');
    this.$menuToggle = this.$el.find('[data-menu-toggle]');
    this.$cartCount = this.$el.find('[data-header-cart-count]');
    this.$searchField = this.$el.find('[data-live-search]');
    this.$siteNavigation = this.$el.find('[data-site-navigation]');
    this.$desktopNavigation = this.$siteNavigation.find('ul.navmenu-depth-1');
    this.$headerTools = this.$siteNavigation.find('[data-header-actions]');
    this.converter = '[data-currency-converter]';
    this.$converter = jquery_default()(this.converter);
    this.stickyHeader = new StickyHeader_StickyHeader({
      header: this.$el[0],
      menuToggle: this.$menuToggle[0],
      postMessage: this.postMessage
    }, this.settings);
    this.megaNavs = {};
    var meganavMenus = document.querySelectorAll('[data-meganav-menu]');

    for (var i = 0; i < meganavMenus.length; i++) {
      var el = meganavMenus[i];
      var id = el.getAttribute('data-meganav-id');
      this.megaNavs[id] = new MegaNavScroller_MegaNavScroller(jquery_default()(el));
    }

    this.navMobile = new NavMobile_NavMobile({
      $el: this.$el,
      $toggleOpen: this.$menuToggle
    });
    this.navDesktop = new NavDesktopMenu_NavDesktopMenu(document.querySelector('.site-navigation > [data-navmenu]'));
    this.forms = new Forms["a" /* default */](this.$el);

    if (this.settings.live_search.enable) {
      script_default()(this.$scripts.data('shopify-api-url'), function () {
        _this.headerSearch = new LiveSearch["a" /* default */]({
          $el: _this.$searchField,
          $header: _this.$el
        }, _this.settings.live_search);
      });
    } else {
      this.headerSearch = new SearchForm["a" /* default */](this.$searchField);
    }

    if (this.currency.enable) {
      // we assume currencies.js has been loaded
      this._converter();
    }

    this.$el.on('cartcount:update', function (event, data) {
      _this.$cartCount.attr('data-header-cart-count', data.response.item_count).toggleClass('visible', data.response.item_count > 0);
    });
  }

  StaticSectionHeader_createClass(StaticSectionHeader, [{
    key: "onSectionSelect",
    value: function onSectionSelect() {
      this.stickyHeader.openNavigation();
    }
  }, {
    key: "onSectionDeselect",
    value: function onSectionDeselect() {
      this._closeAllMeganavs();
    }
  }, {
    key: "onSectionUnload",
    value: function onSectionUnload() {
      this.stickyHeader.unload();
      this.navMobile.unload();
      this.navDesktop.unload();
      this.forms.unload();
      this.$el.off('cartcount:update');
      this.headerSearch.unload();

      if (this.currency.enable) {
        this.$converter.off('change.converter');
      }
    }
  }, {
    key: "onSectionMessage",
    value: function onSectionMessage(name) {
      if (name === 'nav:close-all' && Layout["a" /* default */].isBreakpoint('L')) {
        this._closeAllMeganavs();
      }
    }
  }, {
    key: "onSectionBlockSelect",
    value: function onSectionBlockSelect(block) {
      if (!Layout["a" /* default */].isBreakpoint('L')) {
        return;
      }

      if (this.megaNavs[block.id]) {
        this.megaNavs[block.id].$el.addClass('meganav-editing-block');
        this.stickyHeader.openNavigation();
      }
    }
  }, {
    key: "onSectionBlockDeselect",
    value: function onSectionBlockDeselect(block) {
      if (this.megaNavs[block.id]) {
        this.megaNavs[block.id].$el.removeClass('meganav-editing-block');
      }
    }
  }, {
    key: "_converter",
    value: function _converter() {
      var _this2 = this;

      dist_default.a.init({
        switcherSelector: this.converter,
        priceSelector: '.money',
        shopCurrency: this.currency.shop_currency,
        defaultCurrency: this.currency.default_currency,
        displayFormat: this.currency.display_format,
        moneyFormat: this.currency.money_format,
        moneyFormatNoCurrency: this.currency.money_format_no_currency,
        moneyFormatCurrency: this.currency.money_format_currency
      });
      this.$converter.on('change.converter', function (event) {
        _this2.$converter.each(function (index, converter) {
          if (converter.value !== event.currentTarget.value) {
            converter.value = event.currentTarget.value; // eslint-disable-line no-param-reassign
          }
        });

        dist_default.a.setCurrency(event.currentTarget.value);
      });
    }
  }, {
    key: "_closeAllMeganavs",
    value: function _closeAllMeganavs() {
      var keys = Object.keys(this.megaNavs);

      for (var i = 0; keys.length < i; i++) {
        this.megaNavs[keys[i]].$el.removeClass('meganav-editing-block');
      }
    }
  }]);

  return StaticSectionHeader;
}();



/***/ })

}]);
//# sourceMappingURL=StaticSectionHeader.bundle.js.map?1565631014304