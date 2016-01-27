// ==UserScript==
// @name        Backspace History
// @namespace   chriskim06
// @description Makes the backspace key go back in history instead of modifying the search string
// @include     https://www.google.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.4
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
  $(document).on('keydown', function(e) {
    if (!e.shiftKey && e.which === 8 && e.target.nodeName !== 'INPUT') {
      window.history.back();
      return false;
    }
  })
});
