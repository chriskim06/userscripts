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

// Check notification permission initially and then set the interval
window.fluid.dockBadge = '';
if (window.Notification.permission === 'granted') {
  setInterval(updateBadge, 1000);
} else {
  Notification.requestPermission().then(function(result) {
    if (result === 'granted') {
      setInterval(updateBadge, 1000);
    } else {
      alert('Need notification permission to use this userscript.');
    }
  });
}

// Looks for and counts unread emails in the main Inbox
function updateBadge() {
  if (document.getElementsByClassName('bl')[0].getAttribute('title') === 'Inbox') {
    var count = document.getElementsByClassName('ss').length;
    var prevCount = window.fluid.dockBadge;
    window.fluid.dockBadge = (count === 0) ? '' : count;
    if (count > prevCount && window.Notification) {
      showNotification('Inbox', count);
    }
  }
}

// Create and show the notification
function showNotification(title, count) {
  var options = {
    body: (count === 1) ? '1 unread message' : count + ' unread messages'
  }
  var n = new Notification(title, options);
}

