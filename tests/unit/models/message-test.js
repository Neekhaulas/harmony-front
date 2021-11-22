import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | message', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('message', {
      channel: '123',
      owner: '123',
      content: 'Hello world',
    });
    assert.ok(model);
  });
});
