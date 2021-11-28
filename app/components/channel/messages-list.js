import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { getCurrentChannelMessages } from '../../reducers/servers';
import { connect } from 'ember-redux';

class MessageListComponent extends Component {
  @service('chatscroll') chatscroll;

  render() {
    if (this.chatscroll.isDownWhenReceived) {
      this.chatscroll.scrollToBottom();
    }
  }

  storeToService(element) {
    this.chatscroll.setChatElement(element);
  }
}

const stateToComputed = (state) => {
  return {
    messages: getCurrentChannelMessages(state),
  };
};

export default connect(stateToComputed)(MessageListComponent);
