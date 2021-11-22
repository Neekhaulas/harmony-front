import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';

export default class EmojiController extends Controller {
  @tracked file = null;
  shortcut = null;
  @service session;

  @action
  changeFile(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.file = reader.result.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  @action
  createEmoji() {
    console.log(this.file);
    fetch(`${ENV.apiUrl}/servers/${this.model.id}/emojis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
      },
      body: JSON.stringify({
        name: this.shortcut,
        file: this.file,
      }),
    });
  }
}
