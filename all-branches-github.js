// ==UserScript==
// @name        Default to All Branches Page (GitHub)
// @namespace   chriskim06
// @description Changes the link so that clicking branches takes you to the all branches page
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.4.7
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  function allBranches() {
    if ($('.repository-content').length) {
      var link = $('.repository-content').find('ul.numbers-summary').find('li:nth-child(2) > a');
      if (link.length) {
        var href = link.attr('href');
        if (href.length && !href.endsWith('/all')) {
          link.attr('href', href + '/all');
        }
      }
    }
  }
  
  allBranches();
  
  window.$(document).on('pjax:end', function() {
    allBranches();
  });

});
