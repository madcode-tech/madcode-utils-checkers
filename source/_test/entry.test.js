import { expect } from 'chai';

import { warnIf, throwIf, setLogger } from '../entry.js'

describe('checker', function() {
  const MESSAGE_1 = 'MESSAGE_1';
  const MESSAGE_2 = 'MESSAGE_2';

  const EMPTY = '';
  let LOG = EMPTY;

  setLogger(function(message) { LOG = message; });

  beforeEach(function() {
    LOG = EMPTY;
  });

  describe('warnIf', function() {
    it('should log when true', function() {
      expect(warnIf(true, MESSAGE_1)).to.equal(true);
      expect(LOG).to.equal(MESSAGE_1);
    });

    it('should NOT log when false', function() {
      expect(warnIf(false, MESSAGE_1)).to.equal(false);
      expect(LOG).to.equal(EMPTY);
    });
  });

  describe('throwIf', function() {
    it('should throw on true', function() {
      function test() { throwIf(true, MESSAGE_1); }

      expect(test).to.throw(Error, MESSAGE_1);
    });

    it('should NOT throw on false', function() {
      function test() { throwIf(false, MESSAGE_1); }

      expect(test).to.not.throw(Error, MESSAGE_1);
    });
  });

  function multipleTest(name, test) {
    it('[' + name + '] count of messages can be more than one', function() {
      test(MESSAGE_1 + ' ' + MESSAGE_2, [MESSAGE_1, MESSAGE_2]);
    });
  }

  describe('multiple messages', function() {
    multipleTest(
      'warnIf',
      function(result, args) {
        function test() { throwIf(true, ...args); }

        expect(test).to.throw(Error, result);
      }
    );

    multipleTest(
      'throwIf',
      function(result, args) {
        expect(warnIf(true, ...args)).to.equal(true);

        expect(LOG).to.equal(result);
      }
    );
  });

  function functionTest(name, test) {
    const THROW = 'THROW';

    it('[' + name + '] count of messages can be more than one', function() {
      test(MESSAGE_1 + ' ' + MESSAGE_2, [MESSAGE_1, function() { return MESSAGE_2; }]);
      test(MESSAGE_1 + ' undefined', [MESSAGE_1, function() {}]);
      test(MESSAGE_1 + ' "' + THROW + '"', [MESSAGE_1, function() { throw THROW; }]);
    });
  }

  describe('functions as messages', function() {
    functionTest(
      'warnIf',
      function(result, args) {
        function test() { throwIf(true, ...args); }

        expect(test).to.throw(Error, result);
      }
    );

    functionTest(
      'throwIf',
      function(result, args) {
        expect(warnIf(true, ...args)).to.equal(true);

        expect(LOG).to.equal(result);
      }
    );
  });
});
