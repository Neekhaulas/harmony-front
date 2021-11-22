import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ServerRoute extends Route {
  @service store;
  @service socket;
  @service session;
  @service user;

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

  afterModel(model) {
    this.user.setCurrentServer(model);
    this.socket.subscribeServer(model.id);
  }
}
