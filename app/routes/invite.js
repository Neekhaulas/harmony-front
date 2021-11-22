import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InviteRoute extends Route {
  @service store;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'index');
  }

  model(params) {
    return this.store.findRecord('invite', params.code);
  }
}
