// ==UserScript==
// @name        Greasy Fork Default Behavior
// @namespace   chriskim06
// @description Add/edit scripts with syntax highlighting enabled by default and hide share stuff
// @include     /https://greasyfork.org/en/scripts/\w+(-|/).*/
// @include     https://greasyfork.org/en/script_versions/new
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.2.3
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
  if ($('#script_version_code').length) {
    $('#script_version_code').css('height', '560px');
  }
  var checkbox = $('#enable-source-editor-code');
  
  if (checkbox.length && !checkbox.is(':checked')) {
    checkbox.click();
  }
  
  if ($('div#share').length) {
    $('div#share').css('display', 'none');
  }
});
