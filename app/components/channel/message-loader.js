import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ChannelMessageLoaderComponent extends Component {
  @service inViewport;

  @action
  insert(element) {
    const { onEnter, _onExit } = this.inViewport.watchElement(element, {
      viewportTolerance: { bottom: 200 },
      viewportEnabled: true,
      viewportUseRAF: true,
      viewportSpy: false,
      intersectionThreshold: 0.25,
      scrollableArea: '.messages-list',
    });

    onEnter(this.args.onLoad);
  }
}
