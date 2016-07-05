define('test-app/tests/controllers/specific-activity.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/specific-activity.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/specific-activity.js should pass jshint.\ncontrollers/specific-activity.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/specific-activity.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/specific-activity.js: line 5, col 9, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });
});