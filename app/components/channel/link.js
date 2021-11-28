import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChannelLinkComponent extends Component {
  @tracked optionOpen;

  get isOptionOpen() {
    return this.optionOpen || this.args.selected;
  }

  @action
  hover() {
    this.optionOpen = true;
  }

  @action
  leave() {
    this.optionOpen = false;
  }
}
