import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ServerSettingsController extends Controller {
  serverSettings = [
    { name: 'Overview', component: 'settings/overview' },
    { name: 'Roles', component: 'settings/roles' },
    { name: 'Emoji', component: 'settings/emoji' },
  ];
  @tracked selected = 0;

  get selectedComponent() {
    return this.serverSettings[this.selected].component;
  }

  @action
  closeSettings() {
    window.history.back();
  }
}
