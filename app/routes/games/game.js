import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class GamesGameRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('game', params.id, {
      include: 'moves',
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.send('enteredRoute');
  }
}
