import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'front/config/environment';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { marks, nodes } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';

export default class MessageBoxComponent extends Component {
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
  keyCheck(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
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
    fetch(`${ENV.apiUrl}/channels/${this.args.channelId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
      },
      body: JSON.stringify({
        content: message,
      }),
    });
  }
}
