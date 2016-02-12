// ==UserScript==
// @name        Widen Code Container and Hide Whitespace (GitHub)
// @namespace   chriskim06
// @description Adds buttons to allow you to widen the container when viewing files and hide whitespace when viewing pull request diffs
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.3.4
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
            '<svg height="16" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7S10.86 1 7 1z m0 1.3c1.3 0 2.5 0.44 3.47 1.17L2.47 11.47c-0.73-0.97-1.17-2.17-1.17-3.47 0-3.14 2.56-5.7 5.7-5.7z m0 11.41c-1.3 0-2.5-0.44-3.47-1.17l8-8c0.73 0.97 1.17 2.17 1.17 3.47 0 3.14-2.56 5.7-5.7 5.7z" /></svg>' +
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
             '<svg height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 4.7L8.5 0 1.5 4.7c-0.3 0.19-0.5 0.45-0.5 0.8v10.5l7.5-4 7.5 4V5.5c0-0.34-0.2-0.61-0.5-0.8z m-0.5 9.8L9 11.25v-1.25h-1v1.25L2 14.5V5.5L8 1.5v4.5h1V1.5l6 4v9zM6 7h5V5l3 3-3 3V9H6v2L3 8l3-3v2z" /></svg>' +
          '</a>' +
        '</li>'
    );
    
    // Toggle code container width on click
    $('#code-widen-button').click(function() {
      if (($('#files').length && $('#files').is(':visible')) || $('.repository-content').find('.file').length) {
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
