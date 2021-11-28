import Service, { inject as service } from '@ember/service';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import ENV from 'front/config/environment';
import { connect } from 'ember-redux';
import {
  addMessage,
  addServer,
  addServers,
  deleteMessage,
  updateServer,
  addChannel,
} from '../actions/servers';

class SocketService extends Service {
  @service('websockets') socketService;
  @service store;
  @service session;
  @service chatscroll;
  @service user;
  @service sound;

  socket = null;
  ping = null;
  subscribedChannel = null;
  subscribedServer = null;
  queue = [];

  constructor() {
    super(...arguments);
  }

  start() {
    const socket = this.socketService.socketFor(
      `${ENV.apiHost}/?access_token=${this.session.data.authenticated.access_token}`
    );

    socket.on('open', this.open, this);
    socket.on('close', this.reconnect, this);
    socket.on('message', this.handleMessage, this);

    this.socket = socket;
  }

  @tracked online = false;

  open() {
    set(this, 'online', true);
    this.getMe();
    if (this.subscribedChannel != null) {
      this.subscribeChannel(this.subscribedChannel);
    }
    this.queue.forEach((element) => {
      this.sendEvent(element.action, element.value);
    });
    this.queue = [];
    this.ping = setInterval(() => {
      this.sendEvent('ping', 1);
    }, 15000);
  }

  reconnect(closeEvent) {
    clearInterval(this.ping);
    this.online = false;

    if (closeEvent.code === 1003) {
      // 1003: unsupported data
      return;
    }

    later(
      this,
      () => {
        this.socket.reconnect();
      },
      5000
    );
  }

  // Message Handling
  handleMessage(msg) {
    const { event, data } = JSON.parse(msg.data);
    console.log(event, data);

    switch (event) {
      case 'MESSAGE_CREATE':
        this.handleMessageData(data, true);
        break;
      case 'MESSAGE_UPDATE':
        this.handleMessageData(data, false);
        break;
      case 'MESSAGE_DELETE':
        this.handleDeleteMessage(data);
        break;
      case 'SERVER_UPDATE':
        this.handleServerUpdate(data);
        break;
      case 'SERVER_CREATE':
        this.handleServerCreate(data);
        break;
      case 'SERVER_DELETE':
        break;
      case 'CHANNEL_CREATE':
        this.handleChannelCreate(data);
        break;
      case 'CHANNEL_UPDATE':
        break;
      case 'CHANNEL_DELETE':
        break;
      case 'me':
        this.handleMeData(data);
        break;
    }
  }

  handleDeleteMessage(payload) {
    this.actions.deleteMessage(payload);
  }

  handleMessageData(payload, newMessage) {
    this.actions.addMessage(payload);
    // this.sound.playNotification();
    if (newMessage) {
      this.chatscroll.newMessage();
    }
  }

  handleServerCreate(payload) {
    this.actions.addServer(payload);
  }

  handleServerUpdate(payload) {
    this.actions.updateServer(payload);
  }

  handleChannelCreate(payload) {
    this.actions.addChannel(payload);
  }

  @action
  handleMeData(data) {
    // User
    this.user.setUser(data.user);

    this.actions.addServers(data.servers);
    // Servers
    let servers = [];
    for (let i = 0; i < data.servers.length; i++) {
      // this.actions.addServer(data.servers[i]);

      servers.push({
        id: data.servers[i]._id,
        type: 'server',
        attributes: {
          ...data.servers[i],
        },
      });
    }

    this.store.push({
      data: servers,
    });
  }

  async handleMessagesData(payload) {
    let record = await this.store.findRecord('channel', payload.channelId);

    let messages = [];
    for (let i = 0; i < payload.messages.length; i++) {
      messages.push(payload.messages[i]);
    }
    record.messages = messages;
    record.users = payload.users;
  }

  // Sending Messages
  sendEvent(event, data) {
    if (this.socket.readyState() === WebSocket.OPEN) {
      try {
        this.socket.send(
          JSON.stringify({
            event,
            data,
          })
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      this.queue.push({ event, data });
    }
  }

  getMe() {
    this.sendEvent('me', {});
  }

  subscribeChannel(channel) {
    this.store.unloadAll('message');
    this.subscribedChannel = channel;
    this.sendEvent('channel', channel);
  }

  subscribeServer(server) {
    this.subscribedServer = server;
    this.sendEvent('server', server);
  }
}

const dispatchToActions = (dispatch) => {
  return {
    addServer: (server) => addServer(server, dispatch),
    addServers: (servers) => addServers(servers, dispatch),
    // delete server
    // update server
    updateServer: (server) => updateServer(server, dispatch),
    addMessage: (message) => addMessage(message, dispatch),
    deleteMessage: (message) => deleteMessage(message, dispatch),
    addChannel: (channel) => addChannel(channel, dispatch),
  };
};

export default connect(null, dispatchToActions)(SocketService);
