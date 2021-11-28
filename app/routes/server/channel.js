import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { connect } from 'ember-redux';
import { feedMessages } from '../../actions/servers';
import {
  getCurrentChannel,
  getCurrentChannelMessages,
  getCurrentServerPresence,
} from '../../reducers/servers';

class ServerChannelRoute extends Route {
  @service user;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'index');
  }

  model(params) {
    this.user.setCurrentChannel(params.channel_id);
    return params.channel_id;
  }

  afterModel(channel) {
    if (this.messages === null) {
      this.actions.feed(channel, this.session.data.authenticated.access_token);
    }
  }
}

const dispatchToActions = (dispatch) => {
  return {
    feed: (channel, token) => feedMessages(channel, token, dispatch),
  };
};

const stateToComputed = (state) => {
  return {
    channel: getCurrentChannel(state),
    messages: getCurrentChannelMessages(state),
    presences: getCurrentServerPresence(state),
  };
};

export default connect(stateToComputed, dispatchToActions)(ServerChannelRoute);
