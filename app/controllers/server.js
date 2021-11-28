import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { connect } from 'ember-redux';
import { getCurrentServer } from '../reducers/servers';

class ServerController extends Controller {
  @tracked settingsOpen = false;

  @action
  openSettings() {
    this.settingsOpen = true;
  }
}

const stateToComputed = (state) => {
  return {
    server: getCurrentServer(state),
  };
};

export default connect(stateToComputed)(ServerController);
