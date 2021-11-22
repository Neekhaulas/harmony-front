import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class RenderMessage extends Helper {
  @service('render-message') renderMessage;

  compute([positional]) {
    return this.renderMessage.check(positional);
  }
}
