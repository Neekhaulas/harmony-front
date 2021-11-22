import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class UserAreaComponent extends Component {
  @service user;

  get me() {
    return this.user.user;
  }
}
