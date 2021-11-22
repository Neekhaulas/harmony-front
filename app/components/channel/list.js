import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ChannelListComponent extends Component {
  @service store;

  get server() {
    return this.args.server;
  }
}
