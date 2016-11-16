// ==UserScript==
// @name        Collapsable Diffs and Linked Branches (GitHub)
// @namespace   chriskim06
// @description Adds a toggle to collapse diffs in GitHub's pull request and commit diff interfaces
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @version     1.5.0
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  waitForKeyElements('#files > div[id^="diff-"]', addDiffCollapseButtons);
  waitForKeyElements('.pr-review-tools > .diffbar-item:nth-child(1)', addCollapseAllButton);
  waitForKeyElements('#partial-discussion-header .commit-ref', makeLinks);

  function addDiffCollapseButtons(jNode) {
    // Add buttons in each header to allow folding the diff
    var info = jNode.find('.file-info');
    if (!info.children().first().is('a')) {
      // If the button isn't there add it and add the event handler
      var expanded = 'M0 5l6 6 6-6H0z';
      var collapsed = 'M0 14l6-6L0 2v12z';
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
        jNode.children('.data.highlight.blob-wrapper, .data.highlight.empty, .render-wrapper, .js-file-content').toggle();
        icon.attr('d', (icon.attr('d') === collapsed) ? expanded : collapsed);
        var collapseAllButton = $('#diff-collapse-button');
        if (collapseAllButton.length) {
          var state = $('#files').find('div[id^="diff-"]').children('.data.highlight.blob-wrapper').is(':visible');
          collapseAllButton.attr('data-toggle-state', state ? 'expanded' : 'collapsed');
          collapseAllButton.text(state ? 'Fold All' : 'Show All');
        }
      });
    }
  }

  function addCollapseAllButton(jNode) {
    // Add a Show/Fold All button if its not there
    if (!$('#diff-collapse-button').length) {
      var blobs = $('#files').find('div[id^="diff-"]').children('.data.highlight.blob-wrapper, .data.highlight.empty, .render-wrapper');
      jNode.after(
        '<div class="diffbar-item">' +
          '<button id="diff-collapse-button"' +
            'class="btn btn-sm btn-outline BtnGroup-item" style="width: 75px"' +
            'data-toggle-state="' + (blobs.is(':visible') ? 'expanded' : 'collapsed') + '">' +
            (blobs.is(':visible') ? 'Fold All' : 'Show All') +
          '</button>' +
        '</div>'
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
        $(this).text(state ? 'Show All' : 'Fold All');
      });
    }
  }

  function makeLinks(jNode) {
    if (!jNode.children(':first-child').is('a')) {
      // Turn the branches being compared into links if they aren't already
      var url = window.location.href.match(/(https:\/\/github\.com\/)[A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)/);
      if (url) {
        var branch = jNode.contents().text();
        if (!branch.includes(':')) {
          jNode.contents().wrapAll('<a href="' + url[0] + '/tree/' + branch + '"></a>');
        } else {
          jNode.contents().wrapAll('<a href="' + url[1] + branch.replace(':', url[2] + '/tree/') + '"></a>');
        }
      }
    }
  }

});
