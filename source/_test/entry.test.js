import { expect } from 'chai';

import { warnIf, throwIf } from '../entry.js'

describe('checker', function() {
  describe('warnIf', function() {
    it('should return what it receives', function() {
      expect(warnIf(true)).to.equal(true);
      expect(warnIf(false)).to.equal(false);
    });
  });

  describe('throwIf', function() {
    const message = 'test message';

    it('should throw on true', function() {
      function test() { throwIf(true, message); }

      expect(test).to.throw(Error, message);
    });

    it('should NOT throw on false', function() {
      function test() { throwIf(false, message); }

      expect(test).to.not.throw(Error, message);
    });
  });
});
