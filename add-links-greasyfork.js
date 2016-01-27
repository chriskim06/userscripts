// ==UserScript==
// @name        Greasy Fork Links
// @namespace   chriskim06
// @description Add links to navigate to the update tab and links to install scripts
// @include     https://greasyfork.org/en/users/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.2.9
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  if ($('#user-script-list').length) {
    var scripts = $('#user-script-list');
    var count = scripts.children('li').length;
    scripts.children('li').each(function() {
      var item = $(this);
      var link = item.find('a:first');
      var href = link.attr('href');
      var file = link.html().replace(/ /g, '%20') + '.user.js';
      link.attr('href', href + '/code');
      link.after('<a href="/en/scripts/' + item.attr('data-script-id') + '/versions/new">Edit</a>');
      link.after('<span class="name-description-separator"> - </span>');
      link.after('<a href="' + href + '/delete">Delete</a>');
      link.after('<span class="name-description-separator">/</span>');
      link.after('<a href="' + href + '/code/' + file + '">Install</a>');
      link.after('<span class="name-description-separator"> - </span>');
    });
    scripts.prev().children().first().append(' (' + count + ')');
  }

});
