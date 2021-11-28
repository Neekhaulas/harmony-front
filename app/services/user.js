import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { setCurrentServer, setCurrentChannel } from '../actions/servers';
import { connect } from 'ember-redux';

class UserService extends Service {
  @tracked user = null;
  @tracked currentServer = null;
  @tracked servers = [];

  setUser(user) {
    this.user = user;
  }

  setServers(servers) {
    this.servers = servers;
  }

  setCurrentServer(server) {
    this.actions.setCurrentServer(server);
  }

  setCurrentChannel(channel) {
    this.actions.setCurrentChannel(channel);
  }
}

const dispatchToActions = (dispatch) => {
  return {
    setCurrentServer: (server) => setCurrentServer(server, dispatch),
    setCurrentChannel: (channel) => setCurrentChannel(channel, dispatch),
  };
};

export default connect(null, dispatchToActions)(UserService);
