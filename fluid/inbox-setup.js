/**
 * This is a FluidApp userscript for Google Inbox for Mac.
 * Adds sidenav style and keybinding for closing the 'marked as done' popup.
 *
 * 1) You need the paid version of FluidApp (http://fluidapp.com/)
 * 2) Point Fluid to https://inbox.google.com
 * 3) Set the user-agent to Chrome
 * 4) Go to window -> userscript and add a new userscript called 'Inbox' that matches the pattern "*inbox.google.com*".
 * 5) Paste the contents of this document into the script area below that.
 * 6) Refresh your FluidApp.
 */

(function() {

  // Add style for sidenav
  var style = document.createElement('style');
  style.innerText = "nav > .lQ{background: #1e1d1d; color: #a4a4a4;}" +
    ".oin9Fc.cN.hA{background: #323131; color: #f1f1f1;}" +
    "img.gN{-webkit-filter: invert(1); filter: invert(1);}";
  document.head.appendChild(style);

  // Remove hangouts
  var menu = document.getElementsByClassName('rs k2');
  if (menu.length) {
    menu[0].removeChild(menu[0].childNodes[0]);
  }

  // References to live NodeLists
  var undo = document.getElementsByClassName('IbRB2e sf ov');
  var closePopup = document.getElementsByClassName('fT IB');

  // Close the popup with the escape key
  document.querySelector('html').addEventListener('keydown', function(e) {
    if (e.which === 27 && e.target.nodeName !== 'INPUT') {
      // Check if the popup is visible then close it
      if (undo.length && undo[0].getAttribute('aria-hidden') === "false" && closePopup.length) {
        closePopup[0].click();
      }
    }
  });

})();

