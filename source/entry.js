module.exports = {
  throwIf: function(check, message) {
    if (check) { throw new Error(message); }

    return check;
  },
  warnIf: function(check, message) {
    if (check) { console.log(message); } // eslint-disable-line

    return check;
  }
};
