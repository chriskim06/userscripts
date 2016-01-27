// ==UserScript==
// @name        Collapsable Diffs and Linked Branches (GitHub)
// @namespace   chriskim06
// @description Adds a toggle to collapse diffs in GitHub's pull request and commit diff interfaces
// @include     https://github.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1.3.7
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
        var info = diff.find('.file-info');
        if (!info.children().first().is('a')) {
          info.prepend(expanded);
          diff.find('.octicon-btn.custom-collapsable').on('click', function() {
            var icon = $(this).children().first();
            if (icon.hasClass('octicon-triangle-down')) {
              icon.attr('class', 'octicon octicon-triangle-right');
            } else {
              icon.attr('class', 'octicon octicon-triangle-down');
            }
            diff.children('.data.highlight.blob-wrapper').slideToggle('fast');
          });
        }
      });
    }
  }
  
  function makeLinks() {
    if ($('#partial-discussion-header').length) {
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

  window.$(document).on('pjax:end', function() {
    makeLinks();
    collapsable();
  });
  
});
