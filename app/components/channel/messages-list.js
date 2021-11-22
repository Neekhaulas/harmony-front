import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MessageListComponent extends Component {
  @service store;
  @service('chatscroll') chatscroll;
  @service('render-message') renderMessage;

  render() {
    if (this.chatscroll.isDownWhenReceived) {
      this.chatscroll.scrollToBottom();
    }
  }

  storeToService(element) {
    this.chatscroll.setChatElement(element);
  }

  get messages() {
    this.renderMessage.reset();
    return this.store.peekAll('message');
  }
}
