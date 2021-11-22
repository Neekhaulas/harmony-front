import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @service session;
  @service socket;
  @tracked email = null;
  @tracked password = null;

  @action
  async login(event) {
    event.preventDefault();
    try {
      await this.session.authenticate('authenticator:token', {
        username: this.email,
        password: this.password,
      });
      this.socket.start();
    } catch (response) {
      console.log(response);
    }
  }
}
