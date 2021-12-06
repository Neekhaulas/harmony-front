import Component from '@glimmer/component';
import ENV from 'front/config/environment';
import { inject as service } from '@ember/service';

export default class MessageAvatarComponent extends Component {
  @service store;

  get user() {
    return null;
  }

  get avatar() {
    return `https://eu.ui-avatars.com/api/?name=${
      this.user?.get('username') ?? ''
    }`;
  }
}
