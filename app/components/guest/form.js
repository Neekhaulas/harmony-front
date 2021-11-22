import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'front/config/environment';

export default class GuestFormComponent extends Component {
  @service session;
  @service socket;
  @tracked username = null;
  @tracked password = null;

  @action
  async guest(event) {
    event.preventDefault();

    fetch(`${ENV.apiUrl}/users/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          await this.session.authenticate('authenticator:token', {
            username: data.email,
            password: data.password,
          });
          this.socket.start();
        } catch (response) {
          console.log(response);
        }
      });
  }
}
