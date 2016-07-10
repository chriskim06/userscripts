// ==UserScript==
// @name        Greasy Fork Links
// @namespace   chriskim06
// @description Add links to navigate to the update tab and links to install scripts
// @include     https://greasyfork.org/en/users/*
// @version     1.3.0
// @grant       none
// @locale      en
// ==/UserScript==

(function() {

  function createSpan(link, text) {
    var el = document.createElement('span');
    el.className = 'name-description-separator';
    el.innerHTML = text;
    link.parentNode.insertBefore(el, link.nextElementSibling);
  }

  var currentUser = document.querySelector('#nav-user-info > .user-profile-link > a').innerHTML;
  var loggedIn = (currentUser === document.querySelector('title').innerHTML);
  var scripts = document.getElementById('user-script-list');
  if (scripts !== null) {
    var items = document.querySelectorAll('#user-script-list > li');
    for (var i = 0; i < items.length; i++) {
      var link = items[i].querySelector('a');
      link.href = link.href + '/code';
      if (loggedIn) {
        var el = document.createElement('a');
        el.href = '/en/scripts/' + items[i].dataset.scriptId + '/versions/new';
        el.innerHTML = 'Edit';
        link.parentNode.insertBefore(el, link.nextElementSibling);
        createSpan(link, ' - ');
        el = document.createElement('a');
        el.href = link.href + '/delete';
        el.innerHTML = 'Delete';
        link.parentNode.insertBefore(el, link.nextElementSibling);
        createSpan(link, '/');
      }
      var install = document.createElement('a');
      install.href = link.href + '/code/' + link.innerHTML.replace(/ /g, '%20') + '.user.js';
      install.innerHTML = 'Install';
      link.parentNode.insertBefore(install, link.nextElementSibling);
      createSpan(link, ' - ');
    }
    scripts.previousElementSibling.querySelector('h3').innerHTML = 'Scripts (' + items.length + ')';
  }

})();
