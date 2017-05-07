function safeExecute(func) {
  var result = '';

  try { result = func(); } catch(e) { result = JSON.stringify(e); } // eslint-disable-line

  return result;
}

function prepare(messages) {
  return messages.reduce(
    function(result, message) {
      return result + (
        typeof message == 'function' ? safeExecute(message) : message
      ) + ' ';
    },
    ''
  ).trim();
}

var LOGGER = function(message) { console.log(message); } // eslint-disable-line

module.exports = {
  setLogger: function(logger) { LOGGER = logger; },
  throwIf: function(check) {
    for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        messages[_key - 1] = arguments[_key];
    }

    if (check) { throw new Error(prepare(messages)); }

    return check;
  },
  warnIf: function(check) {
    for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        messages[_key - 1] = arguments[_key];
    }

    if (check) { LOGGER(prepare(messages)); }

    return check;
  }
};
