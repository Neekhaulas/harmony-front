import EmberRouter from '@ember/routing/router';
import config from 'front/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('server', { path: '/server/:server_id' }, function () {
    this.route('channel', { path: '/channel/:channel_id' });
  });
  this.route('emoji', { path: '/server/:server_id/emoji' });
  this.route('login');
  this.route('invite', { path: '/invite/:code' });
  this.route('logout');
});
