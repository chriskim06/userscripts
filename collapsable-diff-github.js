// ==UserScript==
// @name        Collapsable Diffs and Linked Branches (GitHub)
// @namespace   chriskim06
// @description Adds a toggle to collapse diffs in GitHub's pull request and commit diff interfaces
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @version     1.4.6
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  waitForKeyElements('#files > div[id^="diff-"]', addDiffCollapseButtons);
  waitForKeyElements('.diffbar-item.dropdown.js-menu-container', addCollapseAllButton);
  waitForKeyElements('#partial-discussion-header', makeLinks);
  
  function addDiffCollapseButtons(jNode) {
    // Add buttons in each header to allow folding the diff
    var expanded = 'M0 5l6 6 6-6H0z';
    var collapsed = 'M0 14l6-6L0 2v12z';
    var info = jNode.find('.file-info');
    if (!info.children().first().is('a')) {
      // If the button isn't there add it and add the event handler
      info.prepend(
        '<a class="octicon-btn custom-collapsable" href="javascript:void(0)">' +
          '<svg height="16" width="12" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="' + expanded + '" />' +
          '</svg>' +
        '</a>'
      );
      jNode.find('.octicon-btn.custom-collapsable').on('click', function() {
        // Toggle the visibility of the diff and the direction of the arrow
        var icon = $(this).find('path');
        jNode.children('.data.highlight.blob-wrapper').toggle();
        icon.attr('d', (icon.attr('d') === collapsed) ? expanded : collapsed);
        var collapseAllButton = $('#diff-collapse-button');
        if (collapseAllButton.length) {
          var state = $('#files').find('div[id^="diff-"]').children('.data.highlight.blob-wrapper').is(':visible');
          collapseAllButton.attr('data-toggle-state', state ? 'expanded' : 'collapsed');
          collapseAllButton.text(state ? 'Collapse All' : 'Expand All');
        }
      });
    }
  }

  function addCollapseAllButton(jNode) {
    if (jNode.find('a').length === 2) {
      // Add an Expand/Collapse All button if its not there
      var blobs = $('#files').find('div[id^="diff-"]').children('.data.highlight.blob-wrapper');
      jNode.find('ul').append(
        '<a id="diff-collapse-button" ' +
          'class="dropdown-item" ' +
          'href="javascript:void(0)" ' +
          'data-toggle-state="' + (blobs.is(':visible') ? 'expanded' : 'collapsed') + '">' +
          (blobs.is(':visible') ? 'Collapse All' : 'Expand All') +
        '</a>'
      );
      $('#diff-collapse-button').on('click', function() {
        // Toggle the visibility of all diffs, directions of arrows, and the button
        var state = ($(this).attr('data-toggle-state') === 'expanded');
        if (state) {
          blobs.hide();
        } else {
          blobs.show();
        }
        var expanded = 'M0 5l6 6 6-6H0z';
        var collapsed = 'M0 14l6-6L0 2v12z';
        $('.octicon-btn.custom-collapsable').find('path').attr('d', state ? collapsed : expanded);
        $(this).attr('data-toggle-state', state ? 'collapsed' : 'expanded');
        $(this).text(state ? 'Expand All' : 'Collapse All');
      });
    }
  }

  function makeLinks(jNode) {
    if (jNode.find('.flex-table-item.flex-table-item-primary > a').length === 1) {
      // Turn the branches being compared into links if they aren't already
      var url = window.location.href.match(/(https:\/\/github\.com\/)([A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+))/);
      if (url) {
        $('span.commit-ref.current-branch').each(function() {
          var link;
          var branch = this.textContent;
          if (!branch.includes(':')) {
            link = url[0] + '/tree/' + branch;
          } else {
            var split = branch.split(':');
            link = url[1] + split[0] + url[3] + '/tree/' + split[1];
          }
          $(this).wrap('<a href="' + link + '"></a>');
        });
      }
    }
  }

});
