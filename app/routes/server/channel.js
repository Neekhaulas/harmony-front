import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ServerChannelRoute extends Route {
  @service store;
  @service socket;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'index');
  }

  model(params) {
    let server = this.modelFor('server');

    let channel = this.store.peekRecord('channel', params.channel_id);
    if (channel === null) {
      channel = this.store.findRecord('channel', params.channel_id);
    }

    this.socket.subscribeChannel(params.channel_id);
    return { server, channel };
  }
}
