// ==UserScript==
// @name        Find File Shortcut (GitHub)
// @namespace   chriskim06
// @description Adds a keyboard shortcut to use GitHub's find file feature
// @include     https://github.com/*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.0
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  $(document).on('keydown', function(e) {
    if (e.which === 80 && e.shiftKey && e.target.nodeName !== 'INPUT') {
      var url = window.location.href.match(/https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+/);
      var branch = $('div.select-menu.js-menu-container.js-select-menu.left').find('span.js-select-button.css-truncate-target');
      if (branch.length) {
        window.location.href = url + '/find/' + branch.html();
      }
    }
  });

});
