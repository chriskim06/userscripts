/**
 * This is a FluidApp userscript for Google Inbox for Mac. 
 * It displays an unread email count on the dock icon and creates notifications when new emails come in.
 *
 * 1) You need the paid version of FluidApp (http://fluidapp.com/)
 * 2) Point Fluid to https://inbox.google.com
 * 3) Set the user-agent to Chrome
 * 4) Go to window -> userscript and add a new userscript called 'Inbox' that matches the pattern "*inbox.google.com*".
 * 5) Paste the contents of this document into the script area below that.
 * 6) Refresh your FluidApp. (CMD + R)
 */

window.fluid.dockBadge = '';
setTimeout(updateBadge, 5000);
setInterval(updateBadge, 5000);

function updateBadge() {
  var prevCount = window.fluid.dockBadge;
  // Inbox title is shown/hidden depending on the selected folder (done, sent, etc)
  var inboxTabSpan = document.getElementsByClassName('bl')[0];
  if (inboxTabSpan.getAttribute('title') != 'Inbox' && prevCount !== '') {
    // Inbox is hidden.
    window.fluid.dockBadge = '?';
  } else {
    // Check for Inbox Zero
    var inboxZero = document.getElementsByClassName('j');
    if (inboxZero.length >= 1) {
      window.fluid.dockBadge = '';
    } else {
      // Inbox is visible
      var unreadEmails = document.getElementsByClassName('ss');
      var count = unreadEmails.length;
      if (count >= 1) {
        window.fluid.dockBadge = count;
        if (window.Notification && (prevCount === '?' || count > prevCount)) {
          // Create notification if there are new emails or unread emails when returning to the inbox tab
          buildAndShowNotification(count);
        }
      } else {
        // There are no unread emails in the inbox
        window.fluid.dockBadge = '';
      }
    }
  }
}

function buildAndShowNotification(count) {
  var permission = Notification.permission;
  if (permission === 'default') {
    Notification.requestPermission(function() {
      notify();
    });
  } else if (permission === 'granted') {
    var content = count + ' unread message';
    if (count > 1) {
      content += 's';
    }
    var notification = window.webkitNotifications.createNotification(null, 'Inbox', content);
    try {
      notification.show();
    } catch (e) {
      console.log('Error showing notification');
    }
  }
}
