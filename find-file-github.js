// ==UserScript==
// @name        Find File Shortcut (GitHub)
// @namespace   chriskim06
// @description Adds a keyboard shortcut to use GitHub's find file feature
// @include     https://github.com/*/*
// @version     1.3
// @grant       none
// @locale      en
// ==/UserScript==

document.querySelector('html').addEventListener('keydown', function(e) {
  if (e.shiftKey && e.which === 80 && e.target.nodeName !== 'INPUT') {
    var url = window.location.href.match(/(https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+)(?:\/tree\/)?([A-Za-z0-9_-]+)?/);
    if (url !== null) {
      var branch = (url[2]) ? url[2] : 'master';
      window.location.href = url[1] + '/find/' + branch;
    }
  }
});

