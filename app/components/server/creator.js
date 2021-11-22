import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';

export default class ServerCreatorComponent extends Component {
  name = null;
  @service socket;
  @service session;

  @action
  createServer() {
    this.name = prompt('Server name');
    fetch(`${ENV.apiUrl}/servers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
      },
      body: JSON.stringify({
        name: this.name,
      }),
    }).then(() => {
      this.socket.getMe();
    });
  }
}
