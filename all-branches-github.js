// ==UserScript==
// @name        Default to All Branches Page (GitHub)
// @namespace   https://github.com/chriskim06/userscripts
// @description Changes the link so that clicking branches takes you to the all branches page
// @match       https://github.com/*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @version     1.5.0
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

  waitForKeyElements('.repository-content ul.numbers-summary > li:nth-child(2) > a', function(jNode) {
    var href = jNode.attr('href');
    if (!href.endsWith('/all')) {
      jNode.attr('href', href + '/all');
    }
  });

});

