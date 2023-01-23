import Model, { attr, belongsTo } from '@ember-data/model';

export default class MoveModel extends Model {
  @belongsTo('game') game;
  @attr('number') user_id;
  @attr('number') cell;
}
