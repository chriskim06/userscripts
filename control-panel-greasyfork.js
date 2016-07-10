// ==UserScript==
// @name        Greasy Fork Control Panel
// @namespace   chriskim06
// @description Moves the control panel to the right of the scripts listing as its own list group
// @include     https://greasyfork.org/en/users/*
// @version     1.0.1
// @grant       none
// @locale      en
// ==/UserScript==

(function() {

  var section = document.querySelector('#control-panel');
  var panel = document.querySelector('#user-control-panel');
  var groups = document.querySelector('#script-list-option-groups');
  if (section !== null && panel !== null && groups !== null) {
    var div = document.createElement('div');
    div.className = 'list-option-group';
    div.innerHTML = 'Control Panel:';
    div.appendChild(panel);
    section.parentNode.removeChild(section);
    groups.insertBefore(div, groups.firstChild);
  }

})();
