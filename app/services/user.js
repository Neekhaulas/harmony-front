import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UserService extends Service {
  @tracked user = null;
  @tracked currentServer = null;
  @tracked servers = [];

  setUser(user) {
    this.user = user;
  }

  setServers(servers) {
    this.servers = servers;
  }

  setCurrentServer(server) {
    if (this.currentServer !== null) {
      this.currentServer.selected = false;
    }
    this.currentServer = server;
    server.selected = true;
  }
}
