import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ENV from 'front/config/environment';
import { inject as service } from '@ember/service';

export default class MessageContentComponent extends Component {
  @service session;
  @service user;
  @tracked editing = false;
  @tracked value = null;

  @action
  editMessage(event) {
    event.preventDefault();
    if (this.args.content.owner === this.user.user._id) {
      this.value = this.args.content.content;
      this.editing = true;
    }
  }

  @action
  checkKey(event) {
    if (event.keyCode === 13) {
      this.updateMessage();
      this.value = null;
      this.editing = false;
    } else if (event.keyCode === 27) {
      this.value = null;
      this.editing = false;
    }
  }

  updateMessage() {
    if (this.value === '') {
      fetch(
        `${ENV.apiUrl}/channels/${this.args.content.channel}/messages/${this.args.content.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
          },
        }
      );
    } else if (this.value !== this.args.content.content) {
      fetch(
        `${ENV.apiUrl}/channels/${this.args.content.channel}/messages/${this.args.content.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
          },
          body: JSON.stringify({
            content: this.value,
          }),
        }
      );
    }
  }
}
