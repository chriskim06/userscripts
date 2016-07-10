// ==UserScript==
// @name        Backspace History
// @namespace   chriskim06
// @description Makes the backspace key go back in history instead of modifying the search string
// @include     https://www.google.com/*
// @version     1.6
// @grant       none
// @locale      en
// ==/UserScript==

document.querySelector('html').addEventListener('keydown', function(e) {
  if (!e.shiftKey && e.which === 8 && e.target.nodeName !== 'INPUT') {
    window.history.back();
    return false;
  }
});
