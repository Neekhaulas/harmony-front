import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SererController extends Controller {
  @tracked settingsOpen = false;

  @action
  openSettings() {
    this.settingsOpen = true;
  }
}
