import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { connect } from 'ember-redux';
import { currentServer, getServers } from '../../reducers/servers';
class ServerListComponent extends Component {}

const stateToComputed = (state) => {
  return {
    currentServer: currentServer(state),
    servers: getServers(state),
  };
};

export default connect(stateToComputed)(ServerListComponent);
