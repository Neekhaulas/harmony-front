import Model, { attr, hasMany } from '@ember-data/model';

export default class ChannelModel extends Model {
  @attr name;
  @attr server;
  @attr users;
  @attr messages;
}
