import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SiteHeaderComponent extends Component {
  @service socket;

  get online() {
    return this.socket.online;
  }
}
