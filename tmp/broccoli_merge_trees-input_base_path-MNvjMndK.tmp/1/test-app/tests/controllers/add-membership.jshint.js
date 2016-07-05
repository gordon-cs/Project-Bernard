define('test-app/tests/controllers/add-membership.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/add-membership.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/add-membership.js should pass jshint.\ncontrollers/add-membership.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/add-membership.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});