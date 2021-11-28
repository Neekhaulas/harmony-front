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
    this.user.setCurrentServer(params.server_id);
    return null;
  }
}
