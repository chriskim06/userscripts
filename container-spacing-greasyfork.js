// ==UserScript==
// @name        Greasy Fork Container Spacing
// @namespace   chriskim06
// @description Adds a small margin to the bottom of the code container and author description in Greasy Fork
// @include     https://greasyfork.org/en/scripts/*
// @include     https://greasyfork.org/en/users/*
// @version     1.2.3
// @grant       none
// @locale      en
// ==/UserScript==

(function() {

  var elem = document.getElementById('code-container');
  if (elem !== null) {
    elem.setAttribute('style', 'margin-bottom: 60px;');
  }
  
  var elem = document.getElementById('additional-info');
  if (elem !== null) {
    elem.setAttribute('style', 'margin-bottom: 60px;');
  }
  
  var elem = document.getElementById('user-script-list');
  if (elem !== null) {
    elem.setAttribute('style', 'margin-bottom: 60px;');
  }

})();
