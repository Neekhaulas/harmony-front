import Controller from '@ember/controller';
// import { inject as service } from '@ember/service';

export default class ChannelController extends Controller {
  get channel() {
    return this.model.channel;
  }

  get server() {
    return this.model.server;
  }
}
