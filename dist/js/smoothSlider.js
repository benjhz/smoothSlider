(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var util = require('./util');

function SmoothSlider(option) {
  var smoothContainer = document.getElementsByClassName('smooth-slider')[0];
  var sliders = smoothContainer.getElementsByClassName('slider-item');
  var sliderNav = smoothContainer.getElementsByClassName('slider-nav')[0];
  var navItems = [];
  if (!option) {
    option = {};
  }
  var opt = {
    autoPlay: option.autoPlay === false ? false : true,
    interval: option.interval || 4000
  };

  if (sliderNav) {
    navItems = sliderNav.getElementsByClassName('nav-item');
  }
  var sliderCount = sliders.length;
  var activeIndex = 0;

  var getPrevSlider = function getPrevSlider(activeIndex) {
    if (activeIndex === 0) {
      return sliders[sliderCount - 1];
    }
    return sliders[activeIndex - 1];
  };

  var getNextSlider = function getNextSlider(activeIndex) {
    if (activeIndex === sliderCount - 1) {
      return sliders[0];
    }
    return sliders[activeIndex + 1];
  };

  var activateNavItem = function activateNavItem(index) {
    Array.prototype.forEach.call(navItems, function (item) {
      util.removeClass(item, 'active');
    });
    util.addClass(navItems[index], 'active');
  };

  var activateSlider = function activateSlider(index) {
    var prevSlider = getPrevSlider(index);
    var nextSlider = getNextSlider(index);
    var activateSlider = sliders[index];

    Array.prototype.forEach.call(sliders, function (slider) {
      util.removeClass(slider, 'prev-slider');
      util.removeClass(slider, 'active-slider');
      util.removeClass(slider, 'next-slider');
    });

    util.addClass(prevSlider, 'prev-slider');
    util.addClass(activateSlider, 'active-slider');
    util.addClass(nextSlider, 'next-slider');

    if (sliderNav) {
      activateNavItem(index);
    }

    activeIndex = index;
  };

  var activateNextSlider = function activateNextSlider() {
    var newIndex;
    if (activeIndex === sliderCount - 1) {
      newIndex = 0;
    } else {
      newIndex = activeIndex + 1;
    }
    activateSlider(newIndex);
  };

  var bindNavDirClickEvent = function bindNavDirClickEvent() {
    var navLeft = smoothContainer.getElementsByClassName('nav-left')[0];
    var navRight = smoothContainer.getElementsByClassName('nav-right')[0];

    if (navLeft) {
      navLeft.onclick = function () {
        var newIndex;
        if (activeIndex === 0) {
          newIndex = sliderCount - 1;
        } else {
          newIndex = activeIndex - 1;
        }
        activateSlider(newIndex);
      };
    }

    if (navRight) {
      navRight.onclick = function () {
        activateNextSlider();
      };
    }
  };

  var bindNavItemClickEvent = function bindNavItemClickEvent() {
    sliderNav.onclick = function (e) {
      var evt = e || window.event;
      var target = evt.target || evt.srcElement;
      Array.prototype.forEach.call(navItems, function (item, index) {
        if (target === item) {
          activateSlider(index);
        }
      });
    };
  };

  var bindEvents = function bindEvents() {
    bindNavDirClickEvent();
    if (sliderNav) {
      bindNavItemClickEvent();
    }
  };

  var startAutoPlay = function startAutoPlay() {
    setTimeout(function () {
      activateNextSlider();
      startAutoPlay();
    }, opt.interval);
  };

  var init = function init() {
    activateSlider(activeIndex);
    bindEvents();
    if (opt.autoPlay) {
      startAutoPlay();
    }
  };

  init();
}

window.SmoothSlider = SmoothSlider;

},{"./util":2}],2:[function(require,module,exports){
'use strict';

var util = {
  addClass: function addClass(el, name) {
    if (!el) {
      return;
    }
    var nameList = name.split(' ');
    var i = nameList.length;
    while (i--) {
      el.className = new RegExp('(\s*)' + nameList[i] + '(\s*)', 'ig').test(el.className) && el.className || (el.className + ' ' + nameList[i]).replace(/^\s|\s$/g, '');
    }
  },
  removeClass: function removeClass(el, name) {
    if (!el) {
      return;
    }
    var nameList = name.split(' ');
    var i = nameList.length;
    while (i--) {
      el.className = el.className.replace(new RegExp('(\s*)' + nameList[i] + '(\s*)', 'ig'), '').replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
    }
  }
};

module.exports = util;

},{}]},{},[1])