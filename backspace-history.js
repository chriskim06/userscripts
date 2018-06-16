// ==UserScript==
// @name        Backspace History
// @namespace   https://github.com/chriskim06/userscripts
// @description Makes the backspace key go back in history instead of modifying the search string
// @match       https://www.google.com/*
// @version     1.8
// ==/UserScript==

document.querySelector('html').addEventListener('keydown', function(e) {
  if (!e.shiftKey && e.which === 8 && e.target.nodeName !== 'INPUT') {
    e.preventDefault();
    e.stopImmediatePropagation();
    window.history.back();
    return false;
  }
});
