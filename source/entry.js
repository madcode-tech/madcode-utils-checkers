function safeExecute(func) {
  let result = '';

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

let LOGGER = function(message) { console.log(message); } // eslint-disable-line

module.exports = {
  setLogger(logger) { LOGGER = logger; },
  throwIf: function(check, ...messages) {
    if (check) { throw new Error(prepare(messages)); }

    return check;
  },
  warnIf: function(check, ...messages) {
    if (check) { LOGGER(prepare(messages)); }

    return check;
  }
};
