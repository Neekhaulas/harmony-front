import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { setCurrentServer, setCurrentChannel } from '../actions/servers';
import { connect } from 'ember-redux';
import { getCurrentServerPresence } from '../reducers/servers';
import { inject as service } from '@ember/service';

class UserService extends Service {
  @tracked user = null;
  @tracked currentServer = null;
  @tracked servers = [];
  @service socket;

  setUser(user) {
    this.user = user;
  }

  setServers(servers) {
    this.servers = servers;
  }

  setCurrentServer(server) {
    this.actions.setCurrentServer(server);
    if (this.presence === null) {
      this.socket.requestPresence(server);
    }
  }

  setCurrentChannel(channel) {
    this.actions.setCurrentChannel(channel);
  }
}

const stateToComputed = (state) => {
  return {
    presence: getCurrentServerPresence(state),
  };
};

const dispatchToActions = (dispatch) => {
  return {
    setCurrentServer: (server) => setCurrentServer(server, dispatch),
    setCurrentChannel: (channel) => setCurrentChannel(channel, dispatch),
  };
};

export default connect(stateToComputed, dispatchToActions)(UserService);
