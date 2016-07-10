// ==UserScript==
// @name        Greasy Fork Default Behavior
// @namespace   chriskim06
// @description Add/edit scripts with syntax highlighting enabled by default and hide share stuff
// @include     /https://greasyfork.org/en/scripts/\w+(-|/).*/
// @include     https://greasyfork.org/en/script_versions/new
// @version     1.2.5
// @grant       none
// @locale      en
// ==/UserScript==

(function() {

  var textarea = document.getElementById('script_version_code');
  if (textarea !== null) {
    textarea.style.height = '560px';
  }

  var checkbox = document.getElementById('enable-source-editor-code');
  if (checkbox !== null && !checkbox.checked) {
    checkbox.checked = true;
  }
  
  var share = document.getElementById('share');
  if (share !== null) {
    share.style.display = 'none';
  }

})();
