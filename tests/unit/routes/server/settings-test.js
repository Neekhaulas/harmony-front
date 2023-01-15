import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | server/settings', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:server/settings');
    assert.ok(route);
  });
});
