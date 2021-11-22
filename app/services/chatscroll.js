import Service from '@ember/service';

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

  newMessage() {
    if (this.isDown) {
      this._isDownWhenReceived = true;
    } else {
      this._isDownWhenReceived = false;
    }
  }

  scrollToBottom() {
    this.chatElement.scrollTop = this.chatElement.scrollHeight;
  }
}
