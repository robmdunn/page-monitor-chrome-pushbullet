onmessage = function (c) {
  try {
    var a = JSON.parse(c.data)
  } catch (e) {
    return
  }
  if ('run' == a.command) {
    c = a.text;
    for (var a = new RegExp(a.regex, 'g'), b = null, d = [
    ]; (b = a.exec(c, a.lastIndex)) && 0 != b.join('').length; ) 1 == b.length ? d.push('"' + b[0] + '"')  : d.push('"' + b.slice(1).join('", "') + '"');
    postMessage(d.join('\n'))
  }
};
