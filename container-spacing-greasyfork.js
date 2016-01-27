// ==UserScript==
// @name        Greasy Fork Container Spacing
// @namespace   chriskim06
// @description Adds a small margin to the bottom of the code container and author description in Greasy Fork
// @include     https://greasyfork.org/en/scripts/*/code
// @include     https://greasyfork.org/en/scripts/*
// @include     https://greasyfork.org/en/users/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.2.2
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
  if ($('#code-container').length) {
    $('#code-container').css('margin-bottom', '40px');
  }
  
  if ($('#additional-info').length) {
    $('#additional-info').css('margin-bottom', '40px');
  }
  
  if ($('#user-script-list').length) {
    $('#user-script-list').css('margin-bottom', '40px');
  }
});
