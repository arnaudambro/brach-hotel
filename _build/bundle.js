/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * perfect-scrollbar v1.3.0
 * (c) 2017 Hyunje Jun
 * @license MIT
 */
function get(element) {
  return getComputedStyle(element);
}

function set(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
    var this$1 = this;

  for (var name in this$1.handlers) {
    this$1.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

var processScrollDiff = function(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
};

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function outerWidth(element) {
  var styles = get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

var updateGeometry = function(i) {
  var element = i.element;

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt(i.railXWidth * i.containerWidth / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      (i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt(i.railYHeight * i.containerHeight / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      element.scrollTop *
        (i.railYHeight - i.scrollbarYHeight) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
};

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  set(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: element.scrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set(i.scrollbarYRail, yRailOffset);

  set(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

var clickRail = function(i) {
  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
};

var dragThumb = function(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y' ]);
};

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    startingScrollTop = element[scrollTop];
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

var keyboard = function(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
};

var wheel = function(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var isTop = element.scrollTop === 0;
    var isBottom =
      element.scrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.offsetWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
};

var touch = function(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
};

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this$1.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get(element).direction === 'rtl';
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
          ? 'end'
          : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
          ? 'end'
          : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = element.scrollTop; // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set(this.scrollbarXRail, { display: 'block' });
  set(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get(this.scrollbarXRail).marginLeft) +
    toInt(get(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get(this.scrollbarYRail).marginTop) +
    toInt(get(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set(this.scrollbarXRail, { display: 'none' });
  set(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set(this.scrollbarXRail, { display: '' });
  set(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = this.element.scrollTop;
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove(this.scrollbarX);
  remove(this.scrollbarY);
  remove(this.scrollbarXRail);
  remove(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

/* harmony default export */ __webpack_exports__["a"] = (PerfectScrollbar);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exactCapitalLetterSize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_measure_font__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_measure_font___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_measure_font__);




//pseudostyle
// http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
// var a={_b:0,c:function(){this._b++;return this.b;}};HTMLElement.prototype.pseudoStyle=function(d,e,f){var g="pseudoStyles";var h=document.head||document.getElementsByTagName('head')[0];var i=document.getElementById(g)||document.createElement('style');i.id=g;var j="pseudoStyle"+a.c();this.className+=" "+j;i.innerHTML+=" ."+j+":"+d+"{"+e+":"+f+"}";h.appendChild(i);return this;}

function exactCapitalLetterSize (element, fontFamily, size, lineHeight) {
  const fontMeasurements = __WEBPACK_IMPORTED_MODULE_0_measure_font___default()(fontFamily, {
      fontSize: 50,
      tolerance: 6
  });  

  // https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align
  //BUG : even with constant parameters, results are not the same... sadness
  const fmCapitalHeight = ((fontFamily === 'Portrait') || (fontFamily === 'Portrait-light')) ? 0.68 : -fontMeasurements.capHeight;
  const fmDescender = ((fontFamily === 'Portrait') || (fontFamily === 'Portrait-light')) ? 0.2 : fontMeasurements.descender;
  const fmAscender = ((fontFamily === 'Portrait') || (fontFamily === 'Portrait-light')) ? 0.7 : -fontMeasurements.topBounding;
  const fmEmSquare = (fmDescender - fmAscender);
  const fmLinegap = 0;

  /* compute needed values */
  const lineheightNormal = ((element.firstChild.offsetHeight) + (fmLinegap)) / size;
  const distanceBottom = ((fmDescender) + (lineheightNormal - fmEmSquare) / 2);
  const distanceTop = ((-fmAscender + fmCapitalHeight) + (lineheightNormal - fmEmSquare) / 2);
  const computedFontSize = ((size) / (fmCapitalHeight)); 
  const contentArea = ((lineheightNormal) * (computedFontSize));
  const valign = (((distanceBottom) - (distanceTop)) * (computedFontSize));  
  const computedLineheight = (((lineHeight) * (size)) - (valign));

  /* FOR DEBUGGING
  const parameters = {
    element,
    elementFirstChild: element.firstChild,
    fontFamily,
    size,
    lineHeight,
    fmEmSquare,
    fmCapitalHeight,
    fmDescender,
    fmAscender,
    fmLinegap,
    valign,
    computedLineheight,
    computedFontSize
  }
  console.log(parameters) */

  /* set font family */
  element.style.fontFamily = fontFamily;

  /* set capital height to equal font-size */
  element.style.fontSize = `${computedFontSize}px`;

  /* set computed line-height */
  element.style.lineHeight = `${computedLineheight}px`;

  // element.firstChild.style.height = `${size}px`;
  element.firstChild.style.verticalAlign = `${-valign}px`;
  // element.style.height = `${size}px`;
  // element.firstChild
  //   .pseudoStyle('before', 'content', '')
  //   .pseudoStyle('before', 'dispaly', 'inline-block')
  //   .pseudoStyle('before', 'height', `${size}px`);
}





/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* smoothscroll v0.4.0 - 2017 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   */
  var w = window;
  var d = document;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

   // polyfill
  function polyfill() {
    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style
      && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now
      ? w.performance.now.bind(w.performance)
      : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null
        || typeof firstArg !== 'object'
        || firstArg.behavior === undefined
        || firstArg.behavior === 'auto'
        || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions '
        + firstArg.behavior
        + ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return (el.clientHeight + ROUNDING_TOLERANCE) < el.scrollHeight;
      }

      if (axis === 'X') {
        return (el.clientWidth + ROUNDING_TOLERANCE) < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : (w.scrollX || w.pageXOffset),
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : (w.scrollY || w.pageYOffset)
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : (w.scrollX || w.pageXOffset),
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : (w.scrollY || w.pageYOffset)
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
             ? arguments[1]
             : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value couldn\'t be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object'
              ? ~~arguments[0]
              : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined
              ? ~~arguments[1]
              : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined
            ? true
            : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (true) {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }

}());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alSize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__measureFont_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_perfect_scrollbar__ = __webpack_require__(0);


 



const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDescription = document.querySelector('.slideshow__description');
const hotelOptions = document.querySelector('.slideshow__description--options');
const hotelOptionsLetters = [...hotelOptions.children];
/*------------------------------------*\
    SLIDESHOW LANDSCAPE OR PORTRAIT
\*------------------------------------*/


function landscapeOrPortrait() {
  let landscapeOrientation = window.innerHeight <= window.innerWidth;
  if ((window.innerWidth > 1024) && landscapeOrientation) {
    wholeContentDiv.classList.add('slideshow__landscape');
    wholeContentDiv.classList.remove('slideshow__portrait');
  } else {
    wholeContentDiv.classList.remove('slideshow__landscape');
    wholeContentDiv.classList.add('slideshow__portrait');  
  };
};

landscapeOrPortrait()
window.addEventListener('resize', landscapeOrPortrait);
/*------------------------------------*\
    BRACH LETTERS
\*------------------------------------*/

const firstAndLastHotelLetter = document.querySelectorAll('.first-last-letter');
const middleHotelLetters = document.querySelectorAll('.middle-letters');
const flSize = 26.750;
const mlSize = 23;

firstAndLastHotelLetter.forEach(letter => Object(__WEBPACK_IMPORTED_MODULE_0__measureFont_js__["a" /* exactCapitalLetterSize */])(letter, 'Portrait-light', flSize, 1));
middleHotelLetters.forEach(letter => Object(__WEBPACK_IMPORTED_MODULE_0__measureFont_js__["a" /* exactCapitalLetterSize */])(letter, 'Portrait-light', mlSize, 1));

/*------------------------------------*\
    HÔTEL OPTIONS LETTERS
\*------------------------------------*/

const alSize = 2 * flSize;
hotelOptionsLetters.forEach(letter => {
  Object(__WEBPACK_IMPORTED_MODULE_0__measureFont_js__["a" /* exactCapitalLetterSize */])(letter, 'Portrait', alSize, 1);
});


/*------------------------------------*\
    SLOGAN LETTERS
\*------------------------------------*/

const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const sloganAlSize = 0.35 * flSize;
Object(__WEBPACK_IMPORTED_MODULE_0__measureFont_js__["a" /* exactCapitalLetterSize */])(hotelSlogan, 'Cogito', sloganAlSize, 1)


/*------------------------------------*\
    DESCRIPTION POSITION
\*------------------------------------*/

function alignDescriptionWithCursorOnMiddle () {
  const hotelOptionsBottom = hotelOptions.offsetTop + hotelOptions.offsetHeight;
  const windowHeight = window.innerHeight;
  const differenceWithMiddle = hotelOptionsBottom - windowHeight / 2;
  slideshowDescription.style.marginBottom = `${differenceWithMiddle * 2 - 4}px`;
}

alignDescriptionWithCursorOnMiddle();

/*------------------------------------*\
    HIDE SCROLLBAR
\*------------------------------------*/




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return buildFakeTotem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildFakeHotelOptionLetters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__populateLetters__ = __webpack_require__(5);



  //Building the new totem

function buildFakeTotem (totemDiv, data, index) {
  let newTotemDiv;
  newTotemDiv = totemDiv.cloneNode(true);

  newTotemDiv.style.backgroundImage = `url('${data[Object.keys(data)[index]].totemPictureUrl()}')`;

  return newTotemDiv;
  //TO DO IN THE FUNCTION
  // document.body.append(newTotemDiv);
};

function buildFakeHotelOptionLetters (motherDiv, data, index, offset, size) {
  // console.log(`offset: ${offset}`);
  let newHotelOptions;
  newHotelOptions = motherDiv.cloneNode(false);

  Object(__WEBPACK_IMPORTED_MODULE_0__populateLetters__["a" /* populateHotelOptions */])(newHotelOptions, index, data, size);

  const divHorizontalCenter = (motherDiv.getBoundingClientRect().right - motherDiv.getBoundingClientRect().left) / 2;

  newHotelOptions.style.position = `absolute`;
  newHotelOptions.style.height = `${motherDiv.getBoundingClientRect().height}px`;
  newHotelOptions.style.width = `${motherDiv.getBoundingClientRect().width}px`;
  newHotelOptions.style.left = `${motherDiv.getBoundingClientRect().left}px`;
  newHotelOptions.style.top = `${motherDiv.getBoundingClientRect().top + offset}px`;
  [...newHotelOptions.children].forEach(letter => {
    letter.style.opacity = `0`;
  });
  const theme = Object.keys(data)[index];
  newHotelOptions.style.color = data[theme].textColor;


  return newHotelOptions;
  //TO DO IN THE FUNCTION
  // document.body.append(newHotelOptions);
};






/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return populateHotelOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__measureFont__ = __webpack_require__(1);


 

function populateHotelOptions (motherDiv, index, data, size) {
  while (motherDiv.firstChild) {
      motherDiv.removeChild(motherDiv.firstChild);
  };
  
  const theme = Object.keys(data)[index];
  
  // we do <p><span>'letter'</span></p> for each letter, in order to create an animation on each letter
  for (let i = 0; i < data[theme].frenchName.length; i++) {
    const newLetterP = document.createElement('p');
    const newLetterSpan = document.createElement('span');
    newLetterP.appendChild(newLetterSpan);
    newLetterSpan.textContent = data[theme].frenchName.charAt(i);
    motherDiv.appendChild(newLetterP);
  }
  //then letter spacing with margin
  [...motherDiv.children].forEach(letter => {
    Object(__WEBPACK_IMPORTED_MODULE_0__measureFont__["a" /* exactCapitalLetterSize */])(letter, 'Portrait', size, 1);
    //If the character is a space, make it clear to the eye by enlarging it 
    if (letter.firstChild.textContent.charCodeAt(0) === 32) {
      letter.style.marginRight = `${5 * data[theme].optionsLetterSpacing}px`;
    } else {
      letter.style.marginRight = `${data[theme].optionsLetterSpacing}px`;
    }
  })
};





/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slideshowParams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fakeDom__ = __webpack_require__(4);



const totemDiv = document.querySelector('.slideshow__totem');
const white = 'rgba(250,250,250,1.00)';

const slideshowParams = {
  hotel: {
    position: 0,
    frenchName: 'hôtel', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(38,5%,65%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(totemDiv, slideshowParams, this.position) },
  },
  clubDeSport: {
    position: 1,
    frenchName: 'club de sport', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(194,11%,63%,1.00)',
    optionsLetterSpacing: 3,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(totemDiv, slideshowParams, this.position) },
  },
  restaurant: {
    position: 2,
    frenchName: 'restaurant', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(2,41%,82%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(totemDiv, slideshowParams, this.position) },
  },
  bar: {
    position: 3,
    frenchName: 'bar', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(2,41%,82%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_hotel.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/hotel.png` },
    fakeTotem: function() { return Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(totemDiv, slideshowParams, this.position) },
  },
  patisserie: {
    position: 4,
    frenchName: 'pâtisserie', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(55,76%,82%,1.00)',
    optionsLetterSpacing: 8,
    textColor: 'rgba(151,105,80,1.00)',
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(totemDiv, slideshowParams, this.position) },
  },
  evenementiel: {
    position: 5,
    frenchName: 'évènementiel', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(33,57%,84%,1.00)',
    optionsLetterSpacing: 8,
    textColor: 'rgba(151,105,80,1.00)',
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(totemDiv, slideshowParams, this.position) },
  },
  potager: {
    position: 6,
    frenchName: 'potager', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(107,12%,72%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(totemDiv, slideshowParams, this.position) },
  },
}





/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
module.exports = __webpack_require__(28);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bling__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__measureFont__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__video1__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slideshow_slideshow__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__slideshow_slideshowPortrait__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DOMStyling__ = __webpack_require__(3);
// import { uniq } from 'lodash';
// import jsonp from 'jsonp';
// import insane from 'insane';
// import 'bootstrap';
// import './Chap1Carousel';
// import './Chap5Carousel';
// import './Chap5BisCarousel';


/*------------------------------------*\
    utilities
\*------------------------------------*/



/*------------------------------------*\
    modules
\*------------------------------------*/







/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(11).EventEmitter
const loadScript = __webpack_require__(12)

const YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api'

const YOUTUBE_STATES = {
  '-1': 'unstarted',
  '0': 'ended',
  '1': 'playing',
  '2': 'paused',
  '3': 'buffering',
  '5': 'cued'
}

const YOUTUBE_ERROR = {
  // The request contains an invalid parameter value. For example, this error
  // occurs if you specify a videoId that does not have 11 characters, or if the
  // videoId contains invalid characters, such as exclamation points or asterisks.
  INVALID_PARAM: 2,

  // The requested content cannot be played in an HTML5 player or another error
  // related to the HTML5 player has occurred.
  HTML5_ERROR: 5,

  // The video requested was not found. This error occurs when a video has been
  // removed (for any reason) or has been marked as private.
  NOT_FOUND: 100,

  // The owner of the requested video does not allow it to be played in embedded
  // players.
  UNPLAYABLE_1: 101,

  // This error is the same as 101. It's just a 101 error in disguise!
  UNPLAYABLE_2: 150
}

const loadIframeAPICallbacks = []

/**
 * YouTube Player. Exposes a better API, with nicer events.
 * @param {HTMLElement|selector} element
 */
class YouTubePlayer extends EventEmitter {
  constructor (element, opts) {
    super()

    const elem = typeof element === 'string'
      ? document.querySelector(element)
      : element

    if (elem.id) {
      this._id = elem.id // use existing element id
    } else {
      this._id = elem.id = 'ytplayer-' + Math.random().toString(16).slice(2, 8)
    }

    this._opts = Object.assign({
      width: 640,
      height: 360,
      autoplay: false,
      captions: undefined,
      controls: true,
      keyboard: true,
      fullscreen: true,
      annotations: true,
      modestBranding: false,
      related: true,
      info: true,
      timeupdateFrequency: 1000
    }, opts)

    this.videoId = null
    this.destroyed = false

    this._api = null
    this._player = null
    this._ready = false // is player ready?
    this._queue = []

    this._interval = null

    // Setup listeners for 'timeupdate' events. The YouTube Player does not fire
    // 'timeupdate' events, so they are simulated using a setInterval().
    this._startInterval = this._startInterval.bind(this)
    this._stopInterval = this._stopInterval.bind(this)

    this.on('unstarted', this._stopInterval)
    this.on('ended', this._stopInterval)
    this.on('playing', this._startInterval)
    this.on('paused', this._stopInterval)
    this.on('buffering', this._stopInterval)

    this._loadIframeAPI((err, api) => {
      if (err) return this._destroy(new Error('YouTube Iframe API failed to load'))
      this._api = api

      // If load(videoId) was called before Iframe API loaded, ensure it gets
      // called again now
      if (this.videoId) this.load(this.videoId)
    })
  }

  load (videoId, autoplay) {
    if (this.destroyed) return
    if (autoplay == null) autoplay = true

    this.videoId = videoId

    // If the Iframe API is not ready yet, do nothing. Once the Iframe API is
    // ready, `load(this.videoId)` will be called.
    if (!this._api) return

    // If there is no player instance, create one.
    if (!this._player) {
      this._createPlayer(videoId)
      this.emit('unstarted')
      this.emit('buffering')
      return
    }

    // If the player instance is not ready yet, do nothing. Once the player
    // instance is ready, `load(this.videoId)` will be called. This ensures that
    // the last call to `load()` is the one that takes effect.
    if (!this._ready) return

    // If the player instance is ready, load the given `videoId`.
    if (autoplay) {
      this._player.loadVideoById(videoId)
    } else {
      this._player.cueVideoById(videoId)
    }
  }

  play () {
    if (this._ready) this._player.playVideo()
    else this._queueCommand('play')
  }

  pause () {
    if (this._ready) this._player.pauseVideo()
    else this._queueCommand('pause')
  }

  stop () {
    if (this._ready) this._player.stopVideo()
    else this._queueCommand('stop')
  }

  seek (seconds) {
    if (this._ready) this._player.seekTo(seconds, true)
    else this._queueCommand('seek', seconds)
  }

  setVolume (volume) {
    if (this._ready) this._player.setVolume(volume)
    else this._queueCommand('setVolume', volume)
  }

  setPlaybackRate (rate) {
    if (this._ready) this._player.setPlaybackRate(rate)
    else this._queueCommand('setPlaybackRate', rate)
  }

  getVolume () {
    return (this._ready && this._player.getVolume()) || 0
  }

  getPlaybackRate () {
    return (this._ready && this._player.getPlaybackRate()) || 1
  }

  getAvailablePlaybackRates () {
    return (this._ready && this._player.getAvailablePlaybackRates()) || [ 1 ]
  }

  getDuration () {
    return (this._ready && this._player.getDuration()) || 0
  }

  getProgress () {
    return (this._ready && this._player.getVideoLoadedFraction()) || 0
  }

  getState () {
    return (this._ready && YOUTUBE_STATES[this._player.getPlayerState()]) || 'unstarted'
  }

  getCurrentTime () {
    return (this._ready && this._player.getCurrentTime()) || 0
  }

  destroy () {
    this._destroy()
  }

  _destroy (err) {
    if (this.destroyed) return
    this.destroyed = true

    if (this._player) {
      this._player.stopVideo()
      this._player.destroy()
    }

    this.videoId = null

    this._id = null
    this._opts = null
    this._api = null
    this._player = null
    this._ready = false
    this._queue = null

    this._stopInterval()
    this._interval = false

    this.removeListener('playing', this._startInterval)
    this.removeListener('paused', this._stopInterval)
    this.removeListener('buffering', this._stopInterval)
    this.removeListener('unstarted', this._stopInterval)
    this.removeListener('ended', this._stopInterval)

    if (err) this.emit('error', err)
  }

  _queueCommand (command, ...args) {
    if (this.destroyed) return
    this._queue.push([command, args])
  }

  _flushQueue () {
    while (this._queue.length) {
      const command = this._queue.shift()
      this[command[0]].apply(this, command[1])
    }
  }

  _loadIframeAPI (cb) {
    // If API is loaded, there is nothing else to do
    if (window.YT && typeof window.YT.Player === 'function') {
      return cb(null, window.YT)
    }

    // Otherwise, queue callback until API is loaded
    loadIframeAPICallbacks.push(cb)

    const scripts = Array.from(document.getElementsByTagName('script'))
    const isLoading = scripts.some(script => script.src === YOUTUBE_IFRAME_API_SRC)

    // If API <script> tag is not present in the page, inject it. Ensures that
    // if user includes a hardcoded <script> tag in HTML for performance, another
    // one will not be added
    if (!isLoading) {
      loadScript(YOUTUBE_IFRAME_API_SRC, (err) => {
        if (err) {
          while (loadIframeAPICallbacks.length) {
            const loadCb = loadIframeAPICallbacks.shift()
            loadCb(err)
          }
        }
      })
    }

    // If ready function is not present, create it
    if (typeof window.onYouTubeIframeAPIReady !== 'function') {
      window.onYouTubeIframeAPIReady = () => {
        while (loadIframeAPICallbacks.length) {
          const loadCb = loadIframeAPICallbacks.shift()
          loadCb(null, window.YT)
        }
      }
    }
  }

  _createPlayer (videoId) {
    if (this.destroyed) return

    const opts = this._opts

    this._player = new this._api.Player(this._id, {
      width: opts.width,
      height: opts.height,
      videoId: videoId,
      playerVars: {
        // This parameter specifies whether the initial video will automatically
        // start to play when the player loads. Supported values are 0 or 1. The
        // default value is 0.
        autoplay: opts.autoplay ? 1 : 0,

        // Setting the parameter's value to 1 causes closed captions to be shown
        // by default, even if the user has turned captions off. The default
        // behavior is based on user preference.
        cc_load_policy: opts.captions != null
          ? opts.captions ? 1 : 0
          : undefined, // default to not setting this option

        // This parameter indicates whether the video player controls are
        // displayed. For IFrame embeds that load a Flash player, it also defines
        // when the controls display in the player as well as when the player
        // will load. Supported values are:
        //   - controls=0 – Player controls do not display in the player. For
        //                  IFrame embeds, the Flash player loads immediately.
        //   - controls=1 – (default) Player controls display in the player. For
        //                  IFrame embeds, the controls display immediately and
        //                  the Flash player also loads immediately.
        //   - controls=2 – Player controls display in the player. For IFrame
        //                  embeds, the controls display and the Flash player
        //                  loads after the user initiates the video playback.
        controls: opts.controls ? 2 : 0,

        // Setting the parameter's value to 1 causes the player to not respond to
        // keyboard controls. The default value is 0, which means that keyboard
        // controls are enabled.
        disablekb: opts.keyboard ? 0 : 1,

        //  Setting the parameter's value to 1 enables the player to be
        //  controlled via IFrame or JavaScript Player API calls. The default
        //  value is 0, which means that the player cannot be controlled using
        //  those APIs.
        enablejsapi: 1,

        // Setting this parameter to 0 prevents the fullscreen button from
        // displaying in the player. The default value is 1, which causes the
        // fullscreen button to display.
        fs: opts.fullscreen ? 1 : 0,

        // Setting the parameter's value to 1 causes video annotations to be
        // shown by default, whereas setting to 3 causes video annotations to not
        // be shown by default. The default value is 1.
        iv_load_policy: opts.annotations ? 1 : 3,

        // This parameter lets you use a YouTube player that does not show a
        // YouTube logo. Set the parameter value to 1 to prevent the YouTube logo
        // from displaying in the control bar. Note that a small YouTube text
        // label will still display in the upper-right corner of a paused video
        // when the user's mouse pointer hovers over the player.
        modestbranding: 1,

        // This parameter provides an extra security measure for the IFrame API
        // and is only supported for IFrame embeds. If you are using the IFrame
        // API, which means you are setting the enablejsapi parameter value to 1,
        // you should always specify your domain as the origin parameter value.
        origin: window.location.origin,

        // This parameter controls whether videos play inline or fullscreen in an
        // HTML5 player on iOS. Valid values are:
        //   - 0: This value causes fullscreen playback. This is currently the
        //        default value, though the default is subject to change.
        //   - 1: This value causes inline playback for UIWebViews created with
        //        the allowsInlineMediaPlayback property set to TRUE.
        playsinline: 1,

        // This parameter indicates whether the player should show related videos
        // when playback of the initial video ends. Supported values are 0 and 1.
        // The default value is 1.
        rel: opts.related ? 1 : 0,

        // Supported values are 0 and 1. Setting the parameter's value to 0
        // causes the player to not display information like the video title and
        // uploader before the video starts playing. If the player is loading a
        // playlist, and you explicitly set the parameter value to 1, then, upon
        // loading, the player will also display thumbnail images for the videos
        // in the playlist. Note that this functionality is only supported for
        // the AS3 player.
        showinfo: opts.info ? 1 : 0,

        // (Not part of documented API) Allow html elements with higher z-index
        // to be shown on top of the YouTube player.
        wmode: 'opaque'
      },
      events: {
        onReady: () => this._onReady(videoId),
        onStateChange: (data) => this._onStateChange(data),
        onPlaybackQualityChange: (data) => this._onPlaybackQualityChange(data),
        onPlaybackRateChange: (data) => this._onPlaybackRateChange(data),
        onError: (data) => this._onError(data)
      }
    })
  }

  /**
   * This event fires when the player has finished loading and is ready to begin
   * receiving API calls.
   */
  _onReady (videoId) {
    if (this.destroyed) return

    this._ready = true

    // If the videoId that was loaded is not the same as `this.videoId`, then
    // `load()` was called twice before `onReady` fired. Just call
    // `load(this.videoId)` to load the right videoId.
    if (videoId !== this.videoId) {
      this.load(this.videoId)
    }

    this._flushQueue()
  }

  /**
   * Called when the player's state changes. We emit friendly events so the user
   * doesn't need to use YouTube's YT.PlayerState.* event constants.
   */
  _onStateChange (data) {
    if (this.destroyed) return

    const state = YOUTUBE_STATES[data.data]

    if (state) {
      // Send a 'timeupdate' anytime the state changes. Note: It's important that 'playing'
      // gets emitted before the first 'timeupdate', and that no 'timeupdate' events are
      // emitted after 'pause', 'ended', or 'buffering'.
      if (['paused'].includes(state)) this._onTimeupdate()
      this.emit(state)
      if (state === 'playing') this._onTimeupdate()
    } else {
      throw new Error('Unrecognized state change: ' + data)
    }
  }

  /**
   * This event fires whenever the video playback quality changes. Possible
   * values are: 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'.
   */
  _onPlaybackQualityChange (data) {
    if (this.destroyed) return
    this.emit('playbackQualityChange', data.data)
  }

  /**
   * This event fires whenever the video playback rate changes.
   */
  _onPlaybackRateChange (data) {
    if (this.destroyed) return
    this.emit('playbackRateChange', data.data)
  }

  /**
   * This event fires if an error occurs in the player.
   */
  _onError (data) {
    if (this.destroyed) return

    const code = data.data

    // The HTML5_ERROR error occurs when the YouTube player needs to switch from
    // HTML5 to Flash to show an ad. Ignore it.
    if (code === YOUTUBE_ERROR.HTML5_ERROR) return

    // The remaining error types occur when the YouTube player cannot play the
    // given video. This is not a fatal error. Report it as unplayable so the user
    // has an opportunity to play another video.
    if (code === YOUTUBE_ERROR.UNPLAYABLE_1 ||
        code === YOUTUBE_ERROR.UNPLAYABLE_2 ||
        code === YOUTUBE_ERROR.NOT_FOUND ||
        code === YOUTUBE_ERROR.INVALID_PARAM) {
      return this.emit('unplayable', this.videoId)
    }

    // Unexpected error, does not match any known type
    this._destroy(new Error('YouTube Player Error. Unknown error code: ' + code))
  }

  /**
   * This event fires when the time indicated by the `getCurrentTime()` method
   * has been updated.
   */
  _onTimeupdate () {
    this.emit('timeupdate', this.getCurrentTime())
  }

  _startInterval () {
    this._interval = setInterval(() => this._onTimeupdate(), this._opts.timeupdateFrequency)
  }

  _stopInterval () {
    clearInterval(this._interval)
    this._interval = null
  }
}

module.exports = YouTubePlayer


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = load

function load (src, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  script.type = 'text/javascript'
  script.async = true
  script.src = src

  if (cb) {
    script.onload = function () {
      script.onerror = script.onload = null
      cb(null, script)
    }
    script.onerror = function () {
      script.onerror = script.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }

  head.appendChild(script)
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export $ */
/* unused harmony export $$ */
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};




/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultValue = __webpack_require__(16);

var findEdge = __webpack_require__(20);
var drawCharacter = __webpack_require__(23);
var resetCanvas = __webpack_require__(24);
var createCanvas = __webpack_require__(25);

module.exports = function measureFont(fontFamily) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var fontSize = defaultValue(options.fontSize, 20);
	var canvasSize = defaultValue(options.tolerance, 6) * fontSize;

	var descenderCharacters = ["g", "j", "p", "q", "y"];
	var ascenderCharacters = ["h", "d", "t", "l"];
	var capHeightCharacters = ["H", "I", "T"];
	var medianCharacters = ["x", "v", "w", "z"];
	var topBoundingCharacters = ["O", "A", "8", "#", "%", "^", "!", "/", "|", "]"];

	var testingCanvas = createCanvas(canvasSize);

	function getLowest(characters) {
		resetCanvas(testingCanvas);

		characters.forEach(function (character) {
			drawCharacter(testingCanvas, character, fontFamily, fontSize);
		});

		return findEdge.lowest(testingCanvas);
	}

	function getHighest(characters) {
		resetCanvas(testingCanvas);

		characters.forEach(function (character) {
			drawCharacter(testingCanvas, character, fontFamily, fontSize);
		});

		return findEdge.highest(testingCanvas);
	}

	var lowestDescenderPoint = getLowest(descenderCharacters) - testingCanvas.height / 2;
	var highestAscenderPoint = testingCanvas.height / 2 - getHighest(ascenderCharacters);
	var highestCapHeightPoint = testingCanvas.height / 2 - getHighest(capHeightCharacters);
	var highestMedianPoint = testingCanvas.height / 2 - getHighest(medianCharacters);
	var highestTopBoundingPoint = testingCanvas.height / 2 - getHighest(topBoundingCharacters);

	return {
		descender: lowestDescenderPoint / fontSize,
		ascender: -highestAscenderPoint / fontSize,
		capHeight: -highestCapHeightPoint / fontSize,
		median: -highestMedianPoint / fontSize,
		topBounding: -highestTopBoundingPoint / fontSize
	};
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(17);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var promiseTry = __webpack_require__(18);

function evaluateValue(value) {
	if (typeof value === "function") {
		return value();
	} else {
		return value;
	}
}

function maybeEvaluateValue(value, evaluate) {
	if (evaluate === true) {
		return evaluateValue(value);
	} else {
		return value;
	}
}

function defaultValue(value, fallbackValue) {
	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	value = maybeEvaluateValue(value, options.evaluate);

	if (value != null) {
		return value;
	} else {
		return maybeEvaluateValue(fallbackValue, options.evaluate);
	}
}

defaultValue.async = function defaultAsyncValue(value, fallbackValue) {
	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	return promiseTry(function () {
		return maybeEvaluateValue(value, options.evaluate);
	}).then(function (resultValue) {
		if (resultValue != null) {
			return resultValue;
		} else {
			return maybeEvaluateValue(fallbackValue, options.evaluate);
		}
	});
};

module.exports = defaultValue;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(19);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function promiseTry(func) {
	return new Promise(function (resolve, reject) {
		resolve(func());
	});
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getImageData = __webpack_require__(21);
var scanRow = __webpack_require__(22);

function findEdge(canvas, firstRow, lastRow, step) {
	var imageData = getImageData(canvas).data;
	var valuesPerRow = canvas.width * 4;
	var hitEnd = false;

	if (step === 0) {
		throw new Error("Step cannot be 0");
	}

	var row = firstRow;

	while (!hitEnd) {
		var highestValue = scanRow(imageData, row * valuesPerRow, canvas.width);

		/* 240 is a somewhat randomly picked value to deal with anti-aliasing. */
		if (highestValue > 240) {
			return row;
		}

		row += step;

		if (step > 0) {
			hitEnd = row > lastRow;
		} else if (step < 0) {
			hitEnd = row < lastRow;
		}
	}
}

module.exports = {
	lowest: function findLowestEdge(canvas) {
		return findEdge(canvas, canvas.height - 1, 0, -1);
	},
	highest: function findHighestEdge(canvas) {
		return findEdge(canvas, 0, canvas.height - 1, 1);
	}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getImageData(canvas) {
	var context = canvas.getContext("2d");
	return context.getImageData(0, 0, canvas.width, canvas.height);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function scanRow(imageData, offset, length) {
	var highestValue = 0;

	for (var column = 0; column < length; column += 1) {
		var pixelValue = imageData[offset + column * 4];

		if (pixelValue > highestValue) {
			highestValue = pixelValue;
		}
	}

	return highestValue;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function drawCharacter(canvas, character, fontFamily, fontSize) {
	var context = canvas.getContext("2d");
	context.textAlign = "center";
	context.textBaseline = "alphabetic";
	context.font = fontSize + "px '" + fontFamily + "'";
	context.fillStyle = "white";
	context.fillText(character, canvas.width / 2, canvas.height / 2);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function resetCanvas(canvas) {
	var context = canvas.getContext("2d");
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function createCanvas(size) {
	var canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	return canvas;
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export totemDiv */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fakeDom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__populateLetters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DOMStyling__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_perfect_scrollbar__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__video1__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__params__ = __webpack_require__(6);


/* ADVICE FOR SLIDESHOWS :
-> add class instead of CSS property when it's possible
-> add class to the direct element, not the motherDiv, when possible
-> for the fake DOM, use absolute position to have the minimum calculation as possible
-> use transitionend at the end of the transitions
-> create fragment instead of crete element: https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
-> good advices hear : https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108
*/

// import { wholeContentDiv, slideshowDiv, slideshowContentDiv, slideshowBackupDiv, numberOfSlides, CURRENT_INDEX } from '../animationsController';



__webpack_require__(2).polyfill();   //https://github.com/iamdustan/smoothscroll



/*------------------------------------*\
    VARIABLES & DATA
\*------------------------------------*/

//DATA


//DOM
const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowContentDiv = document.querySelector(".slideshow__content");
const slideshowBackupDiv = document.querySelector(".slideshow__backup--container");
const totemDivs = Object.keys(__WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */]).map(name => __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][name].totemDiv());
console.log(totemDivs);
const movingCursorDiv = document.querySelector('.slideshow__cursor--moving');
const hotelOptions = document.querySelector('.slideshow__description--options');
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const hotelName = slideshowDiv.querySelector('.slideshow__description');
const dividerInDescription = slideshowDiv.querySelector('.slideshow__description--divider');
const video1 = document.querySelector('.video__video1');

//CSS
const totemDivHeight = 90;
const cursorVerticalSpacing = 20;
const transitionDuration = 1600;  //A bit higher than the one in CSS for a proper totem transition

    /*  CURSOR  */
movingCursorDiv.style.boxShadow = `0px ${(cursorVerticalSpacing * 0)}px, 0px ${(cursorVerticalSpacing * 1)}px, 0px ${(cursorVerticalSpacing * 2)}px, 0px ${(cursorVerticalSpacing * 3)}px, 0px ${(cursorVerticalSpacing * 4)}px, 0px ${(cursorVerticalSpacing * 5)}px, 0px ${(cursorVerticalSpacing * 6)}px`;


//SLIDESHOW PARAMS
const numberOfSlides = Object.keys(__WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */]).length;
let biggestWordLength = 0;
let biggestWordParam = 0;
Object.keys(__WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */]).map(param => {
  if (__WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][param].frenchName.length > biggestWordLength) {
    biggestWordLength = __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][param].frenchName.length; 
    biggestWordParam = __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][param].position;
  }; 
});

/*------------------------------------*/  
let CURRENT_INDEX = 0 ;
/*------------------------------------*/
hotelOptions.style.width = `750px`


/*------------------------------------*\
    INIT
\*------------------------------------*/

//function to use also on transition and init
function colorsChange(index) {
  const theme = Object.keys(__WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */])[index];

  /*  TEXTS COLOR  */
  hotelName.style.color = __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][theme].textColor;
  dividerInDescription.style.borderColor = __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][theme].textColor;

  /* BACKGROUND */
  slideshowDiv.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][theme].backgroundColor;
  movingCursorDiv.style.color = __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][theme].textColor;
  movingCursorDiv.style.borderColor = __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */][theme].textColor;
}

//function to use also on transition and init
function cursorMove(index) {
  movingCursorDiv.style.transform = `translateY(${-cursorVerticalSpacing * index}px)`;
  window.setTimeout(() => {
  }, transitionDuration);
}

const init = (index) => {

  const adjustedIndex = /*index - 1*/ index //if we use animationsController, we use index - 1;
  const theme = Object.keys(__WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */])[adjustedIndex];
  console.log(theme)

  /*    SCROLLBAR   */
  const ps = new __WEBPACK_IMPORTED_MODULE_3_perfect_scrollbar__["a" /* default */](wholeContentDiv, {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', /*'wheel',*/ 'touch'],

  });

  /* BACKGROUND AND TEXT COLORS */
  colorsChange(adjustedIndex);

  /*  CURSOR  */
  cursorMove(adjustedIndex);

  /*   TOTEM   */
  document.querySelector(`.totem_${theme}`).classList.add('showTotem');

  /*  OPTIONS  */
  Object(__WEBPACK_IMPORTED_MODULE_1__populateLetters__["a" /* populateHotelOptions */])(hotelOptions, adjustedIndex, __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */], __WEBPACK_IMPORTED_MODULE_2__DOMStyling__["a" /* alSize */], true);

  /* SLOGAN   */
  hotelSlogan.firstChild.textContent = 'un style de vie à paris';
};
init(CURRENT_INDEX);


/*------------------------------------*\
    SLIDESHOW
\*------------------------------------*/


function startTransition(e) {
  //Prevent pressing any other key
  const keyPressedIsNoGood = (e.type === 'keyup') && (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32);
  if (keyPressedIsNoGood) { 
    return; 
  };

  //EVENT CASES
  const eventCases = {
    wheeledUp: (e.type === 'mousewheel' && e.deltaY < 0),
    wheeledDown: (e.type === 'mousewheel' && e.deltaY > 0),
    keyDown: (e.type === 'keyup' && ((e.keyCode === 40) || (e.keyCode === 32))),
    keyUp: (e.type === 'keyup' && (e.keyCode === 38)),  //38 = arrow up
    clickedMouseForDown: (e.type === 'click' && e.srcElement.className === 'mouse'),
  };

  const eventGoUp = (eventCases.keyUp || eventCases.wheeledUp);
  const eventGoDown = (eventCases.keyDown || eventCases.wheeledDown || eventCases.clickedMouseForDown);

  //If portrait or mobile
  //Prevent transit while already transiting
  if (slideshowDiv.classList.contains('inTransition')) {
    return;
  } else if (eventGoUp && CURRENT_INDEX === 0) {
    return;
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides - 1)) {
        // wholeContentDiv.overflow = '';
    scrollToFirstVideo();
    return;
  } else {
    [slideshowDiv, movingCursorDiv, dividerInDescription, hotelName].forEach(item => {
      item.classList.add('inTransition');
    });
  }

  const currentTotemDiv = totemDivs[CURRENT_INDEX];
  console.log(currentTotemDiv)
  let nextTotemDiv;
  if (!wholeContentDiv.classList.contains('slideshow__landscape')) {
    return
  }
  console.log(CURRENT_INDEX)
  const previousIndex = CURRENT_INDEX;
  let direction;
  if (eventGoUp && CURRENT_INDEX > 0 && CURRENT_INDEX < numberOfSlides) { 
    CURRENT_INDEX--;
    direction = 'down';
    nextTotemDiv = totemDivs[CURRENT_INDEX];
    console.log(nextTotemDiv)
  } else if (eventGoDown && CURRENT_INDEX < numberOfSlides)  {
    CURRENT_INDEX === numberOfSlides - 1 ? CURRENT_INDEX = 0 : CURRENT_INDEX++;
    direction = 'up';
    nextTotemDiv = totemDivs[CURRENT_INDEX];
    console.log(nextTotemDiv)
  }
  //Cursor move
  // cursorMove(CURRENT_INDEX);
  
  //Totem move
  totemMove(CURRENT_INDEX, direction, currentTotemDiv, nextTotemDiv);

  //Hotel Options change
  // hotelOptionsTransit(e, CURRENT_INDEX, hotelOptions, direction);

  //Background color change
  // colorsChange(CURRENT_INDEX);

  //Make the slideshow ready for new transition
  window.setTimeout(() => {
    [slideshowDiv, movingCursorDiv, dividerInDescription, hotelName].forEach(item => {
      item.classList.remove('inTransition');
    });
  }, transitionDuration + 200);
}

/*----- TOTEM FUNCTIONS-----*/
function totemMove(index, direction, div1, div2) {
  const up = direction === 'up' ? true : false;
  const timeOffset = 100;

  const nextTheme = Object.keys(__WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */])[index];
  //Building the new totem
  div2 = document.querySelector(`.totem_${nextTheme}`);
  div2.classList.add(up ? 'fakeTotemUp' : 'fakeTotemDown');
  div2.classList.add('showTotem');
  div1.classList.add(up ? 'totemOnTransitionUp' : 'totemOnTransitionDown');

  window.setTimeout(() => {
    console.log('c\'est là que ça se passe')
    div1.classList.remove('showTotem');
  }, transitionDuration * 3 / 4);

  window.setTimeout(() => {
    console.log('ou bien c\'est là que ça se passe')
    div1.addEventListener('transitionend', removeTotemClasses(up, index, div1, div2), false);
    div2.addEventListener('transitionend', removeTotemClasses(up, index, div1, div2), false);

    }, transitionDuration + timeOffset);
}

let finishLine = 0;  //special var for totem transitionend only
function removeTotemClasses(up, index, div1, div2) {
  console.log('ou là ?')

  finishLine++;

  if (finishLine === 2) {
    console.log('ça marche toujours ?');
    //IF NOT REMOVE THE EVENT LISTENER TRANSITIONEND, IT'S TRIGGERED EVERYTIME ONE MORE TIME
    finishLine = 0;
    div1.classList.remove(up ? 'totemOnTransitionUp' : 'totemOnTransitionDown');
    div2.classList.remove(up ? 'fakeTotemUp' : 'fakeTotemDown');
    // div1.removeEventListener('transitionend', removeTotemClasses(up, index, div1, div2), false);
    // div2.removeEventListener('transitionend', removeTotemClasses(up, index, div1, div2), false);
  } else {
    return;
  }
}


/*------ HOTEL OPTIONS FUNCTIONS ------*/
function hotelOptionsTransit(e, index, anyHotelOptions, direction) {
  /*    TRANSITION PARAMTERS    */
  let i = 0;
  const offset = direction === 'up' ? 10 : -10;
  const letterTimeout = 20;
  //target: timeout of the last letter + transition of the last letter = 1/2 transition
  const letterTransitionDuration = transitionDuration * (1/2) - letterTimeout * biggestWordLength;
  
  /*    FAKE DOM     */
  const newHotelOptions = Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["a" /* buildFakeHotelOptionLetters */])(anyHotelOptions, __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */], index, offset, __WEBPACK_IMPORTED_MODULE_2__DOMStyling__["a" /* alSize */]);
  wholeContentDiv.append(newHotelOptions);

  //STEP 1: move up the existing letter and transit opacity from 1 to 0 during 1/2 transition
  [...anyHotelOptions.children].forEach(letter => {
    i++;
    window.setTimeout(() => {
    letterDisappear(letter, letterTransitionDuration, offset);
    }, letterTimeout * i);
  });

  //STEP 2: move up the new letter and transit opacity from 0 to 1 during 1/2 transition
  window.setTimeout(() => {
    newHotelOptions.style.opacity = 1;
    [...newHotelOptions.children].forEach(letter => {
      i++;
      window.setTimeout(() => {
      letterAppear(letter, letterTransitionDuration, offset);
      }, letterTimeout * i);
    });
  }, transitionDuration * (1/2))

  window.setTimeout(() => {
    Object(__WEBPACK_IMPORTED_MODULE_1__populateLetters__["a" /* populateHotelOptions */])(anyHotelOptions, index, __WEBPACK_IMPORTED_MODULE_5__params__["a" /* slideshowParams */], __WEBPACK_IMPORTED_MODULE_2__DOMStyling__["a" /* alSize */]);
    wholeContentDiv.removeChild(newHotelOptions);
  }, transitionDuration)
}

function letterDisappear(letter, transition, offset) {

  letter.style.transition = `all ${transition * 2 / 3}ms linear`;
  //STEP 1: move it up
  letter.style.transform = `translateY(${-offset}px)`;
  //STEP 2: fade out
  window.setTimeout(() => {
    letter.style.opacity =  0;
  }, transition / 3);

  window.setTimeout(() => {
    letter.style.transition = ``;
  }, transition);
}

function letterAppear(letter, transition, offset) {

  letter.style.transition = `transform ${transition * 2 / 3}ms cubic-bezier(0.64, 0.46, 0.4, 2.19), opacity ${transition * 2 / 3}ms linear`;
  //STEP 1: move it up
  letter.style.transform = `translateY(${-offset}px)`;
  //STEP 2: fade out
  letter.style.opacity =  1;

  window.setTimeout(() => {
    // letter.style.transition = ``;
  }, transition);
}


function scrollToFirstVideo() {
  CURRENT_INDEX++;
  console.log('yo');

  wholeContent.classList.add('slideshow__hide');
  Object(__WEBPACK_IMPORTED_MODULE_4__video1__["b" /* playerPlay */])(__WEBPACK_IMPORTED_MODULE_4__video1__["a" /* player1 */]);
}

/*------------------------------------*\
    EVENT LISTENERS
\*------------------------------------*/

window.addEventListener('keyup', function(e) {
    //Prevent scrolling when pressing space
  e.preventDefault();
  startTransition(e);
})

wholeContentDiv.addEventListener('mousewheel', function(e) {
    e.preventDefault();

  startTransition(e);
})

document.querySelector('.scroll-btn').addEventListener('click', function(e) {
    e.preventDefault();

  startTransition(e);
})




/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__params__ = __webpack_require__(6);


//DATA


const slideshowDiv = document.querySelector(".slideshow__backup--content");

  Object.keys(__WEBPACK_IMPORTED_MODULE_0__params__["a" /* slideshowParams */]).forEach(option => {
    const newOptionDiv = document.createElement('div');
    newOptionDiv.style.backgroundImage = `url('${__WEBPACK_IMPORTED_MODULE_0__params__["a" /* slideshowParams */][option].backupPictureUrl()}')`;
    newOptionDiv.style.backgroundRepeat = 'no-repeat';
    newOptionDiv.style.backgroundSize = 'auto 100%';
    newOptionDiv.style.backgroundPositionY = 'bottom';
    newOptionDiv.style.width = '100%';
    newOptionDiv.style.height = `${slideshowDiv.getBoundingClientRect().width / 1.75}px`;
    slideshowDiv.appendChild(newOptionDiv);
  });

function statisSlidewhow () {
  [...slideshowDiv.children].forEach(div => {
    div.style.width = '100%';
    div.style.height = `${slideshowDiv.getBoundingClientRect().width / 1.75}px`;
  });
};

statisSlidewhow();
window.addEventListener('resize', statisSlidewhow);


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return player1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return playerPlay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yt_player__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yt_player___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yt_player__);
   //https://github.com/feross/yt-player

let player1start = 0;
let player1autoplay = true;
let player1loaded = false;
let player1firstStart = false;
let player1;
let videoRatio = 0.5625;  //width * 0.5625 = height 

const player1options = {
    height: '100%',
    width: '100%',
    autoplay: player1autoplay,
    captions: false,
    controls: true,
    keyboard: false,
    fullscreen: true,
    annotations: false,
    modestBranding: true,
    related: false,
    info: false,
    timeupdateFrequency: 1000,  // default: 1000
}


player1 = new __WEBPACK_IMPORTED_MODULE_0_yt_player___default.a('#video__video1', player1options);
player1.load('M6kQi1_Btqg');  

// player1.style.left = {}

function playerPlay(player) {
  if (player1firstStart && player1.getCurrentTime() > 0) {
    player1.seek(0);
    player1firstStart = false;
    player.play();
  } else if (player1firstStart && player1.getCurrentTime() === 0) {
    player1firstStart = false;
    player.play();
  } else {
    player.play();
  }
};

function playerResetOnFirstLoad(seconds, player) {
  if (player1loaded === false) {
    player1loaded = true;
    player1.pause();
    player1.seek(0);
  } else {
    return
  }
}

if (player1) {
  player1.on('timeupdate', (seconds) => {
    playerResetOnFirstLoad(seconds, player1);
  })

  player1.on('ended', () => {
    player1.seek(0);
  })
}

/*------------------------------------*\
    RESIZE VIDEO - ALWAYS FULL WINDOW
\*------------------------------------*/
const video1iFrameContainer = document.querySelector('.video__subcontainer');
const wholeContentDiv = document.querySelector('#wholeContent');





// function resizeVideo(e, div) {
//   let windowHeight = window.innerHeight;
//   let windowWidth = window.innerWidth;
//   console.log(`windowHeight: ${windowHeight}`);
//   console.log(`windowWidth: ${windowWidth}`);
//   console.log(`windowWidth * videoRatio: ${windowWidth * videoRatio}`);
//   const minHeightMaxWidth = (windowHeight < windowWidth * videoRatio);
//   const minWidthMaxHeight = (windowHeight > windowWidth * videoRatio);

//   if (windowHeight < windowWidth * videoRatio) {
//     console.log('cas extrême: mini-hauteur, maxi-largeur');
//     const newHeight = 128;
//     div.style.width = `${newHeight / videoRatio}vh`;
//     div.style.height = `${newHeight}vh`;
//   } else if (windowHeight > windowWidth * videoRatio) {
//     console.log('cas extrême: mini-largeur, maxi-hauteur');
//     const newHeight = 128;
//     div.style.width = `${newHeight / videoRatio}vh`;
//     div.style.height = `${newHeight}vh`;
//   } else if ((windowHeight < windowWidth * (videoRatio + 0.01)) && (windowHeight > windowWidth * (videoRatio - 0.01)))  {
//     console.log('cas extrême: perfet ratio');
//     div.style.height = `128%`;
//     div.style.width = `128%`;
//   }
// };

// // window.addEventListener('load', function(e) { resizeVideo(e, video1iFrameContainer) });
// // window.addEventListener('load', function(e) { resizeVideo(e, video1Div) });

// player.play()
// player.pause()
// player.stop()
// player.seek(seconds)
// player.setVolume(volume) ////between 0 and 100
// player.setPlaybackRate(rate)
// player.getVolume() //between 0 and 100
// player.getPlaybackRate()
// player.getDuration() //seconds
// player.getProgress() //Percentage
// player.getState() // Possible values are: 'unstarted', 'ended', 'playing', 'paused', 'buffering', or 'cued'.
// player.getCurrentTime()
// player.destroy()
// player.destroyed (boolean)
// player.videoId (string)
// player.on('error', (err) => {})
// player.on('unplayable', (videoId) => {})
// player.on('timeupdate', (seconds) => {})
// player.on('unstarted', () => {})
// player.on('ended', () => {})
// player.on('playing', () => {})
// player.on('paused', () => {})
// player.on('buffering', () => {})
// player.on('cued', () => {})
// player.on('playbackQualityChange', (quality) => {})
// player.on('playbackRateChange', (playbackRate) => {})





























/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map