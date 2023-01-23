import Model, { attr, hasMany } from '@ember-data/model';

export default class GameModel extends Model {
  @attr('number') naughts_user_id;
  @attr('number') crosses_user_id;
  @attr('number') winner_id;
  @hasMany('move') moves;
}
