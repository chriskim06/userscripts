// ==UserScript==
// @name        Widen Code Container and Hide Whitespace (GitHub)
// @namespace   chriskim06
// @description Adds buttons to allow you to widen the container when viewing files and hide whitespace when viewing pull request diffs
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.4.3
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  function beginElement(id, label) {
    return '<li class="header-nav-item">' +
      '<a href="javascript:void(0)"' +
        'id="' + id + '"' +
        'class="header-nav-link tooltipped tooltipped-s js-menu-target"' +
        'aria-label="' + label + '"' +
        'style="margin: 5px 8px 0;"' +
        'onclick="return false;">';
  }

  var links = $('#user-links');
  if (links.length) {
    // Add buttons in the header navbar for widening and hiding whitespace
    links.prepend(
      beginElement('hide-whitespace-button', 'Hide whitespace') +
      '<svg height="16" width="14" style="fill:rgba(255,255,255,0.75);margin-top:6px;" xmlns="http://www.w3.org/2000/svg"><path d="M7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7S10.86 1 7 1z m0 1.3c1.3 0 2.5 0.44 3.47 1.17L2.47 11.47c-0.73-0.97-1.17-2.17-1.17-3.47 0-3.14 2.56-5.7 5.7-5.7z m0 11.41c-1.3 0-2.5-0.44-3.47-1.17l8-8c0.73 0.97 1.17 2.17 1.17 3.47 0 3.14-2.56 5.7-5.7 5.7z" /></svg>' +
      '</a></li>'
    ).prepend(
      beginElement('code-widen-button', 'Widen code container') +
      '<svg height="16" width="16" style="fill:rgba(255,255,255,0.75);margin-top:6px;" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 4.7L8.5 0 1.5 4.7c-0.3 0.19-0.5 0.45-0.5 0.8v10.5l7.5-4 7.5 4V5.5c0-0.34-0.2-0.61-0.5-0.8z m-0.5 9.8L9 11.25v-1.25h-1v1.25L2 14.5V5.5L8 1.5v4.5h1V1.5l6 4v9zM6 7h5V5l3 3-3 3V9H6v2L3 8l3-3v2z" /></svg>' +
      '</a></li>'
    );

    // Check if notifications button is empty
    var notifications = links.find('.js-header-notifications');
    if (notifications.length && notifications.text().trim() === '') {
      notifications.remove();
    }

    // Toggle code container width on click
    $('#code-widen-button').click(function() {
      var container = $('.container.new-discussion-timeline.experiment-repo-nav');
      var expanded = $(window).width() * 0.95;
      if ($('.repository-content').find('.file').is(':visible') || ($('#files').is(':visible') && $('meta[name="diff-view"]').attr('content') === 'unified')) {
        // Only widen if viewing a single file or changes in unified mode
        container.css('width', (container.width() < expanded) ? expanded : 980);
      } else if (container.width() >= expanded) {
        // Reduce the width on a page if needed
        container.css('width', 980);
      }
      $(this).blur();
    });

    // Toggle page with the w=1 query param in the url to show/hide whitespace
    $('#hide-whitespace-button').click(function() {
      if ($('#files').is(':visible')) {
        var url = window.location.href;
        if (url.includes('?w=1')) {
          // Check if there is more to the query and remove the whitespace query param
          window.location.href = url.replace((url.includes('&') ? /w=1\&/ : /\?w=1/), '');
        } else if (url.includes('&w=1')) {
          // Remove the appended whitespace query param
          window.location.href = url.replace(/\&w=1/, '');
        } else {
          // Add the whitespace query param
          var query = url.includes('?') ? '&w=1' : '?w=1';
          if (url.includes('#')) {
            // Insert before any anchors in the url
            window.location.href = url.slice(0, url.indexOf('#')) + query + url.substr(url.indexOf('#'));
          } else {
            // Append to the url
            window.location.href = url + query;
          }
        }
      }
      $(this).blur();
    });
  }

});

