// ==UserScript==
// @name        Widen Code Container and Hide Whitespace (GitHub)
// @namespace   chriskim06
// @description Adds buttons to allow you to widen the container when viewing files and hide whitespace when viewing pull request diffs
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.3.2
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  if ($('#user-links').length) {

    // Add buttons in the header navbar for widening and hiding whitespace
    $('#user-links').prepend(
        '<li class="header-nav-item">' +
          '<a href="javascript:void(0)"' +
             'id="hide-whitespace-button"' +
             'class="header-nav-link tooltipped tooltipped-s"' +
             'aria-label="Hide whitespace"' +
             'onclick="return false;">' +
            '<span class="octicon octicon-circle-slash"></span>' +
          '</a>' +
        '</li>'
    );
    $('#user-links').prepend(
        '<li class="header-nav-item">' +
          '<a href="javascript:void(0)"' +
             'id="code-widen-button"' +
             'class="header-nav-link tooltipped tooltipped-s"' +
             'aria-label="Widen code container"' +
             'onclick="return false;">' +
            '<span class="octicon octicon-mirror"></span>' +
          '</a>' +
        '</li>'
    );
    
    // Toggle code container width on click
    $('#code-widen-button').click(function() {
      if ($('#files').length || $('.repository-content').find('.file').length) {
        // If diff is in split mode don't try to widen the container
        if ($('#toc').find('.btn-group > a:last').hasClass('selected')) {
          $(this).blur();
          return;
        }
        var container = $('.container.new-discussion-timeline.experiment-repo-nav');
        var expanded = $(window).width() * 0.95;
        if (container.width() < expanded) {
          container.css('width', expanded + 'px');
        } else {
          container.css('width', '980px');
        }
      }
      $(this).blur();
    });
    
    // Toggle page with ?w=1 appended to the url to show/hide whitespace
    $('#hide-whitespace-button').click(function() {
      if ($('#files').length && $('#files').is(':visible')) {
        var url = window.location.href;
        if (url.endsWith('?w=1') || url.endsWith('&w=1')) {
          window.location.href = url.slice(0, -4);
        } else if (url.includes('?')) {
          window.location.href = url + '&w=1';
        } else {
          window.location.href = url + '?w=1';
        }
      }
      $(this).blur();
    });
    
  }
  
});
