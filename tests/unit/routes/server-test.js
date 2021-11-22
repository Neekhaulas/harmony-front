import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | server', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:server');
    assert.ok(route);
  });
});
