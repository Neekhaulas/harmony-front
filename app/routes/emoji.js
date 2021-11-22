import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EmojiRoute extends Route {
  @service store;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'index');
  }

  model(params) {
    let data = this.store.peekRecord('server', params.server_id);
    if (data === null) {
      data = this.store.findRecord('server', params.server_id);
    }
    return data;
  }
}
