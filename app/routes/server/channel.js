import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { connect } from 'ember-redux';
import { addFile } from '../../actions/message';
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

  pasteEvent = async (event) => {
    var items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    console.log(items); // will give you the mime types
    // find pasted image among pasted items
    var blob = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') === 0) {
        blob = items[i].getAsFile();
        const data = await new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
        blob.data = data;

        this.actions.addFile(blob);
      }
    }
  };

  activate() {
    document.addEventListener('paste', this.pasteEvent);
  }

  deactivate() {
    document.removeEventListener('paste', this.pasteEvent);
  }
}

const dispatchToActions = (dispatch) => {
  return {
    feed: (channel, token) => feedMessages(channel, token, dispatch),
    addFile: (file) => addFile(file, dispatch),
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
