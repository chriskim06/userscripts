/**
 * This is a FluidApp userscript for Google Inbox for Mac.
 * It displays an unread email count on the dock icon and creates notifications when new emails come in.
 *
 * 1) You need the paid version of FluidApp (http://fluidapp.com/)
 * 2) Point Fluid to https://inbox.google.com
 * 3) Set the user-agent to Chrome
 * 4) Go to window -> userscript and add a new userscript called 'Inbox' that matches the pattern "*inbox.google.com*".
 * 5) Paste the contents of this document into the script area below that.
 * 6) Refresh your FluidApp.
 */

(function() {

  // References to live NodeLists
  var nav = document.getElementsByClassName('bl');
  var unread = document.getElementsByClassName('ss');
  var bundles = document.getElementsByClassName('rO HB');

  // Looks for and counts unread emails in the main inbox
  function updateAndNotify() {
    if (nav.length && nav[0].title === 'Inbox') {
      // Skip updating if an email or bundle is expanded
      var expanded = document.querySelectorAll('.scroll-list-item[aria-expanded="true"]');
      if (!expanded.length) {
        // Get the number of unread emails
        var count = unread.length;
        for (var i = 0; i < bundles.length; i++) {
          var num = bundles[i].firstElementChild.innerText.match(/(\d+) new/);
          if (num && num.length === 2) {
            count += parseInt(num[1], 10) - 1;
          }
        }
        // Show a notification for new emails
        if (count > window.fluid.dockBadge) {
          var n = new Notification('Inbox', {
            body: (count === 1) ? '1 unread message' : count + ' unread messages'
          });
        }
        window.fluid.dockBadge = (count === 0) ? '' : count;
      }
    }
  }

  // Check notification permission initially and then set the interval
  if (Notification.permission === 'granted') {
    setInterval(updateAndNotify, 1000);
  } else {
    Notification.requestPermission().then(function(result) {
      if (result === 'granted') {
        setInterval(updateAndNotify, 1000);
      } else {
        console.error('Need notification permission for the notification userscript.');
      }
    });
  }

})();

