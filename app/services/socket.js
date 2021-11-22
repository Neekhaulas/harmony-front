import Service, { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import ENV from 'front/config/environment';

export default class SocketService extends Service {
  @service('websockets') socketService;
  @service store;
  @service session;
  @service chatscroll;
  @service user;

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
      case 'newMessage':
        this.handleMessageData(data, true);
        break;
      case 'serverUpdate':
        this.handleServerUpdate(data);
        break;
      case 'messages':
        this.handleMessagesData(data);
        break;
      case 'me':
        this.handleMeData(data);
        break;
      case 'updateMessage':
        this.handleMessageData(data, false);
        break;
      case 'deleteMessage':
        this.handleDeleteMessage(data);
        break;
    }
  }

  handleDeleteMessage(payload) {
    let record = this.store.peekRecord('message', payload);
    this.store.unloadRecord(record);
  }

  handleMessageData(payload, newMessage) {
    this.store.push({
      data: {
        id: payload._id,
        type: 'message',
        attributes: {
          ...payload,
        },
      },
    });
    if (newMessage) {
      this.chatscroll.newMessage();
    }
  }

  handleServerUpdate(payload) {
    console.log(payload);
    this.store.push({
      data: {
        id: payload._id,
        type: 'server',
        attributes: {
          ...payload,
        },
      },
    });
  }

  handleMeData(data) {
    // User
    this.user.setUser(data.user);

    // Servers
    let servers = [];
    for (let i = 0; i < data.servers.length; i++) {
      servers.push({
        id: data.servers[i]._id,
        type: 'server',
        attributes: {
          ...data.servers[i],
        },
      });
    }
    console.log(data);

    this.store.push({
      data: servers,
    });
  }

  handleMessagesData(payload) {
    let messages = [];
    for (let i = 0; i < payload.length; i++) {
      messages.push({
        id: payload[i]._id,
        type: 'message',
        attributes: {
          ...payload[i],
        },
      });
    }
    this.store.push({
      data: messages,
    });
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
