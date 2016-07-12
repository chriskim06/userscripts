// ==UserScript==
// @name        Floating Menu Bar (GitHub)
// @namespace   chriskim06
// @description Makes the menu bar in GitHub stay at the top of the page when scrolling
// @include     https://github.com/*
// @version     1.0.4
// @grant       none
// @locale      en
// ==/UserScript==

(function() {
  var content = document.querySelector('div.header.header-logged-in.true');
  if (content !== null) {
    content.style.position = 'fixed';
    content.style.zIndex = '10000';
    content.style.width = '100%';
    content = document.querySelector('#js-flash-container');
    if (container !== null) {
      container.style.position = 'relative';
      container.style.top = '50px';
    }
    content = document.querySelector('div[role="main"]');
    if (content !== null) {
      content[0].style.position = 'relative';
      content[0].style.top = '50px';
    }
    content = document.querySelector('div.container.site-footer-container');
    if (content !== null) {
      content.style.position = 'relative';
      content.style.top = '50px';
    }
  }
})();
