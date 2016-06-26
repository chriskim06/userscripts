// ==UserScript==
// @name        Hide the Detailed Ticket View in JIRA
// @namespace   chriskim06
// @description Pressing escape in JIRA will close the detailed ticket view if its open
// @include     https://*jira*com/secure/*Board*
// @version     1.0.0
// @grant       none
// @locale      en
// ==/UserScript==

document.querySelector('html').addEventListener('keydown', function(e) {
  if (e.which === 27 && e.target.nodeName !== 'INPUT') {
    var close = document.querySelector('.ghx-iconfont.aui-icon.aui-icon-small.aui-iconfont-close-dialog');
    if (close != null) {
      close.click();
    }
  }
});
