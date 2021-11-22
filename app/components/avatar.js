import Component from '@glimmer/component';
import ENV from 'front/config/environment';
import { inject as service } from '@ember/service';

export default class MessageAvatarComponent extends Component {
  @service store;

  get user() {
    if (this.args.author === undefined) return null;
    if (this.store.peekRecord('user', this.args.author) === null) {
      return this.store.findRecord('user', this.args.author);
    }
    return this.store.peekRecord('user', this.args.author);
  }

  get avatar() {
    if (this.user === null) return `https://eu.ui-avatars.com/api/?name=`;
    return `https://eu.ui-avatars.com/api/?name=${this.user.get('name') ?? ''}`;
  }
}
