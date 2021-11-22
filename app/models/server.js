import Model, { attr } from '@ember-data/model';

export default class ServerModel extends Model {
  @attr name;
  @attr owner;
  @attr channels;
  @attr emojis;
  @attr('boolean') selected;
}
