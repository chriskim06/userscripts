// ==UserScript==
// @name        JIRA - Show Total Number of Points for Each Column
// @namespace   chriskim06
// @description Displays the total amount of points in each column of your board
// @include     https://*jira*com/secure/*Board*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @version     1.0.2
// @grant       none
// @locale      en
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

waitForKeyElements('#ghx-pool', getNumPoints);
  
// jNode is the board
function getNumPoints(jNode) {
  var columns = {};
  var columnHeaders = $('#ghx-column-headers');
  columnHeaders.children('li').each(function() {
    columns[$(this).attr('data-id')] = 0;
  });
  
  // For each swimlane...
  jNode.find('.ghx-columns').each(function() {
    // Get each column...
    $(this).children('li').each(function() {
      var id = $(this).attr('data-column-id');
    
      // And get each ticket and...
      $(this).children('div').each(function() {
        // Add it to the total
        var points = parseInt($(this).find('.ghx-end').find('span.aui-badge').html(), 10);
        if (points > 0) {
          columns[id] += points;
        }
      });
    });
  });
  
  // Append the total point value for this column to the column's name
  columnHeaders.children('li').each(function() {
    var columnId = $(this).attr('data-id');
    var columnTitle = $(this).find('h2');
    columnTitle.append(' (' + columns[columnId] + ')');
  });
}
