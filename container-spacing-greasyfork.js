// ==UserScript==
// @name        Greasy Fork Container Spacing
// @namespace   chriskim06
// @description Adds a small margin to the bottom of the code container and author description in Greasy Fork
// @include     https://greasyfork.org/en/scripts/*
// @include     https://greasyfork.org/en/users/*
// @version     1.2.4
// @grant       none
// @locale      en
// ==/UserScript==

(function() {
  var el = document.getElementById('code-container');
  if (el !== null) {
    el.style.marginBottom = '60px';
  }
  
  el = document.getElementById('additional-info');
  if (el !== null) {
    el.style.marginBottom = '60px';
  }
  
  el = document.getElementById('user-deleted-script-list');
  if (el !== null) {
    el.style.marginBottom = '60px';
  } else {
    el = document.getElementById('user-script-list');
    if (el !== null) {
      el.style.marginBottom = '60px';
    }
  }
})();
