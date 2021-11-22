import Model, { attr } from '@ember-data/model';

export default class InviteModel extends Model {
  @attr code;
  @attr server;
}
