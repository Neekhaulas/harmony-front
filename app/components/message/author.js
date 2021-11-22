import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MessageAuthorComponent extends Component {
  @service store;

  get user() {
    if (this.store.peekRecord('user', this.args.author) === null) {
      return this.store.findRecord('user', this.args.author);
    }
    return this.store.peekRecord('user', this.args.author);
  }
}
