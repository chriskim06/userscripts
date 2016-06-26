// ==UserScript==
// @name        JIRA Floating Menu Bar
// @namespace   chriskim06
// @description Makes the menu bar in JIRA issues stay at the top of the page when scrolling
// @include     https://*jira*com/browse/*
// @version     1.0.0
// @grant       none
// @locale      en
// ==/UserScript==

(function() {

  var menu = document.querySelector('#header > nav');
  if (menu != null) {
    menu.style.position = 'fixed';
    menu.style.zIndex = '1000';
  }

  var container = document.querySelector('#issue-content');
  if (container != null) {
    container.style.marginTop = '35px';
  }

})();
