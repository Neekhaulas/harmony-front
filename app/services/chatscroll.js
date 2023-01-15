import Service from '@ember/service';
import { action } from '@ember/object';

export default class ChatscrollService extends Service {
  chatElement = null;
  _isDownWhenReceived = false;
  sitckingToBottom = false;

  setChatElement(element) {
    this.chatElement = element;
    element.addEventListener('scroll', () => {
      if (
        this.chatElement.scrollTop + this.chatElement.clientHeight ==
        this.chatElement.scrollHeight
      ) {
        this.sitckingToBottom = true;
      } else {
        this.sitckingToBottom = false;
      }
    });
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
    } else {
      this._isDownWhenReceived = false;
    }
  }

  @action
  scrollToBottom() {
    if (this.sitckingToBottom) {
      this.chatElement.scrollTop = this.chatElement.scrollHeight;
    }
  }
}
