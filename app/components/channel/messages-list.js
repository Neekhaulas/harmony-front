import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import {
  getCurrentChannel,
  getCurrentChannelMessages,
} from '../../reducers/servers';
import { connect } from 'ember-redux';
import { action } from '@ember/object';
import { getMessagesAfter, getMessagesBefore } from '../../actions/servers';

class MessageListComponent extends Component {
  @service('chatscroll') chatscroll;
  @service session;

  render() {
    if (this.chatscroll.isDownWhenReceived) {
      this.chatscroll.scrollToBottom();
    }
  }

  storeToService(element) {
    this.chatscroll.setChatElement(element);
  }

  get firstId() {
    if (this.messages === null) return null;
    return this.messages[0]._id;
  }

  @action
  loadAbove() {
    this.actions.getMessagesBefore(
      this.channel.id,
      this.messages[0]._id,
      this.session.data.authenticated.access_token
    );
    return false;
  }

  @action
  loadBelow() {
    this.actions.getMessagesAfter(
      this.channel.id,
      this.messages[this.messages.length - 1]._id,
      this.session.data.authenticated.access_token
    );
    return false;
  }
}

const stateToComputed = (state) => {
  return {
    messages: getCurrentChannelMessages(state),
    channel: getCurrentChannel(state),
  };
};

const dispatchToActions = (dispatch) => {
  return {
    getMessagesBefore: (channel, messageBefore, token) =>
      getMessagesBefore(channel, messageBefore, token, dispatch),
    getMessagesAfter: (channel, messageBefore, token) =>
      getMessagesAfter(channel, messageBefore, token, dispatch),
  };
};

export default connect(
  stateToComputed,
  dispatchToActions
)(MessageListComponent);
