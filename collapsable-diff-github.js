// ==UserScript==
// @name        Collapsable Diffs and Linked Branches (GitHub)
// @namespace   chriskim06
// @description Adds a toggle to collapse diffs in GitHub's pull request and commit diff interfaces
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.3.6
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  function collapsable() {
    if ($('#files').length) {
      var expanded = '<a class="octicon-btn custom-collapsable" href="javascript:void(0)" onclick="return false;"><span class="octicon octicon-triangle-down "></span></a>';
      $('#files').find('div[id^="diff-"]').each(function() {
        var diff = $(this);
        if (!diff.find('.file-info:first-child').is('a')) {
          diff.find('.file-info').prepend(expanded);
          var area = diff.children('.data.highlight.blob-wrapper');
          diff.find('.octicon-btn.custom-collapsable').on('click', function() {
            var icon = $(this).children(':first');
            if (icon.hasClass('octicon-triangle-down')) {
              icon.attr('class', 'octicon octicon-triangle-right');
              area.hide();
            } else {
              icon.attr('class', 'octicon octicon-triangle-down');
              area.show();
            }
          });
        }
      });
    }
  }
  
  function makeLinks() {
    if ($('#partial-discussion-header').length) {
      $('span.commit-ref.current-branch').each(function() {
        var repo = $('.entry-title a[data-pjax]').text();
        var baseUrl = 'https://github.com';
        var branch = $(this).text();
        if (branch.indexOf(':') === -1) {
          baseUrl += $('.entry-title a[data-pjax]').attr('href') + '/tree/';
          $(this).wrap('<a href="' + baseUrl + branch + '"></a>');
        } else {
          var fork = branch.split(':');
          baseUrl += '/' + fork[0] + '/' + repo + '/tree/';
          $(this).wrap('<a href="' + baseUrl + fork[1] + '"></a>');
        }
      });
    }
  }
  
  makeLinks();
  collapsable();

  window.$(document).on('pjax:end', function() {
    makeLinks();
    collapsable();
  });
  
});
