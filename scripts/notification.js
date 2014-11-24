var BG = chrome.extension.getBackgroundPage();
function makeLink(a) {
  var b = document.createElement('a');
  b.href = 'diff.htm#' + btoa(a.url);
  b.onclick = function () {
    markPageVisited(a.url)
  };
  b.target = '_blank';
  b.appendChild(document.createTextNode(a.name));
  return b
}
function markPageVisited(a) {
  BG.setPageSettings(a, {
    updated: !1
  }, function () {
    BG.updateBadge();
    BG.takeSnapshot(a, BG.scheduleCheck);
    initialize()
  })
}
function initialize() {
  BG.getAllUpdatedPages(function (a) {
    if (0 == a.length) setTimeout(BG.hideDesktopNotification, 1);
     else {
      var b;
      b = 1 == a.length ? chrome.i18n.getMessage('page_updated_single')  : chrome.i18n.getMessage('page_updated_multi', a.length.toString());
      document.getElementsByTagName('h1') [0].innerHTML = b;
      b = document.getElementById('content');
      b.innerHTML = '';
      if (1 == a.length) {
        var c = document.createElement('span');
        c.appendChild(makeLink(a[0]));
        b.appendChild(c)
      } else {
        var d = document.createElement('ul');
        b.appendChild(d);
        a.forEach(function (a) {
          var b = document.createElement('li');
          b.appendChild(makeLink(a));
          d.appendChild(b)
        })
      }
    }
  })
}
document.addEventListener('DOMContentLoaded', initialize, !1);
