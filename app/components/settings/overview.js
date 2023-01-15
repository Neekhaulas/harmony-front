import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { connect } from 'ember-redux';
import { getCurrentServer } from '../../reducers/servers';
import { action } from '@ember/object';
import { patchServer, updateServer } from '../../actions/servers';
import { inject as service } from '@ember/service';

class SettingsOverviewComponent extends Component {
  @tracked _serverName = this.currentServer?.name ?? '';
  @service session;
  @tracked editedServer = null;

  @action
  insert() {
    console.log('insert');
    this.editedServer = { ...this.currentServer };
  }

  get serverName() {
    return this._serverName;
  }

  get image() {
    console.log(this.editedServer.image.startsWith('data:'), this.editedServer.image);
    if (this.editedServer.image.startsWith('data:')) {
      return this.editedServer.image;
    } else {
      return `https://neekhaulas-harmony.s3.eu-central-1.amazonaws.com/${this.editedServer.image}.png`;
    }
  }

  @action
  setImage(image) {
    this.editedServer.image = image;
  }

  @action
  selectFile(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.setImage(reader.result.toString());
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  @action
  saveChanges() {
    this.actions.patchServer(
      this.currentServer,
      this.session.data.authenticated.access_token
    );
  }
}

const stateToComputed = (state) => {
  return {
    currentServer: getCurrentServer(state),
  };
};

const dispatchToActions = (dispatch) => {
  return {
    updateServer: (server) => updateServer(server, dispatch),
    patchServer: (server, token) => patchServer(server, token, dispatch),
  };
};

export default connect(stateToComputed, dispatchToActions)(SettingsOverviewComponent);
