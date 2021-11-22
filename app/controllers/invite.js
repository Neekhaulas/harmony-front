import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';

export default class InviteController extends Controller {
  @service router;
  @service session;

  @action
  joinServer() {
    fetch(`${ENV.apiUrl}/invites/${this.model.code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        this.router.transitionTo('server', this.model.server._id);
      });
  }
}
