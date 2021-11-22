import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ServerListComponent extends Component {
  @service store;

  get servers() {
    return this.store.peekAll('server');
  }
}
