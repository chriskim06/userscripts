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

window.fluid.dockBadge = '';
setTimeout(updateBadge, 1000);
setInterval(updateBadge, 3000);

// Looks for and counts unread emails
function updateBadge() {
  var prevCount = window.fluid.dockBadge;
  var navTitle = document.querySelectorAll('[jsaction="global.navigate_and_refresh"]')[0].textContent.trim();
  if (navTitle === 'Inbox') {
    var emptyImage = document.getElementsByClassName('j');
    if (emptyImage.length === 0) {
      var unreadEmails = document.getElementsByClassName('ss');
      var count = unreadEmails.length;
      window.fluid.dockBadge = (count === 0) ? '' : count;
      if (window.Notification && count > prevCount) {
        buildNotification(count);
      }
    }
  }
}

// Checks notification permission
function buildNotification(count) {
  if (Notification.permission === 'granted') {
    showNotification('Inbox', count);
  } else {
    Notification.requestPermission().then(function(result) {
      if (result === 'denied') {
        console.log('Permission denied.');
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
      } else if (result === 'granted') {
        showNotification('Inbox', count);
      }
    });
  }
}

// Create and show the notification
function showNotification(title, count) {
  var options = {
    body: (count === 1) ? '1 unread message' : count + ' unread messages'
  }
  var n = new Notification(title, options);
}

