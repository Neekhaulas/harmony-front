import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';

export default class ChannelCreatorComponent extends Component {
  name = null;
  @service socket;
  @service session;

  @action
  createChannel() {
    this.name = prompt('Channel name');
    if (this.name !== null) {
      fetch(`${ENV.apiUrl}/servers/${this.args.server}/channels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
        },
        body: JSON.stringify({
          name: this.name,
        }),
      });
    }
  }
}
