import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';
import { connect } from 'ember-redux';
import { getMessageFiles } from '../../reducers/message';
import { removeAllFiles } from '../../actions/message';

class MessageBoxComponent extends Component {
  @tracked isPickerOpen = false;
  @service session;
  @service editor;
  @tracked document;
  editorView = null;

  constructor() {
    super(...arguments);
  }

  get channel() {
    return this.args.channelId;
  }

  get hasFiles() {
    return this.files.length > 0;
  }

  @action
  focus(element) {
    element.focus();
  }

  @action
  closeEvent(e) {
    if (e.keyCode === 27) {
      this.closePicker();
      this.document.removeEventListener('keydown', this.closeEvent);
    }
  }

  @action
  hookEmoji(element) {
    element.firstElementChild.addEventListener('emoji-click', (event) => {
      if (event.detail.unicode) {
        this.editor.insertEmoji(event.detail.unicode);
      } else {
        this.editor.insertCustomEmoji(event.detail.name);
      }
      this.message += event.detail.unicode ?? `{:${event.detail.name}:}`;
      this.isPickerOpen = false;
    });
    this.document = element.ownerDocument;
    this.document.addEventListener('keydown', this.closeEvent);
  }

  @action
  togglePicker() {
    if (this.isPickerOpen) {
      this.document.removeEventListener('keydown', this.closeEvent);
    }
    this.isPickerOpen = !this.isPickerOpen;
  }

  @action
  closePicker() {
    if (this.isPickerOpen) {
      this.isPickerOpen = false;
      this.document.removeEventListener('keydown', this.closeEvent);
    }
  }

  @action
  send(content) {
    this.sendMessage(content);
  }

  sendMessage(message) {
    //if (message === '' && this.files.length === 0) return;
    var data = new FormData();
    this.files.forEach((element) => {
      delete element.data;
      data.append(`files`, element);
    });
    data.append('content', message);
    fetch(`${ENV.apiUrl}/channels/${this.args.channelId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
      },
      body: data,
    });
    this.actions.removeAllFiles();
  }
}

const stateToComputed = (state) => {
  return {
    files: getMessageFiles(state),
  };
};

const dispatchToActions = (dispatch) => {
  return {
    removeAllFiles: () => removeAllFiles(dispatch),
  };
};

export default connect(stateToComputed, dispatchToActions)(MessageBoxComponent);
