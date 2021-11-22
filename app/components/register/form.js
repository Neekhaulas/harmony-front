import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';

export default class RegisterFormComponent extends Component {
  @service session;
  @service socket;

  @tracked email;
  @tracked username;
  @tracked password;

  @action
  async register(event) {
    event.preventDefault();

    fetch(`${ENV.apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
        email: this.email,
      }),
    }).then(async () => {
      try {
        await this.session.authenticate('authenticator:token', {
          username: this.email,
          password: this.password,
        });
        this.socket.start();
      } catch (response) {
        console.log(response);
      }
    });
  }
}
