// ==UserScript==
// @name        Floating Menu Bar (GitHub)
// @namespace   chriskim06
// @description Makes the menu bar in GitHub stay at the top of the page when scrolling
// @include     https://github.com/*
// @version     1.0.1
// @grant       none
// @locale      en
// ==/UserScript==

(function() {
  var menu = document.getElementsByClassName('header header-logged-in true');
  if (menu.length) {
    menu[0].style.position = 'fixed';
    menu[0].style.zIndex = '10000';
    menu[0].style.width = '100%';
    var content = document.getElementsByClassName('main-content');
    if (content.length) {
      content[0].style.position = 'relative';
      content[0].style.top = '50px';
    }
  }
})();
