import Controller from '@ember/controller';
import { getCurrentChannel } from '../../reducers/servers';
import { connect } from 'ember-redux';
// import { inject as service } from '@ember/service';

class ChannelController extends Controller {}

const stateToComputed = (state) => {
  return {
    channel: getCurrentChannel(state),
  };
};

export default connect(stateToComputed)(ChannelController);
