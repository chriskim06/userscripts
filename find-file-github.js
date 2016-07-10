// ==UserScript==
// @name        Find File Shortcut (GitHub)
// @namespace   chriskim06
// @description Adds a keyboard shortcut to use GitHub's find file feature
// @include     https://github.com/*/*
// @version     1.5
// @grant       none
// @locale      en
// ==/UserScript==

document.querySelector('html').addEventListener('keydown', function(e) {
  if (e.shiftKey && e.which === 80 && e.target.nodeName !== 'INPUT') {
    var branch = branchMenu.querySelector('.js-select-button.css-truncate-target');
    if (branch) {
      window.location.href = window.location.href + '/find/' + branch.innerHTML;
    }
  }
});

