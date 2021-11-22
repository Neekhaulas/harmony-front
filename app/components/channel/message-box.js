import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';

export default class MessageBoxComponent extends Component {
  @tracked message = '';
  @tracked isPickerOpen = false;
  @service session;
  @tracked document;

  constructor() {
    super(...arguments);
  }

  @action
  closeEvent(e) {
    if (e.keyCode === 27) {
      this.closePicker();
      this.document.removeEventListener('keydown', this.closeEvent);
    }
  }

  @action
  hookEmoji(element) {
    element.firstElementChild.addEventListener('emoji-click', (event) => {
      this.message += event.detail.unicode ?? `{:${event.detail.name}:}`;
      this.isPickerOpen = false;
    });
    this.document = element.ownerDocument;
    this.document.addEventListener('keydown', this.closeEvent);
  }

  @action
  keyCheck(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  @action
  togglePicker() {
    if (this.isPickerOpen) {
      this.document.removeEventListener('keydown', this.closeEvent);
    }
    this.isPickerOpen = !this.isPickerOpen;
  }

  @action
  closePicker() {
    if (this.isPickerOpen) {
      this.isPickerOpen = false;
      this.document.removeEventListener('keydown', this.closeEvent);
    }
  }

  sendMessage() {
    if (this.message === null || this.message === '') return;
    fetch(`${ENV.apiUrl}/channels/${this.args.channelId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
      },
      body: JSON.stringify({
        content: this.message,
      }),
    });
    this.message = '';
  }
}
