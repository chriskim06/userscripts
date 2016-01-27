// ==UserScript==
// @name        Greasy Fork Links
// @namespace   chriskim06
// @description Add links to navigate to the update tab and links to install scripts
// @include     https://greasyfork.org/en/users/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.2.8
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
  if ($('#user-script-list').length) {
    var count = $('#user-script-list > li').length;
    $('#user-script-list > li').each(function() {
      var item = $(this);
      var link = item.find('a:first');
      var href = link.attr('href');
      var file = link.html().replace(/ /g, '%20') + '.user.js';
      var script = item.find('h2 > :first-child');
      script.attr('href', script.attr('href') + '/code');
      script.after('<a href="/en/scripts/' + item.attr('data-script-id') + '/versions/new">Edit</a>');
      script.after('<span class="name-description-separator"> - </span>');
      script.after('<a href="' + href + '/delete">Delete</a>');
      script.after('<span class="name-description-separator">/</span>');
      script.after('<a href="' + href + '/code/' + file + '">Install</a>');
      script.after('<span class="name-description-separator"> - </span>');
    });
    $('#user-script-list').prev().children(':first-child').append(' (' + count + ')');
  }
});
