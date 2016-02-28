// ==UserScript==
// @name        Find File Shortcut (GitHub)
// @namespace   chriskim06
// @description Adds a keyboard shortcut to use GitHub's find file feature
// @include     https://github.com/*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.2
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  $(document).on('keydown', function(e) {
    if (e.which === 80 && e.shiftKey && e.target.nodeName !== 'INPUT') {
      var url = window.location.href.match(/(https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+)(?:\/tree\/)?([A-Za-z0-9_-]+)?/);
      if (url !== null) {
        var branch = (y[2]) ? y[2] : 'master';
        window.location.href = url[1] + '/find/' + branch;
      }
    }
  });

});
