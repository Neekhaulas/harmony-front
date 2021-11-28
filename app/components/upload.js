import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UploadComponent extends Component {
  @action
  init(element) {
    console.log(this);
  }
}
