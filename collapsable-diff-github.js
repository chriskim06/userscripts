// ==UserScript==
// @name        Collapsable Diffs and Linked Branches (GitHub)
// @namespace   chriskim06
// @description Adds a toggle to collapse diffs in GitHub's pull request and commit diff interfaces
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.4.2
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  function collapsable() {
    var files = $('#files');
    if (files.length) {
      // Add buttons in each header to allow folding the diff
      files.find('div[id^="diff-"]').each(function() {
        var diff = $(this);
        var info = diff.find('.file-info');
        if (!info.children().first().is('a')) {
          // If the button isn't there add it and add the event handler
          info.prepend(
            '<a class="octicon-btn custom-collapsable" href="javascript:void(0)">' +
              '<svg height="16" width="12" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M0 5l6 6 6-6H0z" />' +
              '</svg>' +
            '</a>'
          );
          diff.find('.octicon-btn.custom-collapsable').on('click', function() {
            // Toggle the visibility of the diff and the direction of the arrow
            var icon = $(this).find('path');
            var arrow = (icon.attr('d') === 'M0 14l6-6L0 2v12z') ? 'M0 5l6 6 6-6H0z' : 'M0 14l6-6L0 2v12z';
            diff.children('.data.highlight.blob-wrapper').toggle();
            icon.attr('d', arrow);
          });
        }
      });

      var diffOptions = $('.diffbar-item.dropdown.js-menu-container');
      if (diffOptions.length && diffOptions.find('a').length === 2) {
        // Add an Expand/Collapse All button if its not there
        var blobs = files.find('div[id^="diff-"]').children('.data.highlight.blob-wrapper');
        $('.diffbar-item.dropdown.js-menu-container').find('ul').append(
          '<a id="diff-collapse-button" ' +
            'href="javascript:void(0)" ' +
            'data-toggle-state="' + (blobs.is(':visible') ? 'expanded' : 'collapsed') + '">' +
            (blobs.is(':visible') ? 'Collapse' : 'Expand') + ' All'
          '</a>'
        );
        $('#diff-collapse-button').on('click', function() {
          // Toggle the visibility of all diffs, directions of arrows, and the button
          var allButton = $(this);
          var icons = $('.octicon-btn.custom-collapsable').find('path');
          var state = (allButton.attr('data-toggle-state') === 'expanded');
          blobs.toggle();
          icons.attr('d', state ? 'M0 14l6-6L0 2v12z' : 'M0 5l6 6 6-6H0z');
          allButton.attr('data-toggle-state', state ? 'collapsed' : 'expanded');
          allButton.text(state ? 'Expand All' : 'Collapse All');
        });
      }
    }
  }

  function makeLinks() {
    var head = $('#partial-discussion-header');
    if (head.length && head.find('.flex-table-item.flex-table-item-primary > a').length === 1) {
      // Turn the branches being compared into links if they aren't already
      $('span.commit-ref.current-branch').each(function() {
        var elem = $(this);
        var repo = $('.entry-title').find('a[data-pjax]');
        var url = 'https://github.com';
        var branch = elem.text();
        if (branch.indexOf(':') === -1) {
          url += repo.attr('href') + '/tree/' + branch;
        } else {
          var fork = branch.split(':');
          url += '/' + fork[0] + '/' + repo.text() + '/tree/' + fork[1];
        }
        elem.wrap('<a href="' + url + '"></a>');
      });
    }
  }
  
  makeLinks();
  collapsable();

  window.$(document).on('pjax:end pjax:complete', function() {
    makeLinks();
    collapsable();
  });
  
});
