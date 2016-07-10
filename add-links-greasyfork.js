// ==UserScript==
// @name        Greasy Fork Links
// @namespace   chriskim06
// @description Add links to navigate to the update tab and links to install scripts
// @include     https://greasyfork.org/en/users/*
// @version     1.3.2
// @grant       none
// @locale      en
// ==/UserScript==

(function() {

  function createNewElement(link, tag, text, href) {
    var el = document.createElement(tag);
    if (tag === 'a') {
      el.href = href;
    } else {
      el.className = 'name-description-separator';
    }
    el.innerHTML = text;
    link.parentNode.insertBefore(el, link.nextElementSibling);
  }

  if (document.querySelector('#user-script-list') !== null) {
    var currentUser = document.querySelector('#nav-user-info > .user-profile-link > a');
    var loggedIn = (currentUser !== null && currentUser.innerHTML === document.title);
    var items = document.querySelectorAll('#user-script-list > li');
    for (var i = 0; i < items.length; i++) {
      var link = items[i].querySelector('a');
      if (loggedIn) {
        createNewElement(link, 'a', 'Edit', '/en/scripts/' + items[i].dataset.scriptId + '/versions/new');
        createNewElement(link, 'span', ' - ', null);
        createNewElement(link, 'a', 'Delete', link.href + '/delete');
        createNewElement(link, 'span', '/', null);
      }
      createNewElement(link, 'a', 'Install', link.href + '/code/' + link.innerHTML.replace(/ /g, '%20') + '.user.js');
      createNewElement(link, 'span', ' - ', null);
      link.href = link.href + '/code';
    }
    var scripts = document.querySelector('#user-script-list').parentElement.querySelector('header > h3');
    if (scripts !== null) {
      scripts.innerHTML = 'Scripts (' + items.length + ')';
    }
  }

})();
