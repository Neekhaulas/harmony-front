import Model, { attr } from '@ember-data/model';

export default class MessageModel extends Model {
  @attr channel;
  @attr owner;
  @attr content;
  @attr createdAt;
  @attr updatedAt;
}
