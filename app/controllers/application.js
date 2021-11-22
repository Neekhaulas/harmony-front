import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service socket;
  @service session;

  constructor() {
    super(...arguments);
    if (this.session.isAuthenticated) {
      this.socket.start();
    }
  }

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }

  get isOnline() {
    return this.socket.online && this.session.isAuthenticated;
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
