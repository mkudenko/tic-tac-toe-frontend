import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SiteHeaderComponent extends Component {
  @service store;
  @service router;

  @action
  async startNewGame() {
    const randomId = this._randomIntFromInterval(1, 2);
    const game = this.store.createRecord('game', {
      naughts_user_id: randomId,
      crosses_user_id: randomId === 1 ? 2 : 1,
    });
    await game.save();
    location.href = `/games/${game.id}`;
  }

  _randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
