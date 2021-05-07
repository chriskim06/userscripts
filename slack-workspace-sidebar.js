// ==UserScript==
// @name         Slack Workspace Sidebar
// @namespace    chriskim06
// @version      0.1
// @description  Show workspaces sidebar in web version of slack
// @author       You
// @match        https://app.slack.com/*
// ==/UserScript==

(function() {
  'use strict';

  Object.defineProperty(navigator, 'userAgent', {
    value: navigator.userAgent + ' CrOS'
  });
})();
