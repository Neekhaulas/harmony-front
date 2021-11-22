import Service from '@ember/service';

export default class RenderMessageService extends Service {
  previous = null;

  reset() {
    this.previous = null;
  }

  setCurrent(current) {
    this.previous = current;
  }

  check(current) {
    if (this.previous === current) {
      this.previous = current;
      return false;
    }
    this.previous = current;
    return true;
  }
}
