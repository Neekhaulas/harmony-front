import Component from '@glimmer/component';
import { connect } from 'ember-redux';
import {
  getChannelsOfSelectedServer,
  currentChannel,
} from '../../reducers/servers';

class ChannelListComponent extends Component {}

const stateToComputed = (state) => {
  return {
    currentChannel: currentChannel(state),
    channels: getChannelsOfSelectedServer(state),
  };
};

export default connect(stateToComputed)(ChannelListComponent);
