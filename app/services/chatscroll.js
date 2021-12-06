import Service from '@ember/service';
import { action } from '@ember/object';

export default class ChatscrollService extends Service {
  chatElement = null;
  _isDownWhenReceived = false;

  setChatElement(element) {
    this.chatElement = element;
  }

  get isDown() {
    return (
      this.chatElement.scrollTop + this.chatElement.clientHeight ===
      this.chatElement.scrollHeight
    );
  }

  get isDownWhenReceived() {
    return this._isDownWhenReceived;
  }

  @action
  newMessage() {
    if (this.isDown) {
      this._isDownWhenReceived = true;
      this.scrollToBottom();
    } else {
      this._isDownWhenReceived = false;
    }
  }

  @action
  scrollToBottom() {
    console.log('scroll');
    this.chatElement.scrollTop = this.chatElement.scrollHeight;
  }
}
