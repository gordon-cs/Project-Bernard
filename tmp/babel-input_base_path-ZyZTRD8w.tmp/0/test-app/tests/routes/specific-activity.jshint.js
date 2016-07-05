QUnit.module('JSHint | routes/specific-activity.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/specific-activity.js should pass jshint.\nroutes/specific-activity.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/specific-activity.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/specific-activity.js: line 4, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/specific-activity.js: line 40, col 25, Bad line breaking before \'&&\'.\nroutes/specific-activity.js: line 41, col 25, Bad line breaking before \'&&\'.\n\n5 errors');
});
