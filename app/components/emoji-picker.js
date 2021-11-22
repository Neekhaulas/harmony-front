import Component from '@glimmer/component';
import { Picker } from 'emoji-picker-element';
import { inject as service } from '@ember/service';

export default class EmojiPickerComponent extends Component {
  @service store;

  get picker() {
    let servers = this.store.peekAll('server');
    let emojis = [];
    for (let i = 0; i < servers.length; i++) {
      if (servers.objectAt(i).emojis !== undefined) {
        servers.objectAt(i).emojis.forEach((emoji) => {
          console.log(emoji);
          emojis.push({
            category: undefined,
            name: emoji._id.toString(),
            shortcodes: [emoji.name],
            url: `https://neekhaulas-harmony.s3.eu-central-1.amazonaws.com/${emoji._id}.png`,
          });
        });
      }
    }
    const picker = new Picker();
    picker.customEmoji = emojis;
    return picker;
  }
}
