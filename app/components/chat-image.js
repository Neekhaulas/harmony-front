import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChatImageComponent extends Component {
  @service('chatscroll') chatscroll;

  @action
  insert(element) {
    if (!element.complete) {
      element.addEventListener('load', this.loaded);
    }
  }

  @action
  loaded() {
    this.chatscroll.scrollToBottom();
  }
}
