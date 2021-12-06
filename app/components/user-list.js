import Component from '@glimmer/component';
import { connect } from 'ember-redux';
import { getCurrentServerPresence } from '../reducers/servers';

class UserListComponent extends Component {}

const stateToComputed = (state) => {
  return {
    users: getCurrentServerPresence(state),
  };
};

export default connect(stateToComputed)(UserListComponent);
